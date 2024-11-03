//! The `portfolio_management` program provides accounts to profit on a bond based trading
//! algorithm operating between different chains. The program is intended to be run fully on Solana
//! (on-chain).
//!
//! ## Documentation
//!
//! Current documentation is limited to the main instructions related to bond creation logics and
//! token bridge implementation
//! - See the docs for [`instructions`](crate::token_bridge::instructions) for token bridge
//! implementation which uses [wormhole].
//! - See the docs for [`portfolio_management`](crate::portfolio_management) for portfolio related
//! (bond creation and management) implementations.
//!
//! [wormhole]: https://wormhole.com/

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
    //! Instructions for portfolio management logic, consisting of bond management and token bridge
    //! wrapper instructions.

    use super::*;

    /// Creates a bond for a feed. The bond is created with a fixed sized of investors (for now),
    /// see [`InvestorsAccount`](crate::InvestorsAccount) for details.
    pub fn create_bond(ctx: Context<CreateBond>, feed_id: String) -> Result<()> {
        ctx.accounts.create_bond(feed_id, &ctx.bumps)
    }

    /// Invests into a bond from an account. The account is placed into the investors vector inside
    /// [`InvestorsAccount`](crate::InvestorsAccount).
    pub fn invest_in_bond(ctx: Context<Fund>, amount: u64) -> Result<()> {
        ctx.accounts.transfer_tokens(amount)
    }

    /// TODO: still under development. Goal is to transfer using our token bridge implementation
    /// and make net profits to the investors which are then placed into the investors'
    /// [`Investor`](crate::Investor) `net_profit` fields inside the data account of investors
    /// [`InvestorsAccount`](crate::InvestorsAccount)
    pub fn trade(ctx: Context<Trade>, ethereum_price: f64) -> Result<()> {
        ctx.accounts.trade(ethereum_price)
    }

    /// Redeem logic for the investors to redeem their amounts whenever they want. If the total
    /// amount `amount + net_profit` drops to 0 for an account then we remove it from the investors
    /// list for this bond.
    pub fn redeem_bond(ctx: Context<Take>) -> Result<()> {
        ctx.accounts.withdraw()
    }

    /// FIXME: should be invoked within portfolio program [`trade`](crate::context::Trade::trade)
    pub fn token_bridge_initialize(ctx: Context<Initialize>, relayer_fee: u32, relayer_fee_precision: u32) -> Result<()> {
        token_bridge::initialize(ctx, relayer_fee, relayer_fee_precision)
    }

    /// FIXME: should be invoked within portfolio program [`trade`](crate::context::Trade::trade)
    pub fn register_foreign_contract(ctx: Context<RegisterForeignContract>, chain: u16, address: Pubkey) -> Result<()> {
        token_bridge::register_foreign_contract(ctx, chain, address)
    }

    /// FIXME: should be invoked within portfolio program [`trade`](crate::context::Trade::trade)
    pub fn update_relayer_fee(ctx: Context<UpdateRelayerFee>, relayer_fee: u32, relayer_fee_precision: u32) -> Result<()> {
        token_bridge::update_relayer_fee(ctx, relayer_fee, relayer_fee_precision)
    }

    /// FIXME: should be invoked within portfolio program [`trade`](crate::context::Trade::trade)
    pub fn send_wrapped_with_payload(ctx: Context<SendWrappedWithPayload>, batch_id: u32, amount: u64, recipient_address: Pubkey, recipient_chain: u16) -> Result<()> {
        token_bridge::send_wrapped_with_payload(ctx, batch_id, amount, recipient_address, recipient_chain)
    }

    /// FIXME: should be invoked within portfolio program [`trade`](crate::context::Trade::trade)
    pub fn redeem_wrapped_with_payload(ctx: Context<RedeemWrappedWithPayload>, _vaa_hash: [u8; 32]) -> Result<()> {
        token_bridge::redeem_wrapped_with_payload(ctx, _vaa_hash)
    }
}
