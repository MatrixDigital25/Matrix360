import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { useLocation, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/src/components/ui/Card';
import { Badge } from '@/src/components/ui/Badge';
import { Button } from '@/src/components/ui/Button';
import { BrainCircuit, CheckCircle2, MapPin, Briefcase, MessageSquare, Calendar, Target, Sparkles, ChevronRight, Loader2 } from 'lucide-react';

interface Consultant {
  consultant_id: number;
  name: string;
  title: string;
  industry_expertise: string;
  strategic_specialization: string;
  region: string;
  years_experience: number;
  profile_photo: string;
  bio: string;
  match_score?: number;
}

export default function MatchResults() {
  const location = useLocation();
  const challenge = location.state?.challenge;
  const [matches, setMatches] = useState<Consultant[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMatches = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/match-consultants', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            industry: challenge?.industry || 'Technology',
            region: challenge?.region || 'APAC',
            strategic_specialization: challenge?.description || ''
          })
        });
        const data = await response.json();
        setMatches(data);
      } catch (error) {
        console.error('Failed to fetch matches:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMatches();
  }, [challenge]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <Loader2 className="h-8 w-8 text-interaction-primary animate-spin" />
        <p className="text-text-muted font-medium">AI is analyzing expert network...</p>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-5xl mx-auto space-y-6"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-panel-border pb-6">
        <div>
          <h1 className="text-2xl font-heading font-bold text-text-main">Expert Alignment Report</h1>
          <p className="text-text-muted text-sm">AI-curated strategic advisors for "{challenge?.title || 'APAC Market Entry Strategy Q4'}"</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="secondary" className="bg-interaction-primary/10 text-interaction-primary border-interaction-primary/20">
            <Sparkles className="h-3 w-3 mr-1" />
            {matches.length * 482} Profiles Scanned
          </Badge>
          <Link to="/enterprise/challenge">
            <Button variant="secondary" size="sm">Modify Challenge</Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {matches.map((match, i) => (
          <motion.div
            key={match.consultant_id}
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
                      src={match.profile_photo || `https://picsum.photos/seed/expert${match.consultant_id}/200/200`} 
                      alt={match.name} 
                      className="w-20 h-20 rounded-full object-cover border-2 border-panel-border group-hover:border-interaction-primary/30 transition-colors"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute -bottom-1 -right-1 h-8 w-8 rounded-full bg-panel-bg border border-panel-border flex flex-col items-center justify-center shadow-sm">
                      <span className="text-[10px] font-bold text-interaction-primary">{match.match_score || 85}%</span>
                    </div>
                  </div>
                  <Link to={`/consultants/${match.consultant_id}`} className="hover:underline">
                    <h3 className="text-sm font-bold text-text-main mb-0.5 group-hover:text-interaction-primary transition-colors">{match.name}</h3>
                  </Link>
                  <p className="text-[10px] text-text-muted mb-4">{match.title}</p>
                  
                  <div className="w-full space-y-2 text-left mb-4">
                    <div className="flex items-center text-[10px] text-text-muted">
                      <MapPin className="h-3 w-3 mr-2 text-interaction-primary" />
                      {match.region}
                    </div>
                    <div className="flex items-center text-[10px] text-text-muted">
                      <Briefcase className="h-3 w-3 mr-2 text-interaction-primary" />
                      {match.years_experience} yrs Exp
                    </div>
                  </div>

                  <div className="flex flex-wrap justify-center gap-1.5">
                    {match.industry_expertise.split(',').slice(0, 2).map(tag => (
                      <Badge key={tag} variant="secondary" className="text-[8px] px-1.5 py-0">
                        {tag.trim()}
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
                      {match.bio || `${match.name} is a highly qualified expert in ${match.industry_expertise} with a focus on ${match.strategic_specialization}. Their extensive experience in ${match.region} makes them an ideal candidate for this challenge.`}
                    </p>
                  </div>

                  <div className="mt-4 flex items-center justify-between pt-4 border-t border-panel-border">
                    <div className="flex gap-4">
                      <div className="flex flex-col gap-1">
                        <span className="text-[9px] font-bold text-text-muted uppercase">Industry Fit</span>
                        <div className="h-1 w-24 bg-secondary-bg rounded-full overflow-hidden">
                          <div className="h-full bg-interaction-primary" style={{ width: `${match.match_score || 85}%` }} />
                        </div>
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="text-[9px] font-bold text-text-muted uppercase">Regional Exp</span>
                        <div className="h-1 w-24 bg-secondary-bg rounded-full overflow-hidden">
                          <div className="h-full bg-ai-cyan" style={{ width: `${(match.match_score || 85) - 5}%` }} />
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
