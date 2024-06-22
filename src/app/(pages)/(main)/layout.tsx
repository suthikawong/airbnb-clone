import AppHeader from '@/components/app/header/AppHeader'
import './../../globals.css'

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <AppHeader />
      <main>{children}</main>
    </>
  )
}
