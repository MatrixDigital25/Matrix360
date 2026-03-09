import React from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/src/components/ui/Card';
import { Badge } from '@/src/components/ui/Badge';
import { Button } from '@/src/components/ui/Button';
import { BrainCircuit, CheckCircle2, MapPin, Briefcase, MessageSquare, Calendar, Target } from 'lucide-react';
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
      className="max-w-5xl mx-auto space-y-8"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 border-b border-border-light pb-8">
        <div className="flex items-start space-x-5">
          <div className="h-14 w-14 rounded-xl bg-interaction-primary/10 flex items-center justify-center flex-shrink-0 border border-interaction-primary/20">
            <BrainCircuit className="h-7 w-7 text-interaction-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-heading font-bold text-text-main mb-2">Curated Expert Matches</h1>
            <p className="text-text-muted text-lg max-w-2xl">Based on your challenge parameters, Matrix360 has identified strategic advisors whose expertise aligns with your objectives.</p>
          </div>
        </div>
        <div className="flex items-center space-x-2 text-sm text-text-muted bg-white px-4 py-2 rounded-full border border-border-light shadow-sm flex-shrink-0">
          <CheckCircle2 className="h-4 w-4 text-alert-opportunity" />
          <span className="font-medium">Analyzed 1,452 profiles in 1.2s</span>
        </div>
      </div>

      <div className="space-y-6">
        {MATCHES.map((match, i) => (
          <motion.div
            key={match.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="border-border-light bg-white hover:border-interaction-primary/30 hover:shadow-md transition-all overflow-hidden relative group">
              {i === 0 && (
                <div className="absolute top-0 right-0 bg-amber-500 text-white text-xs font-bold px-4 py-1.5 rounded-bl-lg z-10 shadow-sm">
                  Top Recommendation
                </div>
              )}
              <CardContent className="p-0 flex flex-col md:flex-row">
                {/* Left Column: Profile Info */}
                <div className="p-6 md:w-1/3 border-b md:border-b-0 md:border-r border-border-light bg-gray-50 flex flex-col items-center text-center">
                  <div className="relative mb-5">
                    <img 
                      src={match.img} 
                      alt={match.name} 
                      className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-sm group-hover:border-interaction-primary/20 transition-colors"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute -bottom-2 -right-2 h-12 w-12 rounded-full bg-white border-2 border-border-light flex flex-col items-center justify-center shadow-sm">
                      <span className="text-sm font-bold text-interaction-primary leading-none">{match.match}%</span>
                      <span className="text-[8px] font-bold text-text-muted uppercase tracking-wider mt-0.5">Match</span>
                    </div>
                  </div>
                  <Link to={`/consultants/${match.id}`} className="hover:underline">
                    <h3 className="text-xl font-bold text-text-main mb-1 group-hover:text-interaction-primary transition-colors">{match.name}</h3>
                  </Link>
                  <p className="text-sm font-medium text-text-muted mb-5">{match.title}</p>
                  
                  <div className="w-full space-y-3 text-left mb-6 bg-white p-3 rounded-lg border border-border-light">
                    <div className="flex items-center text-xs font-medium text-text-muted">
                      <MapPin className="h-4 w-4 mr-2 text-interaction-primary" />
                      {match.location}
                    </div>
                    <div className="flex items-center text-xs font-medium text-text-muted">
                      <Briefcase className="h-4 w-4 mr-2 text-interaction-primary" />
                      {match.exp} Experience
                    </div>
                  </div>

                  <div className="flex flex-wrap justify-center gap-2 mt-auto">
                    {match.tags.map(tag => (
                      <Badge key={tag} variant="secondary" className="text-[10px] px-2.5 py-1 bg-white border-border-light font-medium text-text-muted">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Right Column: AI Rationale & Actions */}
                <div className="p-6 md:w-2/3 flex flex-col">
                  <div className="mb-6">
                    <h4 className="text-sm font-bold text-text-main flex items-center mb-3 uppercase tracking-wider">
                      <BrainCircuit className="h-4 w-4 mr-2 text-interaction-primary" />
                      Strategic Alignment Rationale
                    </h4>
                    <p className="text-sm text-text-main leading-relaxed p-5 rounded-xl bg-interaction-primary/5 border border-interaction-primary/20 font-medium">
                      {match.rationale}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-5 mb-8">
                    <div className="p-4 rounded-xl bg-gray-50 border border-border-light">
                      <div className="flex justify-between items-center mb-2">
                        <p className="text-xs font-bold text-text-muted uppercase tracking-wider">Industry Fit</p>
                        <span className="text-xs font-bold text-interaction-primary">{match.match}%</span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-[var(--color-interaction-secondary)] to-[var(--color-ai-violet)] rounded-full transition-all duration-1000" style={{ width: `${match.match}%` }}></div>
                      </div>
                    </div>
                    <div className="p-4 rounded-xl bg-gray-50 border border-border-light">
                      <div className="flex justify-between items-center mb-2">
                        <p className="text-xs font-bold text-text-muted uppercase tracking-wider">Regional Expertise</p>
                        <span className="text-xs font-bold text-interaction-primary">{match.match > 90 ? 100 : match.match - 5}%</span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-[var(--color-interaction-secondary)] to-[var(--color-ai-violet)] rounded-full transition-all duration-1000" style={{ width: `${match.match > 90 ? 100 : match.match - 5}%` }}></div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-auto flex flex-col sm:flex-row gap-4 pt-6 border-t border-border-light">
                    <Link to="/enterprise/workspace" className="flex-1">
                      <Button variant="primary" className="w-full h-12 text-base shadow-sm">
                        <MessageSquare className="mr-2 h-5 w-5" />
                        Initiate Engagement
                      </Button>
                    </Link>
                    <Button variant="secondary" className="flex-1 h-12 text-base bg-white border-border-light hover:bg-gray-50 shadow-sm">
                      <Calendar className="mr-2 h-5 w-5 text-text-muted" />
                      Schedule Introduction
                    </Button>
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
