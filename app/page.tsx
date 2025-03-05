import { Search } from "lucide-react"
import InternshipList from "@/components/internship-list"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { Suspense } from "react"
import prisma from "@/lib/prisma"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Calendar, Building2 } from "lucide-react"

async function getInternships() {
  try {
    console.log("Fetching internships from database...")
    const internships = await prisma.internship.findMany({
      include: {
        company: true,
      },
      orderBy: {
        postedAt: "desc",
      },
    })
    
    console.log("Raw internships data:", JSON.stringify(internships, null, 2))
    
    // Transform the data to match the expected interface
    const transformedInternships = internships.map(internship => ({
      ...internship,
      company: {
        ...internship.company,
        logo: internship.company.logo || undefined,  // Convert null to undefined
        website: internship.company.website || undefined  // Convert null to undefined
      }
    }))
    
    console.log("Number of internships after transformation:", transformedInternships.length)
    return transformedInternships
  } catch (error) {
    console.error("Error fetching internships:", error)
    return []
  }
}

export default async function InternshipsPage() {
  try {
    const internships = await prisma.internship.findMany({
      include: {
        company: true,
      },
      orderBy: {
        postedAt: 'desc',
      },
    })

    return (
      <div className="container space-y-8 py-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight">Available Internships</h1>
          <Button variant="outline">Filter</Button>
        </div>

        {internships.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No internships found</p>
            <p className="text-sm text-muted-foreground">Check back later for new opportunities.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {internships.map((internship) => (
              <Card key={internship.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle>{internship.title}</CardTitle>
                  <div className="flex items-center text-primary gap-1">
                    <Building2 className="h-4 w-4" />
                    <span className="font-medium">{internship.company.name}</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{internship.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>
                      {new Date(internship.startDate).toLocaleDateString()} -{" "}
                      {new Date(internship.endDate).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">{internship.description}</p>
                  <div className="pt-4">
                    <Button className="w-full" variant="outline">View Details</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    )
  } catch (error: any) {
    return (
      <div className="container py-8">
        <div className="rounded-lg border border-destructive bg-destructive/10 p-4 text-destructive">
          Failed to load internships. Please try again later.
        </div>
      </div>
    )
  }
}

