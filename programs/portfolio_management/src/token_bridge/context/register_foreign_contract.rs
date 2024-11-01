use anchor_lang::prelude::*;
use wormhole_anchor_sdk::{
    token_bridge::EndpointRegistration,
    wormhole::CHAIN_ID_SOLANA,
};
use crate::token_bridge::state::ForeignContract;
use crate::token_bridge::error::TokenBridgeError;


#[derive(Accounts)]
#[instruction(chain: u16)]
pub struct RegisterForeignContract<'info> {
    #[account(mut)]
    /// Owner of the program set in the [`SenderConfig`] account,
    /// signer for creating [`ForeignContract`] account.
    pub owner: Signer<'info>,

    #[account(
        init_if_needed,
        payer = owner,
        space = ForeignContract::MAXIMUM_SIZE,
        seeds = [
            b"foreign_contract",
            &chain.to_le_bytes()[..]
        ],
        bump
    )]
    /// Create this account if an emitter has not been registered yet for this wormhole chain ID,
    /// if there already is a contract address saved in this account, overwrite it.
    pub foreign_contract: Account<'info, ForeignContract>,


    /// Token bridge foriegn endpoint. This account should really be one endpoint per chain, but
    /// Token Bridge's PDA allows for multiple endpoints for each chain. We store the proper
    /// endpoint for the emitter chain.
    pub token_bridge_foreign_endpoint: Account<'info, EndpointRegistration>,

    pub system_program: Program<'info, System>
}

impl<'info> RegisterForeignContract<'info> {
    pub fn register_foreign_contract(&mut self, chain: u16, address: Pubkey) -> Result<()> {
        require!(chain != CHAIN_ID_SOLANA, TokenBridgeError::InvalidChainID);
        require!(address.key() != Pubkey::from([0_u8; 32]), TokenBridgeError::InvalidAddress);

        let foreign_emitter = &mut self.foreign_contract;
        foreign_emitter.chain = chain;
        foreign_emitter.address = address;
        foreign_emitter.token_bridge_foreign_endpoint = self.token_bridge_foreign_endpoint.key();

        Ok(())
    }
}
