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
    const result = await db.room.create({ data })
    return { data: result }
  } catch (error) {
    console.error('error : ', error)
    throw new Error('Something went wrong')
  }
}
