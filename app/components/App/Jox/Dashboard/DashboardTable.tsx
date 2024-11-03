import { Job } from '@/types/dashboard'

import React from 'react'

import Button from '@/components/Common/Button'
import { modalStore } from '@/hooks/useStore'
import { useFormData } from '@/context/jobFormDataContext'
import { useRouter } from 'next/navigation'

function DashboardTable({ jobs,onSelected }: Readonly<{ jobs: Job, onSelected:(address:string)=>void }>) {
  const { toggleModal } = modalStore()
  const router = useRouter()
  const { formData, updateFormData } = useFormData();
  const modalKey = 'application'

  return (
    <tr>
      <td className="px-4 font-medium text-slate-950">
        <div className="pl-4 text-base">{jobs.contract_address}</div>
      </td>
      <td className="px-10 py-5">
        <div className="ml-1 text-base font-medium">
          <span className="text-slate-950">{jobs.name}</span>
        </div>
      </td>
      <td className="mr-5 px-5 text-base font-medium text-slate-950">
        {jobs.description}
      </td>
      <td>
        <Button
          className="rounded-full bg-blue-600 px-6 py-2 outline-none"
          onClick={() => {
            if(jobs.my){
              router.push("/jox/dashboard/offer/"+jobs.contract_address)
            }else{
              updateFormData({name: jobs.name, address: jobs.contract_address, description:jobs.description})
              toggleModal(modalKey)
              onSelected(jobs.contract_address)
            }
          }}
        >
          <span className="text-sm">{jobs.my ? "See Applications" : "Apply"}</span>
        </Button>
      </td>
    </tr>
  )
}

export default DashboardTable
