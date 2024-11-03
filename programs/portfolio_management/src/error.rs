use anchor_lang::error_code;


#[error_code]
pub enum PortfolioManagementError {
    #[msg("Specified investor is not part of the specified bond.")]
    InvestorNotInBond,

    #[msg("Specified amount exceeds the total available amount.")]
    InvalidAmount,
}
