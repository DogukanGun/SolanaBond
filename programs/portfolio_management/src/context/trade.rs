use crate::state::InvestorsAccount;
use anchor_lang::prelude::*;
use anchor_spl::token::{Token, TokenAccount};
use chainlink_solana as chainlink;
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
        let accounts = &mut self.investors_account.accounts.clone();
        let feed_info = accounts.first().unwrap(); //TODO Error check
        let mutable_slice_feed_data: &mut [u8] = &mut *feed_info.data.clone();
        let mutable_feed_lambort = &mut feed_info.lamports.clone();
        // This is the account of the price feed data to read from
        let feed_account = AccountInfo::new(&feed_info.key, 
            feed_info.is_signer, 
            feed_info.is_writable, 
            mutable_feed_lambort, 
            mutable_slice_feed_data, 
            &feed_info.owner, 
            feed_info.executable, 
            feed_info.rent_epoch
        );
        let chainlink_info = accounts.last().unwrap(); //TODO Error check
        let mutable_slice_chainlink_data: &mut [u8] = &mut *chainlink_info.data.clone();
        let mutable_chainlink_program_lambort = &mut chainlink_info.lamports.clone();
        let chainlink_program = AccountInfo::new(&chainlink_info.key, 
            chainlink_info.is_signer, 
            chainlink_info.is_writable, 
            mutable_chainlink_program_lambort, 
            mutable_slice_chainlink_data, 
            &chainlink_info.owner, 
            chainlink_info.executable, 
            chainlink_info.rent_epoch
        );
        // This is the chainlink solana program ID
        let round = chainlink::latest_round_data(chainlink_program.clone(), feed_account.clone())?;
        let decimals = chainlink::decimals(
            chainlink_program.clone(),
            feed_account.clone(),
        )?;
        let solana_price = (round.answer as f64) / 10_f64.powi(decimals as i32);
        if solana_price > ethereum_price {
        ////TODO send token inside the vault to the ethereum account
        }
        Ok(())
    }
}
