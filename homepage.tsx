"use client"

import { useState, useEffect } from "react"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { AnimatedCounter } from "@/components/animated-counter"
import { ParallaxSection } from "@/components/parallax-section"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis } from "recharts"
import {
  Heart,
  Users,
  GraduationCap,
  Home,
  MapPin,
  Star,
  ChevronLeft,
  ChevronRight,
  Droplets,
  ArrowRight,
  Award,
  Globe,
  Play,
  Quote,
  TrendingUp,
  Shield,
  Target,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Badge } from "@/components/ui/badge"

// Animation hook for counters
function useCounter(end: number, duration = 2000) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let startTime: number
    let animationFrame: number

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      setCount(Math.floor(progress * end))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [end, duration])

  return count
}

// Sample data
const donationData = [
  { name: "Education", value: 35, color: "#FFD700" },
  { name: "Healthcare", value: 25, color: "#9370DB" },
  { name: "Infrastructure", value: 20, color: "#87CEEB" },
  { name: "Livelihood", value: 20, color: "#FFA500" },
]

const reachData = [
  { state: "Odisha", families: 1200 },
  { state: "Jharkhand", families: 800 },
  { state: "Chhattisgarh", families: 600 },
  { state: "West Bengal", families: 400 },
]

const testimonials = [
  {
    name: "Sunita Majhi",
    role: "Community Leader, Odisha",
    text: "Kuviyal Foundation has transformed our village. Our children now have access to quality education and our women are empowered with skills.",
    rating: 5,
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    name: "Raman Oraon",
    role: "Farmer, Jharkhand",
    text: "The sustainable farming techniques taught by Kuviyal have doubled our harvest. We are no longer dependent on middlemen.",
    rating: 5,
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    name: "Kamala Kondh",
    role: "Self-Help Group Member",
    text: "Through Kuviyal's microfinance program, I started my own weaving business. Today, I employ 10 other women from my community.",
    rating: 5,
    image: "/placeholder.svg?height=80&width=80",
  },
]

const newsUpdates = [
  {
    title: "New School Inaugurated in Kalahandi",
    date: "December 15, 2024",
    excerpt: "A state-of-the-art primary school serving 200+ tribal children opens its doors...",
    image: "/placeholder.svg?height=200&width=300",
    link: "/news/new-school-inaugurated",
  },
  {
    title: "Healthcare Mobile Unit Reaches Remote Villages",
    date: "December 10, 2024",
    excerpt: "Our mobile healthcare unit has successfully completed its first month...",
    image: "/placeholder.svg?height=200&width=300",
    link: "/news/healthcare-mobile-unit",
  },
  {
    title: "Women's Cooperative Wins State Award",
    date: "December 5, 2024",
    excerpt: "The Mayurbhanj Women's Weaving Cooperative supported by Kuviyal Foundation...",
    image: "/placeholder.svg?height=200&width=300",
    link: "/news/womens-cooperative-award",
  },
]

const heroSlides = [
  {
    image: "/placeholder.svg?height=1080&width=1920",
    video: null,
    title: "Voicing the Untold Stories",
    subtitle: "Empowering tribal communities through sustainable development",
    cta: "Join Our Mission",
    link: "/get-involved",
  },
  {
    image: "/placeholder.svg?height=1080&width=1920",
    video: null,
    title: "Education for Every Child",
    subtitle: "Breaking barriers to quality education in tribal areas",
    cta: "Support Education",
    link: "/programs#education",
  },
  {
    image: "/placeholder.svg?height=1080&width=1920",
    video: null,
    title: "Healthcare Without Boundaries",
    subtitle: "Bringing medical care to the most remote villages",
    cta: "Donate for Health",
    link: "/donate#healthcare",
  },
]

const featuredCauses = [
  {
    id: "education",
    title: "Support Tribal Education",
    description: "Provide quality education to underprivileged tribal children.",
    image: "/placeholder.svg?height=300&width=400",
    raised: 650000,
    target: 1000000,
    supporters: 245,
    urgency: "Critical",
    color: "from-blue-400 to-blue-600",
    icon: GraduationCap,
  },
  {
    id: "healthcare",
    title: "Healthcare for Remote Villages",
    description: "Deliver essential healthcare services to remote tribal villages.",
    image: "/placeholder.svg?height=300&width=400",
    raised: 420000,
    target: 800000,
    supporters: 180,
    urgency: "High",
    color: "from-red-400 to-red-600",
    icon: Home,
  },
  {
    id: "livelihood",
    title: "Empower Women's Livelihood",
    description: "Empower tribal women through sustainable livelihood programs.",
    image: "/placeholder.svg?height=300&width=400",
    raised: 300000,
    target: 600000,
    supporters: 120,
    urgency: "Medium",
    color: "from-green-400 to-green-600",
    icon: Users,
  },
  {
    id: "environment",
    title: "Conserve Tribal Ecosystems",
    description: "Protect and conserve the natural ecosystems of tribal regions.",
    image: "/placeholder.svg?height=300&width=400",
    raised: 200000,
    target: 500000,
    supporters: 95,
    urgency: "Low",
    color: "from-yellow-400 to-yellow-600",
    icon: Globe,
  },
]

export default function HomePage() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [currentNews, setCurrentNews] = useState(0)
  const [currentSlide, setCurrentSlide] = useState(0)
  const router = useRouter()

  const familiesReached = useCounter(3000, 3000)
  const villagesImpacted = useCounter(150, 2500)
  const volunteersActive = useCounter(500, 2000)
  const projectsCompleted = useCounter(75, 2800)

  useEffect(() => {
    setIsVisible(true)

    // Auto-rotate testimonials
    const testimonialInterval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    // Auto-rotate news
    const newsInterval = setInterval(() => {
      setCurrentNews((prev) => (prev + 1) % newsUpdates.length)
    }, 4000)

    return () => {
      clearInterval(testimonialInterval)
      clearInterval(newsInterval)
    }
  }, [])

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const handleNewsClick = (link: string) => {
    router.push(link)
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-yellow-50">
      <Navigation />

      {/* Hero Section with Video/Image Background */}
      <section className="relative h-screen overflow-hidden">
        {/* Background Slider */}
        <div className="absolute inset-0">
          {heroSlides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
            >
              <img src={slide.image || "/placeholder.svg"} alt={slide.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/40"></div>
            </div>
          ))}
        </div>

        {/* Hero Content */}
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="container mx-auto px-4 text-center text-white">
            <div className={`max-w-4xl mx-auto ${isVisible ? "fade-in" : ""}`}>
              {/* Logo */}
              <div className="mb-8 flex justify-center">
                <div className="w-32 h-32 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-2xl floating pulse-glow">
                  <Droplets className="w-16 h-16 text-white" />
                </div>
              </div>

              <h1 className="serif-title text-6xl md:text-8xl font-bold mb-6 leading-tight">
                {heroSlides[currentSlide].title}
              </h1>

              <p className="sans-body text-2xl md:text-3xl mb-8 opacity-90">{heroSlides[currentSlide].subtitle}</p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
                <Link href={heroSlides[currentSlide].link || "/donate"}>
                  <Button className="glow-button text-white px-12 py-6 text-xl font-semibold rounded-full sans-body">
                    <Heart className="mr-3 h-6 w-6" />
                    {heroSlides[currentSlide].cta}
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  className="bg-white/20 backdrop-blur-sm border-2 border-white/50 text-white px-12 py-6 text-xl font-semibold rounded-full sans-body hover:bg-white/30"
                >
                  <Play className="mr-3 h-6 w-6" />
                  Watch Our Story
                </Button>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                <div className="bg-white/20 backdrop-blur-sm p-6 rounded-2xl">
                  <AnimatedCounter end={3000} suffix="+" className="text-3xl font-bold serif-title mb-2" />
                  <p className="sans-body text-sm opacity-90">Families Reached</p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm p-6 rounded-2xl">
                  <AnimatedCounter end={150} suffix="+" className="text-3xl font-bold serif-title mb-2" />
                  <p className="sans-body text-sm opacity-90">Villages Impacted</p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm p-6 rounded-2xl">
                  <AnimatedCounter end={500} suffix="+" className="text-3xl font-bold serif-title mb-2" />
                  <p className="sans-body text-sm opacity-90">Active Volunteers</p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm p-6 rounded-2xl">
                  <AnimatedCounter end={75} suffix="+" className="text-3xl font-bold serif-title mb-2" />
                  <p className="sans-body text-sm opacity-90">Projects Completed</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 backdrop-blur-sm p-3 rounded-full hover:bg-white/30 transition-all"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 backdrop-blur-sm p-3 rounded-full hover:bg-white/30 transition-all"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide ? "bg-white scale-125" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </section>

      {/* Core Mission Statement */}
      <ParallaxSection speed={0.3}>
        <section className="py-20 bg-gradient-to-r from-blue-50 to-purple-50">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-4xl mx-auto">
              <Quote className="w-16 h-16 text-yellow-500 mx-auto mb-8" />
              <h2 className="serif-title text-4xl md:text-6xl font-bold text-gray-800 mb-8 leading-tight">
                "Voicing the untold stories of the tribes…"
              </h2>
              <p className="sans-body text-xl md:text-2xl text-gray-600 leading-relaxed">
                We believe every tribal community has a story worth telling, a culture worth preserving, and a future
                worth building. Through sustainable development, education, healthcare, and economic empowerment, we
                bridge the gap between tradition and progress.
              </p>
            </div>
          </div>
        </section>
      </ParallaxSection>

      {/* Impact Statistics */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="serif-title text-4xl md:text-5xl font-bold text-gray-800 mb-4">Our Impact in Numbers</h2>
            <p className="sans-body text-xl text-gray-600">Measurable change across tribal communities</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className={`text-center ${isVisible ? "fade-in stagger-1" : ""}`}>
              <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Users className="w-12 h-12 text-white" />
              </div>
              <AnimatedCounter
                end={3000}
                suffix="+"
                className="text-4xl md:text-5xl font-bold serif-title text-yellow-600 mb-2"
              />
              <p className="sans-body text-gray-600 font-medium">Families Reached</p>
              <p className="sans-body text-sm text-gray-500 mt-1">Across 4 states</p>
            </div>

            <div className="text-center group">
              <div className="w-24 h-24 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <MapPin className="w-12 h-12 text-white" />
              </div>
              <AnimatedCounter
                end={150}
                suffix="+"
                className="text-4xl md:text-5xl font-bold serif-title text-purple-600 mb-2"
              />
              <p className="sans-body text-gray-600 font-medium">Villages Impacted</p>
              <p className="sans-body text-sm text-gray-500 mt-1">Remote tribal areas</p>
            </div>

            <div className="text-center group">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Heart className="w-12 h-12 text-white" />
              </div>
              <AnimatedCounter
                end={500}
                suffix="+"
                className="text-4xl md:text-5xl font-bold serif-title text-blue-600 mb-2"
              />
              <p className="sans-body text-gray-600 font-medium">Active Volunteers</p>
              <p className="sans-body text-sm text-gray-500 mt-1">Dedicated changemakers</p>
            </div>

            <div className="text-center group">
              <div className="w-24 h-24 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Award className="w-12 h-12 text-white" />
              </div>
              <AnimatedCounter
                end={75}
                suffix="+"
                className="text-4xl md:text-5xl font-bold serif-title text-orange-600 mb-2"
              />
              <p className="sans-body text-gray-600 font-medium">Projects Completed</p>
              <p className="sans-body text-sm text-gray-500 mt-1">Sustainable impact</p>
            </div>
          </div>

          {/* Additional Stats Row */}
          <div className="grid md:grid-cols-3 gap-8 mt-16 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                <TrendingUp className="w-8 h-8 text-green-600 mr-2" />
                <AnimatedCounter end={95} suffix="%" className="text-3xl font-bold serif-title text-green-600" />
              </div>
              <p className="sans-body text-gray-600 font-medium">Program Success Rate</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                <Shield className="w-8 h-8 text-blue-600 mr-2" />
                <AnimatedCounter
                  end={50}
                  prefix="₹"
                  suffix="L+"
                  className="text-3xl font-bold serif-title text-blue-600"
                />
              </div>
              <p className="sans-body text-gray-600 font-medium">Funds Raised</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                <Target className="w-8 h-8 text-purple-600 mr-2" />
                <AnimatedCounter end={98} suffix="%" className="text-3xl font-bold serif-title text-purple-600" />
              </div>
              <p className="sans-body text-gray-600 font-medium">Community Satisfaction</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Causes */}
      <ParallaxSection speed={0.2}>
        <section className="py-20 watercolor-bg">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="serif-title text-4xl md:text-5xl font-bold text-gray-800 mb-4">Featured Causes</h2>
              <p className="sans-body text-xl text-gray-600 max-w-2xl mx-auto">
                Support our ongoing initiatives that are creating lasting change in tribal communities
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredCauses.map((cause, index) => (
                <Card
                  key={cause.id}
                  className={`watercolor-card border-0 overflow-hidden group cursor-pointer ${isVisible ? "fade-in" : ""}`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={cause.image || "/placeholder.svg"}
                      alt={cause.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    <div className="absolute top-4 left-4">
                      <Badge
                        variant={
                          cause.urgency === "Critical"
                            ? "destructive"
                            : cause.urgency === "High"
                              ? "default"
                              : "secondary"
                        }
                      >
                        {cause.urgency}
                      </Badge>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <div
                        className={`w-12 h-12 bg-gradient-to-br ${cause.color} rounded-full flex items-center justify-center mb-3`}
                      >
                        <cause.icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <h3 className="serif-title text-xl font-semibold text-gray-800 mb-3 group-hover:text-yellow-600 transition-colors">
                      {cause.title}
                    </h3>
                    <p className="sans-body text-gray-600 text-sm mb-4 leading-relaxed">{cause.description}</p>

                    {/* Progress */}
                    <div className="space-y-3 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">₹{(cause.raised / 100000).toFixed(1)}L raised</span>
                        <span className="text-gray-500">₹{(cause.target / 100000).toFixed(1)}L goal</span>
                      </div>
                      <Progress value={(cause.raised / cause.target) * 100} className="h-2" />
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{cause.supporters} supporters</span>
                        <span>{Math.round((cause.raised / cause.target) * 100)}% funded</span>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Link href={`/donate?cause=${cause.id}`} className="flex-1">
                        <Button className="w-full glow-button text-white text-sm">Donate Now</Button>
                      </Link>
                      <Link href={`/causes/${cause.id}`}>
                        <Button variant="outline" size="sm" className="px-3">
                          <ArrowRight className="w-4 h-4" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link href="/causes">
                <Button className="glow-button text-white px-8 py-3 text-lg">
                  View All Causes
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </ParallaxSection>

      {/* Testimonials Carousel */}
      <section className="py-20 bg-gradient-to-r from-orange-50 to-yellow-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="serif-title text-4xl md:text-5xl font-bold text-gray-800 mb-4">Voices of Change</h2>
            <p className="sans-body text-xl text-gray-600">Stories from the communities we serve</p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="relative">
              {/* Testimonial Cards */}
              <div className="overflow-hidden">
                <div
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}
                >
                  {testimonials.map((testimonial, index) => (
                    <div key={index} className="w-full flex-shrink-0 px-4">
                      <Card className="watercolor-card border-0 max-w-4xl mx-auto">
                        <CardContent className="p-8 md:p-12">
                          <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
                            <div className="flex-shrink-0">
                              <img
                                src={testimonial.image || "/placeholder.svg"}
                                alt={testimonial.name}
                                className="w-24 h-24 rounded-full object-cover border-4 border-yellow-300"
                              />
                            </div>
                            <div className="flex-1 text-center md:text-left">
                              <div className="flex justify-center md:justify-start mb-4">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                  <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                                ))}
                              </div>
                              <blockquote className="sans-body text-lg md:text-xl text-gray-700 mb-6 italic leading-relaxed">
                                "{testimonial.text}"
                              </blockquote>
                              <div className="serif-title">
                                <p className="text-xl font-semibold text-gray-800">{testimonial.name}</p>
                                <p className="text-lg text-gray-600">{testimonial.role}</p>
                                <p className="text-sm text-gray-500">{testimonial.location}</p>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation */}
              <div className="flex justify-center mt-8 space-x-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={prevTestimonial}
                  className="rounded-full bg-white/80 border-yellow-300 hover:bg-yellow-50"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>

                <div className="flex space-x-2 items-center">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentTestimonial(index)}
                      className={`w-3 h-3 rounded-full transition-all ${
                        index === currentTestimonial ? "bg-yellow-500 scale-125" : "bg-gray-300"
                      }`}
                    />
                  ))}
                </div>

                <Button
                  variant="outline"
                  size="icon"
                  onClick={nextTestimonial}
                  className="rounded-full bg-white/80 border-yellow-300 hover:bg-yellow-50"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* News & Updates */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="serif-title text-4xl md:text-5xl font-bold text-gray-800 mb-4">Latest Updates</h2>
            <p className="sans-body text-xl text-gray-600">Stay informed about our recent activities</p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              {newsUpdates.map((news, index) => (
                <Card
                  key={index}
                  className={`watercolor-card border-0 overflow-hidden group cursor-pointer transition-all duration-300 ${
                    index === currentNews ? "ring-2 ring-yellow-400 scale-105" : ""
                  }`}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={news.image || "/placeholder.svg"}
                      alt={news.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-gray-600">
                      {news.date}
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="serif-title text-xl font-semibold text-gray-800 mb-3 group-hover:text-yellow-600 transition-colors">
                      {news.title}
                    </h3>
                    <p className="sans-body text-gray-600 mb-4 leading-relaxed">{news.excerpt}</p>
                    <Button
                      variant="ghost"
                      className="text-yellow-600 hover:text-yellow-700 p-0"
                      onClick={() => handleNewsClick(news.link || "/news")}
                    >
                      Read More
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link href="/news">
                <Button variant="outline" className="border-yellow-300 text-yellow-600 hover:bg-yellow-50 px-8 py-3">
                  View All News
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Visualization */}
      <section className="py-20 watercolor-bg">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="serif-title text-4xl md:text-5xl font-bold text-gray-800 mb-4">Our Reach & Impact</h2>
            <p className="sans-body text-xl text-gray-600">Expanding impact across tribal regions</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="watercolor-card p-8 rounded-2xl">
              <h3 className="serif-title text-3xl font-semibold text-gray-800 mb-8">Families Reached by State</h3>
              <div className="h-80">
                <ChartContainer config={{}} className="w-full h-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={reachData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <XAxis dataKey="state" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="families" fill="#FFD700" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </div>

            <div className="space-y-8">
              <div className="watercolor-card p-8 rounded-2xl">
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h4 className="serif-title text-2xl font-semibold text-gray-800 mb-3">Geographic Focus</h4>
                    <p className="sans-body text-gray-600 leading-relaxed">
                      Our primary focus areas include the tribal belts of Odisha, Jharkhand, Chhattisgarh, and West
                      Bengal, where we work closely with indigenous communities to preserve their culture while enabling
                      progress.
                    </p>
                  </div>
                </div>
              </div>

              <div className="watercolor-card p-8 rounded-2xl">
                <h4 className="serif-title text-2xl font-semibold text-gray-800 mb-6 text-center">Fund Allocation</h4>
                <div className="w-48 h-48 mx-auto">
                  <ChartContainer config={{}} className="w-full h-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={donationData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={90}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {donationData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <ChartTooltip content={<ChartTooltipContent />} />
                      </PieChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-6">
                  {donationData.map((item, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-4 h-4 rounded-full" style={{ backgroundColor: item.color }}></div>
                      <span className="sans-body text-sm text-gray-600">
                        {item.name} ({item.value}%)
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="serif-title text-4xl md:text-6xl font-bold text-white mb-6">Be Part of the Change</h2>
            <p className="sans-body text-xl md:text-2xl text-white/90 mb-12 leading-relaxed">
              Every contribution, every volunteer hour, every shared story brings us closer to a world where tribal
              communities thrive with dignity and opportunity.
            </p>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-8 text-white">
                <Heart className="w-12 h-12 mx-auto mb-4" />
                <h3 className="serif-title text-2xl font-semibold mb-3">Donate</h3>
                <p className="sans-body mb-4">Your contribution directly impacts lives</p>
                <Link href="/donate">
                  <Button className="bg-white text-orange-500 hover:bg-white/90">Start Giving</Button>
                </Link>
              </div>

              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-8 text-white">
                <Users className="w-12 h-12 mx-auto mb-4" />
                <h3 className="serif-title text-2xl font-semibold mb-3">Volunteer</h3>
                <p className="sans-body mb-4">Share your skills and time with communities</p>
                <Link href="/get-involved">
                  <Button className="bg-white text-orange-500 hover:bg-white/90">Join Us</Button>
                </Link>
              </div>

              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-8 text-white">
                <Globe className="w-12 h-12 mx-auto mb-4" />
                <h3 className="serif-title text-2xl font-semibold mb-3">Spread Awareness</h3>
                <p className="sans-body mb-4">Help amplify tribal voices and stories</p>
                <Button className="bg-white text-orange-500 hover:bg-white/90">Share Stories</Button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/donate">
                <Button
                  size="lg"
                  className="bg-white text-orange-500 hover:bg-white/90 px-12 py-4 text-xl font-semibold rounded-full"
                >
                  <Heart className="mr-3 h-6 w-6" />
                  Donate Now
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10 px-12 py-4 text-xl font-semibold rounded-full"
                >
                  Get in Touch
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
