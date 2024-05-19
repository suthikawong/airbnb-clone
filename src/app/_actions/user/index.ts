'use server'

import { db } from '@/lib/db'
import { CreateUserSchema, CreateUserType } from './types'
import bcrypt from 'bcryptjs'
import { generateVerificationToken } from '@/lib/tokens'
import { sendVerificationEmail } from '@/lib/mail'

export const createUser = async (values: CreateUserType) => {
  const validatedValues = CreateUserSchema.safeParse(values)
  if (!validatedValues.success) return { error: 'Invalid fields' }

  const exist = await db.user.findUnique({ where: { email: validatedValues.data.email } })
  if (exist) return { error: 'Email already exist' }

  const hashedPassword = await bcrypt.hash(validatedValues.data.password, 10)
  const user = await db.user.create({ data: { ...validatedValues.data, password: hashedPassword } })

  const verificationToken = await generateVerificationToken(validatedValues.data.email)
  console.log('TLOG ~ verificationToken:', verificationToken)
  await sendVerificationEmail(verificationToken.email, verificationToken.token)

  return user
}

export const getUserById = async (id: string) => {
  const user = await db.user.findUnique({ where: { id } })
  return user
}

export const getUserByEmail = async (email: string) => {
  const user = await db.user.findUnique({ where: { email } })
  return user
}
