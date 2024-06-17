'use client'

import React from 'react'
import { Rating } from 'react-simple-star-rating'

const StarRatingReview = ({handleRating, size}) => {
  return (
    
    <Rating 
        onClick={handleRating}
        SVGstyle={{display:'inline'}}
        allowFraction={false}
        size={size||15}
        className=''
    />
  )
}

export default StarRatingReview