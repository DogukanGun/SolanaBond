import React from 'react'
import { footerDictionary } from '@/constants/localesContent'

import Input from '@/components/App/Landing/Input'
import Button from '@/components/Common/Button'

interface ContactProps {
  readonly locale: string
}

function Contact({ locale }: ContactProps) {
  return (
    <form className="flex w-full max-w-lg flex-col rounded-lg bg-white p-12 max-xl:mt-10 lg:mx-12">
      <span className="text-sm font-bold uppercase leading-relaxed tracking-widest text-violet-950">
        {footerDictionary[locale]?.yourName}
      </span>
      <Input
        className="mt-4 h-14 text-black"
        name="name"
        type="name"
        placeholder="Full name"
      />
      <span className="mt-8 text-sm font-bold uppercase leading-relaxed tracking-widest text-violet-950">
        {footerDictionary[locale]?.inputField}
      </span>
      <Input
        className="mt-4 h-14 text-black"
        name="senderEmail"
        type="email"
        placeholder="name@mail.com"
      />
      <span className="mt-8 text-sm font-bold uppercase leading-relaxed tracking-widest text-violet-950">
        {footerDictionary[locale]?.yourMessage}
      </span>
      <textarea
        className="my-3 mt-4 h-52 rounded-lg border border-black/10 p-4 text-black"
        name="message"
        required
        maxLength={500}
        placeholder="Message"
      />
      <div className="flexCenter mt-8 flex-1">
        <Button className="h-14 w-32 bg-teal-400">
          <span className="text-lg">{footerDictionary[locale]?.send}</span>
        </Button>
      </div>
    </form>
  )
}

export default Contact
