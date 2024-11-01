use anchor_lang::prelude::*;


#[error_code]
pub enum TokenBridgeError {
    #[msg("OwnerOnly")]
    /// Only the program owner is permitted.
    OwnerOnly,

    #[msg("InvalidRelayerFee")]
    /// Specified relayer fee must be less than its precision
    InvalidRelayerFee,

    #[msg("Specified Wormhole fee collector PDA is wrong")]
    InvalidFeeCollectorAddress,

    #[msg("Specified emitter's Wormhole sequence tracker PDA is wrong.")]
    InvalidSequenceTrackerAddress,

    #[msg("Specified token bridge emitter PDA is wrong.")]
    InvalidTokenBridgeEmitterAddress,

    #[msg("Specified Wormhole bridge data PDA is wrong.")]
    InvalidWormholeBridgeAddress,

    #[msg("Specified token bridge config PDA is wrong.")]
    InvalidTokenBridgeConfigAddress,

    #[msg("Specified token bridge authority signer PDA is wrong.")]
    InvalidTokenBridgeAuthoritySignerAddress,

    #[msg("Specified chain ID is invalid, it may not exist or equal to the Solana chain ID.")]
    InvalidChainID,

    #[msg("Specified address is not valid, i.e. zeros or not found.")]
    InvalidAddress,

    #[msg("Specified associated token account does not belong to the relayer (payer).")]
    InvalidPayerAta,

    #[msg("Specified vaa addresses (chain or address) do not match the foreign contract.")]
    InvalidVaa,

    #[msg("Deserialized recipient (VAA to_address) must be this program or the redeemer PDA.")]
    InvalidTransferToAddress,

    #[msg("Deserialized token chain (VAA to_chain) must be SOLANA chain ID.")]
    InvalidTransferToChain,

    #[msg("Deserialized recipient chain (VAA token_chain) must NOT equal to SOLANA chain ID.")]
    InvalidTransferTokenChain,

    #[msg("Token bridge program's foreign endpoint disagrees with registered one.")]
    InvalidTokenBridgeForeignEndpoint,

    #[msg("Specified token bridge mint authority PDA is wrong (does not match to redeemer config).")]
    InvalidTokenBridgeMintAuthority,

    #[msg("Token transfer is already redeemed.")]
    AlreadyRedeemed,

    #[msg("Specified recipient in the payload message does NOT match the token bridge intended recipient.")]
    PayloadRecipientMismatch,

    #[msg("Relayer needs to create an associated token account to be paid.")]
    NonExistentRelayerAta,
}
