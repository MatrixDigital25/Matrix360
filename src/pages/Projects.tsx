import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/src/components/ui/Card';
import { Badge } from '@/src/components/ui/Badge';
import { Button } from '@/src/components/ui/Button';
import { 
  Folder, 
  Clock, 
  Users, 
  CheckCircle2, 
  MoreHorizontal, 
  Plus, 
  Briefcase, 
  Calendar,
  Search,
  Filter,
  Target,
  Cpu,
  TrendingUp,
  ChevronRight,
  Zap,
  Activity,
  Layers,
  ArrowRight
} from 'lucide-react';
import { cn } from '@/src/utils/cn';

type ProjectPhase = 'Discovery' | 'Strategy Design' | 'Implementation' | 'Optimization';

interface ProjectMetric {
  label: string;
  value: string;
  trend: 'up' | 'down' | 'stable';
}

interface Project {
  id: number;
  name: string;
  client: string;
  strategicObjective: string;
  status: 'In Progress' | 'On Hold' | 'Completed';
  phase: ProjectPhase;
  timeline: {
    start: string;
    end: string;
  };
  consultants: { name: string; role: string; avatar?: string }[];
  aiAgents: { name: string; type: string }[];
  metrics: ProjectMetric[];
  progress: number;
  automationEnabled: boolean;
}

const PROJECTS: Project[] = [
  {
    id: 1,
    name: 'APAC Market Entry Strategy',
    client: 'Fintech Global Ltd.',
    strategicObjective: 'Establish 15% market share in Southeast Asia within 18 months through localized digital banking solutions.',
    status: 'In Progress',
    phase: 'Strategy Design',
    timeline: { start: 'Jan 2024', end: 'Oct 2024' },
    consultants: [
      { name: 'Stephen Raj', role: 'Lead Strategist' }
    ],
    aiAgents: [
      { name: 'Market Sentinel', type: 'Intelligence' },
      { name: 'Risk Navigator', type: 'Compliance' }
    ],
    metrics: [
      { label: 'Market Penetration', value: '4.2%', trend: 'up' },
      { label: 'Regulatory Approval', value: '60%', trend: 'up' }
    ],
    progress: 45,
    automationEnabled: true
  },
  {
    id: 2,
    name: 'EU AI Act Compliance Audit',
    client: 'EuroBank Group',
    strategicObjective: 'Ensure 100% compliance with upcoming EU AI Act regulations across all customer-facing algorithms.',
    status: 'In Progress',
    phase: 'Discovery',
    timeline: { start: 'Mar 2024', end: 'Nov 2024' },
    consultants: [
      { name: 'Stephen Raj', role: 'AI Ethics Lead' }
    ],
    aiAgents: [
      { name: 'Compliance Bot', type: 'Audit' }
    ],
    metrics: [
      { label: 'Risk Assessment', value: '25%', trend: 'stable' },
      { label: 'Gap Analysis', value: '15/40', trend: 'up' }
    ],
    progress: 20,
    automationEnabled: false
  },
  {
    id: 3,
    name: 'Supply Chain Risk Mitigation',
    client: 'AutoParts Corp.',
    strategicObjective: 'Reduce supply chain disruption impact by 40% through real-time monitoring and alternative sourcing strategies.',
    status: 'Completed',
    phase: 'Optimization',
    timeline: { start: 'Jun 2023', end: 'Mar 2024' },
    consultants: [
      { name: 'Stephen Raj', role: 'Operations Lead' }
    ],
    aiAgents: [
      { name: 'Supply Chain Oracle', type: 'Predictive' },
      { name: 'Logistics Optimizer', type: 'Execution' }
    ],
    metrics: [
      { label: 'Disruption Cost', value: '-32%', trend: 'down' },
      { label: 'Sourcing Diversity', value: '+25%', trend: 'up' }
    ],
    progress: 100,
    automationEnabled: true
  }
];

const PHASES: ProjectPhase[] = ['Discovery', 'Strategy Design', 'Implementation', 'Optimization'];

export default function Projects() {
  const [expandedProject, setExpandedProject] = useState<number | null>(null);

  return (
    <div className="space-y-12 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-heading font-bold text-text-main">Enterprise Transformation</h1>
          <p className="text-text-muted mt-1 text-sm md:text-base">Manage strategic objectives, consultants, and AI-driven execution.</p>
        </div>
        <Button className="h-10 px-6 bg-interaction-primary text-white border-none shadow-lg hover:shadow-interaction-primary/20 w-full sm:w-auto">
          <Plus className="mr-2 h-4 w-4" />
          Initiate Program
        </Button>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted group-focus-within:text-interaction-primary transition-colors" />
          <input 
            placeholder="Search programs..." 
            className="w-full pl-12 h-12 bg-white shadow-sm border border-border-light rounded-xl focus:ring-2 focus:ring-interaction-primary/20 focus:border-interaction-primary focus:outline-none transition-all"
          />
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" className="h-12 px-4 md:px-6 bg-white border-border-light hover:bg-secondary-bg flex-1 md:flex-none">
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </Button>
          <Button variant="secondary" className="h-12 px-4 md:px-6 bg-white border-border-light hover:bg-secondary-bg flex-1 md:flex-none">
            <Activity className="mr-2 h-4 w-4" />
            Metrics
          </Button>
        </div>
      </div>

      {/* Projects List */}
      <div className="space-y-6">
        {PROJECTS.map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className={cn(
              "bg-white border-border-light shadow-sm hover:shadow-md transition-all overflow-hidden",
              expandedProject === project.id && "ring-2 ring-interaction-primary/20 shadow-lg"
            )}>
              <CardContent className="p-0">
                {/* Main Row */}
                <div 
                  className="p-4 md:p-6 cursor-pointer hover:bg-secondary-bg/30 transition-colors"
                  onClick={() => setExpandedProject(expandedProject === project.id ? null : project.id)}
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                    <div className="flex items-start gap-4 flex-1">
                      <div className={cn(
                        "h-10 w-10 md:h-12 md:w-12 rounded-xl flex items-center justify-center border shrink-0",
                        project.status === 'Completed' ? "bg-alert-opportunity/10 border-alert-opportunity/20" : "bg-secondary-bg border-border-light"
                      )}>
                        <Briefcase className={cn(
                          "h-5 w-5 md:h-6 md:w-6",
                          project.status === 'Completed' ? "text-alert-opportunity" : "text-interaction-primary"
                        )} />
                      </div>
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-base md:text-lg font-bold text-text-main">{project.name}</h3>
                          <Badge variant="secondary" className={cn(
                            "text-[9px] md:text-[10px] uppercase tracking-wider px-2 py-0.5 border-none",
                            project.status === 'Completed' ? 'bg-alert-opportunity/10 text-alert-opportunity' : 
                            project.status === 'On Hold' ? 'bg-alert-risk/10 text-alert-risk' : 
                            'bg-interaction-primary/10 text-interaction-primary'
                          )}>
                            {project.status}
                          </Badge>
                        </div>
                        <p className="text-xs md:text-sm text-text-muted font-medium">{project.client}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 md:gap-6 lg:gap-12">
                      {/* Phase Indicator */}
                      <div className="hidden sm:block">
                        <p className="text-[9px] md:text-[10px] uppercase tracking-wider text-text-muted mb-2 font-bold">Current Phase</p>
                        <div className="flex items-center gap-1">
                          {PHASES.map((p, idx) => (
                            <div 
                              key={p} 
                              className={cn(
                                "h-1 w-6 md:h-1.5 md:w-8 rounded-full",
                                PHASES.indexOf(project.phase) >= idx ? "bg-interaction-primary" : "bg-border-light"
                              )}
                              title={p}
                            />
                          ))}
                          <span className="ml-2 text-[10px] md:text-[11px] font-bold text-interaction-primary">{project.phase}</span>
                        </div>
                      </div>

                      {/* Timeline */}
                      <div>
                        <p className="text-[9px] md:text-[10px] uppercase tracking-wider text-text-muted mb-1 font-bold">Timeline</p>
                        <div className="flex items-center gap-1.5 text-[10px] md:text-xs font-bold text-text-main">
                          <Calendar className="h-3 md:h-3.5 w-3 md:w-3.5 text-text-muted" />
                          {project.timeline.start} — {project.timeline.end}
                        </div>
                      </div>

                      {/* Progress */}
                      <div className="w-24 md:w-32">
                        <p className="text-[9px] md:text-[10px] uppercase tracking-wider text-text-muted mb-1 font-bold">Progress</p>
                        <div className="flex items-center gap-2 md:gap-3">
                          <div className="h-1.5 md:h-2 flex-1 bg-secondary-bg rounded-full overflow-hidden border border-border-light">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${project.progress}%` }}
                              className="h-full bg-interaction-primary" 
                            />
                          </div>
                          <span className="text-[10px] md:text-xs font-mono font-bold text-text-main">{project.progress}%</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 ml-auto lg:ml-0">
                        {project.automationEnabled && (
                          <div className="h-7 w-7 md:h-8 md:w-8 rounded-full bg-interaction-secondary/10 flex items-center justify-center text-interaction-secondary" title="Automation Active">
                            <Zap className="h-3.5 w-3.5 md:h-4 md:w-4 fill-current" />
                          </div>
                        )}
                        <ChevronRight className={cn(
                          "h-4 w-4 md:h-5 md:w-5 text-text-muted transition-transform",
                          expandedProject === project.id && "rotate-90"
                        )} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Expanded Details */}
                <AnimatePresence>
                  {expandedProject === project.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="border-t border-border-light bg-primary-bg/50"
                    >
                      <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left: Strategic Objective & Metrics */}
                        <div className="lg:col-span-2 space-y-6">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-interaction-primary">
                              <Target className="h-4 w-4" />
                              <h4 className="text-xs font-bold uppercase tracking-widest">Strategic Objective</h4>
                            </div>
                            <p className="text-sm text-text-main leading-relaxed font-medium bg-white p-4 rounded-xl border border-border-light shadow-sm">
                              {project.strategicObjective}
                            </p>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {project.metrics.map((metric, idx) => (
                              <div key={idx} className="bg-white p-4 rounded-xl border border-border-light shadow-sm flex items-center justify-between">
                                <div>
                                  <p className="text-[10px] text-text-muted font-bold uppercase tracking-wider">{metric.label}</p>
                                  <p className="text-xl font-mono font-bold text-text-main">{metric.value}</p>
                                </div>
                                <div className={cn(
                                  "h-8 w-8 rounded-lg flex items-center justify-center",
                                  metric.trend === 'up' ? "bg-alert-opportunity/10 text-alert-opportunity" : 
                                  metric.trend === 'down' ? "bg-alert-risk/10 text-alert-risk" : "bg-secondary-bg text-text-muted"
                                )}>
                                  <TrendingUp className={cn("h-4 w-4", metric.trend === 'down' && "rotate-180")} />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Right: Team & AI */}
                        <div className="space-y-6">
                          <div className="space-y-3">
                            <div className="flex items-center gap-2 text-interaction-primary">
                              <Users className="h-4 w-4" />
                              <h4 className="text-xs font-bold uppercase tracking-widest">Consultants</h4>
                            </div>
                            <div className="space-y-2">
                              {project.consultants.map((c, idx) => (
                                <div key={idx} className="flex items-center gap-3 bg-white p-2 rounded-lg border border-border-light">
                                  <div className="h-8 w-8 rounded-full bg-secondary-bg flex items-center justify-center text-xs font-bold text-interaction-primary border border-border-light">
                                    {c.name.charAt(0)}
                                  </div>
                                  <div>
                                    <p className="text-xs font-bold text-text-main">{c.name}</p>
                                    <p className="text-[10px] text-text-muted">{c.role}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="space-y-3">
                            <div className="flex items-center gap-2 text-ai-violet">
                              <Cpu className="h-4 w-4" />
                              <h4 className="text-xs font-bold uppercase tracking-widest">AI Agents</h4>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {project.aiAgents.map((a, idx) => (
                                <Badge key={idx} className="bg-ai-violet/10 text-ai-violet border-none px-3 py-1 text-[10px] font-bold">
                                  {a.name} • {a.type}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div className="pt-4">
                            <Button className="w-full bg-white border border-interaction-primary text-interaction-primary hover:bg-interaction-primary hover:text-white transition-all group">
                              Manage Workflows
                              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Footer Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <Card className="bg-interaction-primary text-white border-none shadow-xl">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-white/20 flex items-center justify-center">
              <Layers className="h-6 w-6" />
            </div>
            <div>
              <p className="text-white/60 text-xs font-bold uppercase tracking-widest">Total Portfolio Value</p>
              <p className="text-2xl font-mono font-bold">$12.4M</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white border-border-light shadow-sm">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-secondary-bg flex items-center justify-center border border-border-light">
              <CheckCircle2 className="h-6 w-6 text-alert-opportunity" />
            </div>
            <div>
              <p className="text-text-muted text-xs font-bold uppercase tracking-widest">Success Rate</p>
              <p className="text-2xl font-mono font-bold text-text-main">94%</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-border-light shadow-sm">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-secondary-bg flex items-center justify-center border border-border-light">
              <Zap className="h-6 w-6 text-interaction-secondary" />
            </div>
            <div>
              <p className="text-text-muted text-xs font-bold uppercase tracking-widest">Automated Tasks</p>
              <p className="text-2xl font-mono font-bold text-text-main">1,240</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
