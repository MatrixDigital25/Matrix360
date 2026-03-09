import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/src/components/ui/Card';
import { Badge } from '@/src/components/ui/Badge';
import { Button } from '@/src/components/ui/Button';
import { Input } from '@/src/components/ui/Input';
import { Search, Filter, MapPin, Briefcase, Star, CheckCircle2, Shield, BrainCircuit, Users } from 'lucide-react';

const MOCK_CONSULTANTS = [
  { id: 1, name: 'Dr. Sarah Jenkins', title: 'Regulatory Strategist', industry: 'Healthcare', location: 'London, UK', exp: '15+ yrs', tags: ['Compliance', 'Policy', 'EU Markets'], img: 'https://picsum.photos/seed/sarah/200/200' },
  { id: 2, name: 'Marcus Chen', title: 'APAC Expansion Lead', industry: 'Technology', location: 'Singapore', exp: '12 yrs', tags: ['Market Entry', 'Supply Chain', 'M&A'], img: 'https://picsum.photos/seed/marcus/200/200' },
  { id: 3, name: 'Elena Rostova', title: 'Supply Chain Risk Specialist', industry: 'Manufacturing', location: 'Berlin, DE', exp: '10 yrs', tags: ['Logistics', 'Risk Mitigation', 'Sustainability'], img: 'https://picsum.photos/seed/elena/200/200' },
  { id: 4, name: 'David Okafor', title: 'Digital Transformation Advisor', industry: 'Finance', location: 'New York, USA', exp: '18 yrs', tags: ['Fintech', 'Agile', 'Cloud Architecture'], img: 'https://picsum.photos/seed/david/200/200' },
  { id: 5, name: 'Aisha Patel', title: 'Sustainability Consultant', industry: 'Energy', location: 'Toronto, CA', exp: '8 yrs', tags: ['ESG', 'Renewables', 'Carbon Accounting'], img: 'https://picsum.photos/seed/aisha/200/200' },
  { id: 6, name: 'James Wilson', title: 'Cybersecurity Strategist', industry: 'Defense', location: 'Washington DC, USA', exp: '20 yrs', tags: ['Threat Intel', 'Zero Trust', 'Compliance'], img: 'https://picsum.photos/seed/james/200/200' },
  { id: 7, name: 'Chloe Dubois', title: 'Brand Strategy Director', industry: 'Retail', location: 'Paris, FR', exp: '14 yrs', tags: ['Consumer Behavior', 'Omnichannel', 'Luxury'], img: 'https://picsum.photos/seed/chloe/200/200' },
  { id: 8, name: 'Kenji Sato', title: 'AI Implementation Lead', industry: 'Technology', location: 'Tokyo, JP', exp: '9 yrs', tags: ['Machine Learning', 'Automation', 'Data Strategy'], img: 'https://picsum.photos/seed/kenji/200/200' },
  { id: 9, name: 'Maria Garcia', title: 'Organizational Design Expert', industry: 'Multiple', location: 'Madrid, ES', exp: '16 yrs', tags: ['Change Management', 'Culture', 'Leadership'], img: 'https://picsum.photos/seed/maria/200/200' },
  { id: 10, name: 'Thomas Mueller', title: 'Industrial IoT Consultant', industry: 'Manufacturing', location: 'Munich, DE', exp: '11 yrs', tags: ['Industry 4.0', 'Predictive Maintenance', 'Sensors'], img: 'https://picsum.photos/seed/thomas/200/200' },
  { id: 11, name: 'Olivia Smith', title: 'Public Policy Advisor', industry: 'Government', location: 'Brussels, BE', exp: '13 yrs', tags: ['Lobbying', 'Trade', 'Regulation'], img: 'https://picsum.photos/seed/olivia/200/200' },
  { id: 12, name: 'Liam O\'Connor', title: 'Financial Restructuring Lead', industry: 'Finance', location: 'Dublin, IE', exp: '19 yrs', tags: ['M&A', 'Turnaround', 'Capital Markets'], img: 'https://picsum.photos/seed/liam/200/200' },
  { id: 13, name: 'Fatima Al-Fayed', title: 'Smart City Strategist', industry: 'Real Estate', location: 'Dubai, UAE', exp: '10 yrs', tags: ['Urban Planning', 'PropTech', 'Sustainability'], img: 'https://picsum.photos/seed/fatima/200/200' },
  { id: 14, name: 'Wei Zhang', title: 'E-commerce Operations Expert', industry: 'Retail', location: 'Shanghai, CN', exp: '12 yrs', tags: ['Logistics', 'Platform Strategy', 'Cross-border'], img: 'https://picsum.photos/seed/wei/200/200' },
  { id: 15, name: 'Sophia Rossi', title: 'Biotech Innovation Consultant', industry: 'Healthcare', location: 'Boston, USA', exp: '15 yrs', tags: ['R&D Strategy', 'Clinical Trials', 'Pharma'], img: 'https://picsum.photos/seed/sophia/200/200' },
];

export default function ConsultantGallery() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredConsultants = MOCK_CONSULTANTS.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="flex flex-col min-h-screen bg-secondary-bg">
      {/* Header Section */}
      <section className="pt-32 pb-16 px-4 bg-white border-b border-border-light relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-50 via-white to-white"></div>
        <div className="container mx-auto max-w-7xl relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <h1 className="text-5xl font-heading font-bold text-text-main mb-6">Consultant Network</h1>
            <p className="text-xl text-text-muted leading-relaxed">
              Experienced strategic advisors across industries and policy environments.
            </p>
          </motion.div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input 
                placeholder="Search by name, industry, or expertise..." 
                className="pl-12 h-14 text-base bg-white shadow-sm border-border-light rounded-xl focus:ring-interaction-primary"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex justify-center gap-4 mt-6">
              <Button variant="secondary" className="h-10 px-6 bg-white">
                <Filter className="mr-2 h-4 w-4" />
                Filters
              </Button>
              <Link to="/apply">
                <Button variant="primary" className="h-10 px-6">
                  Apply to Join Network
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Governance Signals */}
      <section className="py-8 bg-interaction-primary/5 border-b border-interaction-primary/10">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col md:flex-row justify-center items-center gap-8 text-sm text-text-main font-medium">
            <div className="flex items-center">
              <Shield className="h-5 w-5 text-interaction-primary mr-2" />
              Consultant profiles are reviewed prior to publication.
            </div>
            <div className="hidden md:block w-1 h-1 rounded-full bg-gray-300"></div>
            <div className="flex items-center">
              <Briefcase className="h-5 w-5 text-interaction-primary mr-2" />
              Engagements are managed through structured project workspaces.
            </div>
            <div className="hidden md:block w-1 h-1 rounded-full bg-gray-300"></div>
            <div className="flex items-center">
              <CheckCircle2 className="h-5 w-5 text-interaction-primary mr-2" />
              All collaboration occurs within a secure platform environment.
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredConsultants.map((consultant, i) => (
              <motion.div
                key={consultant.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                className="relative group"
              >
                <Card className="h-full flex flex-col hover:shadow-md transition-all bg-white border-border-light overflow-hidden">
                  <CardContent className="p-6 flex-1 flex flex-col relative z-10 bg-white">
                    <div className="flex items-start justify-between mb-6">
                      <div className="relative">
                        <img 
                          src={consultant.img} 
                          alt={consultant.name} 
                          className="w-20 h-20 rounded-2xl object-cover border border-border-light group-hover:border-interaction-primary/30 transition-colors"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute -bottom-2 -right-2 h-6 w-6 rounded-full bg-alert-opportunity border-2 border-white flex items-center justify-center">
                          <CheckCircle2 className="h-3 w-3 text-white" />
                        </div>
                      </div>
                      <Badge variant="secondary" className="text-[10px] uppercase tracking-wider bg-gray-50 px-3 py-1 text-text-muted border-border-light">{consultant.industry}</Badge>
                    </div>
                    
                    <h3 className="text-xl font-bold text-text-main mb-1 group-hover:text-interaction-primary transition-colors">{consultant.name}</h3>
                    <p className="text-sm font-medium text-interaction-primary mb-4">{consultant.title}</p>
                    
                    <div className="space-y-3 mb-6 flex-1">
                      <div className="flex items-center text-sm text-text-muted">
                        <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                        {consultant.location}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-auto pt-6 border-t border-border-light">
                      {consultant.tags.map(tag => (
                        <Badge key={tag} variant="default" className="bg-gray-50 text-text-muted border-border-light text-[10px] px-2 py-0.5 font-medium">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>

                  {/* Hover Actions Overlay */}
                  <div className="absolute inset-0 bg-white/95 backdrop-blur-sm z-20 flex flex-col items-center justify-center p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h3 className="text-xl font-bold text-text-main mb-2">{consultant.name}</h3>
                    <p className="text-sm text-text-muted mb-6 text-center">{consultant.title}</p>
                    <div className="flex flex-col gap-3 w-full max-w-xs">
                      <Link to={`/consultants/${consultant.id}`} className="w-full">
                        <Button variant="secondary" className="w-full h-12 bg-white">
                          View Profile
                        </Button>
                      </Link>
                      <Button variant="primary" className="w-full h-12">
                        Request Consultation
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Collaboration Model Section */}
      <section className="py-24 px-4 bg-white border-t border-border-light">
        <div className="container mx-auto max-w-5xl text-center">
          <div className="h-16 w-16 rounded-2xl bg-interaction-primary/10 flex items-center justify-center mx-auto mb-6">
            <BrainCircuit className="h-8 w-8 text-interaction-primary" />
          </div>
          <h2 className="text-4xl font-heading font-bold text-text-main mb-6">Expert Collaboration Powered by AI</h2>
          <p className="text-xl text-text-muted leading-relaxed max-w-3xl mx-auto mb-12">
            Matrix360 enables consultants and organizations to collaborate through structured digital workspaces supported by AI-driven research and intelligence tools.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            <div className="p-6 bg-secondary-bg rounded-xl border border-border-light">
              <Users className="h-6 w-6 text-interaction-primary mb-4" />
              <h3 className="text-lg font-bold text-text-main mb-2">Secure Workspaces</h3>
              <p className="text-sm text-text-muted leading-relaxed">Dedicated environments for document sharing, communication, and project management.</p>
            </div>
            <div className="p-6 bg-secondary-bg rounded-xl border border-border-light">
              <Search className="h-6 w-6 text-interaction-primary mb-4" />
              <h3 className="text-lg font-bold text-text-main mb-2">Intelligence Tools</h3>
              <p className="text-sm text-text-muted leading-relaxed">Access to AI-powered market research, regulatory tracking, and sentiment analysis.</p>
            </div>
            <div className="p-6 bg-secondary-bg rounded-xl border border-border-light">
              <Shield className="h-6 w-6 text-interaction-primary mb-4" />
              <h3 className="text-lg font-bold text-text-main mb-2">Enterprise Governance</h3>
              <p className="text-sm text-text-muted leading-relaxed">Full audit trails, access controls, and compliance monitoring for all engagements.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
