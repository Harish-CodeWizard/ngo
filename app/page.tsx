"use client"

import { useState, useEffect, useRef } from "react"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
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
  Zap,
} from "lucide-react"
import Link from "next/link"

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
  },
  {
    title: "Healthcare Mobile Unit Reaches Remote Villages",
    date: "December 10, 2024",
    excerpt: "Our mobile healthcare unit has successfully completed its first month...",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    title: "Women's Cooperative Wins State Award",
    date: "December 5, 2024",
    excerpt: "The Mayurbhanj Women's Weaving Cooperative supported by Kuviyal Foundation...",
    image: "/placeholder.svg?height=200&width=300",
  },
]

export default function HomePage() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [currentNews, setCurrentNews] = useState(0)
  const urgentRef = useRef<HTMLDivElement>(null)
  const urgentSectionRef = useRef<HTMLElement>(null)
  const [isUrgentVisible, setIsUrgentVisible] = useState(false)

  const familiesReached = useCounter(3000, 3000)
  const villagesImpacted = useCounter(150, 2500)
  const volunteersActive = useCounter(500, 2000)
  const projectsCompleted = useCounter(75, 2800)

  const statsRef = useRef<HTMLDivElement>(null)

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

    const observer = new window.IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    if (statsRef.current) observer.observe(statsRef.current)

    // Urgent section intersection observer
    let urgentObserver: IntersectionObserver | null = null
    if (urgentSectionRef.current) {
      urgentObserver = new window.IntersectionObserver(
        (entries) => {
          setIsUrgentVisible(entries[0].isIntersecting)
        },
        { threshold: 0.3 }
      )
      urgentObserver.observe(urgentSectionRef.current)
    }

    return () => {
      clearInterval(testimonialInterval)
      clearInterval(newsInterval)
      observer.disconnect()
      urgentObserver && urgentObserver.disconnect()
    }
  }, [])

  useEffect(() => {
    // Auto-scroll logic for mobile carousel, only when urgent section is visible
    let interval: NodeJS.Timeout | undefined
    if (isUrgentVisible && urgentRef.current) {
      let index = 0
      interval = setInterval(() => {
        if (!urgentRef.current) return
        const cards = urgentRef.current.querySelectorAll(".urgent-card")
        index = (index + 1) % cards.length
        const card = cards[index] as HTMLElement
        card?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" })
      }, 3500)
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isUrgentVisible])

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-yellow-50">
      <Navigation />

      {/* Hero Section */}
      <section className="watercolor-bg min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className={`${isVisible ? "fade-in" : ""} max-w-5xl mx-auto`}>
            {/* Logo */}
            <div className="mb-8 flex justify-center">
              <div className="w-32 h-32 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-2xl floating pulse-glow">
                <Droplets className="w-16 h-16 text-white" />
              </div>
            </div>

            <h1 className="serif-title text-6xl md:text-8xl font-bold text-gray-800 mb-6 leading-tight">
              Kuviyal Foundation
            </h1>

            <p className="sans-body text-2xl md:text-3xl text-gray-600 mb-6 italic">
              "Voicing the untold stories of the tribes…"
            </p>

            <p className="sans-body text-xl text-gray-700 mb-12 max-w-3xl mx-auto leading-relaxed">
              Empowering tribal communities through education, healthcare, and sustainable development. Together, we
              build bridges between tradition and progress, preserving culture while enabling growth.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
              <Link href="/donate">
                <Button className="glow-button text-white px-10 py-6 text-xl font-semibold rounded-full sans-body">
                  <Heart className="mr-3 h-6 w-6" />
                  Donate Now
                </Button>
              </Link>
              <Link href="/get-involved">
                <Button
                  variant="outline"
                  className="bg-white/80 backdrop-blur-sm border-2 border-purple-300 text-purple-700 px-10 py-6 text-xl font-semibold rounded-full sans-body hover:bg-purple-50"
                >
                  <Users className="mr-3 h-6 w-6" />
                  Volunteer With Us
                </Button>
              </Link>
            </div>

            {/* Quick Stats */}
            {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="watercolor-card p-6 rounded-2xl text-center">
                <div className="text-3xl font-bold serif-title text-yellow-600 mb-2">3K+</div>
                <p className="sans-body text-gray-600 text-sm">Families Reached</p>
              </div>
              <div className="watercolor-card p-6 rounded-2xl text-center">
                <div className="text-3xl font-bold serif-title text-purple-600 mb-2">150+</div>
                <p className="sans-body text-gray-600 text-sm">Villages Impacted</p>
              </div>
              <div className="watercolor-card p-6 rounded-2xl text-center">
                <div className="text-3xl font-bold serif-title text-blue-600 mb-2">500+</div>
                <p className="sans-body text-gray-600 text-sm">Active Volunteers</p>
              </div>
              <div className="watercolor-card p-6 rounded-2xl text-center">
                <div className="text-3xl font-bold serif-title text-orange-600 mb-2">75+</div>
                <p className="sans-body text-gray-600 text-sm">Projects Completed</p>
              </div>
            </div> */}
          </div>
        </div>

        {/* Floating elements */}
        {/* <div className="absolute top-20 left-10 w-20 h-20 bg-yellow-200 rounded-full opacity-30 floating"></div>
        <div
          className="absolute bottom-20 right-10 w-16 h-16 bg-purple-200 rounded-full opacity-30 floating"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-20 w-12 h-12 bg-blue-200 rounded-full opacity-30 floating"
          style={{ animationDelay: "2s" }}
        ></div> */}
      </section>

      {/* Urgent Appeals Section */}
      <section ref={urgentSectionRef} className="py-20 border-t-4">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="serif-title text-4xl md:text-5xl font-bold text-gray-800 mb-4">Urgent Appeals</h2>
            <p className="sans-body text-xl text-gray-600">Communities that need immediate support</p>
          </div>
          <div
            ref={urgentRef}
            className="flex md:grid md:grid-cols-3 gap-4 md:gap-8 overflow-x-auto scrollbar-hide snap-x snap-mandatory"
          >
            {/* Card 1 */}
            <Card className="urgent-card min-w-[85vw] max-w-xs md:min-w-0 md:max-w-none watercolor-card border-0 overflow-hidden h-full flex flex-col snap-center">
              <div className="relative">
                <img
                  src="/placeholder.svg?height=200&width=400"
                  alt="Flood Relief"
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  URGENT
                </div>
              </div>
              <CardContent className="p-6 flex-1 flex flex-col">
                <h3 className="serif-title text-2xl font-semibold text-gray-800 mb-3">Flood Relief - Malkangiri</h3>
                <p className="sans-body text-gray-600 mb-4">
                  Recent floods have displaced 500+ tribal families. They need immediate shelter, food, and medical aid.
                </p>
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span>₹8,50,000 raised</span>
                    <span>₹15,00,000 needed</span>
                  </div>
                  <Progress value={57} className="h-2" />
                </div>
                <div className="mt-auto">
                  <Button className="w-full glow-button text-white">Donate for Relief</Button>
                </div>
              </CardContent>
            </Card>

            {/* Card 2 */}
            <Card className="urgent-card min-w-[85vw] max-w-xs md:min-w-0 md:max-w-none watercolor-card border-0 overflow-hidden h-full flex flex-col snap-center">
              <div className="relative">
                <img
                  src="/placeholder.svg?height=200&width=400"
                  alt="Medical Emergency"
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  CRITICAL
                </div>
              </div>
              <CardContent className="p-6 flex-1 flex flex-col">
                <h3 className="serif-title text-2xl font-semibold text-gray-800 mb-3">Medical Emergency Fund</h3>
                <p className="sans-body text-gray-600 mb-4">
                  Tribal children suffering from malnutrition need immediate medical intervention and nutritional
                  support.
                </p>
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span>₹3,20,000 raised</span>
                    <span>₹8,00,000 needed</span>
                  </div>
                  <Progress value={40} className="h-2" />
                </div>
                <div className="mt-auto">
                  <Button className="w-full glow-button text-white">Save Lives Now</Button>
                </div>
              </CardContent>
            </Card>

            {/* Card 3 */}
            <Card className="urgent-card min-w-[85vw] max-w-xs md:min-w-0 md:max-w-none watercolor-card border-0 overflow-hidden h-full flex flex-col snap-center">
              <div className="relative">
                <img
                  src="/placeholder.svg?height=200&width=400"
                  alt="Education Crisis"
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  URGENT
                </div>
              </div>
              <CardContent className="p-6 flex-1 flex flex-col">
                <h3 className="serif-title text-2xl font-semibold text-gray-800 mb-3">School Reconstruction</h3>
                <p className="sans-body text-gray-600 mb-4">
                  Cyclone damaged the only school in Koraput village. 200+ children have no place to study.
                </p>
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span>₹6,80,000 raised</span>
                    <span>₹12,00,000 needed</span>
                  </div>
                  <Progress value={57} className="h-2" />
                </div>
                <div className="mt-auto">
                  <Button className="w-full glow-button text-white">Rebuild Hope</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section ref={statsRef} className="py-20 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="serif-title text-4xl md:text-5xl font-bold text-gray-800 mb-4">Our Impact in Numbers</h2>
            <p className="sans-body text-xl text-gray-600">Measurable change in tribal communities</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className={`text-center ${isVisible ? "fade-in stagger-1" : ""}`}>
              <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-12 h-12 text-white" />
              </div>
              <div className="text-4xl md:text-5xl font-bold serif-title text-yellow-600 mb-2">
                {familiesReached.toLocaleString()}+
              </div>
              <p className="sans-body text-gray-600 font-medium">Families Reached</p>
            </div>
            <div className={`text-center ${isVisible ? "fade-in stagger-2" : ""}`}>
              <div className="w-24 h-24 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-12 h-12 text-white" />
              </div>
              <div className="text-4xl md:text-5xl font-bold serif-title text-purple-600 mb-2">{villagesImpacted}+</div>
              <p className="sans-body text-gray-600 font-medium">Villages Impacted</p>
            </div>
            <div className={`text-center ${isVisible ? "fade-in stagger-3" : ""}`}>
              <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-12 h-12 text-white" />
              </div>
              <div className="text-4xl md:text-5xl font-bold serif-title text-blue-600 mb-2">{volunteersActive}+</div>
              <p className="sans-body text-gray-600 font-medium">Active Volunteers</p>
            </div>
            <div className={`text-center ${isVisible ? "fade-in stagger-4" : ""}`}>
              <div className="w-24 h-24 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-12 h-12 text-white" />
              </div>
              <div className="text-4xl md:text-5xl font-bold serif-title text-orange-600 mb-2">
                {projectsCompleted}+
              </div>
              <p className="sans-body text-gray-600 font-medium">Projects Completed</p>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-20 watercolor-bg">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="serif-title text-4xl md:text-5xl font-bold text-gray-800 mb-4">Our Programs</h2>
            <p className="sans-body text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive initiatives designed to address the unique needs of tribal communities
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: GraduationCap,
                title: "Education",
                desc: "Quality learning opportunities, scholarships, and skill development for tribal children and youth",
                color: "text-yellow-600",
                bgColor: "from-yellow-400 to-orange-500",
                stats: "2,500+ students supported",
              },
              {
                icon: Heart,
                title: "Healthcare",
                desc: "Mobile clinics, maternal care, nutrition programs, and health awareness campaigns",
                color: "text-purple-600",
                bgColor: "from-purple-400 to-purple-600",
                stats: "15,000+ patients treated",
              },
              {
                icon: Home,
                title: "Infrastructure",
                desc: "Building schools, health centers, community halls, and improving water & sanitation",
                color: "text-blue-600",
                bgColor: "from-blue-400 to-blue-600",
                stats: "50+ facilities built",
              },
              {
                icon: Zap,
                title: "Livelihood",
                desc: "Skill training, microfinance, sustainable farming, and market linkage programs",
                color: "text-orange-600",
                bgColor: "from-orange-400 to-red-500",
                stats: "1,200+ livelihoods created",
              },
            ].map((program, index) => (
              <Card
                key={index}
                className={`watercolor-card border-0 overflow-hidden group cursor-pointer ${isVisible ? "fade-in" : ""}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-8 text-center">
                  <div
                    className={`w-20 h-20 bg-gradient-to-br ${program.bgColor} rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <program.icon className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="serif-title text-2xl font-semibold text-gray-800 mb-4">{program.title}</h3>
                  <p className="sans-body text-gray-600 leading-relaxed mb-4">{program.desc}</p>
                  <div className="text-sm font-semibold text-gray-500 mb-4">{program.stats}</div>
                  <Link href={`/programs#${program.title.toLowerCase()}`}>
                    <Button variant="outline" className="group-hover:bg-yellow-50 group-hover:border-yellow-300">
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories Preview */}
      <section className="py-20 bg-gradient-to-r from-green-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="serif-title text-4xl md:text-5xl font-bold text-gray-800 mb-4">Stories of Transformation</h2>
            <p className="sans-body text-xl text-gray-600">Real impact, real people, real change</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "From Dropout to Doctor",
                name: "Dr. Anjali Majhi",
                location: "Kalahandi, Odisha",
                story:
                  "With Kuviyal's scholarship, Anjali became the first doctor from her village, now serving her community.",
                image: "/placeholder.svg?height=300&width=400",
                impact: "Now treats 100+ patients monthly",
              },
              {
                title: "Weaving Dreams into Reality",
                name: "Kamala Women's Cooperative",
                location: "Mayurbhanj, Odisha",
                story:
                  "15 tribal women formed a cooperative, now earning ₹15,000+ monthly through traditional weaving.",
                image: "/placeholder.svg?height=300&width=400",
                impact: "₹50L+ annual revenue generated",
              },
              {
                title: "Clean Water, Healthy Lives",
                name: "Bonda Village Project",
                location: "Malkangiri, Odisha",
                story: "Installation of water purification system reduced waterborne diseases by 80% in the village.",
                image: "/placeholder.svg?height=300&width=400",
                impact: "500+ villagers benefit daily",
              },
            ].map((story, index) => (
              <Card key={index} className="watercolor-card border-0 overflow-hidden group cursor-pointer">
                <div className="relative overflow-hidden">
                  <img
                    src={story.image || "/placeholder.svg"}
                    alt={story.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <CardContent className="p-6">
                  <h3 className="serif-title text-xl font-semibold text-gray-800 mb-2">{story.title}</h3>
                  <p className="sans-body text-sm text-gray-500 mb-3">
                    {story.name} • {story.location}
                  </p>
                  <p className="sans-body text-gray-600 mb-4 leading-relaxed">{story.story}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-green-600">{story.impact}</span>
                    <Button variant="ghost" size="sm" className="text-yellow-600 hover:text-yellow-700">
                      Read Full Story
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/stories">
              <Button className="glow-button text-white px-8 py-3 text-lg">
                View All Stories
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-r from-orange-50 to-yellow-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="serif-title text-4xl md:text-5xl font-bold text-gray-800 mb-4">Voices of Change</h2>
            <p className="sans-body text-xl text-gray-600">What our community partners say</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl border border-yellow-200">
              <div className="text-center">
                <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-6 border-4 border-yellow-300">
                  <img
                    src={testimonials[currentTestimonial].image || "/placeholder.svg"}
                    alt={testimonials[currentTestimonial].name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex justify-center mb-6">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 text-yellow-500 fill-current" />
                  ))}
                </div>

                <blockquote className="sans-body text-xl md:text-2xl text-gray-700 mb-8 italic leading-relaxed">
                  "{testimonials[currentTestimonial].text}"
                </blockquote>

                <div className="serif-title">
                  <p className="text-xl font-semibold text-gray-800">{testimonials[currentTestimonial].name}</p>
                  <p className="text-lg text-gray-600">{testimonials[currentTestimonial].role}</p>
                </div>
              </div>

              <div className="flex justify-center mt-8 gap-4">
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
                      className={`w-3 h-3 rounded-full transition-colors ${
                        index === currentTestimonial ? "bg-yellow-500" : "bg-gray-300"
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
                    <Button variant="ghost" className="text-yellow-600 hover:text-yellow-700 p-0">
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
      <section className="py-16 sm:py-20 watercolor-bg">
        <div className="container mx-auto px-2 sm:px-4">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="serif-title text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Our Reach & Impact
            </h2>
            <p className="sans-body text-lg sm:text-xl text-gray-600">
              Expanding impact across tribal regions
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-12">
            {/* Row 1 */}
            <div className="flex flex-col lg:flex-row gap-3 sm:gap-6 lg:gap-12 col-span-1 lg:col-span-2">
              <div className="watercolor-card p-4 sm:p-8 rounded-2xl flex-1 min-w-0 mb-4 lg:mb-0">
                <h3 className="serif-title text-2xl sm:text-3xl font-semibold text-gray-800 mb-6 sm:mb-8">
                  Families Reached by State
                </h3>
                <div className="h-48 sm:h-64 md:h-80 w-full overflow-x-auto">
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
              <div className="watercolor-card p-4 sm:p-8 rounded-2xl flex-1 min-w-0">
                <h4 className="serif-title text-xl sm:text-2xl font-semibold text-gray-800 mb-4 sm:mb-6 text-center">
                  Fund Allocation
                </h4>
                <div className="w-32 h-32 sm:w-48 sm:h-48 mx-auto">
                  <ChartContainer config={{}} className="w-full h-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={donationData}
                          cx="50%"
                          cy="50%"
                          innerRadius={40}
                          outerRadius={70}
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
                <div className="grid grid-cols-2 gap-2 sm:gap-4 mt-4 sm:mt-6">
                  {donationData.map((item, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full" style={{ backgroundColor: item.color }}></div>
                      <span className="sans-body text-xs sm:text-sm text-gray-600">
                        {item.name} ({item.value}%)
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* Row 2 */}
            <div className="flex flex-col lg:flex-row gap-3 sm:gap-6 lg:gap-12 col-span-1 lg:col-span-2">
              <div className="watercolor-card p-4 sm:p-8 rounded-2xl flex-1 min-w-0 mb-0 lg:mb-0">
                <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-4">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                  </div>
                  <div>
                    <h4 className="serif-title text-xl sm:text-2xl font-semibold text-gray-800 mb-2 sm:mb-3">
                      Geographic Focus
                    </h4>
                    <p className="sans-body text-gray-600 leading-relaxed text-sm sm:text-base">
                      Our primary focus areas include the tribal belts of Odisha, Jharkhand, Chhattisgarh, and West Bengal, where we work closely with indigenous communities to preserve their culture while enabling progress.
                    </p>
                  </div>
                </div>
              </div>
              <div className="watercolor-card p-4 sm:p-8 rounded-2xl flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-4">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <Users className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                  </div>
                  <div>
                    <h4 className="serif-title text-xl sm:text-2xl font-semibold text-gray-800 mb-2 sm:mb-3">
                      Community Partnership
                    </h4>
                    <p className="sans-body text-gray-600 leading-relaxed text-sm sm:text-base">
                      We believe in working with communities, not for them. Every project begins with extensive consultation and is designed to respect traditional knowledge while introducing sustainable innovations.
                    </p>
                  </div>
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
