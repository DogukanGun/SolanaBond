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

        transfer(
            // ctx
            CpiContext::new(
                self.token_program.to_account_info(),
                transfer_instruction
            ),
            amount
        )?;

        // at this point assume transfer is successful

        let investors: &mut Vec<Investor> = &mut self.investors_account.investors;
        if let Some(investor) = investors.iter_mut().find(|investor| investor.identifier == from_account.key()) {
            investor.amount += amount;
        } else {
            self.investors_account.investors.push(Investor::new(to_account.key(), amount))
        }

        Ok(())
    }
}
