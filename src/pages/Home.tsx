import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  BrainCircuit, Users, Target, 
  Activity, Zap, Briefcase, 
  Layers, LineChart, Network, 
  Cpu, Workflow, Video, Database,
  ArrowUpRight, MessageSquare, FileText,
  Sparkles, Clock, TrendingUp, ShieldAlert,
  Globe, LayoutDashboard, Rocket, Search,
  ChevronRight, AlertCircle, Lightbulb,
  ArrowRight, BarChart3, ShieldCheck
} from 'lucide-react';
import { Button } from '@/src/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/src/components/ui/Card';
import { Badge } from '@/src/components/ui/Badge';
import { cn } from '@/src/utils/cn';
import { SystemDiagram } from '@/src/components/ui/SystemDiagram';
import { NetworkGraph } from '@/src/components/ui/Charts';

export default function Home() {
  // Mock data for Knowledge Graph
  const graphNodes = [
    { id: '1', label: 'Market Entry', x: 50, y: 50, size: 8, color: '#18181B' },
    { id: '2', label: 'APAC Region', x: 30, y: 30, size: 6, color: '#71717A' },
    { id: '3', label: 'Regulatory', x: 70, y: 30, size: 6, color: '#71717A' },
    { id: '4', label: 'Supply Chain', x: 30, y: 70, size: 6, color: '#71717A' },
    { id: '5', label: 'AI Strategy', x: 70, y: 70, size: 6, color: '#71717A' },
  ];

  const graphLinks = [
    { source: '1', target: '2', value: 2 },
    { source: '1', target: '3', value: 2 },
    { source: '1', target: '4', value: 2 },
    { source: '1', target: '5', value: 2 },
    { source: '2', target: '4', value: 1 },
    { source: '3', target: '5', value: 1 },
  ];

  return (
    <div className="space-y-12 pb-12">
      {/* 1. HERO PANEL - Strategic Command Center Style */}
      <section className="relative overflow-hidden rounded-3xl text-white p-8 md:p-14 shadow-2xl border border-white/10 flex flex-col items-center justify-center min-h-[360px]">
        <img src="/banner.png" alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/40 pointer-events-none"></div>

        <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center"
          >
            <div className="flex items-center gap-3 mb-6">
              <Badge className="bg-white/10 text-white border-white/20 px-4 py-1.5 backdrop-blur-md text-[10px] font-bold uppercase tracking-[0.2em]">
                Worlds first
              </Badge>
              <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
            </div>
            
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-sans font-bold tracking-tight mb-6 leading-[1.2] text-white drop-shadow-lg" style={{ color: 'white' }}>
              Transform your business<br />
              <span className="text-lg md:text-2xl lg:text-3xl font-light italic">with</span><br />
              <span className="text-2xl md:text-4xl lg:text-5xl">Hybrid Intelligence</span>
            </h1>
            
            <p className="text-base text-white/90 mb-8 leading-relaxed max-w-2xl font-light">
              The Matrix360 Strategic Intelligence Operating System orchestrates human intelligence, data science, artificial intelligence, expert networks, and AI agents to accelerate transformation and future ready growth.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/enterprise/challenge">
                <Button className="bg-white text-zinc-900 hover:bg-zinc-200 border-none h-12 px-8 font-bold rounded-lg transition-all">
                  Launch Challenge
                </Button>
              </Link>
              <Link to="/strategy-room">
                <Button variant="secondary" className="bg-white/5 hover:bg-white/10 text-white border-white/10 h-12 px-8 rounded-lg backdrop-blur-sm">
                  Strategy Room
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. DASHBOARD GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* COLUMN 1: GLOBAL INTELLIGENCE SIGNALS */}
        <div className="space-y-8">
          <section className="space-y-4">
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-zinc-400" />
                <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-400">Global Signals</h2>
              </div>
              <span className="text-[9px] font-bold text-emerald-600 uppercase tracking-widest flex items-center gap-1">
                <div className="h-1 w-1 rounded-full bg-emerald-500 animate-pulse"></div>
                Live Feed
              </span>
            </div>
            <div className="enterprise-card overflow-hidden">
              <div className="divide-y divide-zinc-100">
                {[
                  { title: 'APAC Data Sovereignty Shift', type: 'Regulatory', impact: 'High', time: '12m ago' },
                  { title: 'Quantum Computing Breakthrough', type: 'Technology', impact: 'Medium', time: '45m ago' },
                  { title: 'EU Supply Chain Directive', type: 'Regulatory', impact: 'High', time: '2h ago' },
                  { title: 'Global Semiconductor Shortage', type: 'Market', impact: 'High', time: '4h ago' },
                ].map((signal, i) => (
                  <div key={i} className="p-5 hover:bg-zinc-50 transition-colors cursor-pointer group">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-zinc-400">{signal.type}</span>
                      <span className="text-[9px] text-zinc-300 font-medium">{signal.time}</span>
                    </div>
                    <h4 className="text-sm font-bold text-zinc-900 group-hover:text-zinc-600 transition-colors mb-2">{signal.title}</h4>
                    <div className="flex items-center gap-2">
                      <div className={cn("h-1 w-1 rounded-full", signal.impact === 'High' ? "bg-red-500" : "bg-emerald-500")}></div>
                      <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest">{signal.impact} Impact</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4 bg-zinc-50/50 border-t border-zinc-100">
                <Link to="/ai-intelligence" className="text-[10px] font-bold text-zinc-900 hover:underline flex items-center justify-center gap-2">
                  View Intelligence Feed <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          </section>

          {/* AI STRATEGY RECOMMENDATIONS */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 px-1">
              <Sparkles className="h-4 w-4 text-zinc-400" />
              <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-400">AI Insights</h2>
            </div>
            <div className="enterprise-card p-5 space-y-5 bg-zinc-50/30">
              {[
                { title: 'Portfolio Optimization', desc: 'AI suggests reallocating 15% of APAC budget based on new signals.', icon: TrendingUp },
                { title: 'Risk Mitigation', desc: 'Regulatory alerts suggest updating data sovereignty protocols.', icon: ShieldCheck }
              ].map((insight, i) => (
                <div key={i} className="p-5 rounded-xl bg-white border border-zinc-200 hover:border-zinc-400 transition-all cursor-pointer group">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-lg bg-zinc-50 border border-zinc-100 group-hover:bg-zinc-900 group-hover:text-white transition-all">
                      <insight.icon className="h-4 w-4" />
                    </div>
                    <h5 className="text-sm font-bold text-zinc-900">{insight.title}</h5>
                  </div>
                  <p className="text-xs text-zinc-500 leading-relaxed mb-4 font-light">{insight.desc}</p>
                  <button className="text-[10px] font-bold text-zinc-900 uppercase tracking-[0.2em] hover:underline flex items-center gap-1">
                    Analyze <ChevronRight className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* COLUMN 2: ACTIVE TRANSFORMATION INITIATIVES & KNOWLEDGE GRAPH */}
        <div className="space-y-8">
          <section className="space-y-4">
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-2">
                <Workflow className="h-4 w-4 text-zinc-400" />
                <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-400">Active Initiatives</h2>
              </div>
              <Link to="/projects" className="text-[10px] font-bold text-zinc-900 hover:underline">View All</Link>
            </div>
            <div className="space-y-4">
              {[
                { name: 'APAC Market Entry', status: 'Strategy Design', progress: 45, icon: Globe },
                { name: 'Supply Chain AI', status: 'Implementation', progress: 72, icon: Cpu },
                { name: 'Digital Transformation', status: 'Discovery', progress: 28, icon: Zap },
              ].map((project, i) => (
                <div key={i} className="enterprise-card p-5 group cursor-pointer">
                  <div className="flex items-center gap-4 mb-5">
                    <div className="h-10 w-10 bg-zinc-50 rounded-lg flex items-center justify-center text-zinc-400 border border-zinc-100 group-hover:bg-zinc-900 group-hover:text-white transition-all">
                      <project.icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <h4 className="text-sm font-bold text-zinc-900 truncate">{project.name}</h4>
                        <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest">{project.status}</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-[9px] font-bold text-zinc-400 uppercase tracking-widest">
                      <span>Progress</span>
                      <span className="text-zinc-900">{project.progress}%</span>
                    </div>
                    <div className="h-1 w-full bg-zinc-100 rounded-full overflow-hidden">
                      <div className="h-full bg-zinc-900 rounded-full transition-all duration-1000" style={{ width: `${project.progress}%` }}></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* KNOWLEDGE GRAPH PREVIEW */}
          <section className="space-y-4">
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-2">
                <Network className="h-4 w-4 text-zinc-400" />
                <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-400">Knowledge Graph</h2>
              </div>
              <Link to="/knowledge-graph" className="text-[10px] font-bold text-zinc-900 hover:underline">Explore</Link>
            </div>
            <div className="enterprise-card overflow-hidden h-72 relative bg-zinc-50/30">
              <NetworkGraph nodes={graphNodes} links={graphLinks} height={288} />
              <div className="absolute bottom-4 left-4 p-3 bg-white/80 backdrop-blur-md rounded-lg border border-zinc-200 text-[9px] font-bold text-zinc-400 uppercase tracking-[0.2em]">
                12 Strategic Nodes • 5 Active Domains
              </div>
            </div>
          </section>
        </div>

        {/* COLUMN 3: CONSULTANT NETWORK ACTIVITY */}
        <div className="space-y-8">
          <section className="space-y-4">
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-zinc-400" />
                <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-400">Expert Network</h2>
              </div>
              <Link to="/network" className="text-[10px] font-bold text-zinc-900 hover:underline">Network</Link>
            </div>
            <div className="enterprise-card overflow-hidden">
              <div className="divide-y divide-zinc-100">
                {[
                  { name: 'Dr. Sarah Chen', role: 'AI Strategy Expert', insight: 'Regulatory shifts in Singapore require immediate attention for APAC entry.', time: '2h ago', img: 'https://picsum.photos/seed/sarah/100/100' },
                  { name: 'Marcus Thorne', role: 'Operations Architect', insight: 'New logistics corridor in Vietnam offers 15% cost reduction potential.', time: '5h ago', img: 'https://picsum.photos/seed/marcus/100/100' },
                  { name: 'Elena Rodriguez', role: 'Policy Advisor', insight: 'EU Supply Chain Directive draft includes new transparency requirements.', time: '1d ago', img: 'https://picsum.photos/seed/elena/100/100' },
                ].map((item, i) => (
                  <div key={i} className="p-5 hover:bg-zinc-50 transition-colors cursor-pointer group">
                    <div className="flex items-center gap-4 mb-4">
                      <img src={item.img} className="h-10 w-10 rounded-full object-cover border border-zinc-200 grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all" referrerPolicy="no-referrer" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-zinc-900 truncate">{item.name}</p>
                        <p className="text-[10px] text-zinc-400 font-medium uppercase tracking-wider">{item.role}</p>
                      </div>
                    </div>
                    <p className="text-xs text-zinc-500 leading-relaxed italic font-serif">"{item.insight}"</p>
                    <p className="text-[9px] text-zinc-300 mt-3 font-bold uppercase tracking-widest">{item.time}</p>
                  </div>
                ))}
              </div>
              <div className="p-5 bg-zinc-900 text-white">
                <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.2em] mb-4">
                  <span className="text-zinc-400">Network Status</span>
                  <span className="text-emerald-400">1,240 Active</span>
                </div>
                <Link to="/marketplace">
                  <Button className="w-full bg-white text-zinc-900 hover:bg-zinc-200 border-none h-10 text-[10px] font-bold uppercase tracking-widest">
                    Access Marketplace
                  </Button>
                </Link>
              </div>
            </div>
          </section>

          {/* SYSTEM STATS */}
          <section className="space-y-4">
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-emerald-500" />
                <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-400">Performance</h2>
              </div>
              <Link to="/analytics" className="text-[10px] font-bold text-zinc-900 hover:underline">Full Report</Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="enterprise-card p-5 text-center">
                <p className="text-[9px] font-bold text-zinc-400 uppercase tracking-[0.2em] mb-2">AI Reasoning</p>
                <p className="text-2xl font-bold text-zinc-900">98.4%</p>
              </div>
              <div className="enterprise-card p-5 text-center">
                <p className="text-[9px] font-bold text-zinc-400 uppercase tracking-[0.2em] mb-2">Expert Match</p>
                <p className="text-2xl font-bold text-zinc-900">0.4s</p>
              </div>
            </div>
          </section>
        </div>

      </div>
    </div>
  );
}

