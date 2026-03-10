import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/Card';
import { Badge } from '@/src/components/ui/Badge';
import { Button } from '@/src/components/ui/Button';
import { 
  Workflow, 
  Zap, 
  Settings, 
  Play, 
  Pause, 
  Plus, 
  Activity, 
  Clock, 
  Database, 
  Link2,
  ChevronRight,
  GitBranch,
  Layers,
  CheckCircle2,
  AlertCircle,
  BrainCircuit,
  ShieldCheck,
  ArrowRight,
  Search,
  TrendingUp,
  ShieldAlert,
  Target,
  BarChart3
} from 'lucide-react';
import { cn } from '@/src/utils/cn';

const WORKFLOWS = [
  {
    id: 1,
    name: 'Global Market Monitoring',
    type: 'Market monitoring',
    status: 'Active',
    trigger: 'Real-time Bloomberg/Reuters Feed',
    actions: 8,
    lastRun: '2m ago',
    successRate: '99.9%',
    description: 'Autonomous monitoring of global market shifts, currency volatility, and commodity price changes with automated impact reporting.',
    pipeline: ['Ingestion', 'AI Analysis', 'Validation', 'Execution']
  },
  {
    id: 2,
    name: 'Competitive Intelligence Tracker',
    type: 'Competitive tracking',
    status: 'Active',
    trigger: 'Webhooks / Social Signals',
    actions: 5,
    lastRun: '15m ago',
    successRate: '98.7%',
    description: 'Tracks competitor product launches, patent filings, and leadership changes across 12 key industry domains.',
    pipeline: ['Ingestion', 'AI Analysis', 'Validation', 'Execution']
  },
  {
    id: 3,
    name: 'Supply Chain Optimization',
    type: 'Operational optimization',
    status: 'Active',
    trigger: 'ERP Inventory Thresholds',
    actions: 12,
    lastRun: '1h ago',
    successRate: '100%',
    description: 'Dynamic re-routing of logistics and inventory rebalancing based on predictive demand modeling and disruption signals.',
    pipeline: ['Ingestion', 'AI Analysis', 'Validation', 'Execution']
  },
  {
    id: 4,
    name: 'Regulatory Risk Sentinel',
    type: 'Risk monitoring',
    status: 'Paused',
    trigger: 'Government Portal Updates',
    actions: 6,
    lastRun: '2d ago',
    successRate: '99.5%',
    description: 'Monitors global regulatory bodies for policy changes affecting enterprise compliance and ESG commitments.',
    pipeline: ['Ingestion', 'AI Analysis', 'Validation', 'Execution']
  }
];

const PIPELINE_STAGES = [
  { id: 'ingestion', label: 'Data Ingestion', icon: Database, color: 'text-blue-500', bg: 'bg-blue-500/10' },
  { id: 'processing', label: 'AI Processing', icon: BrainCircuit, color: 'text-ai-violet', bg: 'bg-ai-violet/10' },
  { id: 'validation', label: 'Validation', icon: ShieldCheck, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
  { id: 'execution', label: 'Execution', icon: Zap, color: 'text-amber-500', bg: 'bg-amber-500/10' },
];

export default function AutomationSystems() {
  const [activeWorkflowId, setActiveWorkflowId] = useState<number | null>(1);

  const activeWorkflow = WORKFLOWS.find(w => w.id === activeWorkflowId);

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold text-text-main mb-1">Strategic Automation</h1>
          <p className="text-text-muted text-sm">Orchestrate enterprise-grade strategic workflows and autonomous data pipelines.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="secondary" className="bg-white border-border-light text-text-main h-11 px-6 rounded-xl shadow-sm">
            <Settings className="h-4 w-4 mr-2" />
            System Config
          </Button>
          <Button className="bg-interaction-primary text-white rounded-xl shadow-lg font-bold h-11 px-6 hover:shadow-interaction-primary/20 transition-all">
            <Plus className="h-4 w-4 mr-2" />
            New Workflow
          </Button>
        </div>
      </div>

      {/* Pipeline Visualization Section */}
      <Card className="border-border-light bg-white shadow-xl overflow-hidden">
        <CardHeader className="py-4 border-b border-border-light bg-secondary-bg/30 flex flex-row items-center justify-between">
          <CardTitle className="text-xs font-bold uppercase tracking-widest flex items-center text-text-muted">
            <Activity className="h-4 w-4 mr-2 text-interaction-primary" />
            Active Pipeline Orchestration
          </CardTitle>
          {activeWorkflow && (
            <Badge variant="secondary" className="bg-interaction-primary/10 text-interaction-primary border-none text-[10px] font-bold">
              Monitoring: {activeWorkflow.name}
            </Badge>
          )}
        </CardHeader>
        <CardContent className="p-8">
          <div className="relative flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4">
            {/* Connecting Lines (Desktop) */}
            <div className="absolute top-1/2 left-0 w-full h-px bg-border-light -translate-y-1/2 hidden md:block z-0" />
            
            {PIPELINE_STAGES.map((stage, idx) => (
              <div key={stage.id} className="relative z-10 flex flex-col items-center gap-4 group">
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  className={cn(
                    "h-20 w-20 rounded-2xl flex items-center justify-center border-2 shadow-xl transition-all duration-500",
                    stage.bg,
                    "border-white group-hover:scale-110"
                  )}
                >
                  <stage.icon className={cn("h-10 w-10", stage.color)} />
                  
                  {/* Pulse Effect for Active Stage */}
                  {idx === 1 && (
                    <div className="absolute inset-0 rounded-2xl border-2 border-ai-violet animate-ping opacity-20" />
                  )}
                </motion.div>
                <div className="text-center">
                  <p className="text-xs font-bold text-text-main mb-1">{stage.label}</p>
                  <p className="text-[10px] text-text-muted font-medium">
                    {idx === 0 ? "1.2GB/s Inflow" : 
                     idx === 1 ? "Gemini 3.1 Pro" : 
                     idx === 2 ? "99.9% Confidence" : 
                     "Webhook Triggered"}
                  </p>
                </div>
                
                {/* Arrow for Mobile */}
                {idx < PIPELINE_STAGES.length - 1 && (
                  <ArrowRight className="h-6 w-6 text-border-light md:hidden" />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Workflows List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-sm font-bold text-text-main uppercase tracking-widest flex items-center gap-2">
              <GitBranch className="h-4 w-4 text-interaction-primary" />
              Strategic Workflows
            </h2>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-text-muted" />
                <input 
                  type="text" 
                  placeholder="Filter workflows..." 
                  className="bg-white border border-border-light rounded-lg pl-9 pr-3 py-1.5 text-[11px] focus:outline-none focus:ring-2 focus:ring-interaction-primary/20 w-48"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {WORKFLOWS.map((workflow) => (
              <motion.div
                key={workflow.id}
                onClick={() => setActiveWorkflowId(workflow.id)}
                className="cursor-pointer"
              >
                <Card className={cn(
                  "border-border-light bg-white shadow-sm hover:shadow-md transition-all group overflow-hidden",
                  activeWorkflowId === workflow.id && "ring-2 ring-interaction-primary/30 border-interaction-primary/30"
                )}>
                  <CardContent className="p-0">
                    <div className="flex flex-col md:flex-row">
                      <div className="flex-1 p-6">
                        <div className="flex items-center gap-3 mb-3">
                          <div className={cn(
                            "h-10 w-10 rounded-xl flex items-center justify-center border shadow-sm",
                            workflow.status === 'Active' ? "bg-alert-opportunity/10 border-alert-opportunity/20" : "bg-secondary-bg border-border-light"
                          )}>
                            {workflow.type === 'Market monitoring' && <TrendingUp className="h-5 w-5 text-interaction-primary" />}
                            {workflow.type === 'Competitive tracking' && <Target className="h-5 w-5 text-interaction-primary" />}
                            {workflow.type === 'Operational optimization' && <BarChart3 className="h-5 w-5 text-interaction-primary" />}
                            {workflow.type === 'Risk monitoring' && <ShieldAlert className="h-5 w-5 text-alert-risk" />}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="text-sm font-bold text-text-main group-hover:text-interaction-primary transition-colors">{workflow.name}</h3>
                              <Badge className="bg-secondary-bg text-text-muted border-none text-[8px] font-bold uppercase py-0 px-1.5">
                                {workflow.type}
                              </Badge>
                            </div>
                            <p className="text-[10px] text-text-muted flex items-center gap-2 mt-0.5">
                              <span className="flex items-center gap-1"><Zap className="h-3 w-3" /> {workflow.trigger}</span>
                              <span className="h-1 w-1 rounded-full bg-border-light"></span>
                              <span className="flex items-center gap-1"><Layers className="h-3 w-3" /> {workflow.actions} Actions</span>
                            </p>
                          </div>
                        </div>
                        <p className="text-xs text-text-muted leading-relaxed mb-4">
                          {workflow.description}
                        </p>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1.5">
                            <CheckCircle2 className="h-3 w-3 text-alert-opportunity" />
                            <span className="text-[10px] font-bold text-text-main">{workflow.successRate} Success</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Clock className="h-3 w-3 text-text-muted" />
                            <span className="text-[10px] text-text-muted">Last run: {workflow.lastRun}</span>
                          </div>
                        </div>
                      </div>
                      <div className="w-full md:w-40 shrink-0 bg-secondary-bg/30 border-t md:border-t-0 md:border-l border-border-light p-6 flex flex-col justify-center gap-3">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider">Status</span>
                          <Badge className={cn(
                            "text-[9px] font-bold h-5",
                            workflow.status === 'Active' ? "bg-alert-opportunity/10 text-alert-opportunity border-alert-opportunity/20" : "bg-secondary-bg text-text-muted border-border-light"
                          )}>
                            {workflow.status}
                          </Badge>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="secondary" size="sm" className="flex-1 h-9 rounded-xl bg-white border-border-light shadow-sm hover:bg-secondary-bg">
                            {workflow.status === 'Active' ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
                          </Button>
                          <Button variant="secondary" size="sm" className="flex-1 h-9 rounded-xl bg-white border-border-light shadow-sm hover:bg-secondary-bg">
                            <Settings className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Sidebar: System Health & Integrations */}
        <div className="space-y-6">
          <Card className="border-border-light bg-white shadow-sm overflow-hidden">
            <CardHeader className="py-4 border-b border-border-light bg-secondary-bg/30">
              <CardTitle className="text-[10px] font-bold uppercase tracking-widest flex items-center text-text-muted">
                <Activity className="h-4 w-4 mr-2 text-interaction-primary" />
                System Performance
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-text-muted">Throughput</span>
                  <span className="text-xs font-bold text-text-main">1.2k req/min</span>
                </div>
                <div className="h-1.5 w-full bg-secondary-bg rounded-full overflow-hidden">
                  <div className="h-full bg-interaction-primary w-[75%]" />
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-text-muted">AI Latency</span>
                  <span className="text-xs font-bold text-text-main">240ms</span>
                </div>
                <div className="h-1.5 w-full bg-secondary-bg rounded-full overflow-hidden">
                  <div className="h-full bg-ai-violet w-[40%]" />
                </div>
              </div>
              <div className="pt-2">
                <div className="p-4 rounded-xl bg-alert-opportunity/5 border border-alert-opportunity/20 flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-alert-opportunity" />
                  <div>
                    <p className="text-[11px] font-bold text-alert-opportunity uppercase">All Nodes Healthy</p>
                    <p className="text-[10px] text-text-muted">Last check: 1m ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border-light bg-white shadow-sm overflow-hidden">
            <CardHeader className="py-4 border-b border-border-light bg-secondary-bg/30">
              <CardTitle className="text-[10px] font-bold uppercase tracking-widest flex items-center text-text-muted">
                <Link2 className="h-4 w-4 mr-2 text-interaction-primary" />
                Integration Nodes
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="grid grid-cols-3 gap-2">
                {['Salesforce', 'Slack', 'Jira', 'AWS', 'GCP', 'Azure'].map((node) => (
                  <div key={node} className="p-2 rounded-lg border border-border-light bg-secondary-bg/20 flex flex-col items-center gap-1 hover:border-interaction-primary/30 transition-all cursor-pointer">
                    <Database className="h-4 w-4 text-text-muted" />
                    <span className="text-[8px] font-bold text-text-secondary">{node}</span>
                  </div>
                ))}
              </div>
              <Button variant="text" className="w-full mt-4 h-8 text-[10px] font-bold text-interaction-primary hover:bg-interaction-primary/5">
                Manage Integrations
                <ChevronRight className="h-3 w-3 ml-1" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
