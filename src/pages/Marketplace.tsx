import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/Card';
import { Badge } from '@/src/components/ui/Badge';
import { Button } from '@/src/components/ui/Button';
import { 
  Search, 
  Target, 
  TrendingUp, 
  DollarSign, 
  Clock, 
  ChevronRight, 
  Building2, 
  Globe,
  Zap,
  ShieldAlert,
  BarChart3
} from 'lucide-react';
import { cn } from '@/src/utils/cn';

const CHALLENGES = [
  {
    id: 1,
    title: 'Sustainability Framework for Global Logistics',
    enterprise: 'LogiCorp International',
    sector: 'Logistics & Supply Chain',
    budget: '$150k - $250k',
    deadline: '14 days left',
    description: 'Develop a comprehensive ESG reporting framework and carbon reduction strategy for a fleet of 5,000+ vehicles across 12 countries.',
    tags: ['Sustainability', 'ESG', 'Logistics'],
    complexity: 'High',
    proposals: 8
  },
  {
    id: 2,
    title: 'AI Governance & Ethics Implementation',
    enterprise: 'Fintech Global Ltd.',
    sector: 'Financial Services',
    budget: '$80k - $120k',
    deadline: '5 days left',
    description: 'Establish internal governance structures and ethical guidelines for the deployment of generative AI across customer service and risk assessment.',
    tags: ['AI Ethics', 'Governance', 'Fintech'],
    complexity: 'Medium',
    proposals: 15
  },
  {
    id: 3,
    title: 'Post-Merger Cultural Integration Strategy',
    enterprise: 'HealthTech Solutions',
    sector: 'Healthcare',
    budget: '$200k+',
    deadline: '21 days left',
    description: 'Design and execute a cultural integration program following the acquisition of a European biotech startup by a US-based healthcare giant.',
    tags: ['M&A', 'Culture', 'Change Management'],
    complexity: 'High',
    proposals: 4
  },
  {
    id: 4,
    title: 'Digital Twin for Smart Manufacturing',
    enterprise: 'AutoMotive Systems',
    sector: 'Manufacturing',
    budget: '$120k - $180k',
    deadline: '10 days left',
    description: 'Strategic roadmap for implementing digital twin technology across three main assembly lines to optimize maintenance and throughput.',
    tags: ['Industry 4.0', 'Digital Twin', 'IoT'],
    complexity: 'Medium',
    proposals: 12
  }
];

export default function Marketplace() {
  const [activeFilter, setActiveFilter] = useState('All');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading font-bold text-text-main mb-1">Strategic Challenges Marketplace</h1>
          <p className="text-text-muted text-sm">High-impact strategic problems from leading enterprises seeking expert solutions.</p>
        </div>
        <Button className="bg-interaction-primary text-white rounded-xl shadow-md font-bold px-6">
          Post a Challenge
        </Button>
      </div>

      {/* Stats & Filters */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 space-y-6">
          {/* Search & Quick Filters */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
              <input 
                type="text" 
                placeholder="Search challenges by keyword, sector, or company..." 
                className="w-full bg-white border border-border-light rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-interaction-primary/20 focus:border-interaction-primary transition-all shadow-sm"
              />
            </div>
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
              {['All', 'High Value', 'Urgent', 'Newest'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={cn(
                    "px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border",
                    activeFilter === filter 
                      ? "bg-interaction-primary text-white border-interaction-primary shadow-sm" 
                      : "bg-white text-text-secondary border-border-light hover:border-interaction-primary/30"
                  )}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {/* Challenge List */}
          <div className="space-y-4">
            {CHALLENGES.map((challenge) => (
              <motion.div
                key={challenge.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="group hover:shadow-md transition-all border-border-light bg-white overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="secondary" className="bg-interaction-primary/10 text-interaction-primary border-none text-[9px] font-bold uppercase tracking-wider">
                            {challenge.sector}
                          </Badge>
                          <span className="text-[10px] text-text-muted flex items-center gap-1">
                            <Building2 className="h-3 w-3" />
                            {challenge.enterprise}
                          </span>
                        </div>
                        <h3 className="text-base font-bold text-text-main mb-2 group-hover:text-interaction-primary transition-colors">
                          {challenge.title}
                        </h3>
                        <p className="text-xs text-text-muted leading-relaxed mb-4 line-clamp-2">
                          {challenge.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {challenge.tags.map(tag => (
                            <span key={tag} className="text-[10px] text-text-secondary bg-secondary-bg px-2 py-0.5 rounded-lg border border-border-light">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="w-full md:w-48 shrink-0 flex flex-col justify-between border-t md:border-t-0 md:border-l border-border-light pt-4 md:pt-0 md:pl-6">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between md:flex-col md:items-start gap-1">
                            <span className="text-[10px] text-text-muted font-bold uppercase tracking-wider">Budget</span>
                            <span className="text-sm font-bold text-alert-opportunity">{challenge.budget}</span>
                          </div>
                          <div className="flex items-center justify-between md:flex-col md:items-start gap-1">
                            <span className="text-[10px] text-text-muted font-bold uppercase tracking-wider">Deadline</span>
                            <span className="text-xs font-medium text-text-main flex items-center gap-1">
                              <Clock className="h-3 w-3 text-alert-risk" />
                              {challenge.deadline}
                            </span>
                          </div>
                        </div>
                        <Button className="w-full mt-4 bg-secondary-bg hover:bg-interaction-primary hover:text-white text-interaction-primary border border-interaction-primary/20 rounded-xl text-xs font-bold transition-all">
                          Submit Proposal
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Sidebar: Insights & Trends */}
        <div className="space-y-6">
          <Card className="border-border-light bg-white shadow-sm overflow-hidden">
            <CardHeader className="bg-secondary-bg/50 border-b border-border-light py-4">
              <CardTitle className="text-xs font-bold flex items-center uppercase tracking-wider">
                <TrendingUp className="h-4 w-4 mr-2 text-interaction-primary" />
                Marketplace Trends
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center text-[11px]">
                  <span className="text-text-secondary">AI Strategy</span>
                  <span className="text-alert-opportunity font-bold">+24%</span>
                </div>
                <div className="h-1.5 w-full bg-secondary-bg rounded-full overflow-hidden">
                  <div className="h-full bg-interaction-primary" style={{ width: '85%' }} />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center text-[11px]">
                  <span className="text-text-secondary">ESG Compliance</span>
                  <span className="text-alert-opportunity font-bold">+18%</span>
                </div>
                <div className="h-1.5 w-full bg-secondary-bg rounded-full overflow-hidden">
                  <div className="h-full bg-interaction-primary" style={{ width: '65%' }} />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center text-[11px]">
                  <span className="text-text-secondary">Supply Chain Resilience</span>
                  <span className="text-alert-opportunity font-bold">+12%</span>
                </div>
                <div className="h-1.5 w-full bg-secondary-bg rounded-full overflow-hidden">
                  <div className="h-full bg-interaction-primary" style={{ width: '45%' }} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border-light bg-interaction-primary/5 shadow-none">
            <CardContent className="p-5 space-y-4">
              <div className="h-10 w-10 rounded-xl bg-white flex items-center justify-center shadow-sm">
                <Zap className="h-5 w-5 text-interaction-primary" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-text-main mb-1">AI Matchmaking</h4>
                <p className="text-[11px] text-text-muted leading-relaxed">
                  Our AI agents are analyzing your profile to match you with the most relevant strategic challenges.
                </p>
              </div>
              <Button variant="secondary" className="w-full h-8 text-[10px] font-bold bg-white">
                View Matches
              </Button>
            </CardContent>
          </Card>

          <Card className="border-border-light bg-white shadow-sm">
            <CardHeader className="py-4 border-b border-border-light">
              <CardTitle className="text-xs font-bold uppercase tracking-wider">Top Sectors</CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-3">
              {[
                { name: 'Fintech', count: 42 },
                { name: 'Healthcare', count: 28 },
                { name: 'Manufacturing', count: 24 },
                { name: 'Energy', count: 19 }
              ].map(sector => (
                <div key={sector.name} className="flex items-center justify-between">
                  <span className="text-xs text-text-secondary">{sector.name}</span>
                  <Badge variant="secondary" className="bg-secondary-bg text-text-muted text-[10px]">{sector.count}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
