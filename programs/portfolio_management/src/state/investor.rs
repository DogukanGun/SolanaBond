use anchor_lang::{prelude::*, solana_program::{self, clock::Epoch}};

pub const MAX_INVESTORS: usize = 10;

#[account]
pub struct ChainlinkAccountInfo {
    pub key: Pubkey,
    pub is_signer: bool,
    pub is_writable: bool,
    pub lamports: u64,
    pub data: Box<[u8]>,
    pub owner: Pubkey,
    pub executable: bool,
    pub rent_epoch: Epoch,
}

#[account]
pub struct InvestorsAccount {
    pub num_investors: u8,              // Number of investors      (1)
    pub investors: Vec<Investor>,       // Vector of investors      (4 + (item_size * capacity))
    pub token_address: Pubkey,          // Token address for bond   (32)
    pub accounts: [ChainlinkAccountInfo;2],          // Chainlink Addresses      (32)
    pub vault_bump: u8,                 // Vault token account      (1)
    pub investors_bump: u8              // Investors account        (1)

}

impl InvestorsAccount {
    pub const MAXIMUM_SIZE: usize =
        (1) +                                                           // num_investors
        (4 + Investor::MAXIMUM_SIZE * Investor::INVESTORS_CAPACITY) +   // investors
        (32) +                                                          // token_address
        (32 * 2) +                                                      // feed_id
        (1) +                                                           // vault_bump
        (1);                                                            // investors_bump
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
pub struct Investor {
    pub identifier: Pubkey,             // Investor address
    pub amount: f32,                    // Total amount invested
    pub net_profit: f32,                // Total net profit, cannot be negative
}

impl Investor {
    pub const INVESTORS_CAPACITY: usize = 10;
    pub const MAXIMUM_SIZE: usize = (32) + (4) + (4);

    pub fn new(identifier: Pubkey, amount: f32) -> Self {
        Self {
            identifier,
            amount,
            net_profit: 0_f32,
        }
    }
}
