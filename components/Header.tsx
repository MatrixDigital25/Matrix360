'use client'
import Link from 'next/link'
import { useState } from 'react'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <img 
            src="/images/logo.png" 
            alt="Matrix360 Logo" 
            className="h-12 w-auto"
          />
        </Link>

        <div className="hidden md:flex space-x-8">
          <Link href="/" className="text-gray-700 hover:text-blue-600 font-medium">Home</Link>
          <Link href="/for-enterprises" className="text-gray-700 hover:text-blue-600 font-medium">For Enterprises</Link>
          <Link href="/for-consultants" className="text-gray-700 hover:text-blue-600 font-medium">For Consultants</Link>
          <Link href="/strategy-room" className="text-gray-700 hover:text-blue-600 font-medium">Strategy Room</Link>
        </div>

        <div className="hidden md:flex space-x-4">
          <Link href="/enterprise-trial" className="px-4 py-2 text-blue-600 font-semibold hover:text-blue-700">Login</Link>
          <Link href="/enterprise-trial" className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700">Get Started</Link>
        </div>

        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </nav>

      {isOpen && (
        <div className="md:hidden border-t border-gray-200 px-4 py-4 space-y-3">
          <Link href="/" className="block text-gray-700 hover:text-blue-600 font-medium">Home</Link>
          <Link href="/for-enterprises" className="block text-gray-700 hover:text-blue-600 font-medium">For Enterprises</Link>
          <Link href="/for-consultants" className="block text-gray-700 hover:text-blue-600 font-medium">For Consultants</Link>
          <Link href="/strategy-room" className="block text-gray-700 hover:text-blue-600 font-medium">Strategy Room</Link>
          <Link href="/enterprise-trial" className="block px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold">Get Started</Link>
        </div>
      )}
    </header>
  )
}