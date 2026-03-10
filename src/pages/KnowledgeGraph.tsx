import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import ForceGraph2D from 'react-force-graph-2d';
import ForceGraph3D from 'react-force-graph-3d';
import * as THREE from 'three';
import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/Card';
import { Badge } from '@/src/components/ui/Badge';
import { Button } from '@/src/components/ui/Button';
import { 
  Network, 
  Search, 
  Filter, 
  Maximize2, 
  ZoomIn, 
  ZoomOut, 
  RefreshCw, 
  Database, 
  Share2,
  Settings,
  BrainCircuit,
  Zap,
  Layers,
  Link2,
  ChevronRight,
  Info,
  Download,
  AlertTriangle,
  Target,
  TrendingUp,
  ShieldAlert,
  Plus,
  X,
  Box,
  Square,
  Sparkles,
  Activity,
  GitBranch
} from 'lucide-react';
import { cn } from '@/src/utils/cn';
import { GoogleGenAI } from "@google/genai";

// --- Types ---

type NodeType = 'Initiative' | 'Signal' | 'Consultant' | 'Agent' | 'Industry' | 'Regulatory';

interface GraphNode {
  id: string;
  label: string;
  type: NodeType;
  val: number;
  description?: string;
  riskLevel?: 'Low' | 'Medium' | 'High';
  neighbors?: string[];
  links?: string[];
}

interface GraphLink {
  source: string;
  target: string;
  relation: string;
  strength: number;
}

// --- Mock Data ---

const INITIAL_NODES: GraphNode[] = [
  // Initiatives
  { id: 'I1', label: 'APAC Expansion', type: 'Initiative', val: 20, description: 'Strategic growth into Southeast Asian markets.' },
  { id: 'I2', label: 'AI Transformation', type: 'Initiative', val: 25, description: 'Enterprise-wide integration of generative AI.' },
  { id: 'I3', label: 'Sustainable Supply', type: 'Initiative', val: 18, description: 'Green logistics and ethical sourcing initiative.' },
  
  // Market Signals
  { id: 'S1', label: 'Rising Tech Hubs', type: 'Signal', val: 12, description: 'Increased VC activity in Vietnam and Indonesia.' },
  { id: 'S2', label: 'Energy Volatility', type: 'Signal', val: 15, description: 'Fluctuating costs affecting manufacturing margins.' },
  
  // Consultants (Experts)
  { id: 'C1', label: 'Dr. Sarah Jenkins', type: 'Consultant', val: 14, description: 'Expert in APAC regulatory frameworks.' },
  { id: 'C2', label: 'Marcus Thorne', type: 'Consultant', val: 14, description: 'Specialist in AI ethics and governance.' },
  
  // AI Agents
  { id: 'A1', label: 'Market Sentinel', type: 'Agent', val: 16, description: 'Autonomous agent monitoring global trade signals.' },
  { id: 'A2', label: 'Risk Navigator', type: 'Agent', val: 16, description: 'Predictive modeling agent for supply chain risks.' },
  
  // Industries
  { id: 'IND1', label: 'Fintech', type: 'Industry', val: 10 },
  { id: 'IND2', label: 'Manufacturing', type: 'Industry', val: 10 },
  
  // Regulatory
  { id: 'R1', label: 'GDPR v2.0', type: 'Regulatory', val: 12, riskLevel: 'High' },
  { id: 'R2', label: 'ASEAN Trade Pact', type: 'Regulatory', val: 12, riskLevel: 'Low' },
];

const INITIAL_LINKS: GraphLink[] = [
  { source: 'I1', target: 'S1', relation: 'responds to', strength: 1 },
  { source: 'I1', target: 'C1', relation: 'advised by', strength: 1.5 },
  { source: 'I1', target: 'R2', relation: 'governed by', strength: 1 },
  { source: 'I1', target: 'IND1', relation: 'impacts', strength: 0.8 },
  
  { source: 'I2', target: 'C2', relation: 'led by', strength: 1.5 },
  { source: 'I2', target: 'A1', relation: 'monitored by', strength: 1.2 },
  { source: 'I2', target: 'R1', relation: 'constrained by', strength: 1.8 },
  
  { source: 'I3', target: 'S2', relation: 'mitigates', strength: 1.2 },
  { source: 'I3', target: 'A2', relation: 'optimized by', strength: 1.2 },
  { source: 'I3', target: 'IND2', relation: 'transforms', strength: 1 },
  
  { source: 'C1', target: 'R2', relation: 'specializes in', strength: 1 },
  { source: 'C2', target: 'R1', relation: 'audits', strength: 1 },
  { source: 'A1', target: 'S1', relation: 'tracks', strength: 1 },
  { source: 'A2', target: 'S2', relation: 'analyzes', strength: 1 },
];

// --- Constants ---

const TYPE_COLORS: Record<NodeType, string> = {
  Initiative: '#00f2ff', // Cyan
  Signal: '#f27d26',     // Orange
  Consultant: '#8b5cf6', // Violet
  Agent: '#10b981',      // Emerald
  Industry: '#64748b',   // Slate
  Regulatory: '#ef4444', // Red
};

// --- Main Component ---

export default function KnowledgeGraph() {
  const [nodes, setNodes] = useState<GraphNode[]>(INITIAL_NODES);
  const [links, setLinks] = useState<GraphLink[]>(INITIAL_LINKS);
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<NodeType | 'All'>('All');
  const [viewMode, setViewMode] = useState<'2D' | '3D'>('2D');
  const [isMappingDependencies, setIsMappingDependencies] = useState(false);
  const [highlightNodes, setHighlightNodes] = useState<Set<string>>(new Set<string>([]));
  const [highlightLinks, setHighlightLinks] = useState<Set<any>>(new Set<any>([]));
  const [hoverNode, setHoverNode] = useState<GraphNode | null>(null);
  const [aiRecommendations, setAiRecommendations] = useState<string[]>([]);
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  
  const fgRef = useRef<any>(null);

  // --- AI Recommendations ---

  const generateAIRecommendations = async () => {
    setIsGeneratingAI(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const model = "gemini-3-flash-preview";
      
      const prompt = `As a strategic intelligence AI for MATRIX360, analyze this knowledge graph state and provide 3 concise strategic recommendations.
      
      Current Nodes: ${nodes.map(n => `${n.label} (${n.type})`).join(', ')}
      Current Risks: ${nodes.filter(n => n.riskLevel === 'High').map(n => n.label).join(', ')}
      
      Format: Return only a JSON array of strings.`;

      const response = await ai.models.generateContent({
        model,
        contents: prompt,
        config: { responseMimeType: "application/json" }
      });

      const recommendations = JSON.parse(response.text);
      setAiRecommendations(recommendations);
    } catch (error) {
      console.error("AI Recommendation Error:", error);
      setAiRecommendations([
        "Optimize APAC expansion by leveraging Market Sentinel signals.",
        "Address AI Transformation regulatory constraints via Marcus Thorne's audit.",
        "Strengthen Sustainable Supply resilience against Energy Volatility signals."
      ]);
    } finally {
      setIsGeneratingAI(false);
    }
  };

  useEffect(() => {
    generateAIRecommendations();
  }, []);

  // --- Graph Logic ---

  const filteredData = useMemo(() => {
    let fNodes = nodes;
    if (filterType !== 'All') {
      fNodes = nodes.filter(n => n.type === filterType);
    }
    if (searchQuery) {
      fNodes = fNodes.filter(n => n.label.toLowerCase().includes(searchQuery.toLowerCase()));
    }

    const fNodeIds = new Set(fNodes.map(n => n.id));
    const fLinks = links.filter(l => fNodeIds.has(typeof l.source === 'string' ? l.source : (l.source as any).id) && fNodeIds.has(typeof l.target === 'string' ? l.target : (l.target as any).id));

    return { nodes: fNodes, links: fLinks };
  }, [nodes, links, filterType, searchQuery]);

  const handleNodeHover = (node: any) => {
    highlightNodes.clear();
    highlightLinks.clear();
    if (node) {
      highlightNodes.add(node.id);
      links.forEach(link => {
        const sourceId = typeof link.source === 'string' ? link.source : (link.source as any).id;
        const targetId = typeof link.target === 'string' ? link.target : (link.target as any).id;
        if (sourceId === node.id || targetId === node.id) {
          highlightLinks.add(link);
          highlightNodes.add(sourceId);
          highlightNodes.add(targetId);
        }
      });
    }
    setHoverNode(node || null);
    setHighlightNodes(new Set(highlightNodes));
    setHighlightLinks(new Set(highlightLinks));
  };

  const handleLinkHover = (link: any) => {
    highlightNodes.clear();
    highlightLinks.clear();
    if (link) {
      highlightLinks.add(link);
      highlightNodes.add(typeof link.source === 'string' ? link.source : link.source.id);
      highlightNodes.add(typeof link.target === 'string' ? link.target : link.target.id);
    }
    setHighlightNodes(new Set(highlightNodes));
    setHighlightLinks(new Set(highlightLinks));
  };

  const handleNodeClick = (node: any) => {
    setSelectedNode(node);
    if (isMappingDependencies) {
      // Find all connected nodes (BFS)
      const connected = new Set<string>([node.id]);
      const queue = [node.id];
      while (queue.length > 0) {
        const currId = queue.shift()!;
        links.forEach(l => {
          const sId = typeof l.source === 'string' ? l.source : (l.source as any).id;
          const tId = typeof l.target === 'string' ? l.target : (l.target as any).id;
          if (sId === currId && !connected.has(tId)) {
            connected.add(tId);
            queue.push(tId);
          } else if (tId === currId && !connected.has(sId)) {
            connected.add(sId);
            queue.push(sId);
          }
        });
      }
      setHighlightNodes(connected);
    }
  };

  // --- Insights ---

  const networkDensity = useMemo(() => {
    const possibleLinks = (nodes.length * (nodes.length - 1)) / 2;
    return possibleLinks > 0 ? (links.length / possibleLinks).toFixed(2) : '0.00';
  }, [nodes, links]);

  const strategicAlignment = useMemo(() => {
    const initiatives = nodes.filter(n => n.type === 'Initiative').length;
    const connectedInitiatives = nodes.filter(n => 
      n.type === 'Initiative' && links.some(l => 
        (typeof l.source === 'string' ? l.source === n.id : (l.source as any).id === n.id) || 
        (typeof l.target === 'string' ? l.target === n.id : (l.target as any).id === n.id)
      )
    ).length;
    return initiatives > 0 ? Math.round((connectedInitiatives / initiatives) * 100) : 0;
  }, [nodes, links]);

  const riskClusters = useMemo(() => {
    const highRiskNodes = nodes.filter(n => n.riskLevel === 'High');
    return highRiskNodes.map(node => {
      const affected = links
        .filter(l => (typeof l.source === 'string' ? l.source === node.id : (l.source as any).id === node.id) || (typeof l.target === 'string' ? l.target === node.id : (l.target as any).id === node.id))
        .map(l => {
          const otherId = (typeof l.source === 'string' ? l.source : (l.source as any).id) === node.id 
            ? (typeof l.target === 'string' ? l.target : (l.target as any).id)
            : (typeof l.source === 'string' ? l.source : (l.source as any).id);
          return nodes.find(n => n.id === otherId);
        })
        .filter(n => !!n);
      return { node, affected };
    });
  }, [nodes, links]);

  const exportGraph = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({ nodes, links }));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "matrix360-knowledge-graph.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 shrink-0">
        <div>
          <h1 className="text-2xl font-heading font-bold text-white mb-1 flex items-center gap-2">
            <Network className="h-6 w-6 text-interaction-primary" />
            Strategic Knowledge Graph
          </h1>
          <p className="text-white/40 text-sm">Organizational intelligence memory mapping initiatives, experts, and market signals.</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex bg-white/5 border border-white/10 rounded-xl p-1 mr-2">
            <Button 
              variant="secondary" 
              size="sm" 
              onClick={() => setViewMode('2D')}
              className={cn("h-8 px-3 text-[10px] font-bold rounded-lg transition-all", viewMode === '2D' ? "bg-interaction-primary text-white shadow-lg" : "bg-transparent text-white/40 hover:text-white")}
            >
              <Square className="h-3 w-3 mr-1.5" />
              2D
            </Button>
            <Button 
              variant="secondary" 
              size="sm" 
              onClick={() => setViewMode('3D')}
              className={cn("h-8 px-3 text-[10px] font-bold rounded-lg transition-all", viewMode === '3D' ? "bg-interaction-primary text-white shadow-lg" : "bg-transparent text-white/40 hover:text-white")}
            >
              <Box className="h-3 w-3 mr-1.5" />
              3D
            </Button>
          </div>
          <Button 
            variant="secondary" 
            onClick={exportGraph}
            className="h-10 border-white/10 bg-white/5 text-white hover:bg-white/10"
          >
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button 
            onClick={generateAIRecommendations}
            disabled={isGeneratingAI}
            className="h-10 bg-interaction-primary text-white rounded-xl shadow-lg font-bold px-6 hover:bg-interaction-primary/80"
          >
            <RefreshCw className={cn("h-4 w-4 mr-2", isGeneratingAI && "animate-spin")} />
            Re-Sync Intelligence
          </Button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex gap-6 min-h-0">
        {/* Graph Visualization */}
        <div className="flex-1 relative rounded-2xl border border-white/5 bg-zinc-900/50 shadow-2xl overflow-hidden group">
          {/* Background Grid */}
          <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
          
          {viewMode === '2D' ? (
            <ForceGraph2D
              ref={fgRef}
              graphData={filteredData}
              nodeLabel="label"
              nodeColor={n => TYPE_COLORS[(n as any).type]}
              nodeVal={n => (n as any).val}
              linkWidth={l => highlightLinks.has(l) ? 4 : 1}
              linkColor={l => highlightLinks.has(l) ? '#2F80ED' : '#334155'}
              linkDirectionalParticles={4}
              linkDirectionalParticleWidth={l => highlightLinks.has(l) ? 4 : 0}
              onNodeClick={handleNodeClick}
              onNodeHover={handleNodeHover}
              onLinkHover={handleLinkHover}
              nodeCanvasObject={(node: any, ctx, globalScale) => {
                const label = node.label;
                const fontSize = 12 / globalScale;
                ctx.font = `${fontSize}px Inter`;
                const textWidth = ctx.measureText(label).width;

                // Draw circle
                ctx.beginPath();
                ctx.arc(node.x, node.y, node.val / 2, 0, 2 * Math.PI, false);
                ctx.fillStyle = TYPE_COLORS[node.type];
                ctx.fill();
                
                if (node.riskLevel === 'High') {
                  ctx.strokeStyle = '#ef4444';
                  ctx.lineWidth = 2 / globalScale;
                  ctx.stroke();
                }

                if (highlightNodes.has(node.id)) {
                  ctx.strokeStyle = '#2F80ED';
                  ctx.lineWidth = 3 / globalScale;
                  ctx.stroke();
                }

                // Draw label
                ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(label, node.x, node.y + node.val / 2 + 8 / globalScale);
              }}
            />
          ) : (
            <ForceGraph3D
              ref={fgRef}
              graphData={filteredData}
              nodeLabel="label"
              nodeColor={n => TYPE_COLORS[(n as any).type]}
              nodeVal={n => (n as any).val}
              linkWidth={l => highlightLinks.has(l) ? 2 : 0.5}
              linkColor={l => highlightLinks.has(l) ? '#2F80ED' : '#334155'}
              onNodeClick={handleNodeClick}
              onNodeHover={handleNodeHover}
              onLinkHover={handleLinkHover}
              nodeThreeObject={(node: any) => {
                const geometry = new THREE.SphereGeometry(node.val / 4);
                const material = new THREE.MeshLambertMaterial({ 
                  color: TYPE_COLORS[node.type],
                  transparent: true,
                  opacity: 0.9
                });
                const mesh = new THREE.Mesh(geometry, material);
                
                if (node.riskLevel === 'High') {
                  const ringGeo = new THREE.RingGeometry(node.val / 4 + 0.5, node.val / 4 + 1, 32);
                  const ringMat = new THREE.MeshBasicMaterial({ color: 0xef4444, side: THREE.DoubleSide });
                  const ring = new THREE.Mesh(ringGeo, ringMat);
                  mesh.add(ring);
                }
                
                return mesh;
              }}
            />
          )}

          {/* Controls Overlay */}
          <div className="absolute bottom-6 left-6 flex items-center gap-2">
            <div className="flex items-center bg-zinc-900/80 backdrop-blur-md border border-white/10 rounded-xl p-1 shadow-xl">
              <Button 
                variant="secondary" 
                size="sm" 
                onClick={() => setIsMappingDependencies(!isMappingDependencies)}
                className={cn("h-8 px-3 text-[10px] font-bold rounded-lg transition-all", isMappingDependencies ? "bg-interaction-primary text-white" : "bg-transparent text-white/40 hover:text-white")}
              >
                <GitBranch className="h-3 w-3 mr-1.5" />
                Dependency Map
              </Button>
              <div className="w-px h-4 bg-white/10 mx-1" />
              <Button variant="secondary" size="sm" className="h-8 w-8 p-0 rounded-lg text-white/60 hover:text-white" onClick={() => fgRef.current?.zoomToFit(400)}><Maximize2 className="h-4 w-4" /></Button>
            </div>
          </div>

          {/* Legend Overlay */}
          <div className="absolute top-6 right-6">
            <Card className="bg-zinc-900/80 backdrop-blur-md border-white/10 shadow-xl w-48">
              <CardHeader className="py-3 px-4 border-b border-white/5">
                <CardTitle className="text-[10px] font-bold uppercase tracking-widest text-white/40">Intelligence Layers</CardTitle>
              </CardHeader>
              <CardContent className="p-3 space-y-2">
                {Object.entries(TYPE_COLORS).map(([type, color]) => (
                  <div key={type} className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full" style={{ backgroundColor: color }} />
                    <span className="text-[10px] text-white/60 font-medium">{type}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Selected Node Detail Overlay */}
          <AnimatePresence>
            {selectedNode && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="absolute top-6 left-6 w-72"
              >
                <Card className="bg-zinc-900/90 backdrop-blur-xl border-interaction-primary/30 shadow-2xl">
                  <CardHeader className="py-3 px-4 border-b border-white/5 flex flex-row items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full" style={{ backgroundColor: TYPE_COLORS[selectedNode.type] }} />
                      <CardTitle className="text-xs font-bold text-white">{selectedNode.label}</CardTitle>
                    </div>
                    <Button variant="secondary" size="sm" className="h-6 w-6 p-0" onClick={() => setSelectedNode(null)}>
                      <X className="h-3 w-3 text-white/40" />
                    </Button>
                  </CardHeader>
                  <CardContent className="p-4 space-y-4">
                    <div className="space-y-1">
                      <span className="text-[9px] font-bold text-white/40 uppercase tracking-widest">Description</span>
                      <p className="text-[11px] text-white/70 leading-relaxed">{selectedNode.description || 'No description available.'}</p>
                    </div>

                    {selectedNode.riskLevel && (
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] font-bold text-white/40 uppercase tracking-widest">Risk Level</span>
                        <Badge className={cn(
                          "text-[9px] border-none",
                          selectedNode.riskLevel === 'High' ? 'bg-red-500/20 text-red-500' : 
                          selectedNode.riskLevel === 'Medium' ? 'bg-yellow-500/20 text-yellow-500' : 
                          'bg-green-500/20 text-green-500'
                        )}>
                          {selectedNode.riskLevel}
                        </Badge>
                      </div>
                    )}

                    <div className="pt-2 flex gap-2">
                      <Button className="flex-1 h-8 bg-interaction-primary text-white text-[10px] font-bold">
                        <Plus className="h-3 w-3 mr-1" />
                        Expand Node
                      </Button>
                      <Button variant="secondary" className="h-8 border-white/10 bg-white/5 text-white text-[10px] font-bold">
                        <Link2 className="h-3 w-3 mr-1" />
                        Relations
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Sidebar: Relations & Insights */}
        <div className="w-80 flex flex-col gap-6 shrink-0 overflow-hidden">
          {/* Search & Filter */}
          <Card className="border-white/5 bg-zinc-900/50 shadow-xl shrink-0">
            <CardContent className="p-4 space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/20" />
                <input 
                  type="text" 
                  placeholder="Search intelligence..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-interaction-primary/20 focus:border-interaction-primary transition-all"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {['All', ...Object.keys(TYPE_COLORS)].map(type => (
                  <button
                    key={type}
                    onClick={() => setFilterType(type as any)}
                    className={cn(
                      "px-2 py-1 rounded-md text-[9px] font-bold uppercase tracking-wider transition-all",
                      filterType === type 
                        ? "bg-interaction-primary text-white" 
                        : "bg-white/5 text-white/40 hover:bg-white/10"
                    )}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Graph Insights */}
          <Card className="border-white/5 bg-zinc-900/50 shadow-xl flex flex-col overflow-hidden">
            <CardHeader className="py-4 border-b border-white/5 shrink-0">
              <CardTitle className="text-[10px] font-bold uppercase tracking-widest flex items-center text-white/60">
                <TrendingUp className="h-4 w-4 mr-2 text-interaction-primary" />
                Graph Insights
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-4 overflow-y-auto custom-scrollbar">
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                  <span className="text-[9px] font-bold text-white/40 uppercase">Network Density</span>
                  <div className="text-lg font-mono font-bold text-white">{networkDensity}</div>
                  <div className="text-[8px] text-green-500">Optimal Connectivity</div>
                </div>
                <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                  <span className="text-[9px] font-bold text-white/40 uppercase">Alignment</span>
                  <div className="text-lg font-mono font-bold text-white">{strategicAlignment}%</div>
                  <div className="text-[8px] text-interaction-primary">Strategic Coverage</div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <ShieldAlert className="h-3 w-3 text-red-500" />
                  <span className="text-[10px] font-bold text-white/60 uppercase">Risk Clusters</span>
                </div>
                <div className="space-y-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                  {riskClusters.map((cluster, idx) => (
                    <div key={idx} className="p-3 bg-red-500/5 border border-red-500/20 rounded-xl space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-red-500">{cluster.node.label}</span>
                        <Badge className="bg-red-500/20 text-red-500 text-[8px] border-none">HIGH RISK</Badge>
                      </div>
                      <p className="text-[10px] text-white/60 leading-relaxed">
                        Impacts {cluster.affected.length} connected nodes including {cluster.affected.slice(0, 2).map(n => n?.label).join(', ')}.
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* AI Recommendations */}
          <Card className="border-interaction-primary/20 bg-interaction-primary/5 shadow-none shrink-0">
            <CardContent className="p-4 space-y-3">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-interaction-primary" />
                <span className="text-[10px] font-bold text-interaction-primary uppercase tracking-widest">AI Recommendations</span>
              </div>
              <div className="space-y-2">
                {isGeneratingAI ? (
                  <div className="space-y-2 animate-pulse">
                    <div className="h-8 bg-white/5 rounded-lg" />
                    <div className="h-8 bg-white/5 rounded-lg" />
                  </div>
                ) : (
                  aiRecommendations.map((rec, idx) => (
                    <div key={idx} className="flex items-start gap-2 group cursor-pointer">
                      <Zap className="h-3 w-3 text-yellow-500 mt-0.5 shrink-0" />
                      <p className="text-[11px] text-white/80 leading-relaxed group-hover:text-white transition-colors">
                        {rec}
                      </p>
                    </div>
                  ))
                )}
              </div>
              <Button 
                variant="secondary" 
                onClick={generateAIRecommendations}
                disabled={isGeneratingAI}
                className="w-full h-8 border-interaction-primary/20 text-interaction-primary text-[10px] font-bold hover:bg-interaction-primary/10"
              >
                Refresh Strategy
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
