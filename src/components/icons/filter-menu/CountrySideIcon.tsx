import Image from 'next/image'
import React from 'react'

interface CountrySideIconProps {}

const CountrySideIcon: React.FC<CountrySideIconProps> = () => {
  return (
    <Image
      src="https://a0.muscache.com/pictures/6ad4bd95-f086-437d-97e3-14d12155ddfe.jpg"
      alt=""
      width="24"
      height="24"
    />
  )
}

export default CountrySideIcon
