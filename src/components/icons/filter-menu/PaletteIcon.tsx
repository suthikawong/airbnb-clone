import Image from 'next/image'
import React from 'react'

interface PaletteIconProps {}

const PaletteIcon: React.FC<PaletteIconProps> = () => {
  return (
    <Image
      src="https://a0.muscache.com/pictures/8a43b8c6-7eb4-421c-b3a9-1bd9fcb26622.jpg"
      alt=""
      width="24"
      height="24"
    />
  )
}

export default PaletteIcon
