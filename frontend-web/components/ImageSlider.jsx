'use client'
import React from 'react'
import SimpleImageSlider from "react-simple-image-slider";


const ImageSlider = ({images}) => {
    


  return (
    <div>
        <SimpleImageSlider
    
            width={'100vw'}
            height={'50vw'}
            images={images}
            showNavs={true}
            autoPlay={true}
            autoPlayDelay={5}

          />
    </div>
  )
}

export default ImageSlider