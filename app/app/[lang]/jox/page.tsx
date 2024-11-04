import React from 'react'

import Intro from '@/components/App/Jox/Intro'
import JoxNavbar from '@/components/CustomNavbar/Jox'

const Solana = ({
  params
}: {
  params: { lang: string }
}): React.JSX.Element => {
  const { lang } = params
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-black to-purple-900">
      <JoxNavbar locale={lang} />
      <Intro locale={lang} />     
    </div>
  )
}

export default Solana
