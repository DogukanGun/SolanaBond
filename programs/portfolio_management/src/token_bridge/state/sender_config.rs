use anchor_lang::prelude::*;


#[derive(Default, AnchorSerialize, AnchorDeserialize, Clone)]
pub struct OutboundTokenBridgeAddresses {
    /// PDAs (program addresses)
    pub config: Pubkey,
    pub authority_signer: Pubkey,
    pub custody_signer: Pubkey,
    pub emitter: Pubkey,
    pub sequence: Pubkey,
    /// [BridgeData](wormhole_anchor_sdk::wormhole::BridgeData) address
    pub wormhole_bridge: Pubkey,
    /// [FeeCollector](wormhole_anchor_sdk::wormhole::FeeCollector) address
    pub wormhole_fee_collector: Pubkey
}

impl OutboundTokenBridgeAddresses {
    pub const MAXIMUM_SIZE: usize =
            32      // config
        +   32      // authority_signer
        +   32      // custody_signer
        +   32      // emitter
        +   32      // sequence
        +   32      // wormhole_bridge
        +   32      // wormhole_fee_collector
    ;
}

#[account]
pub struct SenderConfig {
    pub owner: Pubkey,
    pub bump: u8,
    pub token_bridge: OutboundTokenBridgeAddresses,
}

impl SenderConfig {
    pub const MAXIMUM_SIZE: usize =
            32      // owner
        +   1       // bump
        //+   OutboundTokenBridgeAddresses::MAXIMUM_SIZE  // token_bridge
        +   1       // finality
    ;
}
