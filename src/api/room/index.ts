'use server'

import { db } from '@/lib/db'

export const fetchRoom = async () => {
  try {
    const data = await db.room.findMany()
    return { data }
  } catch (error) {
    throw new Error('Something went wrong')
  }
}
