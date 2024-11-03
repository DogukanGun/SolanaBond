use anchor_lang::prelude::*;
use anchor_spl::token::{transfer, Mint, Token, TokenAccount, Transfer};

use crate::{Investor, InvestorsAccount, SEED_PREFIX_VAULT};


#[derive(Accounts)]
pub struct Fund<'info> {
    #[account(mut)]
    pub payer: Signer<'info>,

    #[account(mut)]
    pub maker_token: Box<Account<'info, Mint>>,

    #[account(mut)]
    pub maker_ata: Account<'info, TokenAccount>,

    #[account(
        mut,
        seeds = [InvestorsAccount::SEED_PREFIX],
        bump = investors_account.investors_bump
    )]
    pub investors_account: Account<'info, InvestorsAccount>,

    #[account(
        mut,
        seeds = [SEED_PREFIX_VAULT],
        bump = investors_account.vault_bump,
        token::mint = maker_token,
        token::authority = auth
    )]

    pub vault: Account<'info, TokenAccount>,
    pub auth: SystemAccount<'info>,

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

        /// TODO: change this to u32 or u64 type instead
        let amount_as_f32 = amount as f32 / 10_u32.pow(6_u32) as f32;

        let investors: &mut Vec<Investor> = &mut self.investors_account.investors;
        if let Some(investor) = investors.iter_mut().find(|investor| investor.identifier == to_account.key()) {
            investor.amount += amount_as_f32;
        } else {
            self.investors_account.investors.push(Investor::new(to_account.key(), amount_as_f32))
        }

        Ok(())
    }
}
