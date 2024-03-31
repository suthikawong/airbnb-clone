import Image from 'next/image'
import React from 'react'

interface PianoIconProps {}

const PianoIcon: React.FC<PianoIconProps> = () => {
  return (
    <Image
      src="https://a0.muscache.com/pictures/8eccb972-4bd6-43c5-ac83-27822c0d3dcd.jpg"
      alt=""
      width="24"
      height="24"
    />
  )
}

export default PianoIcon
