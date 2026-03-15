'use client'

import { useState } from 'react'

export default function EnterpriseTrial() {
  const [formData, setFormData] = useState({
    company: '',
    email: '',
    name: '',
    employees: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 5000)
  }

  return (
    <div className="space-y-20 pb-20">
      {/* Hero */}
      <section className="px-4 sm:px-6 lg:px-8 pt-20 pb-20 max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">Start Your Free Trial</h1>
        <p className="text-xl text-gray-600 max-w-3xl">
          Experience Hybrid Intelligence. 30 days free. No credit card required.
        </p>
      </section>

      {/* Form */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-2xl mx-auto">
        <div className="bg-white p-8 rounded-lg border border-gray-200">
          {submitted ? (
            <div className="text-center space-y-4 py-8">
              <div className="text-5xl">✓</div>
              <h2 className="text-2xl font-bold text-green-600">Thank you!</h2>
              <p className="text-gray-600">We'll be in touch within 24 hours to set up your trial.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Company Size</label>
                <select
                  name="employees"
                  value={formData.employees}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option value="">Select...</option>
                  <option value="1-10">1-10 employees</option>
                  <option value="11-50">11-50 employees</option>
                  <option value="51-200">51-200 employees</option>
                  <option value="201+">201+ employees</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full btn-primary"
              >
                Start Free Trial
              </button>

              <p className="text-sm text-gray-600 text-center">
                By submitting this form, you agree to our Terms of Service and Privacy Policy.
              </p>
            </form>
          )}
        </div>

        {/* Benefits */}
        <div className="mt-16 space-y-4">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">What's Included in Your Trial</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start space-x-3">
              <div className="text-green-600 text-xl mt-1">✓</div>
              <div>
                <h4 className="font-semibold text-gray-900">Full Platform Access</h4>
                <p className="text-gray-600 text-sm">All Professional features included</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="text-green-600 text-xl mt-1">✓</div>
              <div>
                <h4 className="font-semibold text-gray-900">Consultant Access</h4>
                <p className="text-gray-600 text-sm">Unlimited expert collaboration</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="text-green-600 text-xl mt-1">✓</div>
              <div>
                <h4 className="font-semibold text-gray-900">AI Insights</h4>
                <p className="text-gray-600 text-sm">Advanced analysis and recommendations</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="text-green-600 text-xl mt-1">✓</div>
              <div>
                <h4 className="font-semibold text-gray-900">Onboarding Support</h4>
                <p className="text-gray-600 text-sm">Personal guidance from our team</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
