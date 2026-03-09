import React from 'react';
import { motion } from 'motion/react';
import { 
  Network, Database, Share2, Filter, 
  Search, Plus, Info, ChevronRight,
  BrainCircuit, Globe, Zap, Target
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/Card';
import { Button } from '@/src/components/ui/Button';
import { Input } from '@/src/components/ui/Input';
import { Badge } from '@/src/components/ui/Badge';

export default function KnowledgeGraph() {
  const nodes = [
    { id: 1, title: 'APAC Market Entry', type: 'Strategy', connections: 12, status: 'Active' },
    { id: 2, title: 'Generative AI Framework', type: 'Technology', connections: 45, status: 'Verified' },
    { id: 3, title: 'Supply Chain Resilience', type: 'Operational', connections: 8, status: 'Draft' },
    { id: 4, title: 'Consumer Sentiment Index', type: 'Data', connections: 23, status: 'Real-time' },
    { id: 5, title: 'Regulatory Compliance EU', type: 'Legal', connections: 15, status: 'Critical' },
    { id: 6, title: 'Marcus Chen', type: 'Expert', connections: 67, status: 'Online' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-12 max-w-7xl mx-auto"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold text-text-main">Knowledge Graph</h1>
          <p className="text-text-muted mt-2">Map strategic relationships and intelligence nodes across your organization.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="secondary">
            <Share2 className="h-4 w-4 mr-2" />
            Export Map
          </Button>
          <Button variant="primary">
            <Plus className="h-4 w-4 mr-2" />
            Add Node
          </Button>
        </div>
      </div>

      {/* Graph Visualization Placeholder */}
      <Card className="border-panel-border bg-panel-bg overflow-hidden">
        <CardContent className="p-0">
          <div className="aspect-[21/9] bg-secondary-bg relative flex items-center justify-center overflow-hidden">
            {/* Mock Graph Background */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-interaction-primary/30 rounded-full blur-3xl" />
              <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-ai-cyan/20 rounded-full blur-3xl" />
            </div>
            
            {/* Floating Nodes Mockup */}
            <div className="relative w-full h-full">
              {[...Array(15)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: [0.2, 0.5, 0.2],
                    scale: [1, 1.1, 1],
                    x: Math.random() * 100 - 50,
                    y: Math.random() * 100 - 50
                  }}
                  transition={{ duration: 5 + Math.random() * 5, repeat: Infinity }}
                  className="absolute h-2 w-2 bg-interaction-primary rounded-full"
                  style={{ 
                    top: `${Math.random() * 100}%`, 
                    left: `${Math.random() * 100}%` 
                  }}
                />
              ))}
              
              {/* Central Node */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                <div className="h-24 w-24 rounded-full bg-panel-bg border-2 border-interaction-primary flex items-center justify-center shadow-[0_0_30px_rgba(var(--interaction-primary-rgb),0.3)]">
                  <BrainCircuit className="h-10 w-10 text-interaction-primary" />
                </div>
                <div className="mt-4 text-center">
                  <p className="text-sm font-bold text-text-main uppercase tracking-widest">Matrix Core</p>
                  <p className="text-[10px] text-text-muted">Intelligence Hub</p>
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="absolute bottom-6 left-6 flex gap-2">
              <Button variant="secondary" size="sm" className="bg-panel-bg/80 backdrop-blur">2D View</Button>
              <Button variant="secondary" size="sm" className="bg-panel-bg/80 backdrop-blur">3D View</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Node Explorer */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-heading font-bold text-text-main flex items-center gap-2">
              <Database className="h-5 w-5 text-interaction-primary" />
              Node Explorer
            </h2>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
                <Input placeholder="Search nodes..." className="pl-9 h-9 w-64 text-sm" />
              </div>
              <Button variant="secondary" size="icon" className="h-9 w-9">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {nodes.map((node) => (
              <Card key={node.id} className="border-panel-border bg-panel-bg hover:border-interaction-primary/50 transition-colors cursor-pointer group">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-secondary-bg flex items-center justify-center group-hover:bg-interaction-primary/10 transition-colors">
                        {node.type === 'Strategy' && <Target className="h-5 w-5 text-interaction-primary" />}
                        {node.type === 'Technology' && <Zap className="h-5 w-5 text-ai-cyan" />}
                        {node.type === 'Expert' && <Globe className="h-5 w-5 text-alert-opportunity" />}
                        {!['Strategy', 'Technology', 'Expert'].includes(node.type) && <Database className="h-5 w-5 text-text-muted" />}
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-text-main">{node.title}</h3>
                        <p className="text-[10px] text-text-muted uppercase tracking-wider">{node.type}</p>
                      </div>
                    </div>
                    <Badge variant="secondary" className="text-[9px]">{node.status}</Badge>
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-text-muted">
                    <span>{node.connections} Connections</span>
                    <ChevronRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Intelligence Sidebar */}
        <div className="space-y-6">
          <h2 className="text-xl font-heading font-bold text-text-main flex items-center gap-2">
            <Zap className="h-5 w-5 text-interaction-primary" />
            Graph Insights
          </h2>
          
          <Card className="border-panel-border bg-panel-bg">
            <CardHeader className="pb-2 p-5">
              <CardTitle className="text-sm">Network Density</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 p-5 pt-0">
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-text-muted">Strategic Alignment</span>
                  <span className="text-text-main font-bold">84%</span>
                </div>
                <div className="h-1.5 w-full bg-secondary-bg rounded-full overflow-hidden">
                  <div className="h-full bg-interaction-primary w-[84%]" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-text-muted">Data Connectivity</span>
                  <span className="text-text-main font-bold">62%</span>
                </div>
                <div className="h-1.5 w-full bg-secondary-bg rounded-full overflow-hidden">
                  <div className="h-full bg-ai-cyan w-[62%]" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-panel-border bg-panel-bg">
            <CardHeader className="pb-2 p-5">
              <CardTitle className="text-sm">Critical Paths</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 p-5 pt-0">
              <div className="p-3 bg-alert-risk/5 border border-alert-risk/20 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <Info className="h-3 w-3 text-alert-risk" />
                  <span className="text-[10px] font-bold text-alert-risk uppercase tracking-wider">Bottleneck Detected</span>
                </div>
                <p className="text-[11px] text-text-muted leading-relaxed">
                  Regulatory Compliance EU is a single point of failure for 3 active strategies.
                </p>
              </div>
              <Button variant="secondary" className="w-full text-xs h-8">Analyze Dependencies</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  );
}
