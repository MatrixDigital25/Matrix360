import Head from 'next/head';
import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ConsultantOnboarding() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    expertise: '', yearsExperience: '', bio: '',
    headline: '', hourlyRate: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log('Consultant form:', formData);
    setSubmitted(true);
  };

  return (
    <>
      <Head>
        <title>Join as Consultant - Matrix 360</title>
      </Head>
      <Header />
      <main>
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6 max-w-2xl">
            <h1 className="text-4xl font-bold mb-4 text-center">Join the Consultant Network</h1>
            <p className="text-lg text-gray-700 text-center mb-12">Create your profile in 3 easy steps. Start earning immediately.</p>
            
            {submitted && (
              <div className="bg-green-50 border border-green-300 text-green-800 px-6 py-4 rounded-lg mb-8 text-center">
                <p className="font-bold">✓ Profile Created!</p>
                <p>Check your email to verify and start getting opportunities.</p>
              </div>
            )}

            {!submitted && (
              <>
                {/* Progress Indicator */}
                <div className="flex items-center gap-4 mb-12">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full font-bold ${step >= 1 ? 'bg-accent text-white' : 'bg-gray-200 text-gray-600'}`}>1</div>
                  <div className={`flex-1 h-1 ${step >= 2 ? 'bg-accent' : 'bg-gray-200'}`}></div>
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full font-bold ${step >= 2 ? 'bg-accent text-white' : 'bg-gray-200 text-gray-600'}`}>2</div>
                  <div className={`flex-1 h-1 ${step >= 3 ? 'bg-accent' : 'bg-gray-200'}`}></div>
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full font-bold ${step >= 3 ? 'bg-accent text-white' : 'bg-gray-200 text-gray-600'}`}>3</div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Step 1: Basic Info */}
                  {step === 1 && (
                    <div className="space-y-6">
                      <h2 className="text-2xl font-bold mb-8">Your Information</h2>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-semibold mb-2">First Name *</label>
                          <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-accent" />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold mb-2">Last Name *</label>
                          <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-accent" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-2">Email *</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-accent" />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-2">Phone</label>
                        <input type="tel" name="phone" value={formData.phone} onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-accent" />
                      </div>
                    </div>
                  )}

                  {/* Step 2: Expertise */}
                  {step === 2 && (
                    <div className="space-y-6">
                      <h2 className="text-2xl font-bold mb-8">Your Expertise</h2>
                      <div>
                        <label className="block text-sm font-semibold mb-2">Professional Headline *</label>
                        <input type="text" name="headline" value={formData.headline} onChange={handleChange} required placeholder="e.g., Strategy Consultant | 15+ Years in Tech"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-accent" />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-2">Core Expertise *</label>
                        <input type="text" name="expertise" value={formData.expertise} onChange={handleChange} required placeholder="e.g., Digital Transformation, M&A Strategy"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-accent" />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-2">Years of Experience *</label>
                        <select name="yearsExperience" value={formData.yearsExperience} onChange={handleChange} required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-accent">
                          <option value="">Select</option>
                          <option value="1-3">1-3 years</option>
                          <option value="3-5">3-5 years</option>
                          <option value="5-10">5-10 years</option>
                          <option value="10+">10+ years</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-2">Your Rate (per hour) *</label>
                        <div className="flex items-center">
                          <span className="text-2xl mr-2">$</span>
                          <input type="number" name="hourlyRate" value={formData.hourlyRate} onChange={handleChange} required placeholder="250"
                            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-accent" />
                          <span className="ml-2">/hour</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Bio */}
                  {step === 3 && (
                    <div className="space-y-6">
                      <h2 className="text-2xl font-bold mb-8">Your Bio</h2>
                      <div>
                        <label className="block text-sm font-semibold mb-2">Professional Bio *</label>
                        <textarea name="bio" value={formData.bio} onChange={handleChange} required rows={6} placeholder="Tell enterprises about your background, achievements, and approach..."
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-accent" />
                        <p className="text-sm text-gray-500 mt-2">This will appear on your public profile</p>
                      </div>
                      <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                        <p className="text-sm text-blue-800"><strong>Next steps:</strong> After creating your profile, you'll be able to add credentials, upload past work samples, and configure your AI agents.</p>
                      </div>
                    </div>
                  )}

                  {/* Navigation */}
                  <div className="flex gap-4 pt-8">
                    {step > 1 && (
                      <button type="button" onClick={() => setStep(step - 1)} className="btn btn-secondary flex-1">
                        Back
                      </button>
                    )}
                    {step < 3 ? (
                      <button type="button" onClick={handleNext} className="btn btn-primary flex-1">
                        Next
                      </button>
                    ) : (
                      <button type="submit" className="btn btn-primary flex-1">
                        Create Profile
                      </button>
                    )}
                  </div>
                </form>
              </>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
