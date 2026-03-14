'use client'

import Link from 'next/link'
import { Mail, Linkedin, Twitter } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-matrix-dark text-white">
      <div className="container-max section-padding">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <h3 className="text-lg font-bold mb-4">Matrix360</h3>
            <p className="text-gray-300 text-sm">
              Hybrid Intelligence Operating System for Enterprises and Consultants.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-bold mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link href="/for-enterprises" className="hover:text-white transition">For Enterprises</Link></li>
              <li><Link href="/for-consultants" className="hover:text-white transition">For Consultants</Link></li>
              <li><Link href="#" className="hover:text-white transition">Strategy Room</Link></li>
              <li><Link href="#" className="hover:text-white transition">Pricing</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-bold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link href="#" className="hover:text-white transition">About</Link></li>
              <li><Link href="#" className="hover:text-white transition">Blog</Link></li>
              <li><Link href="#" className="hover:text-white transition">Careers</Link></li>
              <li><Link href="#" className="hover:text-white transition">Contact</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-bold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link href="#" className="hover:text-white transition">Terms of Service</Link></li>
              <li><Link href="#" className="hover:text-white transition">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-white transition">Cookie Policy</Link></li>
              <li><Link href="#" className="hover:text-white transition">Security</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-sm text-gray-300">
              © 2026 Matrix360 Consulting. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link href="#" className="text-gray-300 hover:text-white transition">
                <Mail size={20} />
              </Link>
              <Link href="#" className="text-gray-300 hover:text-white transition">
                <Linkedin size={20} />
              </Link>
              <Link href="#" className="text-gray-300 hover:text-white transition">
                <Twitter size={20} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
