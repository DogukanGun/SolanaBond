use anchor_lang::prelude::*;

use crate::token_bridge::{error::TokenBridgeError, state::RedeemerConfig};


#[derive(Accounts)]
pub struct UpdateRelayerFee<'info> {
    #[account(mut)]
    /// CHECK: owner of the program set in [`RedeemerConfig`]
    pub owner: UncheckedAccount<'info>,

    #[account(
        mut,
        has_one = owner @ TokenBridgeError::OwnerOnly,
        seeds = [b"redeemer"],
        bump
    )]
    /// requires `owner` in [`UpdateRelayerFee`] equals the [`Pubkey`] specified in this config
    pub config: Account<'info, RedeemerConfig>,

    pub system_program: Program<'info, System>
}

impl<'info> UpdateRelayerFee<'info> {
    pub fn update_relayer_fee(&mut self, relayer_fee: u32, relayer_fee_precision: u32) -> Result<()> {
        require!(relayer_fee < relayer_fee_precision, TokenBridgeError::InvalidRelayerFee);

        let config = &mut self.config;
        config.relayer_fee = relayer_fee;
        config.relayer_fee_precision = relayer_fee_precision;

        Ok(())
    }
}
