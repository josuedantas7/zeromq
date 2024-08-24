import Image, { StaticImageData } from 'next/image'
import React from 'react'

const Banner = ({banner} : { banner: any }) => {
  return (
    <div className='w-full h-[347px] max-[970px]:h-[250px] max-[450px]:h-[180px] pb-8'>
        <Image
            src={banner || ''}
            alt='banner'
            width={300}
            height={347}
            className='w-full h-full'
        />
    </div>
  )
}

export default Banner
