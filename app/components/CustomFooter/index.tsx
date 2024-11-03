import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FooterSocials } from '@/constants'
import { footerDictionary } from '@/constants/localesContent'

interface CustomFooterProps {
  readonly locale: string
}

function CustomFooter({ locale }: CustomFooterProps) {
  return (
    <div className="px-10">
      <div className="mb-10 mt-48 border bg-white bg-opacity-20" />
      <div className="mb-20 flex justify-between">
        <div className="text-sm leading-7 text-emerald-50">
          {footerDictionary[locale]?.copyright}
        </div>
        <div className="flex flex-row gap-6">
          {FooterSocials.map((e) => (
            <Link href={e.link} target='_blank' key={e.svg}>
              <div className="flexCenter h-9 w-9 rounded-lg bg-white bg-opacity-20">
                <Image src={e.svg} alt="logo" width={19} height={19} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CustomFooter
