"use client"

import { useEffect, useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface Internship {
  id: number
  title: string
  type: string
  location: string
  duration: string
  url: string
  featured: boolean
  company: {
    name: string
  }
}

export default function InternshipList() {
  const [internships, setInternships] = useState<Internship[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchInternships() {
      try {
        const response = await fetch("/api/internships")
        if (!response.ok) {
          throw new Error("Failed to fetch internships")
        }
        const data = await response.json()
        setInternships(data)
      } catch (error) {
        console.error("Error fetching internships:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchInternships()
  }, [])

  if (isLoading) {
    return <div>Loading internships...</div>
  }

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Company</TableHead>
            <TableHead>Position</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Duration</TableHead>
            <TableHead>URL</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {internships.map((internship) => (
            <TableRow key={internship.id} className={internship.featured ? "bg-primary/5" : ""}>
              <TableCell className="font-medium">{internship.company.name}</TableCell>
              <TableCell>{internship.title}</TableCell>
              <TableCell>
                <Badge variant={internship.type === "Full-time" ? "default" : "outline"}>{internship.type}</Badge>
              </TableCell>
              <TableCell>{internship.location}</TableCell>
              <TableCell>{internship.duration}</TableCell>
              <TableCell>
                <Button asChild variant="link" size="sm" className="p-0">
                  <Link href={internship.url}>View Details</Link>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex justify-center mt-8">
        <Button variant="outline">Load More</Button>
      </div>
    </div>
  )
}

