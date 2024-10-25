use pyth_solana_receiver_sdk::price_update::get_feed_id_from_hex;
use anchor_lang::prelude::*;
use anchor_spl::token::{Mint, Token, TokenAccount};
use crate::state::InvestorsAccount;


#[derive(Accounts)]
pub struct CreateBond<'info> {
    #[account(mut)]
    pub payer: Signer<'info>,
    #[account(mut)]
    pub maker_token: Box<Account<'info, Mint>>,
    #[account(
        init_if_needed,
        payer = payer,
        space = 8 + InvestorsAccount::MAXIMUM_SIZE,
        seeds = [b"investors".as_ref()],
        bump
    )]
    pub investors_account: Account<'info, InvestorsAccount>,
    #[account(
        init,
        payer = payer,
        seeds = [b"vault"],
        bump,
        token::mint = maker_token,
        token::authority = payer
    )]
    pub vault: Account<'info, TokenAccount>,
    pub token_program: Program<'info, Token>,
    pub system_program: Program<'info, System>,
}

impl<'info> CreateBond<'info>  {
    pub fn create_bond(&mut self, feed_id:String, bump:&CreateBondBumps) -> Result<()>{
        self.investors_account.feed_id = get_feed_id_from_hex(&feed_id)?;
        self.investors_account.investors_bump = bump.investors_account;
        self.investors_account.vault_bump = bump.vault;
        Ok(())
    }
}
