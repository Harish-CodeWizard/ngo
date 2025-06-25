"use client"

import { useState, useEffect } from "react"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowRight, Search } from "lucide-react" // Added missing imports

const storiesData = [
  {
    title: "Empowering Women Through Weaving",
    category: "Livelihood",
    location: "Mayurbhanj, Odisha",
    impact: "50+ women now earning sustainable income",
    image: "/placeholder.svg?height=300&width=400",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    description:
      "This is a story of how a group of tribal women in Mayurbhanj, Odisha, transformed their lives through traditional weaving. With the support of Kuviyal Foundation, they formed a cooperative, received training, and gained access to markets, enabling them to earn a sustainable income and improve their families' well-being.",
  },
  {
    title: "Education Lights Up Remote Villages",
    category: "Education",
    location: "Kalahandi, Odisha",
    impact: "200+ children now attending school regularly",
    image: "/placeholder.svg?height=300&width=400",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    description:
      "This is a story of how Kuviyal Foundation's education program brought light to remote tribal villages in Kalahandi, Odisha. By establishing community-based learning centers, providing quality teaching materials, and engaging parents, we have been able to enroll 200+ children in school and provide them with a brighter future.",
  },
  {
    title: "Healthcare Reaches the Unreached",
    category: "Healthcare",
    location: "Malkangiri, Odisha",
    impact: "10,000+ people now have access to medical care",
    image: "/placeholder.svg?height=300&width=400",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    description:
      "This is a story of how Kuviyal Foundation's mobile healthcare units are reaching the unreached in Malkangiri, Odisha. By providing medical care, health awareness campaigns, and telemedicine services, we have been able to improve the health and well-being of 10,000+ people in remote tribal villages.",
  },
  {
    title: "Sustainable Farming Transforms Lives",
    category: "Livelihood",
    location: "Koraput, Odisha",
    impact: "400+ farmers now using sustainable farming techniques",
    image: "/placeholder.svg?height=300&width=400",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    description:
      "This is a story of how Kuviyal Foundation's sustainable farming program is transforming lives in Koraput, Odisha. By providing training in organic farming techniques, water conservation, and market linkage, we have been able to help 400+ farmers increase their yields, improve their incomes, and protect the environment.",
  },
]

export default function StoriesPage() {
  const [isVisible, setIsVisible] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("All")
  const [sortBy, setSortBy] = useState("Relevance")

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const filteredStories = storiesData.filter((story) => {
    const searchTermMatch =
      story.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      story.description.toLowerCase().includes(searchTerm.toLowerCase())
    const categoryMatch = categoryFilter === "All" || story.category === categoryFilter
    return searchTermMatch && categoryMatch
  })

  const sortedStories = [...filteredStories].sort((a, b) => {
    if (sortBy === "Relevance") {
      return 0 // No sorting for relevance, just maintain original order
    } else if (sortBy === "Title") {
      return a.title.localeCompare(b.title)
    } else if (sortBy === "Location") {
      return a.location.localeCompare(b.location)
    }
    return 0
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-yellow-50">
      <Navigation />

      {/* Hero Section */}
      <section className="watercolor-bg pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className={`text-center max-w-4xl mx-auto ${isVisible ? "fade-in" : ""}`}>
            <h1 className="serif-title text-5xl md:text-7xl font-bold text-gray-800 mb-6">Success Stories</h1>
            <p className="sans-body text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
              Explore the transformative journeys of tribal communities empowered by Kuviyal Foundation.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <Input
                type="text"
                placeholder="Search stories..."
                className="pl-12 pr-4 h-12"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
            </div>

            {/* Filter and Sort Controls */}
            <div className="flex items-center space-x-4">
              {/* Category Filter */}
              <div>
                <Label htmlFor="category" className="block text-sm font-medium text-gray-700 sr-only">
                  Filter by Category
                </Label>
                <select
                  id="category"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md h-12"
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                >
                  <option>All</option>
                  <option>Education</option>
                  <option>Healthcare</option>
                  <option>Livelihood</option>
                  <option>Infrastructure</option>
                </select>
              </div>

              {/* Sort By */}
              <div>
                <Label htmlFor="sort" className="block text-sm font-medium text-gray-700 sr-only">
                  Sort By
                </Label>
                <select
                  id="sort"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md h-12"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option>Relevance</option>
                  <option>Title</option>
                  <option>Location</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stories Grid */}
      <section className="py-20 watercolor-bg">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedStories.map((story, index) => (
              <Card
                key={index}
                className={`watercolor-card border-0 overflow-hidden group cursor-pointer ${isVisible ? "fade-in" : ""}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
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
                    {story.category} • {story.location}
                  </p>
                  <p className="sans-body text-gray-600 mb-4 leading-relaxed">{story.description}</p>
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
        </div>
      </section>

      <Footer />
    </div>
  )
}
