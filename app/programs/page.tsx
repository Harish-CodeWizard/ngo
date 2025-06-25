"use client"

import { useState, useEffect } from "react"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { GraduationCap, Heart, Home, Zap, Users, MapPin, Target, ArrowRight, Award, TrendingUp } from "lucide-react"
import Link from "next/link"

const programs = {
  education: {
    icon: GraduationCap,
    title: "Education Programs",
    description: "Comprehensive educational initiatives from early childhood to higher education",
    color: "from-yellow-400 to-orange-500",
    stats: {
      beneficiaries: "2,500+",
      schools: "25",
      scholarships: "500+",
      teachers: "150",
    },
    subPrograms: [
      {
        name: "Primary Education Centers",
        description: "Establishing and running primary schools in remote tribal areas",
        impact: "1,200 children enrolled",
        locations: ["Kalahandi", "Mayurbhanj", "Koraput"],
        status: "Active",
      },
      {
        name: "Scholarship Program",
        description: "Financial support for higher education of tribal students",
        impact: "500+ scholarships awarded",
        locations: ["Odisha", "Jharkhand", "Chhattisgarh"],
        status: "Active",
      },
      {
        name: "Adult Literacy",
        description: "Literacy programs for tribal adults, especially women",
        impact: "800+ adults trained",
        locations: ["West Bengal", "Odisha"],
        status: "Expanding",
      },
      {
        name: "Digital Learning",
        description: "Computer and internet literacy for tribal youth",
        impact: "300+ youth trained",
        locations: ["Bhubaneswar", "Ranchi"],
        status: "New",
      },
    ],
  },
  healthcare: {
    icon: Heart,
    title: "Healthcare Programs",
    description: "Comprehensive healthcare services addressing unique tribal health challenges",
    color: "from-purple-400 to-purple-600",
    stats: {
      patients: "15,000+",
      clinics: "12",
      campaigns: "50+",
      healthWorkers: "80",
    },
    subPrograms: [
      {
        name: "Mobile Health Units",
        description: "Medical vans providing healthcare in remote villages",
        impact: "10,000+ patients treated",
        locations: ["Malkangiri", "Rayagada", "Gajapati"],
        status: "Active",
      },
      {
        name: "Maternal & Child Health",
        description: "Specialized care for mothers and children",
        impact: "2,000+ safe deliveries",
        locations: ["Kandhamal", "Nabarangpur"],
        status: "Active",
      },
      {
        name: "Nutrition Programs",
        description: "Addressing malnutrition in tribal children",
        impact: "1,500+ children supported",
        locations: ["Sundargarh", "Keonjhar"],
        status: "Active",
      },
      {
        name: "Mental Health Support",
        description: "Counseling and mental health awareness programs",
        impact: "500+ individuals counseled",
        locations: ["All operational areas"],
        status: "Expanding",
      },
    ],
  },
  infrastructure: {
    icon: Home,
    title: "Infrastructure Development",
    description: "Building essential infrastructure to improve quality of life",
    color: "from-blue-400 to-blue-600",
    stats: {
      projects: "75+",
      villages: "50",
      facilities: "25",
      beneficiaries: "8,000+",
    },
    subPrograms: [
      {
        name: "School Buildings",
        description: "Construction of permanent school structures",
        impact: "15 schools built",
        locations: ["Kalahandi", "Koraput", "Malkangiri"],
        status: "Active",
      },
      {
        name: "Health Centers",
        description: "Primary health centers in tribal areas",
        impact: "8 health centers established",
        locations: ["Mayurbhanj", "Kandhamal"],
        status: "Active",
      },
      {
        name: "Water & Sanitation",
        description: "Clean water access and sanitation facilities",
        impact: "30 villages covered",
        locations: ["Sundargarh", "Keonjhar"],
        status: "Ongoing",
      },
      {
        name: "Community Centers",
        description: "Multi-purpose community halls for gatherings",
        impact: "12 centers built",
        locations: ["Various districts"],
        status: "Active",
      },
    ],
  },
  livelihood: {
    icon: Zap,
    title: "Livelihood Programs",
    description: "Economic empowerment through skill development and entrepreneurship",
    color: "from-orange-400 to-red-500",
    stats: {
      trained: "1,200+",
      enterprises: "300+",
      income: "₹50L+",
      cooperatives: "25",
    },
    subPrograms: [
      {
        name: "Skill Development",
        description: "Vocational training in various trades",
        impact: "800+ people trained",
        locations: ["Jharkhand", "Chhattisgarh"],
        status: "Active",
      },
      {
        name: "Women's Cooperatives",
        description: "Self-help groups for women entrepreneurs",
        impact: "200+ women involved",
        locations: ["Mayurbhanj", "Kalahandi"],
        status: "Active",
      },
      {
        name: "Sustainable Farming",
        description: "Organic farming and modern techniques",
        impact: "400+ farmers trained",
        locations: ["West Bengal", "Odisha"],
        status: "Expanding",
      },
      {
        name: "Microfinance",
        description: "Small loans for tribal entrepreneurs",
        impact: "₹25L+ disbursed",
        locations: ["All operational areas"],
        status: "Active",
      },
    ],
  },
}

export default function ProgramsPage() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeProgram, setActiveProgram] = useState("education")

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-yellow-50">
      <Navigation />

      {/* Hero Section */}
      <section className="watercolor-bg pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className={`text-center max-w-4xl mx-auto ${isVisible ? "fade-in" : ""}`}>
            <h1 className="serif-title text-5xl md:text-7xl font-bold text-gray-800 mb-6">Our Programs</h1>
            <p className="sans-body text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
              Comprehensive initiatives designed to address the unique needs and challenges of tribal communities across
              education, healthcare, infrastructure, and economic empowerment.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
              {Object.entries(programs).map(([key, program]) => (
                <div key={key} className="watercolor-card p-4 rounded-xl text-center">
                  <div
                    className={`w-12 h-12 bg-gradient-to-br ${program.color} rounded-full flex items-center justify-center mx-auto mb-2`}
                  >
                    <program.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold serif-title text-gray-800">{Object.values(program.stats)[0]}</div>
                  <div className="text-xs sans-body text-gray-600">{program.title.split(" ")[0]}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Programs Overview */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {Object.entries(programs).map(([key, program], index) => (
              <Card
                key={key}
                className={`watercolor-card border-0 group cursor-pointer ${isVisible ? "fade-in" : ""}`}
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => setActiveProgram(key)}
              >
                <CardContent className="p-8 text-center">
                  <div
                    className={`w-20 h-20 bg-gradient-to-br ${program.color} rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <program.icon className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="serif-title text-2xl font-semibold text-gray-800 mb-4">{program.title}</h3>
                  <p className="sans-body text-gray-600 leading-relaxed mb-6">{program.description}</p>

                  <div className="grid grid-cols-2 gap-4 text-center">
                    {Object.entries(program.stats)
                      .slice(0, 2)
                      .map(([statKey, value]) => (
                        <div key={statKey}>
                          <div className="text-lg font-bold text-gray-800">{value}</div>
                          <div className="text-xs text-gray-500 capitalize">{statKey}</div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Program View */}
      <section className="py-20 watercolor-bg">
        <div className="container mx-auto px-4">
          <Tabs value={activeProgram} onValueChange={setActiveProgram} className="max-w-6xl mx-auto">
            <TabsList className="grid w-full grid-cols-4 mb-12">
              {Object.entries(programs).map(([key, program]) => (
                <TabsTrigger key={key} value={key} className="flex items-center space-x-2">
                  <program.icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{program.title.split(" ")[0]}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {Object.entries(programs).map(([key, program]) => (
              <TabsContent key={key} value={key}>
                <div className="space-y-8">
                  {/* Program Header */}
                  <Card className="watercolor-card border-0">
                    <CardContent className="p-8">
                      <div className="flex items-start space-x-6">
                        <div
                          className={`w-24 h-24 bg-gradient-to-br ${program.color} rounded-2xl flex items-center justify-center flex-shrink-0`}
                        >
                          <program.icon className="w-12 h-12 text-white" />
                        </div>
                        <div className="flex-1">
                          <h2 className="serif-title text-4xl font-bold text-gray-800 mb-4">{program.title}</h2>
                          <p className="sans-body text-xl text-gray-600 mb-6 leading-relaxed">{program.description}</p>

                          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {Object.entries(program.stats).map(([statKey, value]) => (
                              <div key={statKey} className="text-center">
                                <div className="text-2xl font-bold serif-title text-gray-800">{value}</div>
                                <div className="text-sm sans-body text-gray-600 capitalize">
                                  {statKey.replace(/([A-Z])/g, " $1").trim()}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Sub-programs */}
                  <div className="grid md:grid-cols-2 gap-8">
                    {program.subPrograms.map((subProgram, index) => (
                      <Card key={index} className="watercolor-card border-0">
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <h3 className="serif-title text-xl font-semibold text-gray-800">{subProgram.name}</h3>
                            <Badge
                              variant={
                                subProgram.status === "Active"
                                  ? "default"
                                  : subProgram.status === "New"
                                    ? "secondary"
                                    : "outline"
                              }
                              className={
                                subProgram.status === "Active"
                                  ? "bg-green-100 text-green-800"
                                  : subProgram.status === "New"
                                    ? "bg-blue-100 text-blue-800"
                                    : "bg-orange-100 text-orange-800"
                              }
                            >
                              {subProgram.status}
                            </Badge>
                          </div>

                          <p className="sans-body text-gray-600 mb-4 leading-relaxed">{subProgram.description}</p>

                          <div className="space-y-3">
                            <div className="flex items-center space-x-2">
                              <TrendingUp className="w-4 h-4 text-green-600" />
                              <span className="sans-body text-sm font-medium text-gray-700">{subProgram.impact}</span>
                            </div>

                            <div className="flex items-start space-x-2">
                              <MapPin className="w-4 h-4 text-blue-600 mt-0.5" />
                              <div className="flex flex-wrap gap-1">
                                {subProgram.locations.map((location, locIndex) => (
                                  <Badge key={locIndex} variant="outline" className="text-xs">
                                    {location}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Success Metrics */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="serif-title text-4xl md:text-5xl font-bold text-gray-800 mb-4">Program Impact</h2>
            <p className="sans-body text-xl text-gray-600">Measurable outcomes across all our initiatives</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="watercolor-card border-0 text-center p-8">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold serif-title text-gray-800 mb-2">25,000+</div>
                <p className="sans-body text-gray-600 font-medium">Direct Beneficiaries</p>
                <p className="sans-body text-sm text-gray-500 mt-2">Across all programs</p>
              </CardContent>
            </Card>

            <Card className="watercolor-card border-0 text-center p-8">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold serif-title text-gray-800 mb-2">85%</div>
                <p className="sans-body text-gray-600 font-medium">Success Rate</p>
                <p className="sans-body text-sm text-gray-500 mt-2">Program completion</p>
              </CardContent>
            </Card>

            <Card className="watercolor-card border-0 text-center p-8">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold serif-title text-gray-800 mb-2">95%</div>
                <p className="sans-body text-gray-600 font-medium">Satisfaction Rate</p>
                <p className="sans-body text-sm text-gray-500 mt-2">Community feedback</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="serif-title text-4xl md:text-5xl font-bold text-white mb-6">Support Our Programs</h2>
            <p className="sans-body text-xl text-white/90 mb-12 leading-relaxed">
              Your contribution can help us expand these life-changing programs to reach more tribal communities. Every
              donation makes a direct impact on someone's life.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/donate">
                <Button
                  size="lg"
                  className="bg-white text-orange-500 hover:bg-white/90 px-12 py-4 text-xl font-semibold rounded-full"
                >
                  <Heart className="mr-2 h-6 w-6" />
                  Donate Now
                </Button>
              </Link>
              <Link href="/get-involved">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10 px-12 py-4 text-xl font-semibold rounded-full"
                >
                  Volunteer With Us
                  <ArrowRight className="ml-2 h-6 w-6" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
