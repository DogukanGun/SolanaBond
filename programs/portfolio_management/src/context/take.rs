use crate::state::InvestorsAccount;
use anchor_lang::prelude::*;
use anchor_spl::token::{transfer, Mint, Token, TokenAccount, Transfer};

#[derive(Accounts)]
pub struct Take<'info> {
    #[account(mut)]
    pub payer: Signer<'info>,
    #[account(mut)]
    pub maker_token: Box<Account<'info, Mint>>,
    #[account(mut)]
    pub auth: Signer<'info>,
    #[account(mut)]
    pub maker_ata: Account<'info, TokenAccount>,
    #[account(
        mut,
        seeds = [b"investors"],
        bump = investors_account.investors_bump
    )]
    pub investors_account: Account<'info, InvestorsAccount>,
    #[account(
        mut,
        seeds = [b"vault"],
        bump = investors_account.vault_bump,
        token::mint = maker_token,
        token::authority = auth
    )]
    pub vault: Account<'info, TokenAccount>,
    pub token_program: Program<'info, Token>,
    pub associated_token_program: Program<'info, Token>,
    pub system_program: Program<'info, System>,
}

impl<'info> Take<'info> {
    pub fn withdraw(&self) -> Result<()> {
        let cpi_accounts = Transfer {
            from: self.vault.to_account_info(),
            to: self.maker_ata.to_account_info(),
            authority: self.auth.to_account_info(),
        };
        let ctx = CpiContext::new(
            self.token_program.to_account_info(),
            cpi_accounts,
        );
        transfer(ctx, self.vault.amount)
    }
}
