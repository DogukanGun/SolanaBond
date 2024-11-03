use anchor_lang::prelude::*;
use wormhole_anchor_sdk::wormhole::{
    program::Wormhole, FeeCollector, SequenceTracker, BridgeData
};
use wormhole_anchor_sdk::token_bridge::{
    program::TokenBridge, Config,
    SEED_PREFIX_MINT_AUTHORITY, SEED_PREFIX_AUTHORITY_SIGNER, SEED_PREFIX_EMITTER
};

use crate::token_bridge::{SenderConfig, RedeemerConfig, TokenBridgeError};


#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(mut)]
    /// Signer for creating the [`SenderConfig`] and [`RedeemerConfig`]
    pub owner: Signer<'info>,

    #[account(
        init,
        payer = owner,
        space = 8 + SenderConfig::MAXIMUM_SIZE,
        seeds = [SenderConfig::SEED_PREFIX],
        bump
    )]
    /// Saves program data for outbound transfers and
    /// saves payer of the [`initialize`](crate::initialize) instruction as the program's owner
    pub sender_config: Account<'info, SenderConfig>,

    #[account(
        init,
        payer = owner,
        space = 8 + RedeemerConfig::MAXIMUM_SIZE,
        seeds = [RedeemerConfig::SEED_PREFIX],
        bump
    )]
    /// Saves program data for inbound transfers and
    /// saves payer of the [`initialize`](crate::initialize) instruction as the program's owner
    pub redeemer_config: Account<'info, RedeemerConfig>,


    /******************************
     **** TOKEN BRIDGE ACCOUNTS ***
     ******************************/

    #[account(
        seeds = [Config::SEED_PREFIX],
        bump,
        seeds::program = token_bridge_program.key
    )]
    /// Token bridge program needs this account to invoke wormhole program to post messages.
    /// Even though it is a required account for redeeming token transfers, it is not actually
    /// used for completing these transfers.
    pub token_bridge_config: Account<'info, Config>,

    #[account(
        seeds = [SEED_PREFIX_AUTHORITY_SIGNER],
        bump,
        seeds::program = token_bridge_program.key
    )]
    /// CHECK: this isn't an account that holds data; it is purely just a signer for SPL transfers
    /// when it is delegated sending approval for the SPL token
    pub token_bridge_authority_signer: UncheckedAccount<'info>,

    #[account(
        seeds = [SEED_PREFIX_EMITTER],
        bump,
        seeds::program = token_bridge_program.key
    )]
    /// CHECK: this isn't an account that holds data; it is purely just a signer for posting
    /// wormhole messages on behalf of the token bridge program
    pub token_bridge_emitter: UncheckedAccount<'info>,

    #[account(
        seeds = [SequenceTracker::SEED_PREFIX],
        bump,
        seeds::program = token_bridge_program.key
    )]
    /// keeps track of the sequence number of the last posted message
    pub token_bridge_sequence: Account<'info, SequenceTracker>,

    #[account(
        seeds = [SEED_PREFIX_MINT_AUTHORITY],
        bump,
        seeds::program = token_bridge_program.key
    )]
    /// CHECK: this isn't an account that holds data; it is purely just a signer (SPL mint
    /// authority) for token bridge wrapped assets
    pub token_bridge_mint_authority: UncheckedAccount<'info>,

    #[account(
        seeds = [BridgeData::SEED_PREFIX],
        bump,
        seeds::program = wormhole_program.key
    )]
    pub wormhole_bridge: Account<'info, BridgeData>,

    #[account(
        seeds = [FeeCollector::SEED_PREFIX],
        bump,
        seeds::program = wormhole_program.key
    )]
    pub wormhole_fee_collector: Account<'info, FeeCollector>,

    /*****************
     *** PROGRAMS ****
     *****************/

    pub wormhole_program: Program<'info, Wormhole>,
    pub token_bridge_program: Program<'info, TokenBridge>,
    pub system_program: Program<'info, System>,
}

impl<'info> Initialize<'info> {
    pub fn initialize(&mut self, relayer_fee: u32, relayer_fee_precision: u32, bumps: &InitializeBumps) -> Result<()> {
        require!(relayer_fee < relayer_fee_precision, TokenBridgeError::InvalidRelayerFee);

        // initialize program's sender config
        let sender_config = &mut self.sender_config;
        sender_config.owner = self.owner.key();
        sender_config.bump = bumps.sender_config;
        // init token bridge and wormhole related addresses
        sender_config.token_bridge.config = self.token_bridge_config.key();
        sender_config.token_bridge.authority_signer = self.token_bridge_authority_signer.key();
        sender_config.token_bridge.emitter = self.token_bridge_emitter.key();
        sender_config.token_bridge.sequence = self.token_bridge_sequence.key();
        sender_config.token_bridge.wormhole_bridge = self.wormhole_bridge.key();
        sender_config.token_bridge.wormhole_fee_collector = self.wormhole_fee_collector.key();

        // initialize program's redeemer config
        let redeemer_config = &mut self.redeemer_config;
        redeemer_config.owner = self.owner.key();
        redeemer_config.bump = bumps.redeemer_config;
        redeemer_config.relayer_fee = relayer_fee;
        redeemer_config.relayer_fee_precision = relayer_fee_precision;
        // init token bridge and wormhole related addresses
        redeemer_config.token_bridge.config = self.token_bridge_config.key();
        redeemer_config.token_bridge.mint_authority = self.token_bridge_mint_authority.key();

        Ok(())
    }
}
