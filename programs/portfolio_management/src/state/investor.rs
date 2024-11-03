use anchor_lang::prelude::*;


#[account]
#[derive(Default)]
/// Holds bond data for common feed_id
pub struct InvestorsAccount {
    pub num_investors: u8,              // Number of investors      (1)
    pub investors: Vec<Investor>,       // Vector of investors      (4 + (item_size * capacity))
    pub token_address: Pubkey,          // Token address for bond   (32)
    pub feed_id: [u8; 32],              // Feed id                  (32)
    pub vault_bump: u8,                 // Vault token account      (1)
    pub investors_bump: u8              // Investors account        (1)

}

impl InvestorsAccount {
    pub const INVESTORS_CAPACITY: usize = 10;
    pub const MAXIMUM_SIZE: usize =
        (1) +                                                           // num_investors
        (4 + Investor::MAXIMUM_SIZE * Self::INVESTORS_CAPACITY) +       // investors
        (32) +                                                          // token_address
        (32) +                                                          // feed_id
        (1) +                                                           // vault_bump
        (1);                                                            // investors_bump

    /// b"investors"
    pub const SEED_PREFIX: &'static [u8; 9] = b"investors";
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
pub struct Investor {
    pub identifier: Pubkey,             // Investor address
    pub amount: u64,                    // Total amount invested
    pub net_profit: u64,                // Total net profit, cannot be negative
}

impl Investor {
    pub const MAXIMUM_SIZE: usize = (32) + (8) + (8);

    pub fn new(identifier: Pubkey, amount: u64) -> Self {
        Self {
            identifier,
            amount,
            net_profit: 0 as u64,
        }
    }
}

#[cfg(test)]
mod test {
    use super::*;
    use std::mem::size_of;

    #[test]
    fn test_investor_mem_size() {
        assert_eq!(
            Investor::MAXIMUM_SIZE,
            size_of::<Pubkey>() + size_of::<u64>() + size_of::<u64>()
        );
    }

    #[test]
    fn test_investors_account_mem_size() {
        assert_eq!(
            InvestorsAccount::MAXIMUM_SIZE,
                    size_of::<u8>()
                +   4 + (Investor::MAXIMUM_SIZE * InvestorsAccount::INVESTORS_CAPACITY)   // Vec
                +   size_of::<Pubkey>() + size_of::<[u8; 32]>() + size_of::<u8>() + size_of::<u8>()
        );
    }
}
