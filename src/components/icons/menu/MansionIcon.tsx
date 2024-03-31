import Image from 'next/image'
import React from 'react'

interface MansionIconProps {}

const MansionIcon: React.FC<MansionIconProps> = () => {
  return (
    <Image
      src="https://a0.muscache.com/pictures/78ba8486-6ba6-4a43-a56d-f556189193da.jpg"
      alt=""
      width="24"
      height="24"
    />
  )
}

export default MansionIcon
