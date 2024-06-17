'use client'

import React from 'react'
import { Rating } from 'react-simple-star-rating'

const StarRating = ({rating, size}) => {
  return (
    
    <Rating 
        initialValue={rating}
        readonly={true}
        SVGstyle={{display:'inline'}}
        allowFraction={true}
        size={size||15}
        className=''
    />
  )
}

export default StarRating