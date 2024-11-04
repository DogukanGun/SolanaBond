import React from 'react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Jox',
  description: 'Next Gen Job Portal'
}

type RootLayoutProps = Readonly<{
  children: React.ReactNode
}>


export default function DashboardLayout({ children }: RootLayoutProps) {
  return (
    <section>
      {children}
    </section>
        
)
}
