import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET() {
  try {
    // Fetch all internships with their related company data
    const internships = await prisma.internship.findMany({
      include: {
        company: true,
      },
      orderBy: {
        deadline: 'asc', // Sort by deadline (closest first)
      },
    })

    // Return the internships data
    return NextResponse.json({
      success: true,
      count: internships.length,
      data: internships,
      message: `Found ${internships.length} internships`,
    })
  } catch (error) {
    console.error("Database fetch failed:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch internships from database",
      },
      { status: 500 },
    )
  }
}

