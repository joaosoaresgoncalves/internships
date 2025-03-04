import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  try {
    // Clear existing data (optional)
    // await prisma.internship.deleteMany({})
    // await prisma.company.deleteMany({})

    // First, create the companies
    const techSolutions = await prisma.company.create({
      data: {
        name: "Tech Solutions Inc.",
        logo: "https://example.com/tech-solutions-logo.png",
        website: "https://techsolutions.example.com",
        description: "A leading technology solutions provider specializing in web and mobile applications.",
      },
    })

    const dataAnalytics = await prisma.company.create({
      data: {
        name: "Data Analytics Co.",
        logo: "https://example.com/data-analytics-logo.png",
        website: "https://dataanalytics.example.com",
        description: "Specializing in big data analytics and machine learning solutions.",
      },
    })

    // Create new internship records with proper company relations
    const internship1 = await prisma.internship.create({
      data: {
        title: "Software Engineering Intern",
        type: "Full-time",
        location: "Lisbon, Portugal",
        duration: "3 months",
        description: "Join our team to work on cutting-edge web applications.",
        requirements: "Knowledge of JavaScript, React, and Node.js",
        deadline: new Date("2023-12-31"),
        url: "https://techsolutions.example.com/careers/intern",
        featured: true,
        companyId: techSolutions.id,
      },
    })

    const internship2 = await prisma.internship.create({
      data: {
        title: "Data Science Intern",
        type: "Part-time",
        location: "Porto, Portugal",
        duration: "6 months",
        description: "Help us analyze large datasets and build predictive models.",
        requirements: "Experience with Python, pandas, and machine learning",
        deadline: new Date("2023-11-30"),
        url: "https://dataanalytics.example.com/careers/data-science-intern",
        featured: false,
        companyId: dataAnalytics.id,
      },
    })

    console.log("Database has been seeded with sample internships")
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

