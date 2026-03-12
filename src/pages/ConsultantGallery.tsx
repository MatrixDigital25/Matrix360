import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/src/components/ui/Card';
import { Badge } from '@/src/components/ui/Badge';
import { Button } from '@/src/components/ui/Button';
import { Input } from '@/src/components/ui/Input';
import { 
  Search, Filter, MapPin, Briefcase, Star, 
  CheckCircle2, Shield, BrainCircuit, Users, 
  ArrowUpRight, Globe, Zap, Clock, 
  ChevronDown, X, MessageSquare, Plus,
  Award, Target, Sparkles, Layers, Loader2
} from 'lucide-react';
import { cn } from '@/src/utils/cn';

const INDUSTRIES = ['All Industries', 'Healthcare', 'Technology', 'Manufacturing', 'Finance', 'Energy', 'Defense', 'Retail', 'Government', 'Real Estate'];
const DOMAINS = ['All Domains', 'Regulatory Strategy', 'Market Entry', 'Supply Chain', 'Digital Transformation', 'Sustainability', 'Cybersecurity', 'Brand Strategy', 'AI Implementation', 'Organizational Design', 'Public Policy', 'Financial Restructuring', 'Smart Cities', 'E-commerce', 'Biotech Innovation'];
const GEOGRAPHIES = ['All Regions', 'Europe', 'North America', 'APAC', 'Middle East', 'Latin America', 'Global'];
const SPECIALTIES = ['All Specialties', 'M&A', 'ESG', 'Compliance', 'Risk Mitigation', 'Automation', 'Change Management', 'Turnaround', 'PropTech', 'R&D Strategy'];

export default function ConsultantGallery() {
  const [consultants, setConsultants] = useState<any[]>([{
    id: 1,
    name: 'Stephen Raj',
    title: 'Expert',
    specialties: ['Strategy'],
    geographies: ['Global'],
    projects: [],
    aiRating: '5.0',
    img: '/Stephen.jpg',
    industry: 'All Industries',
    availability: 'Available',
    exp: 15,
    linkedin: 'https://www.linkedin.com/in/stephen-raj-9024b8306/'
  }]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    industry: 'All Industries',
    domain: 'All Domains',
    geography: 'All Regions',
    specialty: 'All Specialties'
  });
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const filteredConsultants = useMemo(() => {
    return consultants.filter(c => {
      const matchesSearch = 
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.specialties.some((s: string) => s.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesIndustry = filters.industry === 'All Industries' || c.industry.includes(filters.industry);
      const matchesDomain = filters.domain === 'All Domains' || c.domain === filters.domain;
      const matchesGeography = filters.geography === 'All Regions' || c.geographies.includes(filters.geography);
      const matchesSpecialty = filters.specialty === 'All Specialties' || c.specialties.includes(filters.specialty);

      return matchesSearch && matchesIndustry && matchesDomain && matchesGeography && matchesSpecialty;
    });
  }, [searchTerm, filters, consultants]);

  const resetFilters = () => {
    setFilters({
      industry: 'All Industries',
      domain: 'All Domains',
      geography: 'All Regions',
      specialty: 'All Specialties'
    });
    setSearchTerm('');
  };

  return (
    <div className="space-y-8 pb-20">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-3xl bg-brand-primary p-8 md:p-12 text-white">
        <div className="relative z-10 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="mb-4 bg-white/10 text-ai-cyan border-white/20 px-3 py-1">Global Advisory Network</Badge>
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4 leading-tight">
              Elite Strategic Intelligence <br />
              <span className="text-ai-cyan">At Your Command</span>
            </h1>
            <p className="text-lg text-white/70 mb-8 max-w-xl">
              Connect with world-class transformation leaders, regulatory experts, and AI strategists vetted for high-stakes global initiatives.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/apply">
                <Button className="h-12 px-8 bg-ai-cyan text-brand-primary hover:bg-ai-cyan/90 font-bold rounded-xl">
                  Join the Network
                </Button>
              </Link>
              <Link to="/challenge/new">
                <Button variant="secondary" className="h-12 px-8 border-white/20 text-white hover:bg-white/10 font-bold rounded-xl">
                  Initiate Challenge
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
        
        {/* Background Elements */}
        <div className="absolute top-0 right-0 w-1/3 h-full opacity-10 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-l from-ai-cyan/50 to-transparent" />
          <Globe className="absolute top-1/2 right-[-10%] -translate-y-1/2 w-96 h-96 text-white" />
        </div>
      </div>

      {/* Search and Filters Bar */}
      <div className="sticky top-4 z-30 bg-white/80 backdrop-blur-md border border-panel-border rounded-2xl p-4 shadow-xl shadow-brand-primary/5">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-text-muted" />
            <Input 
              placeholder="Search by name, expertise, or strategic specialty..." 
              className="pl-12 h-14 bg-panel-bg border-none rounded-xl focus:ring-2 focus:ring-interaction-primary text-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Button 
              variant="secondary" 
              className={cn(
                "h-14 px-6 rounded-xl border-panel-border transition-all",
                showFilters ? "bg-brand-primary text-white" : "bg-white text-text-main"
              )}
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="mr-2 h-4 w-4" />
              Advanced Filters
              {(filters.industry !== 'All Industries' || filters.domain !== 'All Domains' || filters.geography !== 'All Regions' || filters.specialty !== 'All Specialties') && (
                <Badge className="ml-2 bg-interaction-primary text-white border-none h-5 w-5 p-0 flex items-center justify-center rounded-full text-[10px]">
                  !
                </Badge>
              )}
            </Button>
            {showFilters && (
              <Button variant="text" className="h-14 px-4 text-text-muted hover:text-alert-risk" onClick={resetFilters}>
                <X className="h-4 w-4 mr-2" />
                Reset
              </Button>
            )}
          </div>
        </div>

        <AnimatePresence>
          {showFilters && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 mt-4 border-t border-panel-border">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-text-muted uppercase tracking-widest px-1">Industry</label>
                  <select 
                    className="w-full h-10 bg-panel-bg border-none rounded-lg px-3 text-sm focus:ring-1 focus:ring-interaction-primary"
                    value={filters.industry}
                    onChange={(e) => setFilters({...filters, industry: e.target.value})}
                  >
                    {INDUSTRIES.map(i => <option key={i} value={i}>{i}</option>)}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-text-muted uppercase tracking-widest px-1">Expertise Domain</label>
                  <select 
                    className="w-full h-10 bg-panel-bg border-none rounded-lg px-3 text-sm focus:ring-1 focus:ring-interaction-primary"
                    value={filters.domain}
                    onChange={(e) => setFilters({...filters, domain: e.target.value})}
                  >
                    {DOMAINS.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-text-muted uppercase tracking-widest px-1">Geography</label>
                  <select 
                    className="w-full h-10 bg-panel-bg border-none rounded-lg px-3 text-sm focus:ring-1 focus:ring-interaction-primary"
                    value={filters.geography}
                    onChange={(e) => setFilters({...filters, geography: e.target.value})}
                  >
                    {GEOGRAPHIES.map(g => <option key={g} value={g}>{g}</option>)}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-text-muted uppercase tracking-widest px-1">Transformation Specialty</label>
                  <select 
                    className="w-full h-10 bg-panel-bg border-none rounded-lg px-3 text-sm focus:ring-1 focus:ring-interaction-primary"
                    value={filters.specialty}
                    onChange={(e) => setFilters({...filters, specialty: e.target.value})}
                  >
                    {SPECIALTIES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-text-muted">
          Showing <span className="font-bold text-text-main">{filteredConsultants.length}</span> elite advisors matching your criteria
        </p>
        <div className="flex items-center gap-2 text-xs text-text-muted">
          <Clock className="h-3 w-3" />
          Updated: Today, 16:03
        </div>
      </div>

      {/* Gallery Grid */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-32 space-y-4">
          <Loader2 className="h-12 w-12 text-interaction-primary animate-spin" />
          <p className="text-text-muted font-medium">Accessing global advisory network...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {filteredConsultants.map((consultant, i) => (
            <motion.div
              key={consultant.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card className="group h-full bg-white border border-panel-border hover:border-interaction-primary/30 hover:shadow-2xl hover:shadow-brand-primary/5 transition-all duration-500 overflow-hidden rounded-3xl">
                <CardContent className="p-0 flex flex-col md:flex-row h-full">
                  {/* Left: Profile Photo & Status */}
                  <div className="w-full md:w-48 bg-panel-bg p-6 flex flex-col items-center border-b md:border-b-0 md:border-r border-panel-border">
                    <div className="relative mb-4">
                      <div className="absolute inset-0 bg-interaction-primary/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all opacity-0 group-hover:opacity-100" />
                      <img 
                        src={consultant.img} 
                        alt={consultant.name} 
                        className="relative w-32 h-32 rounded-2xl object-cover border-2 border-white shadow-lg grayscale group-hover:grayscale-0 transition-all duration-700"
                        referrerPolicy="no-referrer"
                      />
                      <div className={cn(
                        "absolute -bottom-2 -right-2 h-8 w-8 rounded-full border-4 border-white flex items-center justify-center shadow-md",
                        consultant.availability === 'Available' ? "bg-emerald-500" : 
                        consultant.availability === 'Limited' ? "bg-amber-500" : "bg-rose-500"
                      )}>
                        {consultant.availability === 'Available' ? <CheckCircle2 className="h-4 w-4 text-white" /> : <Clock className="h-4 w-4 text-white" />}
                      </div>
                    </div>
                    
                    <div className="text-center space-y-1">
                      <div className="flex items-center justify-center gap-1 text-amber-500">
                        <Star className="h-3 w-3 fill-current" />
                        <span className="text-xs font-bold">{consultant.aiRating}</span>
                        <span className="text-[10px] text-text-muted font-normal">AI Rating</span>
                      </div>
                      <p className={cn(
                        "text-[10px] font-bold uppercase tracking-widest",
                        consultant.availability === 'Available' ? "text-emerald-600" : 
                        consultant.availability === 'Limited' ? "text-amber-600" : "text-rose-600"
                      )}>
                        {consultant.availability}
                      </p>
                    </div>

                    <div className="mt-auto w-full pt-6">
                      <div className="p-3 rounded-xl bg-white border border-panel-border text-center">
                        <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest mb-1">Experience</p>
                        <p className="text-lg font-heading font-bold text-brand-primary">{consultant.exp}Y+</p>
                      </div>
                    </div>
                  </div>

                  {/* Right: Details & Actions */}
                  <div className="flex-1 p-8 flex flex-col">
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <a href={consultant.linkedin} target="_blank" rel="noopener noreferrer" className="text-2xl font-heading font-bold text-brand-primary group-hover:text-interaction-primary transition-colors hover:underline">
                            {consultant.name}
                          </a>
                          <Shield className="h-4 w-4 text-interaction-primary" />
                        </div>
                        <p className="text-sm font-medium text-interaction-primary flex items-center gap-2">
                          <Award className="h-3 w-3" />
                          {consultant.title}
                        </p>
                      </div>
                      <Badge variant="secondary" className="bg-secondary-bg text-text-muted border-panel-border px-3 py-1 self-start">
                        {consultant.industry}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      <div className="space-y-4">
                        <div>
                          <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest mb-2 flex items-center gap-2">
                            <Target className="h-3 w-3" />
                            Strategic Specialties
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {consultant.specialties.map((s: string) => (
                              <Badge key={s} className="bg-panel-bg text-text-secondary border-panel-border text-[10px] font-medium px-2 py-0.5">
                                {s}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest mb-2 flex items-center gap-2">
                            <Globe className="h-3 w-3" />
                            Geographic Experience
                          </p>
                          <div className="flex items-center gap-2 text-sm text-text-secondary">
                            <MapPin className="h-3 w-3 text-interaction-primary" />
                            {consultant.geographies.join(', ')}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest mb-2 flex items-center gap-2">
                            <Layers className="h-3 w-3" />
                            Previous Transformations
                          </p>
                          <ul className="space-y-1.5">
                            {consultant.projects.map((p: string, idx: number) => (
                              <li key={idx} className="text-xs text-text-secondary flex items-start gap-2">
                                <div className="h-1 w-1 rounded-full bg-interaction-primary mt-1.5 shrink-0" />
                                {p}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="p-3 rounded-xl bg-brand-primary/5 border border-brand-primary/10">
                          <div className="flex items-center gap-2 mb-1">
                            <BrainCircuit className="h-3 w-3 text-ai-violet" />
                            <p className="text-[10px] font-bold text-brand-primary uppercase tracking-widest">AI Strategy Rating</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-1.5 bg-brand-primary/10 rounded-full overflow-hidden">
                              <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: `${(consultant.aiRating / 5) * 100}%` }}
                                className="h-full bg-ai-violet"
                              />
                            </div>
                            <span className="text-xs font-bold text-brand-primary">{consultant.aiRating}/5.0</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-auto flex flex-col sm:flex-row gap-3 pt-6 border-t border-panel-border">
                      <Button className="flex-1 h-12 bg-brand-primary text-white hover:bg-brand-primary/90 rounded-xl font-bold flex items-center justify-center gap-2">
                        <Plus className="h-4 w-4" />
                        Invite to Strategy Room
                      </Button>
                      <Button variant="secondary" className="flex-1 h-12 border-panel-border text-brand-primary hover:bg-panel-bg rounded-xl font-bold flex items-center justify-center gap-2">
                        <MessageSquare className="h-4 w-4" />
                        Request Advisory Session
                      </Button>
                      <Link to={`/consultants/${consultant.id}`}>
                        <Button variant="text" className="h-12 w-12 p-0 rounded-xl hover:bg-panel-bg text-text-muted">
                          <ArrowUpRight className="h-5 w-5" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && filteredConsultants.length === 0 && (
        <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-panel-border">
          <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-panel-bg mb-6">
            <Search className="h-10 w-10 text-text-muted" />
          </div>
          <h3 className="text-xl font-heading font-bold text-brand-primary mb-2">No advisors found</h3>
          <p className="text-text-muted max-w-md mx-auto mb-8">
            Try adjusting your filters or search terms to find the right strategic expertise for your initiative.
          </p>
          <Button variant="secondary" onClick={resetFilters} className="rounded-xl px-8">
            Clear All Filters
          </Button>
        </div>
      )}

      {/* Call to Action */}
      <div className="bg-brand-primary rounded-3xl p-12 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
        <div className="relative z-10">
          <Sparkles className="h-12 w-12 text-ai-cyan mx-auto mb-6" />
          <h2 className="text-3xl font-heading font-bold mb-4">Can't find the right match?</h2>
          <p className="text-white/70 mb-8 max-w-2xl mx-auto">
            Our AI-driven matching engine can identify the perfect advisors based on your specific challenge parameters. Let us do the heavy lifting.
          </p>
          <Link to="/challenge/new">
            <Button className="h-14 px-10 bg-white text-brand-primary hover:bg-white/90 font-bold rounded-xl text-lg shadow-2xl shadow-white/10">
              Launch AI Matching Engine
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

