import React from 'react';
import { motion } from 'motion/react';
import { Search, Filter, Globe, Users, Target, ArrowUpRight, Building2, TrendingUp } from 'lucide-react';
import { Card, CardContent } from '@/src/components/ui/Card';
import { Badge } from '@/src/components/ui/Badge';
import { Button } from '@/src/components/ui/Button';
import { cn } from '@/src/utils/cn';
import { Link } from 'react-router-dom';

const ENTERPRISES = [
  {
    id: 'global-logistics',
    name: 'Global Logistics Corp',
    industry: 'Logistics & Supply Chain',
    location: 'Singapore / Global',
    employees: '50,000+',
    activeChallenges: 12,
    strategicFocus: ['Sustainability', 'AI Optimization', 'Last-Mile'],
    logo: 'https://picsum.photos/seed/logistics/100/100',
    status: 'Active Intelligence'
  },
  {
    id: 'fintech-nexus',
    name: 'Nexus Financial Group',
    industry: 'Banking & Fintech',
    location: 'London / New York',
    employees: '25,000+',
    activeChallenges: 8,
    strategicFocus: ['DeFi', 'Regulatory Compliance', 'Cybersecurity'],
    logo: 'https://picsum.photos/seed/nexus/100/100',
    status: 'Strategic Partner'
  },
  {
    id: 'eco-energy',
    name: 'EcoEnergy Solutions',
    industry: 'Renewable Energy',
    location: 'Berlin / Oslo',
    employees: '12,000+',
    activeChallenges: 5,
    strategicFocus: ['Hydrogen', 'Grid Stability', 'ESG Reporting'],
    logo: 'https://picsum.photos/seed/energy/100/100',
    status: 'Active Intelligence'
  },
  {
    id: 'health-core',
    name: 'HealthCore Systems',
    industry: 'Healthcare & Pharma',
    location: 'Boston / Zurich',
    employees: '40,000+',
    activeChallenges: 15,
    strategicFocus: ['Drug Discovery', 'Patient Privacy', 'Telehealth'],
    logo: 'https://picsum.photos/seed/health/100/100',
    status: 'Premium Member'
  }
];

export default function EnterpriseGallery() {
  return (
    <div className="space-y-8 pb-12">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-heading font-bold text-text-main">Enterprise Organizations</h1>
          <p className="text-text-muted mt-2 max-w-2xl">
            Connect with global enterprises seeking strategic intelligence and consulting expertise.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex -space-x-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-10 w-10 rounded-full border-2 border-white bg-secondary-bg flex items-center justify-center overflow-hidden">
                <img src={`https://picsum.photos/seed/logo${i}/40/40`} alt="Enterprise" className="h-full w-full object-cover" referrerPolicy="no-referrer" />
              </div>
            ))}
            <div className="h-10 w-10 rounded-full border-2 border-white bg-brand-primary flex items-center justify-center text-[10px] font-bold text-white">
              +120
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs font-bold text-text-main">124 Enterprises</p>
            <p className="text-[10px] text-text-muted uppercase tracking-wider">Active in Network</p>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <Card className="bg-white border-border-light shadow-sm">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted group-focus-within:text-interaction-primary transition-colors" />
              <input 
                type="text" 
                placeholder="Search by enterprise name, industry, or strategic domain..." 
                className="w-full bg-secondary-bg border border-border-light rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-interaction-primary/20 focus:border-interaction-primary transition-all"
              />
            </div>
            <div className="flex items-center gap-2">
              <Button variant="secondary" className="h-10 px-4 text-xs bg-white border-border-light">
                <Filter className="mr-2 h-4 w-4" />
                Filters
              </Button>
              <Button variant="secondary" className="h-10 px-4 text-xs bg-white border-border-light">
                <Globe className="mr-2 h-4 w-4" />
                Region
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Enterprise Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ENTERPRISES.map((enterprise, i) => (
          <motion.div
            key={enterprise.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="group hover:shadow-xl transition-all duration-500 border-border-light overflow-hidden bg-white h-full flex flex-col">
              <CardContent className="p-0 flex-1 flex flex-col">
                <div className="p-6 flex-1">
                  <div className="flex justify-between items-start mb-6">
                    <div className="h-16 w-16 rounded-2xl bg-secondary-bg border border-border-light p-2 flex items-center justify-center overflow-hidden group-hover:border-interaction-primary transition-colors">
                      <img src={enterprise.logo} alt={enterprise.name} className="h-full w-full object-contain" referrerPolicy="no-referrer" />
                    </div>
                    <Badge className="bg-ai-cyan/10 text-ai-cyan border-none text-[10px] font-bold uppercase tracking-widest px-2 py-1">
                      {enterprise.status}
                    </Badge>
                  </div>

                  <Link to={`/enterprise/${enterprise.id}`} className="block group-hover:text-interaction-primary transition-colors">
                    <h3 className="text-xl font-bold text-text-main mb-1">{enterprise.name}</h3>
                  </Link>
                  <p className="text-sm text-text-muted mb-4 flex items-center gap-2">
                    <Building2 className="h-3 w-3" />
                    {enterprise.industry}
                  </p>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="p-3 rounded-xl bg-secondary-bg border border-border-light">
                      <p className="text-[10px] text-text-muted uppercase tracking-wider font-bold mb-1">Active Challenges</p>
                      <div className="flex items-center gap-2">
                        <Target className="h-4 w-4 text-alert-risk" />
                        <span className="text-sm font-bold text-text-main">{enterprise.activeChallenges}</span>
                      </div>
                    </div>
                    <div className="p-3 rounded-xl bg-secondary-bg border border-border-light">
                      <p className="text-[10px] text-text-muted uppercase tracking-wider font-bold mb-1">Global Presence</p>
                      <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4 text-ai-cyan" />
                        <span className="text-sm font-bold text-text-main">{enterprise.location.split(' / ')[0]}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <p className="text-[10px] text-text-muted uppercase tracking-wider font-bold">Strategic Focus</p>
                    <div className="flex flex-wrap gap-2">
                      {enterprise.strategicFocus.map(focus => (
                        <span key={focus} className="px-2 py-1 rounded-md bg-interaction-primary/5 text-interaction-primary text-[10px] font-bold">
                          {focus}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-4 border-t border-border-light bg-secondary-bg/30 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-text-muted" />
                    <span className="text-xs text-text-muted font-medium">{enterprise.employees} Employees</span>
                  </div>
                  <Link to={`/enterprise/${enterprise.id}`}>
                    <Button variant="text" size="sm" className="text-xs font-bold text-interaction-primary hover:bg-interaction-primary/5">
                      View Profile
                      <ArrowUpRight className="ml-2 h-3 w-3" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Network Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Total Enterprise Capital', value: '$4.2T', icon: TrendingUp, color: 'text-ai-cyan' },
          { label: 'Strategic Challenges', value: '842', icon: Target, color: 'text-alert-risk' },
          { label: 'Active Projects', value: '1,240', icon: Building2, color: 'text-ai-violet' }
        ].map((stat, i) => (
          <Card key={i} className="bg-white border-border-light shadow-sm">
            <CardContent className="p-6 flex items-center gap-4">
              <div className={cn("p-3 rounded-xl bg-secondary-bg", stat.color.replace('text-', 'bg-').replace('text-', 'bg-') + '/10')}>
                <stat.icon className={cn("h-6 w-6", stat.color)} />
              </div>
              <div>
                <p className="text-xs font-bold text-text-muted uppercase tracking-widest">{stat.label}</p>
                <p className="text-2xl font-bold text-text-main">{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
