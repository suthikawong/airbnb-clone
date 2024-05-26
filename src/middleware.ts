import authConfig from '@/auth.config'
import NextAuth, { Session } from 'next-auth'
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
} from '@/routes'
import { Mode } from './config'
import { NextRequest } from 'next/server'

export const { auth } = NextAuth(authConfig)

export default auth((req: NextRequest & { auth: Session | null }) => {
  const { nextUrl } = req
  const isLoggedIn = !!req.auth

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname)
  const isAuthRoute = authRoutes.includes(
    `${nextUrl.pathname}?mode=${nextUrl.searchParams.get('mode')}`
  )

  if (isApiAuthRoute) {
    return
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
    }
    return
  }

  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL(`/?mode=${Mode.OAuth}`, nextUrl))
  }

  return
})

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
}
