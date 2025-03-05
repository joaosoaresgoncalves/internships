import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET() {
  try {
    const internships = await prisma.internship.findMany({
      include: { company: true },
      orderBy: { createdAt: "desc" },
    })
    return NextResponse.json(internships)
  } catch (error: any) {
    console.error("Error fetching internships:", error)
    return NextResponse.json({ error: "Failed to fetch internships" }, { status: 500 })
  }
}

