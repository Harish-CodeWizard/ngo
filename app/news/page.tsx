"use client"

import { useState, useEffect } from "react"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowRight, Search, Download } from "lucide-react" // Added missing imports
import { useRouter } from "next/navigation"

const newsData = [
  {
    title: "New School Inaugurated in Kalahandi",
    date: "December 15, 2024",
    excerpt: "A state-of-the-art primary school serving 200+ tribal children opens its doors...",
    image: "/placeholder.svg?height=300&width=400",
    category: "Education",
    type: "News",
    link: "/news/new-school-inaugurated",
  },
  {
    title: "Healthcare Mobile Unit Reaches Remote Villages",
    date: "December 10, 2024",
    excerpt: "Our mobile healthcare unit has successfully completed its first month...",
    image: "/placeholder.svg?height=300&width=400",
    category: "Healthcare",
    type: "News",
    link: "/news/healthcare-mobile-unit",
  },
  {
    title: "Women's Cooperative Wins State Award",
    date: "December 5, 2024",
    excerpt: "The Mayurbhanj Women's Weaving Cooperative supported by Kuviyal Foundation...",
    image: "/placeholder.svg?height=300&width=400",
    category: "Livelihood",
    type: "News",
    link: "/news/womens-cooperative-award",
  },
  {
    title: "Kuviyal Foundation Partners with Global NGO",
    date: "November 28, 2024",
    excerpt: "We are excited to announce our partnership with a leading international organization...",
    image: "/placeholder.svg?height=300&width=400",
    category: "Partnerships",
    type: "Announcement",
    link: "/news/global-ngo-partnership",
  },
  {
    title: "New Documentary Showcases Our Impact",
    date: "November 20, 2024",
    excerpt: "A 30-minute documentary highlighting our work across tribal communities is now available...",
    image: "/placeholder.svg?height=300&width=400",
    category: "General",
    type: "Video",
    link: "/news/documentary-release",
  },
]

const mediaKitItems = [
  {
    title: "Kuviyal Foundation Logo (Vector)",
    fileType: "Vector",
    url: "/media/kuviyal-logo.svg",
  },
  {
    title: "Kuviyal Foundation Brochure (PDF)",
    fileType: "PDF",
    url: "/media/kuviyal-brochure.pdf",
  },
  {
    title: "Kuviyal Foundation Annual Report (PDF)",
    fileType: "PDF",
    url: "/media/kuviyal-annual-report.pdf",
  },
  {
    title: "Kuviyal Foundation Photos (ZIP)",
    fileType: "ZIP",
    url: "/media/kuviyal-photos.zip",
  },
]

export default function NewsPage() {
  const [isVisible, setIsVisible] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("All")
  const [typeFilter, setTypeFilter] = useState("All")
  const router = useRouter()

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const filteredNews = newsData.filter((news) => {
    const searchTermMatch =
      news.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      news.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    const categoryMatch = categoryFilter === "All" || news.category === categoryFilter
    const typeMatch = typeFilter === "All" || news.type === typeFilter
    return searchTermMatch && categoryMatch && typeMatch
  })

  const handleNewsClick = (link: string) => {
    router.push(link)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-yellow-50">
      <Navigation />

      {/* Hero Section */}
      <section className="watercolor-bg pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className={`text-center max-w-4xl mx-auto ${isVisible ? "fade-in" : ""}`}>
            <h1 className="serif-title text-5xl md:text-7xl font-bold text-gray-800 mb-6">News & Updates</h1>
            <p className="sans-body text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
              Stay informed about our latest projects, initiatives, and impact stories from the field.
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
                placeholder="Search news..."
                className="pl-12 pr-4 h-12"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
            </div>

            {/* Filter Controls */}
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
                  <option>Partnerships</option>
                </select>
              </div>

              {/* Type Filter */}
              <div>
                <Label htmlFor="type" className="block text-sm font-medium text-gray-700 sr-only">
                  Filter by Type
                </Label>
                <select
                  id="type"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md h-12"
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                >
                  <option>All</option>
                  <option>News</option>
                  <option>Announcement</option>
                  <option>Video</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* News Grid */}
      <section className="py-20 watercolor-bg">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredNews.map((news, index) => (
              <Card
                key={index}
                className={`watercolor-card border-0 overflow-hidden group cursor-pointer ${isVisible ? "fade-in" : ""}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={news.image || "/placeholder.svg"}
                    alt={news.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
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
        </div>
      </section>

      {/* Media Kit Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="serif-title text-4xl md:text-5xl font-bold text-gray-800 mb-4">Media Kit</h2>
            <p className="sans-body text-xl text-gray-600">Downloadable resources for media and partners</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {mediaKitItems.map((item, index) => (
              <Card key={index} className="watercolor-card border-0">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Download className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="serif-title text-xl font-semibold text-gray-800 mb-3">{item.title}</h3>
                  <p className="sans-body text-sm text-gray-500">{item.fileType}</p>
                  <Button variant="outline" className="mt-4">
                    Download
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
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
