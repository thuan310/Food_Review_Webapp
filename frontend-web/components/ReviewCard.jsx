import React from 'react'
import StarRating from './StarRating'

const ReviewCard = ({name, rating, review}) => {
  return (
    <div className=' flex-1 flex flex-col p-4 bg-white rounded-md shadow-md'>
        <div className='flex justify-between'>
            <h3 className='font-semibold'>{name}</h3>

            <StarRating rating={rating} size={20}/>

        </div>
        <p className='text-sm text-gray-500'>{review}</p>
    </div>
  )
}

export default ReviewCard