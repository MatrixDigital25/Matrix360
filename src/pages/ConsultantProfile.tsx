import React from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/Card';
import { Badge } from '@/src/components/ui/Badge';
import { Button } from '@/src/components/ui/Button';
import { MapPin, Briefcase, Star, MessageSquare, Calendar, CheckCircle2, Award, Globe, Shield, BrainCircuit, Users, Search, ArrowLeft, MoreHorizontal, Share2 } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

export default function ConsultantProfile() {
  const { id } = useParams();

  return (
    <div className="space-y-12 pb-12">
      {/* Navigation & Actions */}
      <div className="flex items-center justify-between">
        <Link to="/consultants" className="flex items-center text-sm font-medium text-text-muted hover:text-interaction-primary transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Network
        </Link>
        <div className="flex items-center gap-2">
          <Button variant="secondary" className="h-9 px-3 bg-white border-border-light">
            <Share2 className="h-4 w-4" />
          </Button>
          <Button variant="secondary" className="h-9 px-3 bg-white border-border-light">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Profile Header Card */}
      <Card className="border-border-light bg-white shadow-sm overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-interaction-primary/10 to-ai-cyan/10 relative">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
        </div>
        <CardContent className="p-5 pt-0 relative">
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-end -mt-12 mb-4">
            <div className="relative">
              <img 
                src="https://picsum.photos/seed/marcus/200/200" 
                alt="Marcus Chen" 
                className="w-32 h-32 rounded-2xl object-cover border-4 border-white shadow-lg"
                referrerPolicy="no-referrer"
              />
              <div className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full bg-alert-opportunity border-2 border-white flex items-center justify-center shadow-md">
                <CheckCircle2 className="h-3 w-3 text-white" />
              </div>
            </div>
            <div className="flex-1 pb-1">
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-2xl font-bold text-text-main">Marcus Chen</h1>
                <Badge variant="secondary" className="bg-interaction-primary/10 text-interaction-primary border-none text-[10px] px-2 py-0">
                  Verified Expert
                </Badge>
              </div>
              <p className="text-sm font-medium text-interaction-primary mb-3">APAC Expansion Lead & Supply Chain Strategist</p>
              <div className="flex flex-wrap gap-4 text-xs text-text-muted">
                <div className="flex items-center">
                  <MapPin className="h-3.5 w-3.5 mr-1.5 text-gray-400" />
                  Singapore
                </div>
                <div className="flex items-center">
                  <Briefcase className="h-3.5 w-3.5 mr-1.5 text-gray-400" />
                  12+ Years Exp
                </div>
                <div className="flex items-center text-amber-500">
                  <Star className="h-3.5 w-3.5 mr-1.5 fill-current" />
                  4.9 (24 Reviews)
                </div>
              </div>
            </div>
            <div className="flex gap-2 w-full md:w-auto pb-1">
              <Button variant="secondary" className="flex-1 md:flex-none bg-white h-10 px-6 text-sm border-border-light">
                <Calendar className="mr-2 h-4 w-4" />
                Book Intro
              </Button>
              <Button variant="primary" className="flex-1 md:flex-none h-10 px-6 text-sm bg-interaction-primary text-white border-none">
                Request Consultation
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Details */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-border-light bg-white shadow-sm">
            <CardHeader className="py-4 px-5 border-b border-border-light">
              <CardTitle className="text-base font-bold">Professional Background</CardTitle>
            </CardHeader>
            <CardContent className="p-5">
              <div className="text-sm text-text-muted leading-relaxed space-y-4">
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
            <CardHeader className="py-4 px-5 border-b border-border-light">
              <CardTitle className="text-base font-bold">Expertise & Strategic Domains</CardTitle>
            </CardHeader>
            <CardContent className="p-5">
              <div className="space-y-6">
                <div>
                  <h4 className="text-[10px] font-bold text-text-muted uppercase tracking-wider mb-3">Industry Focus</h4>
                  <div className="flex flex-wrap gap-2">
                    {['Telecommunications', 'Technology', 'Logistics', 'Manufacturing'].map(industry => (
                      <Badge key={industry} variant="secondary" className="bg-secondary-bg text-text-main py-1 px-3 text-xs font-medium border-border-light">
                        {industry}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-[10px] font-bold text-text-muted uppercase tracking-wider mb-3">Strategic Specialization</h4>
                  <div className="flex flex-wrap gap-2">
                    {[
                      'Regulatory Strategy', 
                      'Market Expansion', 
                      'Stakeholder Engagement', 
                      'Digital Transformation',
                      'Supply Chain Resilience',
                      'M&A Due Diligence'
                    ].map(skill => (
                      <Badge key={skill} variant="secondary" className="bg-interaction-primary/5 text-interaction-primary py-1 px-3 text-xs font-medium border-interaction-primary/20">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border-light bg-white shadow-sm">
            <CardHeader className="py-4 px-5 border-b border-border-light">
              <CardTitle className="text-base font-bold">Key Projects</CardTitle>
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
                    <h3 className="font-bold text-text-main text-sm mb-1">{study.title}</h3>
                    <p className="text-xs font-medium text-interaction-primary mb-3">{study.client}</p>
                    <p className="text-text-muted text-xs mb-4 leading-relaxed">{study.impact}</p>
                    <div className="flex gap-2">
                      {study.tags.map(tag => (
                        <span key={tag} className="text-[9px] uppercase tracking-wider bg-gray-50 text-gray-500 px-2 py-0.5 rounded border border-border-light font-medium">
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
        <div className="space-y-6">
          <Card className="border-border-light bg-white shadow-sm">
            <CardHeader className="py-4 px-5 border-b border-border-light">
              <CardTitle className="text-base font-bold">Credentials</CardTitle>
            </CardHeader>
            <CardContent className="p-5 space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-gray-50 rounded-lg border border-border-light flex-shrink-0">
                  <Award className="w-4 h-4 text-interaction-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-text-main text-xs mb-0.5">MBA, INSEAD</h4>
                  <p className="text-[10px] text-text-muted">Singapore Campus, 2015</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 bg-gray-50 rounded-lg border border-border-light flex-shrink-0">
                  <Globe className="w-4 h-4 text-interaction-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-text-main text-xs mb-0.5">Languages</h4>
                  <p className="text-[10px] text-text-muted">English (Native), Mandarin (Fluent)</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border-light bg-white shadow-sm">
            <CardHeader className="py-4 px-5 border-b border-border-light">
              <CardTitle className="text-base font-bold">Availability</CardTitle>
            </CardHeader>
            <CardContent className="p-5">
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-border-light">
                  <span className="text-xs text-text-muted">Current Status</span>
                  <Badge className="bg-alert-opportunity/10 text-alert-opportunity border-none text-[10px] px-2 py-0">Accepting Projects</Badge>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-border-light">
                  <span className="text-xs text-text-muted">Response Time</span>
                  <span className="text-xs font-bold text-text-main">&lt; 24 hours</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-text-muted">Project Size</span>
                  <span className="text-xs font-bold text-text-main">$50k - $250k</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border-light bg-interaction-primary text-white shadow-md">
            <CardContent className="p-5 text-center">
              <h3 className="font-bold mb-2">Ready to collaborate?</h3>
              <p className="text-xs text-white/80 mb-6">
                Discuss your strategic challenges with Marcus to see if there's a fit.
              </p>
              <Link to="/challenges">
                <Button className="w-full bg-white text-interaction-primary hover:bg-white/90 border-none h-10 text-sm font-bold">
                  Submit a Challenge
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
