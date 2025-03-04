import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  try {
    // Clear existing data (optional)
    // await prisma.internship.deleteMany({})
    
    // Create new records
    const internship1 = await prisma.internship.create({
      data: {
        title: "Software Engineering Intern",
        company: "Tech Solutions Inc.",
        location: "Lisbon, Portugal",
        description: "Join our team to work on cutting-edge web applications.",
        requirements: "Knowledge of JavaScript, React, and Node.js",
        applicationDeadline: new Date("2023-12-31"),
        isActive: true,
      },
    })
    
    const internship2 = await prisma.internship.create({
      data: {
        title: "Data Science Intern",
        company: "Data Analytics Co.",
        location: "Porto, Portugal",
        description: "Help us analyze large datasets and build predictive models.",
        requirements: "Experience with Python, pandas, and machine learning",
        applicationDeadline: new Date("2023-11-30"),
        isActive: true,
      },
    })
    
    console.log('Database has been seeded with sample internships')
  } catch (error) {
    console.error('Error seeding database:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  }) 