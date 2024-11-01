use anchor_lang::prelude::*;

#[derive(Default, AnchorSerialize, AnchorDeserialize, Clone)]
pub struct InboundTokenBridgeAddresses {
    /// PDAs (program addresses)
    pub config: Pubkey,
    pub custody_signer: Pubkey,
    pub mint_authority: Pubkey,
}

impl InboundTokenBridgeAddresses {
    const MAXIMUM_SIZE: usize =
            32      // config
        +   32      // authority_signer
        +   32      // wormhole_bridge
    ;
}

#[account]
pub struct RedeemerConfig {
    /// Program's owner
    pub owner: Pubkey,
    /// PDA bump
    pub bump: u8,
    /// Token bridge program's relevant addresses
    pub token_bridge: InboundTokenBridgeAddresses,
    /// Relayer fee and precision, the relayer fee is calculated as
    /// relayer_fee / relayer_fee_precision as percentage
    pub relayer_fee: u32,
    pub relayer_fee_precision: u32,
}

impl RedeemerConfig {
    pub const MAXIMUM_SIZE: usize =
            32      // pubkey
        +   1       // bump
        +   InboundTokenBridgeAddresses::MAXIMUM_SIZE
        +   4       // relayer_fee
        +   4       // relayer_fee_precision
    ;

    /// Relayer fee is determined by the percentage (relayer_fee / precision)
    pub fn compute_relayer_fee_amount(&self, amount: u64) -> u64 {
        (amount * self.relayer_fee as u64) / self.relayer_fee_precision as u64
    }
}
