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
import ProfileMenu from './profile'
import SearchBar from './SearchBar'
import SearchIconDesktop from '@/components/icons/SearchIconDesktop'
import Link from 'next/link'

interface AppHeaderProps extends PropsWithChildren {}

const AppHeader: React.FC<AppHeaderProps> = () => {
  const [isTop, setIsTop] = useState(true)

  useEffect(() => {
    const handleScroll = async () => {
      const position = window.scrollY
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
      <header className="sticky top-0 block border-b bg-white shadow-md md:hidden">
        <div className="flex items-center gap-2.5 px-6 pt-3.5">
          <div className="flex h-[54px] w-[500px] flex-1 items-center rounded-full border px-1 shadow-md">
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
            className="size-10 rounded-full border-zinc-400"
          >
            <SettingIcon />
          </Button>
        </div>
        <Wrapper>
          <FilterMenu />
        </Wrapper>
      </header>

      <header className={cn('sticky top-0 hidden bg-white md:block')}>
        <Wrapper>
          <div className="relative flex h-20 items-center justify-between">
            <div className="flex items-center">
              <AppIcon className="text-primary" />
              {!isTop && <SmallFilterMenu />}
            </div>
            {isTop && (
              <div className="absolute left-1/2 right-1/2 flex flex-1 items-center justify-center">
                <MainMenu
                  memuList={[
                    { name: 'Stays', href: '', active: true },
                    { name: 'Experiences', href: '' },
                    { name: 'Online Experiences', href: '' },
                  ]}
                  className="hidden items-center justify-between px-6 lg:flex"
                />
              </div>
            )}
            <div className="flex items-center">
              <Link href="/hosting">
                <Button variant="ghost" className="rounded-full p-3">
                  Switch to hosting
                </Button>
              </Link>
              <Button
                variant="ghost"
                className="flex h-[42px] w-[42px] items-center justify-center rounded-full p-0"
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
                className="mb-5 mt-1 hidden md:flex lg:hidden"
              />
              <SearchBar />
            </div>
          )}
        </Wrapper>
        <Separator />
        <Wrapper>
          <FilterMenu className="sticky hidden md:block" />
        </Wrapper>
      </header>
    </>
  )
}

interface SmallFilterMenuProps {}

const SmallFilterMenu: React.FC<SmallFilterMenuProps> = () => {
  return (
    <div className="mx-6 flex h-12 items-center justify-self-end rounded-full border shadow-md hover:cursor-pointer hover:shadow-lg lg:absolute lg:left-[50%] lg:translate-x-[-50%]">
      <div className="line-clamp-1 px-4 text-sm font-medium text-base-primary">
        Anywhere
      </div>
      <Separator orientation="vertical" className="h-6" />
      <div className="line-clamp-1 px-4 text-sm font-medium text-base-primary">
        Any week
      </div>
      <Separator orientation="vertical" className="h-6" />
      <div className="line-clamp-1 px-4 text-sm text-base-secondary">
        Add guests
      </div>
      <div className="mr-2 flex size-8 min-w-8 items-center justify-center rounded-full bg-primary">
        <SearchIconDesktop className="size-3.5 text-white" />
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
    <div className={cn('flex items-center justify-center', className)}>
      {memuList.map((menu, index) => (
        <Button
          key={index}
          variant="ghost"
          data-active={menu?.active}
          className={cn(
            'm-0 rounded-full px-3 py-2.5 text-base font-normal text-base-secondary lg:px-4',
            'hover:bg-gray-200 hover:text-base-primary hover:data-[active=true]:bg-inherit',
            'data-[active=true]:font-semibold data-[active=true]:text-base-primary'
          )}
        >
          {menu?.name}
        </Button>
      ))}
    </div>
  )
}

export default AppHeader
