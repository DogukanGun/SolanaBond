import * as anchor from "@coral-xyz/anchor";
import { BN, Program } from "@coral-xyz/anchor";
import { PortfolioManagement } from "../target/types/portfolio_management";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

describe("portfolio_management", () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.PortfolioManagement as Program<PortfolioManagement>;
  const maker = anchor.web3.Keypair.generate();
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
  it("Airdrop", async () => {
    const airdropMaker = await provider.connection.requestAirdrop(maker.publicKey, 20 * anchor.web3.LAMPORTS_PER_SOL).then(confirm);
    console.log("\nAirdropped 5 SOL to maker", airdropMaker);
  })
  it("Create Bond!", async () => {
    // Add your test here.
    const tx = await program
      .methods
      .createBond("0x63f341689d98a12ef60a5cff1d7f85c70a9e17bf1575f0e7c0b2512d48b1c8b3")
      .accounts({
        payer: maker.publicKey
      })
      .signers([maker])
      .rpc();
    confirm(tx);
    console.log("Your transaction signature", tx);
  });
  
});
