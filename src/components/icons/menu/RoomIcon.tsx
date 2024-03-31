import Image from 'next/image'
import React from 'react'

interface RoomIconProps {}

const RoomIcon: React.FC<RoomIconProps> = () => {
  return (
    <Image
      src="https://a0.muscache.com/pictures/7630c83f-96a8-4232-9a10-0398661e2e6f.jpg"
      alt=""
      width="24"
      height="24"
    />
  )
}

export default RoomIcon
