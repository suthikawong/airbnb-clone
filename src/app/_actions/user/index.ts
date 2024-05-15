'use server'

import { db } from '@/lib/db'
import { CreateUserSchema, CreateUserType } from './types'
import bcrypt from 'bcryptjs'
import { generateVerificationToken } from '@/lib/tokens'

export const createUser = async (values: CreateUserType) => {
  try {
    const validatedValues = CreateUserSchema.safeParse(values)
    if (!validatedValues.success) throw new Error('Invalid fields')

    const exist = await db.user.findUnique({ where: { email: validatedValues.data.email } })
    if (exist) throw new Error('Email already exist')

    const hashedPassword = await bcrypt.hash(validatedValues.data.password, 10)
    const user = await db.user.create({ data: { ...validatedValues.data, password: hashedPassword } })

    // TODO: Send verification token email

    // const verificationToken = await generateVerificationToken(validatedValues.data.email)

    return { data: user }
  } catch (error) {
    console.error('error : ', error)
    throw new Error('Something went wrong')
  }
}

export const getUserById = async (id: string) => {
  try {
    const user = await db.user.findUnique({ where: { id } })
    return user
  } catch (error) {
    console.error('error : ', error)
    throw new Error('Something went wrong')
  }
}

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({ where: { email } })
    return user
  } catch (error) {
    console.error('error : ', error)
    throw new Error('Something went wrong')
  }
}
