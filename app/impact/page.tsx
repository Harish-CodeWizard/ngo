"use client"

import { ChartContainer } from "@/components/ui/chart"

import { useState, useEffect } from "react"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Heart,
  Users,
  Award,
  Globe,
  Target,
  ArrowRight,
  TrendingUp,
  GraduationCap,
  MapPin,
} from "lucide-react" // Added missing imports
import {
  PieChart,
  Pie as RechartsPie,
  LineChart as RechartsLineChart,
  Line,
  BarChart,
  Bar as RechartsBar,
  Cell as RechartsCell,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

const impactMetrics = [
  { label: "Families Reached", value: "3,000+", icon: Users, color: "from-yellow-400 to-orange-500" },
  { label: "Villages Impacted", value: "150+", icon: MapPin, color: "from-purple-400 to-purple-600" },
  { label: "Active Volunteers", value: "500+", icon: Heart, color: "from-blue-400 to-blue-600" },
  { label: "Projects Completed", value: "75+", icon: Award, color: "from-orange-400 to-red-500" },
]

const programData = [
  { name: "Education", value: 35, color: "#FFD700" },
  { name: "Healthcare", value: 25, color: "#9370DB" },
  { name: "Infrastructure", value: 20, color: "#87CEEB" },
  { name: "Livelihood", value: 20, color: "#FFA500" },
]

const geographicData = [
  { state: "Odisha", value: 40, color: "#FFD700" },
  { state: "Jharkhand", value: 30, color: "#9370DB" },
  { state: "Chhattisgarh", value: 15, color: "#87CEEB" },
  { state: "West Bengal", value: 15, color: "#FFA500" },
]

const growthData = [
  { year: "2019", families: 500 },
  { year: "2020", families: 1200 },
  { year: "2021", families: 1800 },
  { year: "2022", families: 2400 },
  { year: "2023", families: 3000 },
]

const sdgData = [
  { sdg: "SDG 1", value: 25, color: "#FFD700" },
  { sdg: "SDG 4", value: 30, color: "#9370DB" },
  { sdg: "SDG 8", value: 20, color: "#87CEEB" },
  { sdg: "SDG 10", value: 15, color: "#FFA500" },
  { sdg: "SDG 17", value: 10, color: "#FF4500" },
]

const successStories = [
  {
    title: "From Dropout to Doctor",
    name: "Anjali Majhi",
    location: "Kalahandi, Odisha",
    story: "With Kuviyal's scholarship, Anjali became the first doctor from her village, now serving her community.",
    image: "/placeholder.svg?height=300&width=400",
    impact: "Now treats 100+ patients monthly",
  },
  {
    title: "Weaving Dreams into Reality",
    name: "Kamala Women's Cooperative",
    location: "Mayurbhanj, Odisha",
    story: "15 tribal women formed a cooperative, now earning ₹15,000+ monthly through traditional weaving.",
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
]

export default function ImpactPage() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")

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
            <h1 className="serif-title text-5xl md:text-7xl font-bold text-gray-800 mb-6">Our Impact</h1>
            <p className="sans-body text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
              Explore the measurable outcomes and transformative stories that showcase our commitment to empowering
              tribal communities.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
              {impactMetrics.map((metric, index) => (
                <div key={index} className="watercolor-card p-4 rounded-xl text-center">
                  <div
                    className={`w-12 h-12 bg-gradient-to-br ${metric.color} rounded-full flex items-center justify-center mx-auto mb-2`}
                  >
                    <metric.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold serif-title text-gray-800">{metric.value}</div>
                  <div className="text-xs sans-body text-gray-600">{metric.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="max-w-6xl mx-auto">
            <TabsList className="grid w-full grid-cols-5 mb-12">
              <TabsTrigger value="overview" className="flex items-center space-x-2">
                <Globe className="w-4 h-4" />
                <span>Overview</span>
              </TabsTrigger>
              <TabsTrigger value="programs" className="flex items-center space-x-2">
                <GraduationCap className="w-4 h-4" />
                <span>Programs</span>
              </TabsTrigger>
              <TabsTrigger value="geography" className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>Geography</span>
              </TabsTrigger>
              <TabsTrigger value="growth" className="flex items-center space-x-2">
                <TrendingUp className="w-4 h-4" />
                <span>Growth</span>
              </TabsTrigger>
              <TabsTrigger value="sdg" className="flex items-center space-x-2">
                <Target className="w-4 h-4" />
                <span>SDG Goals</span>
              </TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview">
              <div className="space-y-8">
                {/* Impact Metrics */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {impactMetrics.map((metric, index) => (
                    <Card key={index} className="watercolor-card border-0 text-center p-8">
                      <CardContent className="p-0">
                        <div
                          className={`w-16 h-16 bg-gradient-to-br ${metric.color} rounded-full flex items-center justify-center mx-auto mb-4`}
                        >
                          <metric.icon className="w-8 h-8 text-white" />
                        </div>
                        <div className="text-3xl font-bold serif-title text-gray-800 mb-2">{metric.value}</div>
                        <p className="sans-body text-gray-600 font-medium">{metric.label}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Success Stories */}
                <div>
                  <h2 className="serif-title text-3xl font-bold text-gray-800 mb-6">Success Stories</h2>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {successStories.map((story, index) => (
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
                </div>
              </div>
            </TabsContent>

            {/* Programs Tab */}
            <TabsContent value="programs">
              <div className="watercolor-card p-8 rounded-2xl">
                <h3 className="serif-title text-3xl font-semibold text-gray-800 mb-8">Program Impact</h3>
                <div className="h-80">
                  <ChartContainer config={{}} className="w-full h-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <RechartsPie
                          data={programData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={90}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {programData.map((entry, index) => (
                            <RechartsCell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </RechartsPie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
              </div>
            </TabsContent>

            {/* Geography Tab */}
            <TabsContent value="geography">
              <div className="watercolor-card p-8 rounded-2xl">
                <h3 className="serif-title text-3xl font-semibold text-gray-800 mb-8">Geographic Reach</h3>
                <div className="h-80">
                  <ChartContainer config={{}} className="w-full h-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <RechartsPie
                          data={geographicData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={90}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {geographicData.map((entry, index) => (
                            <RechartsCell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </RechartsPie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
              </div>
            </TabsContent>

            {/* Growth Tab */}
            <TabsContent value="growth">
              <div className="watercolor-card p-8 rounded-2xl">
                <h3 className="serif-title text-3xl font-semibold text-gray-800 mb-8">Growth Trajectory</h3>
                <div className="h-80">
                  <ChartContainer config={{}} className="w-full h-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsLineChart data={growthData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <XAxis dataKey="year" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="families" stroke="#FFD700" strokeWidth={2} />
                      </RechartsLineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
              </div>
            </TabsContent>

            {/* SDG Goals Tab */}
            <TabsContent value="sdg">
              <div className="watercolor-card p-8 rounded-2xl">
                <h3 className="serif-title text-3xl font-semibold text-gray-800 mb-8">SDG Goals Alignment</h3>
                <div className="h-80">
                  <ChartContainer config={{}} className="w-full h-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={sdgData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <XAxis dataKey="sdg" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <RechartsBar dataKey="value" fill="#9370DB" />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <Footer />
    </div>
  )
}
