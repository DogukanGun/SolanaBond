'use client'

import React from 'react'
import Image from 'next/image'
import { footerDictionary } from '@/constants/localesContent'

import Contact from '@/components/App/Landing/Contact'
import CustomFooter from '@/components/CustomFooter'

interface HomeFooterProps {
  readonly locale: string
}

function HomeFooter({ locale }: HomeFooterProps) {
  return (
    <section id='contact' className="flexCenter relative">
      <Image
        src="/img/footer-bg.png"
        alt="mountains"
        fill
        className="max-md:hidden"
        quality={95}
      />
      <Image
        src="/img/footer-bg-small.png"
        alt="mountains"
        fill
        className="md:hidden"
        quality={95}
      />
      <div className="z-20 flex-col">
        <div className="mt-20 flex flex-col p-20">
          <div className="flex flex-row px-6 max-xl:flex-col max-xl:items-center max-xl:justify-center lg:px-20 xl:px-0">
            <div className="mb-6 w-1/2 px-6">
              <div className="mt-14 text-4xl w-4/5 font-bold leading-10 max-xl:mt-0">
                {footerDictionary[locale]?.keepInTouch}
              </div>
              <div className="my-8 text-2xl font-medium leading-loose">
                {footerDictionary[locale]?.description}
              </div>
              <div className="flex flex-col gap-5">
                <div className="flex items-center gap-5">
                  <Image
                    src="/img/fa-envelope.svg"
                    alt="logo"
                    width={21}
                    height={16}
                  />
                  <div className="text-base leading-relaxed">
                    nexarb.business@gmail.com
                  </div>
                </div>
                <div className="flex items-center gap-5">
                  <Image
                    src="/img/fa-building-o.svg"
                    alt="logo"
                    width={19}
                    height={19}
                  />
                  <div className="text-base leading-relaxed">
                    Munich, Bavaria, Germany
                  </div>
                </div>
              </div>
            </div>
            <Contact locale={locale} />
          </div>
          <CustomFooter locale={locale} />
        </div>
      </div>
    </section>
  )
}

export default HomeFooter
