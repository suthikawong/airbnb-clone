import AppHeader from '@/components/app/header/AppHeader'
import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import './../globals.css'

const roboto = Roboto({ subsets: ['latin'], weight: ['100', '300', '400', '500', '700', '900'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <AppHeader />
      {children}
    </>
  )
}