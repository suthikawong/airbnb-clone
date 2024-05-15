import { z } from 'zod'

export const CreateUserSchema = z.object({
  email: z.string().min(1, 'Email is required'),
  password: z.string().min(1, 'Password is required'),
  firstName: z.string().min(1, 'Firstname is required'),
  lastName: z.string().min(1, 'Lastname is required'),
  birthDate: z.coerce.date({ errorMap: () => ({ message: 'Birthdate is required' }) }),
  isRceivedMessage: z.boolean(),
})

export type CreateUserType = z.infer<typeof CreateUserSchema>
