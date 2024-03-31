import Image from 'next/image'
import React from 'react'

interface CabinsIconProps {}

const CabinsIcon: React.FC<CabinsIconProps> = () => {
  return (
    <Image
      src="https://a0.muscache.com/pictures/732edad8-3ae0-49a8-a451-29a8010dcc0c.jpg"
      alt=""
      width="24"
      height="24"
    />
  )
}

export default CabinsIcon
