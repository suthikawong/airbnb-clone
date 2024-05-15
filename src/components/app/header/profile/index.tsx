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
import React, { useCallback, useEffect, useMemo } from 'react'
import LoginModal from './modal'
import { toast } from 'sonner'

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
      <Menubar className="border-0 p-0 ml-2">
        <MenubarMenu>
          <MenubarTrigger className="w-[84px] h-[48px] p-2 pl-3.5 !bg-white rounded-full border flex justify-between items-center hover:shadow-md">
            <HamburgerIcon />
            {isLogin ? (
              <>
                {data?.user.image ? (
                  <div className="size-8 rounded-full relative overflow-hidden">
                    <Image
                      alt="profile-image"
                      src={data?.user.image}
                      layout="fill"
                    />
                  </div>
                ) : (
                  <div className="size-8 rounded-full bg-black text-white flex items-center justify-center">
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
            className="py-2 px-0 rounded-xl"
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
  const setLoginMode = useCallback(() => router.push(`${pathname}/?mode=${Mode.Login}`), [pathname, router])

  return (
    <>
      <MenubarItem
        className="font-semibold"
        onClick={setLoginMode}
      >
        Log in
      </MenubarItem>
      <MenubarItem onClick={setLoginMode}>Sign Up</MenubarItem>
      <MenubarSeparator />
      <MenubarItem>Gift Cards</MenubarItem>
      <MenubarItem>Airbnb your home</MenubarItem>
      <MenubarItem>Help Center</MenubarItem>
    </>
  )
}

export default ProfileMenu
