use anchor_lang::{AnchorSerialize, AnchorDeserialize};
use std::io;
use wormhole_anchor_sdk::token_bridge::PostedTransferWith;
use wormhole_io::Readable;

const PAYLOAD_ID: u8 = 1;

#[derive(Clone, Copy)]
pub enum TokenMessage {
    Recipient { recipient: [u8; 32] },
}

impl AnchorSerialize for TokenMessage {
    fn serialize<W: io::Write>(&self, writer: &mut W) -> io::Result<()> {
        match self {
            TokenMessage::Recipient { recipient } => {
                PAYLOAD_ID.serialize(writer)?;
                recipient.serialize(writer)
            }
        }
    }
}

impl AnchorDeserialize for TokenMessage {
    fn deserialize_reader<R: io::Read>(reader: &mut R) -> io::Result<Self> {
        match u8::read(reader)? {
            PAYLOAD_ID => Ok(TokenMessage::Recipient {
                recipient: Readable::read(reader)?,
            }),
            _ => Err(io::Error::new(io::ErrorKind::InvalidInput, "invalid payload ID"))
        }
    }
}

pub type PostedTokenMessage = PostedTransferWith<TokenMessage>;

#[cfg(test)]
mod test {
    use super::*;
    use anchor_lang::prelude::{Pubkey, Result};
    use std::mem::size_of;

    #[test]
    fn test_message_alive() -> Result<()> {
        let recipient = Pubkey::new_unique().to_bytes();
        let msg = TokenMessage::Recipient { recipient };

        let mut encoded = Vec::new();
        msg.serialize(&mut encoded)?;

        // size_of(pubkey ++ id)
        assert_eq!(encoded.len(), size_of::<[u8; 32]>() + size_of::<u8>());

        // verify payload id
        assert_eq!(encoded[0], PAYLOAD_ID);

        // verify program id
        let TokenMessage::Recipient {
            recipient: decoded_recipient
        } = TokenMessage::deserialize(&mut encoded.as_slice())?;
        assert_eq!(decoded_recipient, recipient);

        Ok(())
    }
}
