//! These instructions are implemented for wrapped token transfers as a template and may change
//! rapidly during development.

use anchor_lang::prelude::*;

use crate::token_bridge::{
    Initialize,
    RegisterForeignContract,
    UpdateRelayerFee,
    SendWrappedWithPayload,
    RedeemWrappedWithPayload,
};


/// Initializes a token bridge by 1. init sender config 2. init redeemer config
pub fn initialize(ctx: Context<Initialize>, relayer_fee: u32, relayer_fee_precision: u32) -> Result<()> {
    ctx.accounts.initialize(relayer_fee, relayer_fee_precision, &ctx.bumps)
}

/// This instruction registers a new foreign contract (from another network) and saves the emitter
/// information in a [`ForeignContract`](crate::ForeignContract) account. This instruction is
/// owner-only, meaninig that the owner of the program (defined in
/// [`SenderConfig`](crate::SenderConfig) account) can add and update foreign contracts.
pub fn register_foreign_contract(ctx: Context<RegisterForeignContract>, chain: u16, address: Pubkey) -> Result<()> {
    ctx.accounts.register_foreign_contract(chain, address)
}

/// Updates relayer fee to be payed to the payer of the token bridge
pub fn update_relayer_fee(ctx: Context<UpdateRelayerFee>, relayer_fee: u32, relayer_fee_precision: u32) -> Result<()> {
    ctx.accounts.update_relayer_fee(relayer_fee, relayer_fee_precision)
}

/// Sends tokens over the bridge using [`transfer_wrapped_with_payload`](wormhole_anchor_sdk::token_bridge::transfer_wrapped_with_payload)
/// to transfer wrapped tokens over wormhole token bridge
pub fn send_wrapped_with_payload(ctx: Context<SendWrappedWithPayload>, batch_id: u32, amount: u64, recipient_address: Pubkey, recipient_chain: u16) -> Result<()> {
    ctx.accounts.send_wrapped_with_payload(batch_id, amount, recipient_address, recipient_chain, &ctx.bumps, ctx.program_id)
}

/// Redeems tokens over the bridge using
/// [`complete_transfer_wrapped_with_payload`](wormhole_anchor_sdk::token_bridge::complete_transfer_wrapped_with_payload)
/// to redeem wrapped tokens over wormhole token bridge
pub fn redeem_wrapped_with_payload(ctx: Context<RedeemWrappedWithPayload>, _vaa_hash: [u8; 32]) -> Result<()> {
    ctx.accounts.redeem_wrapped_with_payload(_vaa_hash)
}
