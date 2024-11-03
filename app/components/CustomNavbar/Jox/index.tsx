'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { arbswapNavbarLinks } from '@/constants'
import { arbswapNavbarDictionary } from '@/constants/localesContent'

import Button from '@/components/Common/Button'
import { userStore } from '@/hooks/useStore'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'

interface JoxNavbarProps {
  readonly locale: string
}

function JoxNavbar({ locale }: JoxNavbarProps) {
  const [nav, setNav] = useState(false)
  const { isAuth } = userStore();
  const pathname = usePathname()
  const commonStyles =
    'block h-1 rounded-sm bg-white transition-all duration-300 ease-out -translate-y-0.5'
  
  return (
    <nav className="z-10 py-10">
      <div className="flex items-center justify-around">
        <button
          type="button"
          aria-label="nav"
          onClick={() => setNav(!nav)}
          className="z-20 pr-4 text-gray-500 md:hidden"
        >
          <div className="justify-end space-y-2">
            <span
              className={`${commonStyles} w-9 ${
                nav ? 'translate-y-1.5 rotate-45' : ''
              }`}
            />
            <span
              className={`${commonStyles} mx-3 w-6 ${nav ? 'hidden' : ''}`}
            />
            <span
              className={`${commonStyles} -mx-1 w-10 ${
                nav ? 'mx-0 w-9 -translate-y-1.5 -rotate-45' : ''
              }`}
            />
            
          </div>
        </button>
        <Link className="z-20 mr-0.5 mt-3" href="/">
          <Image
            src="/img/gradient-arbswap.png"
            width={162}
            height={36}
            alt="Jox Logo"
          />
        </Link>
        {/*<WalletMultiButton/>*/}
        <div className="mt-4 hidden items-center text-[#8683A4] md:flex">
          <Link className="px-1 md:px-2 lg:px-4" href="/about">
            {arbswapNavbarDictionary[locale]?.aboutUs}
          </Link>
          <Link className="px-1 md:px-2 lg:px-4" href="/jox/dashboard/offer">
            {arbswapNavbarDictionary[locale]?.createOffer}
          </Link>
          {isAuth ? (
            pathname === '/jox' ? (

              <Link
                className="rounded-full bg-blue-500 text-white px-3 py-2 lg:px-5"
                href="/jox/dashboard"
              >
                {arbswapNavbarDictionary[locale]?.goToDashboard}{' '}
              </Link>
            ) : (
              <div>
                
                <WalletMultiButton/>
              </div>
              
            )
          ) : (
            <Link className="px-1 lg:px-3" href="/arbswap/login">
              <Button className="bg-blue-600 px-8 py-1 text-center text-white">
                {arbswapNavbarDictionary[locale]?.login}
              </Button>
            </Link>
          )}
        </div>
        {nav && (
          <ul className="absolute left-0 top-0 z-10 flex h-screen w-full flex-col items-center justify-center bg-gradient-main">
            <div className="mt-20">
              {arbswapNavbarLinks.map(({ id, link }) => (
                <li
                  key={id}
                  className="cursor-pointer py-4 text-4xl capitalize"
                >
                  <Link onClick={() => setNav(!nav)} href={link}>
                    {link}
                  </Link>
                </li>
              ))}
            </div>
          </ul>
        )}
      </div>
    </nav>
  )
}

export default JoxNavbar
