import Image from 'next/image'
import React from 'react'

interface GrapeIconProps {}

const GrapeIcon: React.FC<GrapeIconProps> = () => {
  return (
    <Image
      src="https://a0.muscache.com/pictures/60ff02ae-d4a2-4d18-a120-0dd274a95925.jpg"
      alt=""
      width="24"
      height="24"
    />
  )
}

export default GrapeIcon
