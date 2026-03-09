import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/src/components/ui/Card';
import { Badge } from '@/src/components/ui/Badge';
import { Button } from '@/src/components/ui/Button';
import { Input } from '@/src/components/ui/Input';
import { Search, Filter, MapPin, Briefcase, Star, CheckCircle2, Shield, BrainCircuit, Users, ArrowUpRight } from 'lucide-react';

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
    <div className="space-y-12 pb-12">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold text-text-main">Consultant Network</h1>
          <p className="text-text-muted mt-1">Connect with elite strategic advisors and AI implementation experts.</p>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/apply">
            <Button variant="secondary" className="h-10 px-6 border-border-light bg-white">
              Apply to Join
            </Button>
          </Link>
          <Button className="h-10 px-6 bg-interaction-primary text-white border-none">
            Post a Challenge
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted group-focus-within:text-interaction-primary transition-colors" />
          <Input 
            placeholder="Search by name, industry, or expertise..." 
            className="pl-12 h-12 bg-white shadow-sm border-border-light rounded-xl focus:ring-interaction-primary"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="secondary" className="h-12 px-6 bg-white border-border-light">
          <Filter className="mr-2 h-4 w-4" />
          Filters
        </Button>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredConsultants.map((consultant, i) => (
          <motion.div
            key={consultant.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Card className="h-full flex flex-col hover:shadow-lg transition-all bg-white border-border-light overflow-hidden group">
              <CardContent className="p-5 flex-1 flex flex-col">
                <div className="flex items-start justify-between mb-6">
                  <div className="relative">
                    <img 
                      src={consultant.img} 
                      alt={consultant.name} 
                      className="w-16 h-16 rounded-2xl object-cover border border-border-light group-hover:border-interaction-primary/30 transition-colors"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-alert-opportunity border-2 border-white flex items-center justify-center">
                      <CheckCircle2 className="h-3 w-3 text-white" />
                    </div>
                  </div>
                  <Badge variant="secondary" className="text-[10px] uppercase tracking-wider bg-secondary-bg px-2 py-0.5 text-text-muted border-border-light">{consultant.industry}</Badge>
                </div>
                
                <div className="mb-4">
                  <h3 className="text-lg font-bold text-text-main group-hover:text-interaction-primary transition-colors">{consultant.name}</h3>
                  <p className="text-xs font-medium text-interaction-primary">{consultant.title}</p>
                </div>
                
                <div className="space-y-2 mb-6 flex-1">
                  <div className="flex items-center text-xs text-text-muted">
                    <MapPin className="h-3 w-3 mr-2 text-gray-400" />
                    {consultant.location}
                  </div>
                  <div className="flex items-center text-xs text-text-muted">
                    <Briefcase className="h-3 w-3 mr-2 text-gray-400" />
                    {consultant.exp} Experience
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-6">
                  {consultant.tags.slice(0, 3).map(tag => (
                    <Badge key={tag} variant="default" className="bg-gray-50 text-text-muted border-border-light text-[9px] px-2 py-0 font-medium">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex gap-2 pt-4 border-t border-border-light">
                  <Link to={`/consultants/${consultant.id}`} className="flex-1">
                    <Button variant="secondary" className="w-full h-9 text-xs bg-white border-border-light">
                      Profile
                    </Button>
                  </Link>
                  <Button variant="primary" className="flex-1 h-9 text-xs bg-interaction-primary text-white border-none">
                    Connect
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
