import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  try {
    // Clear existing data
    console.log("Clearing existing data...")
    await prisma.internship.deleteMany({})
    await prisma.company.deleteMany({})

    console.log("Creating companies...")
    // First, create the companies
    const techSolutions = await prisma.company.create({
      data: {
        name: "Tech Solutions Inc.",
        logo: "https://example.com/tech-solutions-logo.png",
        website: "https://techsolutions.example.com",
        description: "A leading technology solutions provider.",
      },
    })

    const dataAnalytics = await prisma.company.create({
      data: {
        name: "Data Analytics Co.",
        logo: "https://example.com/data-analytics-logo.png",
        website: "https://dataanalytics.example.com",
        description: "Specializing in big data analytics.",
      },
    })

    console.log("Creating internships...")
    // Create new internship records
    const internships = await Promise.all([
      prisma.internship.create({
        data: {
          title: "Software Engineering Intern",
          type: "Full-time",
          location: "Lisbon, Portugal",
          duration: "3 months",
          description: "Join our team to work on cutting-edge web applications.",
          requirements: "Knowledge of JavaScript, React, and Node.js",
          deadline: new Date("2024-12-31"),
          url: "https://techsolutions.example.com/careers/intern",
          featured: true,
          companyId: techSolutions.id,
        },
      }),
      prisma.internship.create({
        data: {
          title: "Data Science Intern",
          type: "Part-time",
          location: "Porto, Portugal",
          duration: "6 months",
          description: "Help us analyze large datasets and build predictive models.",
          requirements: "Experience with Python, pandas, and machine learning",
          deadline: new Date("2024-11-30"),
          url: "https://dataanalytics.example.com/careers/data-science-intern",
          featured: false,
          companyId: dataAnalytics.id,
        },
      }),
    ])

    console.log(`Database has been seeded. ${internships.length} internships created.`)

    // Log the created data
    const allInternships = await prisma.internship.findMany({
      include: { company: true },
    })
    console.log("All internships:", JSON.stringify(allInternships, null, 2))
  } catch (error) {
    console.error("Error seeding database:", error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})

