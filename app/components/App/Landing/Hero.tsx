import React from 'react'
import Image from 'next/image'
import { homeDictionary } from '@/constants/localesContent'

import Button from '@/components/Common/Button'
import CustomNavbar from '@/components/CustomNavbar'

interface HeroProps {
  readonly locale: string
}

function Hero({ locale }: HeroProps) {
  return (
    <section className="relative flex w-full flex-col">
      <Image
        src="/img/hero-bg.png"
        alt="mountains"
        fill
        sizes="100vw"
        quality={95}
        loading="eager"
        className="max-md:hidden"
      />
      <Image
        src="/img/hero-bg-small.png"
        alt="mountains"
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        quality={95}
        loading="eager"
        className="md:hidden"
      />
      <CustomNavbar locale={locale} />
      <div className="z-10 flex min-h-[100vh] w-full flex-col items-end justify-center pb-[7vh]">
        <div className="mx-auto mb-6 text-center text-7xl font-bold leading-[86px] lg:w-4/5">
          {homeDictionary[locale]?.digitalSolutions}
        </div>
        <div className="mx-auto mt-10 mb-16 text-center text-2xl font-medium leading-loose lg:w-[794.88px]">
          {homeDictionary[locale]?.digitalSolutionsDesc}{' '}
        </div>
        <Button className="mx-auto mt-4 h-14 w-60 rounded-full bg-gradient-button">
          <span className="text-lg">{homeDictionary[locale]?.letsMeet}</span>
        </Button>
      </div>
    </section>
  )
}

export default Hero
