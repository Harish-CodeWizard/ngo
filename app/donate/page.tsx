"use client"

import { useState, useEffect } from "react"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  Heart,
  CreditCard,
  Shield,
  Users,
  GraduationCap,
  Home,
  Zap,
  Gift,
  CheckCircle,
  Lock,
  Award,
} from "lucide-react"

const donationAmounts = [500, 1000, 2500, 5000, 10000]

const campaigns = [
  {
    id: "education",
    title: "Education for All",
    description: "Support quality education for tribal children",
    icon: GraduationCap,
    raised: 850000,
    target: 1200000,
    color: "from-yellow-400 to-orange-500",
    urgency: "High",
    impact: "₹500 can educate a child for 1 month",
  },
  {
    id: "healthcare",
    title: "Healthcare Access",
    description: "Mobile clinics and medical care for remote villages",
    icon: Heart,
    raised: 620000,
    target: 1000000,
    color: "from-purple-400 to-purple-600",
    urgency: "Critical",
    impact: "₹1000 can provide medical care for a family",
  },
  {
    id: "infrastructure",
    title: "Infrastructure Development",
    description: "Building schools, health centers, and community facilities",
    icon: Home,
    raised: 380000,
    target: 800000,
    color: "from-blue-400 to-blue-600",
    urgency: "Medium",
    impact: "₹2500 can build 1 sq ft of school infrastructure",
  },
  {
    id: "livelihood",
    title: "Livelihood Programs",
    description: "Skill development and economic empowerment",
    icon: Zap,
    raised: 290000,
    target: 500000,
    color: "from-orange-400 to-red-500",
    urgency: "Medium",
    impact: "₹5000 can train one person in vocational skills",
  },
]

const donationBenefits = [
  { amount: 500, benefits: ["Monthly newsletter", "Impact updates", "Tax certificate"] },
  { amount: 2500, benefits: ["All above", "Quarterly impact report", "Donor recognition"] },
  { amount: 10000, benefits: ["All above", "Annual field visit", "Direct beneficiary connect"] },
  { amount: 25000, benefits: ["All above", "Advisory board invitation", "Custom impact report"] },
]

export default function DonatePage() {
  const [isVisible, setIsVisible] = useState(false)
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null)
  const [customAmount, setCustomAmount] = useState("")
  const [selectedCampaign, setSelectedCampaign] = useState("education")
  const [donationType, setDonationType] = useState("one-time")
  const [donorInfo, setDonorInfo] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    panCard: "",
    message: "",
  })
  const [isAnonymous, setIsAnonymous] = useState(false)
  const [agreedToTerms, setAgreedToTerms] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const finalAmount = selectedAmount || Number.parseInt(customAmount) || 0
  const selectedCampaignData = campaigns.find((c) => c.id === selectedCampaign)

  const handleDonate = () => {
    if (finalAmount > 0 && agreedToTerms) {
      // Here you would integrate with payment gateway
      alert(`Processing donation of ₹${finalAmount} for ${selectedCampaignData?.title}`)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-yellow-50">
      <Navigation />

      {/* Hero Section */}
      <section className="watercolor-bg pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className={`text-center max-w-4xl mx-auto ${isVisible ? "fade-in" : ""}`}>
            <h1 className="serif-title text-5xl md:text-7xl font-bold text-gray-800 mb-6">Make a Difference</h1>
            <p className="sans-body text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
              Your donation directly impacts tribal communities, creating lasting change through education, healthcare,
              infrastructure, and livelihood programs.
            </p>
            <div className="flex items-center justify-center space-x-8 text-center">
              <div className="watercolor-card p-4 rounded-xl">
                <div className="text-2xl font-bold serif-title text-green-600">₹50L+</div>
                <div className="text-sm sans-body text-gray-600">Raised This Year</div>
              </div>
              <div className="watercolor-card p-4 rounded-xl">
                <div className="text-2xl font-bold serif-title text-blue-600">2,500+</div>
                <div className="text-sm sans-body text-gray-600">Donors</div>
              </div>
              <div className="watercolor-card p-4 rounded-xl">
                <div className="text-2xl font-bold serif-title text-purple-600">95%</div>
                <div className="text-sm sans-body text-gray-600">Goes to Programs</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Donation Form */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Main Donation Form */}
              <div className="lg:col-span-2 space-y-8">
                {/* Campaign Selection */}
                <Card className="watercolor-card border-0">
                  <CardHeader>
                    <CardTitle className="serif-title text-2xl">Choose a Campaign</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      {campaigns.map((campaign) => (
                        <div
                          key={campaign.id}
                          className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                            selectedCampaign === campaign.id
                              ? "border-yellow-400 bg-yellow-50"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                          onClick={() => setSelectedCampaign(campaign.id)}
                        >
                          <div className="flex items-start space-x-3">
                            <div
                              className={`w-12 h-12 bg-gradient-to-br ${campaign.color} rounded-full flex items-center justify-center flex-shrink-0`}
                            >
                              <campaign.icon className="w-6 h-6 text-white" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-2">
                                <h3 className="serif-title font-semibold text-gray-800">{campaign.title}</h3>
                                <Badge
                                  variant={
                                    campaign.urgency === "Critical"
                                      ? "destructive"
                                      : campaign.urgency === "High"
                                        ? "default"
                                        : "secondary"
                                  }
                                >
                                  {campaign.urgency}
                                </Badge>
                              </div>
                              <p className="sans-body text-sm text-gray-600 mb-3">{campaign.description}</p>
                              <div className="space-y-2">
                                <div className="flex justify-between text-xs">
                                  <span>₹{(campaign.raised / 100000).toFixed(1)}L raised</span>
                                  <span>₹{(campaign.target / 100000).toFixed(1)}L goal</span>
                                </div>
                                <Progress value={(campaign.raised / campaign.target) * 100} className="h-2" />
                              </div>
                              <p className="sans-body text-xs text-green-600 mt-2 font-medium">{campaign.impact}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Amount Selection */}
                <Card className="watercolor-card border-0">
                  <CardHeader>
                    <CardTitle className="serif-title text-2xl">Donation Amount</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Donation Type */}
                    <div>
                      <Label className="sans-body font-medium mb-3 block">Donation Type</Label>
                      <RadioGroup value={donationType} onValueChange={setDonationType} className="flex space-x-6">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="one-time" id="one-time" />
                          <Label htmlFor="one-time" className="sans-body">
                            One-time
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="monthly" id="monthly" />
                          <Label htmlFor="monthly" className="sans-body">
                            Monthly
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="yearly" id="yearly" />
                          <Label htmlFor="yearly" className="sans-body">
                            Yearly
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>

                    {/* Preset Amounts */}
                    <div>
                      <Label className="sans-body font-medium mb-3 block">Select Amount</Label>
                      <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
                        {donationAmounts.map((amount) => (
                          <Button
                            key={amount}
                            variant={selectedAmount === amount ? "default" : "outline"}
                            className={`h-12 ${selectedAmount === amount ? "glow-button text-white" : ""}`}
                            onClick={() => {
                              setSelectedAmount(amount)
                              setCustomAmount("")
                            }}
                          >
                            ₹{amount.toLocaleString()}
                          </Button>
                        ))}
                      </div>
                    </div>

                    {/* Custom Amount */}
                    <div>
                      <Label htmlFor="custom-amount" className="sans-body font-medium mb-2 block">
                        Or Enter Custom Amount
                      </Label>
                      <Input
                        id="custom-amount"
                        type="number"
                        placeholder="Enter amount in ₹"
                        value={customAmount}
                        onChange={(e) => {
                          setCustomAmount(e.target.value)
                          setSelectedAmount(null)
                        }}
                        className="text-lg h-12"
                      />
                    </div>

                    {/* Impact Preview */}
                    {finalAmount > 0 && selectedCampaignData && (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <h4 className="serif-title font-semibold text-green-800 mb-2">Your Impact</h4>
                        <p className="sans-body text-green-700 text-sm">
                          ₹{finalAmount.toLocaleString()} donation to {selectedCampaignData.title} will help us get
                          closer to our goal.
                        </p>
                        <p className="sans-body text-green-600 text-xs mt-1">{selectedCampaignData.impact}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Donor Information */}
                <Card className="watercolor-card border-0">
                  <CardHeader>
                    <CardTitle className="serif-title text-2xl">Donor Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-2 mb-4">
                      <Checkbox id="anonymous" checked={isAnonymous} onCheckedChange={setIsAnonymous} />
                      <Label htmlFor="anonymous" className="sans-body text-sm">
                        Make this donation anonymous
                      </Label>
                    </div>

                    {!isAnonymous && (
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name" className="sans-body font-medium">
                            Full Name *
                          </Label>
                          <Input
                            id="name"
                            value={donorInfo.name}
                            onChange={(e) => setDonorInfo({ ...donorInfo, name: e.target.value })}
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
                            value={donorInfo.email}
                            onChange={(e) => setDonorInfo({ ...donorInfo, email: e.target.value })}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="phone" className="sans-body font-medium">
                            Phone
                          </Label>
                          <Input
                            id="phone"
                            value={donorInfo.phone}
                            onChange={(e) => setDonorInfo({ ...donorInfo, phone: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label htmlFor="pan" className="sans-body font-medium">
                            PAN Card (for 80G certificate)
                          </Label>
                          <Input
                            id="pan"
                            value={donorInfo.panCard}
                            onChange={(e) => setDonorInfo({ ...donorInfo, panCard: e.target.value })}
                            placeholder="ABCDE1234F"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <Label htmlFor="address" className="sans-body font-medium">
                            Address
                          </Label>
                          <Textarea
                            id="address"
                            value={donorInfo.address}
                            onChange={(e) => setDonorInfo({ ...donorInfo, address: e.target.value })}
                            rows={3}
                          />
                        </div>
                        <div className="md:col-span-2">
                          <Label htmlFor="message" className="sans-body font-medium">
                            Message (Optional)
                          </Label>
                          <Textarea
                            id="message"
                            value={donorInfo.message}
                            onChange={(e) => setDonorInfo({ ...donorInfo, message: e.target.value })}
                            placeholder="Share why you're supporting this cause..."
                            rows={3}
                          />
                        </div>
                      </div>
                    )}

                    <div className="flex items-start space-x-2 pt-4">
                      <Checkbox id="terms" checked={agreedToTerms} onCheckedChange={setAgreedToTerms} />
                      <Label htmlFor="terms" className="sans-body text-sm leading-relaxed">
                        I agree to the{" "}
                        <a href="/terms" className="text-blue-600 hover:underline">
                          Terms & Conditions
                        </a>{" "}
                        and
                        <a href="/privacy" className="text-blue-600 hover:underline ml-1">
                          Privacy Policy
                        </a>
                        . I understand that my donation is voluntary and will be used for the selected cause.
                      </Label>
                    </div>
                  </CardContent>
                </Card>

                {/* Payment Section */}
                <Card className="watercolor-card border-0">
                  <CardHeader>
                    <CardTitle className="serif-title text-2xl flex items-center">
                      <Lock className="w-5 h-5 mr-2" />
                      Secure Payment
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-4 p-4 bg-green-50 rounded-lg">
                        <Shield className="w-6 h-6 text-green-600" />
                        <div>
                          <p className="sans-body font-medium text-green-800">Secure & Encrypted</p>
                          <p className="sans-body text-sm text-green-600">
                            Your payment information is protected with bank-level security
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                        <div className="p-3 border rounded-lg">
                          <CreditCard className="w-8 h-8 mx-auto mb-2 text-gray-600" />
                          <p className="sans-body text-xs">Credit/Debit Cards</p>
                        </div>
                        <div className="p-3 border rounded-lg">
                          <div className="w-8 h-8 mx-auto mb-2 bg-blue-600 rounded text-white flex items-center justify-center text-xs font-bold">
                            UPI
                          </div>
                          <p className="sans-body text-xs">UPI Payment</p>
                        </div>
                        <div className="p-3 border rounded-lg">
                          <div className="w-8 h-8 mx-auto mb-2 bg-orange-600 rounded text-white flex items-center justify-center text-xs font-bold">
                            NB
                          </div>
                          <p className="sans-body text-xs">Net Banking</p>
                        </div>
                        <div className="p-3 border rounded-lg">
                          <div className="w-8 h-8 mx-auto mb-2 bg-purple-600 rounded text-white flex items-center justify-center text-xs font-bold">
                            W
                          </div>
                          <p className="sans-body text-xs">Wallets</p>
                        </div>
                      </div>

                      <Button
                        className="w-full glow-button text-white h-14 text-lg font-semibold"
                        onClick={handleDonate}
                        disabled={finalAmount === 0 || !agreedToTerms}
                      >
                        <Heart className="mr-2 h-5 w-5" />
                        Donate ₹{finalAmount.toLocaleString()}{" "}
                        {donationType === "monthly" ? "/month" : donationType === "yearly" ? "/year" : ""}
                      </Button>

                      <p className="sans-body text-xs text-gray-500 text-center">
                        You will receive a tax-deductible receipt under Section 80G
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-8">
                {/* Donation Benefits */}
                <Card className="watercolor-card border-0">
                  <CardHeader>
                    <CardTitle className="serif-title text-xl flex items-center">
                      <Gift className="w-5 h-5 mr-2" />
                      Donor Benefits
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {donationBenefits.map((benefit, index) => (
                        <div
                          key={index}
                          className={`p-3 rounded-lg border ${
                            finalAmount >= benefit.amount
                              ? "bg-green-50 border-green-200"
                              : "bg-gray-50 border-gray-200"
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="sans-body font-medium">₹{benefit.amount.toLocaleString()}+</span>
                            {finalAmount >= benefit.amount && <CheckCircle className="w-4 h-4 text-green-600" />}
                          </div>
                          <ul className="space-y-1">
                            {benefit.benefits.map((item, itemIndex) => (
                              <li key={itemIndex} className="sans-body text-xs text-gray-600 flex items-center">
                                <div className="w-1 h-1 bg-gray-400 rounded-full mr-2"></div>
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Donors */}
                <Card className="watercolor-card border-0">
                  <CardHeader>
                    <CardTitle className="serif-title text-xl flex items-center">
                      <Users className="w-5 h-5 mr-2" />
                      Recent Supporters
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[
                        { name: "Priya S.", amount: 5000, time: "2 hours ago", message: "For education" },
                        { name: "Anonymous", amount: 2500, time: "5 hours ago", message: "Keep up the great work!" },
                        { name: "Rajesh K.", amount: 10000, time: "1 day ago", message: "Happy to support healthcare" },
                        {
                          name: "Meera P.",
                          amount: 1000,
                          time: "2 days ago",
                          message: "Every child deserves education",
                        },
                      ].map((donor, index) => (
                        <div key={index} className="flex items-start space-x-3 p-3 bg-white/50 rounded-lg">
                          <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                            <Heart className="w-4 h-4 text-white" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <span className="sans-body font-medium text-sm">{donor.name}</span>
                              <span className="sans-body text-xs text-gray-500">{donor.time}</span>
                            </div>
                            <p className="sans-body text-sm text-green-600 font-medium">
                              ₹{donor.amount.toLocaleString()}
                            </p>
                            {donor.message && (
                              <p className="sans-body text-xs text-gray-600 italic">"{donor.message}"</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Trust Indicators */}
                <Card className="watercolor-card border-0">
                  <CardHeader>
                    <CardTitle className="serif-title text-xl flex items-center">
                      <Award className="w-5 h-5 mr-2" />
                      Why Trust Us?
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                        <div>
                          <p className="sans-body font-medium text-sm">80G Tax Exemption</p>
                          <p className="sans-body text-xs text-gray-600">Registered under Income Tax Act</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                        <div>
                          <p className="sans-body font-medium text-sm">Transparent Operations</p>
                          <p className="sans-body text-xs text-gray-600">95% funds go directly to programs</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                        <div>
                          <p className="sans-body font-medium text-sm">Regular Impact Reports</p>
                          <p className="sans-body text-xs text-gray-600">Detailed updates on fund utilization</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                        <div>
                          <p className="sans-body font-medium text-sm">Award Winning NGO</p>
                          <p className="sans-body text-xs text-gray-600">Recognized by government bodies</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
