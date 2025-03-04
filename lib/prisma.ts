import { PrismaClient } from "@prisma/client"

// Add this type declaration to fix the TypeScript error
declare global {
  var prisma: PrismaClient | undefined
}

let prisma: PrismaClient

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient()
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient()
  }
  prisma = global.prisma
}

export default prisma

