import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Add your seeding logic here
  // For example:
  // const user1 = await prisma.user.upsert({
  //   where: { email: 'alice@example.com' },
  //   update: {},
  //   create: {
  //     email: 'alice@example.com',
  //     name: 'Alice',
  //   },
  // })
  
  console.log('Database has been seeded.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 