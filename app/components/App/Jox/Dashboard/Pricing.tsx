'use client'

import React, { ChangeEvent, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import Button from '@/components/Common/Button'
import Modal from '@/components/Common/Modal'
import getFormattedDateTime from '@/hooks/useCurrentDate'
import { modalStore } from '@/hooks/useStore'
import redstone from "redstone-api";
import { useFormData } from '@/context/offerFormDataContext'
import { createOffer } from '@/services/ApiService'

export default function Pricing() {
  const router = useRouter()
  const { toggleModal } = modalStore()
  const [solToUSD, setSolToUSD] = useState(0.0);
  const { formData, updateFormData } = useFormData();
  const modalKey = 'pricing'
  const otherModalKey = 'paymentMethod'
  
  const handlePrevious = () => {
    toggleModal(modalKey)
    toggleModal(otherModalKey)
  }

  const fetchSolToUSD = async () => {
    const price = await redstone.getPrice("SOL");
    setSolToUSD(price.value);
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
  }
  
  const handleNext = async () => {
    try {
      
      const offerData = {
        listing_id: formData.listing_id,
        seller_username: formData.seller_username,
        amount: formData.amount
      }

      console.log(offerData);
      const response = await createOffer(offerData);

      if (response.ok) {
        router.push('/arbswap/dashboard/offers')
        toggleModal(modalKey)
      }
    }
    catch (err) {
      console.error(err);
    }
    
  }

  useEffect(() => {
    fetchSolToUSD();
  })

  return (
    <Modal>
      <div className="flex w-[577px] flex-col rounded-3xl bg-zinc-100 p-10 text-lg text-black">
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
        <div className="mt-8 grid grid-cols-2">
          <div className="rounded-bl-3xl rounded-tl-3xl border border-emerald-400  bg-emerald-400 py-1 text-center text-white">
            Buy SOL
          </div>
          <div className="rounded-br-3xl rounded-tr-3xl border-2 border-emerald-400 bg-white py-1 text-center  text-emerald-400">
            Sell SOL
          </div>
        </div>
        <form className="flex flex-col">
          <div className={'relative mt-8 flex items-center'}>
            <input
              className="w-full rounded-3xl border border-zinc-300 bg-white text-neutral-500"
              type="number"
              placeholder="Amount"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
            ></input>
            <span
              className={
                'absolute ml-[431px] flex w-[60px] justify-center rounded-3xl  bg-emerald-400 p-[0.10rem] text-center align-middle text-[14px] font-bold md:block '
              }
            >
              SOL
            </span>
          </div>
          <span className="ml-3 mt-1 text-sm text-neutral-400">
            Minimum : 10 SOL
          </span>
          <div className={'relative mt-8 flex items-center'}>
            <input
              className="w-full rounded-3xl border border-zinc-300 bg-white text-neutral-500"
              type="number"
              placeholder="Price"
              name="price"
              value={formData.price}
              onChange={handleChange}
            ></input>
            <span
              className={
                'absolute ml-[431px] flex w-[60px] justify-center rounded-3xl  bg-emerald-400 p-[0.10rem] text-center align-middle text-[14px] font-bold md:block '
              }
            >
              USD
            </span>
          </div>
          <span className="ml-3 mt-1 text-sm text-neutral-400">
            Minimum : 10 USD
          </span>
          <div className="mt-7 flex flex-row pl-3">
            <div className="flexCenter group rounded-[10px]">
              <input
                type="checkbox"
                className="h-6 w-6 cursor-pointer appearance-none rounded-[10px] bg-teal-400 text-teal-400 focus:ring-teal-100"
                name='autoAccept'
                checked={formData.autoAccept}
                onChange={(e) => updateFormData({autoAccept: e.target.checked})}
              />
            </div>
            <span className="pl-4 text-[16px] text-neutral-400">
              Will the offer be accepted automatically?
            </span>
          </div>
        </form>
        <span className="ml-1 mt-16 text-lg font-medium text-neutral-500">
          STEP 2
        </span>
        <span className="ml-1 mt-1">PRICING</span>
        <div className="mt-2 h-4 rounded-lg bg-white p-1">
          <div className="h-2 w-2/3 rounded bg-emerald-400"></div>
        </div>
        <div className="mt-9 grid grid-cols-2 gap-3">
          <Button className="border bg-blue-600 py-2" onClick={handlePrevious}>
            <span className="text-white">Previous</span>
          </Button>
          <Button className="border bg-blue-600 py-2" onClick={handleNext}>
            <span className="text-white">Next</span>
          </Button>
        </div>
      </div>
    </Modal>
  )
}
