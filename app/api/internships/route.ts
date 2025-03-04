import { NextResponse } from "next/server"
import prisma from "../../../lib/prisma"

export async function GET() {
  try {
    const internships = await prisma.internship.findMany({
      include: {
        company: true,
      },
    })
    return NextResponse.json(internships)
  } catch (error) {
    console.error("Request error", error)
    return NextResponse.json({ error: "Error fetching internships" }, { status: 500 })
  }
}

