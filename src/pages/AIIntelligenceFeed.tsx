import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/Card';
import { Badge } from '@/src/components/ui/Badge';
import { Button } from '@/src/components/ui/Button';
import { 
  BrainCircuit, 
  Zap, 
  TrendingUp, 
  ShieldAlert, 
  Globe, 
  BarChart3, 
  Clock, 
  Search, 
  Filter,
  ChevronRight,
  Sparkles,
  Download,
  Share2,
  Bookmark
} from 'lucide-react';
import { cn } from '@/src/utils/cn';

const INTELLIGENCE_REPORTS = [
  {
    id: 1,
    title: 'Q4 APAC Regulatory Landscape: Strategic Shifts',
    type: 'Regulatory Report',
    priority: 'High',
    time: '2h ago',
    summary: 'Major updates to data sovereignty laws in Singapore and Vietnam. Impacting Fintech and Cloud sectors significantly.',
    tags: ['Regulatory', 'APAC', 'Fintech'],
    confidence: 98,
    impact: 'High'
  },
  {
    id: 2,
    title: 'Emerging Tech: Generative AI in Supply Chain',
    type: 'Tech Trend',
    priority: 'Medium',
    time: '5h ago',
    summary: 'Analysis of 15 pilot projects showing 22% average efficiency gain in procurement automation using LLMs.',
    tags: ['AI', 'Supply Chain', 'Efficiency'],
    confidence: 92,
    impact: 'Medium'
  },
  {
    id: 3,
    title: 'Geopolitical Risk Alert: South China Sea Trade Routes',
    type: 'Risk Assessment',
    priority: 'Critical',
    time: '10h ago',
    summary: 'Escalating tensions may lead to 15-20% increase in shipping insurance premiums for regional routes.',
    tags: ['Geopolitics', 'Logistics', 'Risk'],
    confidence: 85,
    impact: 'Critical'
  },
  {
    id: 4,
    title: 'Consumer Sentiment Shift: Sustainable Luxury in China',
    type: 'Market Insight',
    priority: 'Low',
    time: '1d ago',
    summary: 'Gen-Z consumers in Tier 1 cities showing increased preference for circular economy brands.',
    tags: ['Consumer', 'China', 'Sustainability'],
    confidence: 88,
    impact: 'Low'
  }
];

export default function AIIntelligenceFeed() {
  const [activeFilter, setActiveFilter] = useState('All');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-2xl bg-ai-violet/10 flex items-center justify-center border border-ai-violet/20 shadow-sm">
            <BrainCircuit className="h-6 w-6 text-ai-violet" />
          </div>
          <div>
            <h1 className="text-2xl font-heading font-bold text-text-main mb-1">AI Intelligence Feed</h1>
            <p className="text-text-muted text-sm">Real-time, AI-generated strategic insights and research reports.</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" className="h-10 border-border-light shadow-sm">
            <Download className="h-4 w-4 mr-2" />
            Export All
          </Button>
          <Button className="h-10 bg-ai-violet text-white rounded-xl shadow-md font-bold px-6 border-none">
            <Sparkles className="h-4 w-4 mr-2" />
            Generate Custom Report
          </Button>
        </div>
      </div>

      {/* Intelligence Pulse */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-border-light bg-white shadow-sm overflow-hidden">
          <CardContent className="p-6 flex items-center gap-5">
            <div className="h-12 w-12 rounded-full border-4 border-interaction-primary/20 border-t-interaction-primary flex items-center justify-center">
              <span className="text-sm font-bold text-text-main">84%</span>
            </div>
            <div>
              <p className="text-[10px] font-bold text-text-muted uppercase tracking-wider">Strategic Signal Density</p>
              <p className="text-xs text-text-main font-medium">High activity in APAC markets detected.</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border-light bg-white shadow-sm overflow-hidden">
          <CardContent className="p-6 flex items-center gap-5">
            <div className="h-12 w-12 rounded-xl bg-alert-risk/10 flex items-center justify-center">
              <ShieldAlert className="h-6 w-6 text-alert-risk" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-text-muted uppercase tracking-wider">Active Risk Alerts</p>
              <p className="text-xs text-text-main font-medium">3 Critical geopolitical risks identified.</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border-light bg-white shadow-sm overflow-hidden">
          <CardContent className="p-6 flex items-center gap-5">
            <div className="h-12 w-12 rounded-xl bg-alert-opportunity/10 flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-alert-opportunity" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-text-muted uppercase tracking-wider">Opportunity Signals</p>
              <p className="text-xs text-text-main font-medium">12 New market entry vectors identified.</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Feed Area */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 space-y-6">
          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
              <input 
                type="text" 
                placeholder="Search intelligence reports..." 
                className="w-full bg-white border border-border-light rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-interaction-primary/20 focus:border-interaction-primary transition-all shadow-sm"
              />
            </div>
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
              {['All', 'Regulatory', 'Market', 'Risk', 'Tech'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={cn(
                    "px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border",
                    activeFilter === filter 
                      ? "bg-ai-violet text-white border-ai-violet shadow-sm" 
                      : "bg-white text-text-secondary border-border-light hover:border-ai-violet/30"
                  )}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {/* Report List */}
          <div className="space-y-4">
            {INTELLIGENCE_REPORTS.map((report) => (
              <motion.div
                key={report.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="group hover:shadow-md transition-all border-border-light bg-white overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={cn(
                          "h-10 w-10 rounded-xl flex items-center justify-center border shadow-sm",
                          report.priority === 'Critical' ? "bg-alert-risk/10 border-alert-risk/20" : 
                          report.priority === 'High' ? "bg-alert-warning/10 border-alert-warning/20" : "bg-secondary-bg border-border-light"
                        )}>
                          <Zap className={cn(
                            "h-5 w-5",
                            report.priority === 'Critical' ? "text-alert-risk" : 
                            report.priority === 'High' ? "text-alert-warning" : "text-text-muted"
                          )} />
                        </div>
                        <div>
                          <Badge variant="secondary" className="bg-secondary-bg text-text-muted border-none text-[8px] uppercase tracking-wider px-1.5 h-4 mb-1">
                            {report.type}
                          </Badge>
                          <h3 className="text-base font-bold text-text-main group-hover:text-ai-violet transition-colors">
                            {report.title}
                          </h3>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Button variant="text" size="sm" className="h-8 w-8 p-0 rounded-lg hover:bg-secondary-bg">
                          <Bookmark className="h-4 w-4 text-text-muted" />
                        </Button>
                        <Button variant="text" size="sm" className="h-8 w-8 p-0 rounded-lg hover:bg-secondary-bg">
                          <Share2 className="h-4 w-4 text-text-muted" />
                        </Button>
                      </div>
                    </div>

                    <p className="text-xs text-text-muted leading-relaxed mb-6">
                      {report.summary}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-border-light/50">
                      <div className="flex items-center gap-4">
                        <div className="flex flex-col">
                          <span className="text-[9px] font-bold text-text-muted uppercase tracking-wider">Confidence</span>
                          <span className="text-xs font-bold text-text-main">{report.confidence}%</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[9px] font-bold text-text-muted uppercase tracking-wider">Impact</span>
                          <span className={cn(
                            "text-xs font-bold",
                            report.impact === 'Critical' ? "text-alert-risk" : 
                            report.impact === 'High' ? "text-alert-warning" : "text-alert-opportunity"
                          )}>{report.impact}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[9px] font-bold text-text-muted uppercase tracking-wider">Time</span>
                          <span className="text-xs font-medium text-text-muted flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {report.time}
                          </span>
                        </div>
                      </div>
                      <Button variant="text" className="h-9 text-xs font-bold text-ai-violet hover:bg-ai-violet/5 rounded-xl">
                        Full Analysis
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Sidebar: AI Research Console */}
        <div className="space-y-6">
          <Card className="border-border-light bg-white shadow-sm overflow-hidden">
            <CardHeader className="py-4 border-b border-border-light bg-ai-violet/5">
              <CardTitle className="text-xs font-bold uppercase tracking-wider flex items-center">
                <BarChart3 className="h-4 w-4 mr-2 text-ai-violet" />
                Intelligence Metrics
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center text-[11px]">
                  <span className="text-text-secondary">Data Sources</span>
                  <span className="text-text-main font-bold">1,240+</span>
                </div>
                <div className="h-1.5 w-full bg-secondary-bg rounded-full overflow-hidden">
                  <div className="h-full bg-ai-violet" style={{ width: '92%' }} />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center text-[11px]">
                  <span className="text-text-secondary">Processing Rate</span>
                  <span className="text-text-main font-bold">4.2 GB/s</span>
                </div>
                <div className="h-1.5 w-full bg-secondary-bg rounded-full overflow-hidden">
                  <div className="h-full bg-ai-violet" style={{ width: '78%' }} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border-light bg-white shadow-sm">
            <CardHeader className="py-4 border-b border-border-light">
              <CardTitle className="text-xs font-bold uppercase tracking-wider">Active AI Agents</CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-3">
              {[
                { name: 'Market Sentinel', status: 'Active' },
                { name: 'Risk Auditor', status: 'Active' },
                { name: 'Trend Analyzer', status: 'Idle' }
              ].map(agent => (
                <div key={agent.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={cn("h-1.5 w-1.5 rounded-full", agent.status === 'Active' ? "bg-alert-opportunity" : "bg-text-muted")} />
                    <span className="text-xs text-text-secondary">{agent.name}</span>
                  </div>
                  <Badge variant="secondary" className="bg-secondary-bg text-text-muted text-[9px]">{agent.status}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-border-light bg-interaction-primary/5 shadow-none">
            <CardContent className="p-5 space-y-4">
              <div className="h-10 w-10 rounded-xl bg-white flex items-center justify-center shadow-sm">
                <Globe className="h-5 w-5 text-interaction-primary" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-text-main mb-1">Global Signal Map</h4>
                <p className="text-[11px] text-text-muted leading-relaxed">
                  Visualize the geographical origin of strategic signals across your network.
                </p>
              </div>
              <Button variant="secondary" className="w-full h-8 text-[10px] font-bold bg-white">
                Open Signal Map
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
