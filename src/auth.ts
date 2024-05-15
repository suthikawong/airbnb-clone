import authConfig from '@/auth.config'
import { db } from '@/lib/db'
import { PrismaAdapter } from '@auth/prisma-adapter'
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
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user = { ...session.user, id: token.sub, firstName: token.firstName as string | undefined }
      }
      return session
    },
    async jwt({ token }) {
      if (!token.sub) return token
      const user = await getUserById(token.sub)
      if (!user.data) return token
      token.firstName = user?.data?.firstName
      return token
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: 'jwt' },
  ...authConfig,
})
