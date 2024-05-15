import Image from 'next/image'
import React from 'react'

interface FireIconProps {}

const FireIcon: React.FC<FireIconProps> = () => {
  return (
    <Image
      src="https://a0.muscache.com/pictures/3726d94b-534a-42b8-bca0-a0304d912260.jpg"
      alt=""
      width="24"
      height="24"
    />
  )
}

export default FireIcon
