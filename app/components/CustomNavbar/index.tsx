'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { links } from '@/constants'
import { navbarDictionary } from '@/constants/localesContent'

interface AppBarProps {
  readonly locale: string
}

function AppBar({ locale }: AppBarProps) {
  const [nav, setNav] = useState(false)

  return (
    <nav className="z-20 py-10">
      <div className="flex items-center justify-around">
        <button
          type="button"
          aria-label="nav"
          onClick={() => setNav(!nav)}
          className="z-10 pr-4 text-gray-500 md:hidden"
        >
          <div className="justify-end space-y-2">
            <span
              className={`block h-1 w-9 rounded-sm bg-white 
                    transition-all duration-300 ease-out ${nav ? 'translate-y-1.5 rotate-45' : '-translate-y-0.5'
                }`}
            />
            <span
              className={`mx-3 block h-1 w-6 rounded-sm bg-white 
                    transition-all duration-300 ease-out ${nav ? 'hidden' : '-translate-y-0.5'
                }`}
            />
            <span
              className={`-mx-1 block h-1 w-10 rounded-sm bg-white 
                    transition-all duration-300 ease-out ${nav
                  ? 'mx-0 w-9 -translate-y-1.5 -rotate-45'
                  : '-translate-y-0.5'
                }`}
            />
          </div>
        </button>

        <div className="mr-0.5 mt-3">
          <Link href="/">
            <Image
              src="/img/gradient-arbswap.png"
              width={162}
              height={36}
              alt="Arbswap Logo"
            />
          </Link>
        </div>
        <div className="mt-4 hidden items-center font-medium md:flex">
          <Link className="px-1 md:px-2 lg:px-4" href="/about">
            {navbarDictionary[locale]?.aboutUs}
          </Link>
          <Link className="px-1 md:px-2 lg:px-4" href="#crew">
            {navbarDictionary[locale]?.ourTeam}
          </Link>
          <Link className="px-1 md:px-2 lg:px-4" href="#contact">
            {navbarDictionary[locale]?.contact}
          </Link>
          <Link className="px-1 lg:px-2" href="/arbswap">
            <div className="rounded-full bg-gradient-button p-px">
              <div className="rounded-full bg-gradient-about px-3 py-1 text-center font-semibold">
                ArbSwap
              </div>
            </div>
          </Link>
          <Link className="px-1 lg:px-2" href="/jox">
            <div className="rounded-full bg-gradient-button p-px">
              <div className="rounded-full bg-gradient-about px-3 py-1 text-center font-semibold">
                Jox
              </div>
            </div>
          </Link>
          {/*<Link className="px-1 lg:px-2" href="/nexbridge">
            <div className="mx-2 rounded-full bg-gradient-button p-px">
              <div className="rounded-full bg-gradient-about px-3 py-1 text-center font-semibold">
                NexBridge
              </div>
            </div>
                  </Link>*/}
        </div>

        {nav && (
          <ul className="absolute left-0 top-0 flex h-screen w-full flex-col items-center justify-center bg-gradient-main">
            {links.map(({ id, link, href }) => (
              <li key={id} className="cursor-pointer py-4 text-4xl capitalize">
                <Link onClick={() => setNav(!nav)} href={href}>
                  {link}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </nav>
  )
}

export default AppBar
