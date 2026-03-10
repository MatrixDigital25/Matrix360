import React, { useState } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, Loader2, UploadCloud, Building2, Briefcase, GraduationCap, MapPin, Target, Linkedin, ArrowRight } from 'lucide-react';
import { Button } from '@/src/components/ui/Button';

export default function Apply() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload = {
      full_name: formData.get('full_name') as string,
      professional_title: formData.get('professional_title') as string,
      organization: formData.get('organization') as string,
      years_experience: parseInt(formData.get('years_experience') as string),
      industry: formData.get('industry') as string,
      specializations: formData.get('specializations') as string,
      linkedin_url: formData.get('linkedin_url') as string,
      bio: formData.get('bio') as string,
    };

    try {
      const res = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Submission failed');
      }
      setSubmitted(true);
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
        <motion.div 
          initial={{ scale: 0.95, opacity: 0 }} 
          animate={{ scale: 1, opacity: 1 }} 
          transition={{ type: "spring", duration: 0.8 }}
          className="max-w-xl w-full text-center"
        >
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-20 h-20 bg-green-50 rounded-2xl flex items-center justify-center mx-auto mb-8 text-green-600 shadow-sm"
          >
            <CheckCircle2 className="h-10 w-10" />
          </motion.div>
          
          <h1 className="text-4xl font-heading font-bold text-gray-900 mb-4 tracking-tight">Application Received</h1>
          <p className="text-lg text-gray-600 mb-10 leading-relaxed max-w-md mx-auto">
            Thank you for applying to the <span className="font-semibold text-gray-900">Matrix360 Expert Network</span>. 
            Our strategic team will review your qualifications and contact you shortly.
          </p>
          
          <Button 
            onClick={() => window.location.href = '/'} 
            className="h-12 px-8 text-base bg-gray-900 hover:bg-gray-800 text-white rounded-full transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Return to Homepage
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-gray-900 relative py-20 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-3xl mx-auto">
        
        {/* Header content styling */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-14 text-center md:text-left"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 text-sm font-semibold mb-6 shadow-sm border border-blue-100">
            <Target className="w-4 h-4" /> Waitlist Open
          </div>
          <h1 className="text-4xl md:text-5xl font-heading font-extrabold mb-4 tracking-tight text-gray-900">
            Consultant Application
          </h1>
          <p className="text-xl text-gray-500 font-light leading-relaxed max-w-2xl">
            Partner with MatrixDigital to consult for global enterprises. Apply for verification and access high-impact strategic projects.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden"
        >
          <div className="p-8 md:p-12">
            
            {error && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mb-8 p-4 bg-red-50 border border-red-100 rounded-xl text-red-700 text-sm flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0" />
                {error}
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Full Name</label>
                  <input name="full_name" required placeholder="Dr. Sarah Jenkins" className="w-full bg-gray-50/50 border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-xl py-3 px-4 text-gray-900 placeholder:text-gray-400 outline-none transition-all shadow-sm" />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Professional Title</label>
                  <input name="professional_title" required placeholder="Regulatory Strategist" className="w-full bg-gray-50/50 border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-xl py-3 px-4 text-gray-900 placeholder:text-gray-400 outline-none transition-all shadow-sm" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Current Organization</label>
                  <input name="organization" required placeholder="Independent or Firm Name" className="w-full bg-gray-50/50 border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-xl py-3 px-4 text-gray-900 placeholder:text-gray-400 outline-none transition-all shadow-sm" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Years of Experience</label>
                  <input name="years_experience" required type="number" min="1" placeholder="15" className="w-full bg-gray-50/50 border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-xl py-3 px-4 text-gray-900 placeholder:text-gray-400 outline-none transition-all shadow-sm" />
                </div>
              </div>

              <div className="w-full h-px bg-gray-100 my-6" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                <div className="space-y-2 relative">
                  <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Primary Industry Expertise</label>
                  <div className="relative">
                    <select name="industry" required className="appearance-none w-full bg-gray-50/50 border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-xl py-3 pl-4 pr-10 text-gray-900 outline-none transition-all shadow-sm hover:bg-gray-50 cursor-pointer">
                      <option value="">Select Industry...</option>
                      <option value="Technology">Technology</option>
                      <option value="Healthcare">Healthcare</option>
                      <option value="Finance">Finance</option>
                      <option value="Manufacturing">Manufacturing</option>
                      <option value="Energy">Energy</option>
                      <option value="Retail">Retail</option>
                      <option value="Government">Government</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-gray-400">
                      <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 relative">
                  <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide flex items-center gap-1.5"><Linkedin className="w-4 h-4 text-[#0077b5]" /> LinkedIn Profile URL</label>
                  <input name="linkedin_url" required type="url" placeholder="https://linkedin.com/in/..." className="w-full bg-gray-50/50 border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-xl py-3 px-4 text-gray-900 placeholder:text-gray-400 outline-none transition-all shadow-sm" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Specialization Tags</label>
                <input name="specializations" required placeholder="e.g. Compliance, Policy, EU Markets (comma separated)" className="w-full bg-gray-50/50 border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-xl py-3 px-4 text-gray-900 placeholder:text-gray-400 outline-none transition-all shadow-sm" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Professional Bio</label>
                <textarea name="bio" required placeholder="Briefly describe your background, key achievements, and consulting approach..." className="w-full bg-gray-50/50 border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-xl py-4 px-4 text-gray-900 placeholder:text-gray-400 outline-none transition-all shadow-sm min-h-[140px] resize-none" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Profile Photo</label>
                  <div className="border border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center justify-center text-center hover:bg-gray-50 hover:border-blue-400 transition-all cursor-pointer group bg-white shadow-sm">
                    <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <UploadCloud className="h-5 w-5" />
                    </div>
                    <span className="text-sm text-gray-800 font-medium">Upload Image</span>
                    <span className="text-xs text-gray-400 mt-1">JPG, PNG (Max 2MB)</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">CV / Resume</label>
                  <div className="border border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center justify-center text-center hover:bg-gray-50 hover:border-blue-400 transition-all cursor-pointer group bg-white shadow-sm">
                    <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <UploadCloud className="h-5 w-5" />
                    </div>
                    <span className="text-sm text-gray-800 font-medium">Upload Document</span>
                    <span className="text-xs text-gray-400 mt-1">PDF, DOCX (Max 5MB)</span>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full h-14 text-lg font-medium rounded-xl relative overflow-hidden group bg-gray-900 hover:bg-gray-800 text-white transition-all duration-300 shadow-md flex items-center justify-center gap-2 outline-none focus:ring-4 focus:ring-gray-900/20"
                >
                  {loading ? <><Loader2 className="h-5 w-5 animate-spin" /> Verifying Profile...</> : <>Submit Application <ArrowRight className="h-5 w-5 opacity-70 group-hover:translate-x-1 transition-transform" /></>}
                </button>
                <p className="text-center text-sm text-gray-400 mt-5">
                  By submitting, you agree to our <a href="#" className="font-medium text-gray-600 hover:text-blue-600 underline underline-offset-4 decoration-gray-300">Terms of Service</a> & <a href="#" className="font-medium text-gray-600 hover:text-blue-600 underline underline-offset-4 decoration-gray-300">Privacy Policy</a>.
                </p>
              </div>

            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
