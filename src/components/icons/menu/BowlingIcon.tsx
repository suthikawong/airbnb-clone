import Image from 'next/image'
import React from 'react'

interface BowlingIconProps {}

const BowlingIcon: React.FC<BowlingIconProps> = () => {
  return (
    <Image
      src="https://a0.muscache.com/pictures/f0c5ca0f-5aa0-4fe5-b38d-654264bacddf.jpg"
      alt=""
      width="24"
      height="24"
    />
  )
}

export default BowlingIcon
