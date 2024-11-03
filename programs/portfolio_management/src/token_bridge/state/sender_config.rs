use anchor_lang::prelude::*;

use crate::token_bridge;


#[derive(Default, AnchorSerialize, AnchorDeserialize, Clone)]
pub struct OutboundTokenBridgeAddresses {
    /// PDAs (program addresses)
    pub config: Pubkey,
    pub authority_signer: Pubkey,
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
        +   OutboundTokenBridgeAddresses::MAXIMUM_SIZE  // token_bridge
        +   1       // finality
    ;

    /// b"sender"
    pub const SEED_PREFIX: &'static [u8; 6] = token_bridge::SEED_PREFIX_SENDER;
}

#[cfg(test)]
mod test {
    use super::*;
    use std::mem::size_of;

    #[test]
    fn test_outbound_addresses_mem_size() {
        assert_eq!(
            OutboundTokenBridgeAddresses::MAXIMUM_SIZE,
            size_of::<OutboundTokenBridgeAddresses>()
        )
    }

    #[test]
    fn test_mem_size() {
        assert_eq!(
            SenderConfig::MAXIMUM_SIZE,
            size_of::<Pubkey>() + size_of::<u8>() + size_of::<OutboundTokenBridgeAddresses>() + size_of::<u8>()
        );
    }
}
