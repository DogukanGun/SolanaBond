use anchor_lang::prelude::*;


#[account]
pub struct InvestorsAccount {
    pub num_investers: u32,             // Number of investors      (4)
    pub investers: Vec<Invester>,       // Vector of investors      (4 + item_size* max_item)
    pub token_address: Pubkey,          // Token address for bond   (32)
    pub feed_id: [u8; 32],              // Feed id                  (32)
    pub vault_bump: u8,                 // Seed for PDA             (1)
    pub investers_bump: u8,             // Seed for investers       (1)

}

#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
pub struct Invester {
    pub identifier: Pubkey,             // (32)
    pub amount: u32                     // (4)
}

impl InvestorsAccount {
    pub const MAX_INVESTORS: usize = 10;
    pub const MAXIMUM_SIZE: usize =
        (4)  +                                                              // num_investers
        (4   + Invester::MAXIMUM_SIZE * InvestorsAccount::MAX_INVESTORS) +  // investers
        (32) +                                                              // token_address
        (32) +                                                              // feed_id
        (1)  +                                                              // vault_bump
        (1);                                                                // investers_bump
}

impl Invester {
    pub const MAXIMUM_SIZE: usize = (32) + (4);
}
