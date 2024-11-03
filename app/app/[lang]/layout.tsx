import './globals.css'

import React from 'react'
import type { Metadata } from 'next'
import { DM_Sans as dmSansFont } from 'next/font/google'
import { defaultLocale } from '../../middleware'

import { TailwindIndicator } from '@/components/TailwindIndicator'

const dmSans = dmSansFont({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'NexArb',
  description: 'Digital Solutions for the Future'
}

type RootLayoutProps = Readonly<{
  children: React.ReactNode
  params: { lang: string }
}>


export default function RootLayout({ children, params }: RootLayoutProps) {
  return (
    <html lang={params.lang ?? defaultLocale}>
      <body className={`${dmSans.className} text-white`}>
        <TailwindIndicator />
          {children}
      </body>
    </html>
  )
}
