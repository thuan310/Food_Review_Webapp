
import Link from 'next/link';
import React from 'react';



const Popup = ({ onClose, path }) => {
  return (
    <div className=" fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className=" relative flex justify-center ">
        <button onClick={onClose} className="  rounded-full w-[5%] absolute top-[-6%] ml-[40%]">
            <img
                src= '/close.png'
                alt='close'
                className=" "
            />
        </button>
        <Link href= {path}>
            <img
                src='/popup.jpg'
                alt='popup'
                className='w-[40%] rounded-lg mx-auto '
            />
        </Link>


        
      </div>
    </div>
  );
};

export default Popup;
