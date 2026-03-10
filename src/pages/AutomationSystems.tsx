import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/Card';
import { Badge } from '@/src/components/ui/Badge';
import { Button } from '@/src/components/ui/Button';
import { 
  Workflow, 
  Zap, 
  Settings, 
  Plus, 
  Activity, 
  Clock, 
  Database, 
  Link2,
  ChevronRight,
  GitBranch,
  Layers,
  CheckCircle2,
  BrainCircuit,
  ShieldCheck,
  ArrowRight,
  Search,
  MessageSquare,
  X,
  Send,
  Loader2
} from 'lucide-react';
import { cn } from '@/src/utils/cn';

interface WorkflowData {
  id: number;
  name: string;
  description: string;
  status: string;
  created_at: string;
}

interface ChatMessage {
  role: 'user' | 'ai';
  content: string;
}

const PIPELINE_STAGES = [
  { id: 'ingestion', label: 'Data Ingestion', icon: Database, color: 'text-blue-500', bg: 'bg-blue-500/10' },
  { id: 'processing', label: 'AI Processing', icon: BrainCircuit, color: 'text-ai-violet', bg: 'bg-ai-violet/10' },
  { id: 'validation', label: 'Validation', icon: ShieldCheck, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
  { id: 'execution', label: 'Execution', icon: Zap, color: 'text-amber-500', bg: 'bg-amber-500/10' },
];

export default function AutomationSystems() {
  const [workflows, setWorkflows] = useState<WorkflowData[]>([]);
  const [activeWorkflowId, setActiveWorkflowId] = useState<number | null>(null);
  
  // Modals state
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [isNewWorkflowOpen, setIsNewWorkflowOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Config State
  const [apiKey, setApiKey] = useState('');
  const [provider, setProvider] = useState<'groq' | 'gemini'>('groq');
  const [savingKey, setSavingKey] = useState(false);
  const [hasKeys, setHasKeys] = useState<{gemini: boolean, groq: boolean}>({gemini: false, groq: false});

  // New Workflow State
  const [newWfName, setNewWfName] = useState('');
  const [newWfDesc, setNewWfDesc] = useState('');
  const [newWfText, setNewWfText] = useState('');
  const [creatingWf, setCreatingWf] = useState(false);

  // Chat State
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<Record<number, ChatMessage[]>>({});
  const [sendingChat, setSendingChat] = useState(false);

  useEffect(() => {
    fetchApiKeyStatus();
    fetchWorkflows();
  }, []);

  const fetchApiKeyStatus = async () => {
    try {
      const res = await fetch('/api/settings/apikey');
      if (res.ok) {
        const data = await res.json();
        if (data.hasKeys) setHasKeys(data.hasKeys);
      }
    } catch (e) { console.error(e); }
  };

  const fetchWorkflows = async () => {
    try {
      const res = await fetch('/api/workflows');
      if (res.ok) {
        const data = await res.json();
        setWorkflows(data);
        if (data.length > 0 && !activeWorkflowId) {
          setActiveWorkflowId(data[0].id);
        }
      }
    } catch (e) { console.error(e); }
  };

  const saveApiKey = async () => {
    if (!apiKey) return;
    setSavingKey(true);
    try {
      const res = await fetch('/api/settings/apikey', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ apiKey, provider })
      });
      if (res.ok) {
        setHasKeys(prev => ({ ...prev, [provider]: true }));
        setIsConfigOpen(false);
        setApiKey(''); // clear it from memory
      } else {
        alert("Failed to save API Key");
      }
    } catch (e) { console.error(e); }
    setSavingKey(false);
  };

  const createWorkflow = async () => {
    if (!newWfName || !newWfText) return;
    setCreatingWf(true);
    try {
      const res = await fetch('/api/workflows', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newWfName, description: newWfDesc, document_text: newWfText })
      });
      if (res.ok) {
        await fetchWorkflows();
        setIsNewWorkflowOpen(false);
        setNewWfName('');
        setNewWfDesc('');
        setNewWfText('');
      } else {
        alert("Failed to create workflow");
      }
    } catch (e) { console.error(e); }
    setCreatingWf(false);
  };

  const openChat = (id: number) => {
    setActiveWorkflowId(id);
    setIsChatOpen(true);
  };

  const sendChatMessage = async () => {
    if (!chatMessage.trim() || !activeWorkflowId) return;
    
    const msg = chatMessage;
    setChatMessage('');
    
    // Optimistic UI
    setChatHistory(prev => ({
      ...prev,
      [activeWorkflowId]: [...(prev[activeWorkflowId] || []), { role: 'user', content: msg }]
    }));
    
    setSendingChat(true);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ workflowId: activeWorkflowId, message: msg, provider })
      });
      const data = await res.json();
      
      if (res.ok) {
        setChatHistory(prev => ({
          ...prev,
          [activeWorkflowId]: [...prev[activeWorkflowId], { role: 'ai', content: data.response }]
        }));
      } else {
        alert(data.error || "Failed to talk to AI");
        // Revert on error
        setChatHistory(prev => ({
          ...prev,
          [activeWorkflowId]: prev[activeWorkflowId].slice(0, -1)
        }));
      }
    } catch (e) { 
      console.error(e); 
    }
    setSendingChat(false);
  };

  const activeWorkflow = workflows.find(w => w.id === activeWorkflowId);
  const currentChat = activeWorkflowId ? (chatHistory[activeWorkflowId] || []) : [];

  return (
    <div className="space-y-8 pb-12 relative">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold text-text-main mb-1">Strategic Automation</h1>
          <p className="text-text-muted text-sm">Orchestrate enterprise-grade strategic workflows and autonomous data pipelines.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button 
            variant="secondary" 
            onClick={() => setIsConfigOpen(true)}
            className={cn("h-11 px-6 rounded-xl shadow-sm border", (hasKeys.gemini || hasKeys.groq) ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-white border-border-light text-text-main")}
          >
            <Settings className="h-4 w-4 mr-2" />
            {(hasKeys.gemini || hasKeys.groq) ? "Key Configured" : "System Config"}
          </Button>
          <Button 
            onClick={() => setIsNewWorkflowOpen(true)}
            className="bg-interaction-primary text-white rounded-xl shadow-lg font-bold h-11 px-6 hover:shadow-interaction-primary/20 transition-all"
          >
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
                  {idx === 1 && (
                    <div className="absolute inset-0 rounded-2xl border-2 border-ai-violet animate-ping opacity-20" />
                  )}
                </motion.div>
                <div className="text-center">
                  <p className="text-xs font-bold text-text-main mb-1">{stage.label}</p>
                  <p className="text-[10px] text-text-muted font-medium">
                    {idx === 0 ? "Dynamic Inflow" : 
                     idx === 1 ? "Custom GenAI Node" : 
                     idx === 2 ? "Context Validation" : 
                     "Chat Execution"}
                  </p>
                </div>
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
              Strategic Workflows ({workflows.length})
            </h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-text-muted" />
              <input 
                type="text" 
                placeholder="Filter workflows..." 
                className="bg-white border border-border-light rounded-lg pl-9 pr-3 py-1.5 text-[11px] focus:outline-none focus:ring-2 focus:ring-interaction-primary/20 w-48"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {workflows.length === 0 ? (
              <div className="text-center p-12 border border-dashed border-border-light rounded-2xl bg-white flex flex-col items-center">
                <BrainCircuit className="h-12 w-12 text-border-light mb-4" />
                <h3 className="text-text-main font-bold mb-2">No Workflows Activated</h3>
                <p className="text-text-muted text-sm mb-4">Click New Workflow to create a custom AI automation pipeline.</p>
                <Button onClick={() => setIsNewWorkflowOpen(true)} className="bg-interaction-primary">Create Now</Button>
              </div>
            ) : workflows.map((workflow) => (
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
                            "bg-alert-opportunity/10 border-alert-opportunity/20"
                          )}>
                            <Workflow className="h-5 w-5 text-interaction-primary" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="text-sm font-bold text-text-main group-hover:text-interaction-primary transition-colors">{workflow.name}</h3>
                              <Badge className="bg-emerald-50 text-emerald-700 border-none text-[8px] font-bold uppercase py-0 px-1.5">
                                GenAI Node
                              </Badge>
                            </div>
                            <p className="text-[10px] text-text-muted flex items-center gap-2 mt-0.5">
                              <span className="flex items-center gap-1"><Zap className="h-3 w-3" /> Custom Ingestion</span>
                              <span className="h-1 w-1 rounded-full bg-border-light"></span>
                              <span className="flex items-center gap-1"><Layers className="h-3 w-3" /> GenAI Action</span>
                            </p>
                          </div>
                        </div>
                        <p className="text-xs text-text-muted leading-relaxed mb-4 line-clamp-2">
                          {workflow.description || "Custom AI automation workflow ingesting private document context."}
                        </p>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1.5">
                            <CheckCircle2 className="h-3 w-3 text-alert-opportunity" />
                            <span className="text-[10px] font-bold text-text-main">100% Ready</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Clock className="h-3 w-3 text-text-muted" />
                            <span className="text-[10px] text-text-muted">Created: {new Date(workflow.created_at).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                      <div className="w-full md:w-40 shrink-0 bg-secondary-bg/30 border-t md:border-t-0 md:border-l border-border-light p-6 flex flex-col justify-center gap-3">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider">Status</span>
                          <Badge className="text-[9px] font-bold h-5 bg-alert-opportunity/10 text-alert-opportunity border-alert-opportunity/20">
                            {workflow.status}
                          </Badge>
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            onClick={(e) => { e.stopPropagation(); openChat(workflow.id); }}
                            className="w-full h-9 rounded-xl bg-interaction-primary text-white shadow-sm hover:shadow-md hover:bg-interaction-secondary transition-all"
                          >
                            <MessageSquare className="h-3 w-3 mr-2" /> Chat
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
                  <span className="text-xs font-medium text-text-muted">GenAI Tokens</span>
                  <span className="text-xs font-bold text-text-main">Stable</span>
                </div>
                <div className="h-1.5 w-full bg-secondary-bg rounded-full overflow-hidden">
                  <div className="h-full bg-interaction-primary w-[35%]" />
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-text-muted">DB Latency</span>
                  <span className="text-xs font-bold text-text-main">Neon Fast</span>
                </div>
                <div className="h-1.5 w-full bg-secondary-bg rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 w-[90%]" />
                </div>
              </div>
              <div className="pt-2">
                <div className="p-4 rounded-xl bg-alert-opportunity/5 border border-alert-opportunity/20 flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-alert-opportunity" />
                  <div>
                    <p className="text-[11px] font-bold text-alert-opportunity uppercase">Connected</p>
                    <p className="text-[10px] text-text-muted">PostgreSQL cluster active</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* --- MODALS --- */}

      {/* 1. Config Modal */}
      <AnimatePresence>
        {isConfigOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border border-border-light"
            >
              <div className="p-5 border-b border-border-light flex justify-between items-center bg-secondary-bg/50">
                <h3 className="font-bold flex items-center gap-2"><Settings className="h-4 w-4 text-interaction-primary" /> System Configuration</h3>
                <button onClick={() => setIsConfigOpen(false)} className="text-text-muted hover:text-text-main"><X className="h-4 w-4" /></button>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <div className="flex bg-secondary-bg p-1 rounded-xl mb-4">
                    <button 
                      onClick={() => setProvider('groq')}
                      className={cn("flex-1 py-1.5 text-xs font-bold rounded-lg transition-all", provider === 'groq' ? "bg-white shadow-sm text-interaction-primary" : "text-text-muted hover:text-text-main")}
                    >Groq (Fast Inference)</button>
                    <button 
                      onClick={() => setProvider('gemini')}
                      className={cn("flex-1 py-1.5 text-xs font-bold rounded-lg transition-all", provider === 'gemini' ? "bg-white shadow-sm text-interaction-primary" : "text-text-muted hover:text-text-main")}
                    >Google Gemini</button>
                  </div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-text-muted mb-2">
                    {provider === 'groq' ? 'Groq' : 'Gemini'} API Key
                  </label>
                  <input 
                    type="password" 
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder={provider === 'groq' ? "gsk_..." : "AIzaSy..."}
                    className="w-full px-4 py-3 rounded-xl border border-border-light bg-secondary-bg text-sm focus:outline-none focus:ring-2 focus:ring-interaction-primary/50 font-mono"
                  />
                  <p className="text-[10px] text-text-muted mt-2">Your key is stored securely in your private Neon database.</p>
                </div>
                <Button onClick={saveApiKey} disabled={savingKey || !apiKey} className="w-full bg-interaction-primary h-11 rounded-xl">
                  {savingKey ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save Configuration"}
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. New Workflow Modal */}
      <AnimatePresence>
        {isNewWorkflowOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden border border-border-light flex flex-col max-h-[90vh]"
            >
              <div className="p-5 border-b border-border-light flex justify-between items-center bg-secondary-bg/50 shrink-0">
                <h3 className="font-bold flex items-center gap-2"><Workflow className="h-4 w-4 text-interaction-primary" /> Create Automation Workflow</h3>
                <button onClick={() => setIsNewWorkflowOpen(false)} className="text-text-muted hover:text-text-main"><X className="h-4 w-4" /></button>
              </div>
              <div className="p-6 space-y-5 overflow-y-auto">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2 md:col-span-1">
                    <label className="block text-xs font-bold uppercase tracking-wider text-text-muted mb-2">Workflow Name</label>
                    <input 
                      value={newWfName}
                      onChange={(e) => setNewWfName(e.target.value)}
                      placeholder="e.g. HR Policy Bot"
                      className="w-full px-4 py-2 rounded-xl border border-border-light bg-white text-sm focus:outline-none focus:ring-2 focus:ring-interaction-primary/50"
                    />
                  </div>
                  <div className="col-span-2 md:col-span-1">
                    <label className="block text-xs font-bold uppercase tracking-wider text-text-muted mb-2">Description</label>
                    <input 
                      value={newWfDesc}
                      onChange={(e) => setNewWfDesc(e.target.value)}
                      placeholder="Optional short description..."
                      className="w-full px-4 py-2 rounded-xl border border-border-light bg-white text-sm focus:outline-none focus:ring-2 focus:ring-interaction-primary/50"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-text-muted mb-2 flex justify-between">
                    <span>Document Context (Training Data)</span>
                  </label>
                  <textarea 
                    value={newWfText}
                    onChange={(e) => setNewWfText(e.target.value)}
                    placeholder="Paste the document text, guidelines, or knowledge base here. The GenAI will use this to answer questions..."
                    className="w-full px-4 py-3 rounded-xl border border-border-light bg-secondary-bg text-sm focus:outline-none focus:ring-2 focus:ring-interaction-primary/50 h-48 custom-scrollbar resize-none"
                  />
                </div>
              </div>
              <div className="p-5 border-t border-border-light shrink-0 bg-white flex justify-end">
                <Button onClick={createWorkflow} disabled={creatingWf || !newWfName || !newWfText} className="bg-interaction-primary px-8 rounded-xl h-11">
                  {creatingWf ? <Loader2 className="h-4 w-4 animate-spin" /> : "Deploy Workflow"}
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. AI Chat Modal / Sliding Panel */}
      <AnimatePresence>
        {isChatOpen && activeWorkflowId && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsChatOpen(false)}
              className="fixed inset-0 bg-black/20 z-40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full md:w-[450px] bg-white border-l border-border-light shadow-2xl z-50 flex flex-col"
            >
              <div className="p-4 border-b border-border-light flex items-center justify-between bg-zinc-900 text-white shadow-md">
                <div className="flex items-center space-x-3">
                  <div className="h-8 w-8 rounded-lg bg-white/10 flex items-center justify-center">
                    <BrainCircuit className="h-4 w-4 text-emerald-400" />
                  </div>
                  <div>
                    <h2 className="font-heading font-bold text-sm">{workflows.find(w=>w.id === activeWorkflowId)?.name}</h2>
                    <div className="flex items-center gap-1">
                      <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                      <span className="text-[9px] text-zinc-400 uppercase tracking-widest font-bold">GenAI Core Active</span>
                    </div>
                  </div>
                </div>
                <button onClick={() => setIsChatOpen(false)} className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors">
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-secondary-bg/50">
                {currentChat.length === 0 ? (
                  <div className="text-center mt-10 p-6 opacity-60">
                    <MessageSquare className="h-10 w-10 mx-auto text-text-muted mb-4" />
                    <p className="text-sm text-text-muted">Chat with this workflow.<br/>It knows all the context you provided!</p>
                  </div>
                ) : (
                  currentChat.map((msg, idx) => (
                    <div key={idx} className={cn("flex items-end gap-2", msg.role === 'user' ? "flex-row-reverse" : "flex-row")}>
                      <div className={cn("w-6 h-6 rounded-full flex items-center justify-center shrink-0 self-start text-[10px] font-bold mt-1",
                        msg.role === 'user' ? "bg-interaction-primary text-white" : "bg-zinc-900 text-white"
                      )}>
                        {msg.role === 'user' ? 'U' : 'AI'}
                      </div>
                      <div className={cn(
                        "p-3 rounded-2xl text-sm overflow-hidden",
                        msg.role === 'user' 
                          ? "bg-interaction-primary text-white rounded-tr-sm max-w-[80%]" 
                          : "bg-white border border-border-light text-text-main rounded-tl-sm shadow-sm prose prose-sm prose-zinc max-w-[90%] break-words w-full"
                      )}>
                        {msg.role === 'user' ? (
                          msg.content
                        ) : (
                          <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {msg.content}
                          </ReactMarkdown>
                        )}
                      </div>
                    </div>
                  ))
                )}
                {sendingChat && (
                  <div className="flex items-end gap-2">
                    <div className="w-6 h-6 bg-zinc-900 text-white rounded-full flex items-center justify-center shrink-0 self-start mt-1">
                      <Loader2 className="h-3 w-3 animate-spin" />
                    </div>
                    <div className="p-3 bg-white border border-border-light rounded-2xl rounded-tl-sm w-16 flex justify-center shadow-sm">
                      <span className="flex space-x-1">
                        <span className="h-1.5 w-1.5 bg-text-muted rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                        <span className="h-1.5 w-1.5 bg-text-muted rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                        <span className="h-1.5 w-1.5 bg-text-muted rounded-full animate-bounce"></span>
                      </span>
                    </div>
                  </div>
                )}
              </div>

              <div className="p-4 border-t border-border-light bg-white shrink-0">
                <div className="relative flex items-center">
                  <input 
                    type="text" 
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && sendChatMessage()}
                    placeholder="Ask a question..." 
                    className="w-full bg-secondary-bg border border-border-light rounded-2xl pl-4 pr-12 py-3.5 text-sm text-text-main focus:outline-none focus:border-interaction-primary focus:ring-1 focus:ring-interaction-primary"
                  />
                  <button 
                    onClick={sendChatMessage}
                    disabled={sendingChat || !chatMessage.trim()}
                    className="absolute right-1.5 top-1/2 -translate-y-1/2 p-2 bg-interaction-primary text-white rounded-xl hover:bg-interaction-secondary transition-colors disabled:opacity-50"
                  >
                    <Send className="h-4 w-4 ml-0.5" />
                  </button>
                </div>
                <p className="text-center text-[9px] text-text-muted mt-3 font-medium uppercase tracking-wider">
                  Powered by Matrix360 GenAI Engine
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
