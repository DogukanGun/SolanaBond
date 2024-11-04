import React from 'react'

import OffersTable from './OffersTable'

function IncomingApplications({job_address}:Readonly<{ job_address: string }>) {
  return (
    <div>
      <div>
        <table className="table-auto">
          <thead>
            <th className="text-slate-500">Application</th>
            <th className="text-slate-500">CID</th>
          </thead>
          <OffersTable job_address={job_address}/>
        </table>
      </div>
    </div>
  )
}

export default IncomingApplications
