import { cn } from '@/lib/utils'
import React, { PropsWithChildren } from 'react'
import FilterMenu from './FilterMenu'
import AppIcon from '../../icons/AppIcon'
import SearchIconDesktop from '../../icons/SearchIconDesktop'
import SearchIconMobile from '../../icons/SearchIconMobile'
import SettingIcon from '../../icons/SettingIcon'
import { Button } from '../../ui/button'
import { Separator } from '../../ui/separator'
import LanguageIcon from '../../icons/LanguageIcon'
import { Popover, PopoverContent, PopoverTrigger } from '../../ui/popover'
import HamburgerIcon from '../../icons/HamburgerIcon'
import Wrapper from '../Wrapper'
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from '../../ui/menubar'
import SearchBar from './SearchBar'

interface AppHeaderProps extends PropsWithChildren {}

const AppHeader: React.FC<AppHeaderProps> = () => {
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
      <header className="hidden md:block">
        <Wrapper>
          <div className="h-20 flex items-center justify-between relatvie">
            <AppIcon className="text-primary" />
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
              <Menubar className="border-0 p-0 ml-2">
                <MenubarMenu>
                  <MenubarTrigger className="w-[84px] p-2 pl-3.5 !bg-white rounded-full border flex justify-between items-center hover:shadow-md">
                    <HamburgerIcon />
                    <div className="size-8 rounded-full bg-black text-white flex items-center justify-center">S</div>
                  </MenubarTrigger>
                  <MenubarContent
                    align="end"
                    data-state="open"
                    className="py-2 px-0 rounded-xl"
                  >
                    <MenubarItem className="font-semibold">Messages</MenubarItem>
                    <MenubarItem className="font-semibold">Notifications</MenubarItem>
                    <MenubarItem className="font-semibold">Trips</MenubarItem>
                    <MenubarItem className="font-semibold">Wishlists</MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem>Manage listings</MenubarItem>
                    <MenubarItem>Refer a Host</MenubarItem>
                    <MenubarItem>Account</MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem>Gift Cards</MenubarItem>
                    <MenubarItem>Help Center</MenubarItem>
                    <MenubarItem>Logout</MenubarItem>
                  </MenubarContent>
                </MenubarMenu>
              </Menubar>
            </div>
          </div>
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
        </Wrapper>
        <Separator />
      </header>
    </>
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