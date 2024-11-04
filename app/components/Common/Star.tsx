import React from 'react'

type StarTypes = Readonly<{
  filled: boolean
}>

const Star = ({ filled }: StarTypes) => {
  const starImage = filled ? '/img/star-filled.png' : '/img/star-empty.png'

  return <img src={starImage} alt="Star" className="h-4 w-4" />
}

export default Star
