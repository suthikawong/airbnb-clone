import { cn } from '@/lib/utils'
import React from 'react'

interface SettingIconProps {
  className?: string
}

const SettingIcon: React.FC<SettingIconProps> = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      aria-hidden="true"
      role="presentation"
      focusable="false"
      className={cn('block size-4 fill-none stroke-current stroke-[4] overflow-visible', className)}
    >
      <path
        fill="none"
        d="M7 16H3m26 0H15M29 6h-4m-8 0H3m26 20h-4M7 16a4 4 0 1 0 8 0 4 4 0 0 0-8 0zM17 6a4 4 0 1 0 8 0 4 4 0 0 0-8 0zm0 20a4 4 0 1 0 8 0 4 4 0 0 0-8 0zm0 0H3"
      ></path>
    </svg>
  )
}

export default SettingIcon
