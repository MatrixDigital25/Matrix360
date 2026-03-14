'use client'

import { useState } from 'react'
import Link from 'next/link'
import { CheckCircle, ArrowLeft } from 'lucide-react'

export default function EnterpriseTrial() {
  const [formData, setFormData] = useState({
    companyName: '',
    fullName: '',
    email: '',
    phone: '',
    industry: '',
    companySize: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: any) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    setSubmitted(true)
    // In production, send to your API endpoint
    setTimeout(() => {
      setSubmitted(false)
      setFormData({
        companyName: '',
        fullName: '',
        email: '',
        phone: '',
        industry: '',
        companySize: '',
        message: '',
      })
    }, 3000)
  }

  return (
    <div className="w-full">
      <section className="section-padding bg-gradient-to-br from-white via-matrix-light to-white">
        <div className="container-max max-w-2xl">
          <Link href="/for-enterprises" className="flex items-center gap-2 text-matrix-blue hover:text-blue-700 mb-8">
            <ArrowLeft size={20} />
            Back to Enterprises
          </Link>

          {!submitted ? (
            <>
              <h1 className="hero-title mb-4">Start Your Free 14-Day Trial</h1>
              <p className="text-lg text-gray-600 mb-8">
                Join hundreds of enterprises transforming their strategy with Hybrid Intelligence. No credit card required.
              </p>

              <form onSubmit={handleSubmit} className="bg-white rounded-lg p-8 border-2 border-matrix-blue">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Company Name */}
                  <div>
                    <label className="block text-sm font-semibold mb-2">Company Name *</label>
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      required
                      className="input-field"
                      placeholder="Your company"
                    />
                  </div>

                  {/* Full Name */}
                  <div>
                    <label className="block text-sm font-semibold mb-2">Your Name *</label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      className="input-field"
                      placeholder="John Doe"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-semibold mb-2">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="input-field"
                      placeholder="you@company.com"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-semibold mb-2">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="input-field"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>

                  {/* Industry */}
                  <div>
                    <label className="block text-sm font-semibold mb-2">Industry *</label>
                    <select
                      name="industry"
                      value={formData.industry}
                      onChange={handleChange}
                      required
                      className="input-field"
                    >
                      <option value="">Select an industry</option>
                      <option value="technology">Technology</option>
                      <option value="finance">Finance & Banking</option>
                      <option value="healthcare">Healthcare</option>
                      <option value="retail">Retail & E-commerce</option>
                      <option value="manufacturing">Manufacturing</option>
                      <option value="consulting">Consulting Services</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  {/* Company Size */}
                  <div>
                    <label className="block text-sm font-semibold mb-2">Company Size *</label>
                    <select
                      name="companySize"
                      value={formData.companySize}
                      onChange={handleChange}
                      required
                      className="input-field"
                    >
                      <option value="">Select size</option>
                      <option value="1-50">1-50 employees</option>
                      <option value="51-200">51-200 employees</option>
                      <option value="201-1000">201-1000 employees</option>
                      <option value="1000+">1000+ employees</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div className="mt-6">
                  <label className="block text-sm font-semibold mb-2">Tell us about your strategic focus</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="input-field min-h-24"
                    placeholder="What decisions are you trying to make better? What markets are you exploring?"
                  />
                </div>

                {/* Terms */}
                <div className="mt-6 p-4 bg-gray-50 rounded-lg text-sm text-gray-600 mb-6">
                  <p className="mb-2">By signing up, you agree to our <Link href="#" className="text-matrix-blue hover:underline">Terms of Service</Link> and <Link href="#" className="text-matrix-blue hover:underline">Privacy Policy</Link>.</p>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="btn-primary w-full"
                >
                  Start Your Free Trial
                </button>

                <p className="text-center text-sm text-gray-600 mt-4">
                  Already have an account? <Link href="/login" className="text-matrix-blue hover:underline">Sign in</Link>
                </p>
              </form>

              {/* Trial Benefits */}
              <div className="mt-12 grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-matrix-blue mb-2">14</div>
                  <p className="text-gray-600">Days free trial</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-matrix-blue mb-2">0</div>
                  <p className="text-gray-600">Credit card required</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-matrix-blue mb-2">∞</div>
                  <p className="text-gray-600">Full feature access</p>
                </div>
              </div>
            </>
          ) : (
            <div className="bg-white rounded-lg p-12 border-2 border-green-500 text-center">
              <CheckCircle size={64} className="text-green-500 mx-auto mb-6" />
              <h2 className="text-3xl font-bold mb-4">Trial Activated!</h2>
              <p className="text-lg text-gray-600 mb-4">
                Welcome to Matrix360. We've sent a confirmation email to <strong>{formData.email}</strong>.
              </p>
              <p className="text-gray-600 mb-8">
                Check your inbox for setup instructions and your dashboard login details. You'll have immediate access to all Pro Plan features.
              </p>
              <Link href="/" className="btn-primary inline-block">
                Back to Home
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
