import Image from 'next/image'
import React from 'react'
import StarRating from './StarRating'

const FoodCard = ({ name, description, image, rating, containerStyles }) => {
  return (
    <div className={` shadow-md bg-kem rounded-xl w-[190px] h-[290px] ${containerStyles}`}>
      <div>
        <Image
          src={image}
          alt='food'
          width={300}
          height={200}
          className='px-2 py-2 h-[150px] w-full object-cover rounded-2xl'
        />
      </div>
      <div className='px-3 py-3 overflow-hidden'>
        <p className='text-base font-bold'>{name}</p>
        <div className='flex flex-row items-center mt-[-5px] mb-1'>
          <StarRating rating={rating}/>
          <p className='text-xs pl-1 pt-[4px]'>({rating.toFixed(1)})</p>
        </div>
        <p className='text-xs text-gray-500 overflow-hidden line-clamp-3'>{description}</p>
      </div>
    </div>
  )
}

export default FoodCard
