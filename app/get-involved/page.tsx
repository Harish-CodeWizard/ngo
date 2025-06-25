"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Heart,
  Users,
  MapPin,
  Clock,
  GraduationCap,
  Stethoscope,
  Hammer,
  Briefcase,
  Globe,
  Share2,
  Camera,
  Megaphone,
  ArrowRight,
  CheckCircle,
  Star,
} from "lucide-react"

const volunteerOpportunities = [
  {
    id: "education",
    title: "Education Volunteer",
    icon: GraduationCap,
    description: "Teach children, develop curriculum, or support educational programs",
    commitment: "2-6 months",
    location: "Odisha, Jharkhand",
    skills: ["Teaching", "Curriculum Development", "Child Psychology"],
    color: "from-yellow-400 to-orange-500",
    urgency: "High",
    spots: 15,
  },
  {
    id: "healthcare",
    title: "Healthcare Support",
    icon: Stethoscope,
    description: "Assist medical teams, health awareness campaigns, or data collection",
    commitment: "1-3 months",
    location: "Remote villages",
    skills: ["Medical Background", "Data Entry", "Community Outreach"],
    color: "from-purple-400 to-purple-600",
    urgency: "Critical",
    spots: 8,
  },
  {
    id: "infrastructure",
    title: "Infrastructure Projects",
    icon: Hammer,
    description: "Support construction projects, project management, or technical planning",
    commitment: "3-12 months",
    location: "Various districts",
    skills: ["Engineering", "Project Management", "Construction"],
    color: "from-blue-400 to-blue-600",
    urgency: "Medium",
    spots: 5,
  },
  {
    id: "livelihood",
    title: "Livelihood Training",
    icon: Briefcase,
    description: "Conduct skill development workshops and entrepreneurship training",
    commitment: "1-4 months",
    location: "Community centers",
    skills: ["Vocational Training", "Business Development", "Mentoring"],
    color: "from-orange-400 to-red-500",
    urgency: "Medium",
    spots: 12,
  },
]

const otherWaysToHelp = [
  {
    icon: Share2,
    title: "Spread Awareness",
    description: "Share our mission on social media and with your network",
    action: "Share Now",
    color: "from-blue-400 to-blue-600",
  },
  {
    icon: Camera,
    title: "Document Stories",
    description: "Help us capture and share impact stories through photography/videography",
    action: "Apply",
    color: "from-green-400 to-green-600",
  },
  {
    icon: Globe,
    title: "Corporate Partnership",
    description: "Partner with us through your company's CSR initiatives",
    action: "Connect",
    color: "from-purple-400 to-purple-600",
  },
  {
    icon: Megaphone,
    title: "Advocacy",
    description: "Advocate for tribal rights and sustainable development policies",
    action: "Join Campaign",
    color: "from-red-400 to-red-600",
  },
]

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Education Volunteer",
    duration: "6 months in Kalahandi",
    text: "Working with Kuviyal Foundation was life-changing. The children's eagerness to learn and the community's warmth made every day meaningful.",
    rating: 5,
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    name: "Dr. Amit Patel",
    role: "Healthcare Volunteer",
    duration: "3 months mobile clinic",
    text: "The impact we made in remote villages was incredible. Seeing families receive healthcare for the first time was deeply rewarding.",
    rating: 5,
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    name: "Priya Sharma",
    role: "Livelihood Trainer",
    duration: "4 months skill development",
    text: "Training women in traditional crafts and seeing them become entrepreneurs was the most fulfilling experience of my career.",
    rating: 5,
    image: "/placeholder.svg?height=80&width=80",
  },
]

export default function GetInvolvedPage() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeTab, setActiveTab] = useState("volunteer")
  const [selectedOpportunity, setSelectedOpportunity] = useState("")
  const [volunteerForm, setVolunteerForm] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    location: "",
    profession: "",
    skills: "",
    experience: "",
    availability: "",
    motivation: "",
    references: "",
  })

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const handleVolunteerSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    alert("Thank you for your interest! We'll contact you within 48 hours.")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-yellow-50">
      <Navigation />

      {/* Hero Section */}
      <section className="watercolor-bg pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className={`text-center max-w-4xl mx-auto ${isVisible ? "fade-in" : ""}`}>
            <h1 className="serif-title text-5xl md:text-7xl font-bold text-gray-800 mb-6">Get Involved</h1>
            <p className="sans-body text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
              Join our mission to empower tribal communities. Whether through volunteering, partnerships, or advocacy,
              there are many ways to make a meaningful impact.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
              <div className="watercolor-card p-4 rounded-xl text-center">
                <Users className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                <div className="text-2xl font-bold serif-title text-gray-800">500+</div>
                <div className="text-xs sans-body text-gray-600">Active Volunteers</div>
              </div>
              <div className="watercolor-card p-4 rounded-xl text-center">
                <Heart className="w-8 h-8 mx-auto mb-2 text-red-600" />
                <div className="text-2xl font-bold serif-title text-gray-800">50+</div>
                <div className="text-xs sans-body text-gray-600">Corporate Partners</div>
              </div>
              <div className="watercolor-card p-4 rounded-xl text-center">
                <Globe className="w-8 h-8 mx-auto mb-2 text-green-600" />
                <div className="text-2xl font-bold serif-title text-gray-800">25+</div>
                <div className="text-xs sans-body text-gray-600">Countries</div>
              </div>
              <div className="watercolor-card p-4 rounded-xl text-center">
                <Star className="w-8 h-8 mx-auto mb-2 text-yellow-600" />
                <div className="text-2xl font-bold serif-title text-gray-800">4.9</div>
                <div className="text-xs sans-body text-gray-600">Volunteer Rating</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="max-w-6xl mx-auto">
            <TabsList className="grid w-full grid-cols-4 mb-12">
              <TabsTrigger value="volunteer" className="flex items-center space-x-2">
                <Users className="w-4 h-4" />
                <span>Volunteer</span>
              </TabsTrigger>
              <TabsTrigger value="partner" className="flex items-center space-x-2">
                <Briefcase className="w-4 h-4" />
                <span>Partner</span>
              </TabsTrigger>
              <TabsTrigger value="advocate" className="flex items-center space-x-2">
                <Megaphone className="w-4 h-4" />
                <span>Advocate</span>
              </TabsTrigger>
              <TabsTrigger value="other" className="flex items-center space-x-2">
                <Heart className="w-4 h-4" />
                <span>Other Ways</span>
              </TabsTrigger>
            </TabsList>

            {/* Volunteer Tab */}
            <TabsContent value="volunteer">
              <div className="grid lg:grid-cols-3 gap-12">
                {/* Volunteer Opportunities */}
                <div className="lg:col-span-2 space-y-8">
                  <div>
                    <h2 className="serif-title text-3xl font-bold text-gray-800 mb-6">Volunteer Opportunities</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                      {volunteerOpportunities.map((opportunity) => (
                        <Card
                          key={opportunity.id}
                          className={`watercolor-card border-0 cursor-pointer transition-all ${
                            selectedOpportunity === opportunity.id ? "ring-2 ring-yellow-400 scale-105" : ""
                          }`}
                          onClick={() => setSelectedOpportunity(opportunity.id)}
                        >
                          <CardContent className="p-6">
                            <div className="flex items-start justify-between mb-4">
                              <div
                                className={`w-12 h-12 bg-gradient-to-br ${opportunity.color} rounded-full flex items-center justify-center`}
                              >
                                <opportunity.icon className="w-6 h-6 text-white" />
                              </div>
                              <div className="text-right">
                                <Badge
                                  variant={
                                    opportunity.urgency === "Critical"
                                      ? "destructive"
                                      : opportunity.urgency === "High"
                                        ? "default"
                                        : "secondary"
                                  }
                                  className="mb-2"
                                >
                                  {opportunity.urgency}
                                </Badge>
                                <p className="sans-body text-xs text-gray-500">{opportunity.spots} spots available</p>
                              </div>
                            </div>

                            <h3 className="serif-title text-xl font-semibold text-gray-800 mb-2">
                              {opportunity.title}
                            </h3>
                            <p className="sans-body text-gray-600 mb-4 leading-relaxed">{opportunity.description}</p>

                            <div className="space-y-2 mb-4">
                              <div className="flex items-center space-x-2">
                                <Clock className="w-4 h-4 text-gray-500" />
                                <span className="sans-body text-sm text-gray-600">{opportunity.commitment}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <MapPin className="w-4 h-4 text-gray-500" />
                                <span className="sans-body text-sm text-gray-600">{opportunity.location}</span>
                              </div>
                            </div>

                            <div className="flex flex-wrap gap-1">
                              {opportunity.skills.slice(0, 2).map((skill, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {skill}
                                </Badge>
                              ))}
                              {opportunity.skills.length > 2 && (
                                <Badge variant="outline" className="text-xs">
                                  +{opportunity.skills.length - 2} more
                                </Badge>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>

                  {/* Volunteer Application Form */}
                  {selectedOpportunity && (
                    <Card className="watercolor-card border-0">
                      <CardHeader>
                        <CardTitle className="serif-title text-2xl">Volunteer Application</CardTitle>
                        <p className="sans-body text-gray-600">
                          Apply for: {volunteerOpportunities.find((o) => o.id === selectedOpportunity)?.title}
                        </p>
                      </CardHeader>
                      <CardContent>
                        <form onSubmit={handleVolunteerSubmit} className="space-y-6">
                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="name" className="sans-body font-medium">
                                Full Name *
                              </Label>
                              <Input
                                id="name"
                                value={volunteerForm.name}
                                onChange={(e) => setVolunteerForm({ ...volunteerForm, name: e.target.value })}
                                required
                              />
                            </div>
                            <div>
                              <Label htmlFor="email" className="sans-body font-medium">
                                Email *
                              </Label>
                              <Input
                                id="email"
                                type="email"
                                value={volunteerForm.email}
                                onChange={(e) => setVolunteerForm({ ...volunteerForm, email: e.target.value })}
                                required
                              />
                            </div>
                            <div>
                              <Label htmlFor="phone" className="sans-body font-medium">
                                Phone *
                              </Label>
                              <Input
                                id="phone"
                                value={volunteerForm.phone}
                                onChange={(e) => setVolunteerForm({ ...volunteerForm, phone: e.target.value })}
                                required
                              />
                            </div>
                            <div>
                              <Label htmlFor="age" className="sans-body font-medium">
                                Age
                              </Label>
                              <Input
                                id="age"
                                type="number"
                                value={volunteerForm.age}
                                onChange={(e) => setVolunteerForm({ ...volunteerForm, age: e.target.value })}
                              />
                            </div>
                            <div>
                              <Label htmlFor="location" className="sans-body font-medium">
                                Current Location *
                              </Label>
                              <Input
                                id="location"
                                value={volunteerForm.location}
                                onChange={(e) => setVolunteerForm({ ...volunteerForm, location: e.target.value })}
                                required
                              />
                            </div>
                            <div>
                              <Label htmlFor="profession" className="sans-body font-medium">
                                Profession
                              </Label>
                              <Input
                                id="profession"
                                value={volunteerForm.profession}
                                onChange={(e) => setVolunteerForm({ ...volunteerForm, profession: e.target.value })}
                              />
                            </div>
                          </div>

                          <div>
                            <Label htmlFor="skills" className="sans-body font-medium">
                              Relevant Skills & Experience
                            </Label>
                            <Textarea
                              id="skills"
                              value={volunteerForm.skills}
                              onChange={(e) => setVolunteerForm({ ...volunteerForm, skills: e.target.value })}
                              rows={3}
                              placeholder="Describe your relevant skills, qualifications, and experience..."
                            />
                          </div>

                          <div>
                            <Label htmlFor="availability" className="sans-body font-medium">
                              Availability
                            </Label>
                            <Textarea
                              id="availability"
                              value={volunteerForm.availability}
                              onChange={(e) => setVolunteerForm({ ...volunteerForm, availability: e.target.value })}
                              rows={2}
                              placeholder="When are you available? How many hours per week can you commit?"
                            />
                          </div>

                          <div>
                            <Label htmlFor="motivation" className="sans-body font-medium">
                              Why do you want to volunteer with us?
                            </Label>
                            <Textarea
                              id="motivation"
                              value={volunteerForm.motivation}
                              onChange={(e) => setVolunteerForm({ ...volunteerForm, motivation: e.target.value })}
                              rows={3}
                              placeholder="Share your motivation and what you hope to achieve..."
                            />
                          </div>

                          <div>
                            <Label htmlFor="references" className="sans-body font-medium">
                              References (Optional)
                            </Label>
                            <Textarea
                              id="references"
                              value={volunteerForm.references}
                              onChange={(e) => setVolunteerForm({ ...volunteerForm, references: e.target.value })}
                              rows={2}
                              placeholder="Provide contact details of 1-2 references..."
                            />
                          </div>

                          <Button type="submit" className="glow-button text-white w-full h-12 text-lg">
                            Submit Application
                            <ArrowRight className="ml-2 h-5 w-5" />
                          </Button>
                        </form>
                      </CardContent>
                    </Card>
                  )}
                </div>

                {/* Sidebar */}
                <div className="space-y-8">
                  {/* Volunteer Testimonials */}
                  <Card className="watercolor-card border-0">
                    <CardHeader>
                      <CardTitle className="serif-title text-xl">Volunteer Stories</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {testimonials.map((testimonial, index) => (
                          <div key={index} className="border-b border-gray-200 last:border-b-0 pb-4 last:pb-0">
                            <div className="flex items-start space-x-3 mb-3">
                              <img
                                src={testimonial.image || "/placeholder.svg"}
                                alt={testimonial.name}
                                className="w-12 h-12 rounded-full object-cover"
                              />
                              <div>
                                <h4 className="serif-title font-semibold text-gray-800">{testimonial.name}</h4>
                                <p className="sans-body text-sm text-gray-600">{testimonial.role}</p>
                                <p className="sans-body text-xs text-gray-500">{testimonial.duration}</p>
                              </div>
                            </div>
                            <div className="flex mb-2">
                              {[...Array(testimonial.rating)].map((_, i) => (
                                <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                              ))}
                            </div>
                            <p className="sans-body text-sm text-gray-700 italic">"{testimonial.text}"</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Quick Facts */}
                  <Card className="watercolor-card border-0">
                    <CardHeader>
                      <CardTitle className="serif-title text-xl">Volunteer Benefits</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {[
                          "Accommodation & meals provided",
                          "Local transportation arranged",
                          "Cultural immersion experience",
                          "Certificate of completion",
                          "Professional references",
                          "Lifelong friendships",
                          "Personal growth & skills",
                          "Make real impact",
                        ].map((benefit, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            <span className="sans-body text-sm text-gray-700">{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* Other tabs content would go here */}
            <TabsContent value="partner">
              <div className="text-center py-20">
                <h2 className="serif-title text-3xl font-bold text-gray-800 mb-4">Corporate Partnerships</h2>
                <p className="sans-body text-xl text-gray-600 mb-8">
                  Partner with us through CSR initiatives and make a lasting impact
                </p>
                <Button className="glow-button text-white px-8 py-3">Contact Partnership Team</Button>
              </div>
            </TabsContent>

            <TabsContent value="advocate">
              <div className="text-center py-20">
                <h2 className="serif-title text-3xl font-bold text-gray-800 mb-4">Become an Advocate</h2>
                <p className="sans-body text-xl text-gray-600 mb-8">
                  Help us advocate for tribal rights and policy changes
                </p>
                <Button className="glow-button text-white px-8 py-3">Join Advocacy Campaign</Button>
              </div>
            </TabsContent>

            <TabsContent value="other">
              <div className="grid md:grid-cols-2 gap-8">
                {otherWaysToHelp.map((way, index) => (
                  <Card key={index} className="watercolor-card border-0">
                    <CardContent className="p-8 text-center">
                      <div
                        className={`w-16 h-16 bg-gradient-to-br ${way.color} rounded-full flex items-center justify-center mx-auto mb-6`}
                      >
                        <way.icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="serif-title text-2xl font-semibold text-gray-800 mb-4">{way.title}</h3>
                      <p className="sans-body text-gray-600 mb-6 leading-relaxed">{way.description}</p>
                      <Button className="glow-button text-white">
                        {way.action}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <Footer />
    </div>
  )
}
