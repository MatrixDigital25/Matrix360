import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent } from '@/src/components/ui/Card';
import { Badge } from '@/src/components/ui/Badge';
import { Button } from '@/src/components/ui/Button';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  MapPin, 
  Star, 
  Globe, 
  Briefcase, 
  MessageSquare, 
  UserPlus,
  ChevronRight,
  ShieldCheck,
  Zap,
  Users,
  Loader2,
  Award,
  Clock,
  Target,
  Sparkles,
  ExternalLink,
  Video,
  Layout
} from 'lucide-react';
import { cn } from '@/src/utils/cn';

const CONSULTANTS = [
  {
    id: 1,
    name: 'Dr. Sarah Jenkins',
    role: 'Lead Strategic Consultant',
    expertise: ['Regulatory Compliance', 'Fintech', 'APAC Markets'],
    rating: 4.9,
    projects: 42,
    location: 'Singapore',
    availability: 'Available',
    avatar: 'https://picsum.photos/seed/sarah/200/200',
    verified: true
  },
  {
    id: 2,
    name: 'Marcus Chen',
    role: 'Supply Chain Architect',
    expertise: ['Logistics', 'Manufacturing', 'Vietnam Entry'],
    rating: 4.8,
    projects: 31,
    location: 'Ho Chi Minh City',
    availability: 'Limited',
    avatar: 'https://picsum.photos/seed/marcus/200/200',
    verified: true
  },
  {
    id: 3,
    name: 'Elena Rodriguez',
    role: 'Digital Transformation Lead',
    expertise: ['Cloud Strategy', 'AI Integration', 'Europe'],
    rating: 5.0,
    projects: 18,
    location: 'Madrid',
    availability: 'Available',
    avatar: 'https://picsum.photos/seed/elena/200/200',
    verified: false
  },
  {
    id: 4,
    name: 'David Park',
    role: 'Market Intelligence Analyst',
    expertise: ['Consumer Trends', 'Data Analytics', 'South Korea'],
    rating: 4.7,
    projects: 25,
    location: 'Seoul',
    availability: 'Busy',
    avatar: 'https://picsum.photos/seed/david/200/200',
    verified: true
  }
];

const INDUSTRY_FILTERS = ['All', 'Technology', 'Finance', 'Healthcare', 'Manufacturing', 'Energy', 'Retail'];
const REGION_FILTERS = ['All', 'Global', 'APAC', 'EMEA', 'North America', 'LATAM'];
const TRANSFORMATION_FILTERS = ['All', 'Digital', 'AI Strategy', 'Supply Chain', 'ESG', 'Market Entry', 'M&A'];

export default function NetworkExplorer() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('All');
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [selectedTransformation, setSelectedTransformation] = useState('All');
  const [consultants, setConsultants] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchConsultants = async () => {
      setIsLoading(true);
      try {
        // Mocking elite consultant data
        await new Promise(resolve => setTimeout(resolve, 1000));
        const eliteConsultants = [
          {
            id: 1,
            name: 'Dr. Sarah Jenkins',
            title: 'Senior Strategic Advisor',
            expertiseDomain: 'Enterprise Risk & Compliance',
            yearsExperience: 18,
            geographicExperience: ['Singapore', 'Hong Kong', 'London'],
            region: 'APAC',
            industry: 'Finance',
            transformationCategory: 'Compliance',
            specialties: ['Regulatory AI', 'Cross-border Fintech', 'Risk Modeling'],
            highlights: ['Led $2B banking merger compliance', 'Architected regional ESG framework'],
            aiStrategyRating: 4.9,
            availabilityStatus: 'Available',
            avatar: 'https://picsum.photos/seed/sarah/200/200',
            verified: true
          },
          {
            id: 2,
            name: 'Marcus Thorne',
            title: 'Operations Strategy Partner',
            expertiseDomain: 'Supply Chain Resilience',
            yearsExperience: 22,
            geographicExperience: ['Vietnam', 'Germany', 'USA'],
            region: 'Global',
            industry: 'Manufacturing',
            transformationCategory: 'Supply Chain',
            specialties: ['Logistics Automation', 'Lean Manufacturing', 'Global Sourcing'],
            highlights: ['Optimized global logistics for Fortune 500', 'Reduced supply chain costs by 30%'],
            aiStrategyRating: 4.7,
            availabilityStatus: 'Limited',
            avatar: 'https://picsum.photos/seed/marcus/200/200',
            verified: true
          },
          {
            id: 3,
            name: 'Elena Rodriguez',
            title: 'Digital Transformation Director',
            expertiseDomain: 'AI & Cloud Infrastructure',
            yearsExperience: 15,
            geographicExperience: ['Spain', 'Brazil', 'UAE'],
            region: 'EMEA',
            industry: 'Technology',
            transformationCategory: 'AI Strategy',
            specialties: ['Generative AI Integration', 'Cloud Native Strategy', 'Digital Culture'],
            highlights: ['Implemented enterprise-wide GenAI for retail giant', 'Scaled cloud ops for unicorn startup'],
            aiStrategyRating: 5.0,
            availabilityStatus: 'Available',
            avatar: 'https://picsum.photos/seed/elena/200/200',
            verified: true
          },
          {
            id: 4,
            name: 'Jonathan Vance',
            title: 'Market Entry Strategist',
            expertiseDomain: 'Growth & Expansion',
            yearsExperience: 20,
            geographicExperience: ['Japan', 'South Korea', 'Australia'],
            region: 'APAC',
            industry: 'Retail',
            transformationCategory: 'Market Entry',
            specialties: ['Consumer Intelligence', 'JV Structuring', 'Brand Localization'],
            highlights: ['Launched 500+ stores in Asian markets', 'Secured strategic partnerships for luxury brands'],
            aiStrategyRating: 4.5,
            availabilityStatus: 'Busy',
            avatar: 'https://picsum.photos/seed/jonathan/200/200',
            verified: true
          }
        ];
        setConsultants(eliteConsultants);
      } catch (error) {
        console.error('Failed to fetch consultants:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchConsultants();
  }, []);

  const filteredConsultants = consultants.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         c.expertiseDomain.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesIndustry = selectedIndustry === 'All' || c.industry === selectedIndustry;
    const matchesRegion = selectedRegion === 'All' || c.region === selectedRegion;
    const matchesTransformation = selectedTransformation === 'All' || c.transformationCategory === selectedTransformation;
    return matchesSearch && matchesIndustry && matchesRegion && matchesTransformation;
  });

  return (
    <div className="space-y-6">
      {/* Header & Search */}
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-heading font-bold text-text-main mb-2">Elite Advisory Network</h1>
          <p className="text-text-muted text-sm max-w-2xl">Access a global network of senior strategic advisors, transformation architects, and specialized experts vetted for enterprise-scale initiatives.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-text-muted" />
            <input 
              type="text" 
              placeholder="Search by name, expertise..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-border-light rounded-2xl pl-12 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-interaction-primary/10 focus:border-interaction-primary transition-all shadow-sm"
            />
          </div>
          <div className="flex items-center gap-3">
            <Button variant="secondary" className="h-12 border-border-light shadow-sm px-4 md:px-6 rounded-2xl flex-1 md:flex-none">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
            <Button variant="primary" className="h-12 shadow-md px-4 md:px-6 rounded-2xl flex-1 md:flex-none">
              <Globe className="h-4 w-4 mr-2" />
              Map
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-text-muted uppercase tracking-widest ml-1">Industry</label>
            <select 
              value={selectedIndustry}
              onChange={(e) => setSelectedIndustry(e.target.value)}
              className="w-full bg-white border border-border-light rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-interaction-primary transition-colors"
            >
              {INDUSTRY_FILTERS.map(f => <option key={f} value={f}>{f}</option>)}
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-text-muted uppercase tracking-widest ml-1">Region</label>
            <select 
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="w-full bg-white border border-border-light rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-interaction-primary transition-colors"
            >
              {REGION_FILTERS.map(f => <option key={f} value={f}>{f}</option>)}
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-text-muted uppercase tracking-widest ml-1">Transformation</label>
            <select 
              value={selectedTransformation}
              onChange={(e) => setSelectedTransformation(e.target.value)}
              className="w-full bg-white border border-border-light rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-interaction-primary transition-colors"
            >
              {TRANSFORMATION_FILTERS.map(f => <option key={f} value={f}>{f}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Network Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <Card className="bg-interaction-primary/5 border-interaction-primary/10 shadow-none">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="h-10 w-10 rounded-xl bg-white flex items-center justify-center shadow-sm">
              <Users className="h-5 w-5 text-interaction-primary" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-interaction-primary uppercase tracking-wider">Total Experts</p>
              <p className="text-xl font-bold text-text-main">1,248</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-alert-opportunity/5 border-alert-opportunity/10 shadow-none">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="h-10 w-10 rounded-xl bg-white flex items-center justify-center shadow-sm">
              <Briefcase className="h-5 w-5 text-alert-opportunity" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-alert-opportunity uppercase tracking-wider">Active Projects</p>
              <p className="text-xl font-bold text-text-main">312</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-ai-violet/5 border-ai-violet/10 shadow-none">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="h-10 w-10 rounded-xl bg-white flex items-center justify-center shadow-sm">
              <Zap className="h-5 w-5 text-ai-violet" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-ai-violet uppercase tracking-wider">AI Support Agents</p>
              <p className="text-xl font-bold text-text-main">84</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Consultant Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {isLoading ? (
          <div className="col-span-full flex justify-center py-12">
            <Loader2 className="h-8 w-8 text-interaction-primary animate-spin" />
          </div>
        ) : filteredConsultants.map((consultant) => (
          <motion.div
            key={consultant.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="group hover:shadow-2xl transition-all border-border-light overflow-hidden bg-white rounded-3xl">
              <CardContent className="p-0">
                <div className="p-4 md:p-8">
                  <div className="flex flex-col md:flex-row gap-6 md:gap-8">
                    <div className="relative shrink-0 flex flex-row md:flex-col items-center gap-4">
                      <div className="relative">
                        <img 
                          src={consultant.avatar} 
                          alt={consultant.name} 
                          className="w-20 h-20 md:w-28 md:h-28 rounded-[1.5rem] md:rounded-[2rem] object-cover border-4 border-white shadow-xl"
                          referrerPolicy="no-referrer"
                        />
                        <div className={cn(
                          "absolute -bottom-1 -right-1 h-5 w-5 md:h-6 md:w-6 rounded-full border-4 border-white shadow-lg",
                          consultant.availabilityStatus === 'Available' ? "bg-emerald-500" : 
                          consultant.availabilityStatus === 'Limited' ? "bg-amber-500" : "bg-rose-500"
                        )} />
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="flex items-center gap-1 mb-1">
                          <Sparkles className="h-3 w-3 text-ai-violet" />
                          <span className="text-[9px] md:text-[10px] font-bold text-text-muted uppercase tracking-widest">AI Strategy</span>
                        </div>
                        <div className="flex items-center gap-1 bg-ai-violet/5 px-2 md:px-3 py-0.5 md:py-1 rounded-full border border-ai-violet/10">
                          <Star className="h-2.5 w-2.5 md:h-3 md:w-3 text-ai-violet fill-ai-violet" />
                          <span className="text-xs font-bold text-ai-violet">{consultant.aiStrategyRating}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-lg md:text-xl font-heading font-bold text-text-main truncate group-hover:text-interaction-primary transition-colors">
                              {consultant.name}
                            </h3>
                            {consultant.verified && <ShieldCheck className="h-4 w-4 md:h-5 md:w-5 text-interaction-primary" />}
                          </div>
                          <p className="text-xs md:text-sm text-text-secondary font-medium">{consultant.title}</p>
                        </div>
                        <Badge variant="secondary" className="bg-secondary-bg text-text-muted border-border-light text-[9px] md:text-[10px] font-bold px-2 md:px-3 py-1 rounded-lg w-fit">
                          {consultant.yearsExperience}Y Experience
                        </Badge>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                        <div className="space-y-1">
                          <p className="text-[9px] font-bold text-text-muted uppercase tracking-widest flex items-center gap-1.5">
                            <Award className="h-3 w-3" />
                            Expertise Domain
                          </p>
                          <p className="text-xs font-bold text-text-main">{consultant.expertiseDomain}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-[9px] font-bold text-text-muted uppercase tracking-widest flex items-center gap-1.5">
                            <Globe className="h-3 w-3" />
                            Geographic Exp.
                          </p>
                          <p className="text-xs font-bold text-text-main truncate">{consultant.geographicExperience.join(', ')}</p>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex flex-wrap gap-2">
                          {consultant.specialties.map((exp: string) => (
                            <Badge key={exp} variant="secondary" className="bg-interaction-primary/5 text-interaction-primary border-interaction-primary/10 text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md">
                              {exp}
                            </Badge>
                          ))}
                        </div>
                        <div className="p-4 rounded-2xl bg-gray-50/50 border border-border-light/50 space-y-2">
                          <p className="text-[9px] font-bold text-text-muted uppercase tracking-widest flex items-center gap-1.5">
                            <Target className="h-3 w-3" />
                            Transformation Highlights
                          </p>
                          <ul className="space-y-1.5">
                            {consultant.highlights.map((h: string, i: number) => (
                              <li key={i} className="flex items-start gap-2 text-[10px] text-text-secondary leading-relaxed">
                                <div className="h-1 w-1 rounded-full bg-interaction-primary mt-1.5 shrink-0" />
                                {h}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="px-4 md:px-8 py-5 bg-gray-50/80 border-t border-border-light flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <Button variant="secondary" size="sm" className="h-10 rounded-xl px-3 md:px-4 text-[10px] md:text-[11px] font-bold border-border-light bg-white shadow-sm hover:border-interaction-primary/30 flex-1 sm:flex-none">
                      <ExternalLink className="h-3.5 w-3.5 mr-1 md:mr-2" />
                      Portfolio
                    </Button>
                    <Button variant="secondary" size="sm" className="h-10 rounded-xl px-3 md:px-4 text-[10px] md:text-[11px] font-bold border-border-light bg-white shadow-sm hover:border-interaction-primary/30 flex-1 sm:flex-none">
                      <Video className="h-3.5 w-3.5 mr-1 md:mr-2" />
                      Session
                    </Button>
                  </div>
                  <Button className="h-10 bg-gradient-to-r from-interaction-primary to-ai-violet hover:opacity-90 text-white rounded-xl text-[10px] md:text-[11px] font-bold px-6 shadow-lg shadow-interaction-primary/20 w-full sm:w-auto">
                    Invite to Strategy Room
                    <ChevronRight className="h-4 w-4 ml-1.5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Load More */}
      <div className="flex justify-center py-4">
        <Button variant="secondary" className="border-border-light shadow-sm text-xs font-bold px-8">
          Load More Consultants
        </Button>
      </div>
    </div>
  );
}
