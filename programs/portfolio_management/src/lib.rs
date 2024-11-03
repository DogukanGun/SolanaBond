use anchor_lang::prelude::*;

pub mod context;
pub mod state;
pub mod message;
pub mod constants;
pub mod error;
pub mod token_bridge;

pub use context::*;
pub use state::*;
pub use message::*;
pub use constants::*;
pub use error::*;
pub use token_bridge::context::*;

declare_id!("E31tdKPpY99KpeWX1TKzi5wycWApYTJ7UAaiKNgUrhBF");


#[program]
pub mod portfolio_management {

    use super::*;

    pub fn create_bond(ctx: Context<CreateBond>, feed_id: String) -> Result<()> {
        ctx.accounts.create_bond(feed_id, &ctx.bumps)
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

    /// TODO: these should be invoked within portfolio program (see [`trade`](crate::context::Trade::trade))
    ///       for easy testing purposes we made them instructions

    pub fn token_bridge_initialize(ctx: Context<Initialize>, relayer_fee: u32, relayer_fee_precision: u32) -> Result<()> {
        token_bridge::initialize(ctx, relayer_fee, relayer_fee_precision)
    }

    pub fn register_foreign_contract(ctx: Context<RegisterForeignContract>, chain: u16, address: Pubkey) -> Result<()> {
        token_bridge::register_foreign_contract(ctx, chain, address)
    }

    pub fn update_relayer_fee(ctx: Context<UpdateRelayerFee>, relayer_fee: u32, relayer_fee_precision: u32) -> Result<()> {
        token_bridge::update_relayer_fee(ctx, relayer_fee, relayer_fee_precision)
    }

    pub fn send_wrapped_with_payload(ctx: Context<SendWrappedWithPayload>, batch_id: u32, amount: u64, recipient_address: Pubkey, recipient_chain: u16) -> Result<()> {
        token_bridge::send_wrapped_with_payload(ctx, batch_id, amount, recipient_address, recipient_chain)
    }

    pub fn redeem_wrapped_with_payload(ctx: Context<RedeemWrappedWithPayload>, _vaa_hash: [u8; 32]) -> Result<()> {
        token_bridge::redeem_wrapped_with_payload(ctx, _vaa_hash)
    }
}
