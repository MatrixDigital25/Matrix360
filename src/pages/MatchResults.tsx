import React from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/src/components/ui/Card';
import { Badge } from '@/src/components/ui/Badge';
import { Button } from '@/src/components/ui/Button';
import { BrainCircuit, CheckCircle2, MapPin, Briefcase, MessageSquare, Calendar, Target, Sparkles, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const MATCHES = [
  { 
    id: 1, 
    name: 'Marcus Chen', 
    title: 'APAC Expansion Lead', 
    match: 96,
    industry: 'Technology', 
    location: 'Singapore', 
    exp: '12 yrs', 
    tags: ['Market Entry', 'Supply Chain', 'M&A'], 
    img: 'https://picsum.photos/seed/marcus/200/200',
    rationale: 'Marcus has successfully guided 14 enterprise tech firms into the APAC market over the last 5 years, specializing in supply chain resilience and local regulatory compliance.'
  },
  { 
    id: 2, 
    name: 'Wei Zhang', 
    title: 'E-commerce Operations Expert', 
    match: 89,
    industry: 'Retail Tech', 
    location: 'Shanghai, CN', 
    exp: '12 yrs', 
    tags: ['Logistics', 'Platform Strategy', 'Cross-border'], 
    img: 'https://picsum.photos/seed/wei/200/200',
    rationale: 'Wei brings deep operational expertise in cross-border logistics and platform strategy, crucial for navigating complex APAC supply chains.'
  },
  { 
    id: 3, 
    name: 'Dr. Sarah Jenkins', 
    title: 'Regulatory Strategist', 
    match: 84,
    industry: 'Healthcare / Tech', 
    location: 'London, UK', 
    exp: '15+ yrs', 
    tags: ['Compliance', 'Policy', 'Global Markets'], 
    img: 'https://picsum.photos/seed/sarah/200/200',
    rationale: 'While based in the UK, Sarah has extensive experience in global regulatory frameworks, providing essential risk mitigation strategies for new market entries.'
  }
];

export default function MatchResults() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-5xl mx-auto space-y-6"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-panel-border pb-6">
        <div>
          <h1 className="text-2xl font-heading font-bold text-text-main">Expert Alignment Report</h1>
          <p className="text-text-muted text-sm">AI-curated strategic advisors for "APAC Market Entry Strategy Q4"</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="secondary" className="bg-interaction-primary/10 text-interaction-primary border-interaction-primary/20">
            <Sparkles className="h-3 w-3 mr-1" />
            1,452 Profiles Scanned
          </Badge>
          <Button variant="secondary" size="sm">Modify Challenge</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {MATCHES.map((match, i) => (
          <motion.div
            key={match.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="border-panel-border bg-panel-bg hover:border-interaction-primary/40 transition-all overflow-hidden group">
              <CardContent className="p-0 flex flex-col md:flex-row">
                {/* Profile Summary */}
                <div className="p-5 md:w-1/4 border-b md:border-b-0 md:border-r border-panel-border bg-secondary-bg/50 flex flex-col items-center text-center">
                  <div className="relative mb-4">
                    <img 
                      src={match.img} 
                      alt={match.name} 
                      className="w-20 h-20 rounded-full object-cover border-2 border-panel-border group-hover:border-interaction-primary/30 transition-colors"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute -bottom-1 -right-1 h-8 w-8 rounded-full bg-panel-bg border border-panel-border flex flex-col items-center justify-center shadow-sm">
                      <span className="text-[10px] font-bold text-interaction-primary">{match.match}%</span>
                    </div>
                  </div>
                  <Link to={`/consultants/${match.id}`} className="hover:underline">
                    <h3 className="text-sm font-bold text-text-main mb-0.5 group-hover:text-interaction-primary transition-colors">{match.name}</h3>
                  </Link>
                  <p className="text-[10px] text-text-muted mb-4">{match.title}</p>
                  
                  <div className="w-full space-y-2 text-left mb-4">
                    <div className="flex items-center text-[10px] text-text-muted">
                      <MapPin className="h-3 w-3 mr-2 text-interaction-primary" />
                      {match.location}
                    </div>
                    <div className="flex items-center text-[10px] text-text-muted">
                      <Briefcase className="h-3 w-3 mr-2 text-interaction-primary" />
                      {match.exp} Exp
                    </div>
                  </div>

                  <div className="flex flex-wrap justify-center gap-1.5">
                    {match.tags.slice(0, 2).map(tag => (
                      <Badge key={tag} variant="secondary" className="text-[8px] px-1.5 py-0">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* AI Rationale */}
                <div className="p-5 md:w-3/4 flex flex-col">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-[10px] font-bold text-text-muted uppercase tracking-widest flex items-center">
                        <BrainCircuit className="h-3 w-3 mr-2 text-interaction-primary" />
                        Strategic Alignment Rationale
                      </h4>
                      {i === 0 && <Badge variant="green" className="text-[9px]">Top Recommendation</Badge>}
                    </div>
                    <p className="text-xs text-text-main leading-relaxed bg-secondary-bg p-3 rounded-lg border border-panel-border">
                      {match.rationale}
                    </p>
                  </div>

                  <div className="mt-4 flex items-center justify-between pt-4 border-t border-panel-border">
                    <div className="flex gap-4">
                      <div className="flex flex-col gap-1">
                        <span className="text-[9px] font-bold text-text-muted uppercase">Industry Fit</span>
                        <div className="h-1 w-24 bg-secondary-bg rounded-full overflow-hidden">
                          <div className="h-full bg-interaction-primary" style={{ width: `${match.match}%` }} />
                        </div>
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="text-[9px] font-bold text-text-muted uppercase">Regional Exp</span>
                        <div className="h-1 w-24 bg-secondary-bg rounded-full overflow-hidden">
                          <div className="h-full bg-ai-cyan" style={{ width: `${match.match - 5}%` }} />
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="secondary" size="sm" className="h-8 text-[10px]">
                        <Calendar className="h-3 w-3 mr-1.5" />
                        Schedule Intro
                      </Button>
                      <Link to="/enterprise/workspace">
                        <Button variant="primary" size="sm" className="h-8 text-[10px]">
                          <MessageSquare className="h-3 w-3 mr-1.5" />
                          Initiate Engagement
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
