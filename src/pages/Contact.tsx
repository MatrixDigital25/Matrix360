import React from 'react';
import { motion } from 'motion/react';
import { BrainCircuit, Target, Shield, Zap, ArrowRight, BarChart3, Users, Globe, Search, CheckCircle2, Mail, Phone, MapPin } from 'lucide-react';
import { Button } from '@/src/components/ui/Button';
import { Input, Textarea } from '@/src/components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/src/components/ui/Card';

export default function Contact() {
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
          <h1 className="text-4xl font-heading font-bold text-text-main mb-4">Message Sent</h1>
          <p className="text-xl text-text-muted mb-8">
            Thank you for reaching out to Matrix360. Our team will review your message and contact you within 24 hours.
          </p>
          <Button variant="secondary" onClick={() => window.location.href = '/'}>Return Home</Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 bg-primary-bg relative overflow-hidden border-b border-border-light">
        <div className="container mx-auto max-w-6xl relative z-10 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-heading font-bold text-text-main leading-tight mb-6">
              Contact Us
            </h1>
            <p className="text-xl text-text-muted mb-10 leading-relaxed">
              Have a question or want to learn more about Matrix360? We're here to help.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 px-4 bg-secondary-bg">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Info */}
            <div className="space-y-12">
              <div>
                <h2 className="text-3xl font-heading font-bold text-text-main mb-6">Get in Touch</h2>
                <p className="text-lg text-text-muted leading-relaxed">
                  Our team is available to discuss your strategic challenges and how Matrix360 can help you navigate them.
                </p>
              </div>
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-interaction-primary/10 rounded-lg border border-interaction-primary/20">
                    <Mail className="h-6 w-6 text-interaction-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-text-main text-lg mb-1">Email</h4>
                    <p className="text-text-muted">contact@matrix360.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-interaction-primary/10 rounded-lg border border-interaction-primary/20">
                    <Phone className="h-6 w-6 text-interaction-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-text-main text-lg mb-1">Phone</h4>
                    <p className="text-text-muted">+1 (555) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-interaction-primary/10 rounded-lg border border-interaction-primary/20">
                    <MapPin className="h-6 w-6 text-interaction-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-text-main text-lg mb-1">Office</h4>
                    <p className="text-text-muted">123 Strategic Way, San Francisco, CA 94105</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <Card className="bg-white border-border-light shadow-sm">
              <CardHeader>
                <CardTitle>Send a Message</CardTitle>
                <CardDescription>All fields are required.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-text-main">First Name</label>
                      <Input required placeholder="John" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-text-main">Last Name</label>
                      <Input required placeholder="Doe" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-text-main">Email Address</label>
                    <Input required type="email" placeholder="john.doe@example.com" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-text-main">Company Name</label>
                    <Input required placeholder="Acme Corp" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-text-main">Message</label>
                    <Textarea required placeholder="How can we help you?" className="min-h-[150px]" />
                  </div>
                  <Button type="submit" className="w-full h-12 text-lg">Send Message</Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
