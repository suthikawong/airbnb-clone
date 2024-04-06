import { cn } from '@/lib/utils'
import React from 'react'

interface SearchIconDesktopProps {
  className?: string
}

const SearchIconDesktop: React.FC<SearchIconDesktopProps> = ({ className }) => {
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
        className={className}
        fill="none"
        d="M13 24a11 11 0 1 0 0-22 11 11 0 0 0 0 22zm8-3 9 9"
      ></path>
    </svg>
  )
}

export default SearchIconDesktop
