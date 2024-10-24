import * as anchor from "@coral-xyz/anchor";
import { BN, Program } from "@coral-xyz/anchor";
import { PortfolioManagement } from "../target/types/portfolio_management";
import { Keypair, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { ASSOCIATED_TOKEN_PROGRAM_ID as associatedTokenProgram, TOKEN_PROGRAM_ID as tokenProgram, createMint, createAccount, mintTo, getAssociatedTokenAddress, createTransferInstruction, getOrCreateAssociatedTokenAccount } from "@solana/spl-token"
import { HermesClient, PriceUpdate } from "@pythnetwork/hermes-client";

describe("portfolio_management", () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.PortfolioManagement as Program<PortfolioManagement>;
  const vault = PublicKey.findProgramAddressSync([Buffer.from("vault")], program.programId)[0];
  let auth_token: PublicKey;
  let auth_ata: PublicKey;

  const maker = anchor.web3.Keypair.generate();
  const auth = anchor.web3.Keypair.generate();
  const [investersPDA, bump] = anchor.web3.PublicKey.findProgramAddressSync(
    [
      Buffer.from("investers"), // Constant seed
    ],
    program.programId
  );
  const confirm = async (signature: string): Promise<string> => {
    const block = await provider.connection.getLatestBlockhash();
    console.log(block.blockhash)
    console.log(block.lastValidBlockHeight)
    const res = await provider.connection.confirmTransaction({
      signature,
      ...block,
    });
    console.log(res);

    return signature;
  };
  const newMintToAta = async (connection, minter: Keypair): Promise<{ mint: PublicKey, ata: PublicKey }> => {
    const mint = await createMint(connection, minter, minter.publicKey, null, 6)
    const ata = await createAccount(connection, minter, mint, minter.publicKey)
    const signature = await mintTo(connection, minter, mint, ata, minter, 21e8)
    await confirm(signature)
    return {
      mint,
      ata
    }
  }
  it("Airdrop", async () => {
    const airdropMaker = await provider.connection.requestAirdrop(maker.publicKey, 20 * anchor.web3.LAMPORTS_PER_SOL).then(confirm);
    console.log("\nAirdropped 5 SOL to maker", airdropMaker);
    const airdropAuth = await provider.connection.requestAirdrop(auth.publicKey, 20 * anchor.web3.LAMPORTS_PER_SOL).then(confirm);
    console.log("\nAirdropped 5 SOL to auth", airdropAuth);
  })
  it("Create Mint", async () => {
    const a = await newMintToAta(anchor.getProvider().connection, auth);
    auth_token = a.mint;
    auth_ata = a.ata;
  });
  it("Transfer Mint to Maker", async () => {
    const auth_token_balance = await provider.connection.getTokenAccountBalance(auth_ata);
    const amount_to_transfer = new BN(parseInt(auth_token_balance.value.amount) / 2);
    const maker_ata_address = await getOrCreateAssociatedTokenAccount(provider.connection, maker,
      auth_token,             // Token mint
      maker.publicKey);

    const transferInstruction = createTransferInstruction(
      auth_ata,
      maker_ata_address.address,
      auth.publicKey,
      amount_to_transfer.toNumber(),
      [],
      tokenProgram
    );
    const tx = new anchor.web3.Transaction().add(transferInstruction);
    const signature = await provider.sendAndConfirm(tx, [auth]);
    await confirm(signature);
    console.log("Half of the tokens transferred to maker, signature:", signature);
    console.log("Auth balance", await provider.connection.getTokenAccountBalance(auth_ata));
    console.log("Maker balance", await provider.connection.getTokenAccountBalance(maker_ata_address.address));

  });
  it("Create Bond!", async () => {
    const tx = await program
      .methods
      .createBond("0x63f341689d98a12ef60a5cff1d7f85c70a9e17bf1575f0e7c0b2512d48b1c8b3")
      .accountsPartial({
        payer: auth.publicKey,
        makerToken: auth_token,
        investersAccount: investersPDA,
        vault: vault,
      })
      .signers([auth])
      .rpc();
    confirm(tx);
    console.log("Your transaction signature", tx);
  });

  it("Invest in Bond!", async () => {
    const maker_ata_address = await getOrCreateAssociatedTokenAccount(provider.connection, maker,
      auth_token,
      maker.publicKey);
    const tx = await program
      .methods
      .investInBond(new BN(1 * LAMPORTS_PER_SOL))
      .accounts({
        payer: maker.publicKey,
        investersAccount: investersPDA,
        makerAta: maker_ata_address.address,
        makerToken: auth_token,
        auth: auth.publicKey,
      })
      .signers([maker])
      .rpc();
    confirm(tx);
    console.log("Your transaction signature", tx);
  });

  it("Get Price and make decision and then trade", async () => {
    const connection = new HermesClient("https://hermes.pyth.network", {});
    const priceIds = [
      "0x63f341689d98a12ef60a5cff1d7f85c70a9e17bf1575f0e7c0b2512d48b1c8b3", // 1INCH/USD price id
    ];
    const priceUpdate: PriceUpdate = await connection.getLatestPriceUpdates(priceIds);
    const price = priceUpdate.parsed[0].price;
    const priceValue = Number(price.price) * Math.pow(10, price.expo);
    console.log(priceValue);
    const tx = await program
      .methods
      .trade(priceValue)
      .accounts({
        investersAccount: investersPDA,
        payer: auth.publicKey,
      })
      .signers([auth])
      .rpc();
    confirm(tx);
    console.log("Your transaction signature", tx);

  });

});
