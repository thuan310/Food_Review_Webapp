import React from 'react'
import Image from 'next/image'

const Footer = () => {
  return (
    <footer className='flex border-t-2 px-16 py-6 justify-between '>
      <div className='flex flex-col justify-start items-start mx-5'>
        <Image
          src="/logo.png"
          alt="logo"
          width={100}
          height={100}
          className=' object-contain'
        />
        <p className=' text-base text-gray-500'>
          Food 2024 <br />
          All rights reserved 
        </p>
      </div>
      <div className='flex flex-row space-x-[150px]'>
        <div className='flex justify-between items-center'>
          <div className='flex flex-col justify-start items-start'>
            <p className=' text-base font-bold mb-2'>Useful links</p>
            <p className=' text-sm text-gray-500'>About us</p>
            <p className=' text-sm text-gray-500'>FAQ</p>
            <p className=' text-sm text-gray-500'>Blogs</p>
          </div>
        </div>

        <div className='flex justify-between items-center'>
          <div className='flex flex-col justify-start items-start'>
            <p className=' text-base font-bold mb-2'>Useful links</p>
            <p className=' text-sm text-gray-500'>About us</p>
            <p className=' text-sm text-gray-500'>FAQ</p>
            <p className=' text-sm text-gray-500'>Blogs</p>
          </div>
        </div>

        <div className='flex justify-between items-center'>
          <div className='flex flex-col justify-start items-start'>
            <p className=' text-base font-bold mb-2'>Useful links</p>
            <p className=' text-sm text-gray-500'>About us</p>
            <p className=' text-sm text-gray-500'>FAQ</p>
            <p className=' text-sm text-gray-500'>Blogs</p>
          </div>
        </div>
      </div>

      
    </footer>
  )
}

export default Footer