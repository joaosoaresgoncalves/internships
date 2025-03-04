"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Internship {
  id: number
  title: string
  type: string
  location: string
  duration: string
  url: string
  company: {
    name: string
    logo?: string | null
    website?: string | null
  }
}

export default function InternshipList({ internships }: { internships: Internship[] }) {
  const [sortBy, setSortBy] = useState("newest")

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col space-y-8">
        <div className="flex flex-col space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">Find Your Perfect Internship</h1>
          <p className="text-xl text-muted-foreground">
            Discover thousands of internship opportunities at top companies. Start your career journey today.
          </p>
          <div className="flex gap-4">
            <Input placeholder="Search internships..." className="max-w-lg" />
            <Button>Search</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold mb-4">Filters</h2>
              <div className="space-y-6">
                <div className="space-y-3">
                  <h3 className="font-medium">Industry</h3>
                  {["Technology", "Finance", "Marketing", "Healthcare", "Engineering"].map((industry) => (
                    <div key={industry} className="flex items-center space-x-2">
                      <Checkbox id={industry} />
                      <label
                        htmlFor={industry}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {industry}
                      </label>
                    </div>
                  ))}
                </div>

                <div className="space-y-3">
                  <h3 className="font-medium">Location</h3>
                  {["Remote", "New York", "San Francisco", "London", "Toronto"].map((location) => (
                    <div key={location} className="flex items-center space-x-2">
                      <Checkbox id={location} />
                      <label
                        htmlFor={location}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {location}
                      </label>
                    </div>
                  ))}
                </div>

                <div className="space-y-3">
                  <h3 className="font-medium">Duration</h3>
                  {["Summer", "3 Months", "6 Months"].map((duration) => (
                    <div key={duration} className="flex items-center space-x-2">
                      <Checkbox id={duration} />
                      <label
                        htmlFor={duration}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {duration}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:col-span-3 space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Available Internships</h2>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Sort by:</span>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[120px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="oldest">Oldest</SelectItem>
                    <SelectItem value="company">Company</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

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
                  <TableRow key={internship.id}>
                    <TableCell>{internship.company.name}</TableCell>
                    <TableCell>{internship.title}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{internship.type}</Badge>
                    </TableCell>
                    <TableCell>{internship.location}</TableCell>
                    <TableCell>{internship.duration}</TableCell>
                    <TableCell>
                      <a
                        href={internship.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        Apply
                      </a>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <div className="flex justify-center mt-4">
              <Button variant="outline">Load More</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

