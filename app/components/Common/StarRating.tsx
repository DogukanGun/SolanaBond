import React from 'react'

import Star from '@/components/Common/Star'

type RatingTypes = Readonly<{
  rating: number
}>

const StarRating = ({ rating }: RatingTypes) => {
  const fullStars = Math.floor(rating)

  const renderStars = () => {
    const stars = []

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} filled />)
    }

    const remainingStars = 5 - stars.length
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<Star key={`empty-${i}`} filled={false} />)
    }

    return stars
  }

  return <div className="flex">{renderStars()}</div>
}

export default StarRating
