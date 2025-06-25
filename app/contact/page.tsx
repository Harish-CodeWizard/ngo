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
import { Mail, Phone, MapPin, MessageCircleQuestionIcon as QuestionMarkCircle, ArrowRight } from "lucide-react" // Added missing imports
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

const faqs = [
  {
    question: "What is Kuviyal Foundation's mission?",
    answer:
      "Kuviyal Foundation's mission is to empower tribal communities through sustainable development programs that respect cultural heritage while providing access to education, healthcare, and economic opportunities.",
    category: "General",
  },
  {
    question: "How can I donate to Kuviyal Foundation?",
    answer:
      "You can donate to Kuviyal Foundation through our website's secure donation page. We accept credit cards, debit cards, UPI, and net banking.",
    category: "Donations",
  },
  {
    question: "What programs does Kuviyal Foundation offer?",
    answer:
      "Kuviyal Foundation offers programs in education, healthcare, livelihood, and infrastructure development. Each program is designed to address the specific needs of tribal communities.",
    category: "General",
  },
  {
    question: "How can I volunteer with Kuviyal Foundation?",
    answer:
      "You can volunteer with Kuviyal Foundation by filling out the volunteer application form on our website. We offer a variety of volunteer opportunities to match your skills and interests.",
    category: "Volunteering",
  },
  {
    question: "Does Kuviyal Foundation provide tax exemption for donations?",
    answer:
      "Yes, Kuviyal Foundation is registered under Section 80G of the Income Tax Act, and all donations are eligible for tax exemption.",
    category: "Donations",
  },
  {
    question: "How can my company partner with Kuviyal Foundation?",
    answer:
      "Your company can partner with Kuviyal Foundation through CSR initiatives, employee engagement programs, and financial contributions. Contact our partnership team to discuss potential collaborations.",
    category: "Partnerships",
  },
]

export default function ContactPage() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeFaqCategory, setActiveFaqCategory] = useState("General")
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission logic here
    alert("Thank you for your message! We'll contact you within 48 hours.")
  }

  const filteredFaqs = faqs.filter((faq) => activeFaqCategory === "All" || faq.category === activeFaqCategory)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-yellow-50">
      <Navigation />

      {/* Hero Section */}
      <section className="watercolor-bg pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className={`text-center max-w-4xl mx-auto ${isVisible ? "fade-in" : ""}`}>
            <h1 className="serif-title text-5xl md:text-7xl font-bold text-gray-800 mb-6">Contact Us</h1>
            <p className="sans-body text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
              Get in touch with us to learn more about our work, support our mission, or explore partnership
              opportunities.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form and Information */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="watercolor-card border-0">
              <CardHeader>
                <CardTitle className="serif-title text-2xl">Send us a Message</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleContactSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="name" className="sans-body font-medium">
                      Full Name *
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter your name"
                      className="h-12"
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
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
                      placeholder="Enter your email"
                      className="h-12"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="sans-body font-medium">
                      Phone
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="Enter your phone number"
                      className="h-12"
                      value={contactForm.phone}
                      onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="subject" className="sans-body font-medium">
                      Subject
                    </Label>
                    <Input
                      id="subject"
                      type="text"
                      placeholder="Enter the subject"
                      className="h-12"
                      value={contactForm.subject}
                      onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="message" className="sans-body font-medium">
                      Message *
                    </Label>
                    <Textarea
                      id="message"
                      placeholder="Enter your message"
                      rows={4}
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      required
                    />
                  </div>
                  <Button type="submit" className="glow-button text-white w-full h-14 text-lg">
                    Send Message
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-8">
              <Card className="watercolor-card border-0">
                <CardHeader>
                  <CardTitle className="serif-title text-2xl">Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-gray-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="serif-title text-xl font-semibold text-gray-800">Headquarters</h4>
                      <address className="sans-body text-gray-600">
                        Kuviyal Foundation
                        <br />
                        Plot No. 123, Saheed Nagar
                        <br />
                        Bhubaneswar, Odisha 751007
                      </address>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-gray-600" />
                    <span className="sans-body text-gray-600">+91 98765 43210</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-gray-600" />
                    <span className="sans-body text-gray-600">info@kuviyalfoundation.org</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="watercolor-card border-0">
                <CardHeader>
                  <CardTitle className="serif-title text-2xl">Emergency Contact</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Phone className="w-5 h-5 text-red-600" />
                    <div>
                      <h4 className="serif-title text-xl font-semibold text-gray-800">24/7 Helpline</h4>
                      <span className="sans-body text-red-600">+91 99999 88888</span>
                    </div>
                  </div>
                  <p className="sans-body text-gray-600">
                    For immediate assistance during natural disasters or other emergencies.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 watercolor-bg">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="serif-title text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="sans-body text-xl text-gray-600">Find answers to common questions about our organization</p>
          </div>

          <div className="max-w-4xl mx-auto">
            {/* FAQ Tabs */}
            <Tabs value={activeFaqCategory} onValueChange={setActiveFaqCategory} className="mb-8">
              <TabsList className="grid grid-cols-3 md:grid-cols-auto gap-4">
                <TabsTrigger value="General">General</TabsTrigger>
                <TabsTrigger value="Donations">Donations</TabsTrigger>
                <TabsTrigger value="Volunteering">Volunteering</TabsTrigger>
                <TabsTrigger value="Partnerships">Partnerships</TabsTrigger>
              </TabsList>

              {/* FAQ Content */}
              <div className="space-y-4">
                {filteredFaqs.map((faq, index) => (
                  <Card key={index} className="watercolor-card border-0">
                    <CardContent className="p-6">
                      <h3 className="serif-title text-xl font-semibold text-gray-800 mb-2 flex items-center">
                        <QuestionMarkCircle className="w-5 h-5 mr-2 text-yellow-500" />
                        {faq.question}
                      </h3>
                      <p className="sans-body text-gray-600 leading-relaxed">{faq.answer}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </Tabs>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
