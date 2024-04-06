'use client'

import { cn } from '@/lib/utils'
import React, { PropsWithChildren, useEffect, useState } from 'react'
import AppIcon from '../../icons/AppIcon'
import LanguageIcon from '../../icons/LanguageIcon'
import SearchIconMobile from '../../icons/SearchIconMobile'
import SettingIcon from '../../icons/SettingIcon'
import { Button } from '../../ui/button'
import { Separator } from '../../ui/separator'
import Wrapper from '../Wrapper'
import FilterMenu from './FilterMenu'
import ProfileMenu from './ProfileMenu'
import SearchBar from './SearchBar'
import SearchIconDesktop from '@/components/icons/SearchIconDesktop'

interface AppHeaderProps extends PropsWithChildren {}

const AppHeader: React.FC<AppHeaderProps> = () => {
  const [isTop, setIsTop] = useState(true)

  useEffect(() => {
    const handleScroll = async () => {
      const position = window.scrollY
      console.log('TLOG ~ position:', position)
      if (position === 0) {
        setIsTop(true)
      } else {
        setIsTop(false)
      }
    }
    window.addEventListener('scrollend', handleScroll)
    return () => {
      window.removeEventListener('scrollend', handleScroll)
    }
  }, [])

  return (
    <>
      <header className="block md:hidden sticky top-0 bg-white border-b shadow-md">
        <div className="pt-3.5 px-6 flex items-center gap-2.5">
          <div className="rounded-full px-1 border h-[54px] w-[500px] shadow-md flex items-center flex-1">
            <SearchIconMobile className="mx-4" />
            <div>
              <div className="text-sm font-medium">Anywhere</div>
              <div className="flex gap-1">
                <span className="text-xs font-light">Any week</span>
                <span className="text-xs font-light">·</span>
                <span className="text-xs font-light">Add guests</span>
              </div>
            </div>
          </div>
          <Button
            variant="outline"
            className="rounded-full size-10 border-zinc-400"
          >
            <SettingIcon />
          </Button>
        </div>
        <Wrapper>
          <FilterMenu />
        </Wrapper>
      </header>

      <header className={cn('hidden md:block sticky top-0 bg-white')}>
        <Wrapper>
          <div className="h-20 flex items-center justify-between relative">
            <div className="flex items-center">
              <AppIcon className="text-primary" />
              {!isTop && <SmallFilterMenu />}
            </div>
            {isTop && (
              <div className="flex flex-1 items-center justify-center absolute left-1/2 right-1/2">
                <MainMenu
                  memuList={[
                    { name: 'Stays', href: '', active: true },
                    { name: 'Experiences', href: '' },
                    { name: 'Online Experiences', href: '' },
                  ]}
                  className="hidden px-6 lg:flex items-center justify-between"
                />
              </div>
            )}
            <div className="flex items-center">
              <Button
                variant="ghost"
                className="rounded-full p-3"
              >
                Switch to hosting
              </Button>
              <Button
                variant="ghost"
                className="p-0 rounded-full h-[42px] w-[42px] flex items-center justify-center"
              >
                <LanguageIcon />
              </Button>
              <ProfileMenu />
            </div>
          </div>
          {isTop && (
            <div className="pb-5">
              <MainMenu
                memuList={[
                  { name: 'Stays', href: '', active: true },
                  { name: 'Experiences', href: '' },
                  { name: 'Online Experiences', href: '' },
                ]}
                className="hidden mt-1 mb-5 md:flex lg:hidden"
              />
              <SearchBar />
            </div>
          )}
        </Wrapper>
        <Separator />
        <Wrapper>
          <FilterMenu className="hidden md:block sticky" />
        </Wrapper>
      </header>
    </>
  )
}

interface SmallFilterMenuProps {}

const SmallFilterMenu: React.FC<SmallFilterMenuProps> = () => {
  return (
    <div className="flex justify-self-end lg:absolute lg:translate-x-[-50%] lg:left-[50%] h-12 mx-6 items-center border shadow-md rounded-full hover:shadow-lg hover:cursor-pointer">
      <div className="text-sm text-base-primary font-medium px-4 line-clamp-1">Anywhere</div>
      <Separator
        orientation="vertical"
        className="h-6"
      />
      <div className="text-sm text-base-primary font-medium px-4 line-clamp-1">Any week</div>
      <Separator
        orientation="vertical"
        className="h-6"
      />
      <div className="text-sm text-base-secondary px-4 line-clamp-1">Add guests</div>
      <div className="bg-primary size-8 min-w-8 rounded-full flex items-center justify-center mr-2">
        <SearchIconDesktop className="text-white size-3.5" />
      </div>
    </div>
  )
}

interface MainMenuProps {
  memuList: {
    name: string
    href: string
    active?: boolean
  }[]
  className?: string
}

export const MainMenu: React.FC<MainMenuProps> = ({ memuList, className }) => {
  return (
    <div className={cn('flex justify-center items-center', className)}>
      {memuList.map((menu, index) => (
        <Button
          key={index}
          variant="ghost"
          data-active={menu?.active}
          className={cn(
            'm-0 px-3 py-2.5 text-base rounded-full text-base-secondary font-normal lg:px-4',
            'hover:bg-gray-200 hover:text-base-primary hover:data-[active=true]:bg-inherit',
            'data-[active=true]:text-base-primary data-[active=true]:font-semibold'
          )}
        >
          {menu?.name}
        </Button>
      ))}
    </div>
  )
}

export default AppHeader
