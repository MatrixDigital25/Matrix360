import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  BrainCircuit, Users, Target, 
  Activity, Zap, Briefcase, 
  Layers, LineChart, Network, 
  Cpu, Workflow, Video, Database,
  ArrowUpRight, MessageSquare, FileText,
  Sparkles, Clock, TrendingUp
} from 'lucide-react';
import { Button } from '@/src/components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/src/components/ui/Card';
import { Badge } from '@/src/components/ui/Badge';
import { cn } from '@/src/utils/cn';
import { SystemDiagram } from '@/src/components/ui/SystemDiagram';

export default function Home() {
  return (
    <div className="space-y-12 pb-12">
      {/* Hero Section - OS Style */}
      <section className="relative overflow-hidden rounded-3xl bg-brand-primary text-white p-10 md:p-12 shadow-2xl">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_var(--color-ai-cyan)_0%,_transparent_50%)]"></div>
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0 50 Q 25 25 50 50 T 100 50" fill="none" stroke="currentColor" strokeWidth="0.1" />
            <path d="M0 30 Q 25 55 50 30 T 100 30" fill="none" stroke="currentColor" strokeWidth="0.1" />
          </svg>
        </div>

        <div className="relative z-10 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="mb-6 bg-white/10 text-ai-cyan border-white/20 px-3 py-1">
              v2.5 Strategic Intelligence OS
            </Badge>
            <h1 className="text-4xl md:text-6xl font-heading font-bold tracking-tight mb-6 leading-tight">
              AI Strategy <br />
              <span className="text-ai-cyan">Operating System</span>
            </h1>
            <p className="text-lg md:text-xl text-white/80 mb-8 leading-relaxed">
              Matrix360 combines AI agents, automation systems, and expert consultants to help enterprises design intelligent strategies.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/challenges">
                <Button className="bg-interaction-primary hover:bg-interaction-primary/90 text-white border-none h-12 px-6">
                  Launch New Challenge
                </Button>
              </Link>
              <Link to="/ai-agents">
                <Button variant="secondary" className="bg-white/10 hover:bg-white/20 text-white border-white/20 h-12 px-6 backdrop-blur-sm">
                  Configure Agents
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Animated System Diagram */}
        <div className="absolute right-0 top-0 bottom-0 w-1/2 hidden lg:flex items-center justify-center pointer-events-none p-12">
          <SystemDiagram 
            type="agent-network" 
            className="w-full h-full bg-transparent border-none shadow-none opacity-60" 
          />
        </div>
      </section>

      {/* Workspace Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Strategic Intelligence Feed Module */}
        <Card className="lg:col-span-2 border-border-light shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between border-b border-border-light bg-gray-50/50 py-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-interaction-primary" />
              <CardTitle className="text-sm font-bold uppercase tracking-wider text-text-muted">Strategic Intelligence Feed</CardTitle>
            </div>
            <Link to="/feed" className="text-xs font-bold text-interaction-primary hover:underline flex items-center">
              View All <ArrowUpRight className="ml-1 h-3 w-3" />
            </Link>
          </CardHeader>
          <CardContent className="p-0 flex-1">
            <div className="divide-y divide-border-light">
              {[
                { title: 'APAC Market Entry Signal', time: '2h ago', type: 'Insight', author: 'AI Agent Alpha' },
                { title: 'Supply Chain Volatility Alert', time: '5h ago', type: 'Risk', author: 'Dr. Sarah Chen' },
                { title: 'New Automation Framework', time: '1d ago', type: 'System', author: 'Matrix Core' }
              ].map((item, i) => (
                <div key={i} className="p-5 hover:bg-gray-50 transition-colors cursor-pointer group">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="text-sm font-bold text-text-main group-hover:text-interaction-primary transition-colors">{item.title}</h4>
                    <Badge variant="secondary" className="text-[10px] px-1.5 py-0 h-4">{item.type}</Badge>
                  </div>
                  <div className="flex items-center gap-3 text-[10px] text-text-muted">
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {item.time}</span>
                    <span className="flex items-center gap-1"><Users className="h-3 w-3" /> {item.author}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* AI Reports Module */}
        <Card className="border-border-light shadow-sm hover:shadow-md transition-all flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between border-b border-border-light bg-gray-50/50 py-4">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-ai-violet" />
              <CardTitle className="text-sm font-bold uppercase tracking-wider text-text-muted">AI Reports</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-5 space-y-4">
            {[
              { name: 'Q1 Strategic Outlook', date: 'Mar 08', size: '2.4 MB' },
              { name: 'Competitor AI Audit', date: 'Mar 05', size: '1.8 MB' },
              { name: 'Workflow Efficiency', date: 'Feb 28', size: '4.1 MB' }
            ].map((doc, i) => (
              <div key={i} className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary-bg transition-all cursor-pointer group">
                <div className="h-10 w-10 rounded bg-ai-violet/5 flex items-center justify-center group-hover:bg-ai-violet/10 transition-colors">
                  <Database className="h-5 w-5 text-ai-violet" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-text-main truncate">{doc.name}</p>
                  <p className="text-[10px] text-text-muted">{doc.date} • {doc.size}</p>
                </div>
                <ArrowUpRight className="h-4 w-4 text-text-muted group-hover:text-interaction-primary transition-all" />
              </div>
            ))}
            <Button variant="secondary" className="w-full text-xs py-2 h-auto border-border-light">Generate New Report</Button>
          </CardContent>
        </Card>

        {/* Client Challenges Module */}
        <Card className="border-border-light shadow-sm hover:shadow-md transition-all">
          <CardHeader className="flex flex-row items-center justify-between border-b border-border-light bg-gray-50/50 py-4">
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-alert-risk" />
              <CardTitle className="text-sm font-bold uppercase tracking-wider text-text-muted">Active Challenges</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-5 space-y-4">
            {[
              { title: 'Global Logistics Optimization', status: 'Matching', experts: 3 },
              { title: 'Sustainability AI Integration', status: 'Consulting', experts: 5 }
            ].map((challenge, i) => (
              <div key={i} className="p-3 rounded-xl border border-border-light hover:border-interaction-primary/30 transition-all cursor-pointer">
                <p className="text-xs font-bold text-text-main mb-2">{challenge.title}</p>
                <div className="flex justify-between items-center">
                  <Badge className={cn(
                    "text-[10px] px-2 py-0",
                    challenge.status === 'Matching' ? "bg-amber-100 text-amber-700" : "bg-emerald-100 text-emerald-700"
                  )}>
                    {challenge.status}
                  </Badge>
                  <span className="text-[10px] text-text-muted">{challenge.experts} Experts Assigned</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Consultant Insights Module */}
        <Card className="border-border-light shadow-sm hover:shadow-md transition-all">
          <CardHeader className="flex flex-row items-center justify-between border-b border-border-light bg-gray-50/50 py-4">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-ai-cyan" />
              <CardTitle className="text-sm font-bold uppercase tracking-wider text-text-muted">Consultant Insights</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-5">
            <div className="flex -space-x-2 mb-4">
              {[1, 2, 3, 4].map(i => (
                <img key={i} src={`https://picsum.photos/seed/user${i}/100/100`} className="h-8 w-8 rounded-full border-2 border-white object-cover" referrerPolicy="no-referrer" />
              ))}
              <div className="h-8 w-8 rounded-full border-2 border-white bg-secondary-bg flex items-center justify-center text-[10px] font-bold text-text-muted">+12</div>
            </div>
            <p className="text-xs text-text-secondary leading-relaxed mb-4 italic">
              "The shift towards decentralized AI agents is accelerating. Enterprises should focus on governance frameworks now."
            </p>
            <div className="flex items-center gap-2">
              <p className="text-[10px] font-bold text-text-main">Marcus Thorne</p>
              <span className="text-[10px] text-text-muted">Strategy Architect</span>
            </div>
          </CardContent>
        </Card>

        {/* Project Updates Module */}
        <Card className="border-border-light shadow-sm hover:shadow-md transition-all">
          <CardHeader className="flex flex-row items-center justify-between border-b border-border-light bg-gray-50/50 py-4">
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-interaction-primary" />
              <CardTitle className="text-sm font-bold uppercase tracking-wider text-text-muted">Project Updates</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-5">
            <div className="space-y-4">
              <div className="relative pl-4 border-l-2 border-interaction-primary/20">
                <div className="absolute -left-[5px] top-0 h-2 w-2 rounded-full bg-interaction-primary"></div>
                <p className="text-[10px] font-bold text-text-main">Milestone Achieved</p>
                <p className="text-[10px] text-text-muted">Project Alpha: Phase 1 complete.</p>
              </div>
              <div className="relative pl-4 border-l-2 border-interaction-primary/20">
                <div className="absolute -left-[5px] top-0 h-2 w-2 rounded-full bg-gray-300"></div>
                <p className="text-[10px] font-bold text-text-main">System Update</p>
                <p className="text-[10px] text-text-muted">Automation pipeline v2 deployed.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

