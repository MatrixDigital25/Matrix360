import React from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/src/components/ui/Card';
import { Button } from '@/src/components/ui/Button';
import { Input, Textarea } from '@/src/components/ui/Input';
import { UploadCloud, CheckCircle2 } from 'lucide-react';

export default function Apply() {
  const [submitted, setSubmitted] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => setSubmitted(true), 1000);
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
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-sm font-medium text-text-main">Full Name</label>
                <Input required placeholder="Dr. Sarah Jenkins" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-text-main">Professional Title</label>
                <Input required placeholder="Regulatory Strategist" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-text-main">Current Organization</label>
                <Input required placeholder="Independent / Firm Name" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-text-main">Years of Experience</label>
                <Input required type="number" min="1" placeholder="15" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-text-main">Primary Industry Expertise</label>
              <select className="flex h-10 w-full rounded-md border border-border-light bg-white px-3 py-2 text-sm text-text-main focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-interaction-primary">
                <option value="">Select Industry...</option>
                <option value="technology">Technology</option>
                <option value="healthcare">Healthcare</option>
                <option value="finance">Finance</option>
                <option value="manufacturing">Manufacturing</option>
                <option value="energy">Energy</option>
                <option value="retail">Retail</option>
                <option value="government">Government</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-text-main">Specialization Tags (Comma separated)</label>
              <Input required placeholder="e.g. Compliance, Policy, EU Markets" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-text-main">LinkedIn Profile URL</label>
              <Input required type="url" placeholder="https://linkedin.com/in/..." />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-text-main">Professional Bio</label>
              <Textarea required placeholder="Briefly describe your background, key achievements, and consulting approach..." className="min-h-[120px]" />
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
              <Button type="submit" className="w-full h-12 text-lg">Submit Application</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
