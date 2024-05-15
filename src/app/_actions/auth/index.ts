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
    if (!validatedValues.success) throw new Error('Invalid fields')

    const { email, password } = validatedValues.data
    // const existingUser = await getUserByEmail(email)

    // if (!existingUser || !existingUser.email || !existingUser.password) {
    //   throw new Error('Email does not exist')
    // }

    // if (!existingUser.emailVerified) {
    //   const verificationToken = await generateVerificationToken(existingUser.email)
    // }

    await signIn('credentials', {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    })

    return { data: { email } }
  } catch (error) {
    console.error('error : ', error)
    if (isRedirectError(error)) {
      console.error(error)
      throw error
    }
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          throw new Error('Invalid credentials')
      }
    }
    throw new Error('Something went wrong')
  }
}
