use anchor_lang::prelude::*;
use anchor_spl::token::{transfer, Token, TokenAccount, Transfer};

use crate::state::InvestorsAccount;

#[derive(Accounts)]
pub struct Fund<'info> {
    #[account(mut)]
    pub payer: Signer<'info>,
    #[account(mut)]
    pub investors_account: Account<'info, InvestorsAccount>,
    #[account(
        mut,
        seeds = [b"vault"],
        bump
    )]
    pub vault: Account<'info, TokenAccount>,
    pub token_program: Program<'info, Token>,
    #[account(
        mut,
        constraint = token_account.mint == investors_account.token_address
    )]
    pub token_account: Account<'info, TokenAccount>,
    pub system_program: Program<'info, System>,
}

impl<'info> Fund<'info> {
    pub fn transfer_tokens(&mut self, amount: u64, bump: &FundBumps) -> Result<()> {
        self.investors_account.vault_bump = bump.vault;
        let from_account = self.token_account.to_account_info();
        let to_account = self.vault.to_account_info();

        let transfer_instruction = Transfer {
            from: from_account.clone(),
            to: to_account.clone(),
            authority: self.payer.to_account_info(),
        };

        let cpi_ctx = CpiContext::new(self.token_program.to_account_info(), transfer_instruction);

        transfer(cpi_ctx, amount)?;

        Ok(())
    }
}
