import React from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/src/components/ui/Card';
import { Button } from '@/src/components/ui/Button';
import { Input, Textarea } from '@/src/components/ui/Input';
import { UploadCloud, CheckCircle2, Loader2 } from 'lucide-react';

// Helper to get/set applications from localStorage
function getStoredApplications() {
  try {
    return JSON.parse(localStorage.getItem('matrix360_applications') || '[]');
  } catch { return []; }
}

function addStoredApplication(app: any) {
  const apps = getStoredApplications();
  const newApp = { ...app, id: Date.now(), status: 'pending', created_at: new Date().toISOString() };
  apps.unshift(newApp);
  localStorage.setItem('matrix360_applications', JSON.stringify(apps));
  return newApp;
}

export default function Apply() {
  const [submitted, setSubmitted] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');

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
      // Try server API first (works in local dev with Express)
      const res = await fetch('/api/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setSubmitted(true);
        return;
      }
    } catch {
      // Server not available (Vercel static deploy) — use localStorage
    }

    // Fallback: save to localStorage
    addStoredApplication(payload);
    setSubmitted(true);
    setLoading(false);
  };

  if (submitted) {
    return (
      <div className="container mx-auto px-4 py-20 max-w-2xl text-center">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
          <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
            <CheckCircle2 className="h-10 w-10 text-alert-opportunity" />
          </div>
          <h1 className="text-4xl font-heading font-bold text-text-main mb-4">Application Received</h1>
          <p className="text-xl text-text-muted mb-8">
            Thank you for applying to join the Matrix360 Consultant Network. Our team will review your profile and contact you within 48 hours.
          </p>
          <Button variant="secondary" onClick={() => window.location.href = '/'}>Return Home</Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10 text-center"
      >
        <h1 className="text-4xl font-heading font-bold text-text-main mb-4">Join the Expert Network</h1>
        <p className="text-lg text-text-muted">
          Apply to become a verified consultant on the Matrix360 platform and connect with leading enterprises.
        </p>
      </motion.div>

      <Card className="border-border-light bg-white shadow-sm">
        <CardHeader>
          <CardTitle>Consultant Application</CardTitle>
          <CardDescription>All fields are required unless marked optional.</CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="rounded-md bg-red-50 border border-red-200 p-4 text-sm text-red-700 mb-6">{error}</div>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-sm font-medium text-text-main">Full Name</label>
                <Input name="full_name" required placeholder="Dr. Sarah Jenkins" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-text-main">Professional Title</label>
                <Input name="professional_title" required placeholder="Regulatory Strategist" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-text-main">Current Organization</label>
                <Input name="organization" required placeholder="Independent / Firm Name" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-text-main">Years of Experience</label>
                <Input name="years_experience" required type="number" min="1" placeholder="15" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-text-main">Primary Industry Expertise</label>
              <select name="industry" required className="flex h-10 w-full rounded-md border border-border-light bg-white px-3 py-2 text-sm text-text-main focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-interaction-primary">
                <option value="">Select Industry...</option>
                <option value="Technology">Technology</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Finance">Finance</option>
                <option value="Manufacturing">Manufacturing</option>
                <option value="Energy">Energy</option>
                <option value="Retail">Retail</option>
                <option value="Government">Government</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-text-main">Specialization Tags (Comma separated)</label>
              <Input name="specializations" required placeholder="e.g. Compliance, Policy, EU Markets" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-text-main">LinkedIn Profile URL</label>
              <Input name="linkedin_url" required type="url" placeholder="https://linkedin.com/in/..." />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-text-main">Professional Bio</label>
              <Textarea name="bio" required placeholder="Briefly describe your background, key achievements, and consulting approach..." className="min-h-[120px]" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-sm font-medium text-text-main">Profile Photo</label>
                <div className="border-2 border-dashed border-border-light rounded-lg p-5 flex flex-col items-center justify-center text-center hover:bg-gray-50 transition-colors cursor-pointer">
                  <UploadCloud className="h-8 w-8 text-gray-400 mb-2" />
                  <span className="text-sm text-text-main">Click to upload image</span>
                  <span className="text-xs text-text-muted mt-1">JPG, PNG (Max 2MB)</span>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-text-main">CV / Resume</label>
                <div className="border-2 border-dashed border-border-light rounded-lg p-5 flex flex-col items-center justify-center text-center hover:bg-gray-50 transition-colors cursor-pointer">
                  <UploadCloud className="h-8 w-8 text-gray-400 mb-2" />
                  <span className="text-sm text-text-main">Click to upload document</span>
                  <span className="text-xs text-text-muted mt-1">PDF, DOCX (Max 5MB)</span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-border-light">
              <Button type="submit" className="w-full h-12 text-lg" disabled={loading}>
                {loading ? <><Loader2 className="h-5 w-5 animate-spin mr-2" /> Submitting...</> : 'Submit Application'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
