import Image from 'next/image'
import React from 'react'

interface BeachIconProps {}

const BeachIcon: React.FC<BeachIconProps> = () => {
  return (
    <Image
      src="https://a0.muscache.com/pictures/10ce1091-c854-40f3-a2fb-defc2995bcaf.jpg"
      alt=""
      width="24"
      height="24"
    />
  )
}

export default BeachIcon
