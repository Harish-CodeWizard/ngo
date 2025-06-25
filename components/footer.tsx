import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Droplets, Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-orange-400 via-yellow-400 to-orange-500">
      {/* Newsletter Section */}
      <div className="border-b border-white/20">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="serif-title text-3xl font-bold text-white mb-4">Stay Connected with Our Mission</h3>
            <p className="sans-body text-white/90 mb-8">
              Get updates on our latest projects, impact stories, and ways to get involved
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-white/20 border-white/30 text-white placeholder:text-white/70 focus:bg-white/30"
              />
              <Button className="bg-white text-orange-500 hover:bg-white/90 px-8">Subscribe</Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Organization Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mr-3">
                <Droplets className="w-6 h-6 text-orange-500" />
              </div>
              <h3 className="serif-title text-2xl font-bold text-white">Kuviyal Foundation</h3>
            </div>
            <p className="sans-body text-white/90 leading-relaxed mb-6 max-w-md">
              Empowering tribal communities through sustainable development, education, healthcare, and cultural
              preservation. Together, we build bridges between tradition and progress.
            </p>
            <div className="flex space-x-4">
              <Button size="icon" variant="ghost" className="bg-white/20 hover:bg-white/30 text-white">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button size="icon" variant="ghost" className="bg-white/20 hover:bg-white/30 text-white">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button size="icon" variant="ghost" className="bg-white/20 hover:bg-white/30 text-white">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button size="icon" variant="ghost" className="bg-white/20 hover:bg-white/30 text-white">
                <Youtube className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="serif-title text-xl font-semibold text-white mb-6">Quick Links</h4>
            <ul className="sans-body space-y-3">
              {[
                { href: "/about", label: "About Us" },
                { href: "/programs", label: "Our Programs" },
                { href: "/impact", label: "Impact Report" },
                { href: "/get-involved", label: "Get Involved" },
                { href: "/stories", label: "Success Stories" },
                { href: "/careers", label: "Careers" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-white/90 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="serif-title text-xl font-semibold text-white mb-6">Contact Us</h4>
            <div className="sans-body space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-white/90 mt-1 flex-shrink-0" />
                <div className="text-white/90">
                  <p>Kuviyal Foundation</p>
                  <p>Plot No. 123, Saheed Nagar</p>
                  <p>Bhubaneswar, Odisha 751007</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-white/90" />
                <span className="text-white/90">+91 98765 43210</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-white/90" />
                <span className="text-white/90">info@kuviyalfoundation.org</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="sans-body text-white/90 text-center md:text-left">
              © 2024 Kuviyal Foundation. All rights reserved.
            </p>
            <div className="flex space-x-6 sans-body text-sm">
              <Link href="/privacy" className="text-white/90 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-white/90 hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="/transparency" className="text-white/90 hover:text-white transition-colors">
                Transparency
              </Link>
            </div>
          </div>
          <div className="text-center mt-4">
            <p className="sans-body text-white/80 italic">"Voicing the untold stories of the tribes…"</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
