"use client"

import { useState, useEffect } from "react"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, Users, Award, Globe, Target, Eye, Lightbulb, Shield, ArrowRight, Play } from "lucide-react"
import Link from "next/link"

const milestones = [
  {
    year: "2018",
    event: "Foundation established with a vision to empower tribal communities",
    impact: "Started with 5 villages",
  },
  { year: "2019", event: "First education center opened in Kalahandi", impact: "200+ children enrolled" },
  { year: "2020", event: "Healthcare mobile units launched during pandemic", impact: "10,000+ people served" },
  { year: "2021", event: "Women's livelihood program initiated", impact: "500+ women trained" },
  { year: "2022", event: "Infrastructure development projects began", impact: "25+ facilities built" },
  { year: "2023", event: "Digital literacy program launched", impact: "1,000+ people trained" },
  { year: "2024", event: "Expanded to 4 states with 150+ villages", impact: "3,000+ families impacted" },
]

const teamMembers = [
  {
    name: "Dr. Rajesh Kumar",
    role: "Founder & Executive Director",
    bio: "Former IAS officer with 25+ years in tribal development",
    image: "/placeholder.svg?height=300&width=300",
    expertise: "Policy & Strategy",
  },
  {
    name: "Sunita Patel",
    role: "Program Director",
    bio: "Social worker with deep roots in tribal communities",
    image: "/placeholder.svg?height=300&width=300",
    expertise: "Community Engagement",
  },
  {
    name: "Dr. Amit Sharma",
    role: "Healthcare Head",
    bio: "Medical doctor specializing in rural healthcare",
    image: "/placeholder.svg?height=300&width=300",
    expertise: "Healthcare Programs",
  },
  {
    name: "Priya Majhi",
    role: "Education Coordinator",
    bio: "Tribal community member and education advocate",
    image: "/placeholder.svg?height=300&width=300",
    expertise: "Educational Development",
  },
]

const values = [
  {
    icon: Heart,
    title: "Compassion",
    description: "We approach every interaction with empathy and genuine care for tribal communities.",
    color: "from-red-400 to-pink-500",
  },
  {
    icon: Shield,
    title: "Respect",
    description: "We honor tribal traditions, culture, and wisdom while fostering positive change.",
    color: "from-blue-400 to-blue-600",
  },
  {
    icon: Users,
    title: "Collaboration",
    description: "We believe in working together with communities as partners, not beneficiaries.",
    color: "from-green-400 to-green-600",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "We blend traditional knowledge with modern solutions for sustainable development.",
    color: "from-yellow-400 to-orange-500",
  },
  {
    icon: Target,
    title: "Impact",
    description: "We focus on measurable, long-term change that transforms lives and communities.",
    color: "from-purple-400 to-purple-600",
  },
  {
    icon: Globe,
    title: "Sustainability",
    description: "We create programs that communities can own and continue independently.",
    color: "from-teal-400 to-teal-600",
  },
]

export default function AboutPage() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeTimeline, setActiveTimeline] = useState(0)

  useEffect(() => {
    setIsVisible(true)

    // Auto-progress timeline
    const interval = setInterval(() => {
      setActiveTimeline((prev) => (prev + 1) % milestones.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-yellow-50">
      <Navigation />

      {/* Hero Section */}
      <section className="watercolor-bg pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className={`text-center max-w-4xl mx-auto ${isVisible ? "fade-in" : ""}`}>
            <h1 className="serif-title text-5xl md:text-7xl font-bold text-gray-800 mb-6">About Kuviyal Foundation</h1>
            <p className="sans-body text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
              Born from a deep commitment to tribal empowerment, we bridge the gap between tradition and progress,
              ensuring that indigenous communities thrive while preserving their rich cultural heritage.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button className="glow-button text-white px-8 py-4 text-lg rounded-full">
                <Play className="mr-2 h-5 w-5" />
                Watch Our Story
              </Button>
              <Link href="/impact">
                <Button
                  variant="outline"
                  className="border-2 border-purple-300 text-purple-700 px-8 py-4 text-lg rounded-full hover:bg-purple-50"
                >
                  View Impact Report
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Mission */}
            <Card className="watercolor-card border-0 text-center p-8">
              <CardContent className="p-0">
                <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Target className="w-10 h-10 text-white" />
                </div>
                <h3 className="serif-title text-3xl font-bold text-gray-800 mb-4">Our Mission</h3>
                <p className="sans-body text-gray-600 leading-relaxed">
                  To empower tribal communities through sustainable development programs that respect cultural heritage
                  while providing access to education, healthcare, and economic opportunities.
                </p>
              </CardContent>
            </Card>

            {/* Vision */}
            <Card className="watercolor-card border-0 text-center p-8">
              <CardContent className="p-0">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Eye className="w-10 h-10 text-white" />
                </div>
                <h3 className="serif-title text-3xl font-bold text-gray-800 mb-4">Our Vision</h3>
                <p className="sans-body text-gray-600 leading-relaxed">
                  A world where tribal communities are self-reliant, culturally proud, and have equal access to
                  opportunities while maintaining their unique identity and traditional wisdom.
                </p>
              </CardContent>
            </Card>

            {/* Impact */}
            <Card className="watercolor-card border-0 text-center p-8">
              <CardContent className="p-0">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Award className="w-10 h-10 text-white" />
                </div>
                <h3 className="serif-title text-3xl font-bold text-gray-800 mb-4">Our Impact</h3>
                <p className="sans-body text-gray-600 leading-relaxed">
                  Over 6 years, we've reached 3,000+ families across 150+ villages, creating lasting change through
                  education, healthcare, infrastructure, and livelihood programs.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Story Timeline */}
      <section className="py-20 watercolor-bg">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="serif-title text-4xl md:text-5xl font-bold text-gray-800 mb-4">Our Journey</h2>
            <p className="sans-body text-xl text-gray-600">Milestones in our mission to empower tribal communities</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-yellow-400 to-orange-500 rounded-full"></div>

              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className={`relative flex items-center mb-12 ${
                    index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                  } ${isVisible ? "fade-in" : ""}`}
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  {/* Timeline dot */}
                  <div
                    className={`absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full border-4 border-white z-10 transition-all duration-300 ${
                      index === activeTimeline ? "bg-yellow-500 scale-125" : "bg-gray-400"
                    }`}
                  ></div>

                  {/* Content */}
                  <div className={`w-5/12 ${index % 2 === 0 ? "pr-8 text-right" : "pl-8 text-left"}`}>
                    <Card
                      className={`watercolor-card border-0 p-6 transition-all duration-300 ${
                        index === activeTimeline ? "scale-105 shadow-lg" : ""
                      }`}
                    >
                      <CardContent className="p-0">
                        <div className="text-2xl font-bold serif-title text-yellow-600 mb-2">{milestone.year}</div>
                        <h4 className="text-lg font-semibold text-gray-800 mb-2">{milestone.event}</h4>
                        <p className="sans-body text-gray-600 text-sm">{milestone.impact}</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="serif-title text-4xl md:text-5xl font-bold text-gray-800 mb-4">Our Core Values</h2>
            <p className="sans-body text-xl text-gray-600">The principles that guide everything we do</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <Card
                key={index}
                className={`watercolor-card border-0 group cursor-pointer ${isVisible ? "fade-in" : ""}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-8 text-center">
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${value.color} rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}
                    style={{
                      filter: "drop-shadow(0 0 20px rgba(255, 215, 0, 0.3))",
                    }}
                  >
                    <value.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="serif-title text-2xl font-semibold text-gray-800 mb-4">{value.title}</h3>
                  <p className="sans-body text-gray-600 leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-20 watercolor-bg">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="serif-title text-4xl md:text-5xl font-bold text-gray-800 mb-4">Our Leadership</h2>
            <p className="sans-body text-xl text-gray-600">Dedicated leaders driving change in tribal communities</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <Card
                key={index}
                className={`watercolor-card border-0 overflow-hidden group ${isVisible ? "fade-in" : ""}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <CardContent className="p-6 text-center">
                  <h3 className="serif-title text-xl font-semibold text-gray-800 mb-2">{member.name}</h3>
                  <p className="sans-body text-yellow-600 font-medium mb-3">{member.role}</p>
                  <p className="sans-body text-gray-600 text-sm mb-3 leading-relaxed">{member.bio}</p>
                  <div className="text-xs font-semibold text-gray-500 bg-gray-100 px-3 py-1 rounded-full inline-block">
                    {member.expertise}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Recognition & Awards */}
      <section className="py-20 bg-gradient-to-r from-yellow-50 to-orange-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="serif-title text-4xl md:text-5xl font-bold text-gray-800 mb-4">Recognition & Awards</h2>
            <p className="sans-body text-xl text-gray-600">Acknowledgments for our commitment to tribal empowerment</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="watercolor-card border-0 text-center p-8">
              <CardContent className="p-0">
                <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Award className="w-10 h-10 text-white" />
                </div>
                <h3 className="serif-title text-xl font-semibold text-gray-800 mb-3">National NGO Excellence Award</h3>
                <p className="sans-body text-gray-600 mb-2">Ministry of Tribal Affairs, 2023</p>
                <p className="sans-body text-sm text-gray-500">For outstanding contribution to tribal development</p>
              </CardContent>
            </Card>

            <Card className="watercolor-card border-0 text-center p-8">
              <CardContent className="p-0">
                <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Globe className="w-10 h-10 text-white" />
                </div>
                <h3 className="serif-title text-xl font-semibold text-gray-800 mb-3">UN SDG Impact Recognition</h3>
                <p className="sans-body text-gray-600 mb-2">United Nations, 2022</p>
                <p className="sans-body text-sm text-gray-500">For contributions to sustainable development goals</p>
              </CardContent>
            </Card>

            <Card className="watercolor-card border-0 text-center p-8">
              <CardContent className="p-0">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Heart className="w-10 h-10 text-white" />
                </div>
                <h3 className="serif-title text-xl font-semibold text-gray-800 mb-3">Community Choice Award</h3>
                <p className="sans-body text-gray-600 mb-2">Odisha State, 2023</p>
                <p className="sans-body text-sm text-gray-500">Voted by tribal communities we serve</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="serif-title text-4xl md:text-5xl font-bold text-white mb-6">Join Our Mission</h2>
            <p className="sans-body text-xl text-white/90 mb-12 leading-relaxed">
              Whether through donations, volunteering, or spreading awareness, you can be part of the change that
              transforms tribal communities across India. Every action matters, every contribution counts.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/get-involved">
                <Button
                  size="lg"
                  className="bg-white text-purple-600 hover:bg-white/90 px-12 py-4 text-xl font-semibold rounded-full"
                >
                  Get Involved Today
                  <ArrowRight className="ml-2 h-6 w-6" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10 px-12 py-4 text-xl font-semibold rounded-full"
                >
                  Contact Our Team
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
