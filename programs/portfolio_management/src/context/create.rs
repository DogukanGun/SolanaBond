use anchor_lang::prelude::*;
use anchor_spl::token::{Mint, Token, TokenAccount};

use crate::{InvestorsAccount, SEED_PREFIX_VAULT};


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
        seeds = [InvestorsAccount::SEED_PREFIX],
        bump
    )]
    pub investors_account: Account<'info, InvestorsAccount>,

    #[account(
        init,
        payer = payer,
        seeds = [SEED_PREFIX_VAULT],
        bump,
        token::mint = maker_token,
        token::authority = payer
    )]
    pub vault: Account<'info, TokenAccount>,

    pub token_program: Program<'info, Token>,
    pub system_program: Program<'info, System>,
}

impl<'info> CreateBond<'info>  {
    pub fn create_bond(&mut self, feed_id: String, bump: &CreateBondBumps) -> Result<()> {

        // TODO: set feed_id in the investors or use a fixed feed_id for now

        self.investors_account.investors_bump = bump.investors_account;
        self.investors_account.vault_bump = bump.vault;
        self.investors_account.investors = Vec::with_capacity(InvestorsAccount::INVESTORS_CAPACITY);
        Ok(())
    }
}
