use anchor_lang::prelude::*;

pub mod context;
use context::*;
pub mod state;
pub mod errors;

declare_id!("91dxXHBrNHJQHkze1C8JuuTnE6nvg5r9Ltbs5NdD5MQZ");

#[program]
pub mod portfolio_management {
    use super::*;

    pub fn initialize(ctx: Context<CreateBond>, feed_id: String) -> Result<()> {
        ctx.accounts.create_bond(feed_id, &ctx.bumps)
    }

    pub fn invest_in_bond(ctx: Context<Fund>, amount: u64) -> Result<()> {
        ctx.accounts.transfer_tokens(amount, &ctx.bumps)
    }
}
