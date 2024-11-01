use anchor_lang::prelude::*;
use crate::token_bridge::state::{SenderConfig, RedeemerConfig};


#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(mut)]
    /// Signer for creating the [`SenderConfig`] and [`RedeemerConfig`]
    pub owner: Signer<'info>,

    #[account(
        init,
        payer = owner,
        space = 8 + SenderConfig::MAXIMUM_SIZE,
        seeds = [b"sender"],
        bump
    )]
    /// Saves program data for outbound transfers and
    /// saves payer of the [`initialize`](crate::initialize) instruction as the program's owner
    pub sender_config: Account<'info, SenderConfig>,

    #[account(
        init,
        payer = owner,
        space = 8 + RedeemerConfig::MAXIMUM_SIZE,
        seeds = [b"redeemer"],
        bump
    )]
    /// Saves program data for inbound transfers and
    /// saves payer of the [`initialize`](crate::initialize) instruction as the program's owner
    pub redeemer_config: Account<'info, RedeemerConfig>,

    pub system_program: Program<'info, System>,
}

impl<'info> Initialize<'info> {
    pub fn initialize(&mut self, bumps: &InitializeBumps) -> Result<()> {
        // initialize program's sender config
        let sender_config = &mut self.sender_config;
        sender_config.owner = self.owner.key();
        sender_config.bump = bumps.sender_config;

        // initialize program's redeemer config
        let redeemer_config = &mut self.redeemer_config;
        redeemer_config.owner = self.owner.key();
        redeemer_config.bump = bumps.redeemer_config;

        Ok(())
    }
}
