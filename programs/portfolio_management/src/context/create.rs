use pyth_solana_receiver_sdk::price_update::get_feed_id_from_hex;
use anchor_lang::prelude::*;

use crate::state::InvestorsAccount;


#[derive(Accounts)]
pub struct CreateBond<'info> {
    #[account(mut)]
    pub payer: Signer<'info>,
    #[account(
        init,
        payer = payer,
        space = 8 + InvestorsAccount::MAXIMUM_SIZE,
        seeds = [b"investors"],
        bump
    )]
    pub investors_account: Account<'info, InvestorsAccount>,
    pub system_program: Program<'info, System>,
}

impl<'info> CreateBond<'info>  {
    pub fn create_bond(&mut self, feed_id: String, bump: &CreateBondBumps) -> Result<()> {
        self.investors_account.feed_id = get_feed_id_from_hex(&feed_id)?;
        self.investors_account.investors_bump = bump.investors_account;
        Ok(())
    }
}
