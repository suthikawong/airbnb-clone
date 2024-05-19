import { z } from 'zod'

export const LoginSchema = z.object({
  email: z.string().email({
    message: 'Email is requied',
  }),
  password: z.string().min(1, {
    message: 'Password is required',
  }),
})

export const ForgetSchema = z.object({
  email: z.string().email({
    message: 'Email is requied',
  }),
})

export const ResetSchema = z.object({
  password: z.string().min(1, {
    message: 'Password is required',
  }),
})

export type LoginType = z.infer<typeof LoginSchema>

export type ForgetType = z.infer<typeof ForgetSchema>

export type ResetType = z.infer<typeof ResetSchema>
