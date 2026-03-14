'use client'

import { useState } from 'react'
import Link from 'next/link'
import { CheckCircle, ArrowLeft } from 'lucide-react'

export default function ConsultantOnboard() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    // Step 1
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    // Step 2
    title: '',
    specializations: [] as string[],
    yearsExperience: '',
    bio: '',
    // Step 3
    hourlyRate: '',
    availability: '',
    agree: false,
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSpecialization = (spec: string) => {
    setFormData(prev => ({
      ...prev,
      specializations: prev.specializations.includes(spec)
        ? prev.specializations.filter(s => s !== spec)
        : [...prev.specializations, spec]
    }))
  }

  const handleNext = () => {
    if (step < 3) setStep(step + 1)
  }

  const handlePrev = () => {
    if (step > 1) setStep(step - 1)
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    console.log('Consultant profile submitted:', formData)
    setSubmitted(true)
  }

  const specializations = [
    'Strategy & Planning',
    'Market Analysis',
    'Financial Modeling',
    'Operations',
    'Digital Transformation',
    'Risk Management',
    'Supply Chain',
    'Sales & Marketing',
    'Organizational Change',
    'Technology',
  ]

  return (
    <div className="w-full">
      <section className="section-padding bg-gradient-to-br from-white via-matrix-light to-white">
        <div className="container-max max-w-2xl">
          <Link href="/for-consultants" className="flex items-center gap-2 text-matrix-blue hover:text-blue-700 mb-8">
            <ArrowLeft size={20} />
            Back to Consultants
          </Link>

          {!submitted ? (
            <>
              <h1 className="hero-title mb-2">Join the Consultant Network</h1>
              <p className="text-lg text-gray-600 mb-8">
                Build your profile, get matched with clients, amplify your impact.
              </p>

              {/* Progress Indicator */}
              <div className="flex gap-2 mb-12">
                {[1, 2, 3].map(s => (
                  <div
                    key={s}
                    className={`flex-1 h-2 rounded-full ${
                      s <= step ? 'bg-matrix-blue' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>

              <form onSubmit={handleSubmit} className="bg-white rounded-lg p-8 border-2 border-matrix-blue">
                {/* Step 1: Basic Info */}
                {step === 1 && (
                  <div>
                    <h2 className="text-2xl font-bold mb-6">Basic Information</h2>
                    <div className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold mb-2">First Name *</label>
                          <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                            className="input-field"
                            placeholder="John"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold mb-2">Last Name *</label>
                          <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                            className="input-field"
                            placeholder="Doe"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-2">Email Address *</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="input-field"
                          placeholder="john@example.com"
                        />
                      </div>
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
                    </div>
                  </div>
                )}

                {/* Step 2: Expertise */}
                {step === 2 && (
                  <div>
                    <h2 className="text-2xl font-bold mb-6">Your Expertise</h2>
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-semibold mb-2">Professional Title *</label>
                        <input
                          type="text"
                          name="title"
                          value={formData.title}
                          onChange={handleChange}
                          required
                          className="input-field"
                          placeholder="e.g., Strategy Consultant, CFO, Head of Operations"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold mb-3">Specializations *</label>
                        <div className="grid grid-cols-2 gap-3">
                          {specializations.map(spec => (
                            <label key={spec} className="flex items-center gap-2 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={formData.specializations.includes(spec)}
                                onChange={() => handleSpecialization(spec)}
                                className="w-4 h-4"
                              />
                              <span className="text-sm">{spec}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold mb-2">Years of Experience *</label>
                        <select
                          name="yearsExperience"
                          value={formData.yearsExperience}
                          onChange={handleChange}
                          required
                          className="input-field"
                        >
                          <option value="">Select</option>
                          <option value="0-3">0-3 years</option>
                          <option value="3-7">3-7 years</option>
                          <option value="7-15">7-15 years</option>
                          <option value="15+">15+ years</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold mb-2">Professional Bio</label>
                        <textarea
                          name="bio"
                          value={formData.bio}
                          onChange={handleChange}
                          className="input-field min-h-20"
                          placeholder="Tell clients about your background, achievements, and approach..."
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: Pricing & Availability */}
                {step === 3 && (
                  <div>
                    <h2 className="text-2xl font-bold mb-6">Pricing & Availability</h2>
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-semibold mb-2">Hourly Rate (USD) *</label>
                        <div className="relative">
                          <span className="absolute left-4 top-3 text-gray-500">$</span>
                          <input
                            type="number"
                            name="hourlyRate"
                            value={formData.hourlyRate}
                            onChange={handleChange}
                            required
                            className="input-field pl-8"
                            placeholder="150"
                            min="0"
                          />
                        </div>
                        <p className="text-xs text-gray-500 mt-2">You'll receive 85% after Matrix360 commission</p>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold mb-2">Availability *</label>
                        <select
                          name="availability"
                          value={formData.availability}
                          onChange={handleChange}
                          required
                          className="input-field"
                        >
                          <option value="">Select</option>
                          <option value="full-time">Full-time (40+ hrs/week)</option>
                          <option value="part-time">Part-time (20-40 hrs/week)</option>
                          <option value="flexible">Flexible (as needed)</option>
                        </select>
                      </div>

                      <div className="bg-blue-50 border-2 border-matrix-blue rounded-lg p-4 my-6">
                        <h3 className="font-bold mb-2">What You Get</h3>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-center gap-2">
                            <CheckCircle size={16} className="text-green-500" />
                            <span>Free access to platform and AI tools</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle size={16} className="text-green-500" />
                            <span>Access to enterprise client network</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle size={16} className="text-green-500" />
                            <span>Earn 85% of session revenue</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle size={16} className="text-green-500" />
                            <span>Build your reputation & visibility</span>
                          </li>
                        </ul>
                      </div>

                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          name="agree"
                          checked={formData.agree}
                          onChange={handleChange}
                          required
                          className="w-4 h-4 mt-1"
                        />
                        <span className="text-sm">
                          I agree to the <Link href="#" className="text-matrix-blue hover:underline">Terms of Service</Link> and <Link href="#" className="text-matrix-blue hover:underline">Privacy Policy</Link> *
                        </span>
                      </label>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex gap-4 mt-8">
                  {step > 1 && (
                    <button
                      type="button"
                      onClick={handlePrev}
                      className="btn-secondary flex-1"
                    >
                      Back
                    </button>
                  )}
                  {step < 3 ? (
                    <button
                      type="button"
                      onClick={handleNext}
                      className="btn-primary flex-1"
                    >
                      Continue
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="btn-primary flex-1"
                    >
                      Create Profile
                    </button>
                  )}
                </div>
              </form>
            </>
          ) : (
            <div className="bg-white rounded-lg p-12 border-2 border-green-500 text-center">
              <CheckCircle size={64} className="text-green-500 mx-auto mb-6" />
              <h2 className="text-3xl font-bold mb-4">Profile Created!</h2>
              <p className="text-lg text-gray-600 mb-4">
                Welcome to the Matrix360 consultant network, {formData.firstName}!
              </p>
              <p className="text-gray-600 mb-4">
                We've sent a confirmation email to <strong>{formData.email}</strong>. Check your inbox for:
              </p>
              <ul className="text-left inline-block text-gray-600 mb-8 space-y-2">
                <li>✓ Your consultant dashboard login</li>
                <li>✓ Getting started guide</li>
                <li>✓ Tips to get matched with clients faster</li>
              </ul>
              <p className="text-gray-600 mb-8">
                Your profile is live. Clients can find you now!
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
