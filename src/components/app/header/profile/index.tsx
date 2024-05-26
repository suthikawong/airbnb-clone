import HamburgerIcon from '@/components/icons/HamburgerIcon'
import UserIcon from '@/components/icons/UserIcon'
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from '@/components/ui/menubar'
import { Mode } from '@/config'
import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useMemo } from 'react'
import { toast } from 'sonner'
import LoginModal from './modal'

const ProfileMenu = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { data, status } = useSession()
  const isLogin = useMemo(() => status === 'authenticated', [status])
  const authError = useMemo(() => searchParams.get('error'), [searchParams])

  useEffect(() => {
    if (status === 'unauthenticated' && authError === 'OAuthAccountNotLinked') {
      toast.error('Email already in use with different provider!')
      router.push('/')
    }
  }, [authError, status, router])

  return (
    <>
      <Menubar className="ml-2 border-0 p-0">
        <MenubarMenu>
          <MenubarTrigger className="flex h-[48px] w-[84px] items-center justify-between rounded-full border !bg-white p-2 pl-3.5 hover:shadow-md">
            <HamburgerIcon />
            {isLogin ? (
              <>
                {data?.user.image ? (
                  <div className="relative size-8 overflow-hidden rounded-full">
                    <Image
                      alt="profile-image"
                      src={data?.user.image}
                      layout="fill"
                    />
                  </div>
                ) : (
                  <div className="flex size-8 items-center justify-center rounded-full bg-black text-white">
                    {data?.user?.firstName?.charAt(0)?.toUpperCase()}
                  </div>
                )}
              </>
            ) : (
              <UserIcon />
            )}
          </MenubarTrigger>

          <MenubarContent
            align="end"
            data-state="open"
            className="rounded-xl px-0 py-2"
          >
            {isLogin ? <AuthenMenu /> : <UnauthenMenu />}
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
      <LoginModal />
    </>
  )
}

const AuthenMenu = () => {
  return (
    <>
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
      <MenubarItem onClick={() => signOut()}>Logout</MenubarItem>
    </>
  )
}

// interface UnauthenMenuProps {
//   setMode: React.Dispatch<React.SetStateAction<Mode | undefined>>
// }

const UnauthenMenu: React.FC = () => {
  const pathname = usePathname()
  const router = useRouter()

  return (
    <>
      <MenubarItem
        className="font-semibold"
        onClick={() => router.push(`${pathname}/?mode=${Mode.OAuth}`)}
      >
        Sign Up
      </MenubarItem>
      <MenubarItem
        onClick={() => router.push(`${pathname}/?mode=${Mode.OAuth}`)}
      >
        Log in
      </MenubarItem>
      <MenubarSeparator />
      <MenubarItem>Gift Cards</MenubarItem>
      <MenubarItem>Airbnb your home</MenubarItem>
      <MenubarItem>Help Center</MenubarItem>
    </>
  )
}

export default ProfileMenu
