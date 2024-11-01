use anchor_lang::prelude::*;
use crate::token_bridge::context::{
    Initialize,
    RegisterForeignContract,
    UpdateRelayerFee,
    SendWrappedWithPayload,
    RedeemWrappedWithPayload,
};

/// Initializes a token bridge by
/// 1. init sender config
/// 2. init redeemer config
pub fn initialize(ctx: Context<Initialize>, relayer_fee: u32, relayer_fee_precision: u32) -> Result<()> {
    ctx.accounts.initialize(&ctx.bumps)
}

/// This instruction registers a new foreign contract (from another network) and saves the emitter
/// information in a ForeignEmitter account. This instruction is owner-only, meaninig that the
/// owner of the program (defined in [Config] account) can add and update foreign contracts.
pub fn register_foreign_contract(ctx: Context<RegisterForeignContract>, chain: u16, address: Pubkey) -> Result<()> {
    ctx.accounts.register_foreign_contract(chain, address)
}

/// Updates relayer fee to be payed to the payer of the token bridge
pub fn update_relayer_fee(ctx: Context<UpdateRelayerFee>, relayer_fee: u32, relayer_fee_precision: u32) -> Result<()> {
    ctx.accounts.update_relayer_fee(relayer_fee, relayer_fee_precision)
}

pub fn send_wrapped_with_payload(ctx: Context<SendWrappedWithPayload>, batch_id: u32, amount: u64, recipient_address: Pubkey, recipient_chain: u16) -> Result<()> {
    ctx.accounts.send_wrapped_with_payload(batch_id, amount, recipient_address, recipient_chain, &ctx.bumps, ctx.program_id)
}

pub fn redeem_wrapped_with_payload(ctx: Context<RedeemWrappedWithPayload>, _vaa_hash: [u8; 32]) -> Result<()> {
    ctx.accounts.redeem_wrapped_with_payload(_vaa_hash)
}
