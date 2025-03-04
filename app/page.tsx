import { Search } from "lucide-react"
import InternshipList from "@/components/internship-list"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { Suspense } from "react"
import prisma from "@/lib/prisma"

async function getInternships() {
  try {
    const internships = await prisma.internship.findMany({
      include: {
        company: true,
      },
      orderBy: {
        postedAt: "desc",
      },
    })
    console.log("Fetched internships:", internships) // Debug log
    return internships
  } catch (error) {
    console.error("Error fetching internships:", error)
    return []
  }
}

export default async function InternshipsPage() {
  const internships = await getInternships()

  // Debug log
  console.log("Number of internships:", internships.length)

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b sticky top-0 bg-background z-10">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Link href="/" className="font-bold text-xl">
              InternHub
            </Link>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm font-medium">
              Home
            </Link>
            <Link href="#" className="text-sm font-medium">
              Browse
            </Link>
            <Link href="#" className="text-sm font-medium">
              Companies
            </Link>
            <Link href="#" className="text-sm font-medium">
              Resources
            </Link>
            <Link href="#" className="text-sm font-medium">
              About
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="#" className="text-sm font-medium hidden md:block">
              Sign In
            </Link>
            <Button size="sm">Sign Up</Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="bg-gradient-to-b from-muted/50 to-background py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Find Your Perfect Internship
                </h1>
                <p className="text-muted-foreground md:text-xl">
                  Discover thousands of internship opportunities at top companies. Start your career journey today.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <div className="flex-1 relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input type="search" placeholder="Search internships..." className="w-full pl-8" />
                </div>
                <Button type="submit">Search</Button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-8 md:py-12">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/4 space-y-4">
                <div className="space-y-2">
                  <h3 className="font-medium">Filters</h3>
                  <div className="space-y-1">
                    <h4 className="text-sm font-medium">Industry</h4>
                    <div className="space-y-1">
                      <label className="flex items-center gap-2 text-sm">
                        <input type="checkbox" className="rounded" />
                        Technology
                      </label>
                      <label className="flex items-center gap-2 text-sm">
                        <input type="checkbox" className="rounded" />
                        Finance
                      </label>
                      <label className="flex items-center gap-2 text-sm">
                        <input type="checkbox" className="rounded" />
                        Marketing
                      </label>
                      <label className="flex items-center gap-2 text-sm">
                        <input type="checkbox" className="rounded" />
                        Healthcare
                      </label>
                      <label className="flex items-center gap-2 text-sm">
                        <input type="checkbox" className="rounded" />
                        Engineering
                      </label>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-medium">Location</h4>
                    <div className="space-y-1">
                      <label className="flex items-center gap-2 text-sm">
                        <input type="checkbox" className="rounded" />
                        Remote
                      </label>
                      <label className="flex items-center gap-2 text-sm">
                        <input type="checkbox" className="rounded" />
                        New York
                      </label>
                      <label className="flex items-center gap-2 text-sm">
                        <input type="checkbox" className="rounded" />
                        San Francisco
                      </label>
                      <label className="flex items-center gap-2 text-sm">
                        <input type="checkbox" className="rounded" />
                        London
                      </label>
                      <label className="flex items-center gap-2 text-sm">
                        <input type="checkbox" className="rounded" />
                        Toronto
                      </label>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-medium">Duration</h4>
                    <div className="space-y-1">
                      <label className="flex items-center gap-2 text-sm">
                        <input type="checkbox" className="rounded" />
                        Summer
                      </label>
                      <label className="flex items-center gap-2 text-sm">
                        <input type="checkbox" className="rounded" />3 Months
                      </label>
                      <label className="flex items-center gap-2 text-sm">
                        <input type="checkbox" className="rounded" />6 Months
                      </label>
                      <label className="flex items-center gap-2 text-sm">
                        <input type="checkbox" className="rounded" />
                        12 Months
                      </label>
                    </div>
                  </div>
                </div>
                <Button variant="outline" className="w-full">
                  Clear Filters
                </Button>
              </div>
              <div className="md:w-3/4">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">Available Internships</h2>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Sort by:</span>
                    <select className="text-sm border rounded p-1">
                      <option>Newest</option>
                      <option>Relevance</option>
                      <option>Deadline</option>
                    </select>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <Suspense fallback={<div>Loading...</div>}>
                    {internships.length > 0 ? (
                      <InternshipList internships={internships} />
                    ) : (
                      <div className="text-center py-12">
                        <h2 className="text-xl font-semibold mb-2">No internships found</h2>
                        <p className="text-muted-foreground">Try seeding the database or checking your database connection.</p>
                      </div>
                    )}
                  </Suspense>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-6 md:py-8">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-3">
              <h3 className="text-lg font-medium">InternHub</h3>
              <p className="text-sm text-muted-foreground">Connecting students with opportunities since 2023.</p>
            </div>
            <div className="space-y-3">
              <h3 className="text-sm font-medium">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                    Browse Internships
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                    Companies
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                    Resources
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="text-sm font-medium">For Employers</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                    Post an Internship
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                    Employer Resources
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                    Success Stories
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="text-sm font-medium">Contact</h3>
              <ul className="space-y-2">
                <li className="text-sm text-muted-foreground">support@internhub.com</li>
                <li className="text-sm text-muted-foreground">1-800-INTERN</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-muted-foreground">© 2023 InternHub. All rights reserved.</p>
            <div className="flex gap-4">
              <Link href="#" className="text-xs text-muted-foreground hover:text-foreground">
                Privacy Policy
              </Link>
              <Link href="#" className="text-xs text-muted-foreground hover:text-foreground">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

