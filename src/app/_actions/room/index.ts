'use server'

import { db } from '@/lib/db'
import { CreateRoomType } from './types'

export const fetchRoom = async () => {
  try {
    const data = await db.room.findMany()
    return { data }
  } catch (error) {
    throw new Error('Something went wrong')
  }
}

export const createRoom = async (data: CreateRoomType) => {
  try {
    const images = data.images
    delete data.images
    const result = await db.room.create({ data: { ...data, images: { create: images } } })
    return { data: result }
  } catch (error) {
    console.error('error : ', error)
    throw new Error('Something went wrong')
  }
}
