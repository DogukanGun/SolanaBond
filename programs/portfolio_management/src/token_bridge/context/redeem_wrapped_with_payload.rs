use anchor_lang::prelude::*;
use anchor_spl::{
    associated_token::{get_associated_token_address, AssociatedToken},
    token::{approve, close_account, transfer, Approve, CloseAccount, Token, TokenAccount, Transfer},
};
use wormhole_anchor_sdk::{
    token_bridge::{complete_transfer_wrapped_with_payload, program::TokenBridge, transfer_wrapped_with_payload, CompleteTransferWrappedWithPayload, Config, EndpointRegistration, WrappedMeta, WrappedMint},
    wormhole::{program::Wormhole, BridgeData, FeeCollector, SequenceTracker, CHAIN_ID_SOLANA, SEED_PREFIX_POSTED_VAA}
};

use crate::{
    message::{PostedTokenMessage, TokenMessage},
    token_bridge::{error::TokenBridgeError, state::{foreign_contract, ForeignContract, RedeemerConfig}}
};


#[derive(Accounts)]
#[instruction(vaa_hash: [u8; 32])]
pub struct RedeemWrappedWithPayload<'info> {
    #[account(mut)]
    /// will pay wormhole fee to transfer tokens and create a temporary custody account
    pub payer: Signer<'info>,

    #[account(
        mut,
        constraint = payer.key() == recipient.key() || payer_token_account.key() == get_associated_token_address(&payer.key(), &wrapped_mint.key()) @ TokenBridgeError::InvalidPayerAta
    )]
    /// CHECK: if payer != recipient, then must be an assoicated account. TODO: in our case we
    /// always have a relayer, i.e. we have payer.key() != recipient.key()
    pub payer_token_account: UncheckedAccount<'info>,

    #[account(
        seeds = [b"redeemer"],
        bump
    )]
    pub config: Account<'info, RedeemerConfig>,

    #[account(
        seeds = [
            b"foreign_contract",
            &vaa.emitter_chain().to_le_bytes()[..]
        ],
        bump,
        constraint = foreign_contract.verify(&vaa) @ TokenBridgeError::InvalidVaa
    )]
    /// Tokens should have been sent to the contract specified in this account
    pub foreign_contract: Account<'info, ForeignContract>,

    /// CHECK: recipient might differ from payer if a relayer paid for this transaction
    pub recipient: UncheckedAccount<'info>,

    #[account(
        mut,
        associated_token::mint = wrapped_mint,
        associated_token::authority = recipient
    )]
    pub recipient_token_account: Account<'info, TokenAccount>,

    #[account(
        init,
        payer = payer,
        seeds = [
            b"custody",
            wrapped_mint.key().as_ref()
        ],
        bump,
        token::mint = wrapped_mint,
        token::authority = config
    )]
    /// Created before the instruction is invoked to temporarily take custody of the payer's
    /// tokens. When the tokens are finally bridged in, the tokens will be transferred to the
    /// destination token accounts and this account will have zero balance and will be closed at
    /// the end.
    pub custody_token_account: Account<'info, TokenAccount>,

    #[account(
        mut,
        seeds = [
            WrappedMint::SEED_PREFIX,
            &vaa.data().token_chain().to_le_bytes(),
            vaa.data().token_address()
        ],
        bump,
        seeds::program = token_bridge_program.key
    )]
    /// SPL token that will be bridged from the foreign contract, wrapped mint PDA must agree with
    /// the native token's metadata in the wormhole message.
    pub wrapped_mint: Account<'info, WrappedMint>,

    #[account(
        seeds = [
            WrappedMeta::SEED_PREFIX,
            wrapped_mint.key().as_ref()
        ],
        bump,
        seeds::program = token_bridge_program.key
    )]
    /// Wrapped mint metadata (chain_id, token_address, native_decimals) contains info about the
    /// token from its native chain.
    pub wrapped_mint_meta: Account<'info, WrappedMeta>,

    #[account(
        seeds = [
            SEED_PREFIX_POSTED_VAA,
            &vaa_hash
        ],
        bump,
        seeds::program = wormhole_program.key,
        constraint = vaa.data().to() == crate::ID || vaa.data().to() == config.key() @ TokenBridgeError::InvalidTransferToAddress,
        constraint = vaa.data().to_chain() == CHAIN_ID_SOLANA @ TokenBridgeError::InvalidTransferToChain,
        constraint = vaa.data().token_chain() != CHAIN_ID_SOLANA @ TokenBridgeError::InvalidTransferTokenChain
    )]
    /// Verified wormhole message account, wormhole program verified signatures and posted the
    /// account data here.
    pub vaa: Account<'info, PostedTokenMessage>,

    pub clock: Sysvar<'info, Clock>,
    pub rent: Sysvar<'info, Rent>,

    /******************************
     **** TOKEN BRIDGE ACCOUNTS ***
     ******************************/

    #[account(
        address = config.token_bridge.config @ TokenBridgeError::InvalidTokenBridgeConfigAddress
    )]
    pub token_bridge_config: Account<'info, Config>,

    #[account(mut)]
    /// CHECK: Stores a boolean value, which is true if the bridged assets have been already
    /// claimed. If the transfer has not yet been redeemed, this account will not exist yet.
    pub token_bridge_claim: UncheckedAccount<'info>,

    #[account(
        address = foreign_contract.token_bridge_foreign_endpoint @ TokenBridgeError::InvalidTokenBridgeForeignEndpoint
    )]
    /// Should really be one endpoint per chain, but the PDA allows for multiple endpoints for each
    /// chain, we store the proper endpoint for the emitter chain.
    pub token_bridge_foreign_endpoint: Account<'info, EndpointRegistration>,

    #[account(
        address = config.token_bridge.mint_authority @ TokenBridgeError::InvalidTokenBridgeMintAuthority
    )]
    /// CHECK: mint authority
    pub token_bridge_mint_authority: UncheckedAccount<'info>,

    /*****************
     *** PROGRAMS ****
     *****************/

    pub token_program: Program<'info, Token>,
    pub associated_token_program: Program<'info, AssociatedToken> ,
    pub wormhole_program: Program<'info, Wormhole>,
    pub token_bridge_program: Program<'info, TokenBridge>,
    pub system_program: Program<'info, System>,

}

impl<'info> RedeemWrappedWithPayload<'info> {
    pub fn redeem_wrapped_with_payload(&mut self, _vaa_hash: [u8; 32]) -> Result<()> {
        // Early check for token bridge program's claim account. This account is only initialized
        // when a transfer is redeemed (and the boolean `true` is written as its data)
        require!(self.token_bridge_claim.data_is_empty(), TokenBridgeError::AlreadyRedeemed);

        // Early check for the intended recipient.
        let TokenMessage::Recipient { recipient } = self.vaa.message().data();
        require!(self.recipient.key().to_bytes() == *recipient, TokenBridgeError::PayloadRecipientMismatch);

        // Configure redeemer config program seeds to be used to:
        // 1. Redeem token program's complete_transfer_wrapped_with_payload
        // 2. Transfer tokens to relayer if exists
        // 3. Transfer remaining tokens to recipient
        // 4. Close the temporary custody account
        let config_seeds = &[
            b"redeemer".as_ref(),
            &[self.config.bump]
        ];

        // Redeem token transfer
        let complete_transfer_instructions = CompleteTransferWrappedWithPayload {
            payer: self.payer.to_account_info(),
            config: self.token_bridge_config.to_account_info(),
            vaa: self.vaa.to_account_info(),
            claim: self.token_bridge_claim.to_account_info(),
            foreign_endpoint: self.token_bridge_foreign_endpoint.to_account_info(),
            to: self.custody_token_account.to_account_info(),   // TEMPORARY CUSTODY ACCOUNT
            redeemer: self.config.to_account_info(),
            wrapped_mint: self.wrapped_mint.to_account_info(),
            wrapped_metadata: self.wrapped_mint_meta.to_account_info(),
            mint_authority: self.token_bridge_mint_authority.to_account_info(),
            rent: self.rent.to_account_info(),
            system_program: self.system_program.to_account_info(),
            token_program: self.token_program.to_account_info(),
            wormhole_program: self.wormhole_program.to_account_info()
        };
        complete_transfer_wrapped_with_payload(CpiContext::new_with_signer(
                self.token_bridge_program.to_account_info(),
                complete_transfer_instructions,
                &[&config_seeds[..]]
        ))?;

        let mut amount = self.vaa.data().amount();

        // If this instruction were executed by a relayer, send some of the token amount
        // (determined by the relayer fee) to the payer's token account.
        if self.payer.key() != self.recipient.key() {
            // assert the existence of the relayer's token account for transfer
            require!(!self.payer_token_account.data_is_empty(), TokenBridgeError::NonExistentRelayerAta);
            let relayer_amount = self.config.compute_relayer_fee_amount(amount);
            if relayer_amount > 0 {
                let transfer_instructions = Transfer {
                    from: self.custody_token_account.to_account_info(),
                    to: self.payer_token_account.to_account_info(),
                    authority: self.config.to_account_info(),
                };
                transfer(
                    // ctx
                    CpiContext::new_with_signer(
                        self.token_program.to_account_info(),
                        transfer_instructions,
                        &[&config_seeds[..]]
                    ),
                    relayer_amount
                )?;
            }

            amount -= relayer_amount;
            msg!("RedeemWrappedWithPayload :: relayed by {:?}", self.payer.key());
        }

        // Transfer tokens from custody account to recipient
        let transfer_instructions = Transfer {
            from: self.custody_token_account.to_account_info(),
            to: self.recipient_token_account.to_account_info(),
            authority: self.config.to_account_info(),
        };
        transfer(
            // ctx
            CpiContext::new_with_signer(
                self.token_program.to_account_info(),
                transfer_instructions,
                &[&config_seeds[..]]
            ),
            amount
        )?;

        // Close the temporary custody account
        let close_account_instructions = CloseAccount {
            account: self.custody_token_account.to_account_info(),
            destination: self.payer.to_account_info(),
            authority: self.config.to_account_info(),
        };
        close_account(
            // ctx
            CpiContext::new_with_signer(
                self.token_program.to_account_info(),
                close_account_instructions,
                &[&config_seeds[..]]
            )
        )
    }
}
