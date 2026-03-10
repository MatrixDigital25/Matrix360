import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/Card';
import { Badge } from '@/src/components/ui/Badge';
import { Button } from '@/src/components/ui/Button';
import { 
  BrainCircuit, 
  Zap, 
  Activity, 
  Settings, 
  Play, 
  Square, 
  RefreshCw, 
  Search,
  Plus,
  Cpu,
  Database,
  ShieldCheck,
  ChevronRight,
  Terminal,
  Globe,
  Target,
  Layers,
  TrendingUp,
  Network,
  MessageSquare,
  BarChart3,
  Loader2
} from 'lucide-react';
import { cn } from '@/src/utils/cn';

interface AIAgent {
  agent_id: number;
  name: string;
  type: string;
  status: string;
  config: string;
  created_at: string;
}

export default function AIAgents() {
  const [agents, setAgents] = useState<AIAgent[]>([]);
  const [loading, setLoading] = useState(true);
  const [deploying, setDeploying] = useState(false);

  const fetchAgents = async () => {
    try {
      const res = await fetch('/api/ai-agents');
      if (res.ok) {
        const data = await res.json();
        setAgents(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAgents();
  }, []);

  const deployAgent = async () => {
    setDeploying(true);
    try {
      const res = await fetch('/api/ai-agents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: `New ${['Strategist', 'Analyst', 'Researcher'][Math.floor(Math.random() * 3)]} Agent`,
          type: ['STRATEGIST', 'ANALYST', 'RESEARCHER'][Math.floor(Math.random() * 3)],
          config: { focus: 'General' }
        })
      });
      if (res.ok) {
        fetchAgents();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setDeploying(false);
    }
  };

  const getAgentIcon = (type: string) => {
    switch (type) {
      case 'STRATEGIST': return Target;
      case 'ANALYST': return Zap;
      case 'RESEARCHER': return Globe;
      default: return BrainCircuit;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading font-bold text-text-main mb-1">AI Strategy Engine</h1>
          <p className="text-text-muted text-sm">Autonomous intelligence agents driving enterprise-scale strategic transformation.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" onClick={fetchAgents} className="h-10 border-border-light shadow-sm">
            <RefreshCw className={cn("h-4 w-4 mr-2", loading && "animate-spin")} />
            Sync All
          </Button>
          <Button 
            onClick={deployAgent}
            disabled={deploying}
            className="h-10 bg-interaction-primary text-white rounded-xl shadow-md font-bold px-6"
          >
            {deploying ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Plus className="h-4 w-4 mr-2" />}
            Deploy New Agent
          </Button>
        </div>
      </div>

      {/* System Health Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Active Agents', value: '12', icon: BrainCircuit, color: 'text-interaction-primary' },
          { label: 'Total Tasks (24h)', value: '1,428', icon: Activity, color: 'text-alert-opportunity' },
          { label: 'Compute Usage', value: '64%', icon: Cpu, color: 'text-ai-violet' },
          { label: 'Data Ingested', value: '4.2 TB', icon: Database, color: 'text-alert-warning' }
        ].map((stat) => (
          <Card key={stat.label} className="border-border-light bg-white shadow-sm">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="h-10 w-10 rounded-xl bg-secondary-bg flex items-center justify-center">
                <stat.icon className={cn("h-5 w-5", stat.color)} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-text-muted uppercase tracking-wider">{stat.label}</p>
                <p className="text-lg font-bold text-text-main">{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Agents Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {loading ? (
          <div className="lg:col-span-2 py-20 flex flex-col items-center justify-center text-zinc-400 gap-4">
            <Loader2 className="h-8 w-8 animate-spin" />
            <p className="text-xs font-bold uppercase tracking-[0.2em]">Synchronizing Agent Network...</p>
          </div>
        ) : agents.length === 0 ? (
          <div className="lg:col-span-2 py-20 flex flex-col items-center justify-center text-zinc-400 gap-4 border-2 border-dashed border-zinc-200 rounded-3xl">
            <BrainCircuit className="h-12 w-12 opacity-20" />
            <p className="text-xs font-bold uppercase tracking-[0.2em]">No Active Agents Deployed</p>
            <Button onClick={deployAgent} variant="secondary">Deploy First Agent</Button>
          </div>
        ) : agents.map((agent) => {
          const Icon = getAgentIcon(agent.type);
          return (
            <motion.div
              key={agent.agent_id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="border-border-light bg-white shadow-sm hover:shadow-md transition-all overflow-hidden rounded-2xl">
                <CardHeader className="pb-2 border-b border-border-light/50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "h-10 w-10 rounded-xl flex items-center justify-center border shadow-sm",
                        agent.status === 'Active' ? "bg-interaction-primary/10 border-interaction-primary/20" : "bg-secondary-bg border-border-light"
                      )}>
                        <Icon className={cn(
                          "h-5 w-5",
                          agent.status === 'Active' ? "text-interaction-primary" : "text-text-muted"
                        )} />
                      </div>
                      <div>
                        <CardTitle className="text-sm font-bold text-text-main">{agent.name}</CardTitle>
                        <div className="flex items-center gap-2 mt-0.5">
                          <Badge variant="secondary" className="bg-secondary-bg text-text-muted border-none text-[8px] uppercase tracking-wider px-1.5 h-4">
                            {agent.type}
                          </Badge>
                          <span className="text-[10px] text-text-muted flex items-center gap-1">
                            <ShieldCheck className="h-3 w-3 text-emerald-500" />
                            Enterprise Grade
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button variant="text" size="sm" className="h-8 w-8 p-0 rounded-lg hover:bg-secondary-bg">
                        <Settings className="h-4 w-4 text-text-muted" />
                      </Button>
                      <Button variant="text" size="sm" className="h-8 w-8 p-0 rounded-lg hover:bg-secondary-bg">
                        {agent.status === 'Active' ? <Square className="h-4 w-4 text-alert-risk" /> : <Play className="h-4 w-4 text-alert-opportunity" />}
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-5 space-y-4">
                  <p className="text-xs text-text-muted leading-relaxed">
                    Autonomous {agent.type.toLowerCase()} agent deployed on {new Date(agent.created_at).toLocaleDateString()}. 
                    Configured for high-fidelity strategic synthesis and real-time market monitoring.
                  </p>

                  <div className="grid grid-cols-4 gap-2 py-3 border-y border-border-light/50">
                    <div className="text-center">
                      <p className="text-[8px] font-bold text-text-muted uppercase tracking-wider mb-1">Status</p>
                      <Badge className={cn(
                        "text-[8px] font-bold h-4 px-1",
                        agent.status === 'Active' ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-gray-50 text-gray-500 border-gray-100"
                      )}>
                        {agent.status}
                      </Badge>
                    </div>
                    <div className="text-center">
                      <p className="text-[8px] font-bold text-text-muted uppercase tracking-wider mb-1">Accuracy</p>
                      <p className="text-[11px] font-bold text-text-main">98.4%</p>
                    </div>
                    <div className="text-center">
                      <p className="text-[8px] font-bold text-text-muted uppercase tracking-wider mb-1">Uptime</p>
                      <p className="text-[11px] font-bold text-text-main">99.99%</p>
                    </div>
                    <div className="text-center">
                      <p className="text-[8px] font-bold text-text-muted uppercase tracking-wider mb-1">Insights</p>
                      <p className="text-[11px] font-bold text-interaction-primary">1,240</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-[9px] font-bold text-text-muted uppercase tracking-wider flex items-center gap-1">
                        <Activity className="h-3 w-3" />
                        Current Task
                      </span>
                    </div>
                    <div className="p-2.5 bg-secondary-bg/50 rounded-xl border border-border-light/50">
                      <p className="text-[10px] text-text-main font-medium leading-relaxed">
                        Scanning global market signals for strategic opportunities...
                      </p>
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-1.5">
                      <div className="flex -space-x-1.5">
                        <div className="h-5 w-5 rounded-full bg-interaction-primary/10 border border-white flex items-center justify-center" title="Intelligence Feed">
                          <TrendingUp className="h-2.5 w-2.5 text-interaction-primary" />
                        </div>
                        <div className="h-5 w-5 rounded-full bg-ai-violet/10 border border-white flex items-center justify-center" title="Strategy Rooms">
                          <MessageSquare className="h-2.5 w-2.5 text-ai-violet" />
                        </div>
                        <div className="h-5 w-5 rounded-full bg-emerald-100 border border-white flex items-center justify-center" title="Knowledge Graph">
                          <Network className="h-2.5 w-2.5 text-emerald-600" />
                        </div>
                      </div>
                      <span className="text-[8px] font-bold text-text-muted uppercase tracking-widest">Auto-Sync Active</span>
                    </div>
                    <Button variant="secondary" size="sm" className="h-8 text-[10px] font-bold px-3 rounded-lg border-border-light shadow-sm">
                      Deploy to Project
                      <ChevronRight className="h-3 w-3 ml-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Activity Log (Mock) */}
      <Card className="border-border-light bg-white shadow-sm overflow-hidden">
        <CardHeader className="py-4 border-b border-border-light bg-secondary-bg/30">
          <CardTitle className="text-xs font-bold uppercase tracking-wider flex items-center">
            <Activity className="h-4 w-4 mr-2 text-interaction-primary" />
            Live Agent Activity Log
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-border-light">
            {[
              { time: '10:45:12', agent: 'Market Sentinel', action: 'Detected regulatory shift in Singapore Fintech sector', type: 'info' },
              { time: '10:42:05', agent: 'Supply Chain Opt', action: 'Rerouted shipment Alpha-4 due to port congestion', type: 'success' },
              { time: '10:38:44', agent: 'Scenario Builder', action: 'Simulation #482 completed with 94% confidence', type: 'info' },
              { time: '10:35:19', agent: 'Compliance Pro', action: 'Identified 2 minor discrepancies in draft v2', type: 'warning' }
            ].map((log, i) => (
              <div key={i} className="px-6 py-3 flex items-center gap-4 hover:bg-secondary-bg transition-colors">
                <span className="text-[10px] font-mono text-text-muted">{log.time}</span>
                <span className="text-[10px] font-bold text-interaction-primary w-24 truncate uppercase tracking-wider">{log.agent}</span>
                <p className="text-[11px] text-text-main flex-1">{log.action}</p>
                <Badge variant="secondary" className={cn(
                  "text-[8px] uppercase tracking-wider h-4",
                  log.type === 'success' ? "bg-alert-opportunity/10 text-alert-opportunity" : 
                  log.type === 'warning' ? "bg-alert-risk/10 text-alert-risk" : "bg-secondary-bg text-text-muted"
                )}>
                  {log.type}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
