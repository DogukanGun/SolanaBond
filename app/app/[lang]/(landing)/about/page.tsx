import React from 'react'
import Image from 'next/image'
import { aboutPageDictionary } from '@/constants/localesContent'

import AppBar from '@/components/CustomNavbar'

function About({ params }: Readonly<{ params: { lang: string } }>) {
  return (
    <div className="min-h-screen bg-gradient-about">
      <AppBar locale={params.lang} />
      <div className="mt-24 flex justify-center">
        <div className="h-36 w-full text-center md:w-1/3">
          <h2 className="mb-5 text-4xl font-bold">
            {aboutPageDictionary[params.lang]?.aboutNexarb}
          </h2>
          <p>{aboutPageDictionary[params.lang]?.description}</p>
        </div>
      </div>
      <div className="mt-32 grid grid-cols-3 place-items-center justify-around gap-3 p-10 sm:p-3 md:p-5">
        <div className="h-72 w-full justify-center text-center md:w-64">
          <div className="mb-5 flex justify-center">
            <Image
              src="/img/fa-briefcase.png"
              width={60}
              height={60}
              alt="Briefcase"
            />
          </div>
          <h4 className="mb-5 text-2xl">
            {aboutPageDictionary[params.lang]?.manyUsefulComponents}
          </h4>
          <p>{aboutPageDictionary[params.lang]?.manyUsefulComponentsDesc}</p>
        </div>
        <div className="h-72 w-full justify-center text-center md:w-64">
          <div className="mb-5 flex justify-center">
            <Image
              src="/img/fa-compress.png"
              width={52}
              height={60}
              alt="Compress"
            />
          </div>
          <h4 className="mb-5 text-2xl">
            {aboutPageDictionary[params.lang]?.responsiveLayout}
          </h4>
          <p>{aboutPageDictionary[params.lang]?.responsiveLayoutDesc}</p>
        </div>
        <div className="h-72 w-full justify-center text-center md:w-64">
          <div className="mb-5 flex justify-center">
            <Image
              src="/img/fa-desktop.png"
              width={65}
              height={60}
              alt="Desktop"
            />
          </div>
          <h4 className="mb-5 text-2xl">
            {aboutPageDictionary[params.lang]?.retinaReady}
          </h4>
          <p>{aboutPageDictionary[params.lang]?.retinaReadyDesc}</p>
        </div>
      </div>
    </div>
  )
}

export default About
