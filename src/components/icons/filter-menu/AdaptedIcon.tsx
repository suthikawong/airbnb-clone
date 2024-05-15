import Image from 'next/image'
import React from 'react'

interface AdaptedIconProps {}

const AdaptedIcon: React.FC<AdaptedIconProps> = () => {
  return (
    <Image
      src="https://a0.muscache.com/pictures/e22b0816-f0f3-42a0-a5db-e0f1fa93292b.jpg"
      alt=""
      width="24"
      height="24"
    />
  )
}

export default AdaptedIcon
