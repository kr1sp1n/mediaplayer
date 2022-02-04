import { PrismaClient } from '@prisma/client'

let prisma

if (typeof window === 'undefined') {
  prisma = new PrismaClient()
}

export default prisma
