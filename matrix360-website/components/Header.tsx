'use client'

import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <nav className="container-max px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 font-bold text-2xl">
          <div className="w-10 h-10 bg-gradient-to-br from-matrix-blue to-matrix-teal rounded-full flex items-center justify-center text-white font-bold">
            M
          </div>
          <span className="hidden sm:inline text-matrix-dark">Matrix360</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-gray-600 hover:text-matrix-dark transition">
            Home
          </Link>
          <Link href="/for-enterprises" className="text-gray-600 hover:text-matrix-dark transition">
            For Enterprises
          </Link>
          <Link href="/for-consultants" className="text-gray-600 hover:text-matrix-dark transition">
            For Consultants
          </Link>
          <Link href="#" className="text-gray-600 hover:text-matrix-dark transition">
            Pricing
          </Link>
          <Link href="/enterprise-trial" className="btn-primary text-sm">
            Start Trial
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 p-4 space-y-4">
          <Link href="/" className="block text-gray-600 hover:text-matrix-dark py-2">
            Home
          </Link>
          <Link href="/for-enterprises" className="block text-gray-600 hover:text-matrix-dark py-2">
            For Enterprises
          </Link>
          <Link href="/for-consultants" className="block text-gray-600 hover:text-matrix-dark py-2">
            For Consultants
          </Link>
          <Link href="#" className="block text-gray-600 hover:text-matrix-dark py-2">
            Pricing
          </Link>
          <Link href="/enterprise-trial" className="btn-primary w-full text-center">
            Start Trial
          </Link>
        </div>
      )}
    </header>
  )
}
