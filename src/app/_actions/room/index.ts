'use server'

import { db } from '@/lib/db'
import { CreateRoomType } from './types'

export const fetchRoom = async () => {
  const data = await db.room.findMany({ include: { images: true } })
  return data
}

export const createRoom = async (data: CreateRoomType) => {
  const images = data.images
  delete data.images
  const result = await db.room.create({
    data: { ...data, images: { create: images } },
  })
  return result
}
