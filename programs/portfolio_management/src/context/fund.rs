use anchor_lang::prelude::*;
use anchor_spl::token::{transfer, Mint, Token, TokenAccount, Transfer};

use crate::state::InvestorsAccount;

#[derive(Accounts)]
pub struct Fund<'info> {
    #[account(mut)]
    pub payer: Signer<'info>,
    pub auth: SystemAccount<'info>,
    #[account(mut)]
    pub maker_token: Box<Account<'info, Mint>>,
    #[account(mut)]
    pub maker_ata: Account<'info, TokenAccount>,
    #[account(
        mut,
        seeds = [b"investers".as_ref()],
        bump = investers_account.investers_bump
    )]
    pub investers_account: Account<'info, InvestorsAccount>,
    #[account(
        mut,
        seeds = [b"vault"],
        bump = investers_account.vault_bump,
        token::mint = maker_token,
        token::authority = auth
    )]
    pub vault: Account<'info, TokenAccount>,
    pub token_program: Program<'info, Token>,
    pub system_program: Program<'info, System>,
}

impl<'info> Fund<'info> {
    pub fn transfer_tokens(&mut self, amount: u64) -> Result<()> {
        let from_account = self.maker_ata.to_account_info();
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
