import { cn } from '@/lib/utils'
import React, { PropsWithChildren } from 'react'

interface WrapperProps extends PropsWithChildren {
  className?: string
}

const Wrapper: React.FC<WrapperProps> = ({ children, className }) => {
  return <div className={cn('px-6 md:px-10 xl:px-20', className)}>{children}</div>
}

export default Wrapper
