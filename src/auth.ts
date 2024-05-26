import authConfig from '@/auth.config'
import { db } from '@/lib/db'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { Adapter } from 'next-auth/adapters'
import NextAuth, { DefaultSession } from 'next-auth'
import { getUserById } from './app/_actions/user'

export type ExtendedUser = DefaultSession['user'] & {
  firstName?: string | undefined
}

declare module 'next-auth' {
  interface Session {
    user: ExtendedUser
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  pages: {
    signIn: '/',
  },
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      })
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      // Allow OAuth without email verification
      if (account?.provider !== 'credentials') return true
      if (!user?.id) return false
      const existingUser = await getUserById(user.id)

      // Prevent sign in without email verification
      if (!existingUser?.emailVerified) return false

      return true
    },
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user = {
          ...session.user,
          id: token.sub,
          firstName: token.firstName as string | undefined,
        }
      }
      return session
    },
    async jwt({ token }) {
      if (!token.sub) return token
      const user = await getUserById(token.sub)
      if (!user) return token
      token.firstName = user?.firstName
      return token
    },
  },
  adapter: PrismaAdapter(db) as Adapter,
  session: { strategy: 'jwt' },
  ...authConfig,
})
