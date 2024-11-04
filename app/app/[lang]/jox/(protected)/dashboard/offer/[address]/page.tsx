'use client'

import React, { useState } from 'react'

import IncomingApplications from '@/components/App/Jox/Dashboard/Offers/IncomingApplications'
import UserProfile from '@/components/App/ArbSwap/Dashboard/Offers/OfferHistory/UserProfile'
import Button from '@/components/Common/Button'
import { modalStore } from '@/hooks/useStore'
import { useParams } from 'next/navigation'

function Offers() {
  const path = useParams()
  const jobAddress = path.address as string
  const [component, setComponent] = useState<JSX.Element>(<IncomingApplications job_address={jobAddress} />)
  const [selected, setSelected] = useState<string>('IncomingApplications')

  const { showModal } = modalStore()

  const handleClick = (componentName: string) => {
    if (componentName === 'IncomingApplications') {
      setComponent(<IncomingApplications job_address={jobAddress} />)
      setSelected('IncomingApplications')
    } else if (componentName === 'OffersSent') {
      setComponent(<p>Coming Soon ...</p>)
      setSelected('OffersSent')
    } else if (componentName === 'OfferHistory') {
      setComponent(<p>Coming Soon ...</p>)
      setSelected('OfferHistory')
    }
  }

  return (
    <section className="flex flex-col items-center">
      <div className="my-4 grid grid-cols-6 gap-5">
        <Button
          className={`${
            selected === 'IncomingApplications' ? 'bg-blue-600' : 'bg-zinc-100'
          } mr-2 flex h-10 w-[140px] justify-center rounded-3xl pt-3`}
          onClick={() => handleClick('IncomingApplicationss')}
        >
          <span
            className={`${
              selected === 'IncomingApplications' ? 'text-white' : '!text-blue-600'
            } text-xs`}
          >
            INCOMING APPLICATIONS
          </span>
        </Button>
      </div>
      <div className="flex max-h-[691px] w-[1000px] flex-col rounded-3xl bg-zinc-100 p-5">
        {component}
      </div>
      {/* Modal for offer history component */}
      {showModal.userProfile && <UserProfile />}
    </section>
  )
}

export default Offers
