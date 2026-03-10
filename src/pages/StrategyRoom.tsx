import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Video, Mic, MicOff, VideoOff, PhoneOff, 
  MessageSquare, Users, BrainCircuit, FileText, 
  Settings, Share2, MoreVertical, Send,
  Play, Square, Layout, Maximize2, Activity,
  ShieldAlert, Lightbulb, CheckSquare, Plus,
  Minus, MousePointer2, Pencil, Type, Eraser,
  Download, History, Target, TrendingUp, AlertTriangle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/Card';
import { Button } from '@/src/components/ui/Button';
import { Badge } from '@/src/components/ui/Badge';
import { Input } from '@/src/components/ui/Input';
import { cn } from '@/src/utils/cn';
import { Stage, Layer, Line, Rect, Circle, Text } from 'react-konva';

// --- Types ---
interface Decision {
  id: string;
  content: string;
  time: string;
  owner: string;
}

interface AIInsight {
  id: string;
  type: 'Risk' | 'Opportunity' | 'Recommendation';
  content: string;
  confidence: number;
}

interface ChatMessage {
  id: string;
  sender: string;
  content: string;
  time: string;
  isAI?: boolean;
}

export default function StrategyRoom() {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [activeTab, setActiveTab] = useState<'chat' | 'insights' | 'decisions'>('insights');
  const [whiteboardTool, setWhiteboardTool] = useState<'pencil' | 'rect' | 'circle' | 'eraser'>('pencil');
  const [lines, setLines] = useState<any[]>([]);
  const isDrawing = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // --- Mock Data ---
  const participants = [
    { id: 1, name: 'Marcus Chen', role: 'Strategic Advisor', active: true, avatar: 'MC', isHost: true },
    { id: 2, name: 'Sarah Jenkins', role: 'Enterprise Lead', active: true, avatar: 'SJ' },
    { id: 3, name: 'AI Strategy Bot', role: 'Intelligence Assistant', active: true, avatar: 'AI', isAI: true },
    { id: 4, name: 'David Miller', role: 'Technical Architect', active: true, avatar: 'DM' },
  ];

  const [decisions, setDecisions] = useState<Decision[]>([
    { id: '1', content: 'Approved phased APAC market entry starting with Singapore Q3 2024.', time: '10:14 AM', owner: 'Sarah Jenkins' },
    { id: '2', content: 'Allocated $2.5M for initial regulatory compliance framework.', time: '10:45 AM', owner: 'Marcus Chen' },
  ]);

  const [insights, setInsights] = useState<AIInsight[]>([
    { id: '1', type: 'Risk', content: 'Singapore Data Sovereignty Act 2024 may impact cloud storage architecture.', confidence: 94 },
    { id: '2', type: 'Opportunity', content: 'New ESG tax incentives in Indonesia could offset 15% of initial setup costs.', confidence: 88 },
    { id: '3', type: 'Recommendation', content: 'Establish a local entity in Jakarta by Q4 to leverage regional trade agreements.', confidence: 91 },
  ]);

  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '1', sender: 'Marcus Chen', content: 'Has everyone reviewed the latest compliance doc?', time: '10:12 AM' },
    { id: '2', sender: 'Sarah Jenkins', content: 'Yes, the Singapore section is particularly relevant.', time: '10:14 AM' },
    { id: '3', sender: 'AI Strategy Bot', content: 'Based on the current discussion, I recommend focusing on Section 4.2: Data Sovereignty.', time: '10:15 AM', isAI: true },
  ]);

  // --- Whiteboard Logic ---
  useEffect(() => {
    if (containerRef.current) {
      const { offsetWidth, offsetHeight } = containerRef.current;
      setDimensions({ width: offsetWidth, height: offsetHeight });
    }
  }, []);

  const handleMouseDown = (e: any) => {
    isDrawing.current = true;
    const pos = e.target.getStage().getPointerPosition();
    setLines([...lines, { tool: whiteboardTool, points: [pos.x, pos.y] }]);
  };

  const handleMouseMove = (e: any) => {
    if (!isDrawing.current) return;
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    let lastLine = lines[lines.length - 1];
    lastLine.points = lastLine.points.concat([point.x, point.y]);
    lines.splice(lines.length - 1, 1, lastLine);
    setLines(lines.concat());
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-[calc(100vh-100px)] lg:h-[calc(100vh-100px)] flex flex-col gap-4 bg-[#050505] -m-6 p-4 md:p-6 overflow-y-auto lg:overflow-hidden"
    >
      {/* --- War Room Header --- */}
      <header className="flex flex-col md:flex-row md:items-center justify-between border-b border-white/10 pb-4 gap-4">
        <div className="flex items-center gap-6">
          <div className="flex flex-col">
            <div className="flex items-center gap-3">
              <div className="h-3 w-3 rounded-full bg-red-500 animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
              <h1 className="text-lg md:text-xl font-mono font-bold text-white tracking-tighter uppercase">Strategic War Room: APAC Expansion</h1>
            </div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1">
              <span className="text-[9px] md:text-[10px] font-mono text-white/40 uppercase tracking-widest">ID: STRAT-2024-0402</span>
              <span className="text-[9px] md:text-[10px] font-mono text-white/40 uppercase tracking-widest">Security: TOP SECRET</span>
              <span className="text-[9px] md:text-[10px] font-mono text-white/40 uppercase tracking-widest">Time: 10:52:14 GMT+8</span>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between md:justify-end gap-3">
          <div className="flex -space-x-2 mr-2 md:mr-4">
            {participants.map(p => (
              <div key={p.id} className="h-7 w-7 md:h-8 md:w-8 rounded-full border-2 border-[#050505] bg-zinc-800 flex items-center justify-center text-[9px] md:text-[10px] font-bold text-white">
                {p.avatar}
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <Button variant="secondary" size="sm" className="bg-white/5 border-white/10 hover:bg-white/10 text-white h-8 md:h-9">
              <Share2 className="h-3.5 w-3.5 md:h-4 md:w-4 md:mr-2" />
              <span className="hidden sm:inline text-xs">Invite</span>
            </Button>
            <Button variant="secondary" size="sm" className="bg-white/5 border-white/10 hover:bg-white/10 text-white h-8 md:h-9">
              <Settings className="h-3.5 w-3.5 md:h-4 md:w-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* --- Main Grid Layout --- */}
      <div className="flex-1 flex flex-col lg:grid lg:grid-cols-12 gap-4 overflow-y-auto lg:overflow-hidden">
        
        {/* LEFT: Video & Participants (3 Cols) */}
        <aside className="col-span-12 lg:col-span-3 flex flex-col gap-4 lg:overflow-hidden min-h-[300px] lg:min-h-0">
          <div className="flex-1 bg-zinc-900/50 rounded-xl border border-white/5 overflow-hidden relative group">
            <img 
              src="https://picsum.photos/seed/host/600/800" 
              alt="Main Speaker" 
              className="w-full h-full object-cover opacity-80"
              referrerPolicy="no-referrer"
            />
            <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
              <span className="text-[10px] font-bold text-white uppercase tracking-wider">Marcus Chen (Host)</span>
            </div>
            
            {/* Participant Grid Overlay */}
            <div className="absolute bottom-4 left-4 right-4 grid grid-cols-2 gap-2">
              {participants.slice(1, 3).map(p => (
                <div key={p.id} className="aspect-video bg-black/40 backdrop-blur-md rounded-lg border border-white/10 overflow-hidden relative">
                  <img 
                    src={`https://picsum.photos/seed/${p.name}/300/200`} 
                    alt={p.name} 
                    className="w-full h-full object-cover opacity-60"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-1 left-2 text-[8px] font-bold text-white/80 uppercase">{p.name}</div>
                </div>
              ))}
            </div>

            {/* Controls */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-black/60 backdrop-blur-xl p-2 rounded-2xl border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button size="sm" variant="text" className="h-8 w-8 p-0 rounded-full hover:bg-white/10" onClick={() => setIsMuted(!isMuted)}>
                {isMuted ? <MicOff className="h-4 w-4 text-red-500" /> : <Mic className="h-4 w-4 text-white" />}
              </Button>
              <Button size="sm" variant="text" className="h-8 w-8 p-0 rounded-full hover:bg-white/10" onClick={() => setIsVideoOff(!isVideoOff)}>
                {isVideoOff ? <VideoOff className="h-4 w-4 text-red-500" /> : <Video className="h-4 w-4 text-white" />}
              </Button>
              <Button size="sm" variant="danger" className="h-8 w-8 p-0 rounded-full">
                <PhoneOff className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* AI Strategy Assistant (Bottom of Left) */}
          <Card className="h-1/3 bg-zinc-900/50 border-white/5 overflow-hidden flex flex-col">
            <CardHeader className="p-4 border-b border-white/5 bg-white/5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BrainCircuit className="h-4 w-4 text-interaction-primary" />
                  <CardTitle className="text-[10px] font-bold text-white uppercase tracking-widest">AI Strategy Assistant</CardTitle>
                </div>
                <Badge variant="secondary" className="bg-interaction-primary/10 text-interaction-primary text-[8px] border-interaction-primary/20">ACTIVE</Badge>
              </div>
            </CardHeader>
            <CardContent className="p-4 overflow-y-auto space-y-4">
              <div className="space-y-2">
                <h4 className="text-[9px] font-bold text-white/40 uppercase tracking-widest">Current Summary</h4>
                <p className="text-xs text-white/80 leading-relaxed">
                  Discussion is centered on <span className="text-interaction-primary">Singapore regulatory compliance</span>. Team is leaning towards a hub-and-spoke model for APAC operations.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="text-[9px] font-bold text-white/40 uppercase tracking-widest">Strategic Risks</h4>
                <div className="flex items-start gap-2 p-2 bg-red-500/5 border border-red-500/10 rounded-lg">
                  <AlertTriangle className="h-3 w-3 text-red-500 shrink-0 mt-0.5" />
                  <p className="text-[10px] text-red-400/80">Data sovereignty laws in Indonesia may require local server infrastructure by 2025.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </aside>

        {/* CENTER: Whiteboard & Recommendations (6 Cols) */}
        <main className="col-span-12 lg:col-span-6 flex flex-col gap-4 lg:overflow-hidden min-h-[400px] lg:min-h-0">
          {/* Strategic Whiteboard */}
          <div className="flex-1 bg-zinc-900/30 rounded-xl border border-white/5 flex flex-col overflow-hidden">
            <div className="p-3 border-b border-white/5 bg-white/5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-white/60" />
                  <span className="text-[10px] font-bold text-white uppercase tracking-widest">Strategic Whiteboard</span>
                </div>
                <div className="h-4 w-px bg-white/10 hidden sm:block" />
                <div className="flex items-center gap-1">
                  <Button 
                    size="sm" 
                    variant="text" 
                    className={cn("h-7 w-7 p-0 rounded-md", whiteboardTool === 'pencil' ? "bg-white/10 text-white" : "text-white/40")}
                    onClick={() => setWhiteboardTool('pencil')}
                  >
                    <Pencil className="h-3.5 w-3.5" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="text" 
                    className={cn("h-7 w-7 p-0 rounded-md", whiteboardTool === 'rect' ? "bg-white/10 text-white" : "text-white/40")}
                    onClick={() => setWhiteboardTool('rect')}
                  >
                    <Layout className="h-3.5 w-3.5" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="text" 
                    className={cn("h-7 w-7 p-0 rounded-md", whiteboardTool === 'eraser' ? "bg-white/10 text-white" : "text-white/40")}
                    onClick={() => setWhiteboardTool('eraser')}
                  >
                    <Eraser className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button size="sm" variant="text" className="h-7 text-[10px] text-white/40 hover:text-white hidden sm:flex">
                  <Download className="h-3.5 w-3.5 mr-1.5" />
                  Export
                </Button>
                <Button size="sm" variant="text" className="h-7 text-[10px] text-white/40 hover:text-white hidden sm:flex">
                  <History className="h-3.5 w-3.5 mr-1.5" />
                  History
                </Button>
              </div>
            </div>
            <div ref={containerRef} className="flex-1 bg-[#0a0a0a] relative cursor-crosshair">
              <Stage
                width={dimensions.width}
                height={dimensions.height}
                onMouseDown={handleMouseDown}
                onMousemove={handleMouseMove}
                onMouseup={handleMouseUp}
              >
                <Layer>
                  {lines.map((line, i) => (
                    <Line
                      key={i}
                      points={line.points}
                      stroke="#00f2ff"
                      strokeWidth={2}
                      tension={0.5}
                      lineCap="round"
                      globalCompositeOperation={
                        line.tool === 'eraser' ? 'destination-out' : 'source-over'
                      }
                    />
                  ))}
                </Layer>
              </Stage>
              
              {/* Floating Strategy Elements */}
              <div className="absolute top-10 left-10 p-4 bg-interaction-primary/5 border border-interaction-primary/20 rounded-xl backdrop-blur-md pointer-events-none">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="h-4 w-4 text-interaction-primary" />
                  <span className="text-[10px] font-bold text-white uppercase">Phase 1: Singapore Hub</span>
                </div>
                <div className="space-y-1">
                  <div className="h-1 w-24 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full w-3/4 bg-interaction-primary" />
                  </div>
                  <span className="text-[8px] text-white/40 uppercase">75% Complete</span>
                </div>
              </div>
            </div>
          </div>

          {/* Strategic Recommendations & Brief (Bottom of Center) */}
          <div className="flex flex-col sm:flex-row lg:h-1/3 gap-4 lg:overflow-hidden">
            {/* Recommendations */}
            <div className="flex-1 bg-zinc-900/50 rounded-xl border border-white/5 flex flex-col overflow-hidden min-h-[200px] lg:min-h-0">
              <div className="p-3 border-b border-white/5 bg-white/5 flex items-center gap-2">
                <Lightbulb className="h-4 w-4 text-yellow-500" />
                <span className="text-[10px] font-bold text-white uppercase tracking-widest text-yellow-500/80">Strategic Recommendations</span>
              </div>
              <div className="flex-1 p-4 grid grid-cols-1 sm:grid-cols-2 gap-4 overflow-y-auto">
                {insights.filter(i => i.type === 'Recommendation').map(rec => (
                  <div key={rec.id} className="p-3 bg-white/5 border border-white/10 rounded-lg hover:border-interaction-primary/30 transition-all group">
                    <div className="flex items-center justify-between mb-2">
                      <Badge className="bg-interaction-primary/20 text-interaction-primary text-[8px] border-none">REC-00{rec.id}</Badge>
                      <span className="text-[9px] font-mono text-white/40">{rec.confidence}% CONF</span>
                    </div>
                    <p className="text-[10px] text-white/80 leading-relaxed group-hover:text-white transition-colors">{rec.content}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Collaborative Strategic Brief */}
            <div className="flex-1 sm:w-1/2 bg-zinc-900/50 rounded-xl border border-white/5 flex flex-col overflow-hidden min-h-[200px] lg:min-h-0">
              <div className="p-3 border-b border-white/5 bg-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-interaction-primary" />
                  <span className="text-[10px] font-bold text-white uppercase tracking-widest">Strategic Brief</span>
                </div>
                <Badge variant="secondary" className="bg-green-500/10 text-green-500 text-[8px] border-green-500/20">LIVE EDITING</Badge>
              </div>
              <div className="flex-1 p-4 overflow-y-auto">
                <div className="space-y-4">
                  <div className="space-y-1">
                    <h5 className="text-[10px] font-bold text-white/60 uppercase">Executive Summary</h5>
                    <p className="text-[10px] text-white/40 leading-relaxed">
                      The APAC expansion initiative aims to establish Singapore as the primary regional hub by Q3 2024, leveraging local regulatory frameworks to ensure 100% compliance across ASEAN markets.
                    </p>
                  </div>
                  <div className="space-y-1">
                    <h5 className="text-[10px] font-bold text-white/60 uppercase">Key Objectives</h5>
                    <ul className="list-disc list-inside text-[10px] text-white/40 space-y-1">
                      <li>Establish Singapore HQ</li>
                      <li>Secure Data Sovereignty Compliance</li>
                      <li>Hire Regional Leadership Team</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* RIGHT: AI Insights, Decisions & Chat (3 Cols) */}
        <aside className="col-span-12 lg:col-span-3 flex flex-col gap-4 lg:overflow-hidden min-h-[400px] lg:min-h-0">
          {/* AI Insight Panel */}
          <Card className="flex-1 bg-zinc-900/50 border-white/5 overflow-hidden flex flex-col">
            <div className="flex p-1 bg-black/40 border-b border-white/5">
              <button 
                onClick={() => setActiveTab('insights')}
                className={cn(
                  "flex-1 py-2 text-[10px] font-bold uppercase tracking-widest transition-all",
                  activeTab === 'insights' ? "text-interaction-primary border-b-2 border-interaction-primary" : "text-white/40 hover:text-white/60"
                )}
              >
                Insights
              </button>
              <button 
                onClick={() => setActiveTab('decisions')}
                className={cn(
                  "flex-1 py-2 text-[10px] font-bold uppercase tracking-widest transition-all",
                  activeTab === 'decisions' ? "text-interaction-primary border-b-2 border-interaction-primary" : "text-white/40 hover:text-white/60"
                )}
              >
                Decisions
              </button>
              <button 
                onClick={() => setActiveTab('chat')}
                className={cn(
                  "flex-1 py-2 text-[10px] font-bold uppercase tracking-widest transition-all",
                  activeTab === 'chat' ? "text-interaction-primary border-b-2 border-interaction-primary" : "text-white/40 hover:text-white/60"
                )}
              >
                Chat
              </button>
            </div>
            
            <CardContent className="flex-1 p-0 overflow-hidden relative">
              <AnimatePresence mode="wait">
                {activeTab === 'insights' && (
                  <motion.div 
                    key="insights"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="p-4 space-y-4 h-full overflow-y-auto"
                  >
                    {insights.filter(i => i.type !== 'Recommendation').map(insight => (
                      <div key={insight.id} className="p-3 bg-white/5 border border-white/10 rounded-lg space-y-2">
                        <div className="flex items-center justify-between">
                          <Badge variant={insight.type === 'Risk' ? 'red' : 'green'} className="text-[8px] px-1.5 py-0 border-none">
                            {insight.type.toUpperCase()}
                          </Badge>
                          <span className="text-[9px] font-mono text-white/40">{insight.confidence}% CONF</span>
                        </div>
                        <p className="text-[11px] text-white/80 leading-relaxed">{insight.content}</p>
                        <div className="flex items-center gap-2 pt-1">
                          <Button size="sm" variant="text" className="h-6 text-[8px] text-interaction-primary hover:text-interaction-primary/80 p-0">
                            ANALYZE FURTHER
                          </Button>
                          <Button size="sm" variant="text" className="h-6 text-[8px] text-white/40 hover:text-white/60 p-0">
                            DISMISS
                          </Button>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}

                {activeTab === 'decisions' && (
                  <motion.div 
                    key="decisions"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="p-4 space-y-4 h-full overflow-y-auto"
                  >
                    {decisions.map(decision => (
                      <div key={decision.id} className="p-3 bg-green-500/5 border border-green-500/20 rounded-lg space-y-2 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-2 opacity-20">
                          <CheckSquare className="h-8 w-8 text-green-500" />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-[9px] font-mono text-green-500/60">{decision.time}</span>
                          <span className="text-[9px] font-bold text-white/40 uppercase">{decision.owner}</span>
                        </div>
                        <p className="text-[11px] text-white/90 leading-relaxed pr-6">{decision.content}</p>
                      </div>
                    ))}
                    <Button variant="secondary" className="w-full bg-white/5 border-white/10 text-white/60 text-[10px] h-8 uppercase tracking-widest hover:text-white">
                      Log New Decision
                    </Button>
                  </motion.div>
                )}

                {activeTab === 'chat' && (
                  <motion.div 
                    key="chat"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex flex-col h-full"
                  >
                    <div className="flex-1 p-4 space-y-4 overflow-y-auto">
                      {messages.map(msg => (
                        <div key={msg.id} className={cn(
                          "flex flex-col gap-1 max-w-[85%]",
                          msg.isAI ? "ml-0" : "ml-auto items-end"
                        )}>
                          <div className="flex items-center gap-2">
                            <span className="text-[8px] font-bold text-white/40 uppercase tracking-widest">{msg.sender}</span>
                            <span className="text-[8px] font-mono text-white/20">{msg.time}</span>
                          </div>
                          <div className={cn(
                            "p-2.5 rounded-xl text-[11px] leading-relaxed",
                            msg.isAI 
                              ? "bg-interaction-primary/10 text-interaction-primary border border-interaction-primary/20 rounded-tl-none" 
                              : "bg-white/5 text-white/90 border border-white/10 rounded-tr-none"
                          )}>
                            {msg.content}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="p-4 border-t border-white/5">
                      <div className="flex gap-2">
                        <Input 
                          placeholder="Command AI or message team..." 
                          className="h-9 bg-black/40 border-white/10 text-white text-xs placeholder:text-white/20 focus:border-interaction-primary/50" 
                        />
                        <Button size="sm" className="h-9 w-9 p-0 shrink-0 bg-interaction-primary hover:bg-interaction-primary/90">
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>

          {/* Real-time Telemetry (Bottom of Right) */}
          <div className="h-24 bg-zinc-900/50 rounded-xl border border-white/5 p-3 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Activity className="h-3 w-3 text-interaction-primary" />
                <span className="text-[9px] font-bold text-white/40 uppercase tracking-widest">Network Telemetry</span>
              </div>
              <span className="text-[9px] font-mono text-green-500">ENCRYPTED</span>
            </div>
            <div className="flex items-end gap-1 h-8">
              {[40, 70, 45, 90, 65, 80, 55, 95, 75, 60, 85, 50, 70, 40, 60].map((h, i) => (
                <div 
                  key={i} 
                  className="flex-1 bg-interaction-primary/20 rounded-t-sm" 
                  style={{ height: `${h}%` }} 
                />
              ))}
            </div>
            <div className="flex items-center justify-between text-[8px] font-mono text-white/20 uppercase tracking-tighter">
              <span>Latency: 14ms</span>
              <span>Packet Loss: 0.00%</span>
              <span>Bitrate: 4.2 Mbps</span>
            </div>
          </div>
        </aside>
      </div>
    </motion.div>
  );
}
