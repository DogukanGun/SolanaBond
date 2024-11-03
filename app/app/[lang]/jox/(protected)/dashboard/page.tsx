'use client'

import { Job } from '@/types/dashboard'

import React, { Fragment, useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import DashboardFilter, { SearchParams } from '@/components/App/Jox/Dashboard/DashboardFilter'
import DashboardTable from '@/components/App/Jox/Dashboard/DashboardTable'
import Application from '@/components/App/Jox/Dashboard/Application'
import Pricing from '@/components/App/Jox/Dashboard/Pricing'
import { modalStore } from '@/hooks/useStore'
import { getJobs, getMyJobs } from '@/services/ApiService'
import CreateJob from '@/components/App/Jox/Dashboard/CreateJob'
import { PublicKey } from '@solana/web3.js'
import { useWallet } from '@solana/wallet-adapter-react';

function Dashboard() {
  const { showModal } = modalStore()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [listings, setListings] = useState<Job[]>([])
  const [selectedJobAddress,setJobAddress] = useState("")
  const wallet = useWallet();
  const [filter,setFilter] = useState<SearchParams>()
  const searchedParam = useMemo(()=>{
    let tempList = listings;
    if(filter?.name){
      tempList = tempList.filter((listing) => listing.name == filter.name)
    }
    return tempList
  },[filter,listings])

  const handleEsc = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      setIsModalOpen(false)
    }
  }

  const { toggleModal } = modalStore()
  const modalKey = 'createJobOffer'

  const getJobsFromApi = async () => {
    const jobsApi = await getJobs("8ApHAVhCfTUnXGGXhw7JKFNepHYrkGoHi6Q2b4Uj8rNo");
    setListings(jobsApi)
    
  }

  const getMyJobsFromApi = async () => {
    let jobsApi = await getMyJobs("8ApHAVhCfTUnXGGXhw7JKFNepHYrkGoHi6Q2b4Uj8rNo");
    jobsApi = jobsApi.map((job:Job)=>{
      job.my = true
      return job
    })
    setListings(jobsApi)
  }

  useEffect(() => {
    if (isModalOpen) {
      window.addEventListener('keydown', handleEsc)
    } else {
      window.removeEventListener('keydown', handleEsc)
    }
  }, [isModalOpen])

  useEffect(() => {
    getJobsFromApi()
  }, [])
  return (
    <section className="justify-center pt-12 md:flex">
      {/* Modal toggle */}
      <Link
        className="absolute !bottom-5 left-4 z-10 rounded-3xl bg-emerald-400 px-2 py-2 outline-none md:hidden"
        onClick={() => setIsModalOpen(true)}
        href={'/arbswap/dashboard'}
      >
        <span className="text-sm">
          <Image src="/img/filter.svg" alt="logo" width={24} height={24} />
        </span>
      </Link>

      {/* Left Rectangle */}
      <Fragment key={'dashboard-filter'}>
        <DashboardFilter
          onSearch={(searhParam:SearchParams)=>{
            setFilter(searhParam)
          }}
          isModalOpen={isModalOpen}
          setModalOpen={setIsModalOpen}
        />
      </Fragment>
      {/* Right Rectangle */}
      <div className="sm:w-5/5 max-h-[739px] max-w-4xl rounded-3xl border bg-zinc-100 px-3 py-4 backdrop-blur-[100px] sm:!m-3 md:w-4/5 md:px-7">
        <div className={'custom-scrollbar overflow-y-auto scroll-smooth max-h-[calc(100%-64px)]'}>
          <table className="table-auto w-full">
            <thead>
              <tr className="text-black">
                <th>Company</th>
                <th>Description</th>
                <th>CID</th>
                <th>Apply</th>
              </tr>
            </thead>
            <tbody>
              {searchedParam?.map((listing) => {
                return (
                  <DashboardTable onSelected={(jobAddress)=>setJobAddress(jobAddress)} key={listing.contract_address} jobs={listing}/>
                )
              })}
            </tbody>
          </table>
          <div className="w-full h-16 inset-x-0 absolute bottom-0 rounded-b-3xl bg-blue-600 flex justify-center gap-10">
            <button onClick={() => toggleModal(modalKey)}>Create Job Offer</button>
            <button onClick={() => window.location.reload()}>Refresh Page</button>
            <button onClick={() => getMyJobsFromApi()}>See My Offers</button>
          </div>
        </div>
      </div>
      {showModal.application && <Application jobAddress={new PublicKey(selectedJobAddress)} />}
      {showModal.pricing && <Pricing />}
      {showModal.createJobOffer && <CreateJob/>}
      
    </section>
  )
}

export default Dashboard;