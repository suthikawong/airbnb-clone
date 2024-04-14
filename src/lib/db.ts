import { PrismaClient } from '@prisma/client'

declare global {
  var cachedPrisma: PrismaClient
}

export const db = global.cachedPrisma || new PrismaClient()

// Prevent create new connection when hot reload in development
if (process.env.NODE_ENV === 'development') global.cachedPrisma = db
