import { z } from 'zod'
import dayjs from 'dayjs'

export const CreateUserSchema = z.object({
  email: z.string().min(1, 'Email is required.'),
  password: z.string().min(1, 'Password is required.'),
  firstName: z.string().min(1, 'First name is required.'),
  lastName: z.string().min(1, 'Last name is required.'),
  birthDate: z.coerce.date({
    errorMap: () => ({ message: 'Select your birth date to continue.' }),
  }),
  isRceivedMessage: z.boolean(),
})

export type CreateUserType = z.infer<typeof CreateUserSchema>
