import React from 'react'

const ErrorIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      aria-label="Rule did not pass"
      role="img"
      focusable="false"
      className="block size-[10px] fill-destructive"
    >
      <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zm3 4L8 7 5 4 4 5l3 3-3 3 1 1 3-3 3 3 1-1-3-3 3-3-1-1z"></path>
    </svg>
  )
}

export default ErrorIcon
