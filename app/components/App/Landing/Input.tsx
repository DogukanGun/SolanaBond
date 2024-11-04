import React from 'react'

type InputProps = Readonly<{
  className: string
  name: string
  type: string
  placeholder: string
}>

export default function Input({
  className,
  name,
  type,
  placeholder
}: InputProps) {
  return (
    <input
      className={`rounded-full border-2 border-gray-200 bg-white px-4 ${className}`}
      name={name}
      type={type}
      required
      maxLength={500}
      placeholder={placeholder}
    />
  )
}
