import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, Loader2, UploadCloud, Briefcase, GraduationCap, Building2, MapPin, Target, Linkedin } from 'lucide-react';
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
      <div className="min-h-screen bg-app-bg flex flex-col items-center justify-center p-4">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }} 
          animate={{ scale: 1, opacity: 1 }} 
          transition={{ type: "spring", duration: 0.8 }}
          className="max-w-xl w-full bg-white/5 backdrop-blur-3xl border border-white/10 p-12 rounded-3xl text-center shadow-2xl relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-interaction-primary/10 via-transparent to-transparent pointer-events-none" />
          
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-24 h-24 bg-gradient-to-br from-green-400/20 to-green-600/20 rounded-2xl flex items-center justify-center mx-auto mb-8 border border-green-500/30"
          >
            <CheckCircle2 className="h-12 w-12 text-green-400" />
          </motion.div>
          
          <h1 className="text-4xl font-heading font-bold text-white mb-4 tracking-tight">Application Received</h1>
          <p className="text-lg text-white/60 mb-10 leading-relaxed font-light">
            Thank you for applying to the <span className="text-interaction-primary font-medium">Matrix360 Expert Network</span>. 
            Our strategic team will review your qualifications and contact you within 48 hours for the next steps.
          </p>
          
          <Button 
            onClick={() => window.location.href = '/'} 
            className="h-12 px-8 text-base bg-white/10 hover:bg-white/15 text-white border-white/10 rounded-full transition-all duration-300"
          >
            Return to Homepage
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-white relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-interaction-primary/40 to-transparent blur-[120px] rounded-full" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-interaction-primary text-sm font-medium mb-6 backdrop-blur-md">
            <Target className="w-4 h-4" /> Waitlist Open
          </div>
          <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
            Join the Expert Network
          </h1>
          <p className="text-xl text-white/50 max-w-2xl mx-auto font-light leading-relaxed">
            Partner with MatrixDigital to consult for global enterprises. Apply for verification and access high-impact strategic projects.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="bg-white/[0.02] backdrop-blur-2xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-interaction-primary/50 to-transparent" />
            
            {error && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0" />
                {error}
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-10 focus-within:text-interaction-primary transition-colors">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3 relative group">
                  <label className="text-sm font-medium text-white/70 group-focus-within:text-interaction-primary transition-colors">Full Name</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-white/40">
                      <UsersIcon className="w-5 h-5" />
                    </div>
                    <input name="full_name" required placeholder="Dr. Sarah Jenkins" className="w-full bg-white/5 border border-white/10 focus:border-interaction-primary/50 rounded-xl py-3.5 pl-11 pr-4 text-white placeholder:text-white/20 outline-none transition-all shadow-inner" />
                  </div>
                </div>
                
                <div className="space-y-3 relative group">
                  <label className="text-sm font-medium text-white/70 group-focus-within:text-interaction-primary transition-colors">Professional Title</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-white/40">
                      <Briefcase className="w-5 h-5" />
                    </div>
                    <input name="professional_title" required placeholder="Regulatory Strategist" className="w-full bg-white/5 border border-white/10 focus:border-interaction-primary/50 rounded-xl py-3.5 pl-11 pr-4 text-white placeholder:text-white/20 outline-none transition-all shadow-inner" />
                  </div>
                </div>

                <div className="space-y-3 relative group">
                  <label className="text-sm font-medium text-white/70 group-focus-within:text-interaction-primary transition-colors">Current Organization</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-white/40">
                      <Building2 className="w-5 h-5" />
                    </div>
                    <input name="organization" required placeholder="Independent / Firm Name" className="w-full bg-white/5 border border-white/10 focus:border-interaction-primary/50 rounded-xl py-3.5 pl-11 pr-4 text-white placeholder:text-white/20 outline-none transition-all shadow-inner" />
                  </div>
                </div>

                <div className="space-y-3 relative group">
                  <label className="text-sm font-medium text-white/70 group-focus-within:text-interaction-primary transition-colors">Years of Experience</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-white/40">
                      <GraduationCap className="w-5 h-5" />
                    </div>
                    <input name="years_experience" required type="number" min="1" placeholder="15" className="w-full bg-white/5 border border-white/10 focus:border-interaction-primary/50 rounded-xl py-3.5 pl-11 pr-4 text-white placeholder:text-white/20 outline-none transition-all shadow-inner" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3 relative group">
                  <label className="text-sm font-medium text-white/70 group-focus-within:text-interaction-primary transition-colors">Primary Industry Expertise</label>
                  <div className="relative">
                    <select name="industry" required className="appearance-none w-full bg-white/5 border border-white/10 focus:border-interaction-primary/50 rounded-xl py-3.5 px-4 text-white outline-none transition-all shadow-inner hover:bg-white/10 cursor-pointer">
                      <option value="" className="bg-[#1a1a1c]">Select Industry...</option>
                      <option value="Technology" className="bg-[#1a1a1c]">Technology</option>
                      <option value="Healthcare" className="bg-[#1a1a1c]">Healthcare</option>
                      <option value="Finance" className="bg-[#1a1a1c]">Finance</option>
                      <option value="Manufacturing" className="bg-[#1a1a1c]">Manufacturing</option>
                      <option value="Energy" className="bg-[#1a1a1c]">Energy</option>
                      <option value="Retail" className="bg-[#1a1a1c]">Retail</option>
                      <option value="Government" className="bg-[#1a1a1c]">Government</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-white/40">
                      <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 relative group">
                  <label className="text-sm font-medium text-white/70 group-focus-within:text-interaction-primary transition-colors">LinkedIn Profile URL</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-interaction-primary/70">
                      <Linkedin className="w-5 h-5" />
                    </div>
                    <input name="linkedin_url" required type="url" placeholder="https://linkedin.com/in/..." className="w-full bg-white/5 border border-white/10 focus:border-interaction-primary/50 rounded-xl py-3.5 pl-11 pr-4 text-white placeholder:text-white/20 outline-none transition-all shadow-inner" />
                  </div>
                </div>
              </div>

              <div className="space-y-3 relative group">
                <label className="text-sm font-medium text-white/70 group-focus-within:text-interaction-primary transition-colors">Specialization Tags</label>
                <div className="relative">
                  <input name="specializations" required placeholder="e.g. Compliance, Policy, EU Markets (comma separated)" className="w-full bg-white/5 border border-white/10 focus:border-interaction-primary/50 rounded-xl py-3.5 px-4 text-white placeholder:text-white/20 outline-none transition-all shadow-inner" />
                </div>
              </div>

              <div className="space-y-3 relative group">
                <label className="text-sm font-medium text-white/70 group-focus-within:text-interaction-primary transition-colors">Professional Bio</label>
                <textarea name="bio" required placeholder="Briefly describe your background, key achievements, and consulting approach..." className="w-full bg-white/5 border border-white/10 focus:border-interaction-primary/50 rounded-xl py-4 px-4 text-white placeholder:text-white/20 outline-none transition-all shadow-inner min-h-[160px] resize-none" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                <div className="space-y-3">
                  <label className="text-sm font-medium text-white/70">Profile Photo</label>
                  <div className="border border-dashed border-white/20 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:bg-white/5 hover:border-interaction-primary/50 transition-all cursor-pointer group">
                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <UploadCloud className="h-6 w-6 text-white/50 group-hover:text-interaction-primary transition-colors" />
                    </div>
                    <span className="text-sm text-white/80 font-medium">Upload Image</span>
                    <span className="text-xs text-white/40 mt-1">JPG, PNG (Max 2MB)</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-sm font-medium text-white/70">CV / Resume</label>
                  <div className="border border-dashed border-white/20 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:bg-white/5 hover:border-interaction-primary/50 transition-all cursor-pointer group">
                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <UploadCloud className="h-6 w-6 text-white/50 group-hover:text-interaction-primary transition-colors" />
                    </div>
                    <span className="text-sm text-white/80 font-medium">Upload Document</span>
                    <span className="text-xs text-white/40 mt-1">PDF, DOCX (Max 5MB)</span>
                  </div>
                </div>
              </div>

              <div className="pt-8">
                <Button 
                  type="submit" 
                  disabled={loading}
                  className="w-full h-14 text-lg font-medium rounded-xl relative overflow-hidden group border-0 bg-interaction-primary hover:bg-interaction-secondary text-white transition-all duration-300"
                >
                  <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -ml-20 group-hover:ml-0 group-hover:w-full w-0 transition-all duration-500 ease-out z-0" />
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {loading ? <><Loader2 className="h-5 w-5 animate-spin" /> Verifying Profile...</> : 'Submit Application Form'}
                  </span>
                </Button>
                <p className="text-center text-xs text-white/40 mt-4">
                  By submitting, you agree to MatrixDigital's <a href="#" className="text-interaction-primary hover:underline">Terms of Service</a> & <a href="#" className="text-interaction-primary hover:underline">Privacy Policy</a>.
                </p>
              </div>

            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// Minimal icon component to replace lucide if needed
function UsersIcon(props: any) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
}
