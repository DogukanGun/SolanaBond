use anchor_lang::prelude::*;

use crate::{PostedTokenMessage, token_bridge};


#[account]
/// Foreign emitter account data.
pub struct ForeignContract {
    /// Foreign emitter chain. Cannot equal `1` (Solana's Chain ID).
    pub chain: u16,
    /// Foreign emitter address. Cannot be zero address.
    pub address: Pubkey,
    /// Token Bridge program's foreign endpoint account key.
    pub token_bridge_foreign_endpoint: Pubkey,
}

impl ForeignContract {
    pub const MAXIMUM_SIZE: usize =
            2       // chain
        +   32      // address
        +   32      // token_bridge_foreign_endpoint
    ;

    /// b"foreign_contract"
    pub const SEED_PREFIX: &'static [u8; 16] = token_bridge::SEED_PREFIX_FOREIGN_CONTRACT;

    /// Convenience method to check whether an address equals to the one saved in this account.
    pub fn verify(&self, vaa: &PostedTokenMessage) -> bool {
        let from_address: [u8; 32] = *vaa.data().from_address();
        self.chain == vaa.emitter_chain() && self.address == Pubkey::from(from_address)
    }
}

#[cfg(test)]
mod test {
    use super::*;
    use std::mem::size_of;
    use wormhole_anchor_sdk::{
        token_bridge::{TransferHeader, TransferWith},
        wormhole::PostedVaaMeta
    };

    use crate::message::TokenMessage;


    #[test]
    fn test_foreign_contract_mem_size() {
        assert_eq!(
            ForeignContract::MAXIMUM_SIZE,
            size_of::<u16>() + size_of::<Pubkey>() + size_of::<Pubkey>()
        );
    }


    #[test]
    fn test_foreign_contract_verify() -> Result<()> {
        let chain: u16 = 2;
        let address = Pubkey::new_unique();
        let token_bridge_foreign_endpoint = Pubkey::new_unique();
        let foreign_contract = ForeignContract {
            chain,
            address,
            token_bridge_foreign_endpoint
        };

        let vaa = PostedTokenMessage {
            meta: PostedVaaMeta {
                version: 1,
                finality: 200,
                timestamp: 0,
                signature_set: Pubkey::new_unique(),
                posted_timestamp: 1,
                batch_id: 69,
                sequence: 420,
                emitter_chain: chain,
                emitter_address: Pubkey::new_unique().to_bytes()
            },
            payload: (
                0,
                TransferWith::new(
                    &TransferHeader {
                        amount: 1,
                        token_chain: 2,
                        token_address: Pubkey::new_unique().to_bytes(),
                        to_chain: chain,
                        to_address: Pubkey::new_unique().to_bytes(),
                        from_address: address.to_bytes(),
                    },
                    &TokenMessage::Recipient {
                        recipient: Pubkey::new_unique().to_bytes()
                    }
                )
            ),
        };

        assert!(
            foreign_contract.verify(&vaa),
            "foreign_contract.verify(&vaa) failed"
        );

        Ok(())
    }
}
