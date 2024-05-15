'use server'

import { db } from '@/lib/db'
import { LoginSchema, LoginType } from './types'
import { signIn, signOut } from '@/auth'
import { DEFAULT_LOGIN_REDIRECT } from '@/routes'
import { AuthError } from 'next-auth'
import { isRedirectError } from 'next/dist/client/components/redirect'
// import { generateVerificationToken } from '@/lib/tokens'
// import { getUserByEmail } from '../user'

export const login = async (values: LoginType) => {
  try {
    const validatedValues = LoginSchema.safeParse(values)
    if (!validatedValues.success) return { error: 'Invalid fields' }

    const { email, password } = validatedValues.data
    // const existingUser = await getUserByEmail(email)

    // if (!existingUser || !existingUser.email || !existingUser.password) {
    //   return { error: 'Email does not exist' }
    // }

    // if (!existingUser.emailVerified) {
    //   const verificationToken = await generateVerificationToken(existingUser.email)
    // }

    await signIn('credentials', {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    })

    return { email }
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: 'Invalid credentials' }
      }
    }
    throw error
  }
}
