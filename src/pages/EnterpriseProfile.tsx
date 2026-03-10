import React from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/Card';
import { Badge } from '@/src/components/ui/Badge';
import { Button } from '@/src/components/ui/Button';
import { 
  Building2, 
  Globe, 
  Users, 
  Target, 
  Briefcase, 
  Activity, 
  ArrowUpRight, 
  Shield, 
  Zap,
  MapPin,
  ExternalLink,
  MessageSquare
} from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

export default function EnterpriseProfile() {
  const { id } = useParams();

  return (
    <div className="space-y-12 pb-12">
      {/* Profile Header */}
      <Card className="border-border-light bg-white shadow-sm overflow-hidden">
        <div className="h-40 bg-brand-primary relative">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/40 to-transparent"></div>
        </div>
        <CardContent className="p-6 pt-0 relative">
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-end -mt-12 mb-4">
            <div className="relative">
              <div className="w-32 h-32 rounded-2xl bg-white p-2 border-4 border-white shadow-lg">
                <div className="w-full h-full rounded-xl bg-secondary-bg flex items-center justify-center">
                  <Building2 className="h-12 w-12 text-brand-primary" />
                </div>
              </div>
            </div>
            <div className="flex-1 pb-1">
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-3xl font-heading font-bold text-text-main">Fintech Global Ltd.</h1>
                <Badge className="bg-ai-cyan/10 text-ai-cyan border-none text-[10px] font-bold uppercase tracking-wider">Enterprise Partner</Badge>
              </div>
              <p className="text-sm font-medium text-text-muted mb-3">Leading the digital transformation of financial services in the APAC region.</p>
              <div className="flex flex-wrap gap-4 text-xs text-text-muted">
                <div className="flex items-center">
                  <MapPin className="h-3.5 w-3.5 mr-1.5 text-gray-400" />
                  Headquarters: Singapore
                </div>
                <div className="flex items-center">
                  <Globe className="h-3.5 w-3.5 mr-1.5 text-gray-400" />
                  fintechglobal.io
                </div>
                <div className="flex items-center">
                  <Users className="h-3.5 w-3.5 mr-1.5 text-gray-400" />
                  5,000+ Employees
                </div>
              </div>
            </div>
            <div className="flex gap-2 w-full md:w-auto pb-1">
              <Button variant="secondary" className="flex-1 md:flex-none bg-white h-10 px-6 text-sm border-border-light">
                <MessageSquare className="mr-2 h-4 w-4" />
                Message
              </Button>
              <Button variant="primary" className="flex-1 md:flex-none h-10 px-6 text-sm bg-interaction-primary text-white border-none">
                Partner with Us
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
          <Card className="border-border-light bg-white shadow-sm">
            <CardHeader className="py-4 px-6 border-b border-border-light">
              <CardTitle className="text-lg font-bold">Organization Overview</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="text-sm text-text-main leading-relaxed space-y-4">
                <p>
                  Fintech Global Ltd. is a premier financial technology organization dedicated to revolutionizing banking and investment services through advanced AI and blockchain integration. Founded in 2012, we have expanded our footprint across 12 countries in the Asia-Pacific region.
                </p>
                <p>
                  Our mission is to provide secure, transparent, and efficient financial solutions to both retail and institutional clients, leveraging the latest in strategic intelligence and automated systems.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border-light bg-white shadow-sm">
            <CardHeader className="py-4 px-6 border-b border-border-light">
              <CardTitle className="text-lg font-bold">Active Strategic Challenges</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border-light">
                {[
                  {
                    title: 'Sustainable Last-Mile Delivery Optimization',
                    domain: 'Logistics & Sustainability',
                    status: 'Seeking Experts',
                    reward: '$75k - $150k'
                  },
                  {
                    title: 'Cross-Border Regulatory Compliance AI',
                    domain: 'Regulatory Tech',
                    status: 'In Scoping',
                    reward: '$120k - $200k'
                  }
                ].map((challenge, i) => (
                  <div key={i} className="p-6 hover:bg-secondary-bg transition-colors group cursor-pointer">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-text-main group-hover:text-interaction-primary transition-colors">{challenge.title}</h3>
                      <Badge variant="secondary" className="bg-interaction-primary/10 text-interaction-primary border-none text-[10px] font-bold uppercase tracking-wider">
                        {challenge.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-text-muted">
                      <span className="flex items-center"><Target className="h-3 w-3 mr-1.5" /> {challenge.domain}</span>
                      <span className="flex items-center"><Zap className="h-3 w-3 mr-1.5 text-alert-opportunity" /> {challenge.reward}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-border-light bg-white shadow-sm">
            <CardHeader className="py-4 px-6 border-b border-border-light">
              <CardTitle className="text-lg font-bold">Recent Intelligence Insights</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border-light">
                {[
                  {
                    title: 'The Future of DeFi in Southeast Asia',
                    author: 'Marcus Chen',
                    date: 'Oct 12, 2023',
                    summary: 'An in-depth analysis of how decentralized finance is reshaping the banking landscape in Vietnam and Thailand.'
                  },
                  {
                    title: 'AI-Driven Risk Management Frameworks',
                    author: 'Matrix AI',
                    date: 'Oct 05, 2023',
                    summary: 'Automated report on the effectiveness of machine learning models in predicting market volatility.'
                  }
                ].map((insight, i) => (
                  <div key={i} className="p-6">
                    <h3 className="font-bold text-text-main text-sm mb-1">{insight.title}</h3>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-[10px] font-bold text-interaction-primary uppercase tracking-wider">{insight.author}</span>
                      <span className="text-[10px] text-text-muted">•</span>
                      <span className="text-[10px] text-text-muted">{insight.date}</span>
                    </div>
                    <p className="text-xs text-text-muted leading-relaxed mb-4">{insight.summary}</p>
                    <Button variant="text" className="h-8 px-0 text-xs text-interaction-primary hover:bg-transparent hover:underline">
                      Read Full Insight <ArrowUpRight className="ml-1 h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          <Card className="border-border-light bg-white shadow-sm">
            <CardHeader className="py-4 px-6 border-b border-border-light">
              <CardTitle className="text-base font-bold">Strategic Domains</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex flex-wrap gap-2">
                {['Fintech', 'AI Strategy', 'APAC Markets', 'Regulatory Compliance', 'Sustainability', 'Digital Banking'].map(domain => (
                  <Badge key={domain} variant="secondary" className="bg-secondary-bg text-text-main py-1 px-3 text-xs font-medium border-border-light">
                    {domain}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-border-light bg-white shadow-sm">
            <CardHeader className="py-4 px-6 border-b border-border-light">
              <CardTitle className="text-base font-bold">Organization Stats</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-border-light">
                <span className="text-xs text-text-muted">Active Projects</span>
                <span className="text-xs font-bold text-text-main">12</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-border-light">
                <span className="text-xs text-text-muted">Expert Engagements</span>
                <span className="text-xs font-bold text-text-main">45</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-text-muted">Intelligence Score</span>
                <Badge className="bg-alert-opportunity/10 text-alert-opportunity border-none text-[10px] font-bold">98/100</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border-light bg-panel-bg shadow-sm">
            <CardHeader className="py-4 px-6 border-b border-border-light">
              <CardTitle className="text-base font-bold">Key Stakeholders</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              {[
                { name: 'David Miller', role: 'Chief Strategy Officer', img: 'https://picsum.photos/seed/david/100/100' },
                { name: 'Elena Rodriguez', role: 'Head of Innovation', img: 'https://picsum.photos/seed/elena/100/100' }
              ].map((person, i) => (
                <div key={i} className="flex items-center gap-3">
                  <img src={person.img} alt={person.name} className="h-10 w-10 rounded-full object-cover border border-border-light" referrerPolicy="no-referrer" />
                  <div>
                    <p className="text-sm font-bold text-text-main">{person.name}</p>
                    <p className="text-[10px] text-text-muted">{person.role}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
