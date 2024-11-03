use anchor_lang::prelude::*;
use anchor_spl::token::{transfer, Mint, Token, TokenAccount, Transfer};

use crate::{Investor, InvestorsAccount, SEED_PREFIX_VAULT};


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

    pub token_program: Program<'info, Token>,
    pub associated_token_program: Program<'info, Token>,
    pub system_program: Program<'info, System>,
}

impl<'info> Take<'info> {
    pub fn withdraw(&mut self) -> Result<()> {
        let from_account = self.vault.to_account_info();
        let to_account = self.maker_ata.to_account_info();
        let amount = self.vault.amount;

        let transfer_instructions = Transfer {
            from: from_account.clone(),
            to: to_account.clone(),
            authority: self.auth.to_account_info()
        };
        transfer(
            // ctx
            CpiContext::new(
                self.token_program.to_account_info(),
                transfer_instructions
            ),
            amount
        )?;

        // update bond data

        let investors: &mut Vec<Investor> = &mut self.investors_account.investors;
        if let Some(idx_investor) = investors.iter().position(|investor| investor.identifier == to_account.key()) {
            let investor = &mut investors[idx_investor];
            assert!(investor.amount >= amount);

            // if dropped to zero then remove this account from the bond
            if investor.amount == 0 {
                investors.remove(idx_investor);
            }
        }

        Ok(())
    }
}
