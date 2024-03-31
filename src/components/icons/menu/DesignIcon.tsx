import Image from 'next/image'
import React from 'react'

interface DesignIconProps {}

const DesignIcon: React.FC<DesignIconProps> = () => {
  return (
    <Image
      src="https://a0.muscache.com/pictures/50861fca-582c-4bcc-89d3-857fb7ca6528.jpg"
      alt=""
      width="24"
      height="24"
    />
  )
}

export default DesignIcon
