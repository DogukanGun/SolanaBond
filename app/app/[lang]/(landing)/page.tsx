import React from 'react'

import Hero from '@/components/App/Landing/Hero'
import Projects from '@/components/App/Landing/Projects'
import HomeFooter from '@/components/CustomFooter/HomeFooter'

interface HomeProps {
  readonly params: {
    readonly lang: string
  }
}

export default function Home({ params }: HomeProps) {
  const { lang } = params
  return (
    <div className="bg-gradient-main text-white">
      <Hero locale={lang} />
      <Projects locale={lang} />
      <HomeFooter locale={params.lang} />
    </div>
  )
}
