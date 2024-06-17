import React from 'react'

const CategoryButton = ({title, containerStles, handleClick, buttonType, isActive}) => {
  return (
    <button
        type={buttonType || "button"}
        className={isActive ? `bg-primary-red rounded-md px-3 py-2 ${containerStles}`:` bg-white hover:text-white hover:bg-primary-red rounded-md px-3 py-2 ${containerStles}`}
        onClick={handleClick}
    >
        <span className={isActive ? 'flex-1 font-semibold text-white': ' flex-1 font-semibold' }>{title}</span>
    </button>
  )
}

export default CategoryButton