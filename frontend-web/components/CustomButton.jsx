import React from 'react'

const CustomButton = ({title, containerStles, handleClick, buttonType}) => {
  return (
    <button
        type={buttonType || "button"}
        className={` bg-primary-red rounded-md px-3 py-2 ${containerStles}`}
        onClick={handleClick}
    >
        <span className='flex-1 text-white'>{title}</span>
    </button>
  )
}

export default CustomButton