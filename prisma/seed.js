const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  try {
    // First, create the companies
    const techSolutions = await prisma.company.create({
      data: {
        name: "Tech Solutions Inc.",
        description: "A leading technology solutions provider",
        website: "https://techsolutions.example.com"
      }
    })
    
    const dataAnalytics = await prisma.company.create({
      data: {
        name: "Data Analytics Co.",
        description: "Specializing in data analysis and machine learning",
        website: "https://dataanalytics.example.com"
      }
    })
    
    // Now create internships with relations to companies
    const internship1 = await prisma.internship.create({
      data: {
        title: "Software Engineering Intern",
        location: "Lisbon, Portugal",
        description: "Join our team to work on cutting-edge web applications.",
        requirements: "Knowledge of JavaScript, React, and Node.js",
        type: "FULL_TIME",
        duration: "3 months",
        deadline: new Date("2023-12-15"),
        url: "https://techsolutions.example.com/careers/intern",
        postedAt: new Date(),
        featured: true,
        company: {
          connect: { id: techSolutions.id }
        }
      },
    })
    
    const internship2 = await prisma.internship.create({
      data: {
        title: "Data Science Intern",
        location: "Porto, Portugal",
        description: "Help us analyze large datasets and build predictive models.",
        requirements: "Experience with Python, pandas, and machine learning",
        type: "PART_TIME",
        duration: "6 months",
        deadline: new Date("2023-11-15"),
        url: "https://dataanalytics.example.com/jobs/intern",
        postedAt: new Date(),
        company: {
          connect: { id: dataAnalytics.id }
        }
      },
    })
    
    console.log('Database has been seeded with sample companies and internships')
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