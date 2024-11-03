'use client'

import React, { useEffect, useState } from 'react'

import Button from '@/components/Common/Button'
import Modal from '@/components/Common/Modal'
import getFormattedDateTime from '@/hooks/useCurrentDate'
import { modalStore } from '@/hooks/useStore'
import redstone from "redstone-api";
import * as anchor from "@coral-xyz/anchor";
import { Connection, LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js';
import { getAssociatedTokenAddress } from "@solana/spl-token";
import { randomBytes } from 'crypto';
import { ASSOCIATED_TOKEN_PROGRAM_ID as associatedTokenProgram, TOKEN_PROGRAM_ID as tokenProgram } from "@solana/spl-token"
import { Program } from "@coral-xyz/anchor"
import { BN } from '@project-serum/anchor';
import { IDL, Jox } from '@/programs/jox';
import { useWallet } from '@solana/wallet-adapter-react'

type P = {
  jobAddress: PublicKey
}

function Application({ jobAddress }: P) {
  const modalKey = 'application'
  const [solToUSD, setSolToUSD] = useState(0.0);
  const [cid, setCid] = useState("");
  const wallet = useWallet()

  const { toggleModal } = modalStore()

  const handleClose = () => {
    toggleModal(modalKey)
  }

  const fetchSolToUSD = async () => {
    const price = await redstone.getPrice("SOL");
    setSolToUSD(price.value);
  }

  useEffect(() => {
    fetchSolToUSD();
  }, [])

  const getProvider = () => {
    if ('phantom' in window) {
      const provider = window.phantom?.solana;

      if (provider?.isPhantom) {
        return provider;
      }
    }

    window.open('https://phantom.app/', '_blank');
  };

  const apply = async () => {
    const program: Program<Jox> = new Program(IDL, getProvider());
    const tx = await program
      .methods
      .apply(cid)
      .accountsPartial({
        applicant: "8ApHAVhCfTUnXGGXhw7JKFNepHYrkGoHi6Q2b4Uj8rNo",
        job: jobAddress,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .transaction()
    const connection = new Connection("https://api.devnet.solana.com");
    const { blockhash } = await connection.getLatestBlockhash();
    tx.recentBlockhash = blockhash;
    tx.feePayer = new PublicKey("8ApHAVhCfTUnXGGXhw7JKFNepHYrkGoHi6Q2b4Uj8rNo");
    if (wallet && wallet.signTransaction) {
      const signedTx = await wallet.signTransaction(tx)
      console.log("Signed Transaction:", signedTx);
    }
    handleClose()
  }

  return (
    <Modal>
      <div className="w-[577px] flex-col rounded-3xl bg-zinc-100 p-10 text-lg text-black">
        <div className="rounded-2xl bg-neutral-800 px-5 py-2 text-white">
          <div className="flex flex-row justify-between">
            <div className="">{solToUSD !== 0.0 ? `1 SOL = ${solToUSD.toFixed(3)} USD` : 'Loading...'}</div>
            <div>{getFormattedDateTime()}</div>
          </div>
          <div className="flex flex-row justify-between">
            <div>{solToUSD !== 0.0 ? `1 SOL = ${solToUSD.toFixed(3)} USD` : 'Loading...'}</div>
            <div>{getFormattedDateTime()}</div>
          </div>
        </div>
        <form className="flex flex-col">

          <input
            className="mt-8 rounded-3xl border border-zinc-300 bg-white text-neutral-500"
            type="text"
            placeholder="Your Application's CID"
            name="walletAddress"
            value={cid}
            onChange={(event) => setCid(event.target.value)}
          ></input>
        </form>

        <div className="mt-9 grid grid-cols-1 gap-3">
          <Button className="border bg-blue-600 py-2" onClick={apply}>
            <span className="text-white">Next</span>
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default Application
