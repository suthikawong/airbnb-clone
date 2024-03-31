import { cn } from '@/lib/utils'

interface HamburgerIconProps {
  className?: string
}

const HamburgerIcon: React.FC<HamburgerIconProps> = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      aria-hidden="true"
      role="presentation"
      focusable="false"
      className={cn('block fill-none size-4 stroke-current stroke-[3] overflow-visible', className)}
    >
      <g fill="none">
        <path d="M2 16h28M2 24h28M2 8h28"></path>
      </g>
    </svg>
  )
}

export default HamburgerIcon
