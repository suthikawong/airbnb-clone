import Image from 'next/image'
import React from 'react'

interface ChefIconProps {}

const ChefIcon: React.FC<ChefIconProps> = () => {
  return (
    <Image
      src="https://a0.muscache.com/pictures/ddd13204-a5ae-4532-898c-2e595b1bb15f.jpg"
      alt=""
      width="24"
      height="24"
    />
  )
}

export default ChefIcon
