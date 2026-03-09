import React from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/src/components/ui/Card';
import { Button } from '@/src/components/ui/Button';
import { Input, Textarea } from '@/src/components/ui/Input';
import { CheckCircle2, AlertCircle, Linkedin, Loader2 } from 'lucide-react';

export default function Apply() {
  const [submitted, setSubmitted] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [extracting, setExtracting] = React.useState(false);
  const [error, setError] = React.useState('');
  const [extractMsg, setExtractMsg] = React.useState('');

  const [form, setForm] = React.useState({
    full_name: '',
    professional_title: '',
    organization: '',
    years_experience: '',
    industry: '',
    specializations: '',
    linkedin_url: '',
    bio: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleExtractLinkedIn = async () => {
    if (!form.linkedin_url) return;
    setExtracting(true);
    setExtractMsg('');
    setError('');

    try {
      const res = await fetch('/api/linkedin-extract', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: form.linkedin_url }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Extraction failed');

      const d = data.data;
      setForm(prev => ({
        ...prev,
        full_name: d.full_name || prev.full_name,
        professional_title: d.professional_title || prev.professional_title,
        organization: d.organization || prev.organization,
        bio: d.bio || prev.bio,
        linkedin_url: d.linkedin_url || prev.linkedin_url,
      }));
      setExtractMsg('Profile details extracted! Please review and complete any remaining fields.');
    } catch (err: any) {
      setError(err.message || 'Could not extract profile. Please fill manually.');
    } finally {
      setExtracting(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Submission failed');
      setSubmitted(true);
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
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
            <div className="mb-6 flex items-center gap-2 rounded-md bg-red-50 border border-red-200 p-3 text-sm text-red-700">
              <AlertCircle className="h-4 w-4 flex-shrink-0" />
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* LinkedIn Auto-fill Section */}
            <div className="rounded-lg border border-blue-200 bg-blue-50/50 p-5">
              <div className="flex items-center gap-2 mb-3">
                <Linkedin className="h-5 w-5 text-[#0A66C2]" />
                <h3 className="text-sm font-semibold text-text-main">Quick Fill from LinkedIn</h3>
              </div>
              <p className="text-xs text-text-muted mb-3">Paste your LinkedIn profile URL and we'll auto-fill your details.</p>
              <div className="flex gap-2">
                <Input
                  name="linkedin_url"
                  value={form.linkedin_url}
                  onChange={handleChange}
                  type="url"
                  placeholder="https://linkedin.com/in/your-profile"
                  className="flex-1"
                />
                <Button
                  type="button"
                  variant="secondary"
                  onClick={handleExtractLinkedIn}
                  disabled={extracting || !form.linkedin_url}
                  className="shrink-0 bg-white border-blue-200 hover:bg-blue-50"
                >
                  {extracting ? <><Loader2 className="h-4 w-4 animate-spin mr-2" /> Extracting...</> : 'Extract Profile'}
                </Button>
              </div>
              {extractMsg && (
                <div className="mt-3 flex items-center gap-2 text-xs text-green-700 bg-green-50 border border-green-200 rounded-md p-2">
                  <CheckCircle2 className="h-3.5 w-3.5 flex-shrink-0" />
                  {extractMsg}
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-sm font-medium text-text-main">Full Name</label>
                <Input required name="full_name" value={form.full_name} onChange={handleChange} placeholder="Dr. Sarah Jenkins" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-text-main">Professional Title</label>
                <Input required name="professional_title" value={form.professional_title} onChange={handleChange} placeholder="Regulatory Strategist" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-text-main">Current Organization</label>
                <Input required name="organization" value={form.organization} onChange={handleChange} placeholder="Independent / Firm Name" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-text-main">Years of Experience</label>
                <Input required name="years_experience" value={form.years_experience} onChange={handleChange} type="number" min="1" placeholder="15" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-text-main">Primary Industry Expertise</label>
              <select
                required
                name="industry"
                value={form.industry}
                onChange={handleChange}
                className="flex h-10 w-full rounded-md border border-border-light bg-white px-3 py-2 text-sm text-text-main focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-interaction-primary"
              >
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
              <Input required name="specializations" value={form.specializations} onChange={handleChange} placeholder="e.g. Compliance, Policy, EU Markets" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-text-main">Professional Bio</label>
              <Textarea required name="bio" value={form.bio} onChange={handleChange} placeholder="Briefly describe your background, key achievements, and consulting approach..." className="min-h-[120px]" />
            </div>

            <p className="text-xs text-text-muted">Profile photo and resume uploads are optional and can be added later.</p>

            <div className="pt-6 border-t border-border-light">
              <Button type="submit" isLoading={loading} className="w-full h-12 text-lg">Submit Application</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
