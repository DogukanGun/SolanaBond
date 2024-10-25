import * as anchor from "@coral-xyz/anchor";
import { BN, Program } from "@coral-xyz/anchor";
import { PortfolioManagement } from "../target/types/portfolio_management";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { getPriceFeedAccountForProgram } from "@pythnetwork/pyth-solana-receiver"
import { expect } from "chai";

describe("portfolio_management", () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.PortfolioManagement as Program<PortfolioManagement>;
  const maker = anchor.web3.Keypair.generate();
  const [investorsPDA, bump] = anchor.web3.PublicKey.findProgramAddressSync(
    [
      Buffer.from("investors"), // Constant seed
    ],
    program.programId
  );
  const defaultShardId = 0;
  const investorsCapacity = 10;

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
    let feedId = "0x63f341689d98a12ef60a5cff1d7f85c70a9e17bf1575f0e7c0b2512d48b1c8b3"
    const tx = await program
      .methods
      .createBond(feedId)
      .accounts({
        payer: maker.publicKey
      })
      .signers([maker])
      .rpc();
    confirm(tx);
    console.log("Your transaction signature", tx);

    let investorsAccount = await program.account.investorsAccount.fetch(investorsPDA);
    expect(getPriceFeedAccountForProgram(defaultShardId, Buffer.from(investorsAccount.feedId)))
      .eql(getPriceFeedAccountForProgram(defaultShardId, feedId));
    expect(investorsAccount.numInvestors).equal(0);
    expect(investorsAccount.investors).to.be.an("array").of.length(investorsCapacity);
    expect(investorsAccount.tokenAddress.equals(anchor.web3.PublicKey.default)); // ones
    expect(investorsAccount.investorsBump).equal(bump);
    expect(investorsAccount.vaultBump).equal(0);
  });
});
