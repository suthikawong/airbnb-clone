'use server'

import { signIn } from '@/auth'
import { sendPasswordResetEmail, sendVerificationEmail } from '@/lib/mail'
import { generatePasswordResetToken, generateVerificationToken } from '@/lib/tokens'
import { DEFAULT_LOGIN_REDIRECT } from '@/routes'
import { AuthError } from 'next-auth'
import { getUserByEmail } from '../user'
import { ForgetSchema, ForgetType, LoginSchema, LoginType, ResetSchema, ResetType } from './types'
import { db } from '@/lib/db'
import { getVerificationTokenByToken } from '../verification-token'
import { getPasswordResetTokenByToken } from '../password-reset-token'
import bcrypt from 'bcryptjs'

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

export const forgetPassword = async (values: ForgetType) => {
  const validatedFields = ForgetSchema.safeParse(values)

  if (!validatedFields.success) return { error: 'Invalid email' }

  const { email } = validatedFields.data
  const existingUser = await getUserByEmail(email)

  if (!existingUser) return { error: 'Email not found' }

  const passwordResetToken = await generatePasswordResetToken(email)
  await sendPasswordResetEmail(passwordResetToken.email, passwordResetToken.token)

  return { success: 'Reset email sent' }
}

export const resetPassword = async (values: ResetType, token: string | null) => {
  if (!token) return { error: 'Missing token' }

  const validatedFields = ResetSchema.safeParse(values)
  if (!validatedFields.success) return { error: 'Invalid fields' }

  const { password } = validatedFields.data
  const existingToken = await getPasswordResetTokenByToken(token)

  if (!existingToken) return { error: 'Invalid token' }

  const hasExpired = new Date(existingToken.expires) < new Date()

  if (hasExpired) {
    return { error: 'Token has expired' }
  }

  const existingUser = await getUserByEmail(existingToken.email)

  if (!existingUser) return { error: 'Email does not exist' }

  const hashedPassword = await bcrypt.hash(password, 10)
  await db.user.update({
    where: { id: existingUser.id },
    data: { password: hashedPassword },
  })

  await db.passwordResetToken.delete({
    where: { id: existingToken.id },
  })

  return { success: 'Password updated' }
}
