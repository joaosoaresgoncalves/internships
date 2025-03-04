import { PrismaClient } from "@prisma/client"

const globalForPrisma = globalThis as any

export default globalForPrisma.prisma || new PrismaClient()

