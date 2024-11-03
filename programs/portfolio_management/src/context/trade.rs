use crate::state::InvestorsAccount;
use anchor_lang::prelude::*;
use anchor_spl::token::{Token, TokenAccount};
//use pyth_solana_receiver_sdk::price_update::PriceUpdateV2;

#[derive(Accounts)]
pub struct Trade<'info> {
    #[account(mut)]
    pub payer: Signer<'info>,
    //pub price_update: Account<'info, PriceUpdateV2>,
    #[account(mut)]
    pub investors_account: Account<'info, InvestorsAccount>,
    #[account(
        mut,
        seeds = [b"vault"],
        bump = investors_account.vault_bump,
    )]
    pub vault: Account<'info, TokenAccount>,
    pub token_program: Program<'info, Token>,
    pub system_program: Program<'info, System>,
}

impl<'info> Trade<'info> {
    pub fn trade(&mut self, ethereum_price: f64) -> Result<()> {
        //let price = self.price_update.get_price_no_older_than(
            //&Clock::get()?,
            //30,
            //&self.investors_account.feed_id,
        //)?;
        //let price_value = price.price as f64 * 10_f64.powi(price.exponent);
        //msg!("Price value: {}", price_value);
        //if price_value > ethereum_price {
            ////TODO send token inside the vault to the ethereum account
        //}
        Ok(())
    }
}
