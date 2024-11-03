import Modal from '@/components/Common/Modal'
import { modalStore } from '@/hooks/useStore';
import getFormattedDateTime from '@/hooks/useCurrentDate'
import React, { useState, useEffect } from 'react'
import redstone from "redstone-api";
import { useWallet } from '@solana/wallet-adapter-react';
import * as anchor from "@coral-xyz/anchor";
import { Connection, LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js';
import { getAssociatedTokenAddress } from "@solana/spl-token";
import { randomBytes } from 'crypto';
import { ASSOCIATED_TOKEN_PROGRAM_ID as associatedTokenProgram, TOKEN_PROGRAM_ID as tokenProgram } from "@solana/spl-token"
import { Program } from "@coral-xyz/anchor"
import { BN } from '@project-serum/anchor';
import { IDL, Jox } from '@/programs/jox';
import { createJob } from '@/services/ApiService';


const CreateJob = () => {
  const modalKey = 'createJob';
  const { toggleModal } = modalStore();

  const [solToUSD, setSolToUSD] = useState(0.0);
  const [solToETH, setSolToETH] = useState(0.0);
  const wallet = useWallet();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [cid, setCid] = useState("");
  const [jobAddress, setJobAddress] = useState("");

  async function getATA(walletAddress: string): Promise<string> {
    const walletPubkey = new PublicKey(walletAddress);
    const mintPubkey = new PublicKey("GrNg1XM2ctzeE2mXxXCfhcTUbejM8Z4z4wNVTy2FjMEz");
    const ata = await getAssociatedTokenAddress(
      mintPubkey, // Mint address
      walletPubkey // Wallet address
    );
    console.log("Associated Token Account:", ata.toString());
    return ata.toString();
  }

  const fetchSolToUSD = async () => {
    const price = await redstone.getPrice("SOL");
    setSolToUSD(price.value);
  }

  const fetchSolToETH = async () => {
    const solPrice = await redstone.getPrice("SOL");
    const ethPrice = await redstone.getPrice("ETH");
    const solToEth = solPrice.value / ethPrice.value;
    setSolToETH(solToEth);
  }

  const handleClose = () => {
    toggleModal(modalKey);
  }

  const save = async (contract_address: PublicKey) => {
    await createJob({
      contract_address: contract_address.toString(),
      owner: wallet.publicKey?.toString() ?? "",
      cid: cid,
      name: name,
      description: description
    })
  }

  const getProvider = () => {
    if ('phantom' in window) {
      const provider = window.phantom?.solana;

      if (provider?.isPhantom) {
        return provider;
      }
    }

    window.open('https://phantom.app/', '_blank');
  };

  const handleMake = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const program: Program<Jox> = new Program(IDL, getProvider());
    const seedForJob: anchor.BN = new BN(randomBytes(8));
    const seedForJobBuffer = Buffer.alloc(8);
    seedForJobBuffer.writeBigUInt64LE(BigInt(seedForJob), 0);
    const job = PublicKey.findProgramAddressSync(
      [Buffer.from("job"), wallet.publicKey!.toBuffer(), seedForJobBuffer],
      program.programId
    )[0];
    setJobAddress(job.toString());
    const vault = PublicKey.findProgramAddressSync([Buffer.from("vault"), wallet.publicKey!.toBuffer()], program.programId)[0];
    const ata = await getATA(wallet.publicKey!.toString());
    const tx = await program
      .methods
      .publish(seedForJob, cid, name, description, new BN(1 * LAMPORTS_PER_SOL))
      .accountsPartial({
        maker: wallet.publicKey!,
        makerAta: new PublicKey(ata),
        makerMint: new PublicKey("4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU"),
        vault: vault,
        posting: job,
        tokenProgram: tokenProgram,
        associatedTokenProgram: associatedTokenProgram,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .transaction()
    const connection = new Connection("https://api.devnet.solana.com"); // Replace with correct endpoint
    const { blockhash } = await connection.getLatestBlockhash();
    tx.recentBlockhash = blockhash;
    tx.feePayer = wallet.publicKey!;
    if (wallet && wallet.signTransaction) {
      const signedTx = await wallet.signTransaction(tx)
      console.log("Signed Transaction:", signedTx);
      await save(job)
    }
    toggleModal(modalKey)
  }

  useEffect(() => {
    fetchSolToUSD();
    fetchSolToETH();
  }, [])

  return (
    <Modal>
      <div className="w-[577px] flex-col rounded-3xl bg-zinc-100 p-10 text-lg text-black">
        <div className="rounded-2xl bg-neutral-800 px-5 py-2 text-white">
          <div className="flex flex-row justify-between">
            <div className="">{solToUSD !== 0.0 ? `1 SOL = ${solToUSD.toFixed(3)} USD` : 'Loading...'}</div>
            <div>{getFormattedDateTime()}</div>
          </div>
          <div className="flex flex-row justify-between">
            <div>{solToETH !== 0.0 ? `1 SOL = ${solToETH.toFixed(3)} ETH` : 'Loading...'}</div>
            <div>{getFormattedDateTime()}</div>
          </div>
        </div>

        <form onSubmit={handleMake} className="flex flex-col">
          <div className="relative mt-8">
            <input
              className="w-full rounded-full border-zinc-300 bg-white text-neutral-500 px-5 py-3 backdrop-blur-sm"
              placeholder="Job Name"
              type="text"
              onChange={(event) => setName(event.target.value)}
            />
          </div>
          <div className="relative mt-5">
            <input
              className="w-full rounded-full border-zinc-300 bg-white text-neutral-500 px-5 py-3 backdrop-blur-sm"
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Description"
            />
          </div>
          <div className="relative mt-5">
            <input
              className="w-full rounded-full border-zinc-300 bg-white text-neutral-500 px-5 py-3 backdrop-blur-sm"
              onChange={(event) => setCid(event.target.value)}
              placeholder="Cid"
            />
          </div>
          <div className="flex justify-center text-white gap-4 mt-7">
            <button type="reset" onClick={handleClose} className="p-2 w-56 rounded-full bg-gray-600">Cancel</button>
            <button type="submit" className="p-2 w-56 rounded-full bg-blue-600">Save Job</button>
          </div>
        </form>
      </div>
    </Modal>
  )
}

export default CreateJob
