use anchor_lang::prelude::*;


pub const MAX_INVESTORS: usize = 10;

#[account]
pub struct InvestorsAccount {
    pub num_investers: u32,             // Number of investors
    pub investers: Vec<Invester>,       // Vector of investors
    pub token_address: Pubkey,          // Token address for bond
    pub feed_id: [u8; 32],              // Feed id
    pub vault_bump: u8,
    pub investers_bump: u8

}

#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
pub struct Invester {
    pub identifier:Pubkey,
    pub amount:u32
}