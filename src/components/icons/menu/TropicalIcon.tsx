import Image from 'next/image'
import React from 'react'

interface TropicalIconProps {}

const TropicalIcon: React.FC<TropicalIconProps> = () => {
  return (
    <Image
      src="https://a0.muscache.com/pictures/ee9e2a40-ffac-4db9-9080-b351efc3cfc4.jpg"
      alt=""
      width="24"
      height="24"
    />
  )
}

export default TropicalIcon
