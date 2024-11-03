use anchor_lang::prelude::*;
use anchor_spl::token::{Token, TokenAccount};

use crate::{InvestorsAccount, SEED_PREFIX_VAULT};


#[derive(Accounts)]
pub struct Trade<'info> {
    #[account(mut)]
    pub payer: Signer<'info>,

    #[account(mut)]
    pub investors_account: Account<'info, InvestorsAccount>,

    #[account(
        mut,
        seeds = [SEED_PREFIX_VAULT],
        bump = investors_account.vault_bump,
    )]
    pub vault: Account<'info, TokenAccount>,

    pub token_program: Program<'info, Token>,
    pub system_program: Program<'info, System>,
}

impl<'info> Trade<'info> {
    pub fn trade(&mut self, ethereum_price: f64) -> Result<()> {

        // TODO: implement trading logic between chains using token bridge

        Ok(())
    }
}
