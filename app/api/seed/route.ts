import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

// Sample internship data
const internshipData = [
  {
    companyName: "Google",
    position: "Software Engineering Intern",
    location: "Mountain View, CA",
    startDate: new Date("2023-06-01"),
    endDate: new Date("2023-08-31"),
    description: "Join our team to work on cutting-edge technologies.",
    deadline: new Date("2023-05-01"),
    salary: "8000",
    requirements: "Currently pursuing BS/MS in Computer Science or related field",
    applicationLink: "https://careers.google.com",
  },
  {
    companyName: "Microsoft",
    position: "Product Management Intern",
    location: "Redmond, WA",
    startDate: new Date("2023-06-15"),
    endDate: new Date("2023-09-15"),
    description: "Help shape the future of our products.",
    deadline: new Date("2023-05-15"),
    salary: "7500",
    requirements: "Strong analytical and communication skills",
    applicationLink: "https://careers.microsoft.com",
  },
  {
    companyName: "Amazon",
    position: "Data Science Intern",
    location: "Seattle, WA",
    startDate: new Date("2023-05-15"),
    endDate: new Date("2023-08-15"),
    description: "Work with big data and machine learning models.",
    deadline: new Date("2023-04-15"),
    salary: "7800",
    requirements: "Experience with Python and machine learning",
    applicationLink: "https://amazon.jobs",
  },
  {
    companyName: "Meta",
    position: "UX Design Intern",
    location: "Remote",
    startDate: new Date("2023-06-01"),
    endDate: new Date("2023-08-31"),
    description: "Design user experiences for our platforms.",
    deadline: new Date("2023-05-01"),
    salary: "7000",
    requirements: "Portfolio showcasing UI/UX projects",
    applicationLink: "https://careers.meta.com",
  },
  {
    companyName: "Apple",
    position: "iOS Development Intern",
    location: "Cupertino, CA",
    startDate: new Date("2023-07-01"),
    endDate: new Date("2023-09-30"),
    description: "Build the next generation of iOS applications.",
    deadline: new Date("2023-06-01"),
    salary: "8500",
    requirements: "Experience with Swift and iOS development",
    applicationLink: "https://apple.com/careers",
  },
]

export async function GET() {
  try {
    // Clear existing data
    await prisma.internship.deleteMany()
    await prisma.company.deleteMany()

    // Create companies and internships
    for (const internship of internshipData) {
      const { companyName, ...internshipDetails } = internship
      
      // Create company
      const company = await prisma.company.create({
        data: {
          name: companyName,
          website: internshipDetails.applicationLink,
        },
      })

      // Create internship linked to company
      await prisma.internship.create({
        data: {
          ...internshipDetails,
          companyId: company.id,
        },
      })
    }

    return NextResponse.json({
      success: true,
      message: `Database seeded with ${internshipData.length} internships`,
    })
  } catch (error) {
    console.error("Error seeding database:", error)
    return NextResponse.json(
      { 
        success: false, 
        error: "Failed to seed database" 
      }, 
      { status: 500 }
    )
  }
} 