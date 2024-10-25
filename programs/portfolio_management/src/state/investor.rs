use anchor_lang::prelude::*;


pub const MAX_INVESTORS: usize = 10;

#[account]
pub struct InvestorsAccount {
    pub num_investors: u32,             // Number of investors      (4)
    pub investors: Vec<Investor>,       // Vector of investors      (4 + (item_size * capacity))
    pub token_address: Pubkey,          // Token address for bond   (32)
    pub feed_id: [u8; 32],              // Feed id                  (32)
    pub vault_bump: u8,                 // Vault token account      (1)
    pub investors_bump: u8              // Investors account        (1)

}

impl InvestorsAccount {
    pub const MAXIMUM_SIZE: usize =
        (4) +                                                           // num_investors
        (4 + Investor::MAXIMUM_SIZE * Investor::INVESTORS_CAPACITY) +   // investors
        (32) +                                                          // token_address
        (32) +                                                          // feed_id
        (1) +                                                           // vault_bump
        (1);                                                            // investors_bump
}
        //space = 8 + 4 + 32 * MAX_INVESTORS,

#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
pub struct Investor {
    pub identifier:Pubkey,
    pub amount:u32
}

impl Investor {
    pub const INVESTORS_CAPACITY: usize = 10;
    pub const MAXIMUM_SIZE: usize = (32) + (4);
}
