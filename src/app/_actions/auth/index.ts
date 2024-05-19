'use server'

import { signIn } from '@/auth'
import { sendVerificationEmail } from '@/lib/mail'
import { generateVerificationToken } from '@/lib/tokens'
import { DEFAULT_LOGIN_REDIRECT } from '@/routes'
import { AuthError } from 'next-auth'
import { getUserByEmail } from '../user'
import { LoginSchema, LoginType } from './types'
import { getVerificationTokenByToken } from '../verification-token'
import { db } from '@/lib/db'

export const login = async (values: LoginType) => {
  try {
    const validatedValues = LoginSchema.safeParse(values)
    if (!validatedValues.success) return { error: 'Invalid fields' }

    const { email, password } = validatedValues.data
    const existingUser = await getUserByEmail(email)

    if (!existingUser || !existingUser.email || !existingUser.password) {
      return { error: 'Email does not exist' }
    }

    if (!existingUser.emailVerified) {
      const verificationToken = await generateVerificationToken(existingUser.email)
      await sendVerificationEmail(verificationToken.email, verificationToken.token)
      return { success: 'Confirmation email sent' }
    }

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

export const emailVerification = async (token: string) => {
  const existingToken = await getVerificationTokenByToken(token)

  if (!existingToken) {
    return { error: 'Token does not exist' }
  }

  const hasExpired = new Date(existingToken.expires) < new Date()
  if (hasExpired) {
    return { error: 'Token has expired' }
  }

  const existingUser = await getUserByEmail(existingToken.email)

  if (!existingUser) {
    return { error: 'Email does not exist' }
  }

  await db.user.update({
    where: { id: existingUser.id },
    data: { emailVerified: new Date(), email: existingToken.email },
  })

  await db.verificationToken.delete({
    where: { id: existingToken.id },
  })

  return { success: 'Email verified' }
}
