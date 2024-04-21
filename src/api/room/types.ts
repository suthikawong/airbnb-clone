import { z } from 'zod'

export const CreateRoomSchema = z.object({
  name: z.string().min(1, 'Place name is required'),
  country: z.string().min(1, 'Location is required'),
  lat: z.number(),
  lng: z.number(),
  imageIds: z.string().array(),
  maxGuests: z.coerce.number().int().nonnegative(),
  bedroomNumber: z.coerce.number().int().nonnegative(),
  bedNumber: z.coerce.number().int().nonnegative(),
  bathNumber: z.coerce.number().int().nonnegative(),
  price: z.coerce.number().nonnegative(),
  detail: z.string().optional(),
  maxReservation: z.coerce.number().int().nonnegative(),
  allowAnimal: z.boolean(),
  // ownerId: z.string().uuid(),
})

export type CreateRoomType = z.infer<typeof CreateRoomSchema>
