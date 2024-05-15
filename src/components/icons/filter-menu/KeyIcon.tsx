import Image from 'next/image'
import React from 'react'

interface KeyIconProps {}

const KeyIcon: React.FC<KeyIconProps> = () => {
  return (
    <Image
      src="https://a0.muscache.com/pictures/c0fa9598-4e37-40f3-b734-4bd0e2377add.jpg"
      alt=""
      width="24"
      height="24"
    />
  )
}

export default KeyIcon
