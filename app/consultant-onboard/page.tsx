'use client'

import { useState } from 'react'

export default function ConsultantOnboard() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    expertise: '',
    bio: '',
    hourlyRate: '',
    experience: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleNext = () => {
    if (step < 3) setStep(step + 1)
  }

  const handleBack = () => {
    if (step > 1) setStep(step - 1)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="space-y-20 pb-20">
      {/* Hero */}
      <section className="px-4 sm:px-6 lg:px-8 pt-20 pb-20 max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">Join as a Consultant</h1>
        <p className="text-xl text-gray-600 max-w-3xl">
          Complete your profile in 3 simple steps and start connecting with enterprises.
        </p>
      </section>

      {/* Onboarding Form */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-2xl mx-auto">
        {submitted ? (
          <div className="bg-white p-8 rounded-lg border border-gray-200 text-center space-y-4">
            <div className="text-6xl">🎉</div>
            <h2 className="text-2xl font-bold text-gray-900">Welcome to Matrix360!</h2>
            <p className="text-gray-600">Your profile has been created. You'll receive a confirmation email shortly.</p>
            <a href="/for-consultants" className="inline-block btn-primary">View Your Profile</a>
          </div>
        ) : (
          <div className="bg-white rounded-lg border border-gray-200 p-8">
            {/* Progress */}
            <div className="mb-8">
              <div className="flex justify-between mb-4">
                <span className={`text-sm font-semibold ${step >= 1 ? 'text-blue-600' : 'text-gray-400'}`}>Step 1: Basic Info</span>
                <span className={`text-sm font-semibold ${step >= 2 ? 'text-blue-600' : 'text-gray-400'}`}>Step 2: Expertise</span>
                <span className={`text-sm font-semibold ${step >= 3 ? 'text-blue-600' : 'text-gray-400'}`}>Step 3: Pricing</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all"
                  style={{ width: `${(step / 3) * 100}%` }}
                ></div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Step 1 */}
              {step === 1 && (
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Basic Information</h2>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">Years of Experience</label>
                    <select
                      name="experience"
                      value={formData.experience}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    >
                      <option value="">Select...</option>
                      <option value="0-5">0-5 years</option>
                      <option value="5-10">5-10 years</option>
                      <option value="10-20">10-20 years</option>
                      <option value="20+">20+ years</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Step 2 */}
              {step === 2 && (
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Expertise</h2>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Primary Expertise</label>
                    <input
                      type="text"
                      name="expertise"
                      value={formData.expertise}
                      onChange={handleChange}
                      placeholder="e.g., Strategy, Digital Transformation, Operations"
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Professional Bio</label>
                    <textarea
                      name="bio"
                      value={formData.bio}
                      onChange={handleChange}
                      placeholder="Tell enterprises about your background and specialties..."
                      rows={5}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                </div>
              )}

              {/* Step 3 */}
              {step === 3 && (
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Rates</h2>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Hourly Rate (USD)</label>
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-700">$</span>
                      <input
                        type="number"
                        name="hourlyRate"
                        value={formData.hourlyRate}
                        onChange={handleChange}
                        placeholder="250"
                        required
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                      <span className="text-gray-700">/hour</span>
                    </div>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-700">
                      <strong>Your earnings:</strong> You'll keep 70% of revenue on the Pro plan, 80% on the Elite plan.
                    </p>
                  </div>
                </div>
              )}

              {/* Buttons */}
              <div className="flex gap-4 pt-6">
                <button
                  type="button"
                  onClick={handleBack}
                  disabled={step === 1}
                  className="flex-1 px-6 py-2 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Back
                </button>
                {step < 3 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="flex-1 btn-primary"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="flex-1 btn-primary"
                  >
                    Complete Profile
                  </button>
                )}
              </div>
            </form>
          </div>
        )}
      </section>
    </div>
  )
}
