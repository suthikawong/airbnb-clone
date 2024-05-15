import Image from 'next/image'
import React from 'react'

interface UfoIconProps {}

const UfoIcon: React.FC<UfoIconProps> = () => {
  return (
    <Image
      src="https://a0.muscache.com/pictures/c5a4f6fc-c92c-4ae8-87dd-57f1ff1b89a6.jpg"
      alt=""
      width="24"
      height="24"
    />
  )
}

export default UfoIcon
