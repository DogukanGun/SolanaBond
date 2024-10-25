use anchor_lang::prelude::*;


#[account]
pub struct InvestorsAccount {
    pub num_investors: u8,                                      // Number of investors      (1)
    pub investors: [Investor; Investor::INVESTORS_CAPACITY],    // Vector of investors      (item_size * capacity)
    pub token_address: Pubkey,                                  // Token address for bond   (32)
    pub feed_id: [u8; 32],                                      // Feed id                  (32)
    pub vault_bump: u8,                                         // Seed for PDA             (1)
    pub investors_bump: u8,                                     // Seed for investors       (1)
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
pub struct Investor {
    pub identifier: Pubkey,             // (32)
    pub amount: u32                     // (4)
}

impl InvestorsAccount {
    pub const MAXIMUM_SIZE: usize =
        (1)  +                                                          // num_investors
        (Investor::MAXIMUM_SIZE * Investor::INVESTORS_CAPACITY) +       // investors
        (32) +                                                          // token_address
        (32) +                                                          // feed_id
        (1)  +                                                          // vault_bump
        (1);                                                            // investors_bump
}

impl Investor {
    pub const INVESTORS_CAPACITY: usize = 10;
    pub const MAXIMUM_SIZE: usize = (32) + (4);
}
