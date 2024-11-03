import React from 'react'
import { joxHomeDictionary } from '@/constants/localesContent'

interface IntroProps {
  readonly locale: string
}

const Intro: React.FC<IntroProps> = ({ locale }) => {
  return (
    <div className="mx-auto flex w-4/5 flex-col lg:flex-row lg:items-center">
      <div className="flex flex-col items-center p-16 lg:w-1/2 lg:pl-24">
        <h1 className="text-4xl lg:text-7xl">
          {joxHomeDictionary[locale]?.introHeader}
        </h1>
        <p className="mt-4 max-w-md text-base lg:mt-5 lg:max-w-lg lg:text-xl">
          {joxHomeDictionary[locale]?.introDescription}
        </p>
        <button className="mt-6 rounded-full bg-blue-600 px-6 py-3 lg:mt-10 lg:px-8 lg:py-4">
          {joxHomeDictionary[locale]?.getStarted}
        </button>
      </div>
    </div>
  )
}

export default Intro
