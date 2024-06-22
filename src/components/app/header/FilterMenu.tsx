'use client'

import { cn } from '@/lib/utils'
import React, { PropsWithChildren, useEffect, useRef, useState } from 'react'
import ChevronLeft from '../../icons/ChevronLeft'
import ChevronRight from '../../icons/ChevronRight'
import AdaptedIcon from '../../icons/filter-menu/AdaptedIcon'
import BeachIcon from '../../icons/filter-menu/BeachIcon'
import BowlingIcon from '../../icons/filter-menu/BowlingIcon'
import CabinsIcon from '../../icons/filter-menu/CabinsIcon'
import CampingIcon from '../../icons/filter-menu/CampingIcon'
import ChefIcon from '../../icons/filter-menu/ChefIcon'
import CountrySideIcon from '../../icons/filter-menu/CountrySideIcon'
import DesignIcon from '../../icons/filter-menu/DesignIcon'
import FireIcon from '../../icons/filter-menu/FireIcon'
import GrapeIcon from '../../icons/filter-menu/GrapeIcon'
import HistoricalHomeIcon from '../../icons/filter-menu/HistoricalHomeIcon'
import HouseBoatsIcon from '../../icons/filter-menu/HouseBoatsIcon'
import KeyIcon from '../../icons/filter-menu/KeyIcon'
import LakefrontIcon from '../../icons/filter-menu/LakefrontIcon'
import MansionIcon from '../../icons/filter-menu/MansionIcon'
import PaletteIcon from '../../icons/filter-menu/PaletteIcon'
import PianoIcon from '../../icons/filter-menu/PianoIcon'
import RoomIcon from '../../icons/filter-menu/RoomIcon'
import TreeHouseIcon from '../../icons/filter-menu/TreeHouseIcon'
import TropicalIcon from '../../icons/filter-menu/TropicalIcon'
import UfoIcon from '../../icons/filter-menu/UfoIcon'
import { Button } from '../../ui/button'

interface FilterMenuProps extends PropsWithChildren {
  className?: string
}

const FilterMenu: React.FC<FilterMenuProps> = ({ className }) => {
  const [position, setPosition] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const [containerWidth, setContainerWidth] = useState(0)

  const gapSize = 32
  const offset = containerWidth * 0.4
  const menuWidth =
    menuList.reduce((prev, curr) => prev + curr.width, 0) +
    (menuList.length - 1) * gapSize

  useEffect(() => {
    if (ref?.current?.clientWidth) setContainerWidth(ref.current.clientWidth)
  }, [ref?.current?.clientWidth])

  return (
    <div ref={ref} className={cn('relative mt-3 overflow-hidden', className)}>
      <div
        className={cn(
          'absolute left-0 top-0 flex h-full w-[74px] items-center justify-start bg-gradient-to-r from-white pl-2',
          position === 0 && 'hidden'
        )}
      >
        <Button
          variant="outline"
          className="size-7 rounded-full p-0"
          onClick={() => {
            if (position - containerWidth + offset < 0) {
              setPosition(0)
            } else {
              setPosition(position - containerWidth + offset)
            }
          }}
        >
          <ChevronLeft />
        </Button>
      </div>
      <div
        className="flex"
        style={{
          gap: gapSize,
          translate: `${-position}px`,
          transition: 'translate 300ms ease-in-out',
        }}
      >
        {menuList.map((menu, index) => (
          <MenuItem
            key={index}
            title={menu.title}
            icon={menu?.icon || ''}
            width={menu?.width}
            active={!!menu?.active}
          />
        ))}
      </div>
      <div
        className={cn(
          'absolute right-0 top-0 flex h-full w-[74px] items-center justify-end bg-gradient-to-l from-white pr-2',
          position >= menuWidth - containerWidth && 'hidden'
        )}
      >
        <Button
          variant="outline"
          className="size-7 rounded-full p-0"
          onClick={() => {
            if (position + containerWidth * 2 - offset > menuWidth) {
              setPosition(menuWidth - containerWidth)
            } else {
              setPosition(position + containerWidth - offset)
            }
          }}
        >
          <ChevronRight />
        </Button>
      </div>
    </div>
  )
}

interface MenuItemProps extends PropsWithChildren {
  title: string
  active?: boolean
  icon?: React.ReactNode
  width?: number
  className?: string
}

const MenuItem: React.FC<MenuItemProps> = ({
  title,
  active = false,
  icon = null,
  width = 64,
  className = '',
}) => {
  return (
    <div className={cn('group', className)}>
      <div
        className={cn(
          "after:block after:h-0.5 after:content-['']",
          { 'after:bg-black': active },
          { 'group-hover:after:bg-[#DDDDDD]': !active }
        )}
      >
        <div className="my-2.5 flex flex-col items-center gap-2 py-1">
          <div
            className={cn('opacity-65 group-hover:opacity-100', {
              'opacity-100': active,
            })}
          >
            {icon}
          </div>
          <span
            className={cn(
              'min-w-16 whitespace-nowrap text-center text-xs font-medium',
              {
                'text-base-primary group-hover:text-black': active,
              }
            )}
            style={{ width }}
          >
            {title}
          </span>
        </div>
      </div>
    </div>
  )
}

const menuList = [
  {
    title: 'New',
    icon: <KeyIcon />,
    width: 64,
    active: true,
  },
  {
    title: 'Countryside',
    icon: <CountrySideIcon />,
    width: 68,
  },
  {
    title: 'Trending',
    icon: <FireIcon />,
    width: 64,
  },
  {
    title: 'Tropical',
    icon: <TropicalIcon />,
    width: 64,
  },
  {
    title: 'Play',
    icon: <BowlingIcon />,
    width: 64,
  },
  {
    title: "Chef's kitchens",
    icon: <ChefIcon />,
    width: 86,
  },
  {
    title: 'Grand pianos',
    icon: <PianoIcon />,
    width: 75,
  },
  {
    title: 'Adapted',
    icon: <AdaptedIcon />,
    width: 64,
  },
  {
    title: 'Mansions',
    icon: <MansionIcon />,
    width: 64,
  },
  {
    title: 'Lakefront',
    icon: <LakefrontIcon />,
    width: 64,
  },
  {
    title: 'Creative spaces',
    icon: <PaletteIcon />,
    width: 90,
  },
  {
    title: 'Houseboats',
    icon: <HouseBoatsIcon />,
    width: 68,
  },
  {
    title: 'Historical homes',
    icon: <HistoricalHomeIcon />,
    width: 96,
  },
  {
    title: 'Rooms',
    icon: <RoomIcon />,
    width: 64,
  },
  {
    title: 'Cabins',
    icon: <CabinsIcon />,
    width: 64,
  },
  {
    title: 'OMG!',
    icon: <UfoIcon />,
    width: 64,
  },
  {
    title: 'Design',
    icon: <DesignIcon />,
    width: 64,
  },
  {
    title: 'Vineyards',
    icon: <GrapeIcon />,
    width: 64,
  },
  {
    title: 'Treehouses',
    icon: <TreeHouseIcon />,
    width: 66,
  },
  {
    title: 'Camping',
    icon: <CampingIcon />,
    width: 64,
  },
  {
    title: 'Beach',
    icon: <BeachIcon />,
    width: 64,
  },
]

export default FilterMenu
