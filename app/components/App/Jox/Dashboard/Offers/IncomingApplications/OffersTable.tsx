import { Application } from '@/types/dashboard'

import React, { useEffect, useState } from 'react'

import Button from '@/components/Common/Button'
import { getMyOffers } from '@/services/ApiService'
import { useAnchorWallet, useWallet } from '@solana/wallet-adapter-react'
import { IDL, Jox } from '@/programs/jox';
import { Program } from "@coral-xyz/anchor"


export default function OffersTable({job_address}:Readonly<{ job_address: string }>) {
  const [offers, setOffers] = useState<Application[]>([])
  const wallet = useAnchorWallet();
  const { connected } = useWallet();
  const [makeAccountPublicKey, setMakeAccountPublicKey] = useState(null);
  const [error, setError] = useState("");
  const getProvider = () => {
    if ('phantom' in window) {
      const provider = window.phantom?.solana;

      if (provider?.isPhantom) {
        return provider;
      }
    }

    window.open('https://phantom.app/', '_blank');
  };
  const getOffersFromApi = async () => {
    const program: Program<Jox> = new Program(IDL, getProvider());
    const applicantListData = await program.account.job.fetch(job_address);
    setOffers(applicantListData.applicants)
  }

  useEffect(() => {
    getOffersFromApi()
  }, [])

  return (
    <tbody>
      {offers?.map((offer) => (
        <tr key={offer.wallet.toString()}>
          {' '}
          {/* Make sure each offer has a unique 'id' property */}
          <td className="p-3 font-medium text-slate-950">
            <div className="text-base">{offer.wallet.toString()}</div>
          </td>
          <td>
            <div className="p-3 text-base font-medium">
              <span className="text-slate-950">{offer.cid}</span>
            </div>
          </td>
          <td className="pr-5">
            <Button className="border border-emerald-400 bg-emerald-400 bg-opacity-10 px-8 py-2" onClick={() => {}}>
              <span className="text-emerald-400 ">ACCEPT</span>
            </Button>
          </td>
          <td className="pr-5">
            <Button className="border border-red-600 bg-red-600 bg-opacity-10 px-8 py-2">
              <span className="text-red-600">REJECT</span>
            </Button>
          </td>
          <td className="pr-5">
            <Button className="border border-blue-600 bg-blue-600 bg-opacity-10 px-8 py-2">
              <span className="text-blue-600">REPLY</span>
            </Button>
          </td>
        </tr>
      ))}
    </tbody>
  )
}
