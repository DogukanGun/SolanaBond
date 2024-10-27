use anchor_lang::prelude::*;

pub mod context;
use context::*;
pub mod state;
use state::*;


declare_id!("E31tdKPpY99KpeWX1TKzi5wycWApYTJ7UAaiKNgUrhBF");

#[program]
pub mod portfolio_management {
    use state::ChainlinkAccountInfo;

    use super::*;

    pub fn create_bond(ctx: Context<CreateBond>, chainlink_accounts: [ChainlinkAccountInfo;2]) -> Result<()> {
        ctx.accounts.create_bond(chainlink_accounts, &ctx.bumps)
    }

    pub fn invest_in_bond(ctx: Context<Fund>, amount: u64) -> Result<()> {
        ctx.accounts.transfer_tokens(amount)
    }

    pub fn trade(ctx: Context<Trade>, ethereum_price: f64) -> Result<()> {
        ctx.accounts.trade(ethereum_price)
    }

    pub fn redeem_bond(ctx: Context<Take>) -> Result<()> {
        ctx.accounts.withdraw()
    }
}
