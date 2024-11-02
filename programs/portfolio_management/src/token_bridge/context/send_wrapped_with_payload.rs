use anchor_lang::prelude::*;
use anchor_spl::{
    associated_token::AssociatedToken,
    token::{close_account, transfer, approve},
    token::{CloseAccount, Transfer, Approve, Token, TokenAccount},
};
use wormhole_anchor_sdk::{
    token_bridge::{program::TokenBridge, transfer_wrapped_with_payload, Config, TransferWrappedWithPayload, WrappedMeta, WrappedMint}, wormhole::{program::Wormhole, BridgeData, FeeCollector, SequenceTracker, CHAIN_ID_SOLANA}
};

use crate::{message::TokenMessage, token_bridge::{
    error::TokenBridgeError, state::{ForeignContract, SenderConfig}
}};


#[derive(Accounts)]
pub struct SendWrappedWithPayload<'info> {
    #[account(mut)]
    /// will pay wormhole fee to transfer tokens and create a temporary custody account
    pub payer: Signer<'info>,

    #[account(
        seeds = [b"sender"],
        bump
    )]
    /// acts as token bridge sender PDA
    pub config: Account<'info, SenderConfig>,

    /// send tokens to the contract specified in this account
    /// token bridge does not have requirements for outbound transfers for the recipient
    /// chain to be registered. This accound provides extra protection against sending tokens to
    /// an unregistered wormhole chain ID
    pub foreign_contract: Account<'info, ForeignContract>,

    #[account(
        mut,
        associated_token::mint = wrapped_mint,
        associated_token::authority = payer
    )]
    pub from_token_account: Account<'info, TokenAccount>,

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
    /// This account is created before the instruction is invoked to temporarily take custody of
    /// the payer's tokens. When the tokens are finally bridged out, the token account will have
    /// zero balance and can be closed.
    pub custody_token_account: Account<'info, TokenAccount>,

    #[account(
        mut
    )]
    pub to_token_account: Account<'info, TokenAccount>,

    #[account(
        mut,
        seeds = [
            WrappedMint::SEED_PREFIX,
            &wrapped_mint_meta.chain.to_be_bytes(),
            &wrapped_mint_meta.token_address
        ],
        bump,
        seeds::program = token_bridge_program
    )]
    /// SPL token that will be bridged to the foreign contract, the wrapped mint PDA must agree
    /// with the native token's metadata
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

    pub clock: Sysvar<'info, Clock>,
    pub rent: Sysvar<'info, Rent>,

    /******************************
     **** TOKEN BRIDGE ACCOUNTS ***
     ******************************/

    #[account(
        mut,
        address = config.token_bridge.wormhole_bridge @ TokenBridgeError::InvalidWormholeBridgeAddress
    )]
    pub wormhole_bridge: Account<'info, BridgeData>,

    #[account(
        address = config.token_bridge.config @ TokenBridgeError::InvalidTokenBridgeConfigAddress
    )]
    pub token_bridge_config: Account<'info, Config>,

    #[account(
        address = config.token_bridge.authority_signer @ TokenBridgeError::InvalidTokenBridgeAuthoritySignerAddress
    )]
    /// CHECK: Token bridge authority signer, read-only.
    pub token_bridge_authority_signer: UncheckedAccount<'info>,

    #[account(
        address = config.token_bridge.emitter @ TokenBridgeError::InvalidTokenBridgeEmitterAddress
    )]
    /// CHECK: emitter (for token bridge)
    pub token_bridge_emitter: UncheckedAccount<'info>,

    #[account(
        mut,
        address = config.token_bridge.sequence @ TokenBridgeError::InvalidSequenceTrackerAddress
    )]
    pub token_bridge_sequence: Account<'info, SequenceTracker>,

    #[account(
        mut,
        address = config.token_bridge.wormhole_fee_collector @ TokenBridgeError::InvalidFeeCollectorAddress
    )]
    pub wormhole_fee_collector: Account<'info, FeeCollector>,

    #[account(
        mut,
        seeds = [
            b"bridged",
            &token_bridge_sequence.next_value().to_le_bytes()[..]
        ],
        bump
    )]
    /// CHECK: Token bridge program writes info about the transfer
    pub wormhole_message: UncheckedAccount<'info>,

    /*****************
     *** PROGRAMS ****
     *****************/

    pub token_program: Program<'info, Token>,
    pub associated_token_program: Program<'info, AssociatedToken> ,
    pub wormhole_program: Program<'info, Wormhole>,
    pub token_bridge_program: Program<'info, TokenBridge>,
    pub system_program: Program<'info, System>,

}

impl<'info> SendWrappedWithPayload<'info> {
    pub fn send_wrapped_with_payload(&mut self, batch_id: u32, amount: u64, recipient_address: Pubkey, recipient_chain: u16, bumps: &SendWrappedWithPayloadBumps, program_id: &Pubkey) -> Result<()> {
        // Early check of the given chain and addresses
        require_neq!(recipient_chain, CHAIN_ID_SOLANA, TokenBridgeError::InvalidChainID);
        require_neq!(recipient_address, Pubkey::from([0_u8; 32]), TokenBridgeError::InvalidAddress);

        // Configure sender config program seeds to be used to:
        // 1. Sign the sender config's token account to delegate appproval of amount.
        // 2. Sign token bridge's transfer_wrapped instruction.
        // 3. Close the temporary custody account.
        let config_seeds = &[
            b"sender".as_ref(),
            &[self.config.bump],
        ];

        // Take custody of the tokens temporarily
        let transfer_instructions = Transfer {
            from: self.from_token_account.to_account_info(),
            to: self.custody_token_account.to_account_info(),
            authority: self.payer.to_account_info()
        };
        transfer(
            // ctx
            CpiContext::new(
                self.token_program.to_account_info(),
                transfer_instructions
            ),
            amount
        )?;

        // Delegate spending to token bridge program's authority signer.
        let approve_instructions = Approve {
            to: self.custody_token_account.to_account_info(),
            delegate: self.token_bridge_authority_signer.to_account_info(),
            authority: self.config.to_account_info(),
        };
        approve(
            // ctx
            CpiContext::new_with_signer(
                self.token_program.to_account_info(),
                approve_instructions,
                &[&config_seeds[..]],
            ),
            amount,
        )?;

        // Serialize message as payload for token bridge transfer
        let payload = TokenMessage::Recipient {
            recipient: recipient_address.to_bytes()
        }.try_to_vec()?;

        // Transfer wrapped token with encoded payload to the bridge
        let transfer_instructions = TransferWrappedWithPayload {
            payer: self.payer.to_account_info(),
            config: self.token_bridge_config.to_account_info(),
            from: self.custody_token_account.to_account_info(),
            from_owner: self.config.to_account_info(),
            wrapped_mint: self.wrapped_mint.to_account_info(),
            wrapped_metadata: self.wrapped_mint_meta.to_account_info(),
            authority_signer: self.token_bridge_authority_signer.to_account_info(),
            wormhole_bridge: self.wormhole_bridge.to_account_info(),
            wormhole_message: self.wormhole_message.to_account_info(),
            wormhole_emitter: self.token_bridge_emitter.to_account_info(),
            wormhole_sequence: self.token_bridge_sequence.to_account_info(),
            wormhole_fee_collector: self.wormhole_fee_collector.to_account_info(),
            clock: self.clock.to_account_info(),
            sender: self.config.to_account_info(),
            rent: self.rent.to_account_info(),
            system_program: self.system_program.to_account_info(),
            token_program: self.token_program.to_account_info(),
            wormhole_program: self.wormhole_program.to_account_info()
        };
        transfer_wrapped_with_payload(
            // ctx
            CpiContext::new_with_signer(
                self.token_bridge_program.to_account_info(),
                transfer_instructions,
                &[
                    &config_seeds[..],
                    &[
                        b"bridged",
                        &self.token_bridge_sequence.next_value().to_le_bytes()[..],
                        &[bumps.wormhole_message]
                    ]
                ]
            ),
            batch_id, amount, self.foreign_contract.address.to_bytes(), recipient_chain, payload, program_id,
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
