import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Clock, Globe, MapPin, Users } from "lucide-react"
import Link from "next/link"

export default function InternshipDetails() {
  // This would typically fetch data based on the internship ID
  const internship = {
    id: 1,
    title: "Software Engineering Intern",
    company: "TechCorp",
    location: "San Francisco, CA",
    type: "Full-time",
    duration: "3 months",
    posted: "2 days ago",
    deadline: "Apr 15, 2023",
    logo: "/placeholder.svg?height=80&width=80",
    featured: true,
    companySize: "1000+ employees",
    companyWebsite: "techcorp.com",
    salary: "$25-30/hour",
    description: `
      <p>TechCorp is seeking a talented and motivated Software Engineering Intern to join our engineering team for the summer. This is an excellent opportunity to gain hands-on experience in a fast-paced tech environment.</p>
      
      <p>As a Software Engineering Intern, you will work alongside our experienced engineers to develop and maintain our core products. You'll participate in the full software development lifecycle, from design and implementation to testing and deployment.</p>
    `,
    responsibilities: [
      "Assist in developing and maintaining web applications",
      "Write clean, efficient, and well-documented code",
      "Collaborate with cross-functional teams to define, design, and ship new features",
      "Participate in code reviews and contribute to engineering best practices",
      "Debug production issues and implement fixes",
    ],
    requirements: [
      "Currently pursuing a degree in Computer Science, Software Engineering, or a related field",
      "Strong understanding of data structures, algorithms, and software design",
      "Proficiency in at least one programming language (e.g., JavaScript, Python, Java)",
      "Familiarity with web technologies (HTML, CSS, JavaScript)",
      "Excellent problem-solving and analytical skills",
      "Good communication and teamwork abilities",
    ],
    benefits: [
      "Competitive hourly pay",
      "Flexible work schedule",
      "Mentorship from experienced engineers",
      "Networking opportunities",
      "Possibility of full-time employment after graduation",
    ],
  }

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12 max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-2/3 space-y-6">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-muted-foreground hover:text-foreground">
              Home
            </Link>
            <span className="text-muted-foreground">/</span>
            <Link href="#" className="text-muted-foreground hover:text-foreground">
              Internships
            </Link>
            <span className="text-muted-foreground">/</span>
            <span className="font-medium truncate">{internship.title}</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <div className="h-16 w-16 rounded-md overflow-hidden bg-muted flex items-center justify-center">
              <img
                src={internship.logo || "/placeholder.svg"}
                alt={`${internship.company} logo`}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="space-y-1">
              <h1 className="text-2xl font-bold">{internship.title}</h1>
              <p className="text-muted-foreground">{internship.company}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Badge variant="outline" className="flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" />
              {internship.location}
            </Badge>
            <Badge variant="outline" className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {internship.duration}
            </Badge>
            <Badge
              variant={internship.type === "Full-time" ? "default" : "outline"}
              className="flex items-center gap-1"
            >
              {internship.type}
            </Badge>
            <Badge variant="outline" className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              Apply by {internship.deadline}
            </Badge>
          </div>

          <Tabs defaultValue="description">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="company">Company</TabsTrigger>
              <TabsTrigger value="application">Application</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="space-y-6 pt-4">
              <div className="space-y-4">
                <div dangerouslySetInnerHTML={{ __html: internship.description }} className="text-sm leading-relaxed" />

                <div className="space-y-2">
                  <h3 className="font-medium">Responsibilities:</h3>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    {internship.responsibilities.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium">Requirements:</h3>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    {internship.requirements.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium">Benefits:</h3>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    {internship.benefits.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="company" className="space-y-4 pt-4">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded-md overflow-hidden bg-muted flex items-center justify-center">
                    <img
                      src={internship.logo || "/placeholder.svg"}
                      alt={`${internship.company} logo`}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">{internship.company}</h3>
                    <p className="text-sm text-muted-foreground">Technology</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>{internship.companySize}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-muted-foreground" />
                    <a
                      href={`https://${internship.companyWebsite}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      {internship.companyWebsite}
                    </a>
                  </div>
                </div>

                <div className="text-sm space-y-2">
                  <p>
                    TechCorp is a leading technology company specializing in cloud-based solutions for businesses of all
                    sizes. Founded in 2010, we've grown to become one of the most innovative companies in the industry.
                  </p>
                  <p>
                    Our mission is to empower businesses with cutting-edge technology that simplifies complex processes
                    and drives growth. We're committed to creating a diverse and inclusive workplace where everyone can
                    thrive.
                  </p>
                </div>

                <div className="pt-2">
                  <Button variant="outline" size="sm">
                    View Company Profile
                  </Button>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="application" className="space-y-4 pt-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <h3 className="font-medium">Application Process:</h3>
                  <ol className="list-decimal pl-5 space-y-2 text-sm">
                    <li>Submit your resume and cover letter through our online portal</li>
                    <li>Complete a brief coding assessment (approximately 1 hour)</li>
                    <li>Participate in a technical interview with our engineering team</li>
                    <li>Final interview with the hiring manager</li>
                  </ol>
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium">Required Documents:</h3>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Resume/CV</li>
                    <li>Cover letter</li>
                    <li>Academic transcript (unofficial is acceptable)</li>
                    <li>Portfolio or samples of your work (if applicable)</li>
                  </ul>
                </div>

                <div className="bg-muted p-4 rounded-md text-sm">
                  <p className="font-medium">Important Dates:</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                    <div>
                      <span className="text-muted-foreground">Application Deadline:</span> {internship.deadline}
                    </div>
                    <div>
                      <span className="text-muted-foreground">Expected Start Date:</span> June 1, 2023
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="md:w-1/3 space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Apply Now</CardTitle>
              <CardDescription>Complete your application for this internship</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Salary:</span>
                  <span className="font-medium">{internship.salary}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Posted:</span>
                  <span>{internship.posted}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Deadline:</span>
                  <span className="font-medium">{internship.deadline}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Applications:</span>
                  <span>45+</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-2">
              <Button className="w-full">Apply Now</Button>
              <Button variant="outline" className="w-full">
                Save Internship
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Similar Internships</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex gap-3">
                  <div className="h-10 w-10 rounded-md overflow-hidden bg-muted flex items-center justify-center shrink-0">
                    <img
                      src="/placeholder.svg?height=40&width=40"
                      alt="Company logo"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-medium text-sm">Frontend Developer Intern</h4>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>WebTech Inc.</span>
                      <span>•</span>
                      <span>Remote</span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Button variant="link" className="w-full">
                View All Similar Positions
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

