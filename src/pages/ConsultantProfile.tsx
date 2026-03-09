import React from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/Card';
import { Badge } from '@/src/components/ui/Badge';
import { Button } from '@/src/components/ui/Button';
import { MapPin, Briefcase, Star, MessageSquare, Calendar, CheckCircle2, Award, Globe, Shield, BrainCircuit, Users, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ConsultantProfile() {
  return (
    <div className="flex flex-col min-h-screen bg-secondary-bg">
      {/* Governance Signals */}
      <section className="py-4 bg-interaction-primary/5 border-b border-interaction-primary/10">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex flex-col md:flex-row justify-center items-center gap-6 text-xs text-text-main font-medium">
            <div className="flex items-center">
              <Shield className="h-4 w-4 text-interaction-primary mr-2" />
              Verified Expert Profile
            </div>
            <div className="hidden md:block w-1 h-1 rounded-full bg-gray-300"></div>
            <div className="flex items-center">
              <Briefcase className="h-4 w-4 text-interaction-primary mr-2" />
              Managed Engagements
            </div>
            <div className="hidden md:block w-1 h-1 rounded-full bg-gray-300"></div>
            <div className="flex items-center">
              <CheckCircle2 className="h-4 w-4 text-interaction-primary mr-2" />
              Secure Collaboration
            </div>
          </div>
        </div>
      </section>

      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-5xl mx-auto space-y-8 py-12 px-4"
      >
        {/* Profile Header */}
        <Card className="border-border-light bg-white shadow-sm overflow-hidden">
          <div className="h-48 bg-gradient-to-r from-interaction-primary/20 to-ai-cyan/20 relative">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          </div>
          <CardContent className="p-8 pt-0 relative">
            <div className="flex flex-col md:flex-row gap-8 items-start md:items-end -mt-20 mb-8">
              <div className="relative">
                <img 
                  src="https://picsum.photos/seed/marcus/200/200" 
                  alt="Marcus Chen" 
                  className="w-40 h-40 rounded-3xl object-cover border-4 border-white shadow-xl"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full bg-alert-opportunity border-4 border-white flex items-center justify-center shadow-lg">
                  <CheckCircle2 className="h-4 w-4 text-white" />
                </div>
              </div>
              <div className="flex-1 pb-2">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-4xl font-heading font-bold text-text-main">Marcus Chen</h1>
                  <Badge variant="secondary" className="bg-interaction-primary/10 text-interaction-primary border-interaction-primary/20 px-3 py-1">
                    Curated Expert
                  </Badge>
                </div>
                <p className="text-xl font-medium text-interaction-primary mb-4">APAC Expansion Lead & Supply Chain Strategist</p>
                <div className="flex flex-wrap gap-6 text-sm text-text-muted">
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 mr-2 text-gray-400" />
                    Singapore
                  </div>
                  <div className="flex items-center">
                    <Briefcase className="h-5 w-5 mr-2 text-gray-400" />
                    12+ Years Experience
                  </div>
                  <div className="flex items-center text-amber-500">
                    <Star className="h-5 w-5 mr-2 fill-current" />
                    4.9 (24 Reviews)
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto pb-2">
                <Button variant="secondary" className="flex-1 md:flex-none bg-white h-12 px-8 text-base border-border-light">
                  <Calendar className="mr-2 h-5 w-5" />
                  Book Intro
                </Button>
                <Button variant="primary" className="flex-1 md:flex-none shadow-md h-12 px-8 text-base">
                  <MessageSquare className="mr-2 h-5 w-5" />
                  Request Consultation
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Details */}
          <div className="lg:col-span-2 space-y-8">
            <Card className="border-border-light bg-white shadow-sm">
              <CardHeader className="pb-4 border-b border-border-light">
                <CardTitle className="text-xl">Professional Background</CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="prose prose-slate max-w-none text-text-muted text-lg leading-relaxed space-y-4">
                  <p>
                    Marcus Chen is a strategic advisor specializing in telecommunications policy and regulatory environments across the APAC region. With over 12 years of experience working with industry bodies and government agencies, he supports organizations navigating complex regulatory landscapes and supply chain disruptions.
                  </p>
                  <p>
                    Prior to joining the Matrix360 network, Marcus held senior leadership roles at global logistics firms where he led market entry strategies for emerging markets in Southeast Asia.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border-light bg-white shadow-sm">
              <CardHeader className="pb-4 border-b border-border-light">
                <CardTitle className="text-xl">Expertise & Strategic Domains</CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="space-y-8">
                  <div>
                    <h4 className="text-sm font-bold text-text-muted uppercase tracking-wider mb-4">Industry Focus</h4>
                    <div className="flex flex-wrap gap-3">
                      {['Telecommunications', 'Technology', 'Logistics', 'Manufacturing'].map(industry => (
                        <Badge key={industry} variant="secondary" className="bg-gray-50 text-text-main py-2 px-4 text-sm font-medium border-border-light">
                          {industry}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-text-muted uppercase tracking-wider mb-4">Strategic Specialization</h4>
                    <div className="flex flex-wrap gap-3">
                      {[
                        'Regulatory Strategy', 
                        'Market Expansion', 
                        'Stakeholder Engagement', 
                        'Digital Transformation',
                        'Supply Chain Resilience',
                        'M&A Due Diligence'
                      ].map(skill => (
                        <Badge key={skill} variant="secondary" className="bg-interaction-primary/5 text-interaction-primary py-2 px-4 text-sm font-medium border-interaction-primary/20">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border-light bg-white shadow-sm">
              <CardHeader className="pb-4 border-b border-border-light">
                <CardTitle className="text-lg">Key Projects</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-border-light">
                  {[
                    {
                      title: 'Cloud Infrastructure Rollout in SE Asia',
                      client: 'Global SaaS Provider',
                      impact: 'Reduced time-to-market by 4 months and navigated complex data sovereignty laws across 3 jurisdictions.',
                      tags: ['Cloud', 'Compliance']
                    },
                    {
                      title: 'Supply Chain Diversification',
                      client: 'Consumer Electronics Manufacturer',
                      impact: 'Identified and onboarded 12 new tier-2 suppliers in Vietnam and Thailand, reducing single-country dependency by 40%.',
                      tags: ['Supply Chain', 'Manufacturing']
                    }
                  ].map((study, i) => (
                    <div key={i} className="p-5">
                      <h3 className="font-semibold text-text-main text-base mb-1">{study.title}</h3>
                      <p className="text-sm font-medium text-interaction-primary mb-3">{study.client}</p>
                      <p className="text-text-muted text-sm mb-4 leading-relaxed">{study.impact}</p>
                      <div className="flex gap-2">
                        {study.tags.map(tag => (
                          <span key={tag} className="text-[10px] uppercase tracking-wider bg-gray-100 text-gray-600 px-2 py-1 rounded-md font-medium">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column: Sidebar */}
          <div className="space-y-8">
            <Card className="border-border-light bg-white shadow-sm">
              <CardHeader className="pb-4 border-b border-border-light">
                <CardTitle className="text-lg">Credentials</CardTitle>
              </CardHeader>
              <CardContent className="p-5 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-2.5 bg-gray-50 rounded-lg border border-border-light flex-shrink-0">
                    <Award className="w-5 h-5 text-interaction-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-text-main text-sm mb-0.5">MBA, INSEAD</h4>
                    <p className="text-xs text-text-muted">Singapore Campus, 2015</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-2.5 bg-gray-50 rounded-lg border border-border-light flex-shrink-0">
                    <Globe className="w-5 h-5 text-interaction-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-text-main text-sm mb-0.5">Languages</h4>
                    <p className="text-xs text-text-muted">English (Native), Mandarin (Fluent)</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border-light bg-white shadow-sm">
              <CardHeader className="pb-4 border-b border-border-light">
                <CardTitle className="text-lg">Availability</CardTitle>
              </CardHeader>
              <CardContent className="p-5">
                <div className="space-y-5">
                  <div className="flex justify-between items-center pb-5 border-b border-border-light">
                    <span className="text-sm text-text-muted">Current Status</span>
                    <Badge variant="green" className="bg-green-100 text-green-700 hover:bg-green-100">Accepting Projects</Badge>
                  </div>
                  <div className="flex justify-between items-center pb-5 border-b border-border-light">
                    <span className="text-sm text-text-muted">Response Time</span>
                    <span className="text-sm font-medium text-text-main">&lt; 24 hours</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-text-muted">Project Size</span>
                    <span className="text-sm font-medium text-text-main">$50k - $250k</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border-light bg-interaction-primary/5 shadow-sm">
              <CardContent className="p-5 text-center">
                <h3 className="font-semibold text-text-main mb-2">Ready to collaborate?</h3>
                <p className="text-sm text-text-muted mb-6">
                  Discuss your strategic challenges with Marcus to see if there's a fit.
                </p>
                <Link to="/enterprise/challenge">
                  <Button variant="primary" className="w-full shadow-sm h-10">
                    Submit a Challenge
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.div>

      {/* Collaboration Model Section */}
      <section className="py-16 px-4 bg-white border-t border-border-light mt-auto">
        <div className="container mx-auto max-w-5xl text-center">
          <div className="h-12 w-12 rounded-xl bg-interaction-primary/10 flex items-center justify-center mx-auto mb-4">
            <BrainCircuit className="h-6 w-6 text-interaction-primary" />
          </div>
          <h2 className="text-2xl font-heading font-bold text-text-main mb-4">Expert Collaboration Powered by AI</h2>
          <p className="text-lg text-text-muted leading-relaxed max-w-3xl mx-auto mb-8">
            Engagements with Marcus are managed through Matrix360's secure digital workspaces, supported by AI-driven research and intelligence tools.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="p-5 bg-secondary-bg rounded-xl border border-border-light">
              <Users className="h-5 w-5 text-interaction-primary mb-3" />
              <h3 className="text-base font-bold text-text-main mb-2">Secure Workspaces</h3>
              <p className="text-sm text-text-muted leading-relaxed">Dedicated environments for document sharing, communication, and project management.</p>
            </div>
            <div className="p-5 bg-secondary-bg rounded-xl border border-border-light">
              <Search className="h-5 w-5 text-interaction-primary mb-3" />
              <h3 className="text-base font-bold text-text-main mb-2">Intelligence Tools</h3>
              <p className="text-sm text-text-muted leading-relaxed">Access to AI-powered market research, regulatory tracking, and sentiment analysis.</p>
            </div>
            <div className="p-5 bg-secondary-bg rounded-xl border border-border-light">
              <Shield className="h-5 w-5 text-interaction-primary mb-3" />
              <h3 className="text-base font-bold text-text-main mb-2">Enterprise Governance</h3>
              <p className="text-sm text-text-muted leading-relaxed">Full audit trails, access controls, and compliance monitoring for all engagements.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
