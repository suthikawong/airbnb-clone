import Image from 'next/image'
import React from 'react'

interface CampingIconProps {}

const CampingIcon: React.FC<CampingIconProps> = () => {
  return (
    <Image
      src="https://a0.muscache.com/pictures/ca25c7f3-0d1f-432b-9efa-b9f5dc6d8770.jpg"
      alt=""
      width="24"
      height="24"
    />
  )
}

export default CampingIcon
