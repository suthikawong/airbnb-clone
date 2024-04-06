import HamburgerIcon from '@/components/icons/HamburgerIcon'
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from '@/components/ui/menubar'
import React from 'react'

const ProfileMenu = () => {
  return (
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
  )
}

export default ProfileMenu
