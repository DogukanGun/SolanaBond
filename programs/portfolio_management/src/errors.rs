use anchor_lang::prelude::*;

#[error_code]
pub enum ProgramError {
    #[msg("Maximum amount of investors is reached")]
    MaxInvestorsReached,
}
