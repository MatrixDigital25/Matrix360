import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/src/components/ui/Card';
import { Badge } from '@/src/components/ui/Badge';
import { Button } from '@/src/components/ui/Button';
import { 
  Target, FileText, MessageSquare, Clock, 
  CheckCircle2, AlertCircle, BrainCircuit, 
  UploadCloud, Users, ChevronRight, Share2,
  Video, FileAudio, Search
} from 'lucide-react';
import { NetworkGraph } from '@/src/components/ui/Charts';
import { cn } from '@/src/utils/cn';

const stakeholderNodes = [
  { id: '1', label: 'CEO', x: 50, y: 20, size: 6, color: '#2F5BFF' },
  { id: '2', label: 'CTO', x: 30, y: 40, size: 5, color: '#2BB3A3' },
  { id: '3', label: 'CFO', x: 70, y: 40, size: 5, color: '#E5484D' },
  { id: '4', label: 'VP Eng', x: 20, y: 65, size: 4, color: '#2BB3A3' },
  { id: '5', label: 'VP Prod', x: 40, y: 65, size: 4, color: '#2BB3A3' },
  { id: '6', label: 'Legal', x: 80, y: 65, size: 4, color: '#E5484D' },
  { id: '7', label: 'Regulator', x: 85, y: 85, size: 5, color: '#2A2A2A' },
];

const stakeholderLinks = [
  { source: '1', target: '2', value: 1.5 },
  { source: '1', target: '3', value: 1.5 },
  { source: '2', target: '4', value: 1 },
  { source: '2', target: '5', value: 1 },
  { source: '3', target: '6', value: 1 },
  { source: '6', target: '7', value: 0.5 },
];

export default function Workspace() {
  const [activeTab, setActiveTab] = useState<'documents' | 'stakeholders' | 'transcripts'>('documents');

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8 h-[calc(100vh-8rem)] flex flex-col"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="h-12 w-12 rounded-lg bg-interaction-primary/10 flex items-center justify-center">
            <Target className="h-6 w-6 text-interaction-primary" />
          </div>
          <div>
            <div className="flex items-center space-x-3 mb-1">
              <h1 className="text-3xl font-heading font-bold text-text-main">APAC Market Entry Strategy</h1>
              <Badge variant="cyan">Active</Badge>
            </div>
            <p className="text-text-muted">Led by Marcus Chen • Started Oct 1, 2023</p>
          </div>
        </div>
        <div className="flex space-x-3">
          <Button variant="secondary" className="bg-white">
            <Users className="mr-2 h-4 w-4" />
            Manage Team
          </Button>
          <Button variant="primary">
            <BrainCircuit className="mr-2 h-4 w-4" />
            AI Strategy Copilot
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-5 flex-1 min-h-0">
        {/* Left Column: Project Status & Tasks */}
        <div className="lg:col-span-1 space-y-6 overflow-y-auto pr-2 custom-scrollbar">
          <Card className="bg-white border-border-light shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Project Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-text-muted">Overall Progress</span>
                    <span className="text-interaction-primary font-bold">45%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[var(--color-interaction-secondary)] to-[var(--color-ai-violet)] rounded-full" style={{ width: '45%' }}></div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="p-2 rounded bg-gray-50 border border-border-light">
                    <p className="text-xs text-text-muted mb-1">Timeline</p>
                    <Badge variant="green" className="w-full justify-center">On Track</Badge>
                  </div>
                  <div className="p-2 rounded bg-gray-50 border border-border-light">
                    <p className="text-xs text-text-muted mb-1">Budget</p>
                    <Badge variant="green" className="w-full justify-center">Healthy</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-border-light shadow-sm">
            <CardHeader className="pb-3 flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Deliverables</CardTitle>
              <Button variant="text" size="sm" className="h-8 w-8 p-0 rounded-full"><PlusIcon /></Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { title: 'Initial Market Assessment', status: 'done', date: 'Oct 15' },
                  { title: 'Regulatory Risk Matrix', status: 'review', date: 'Oct 22' },
                  { title: 'Competitor Analysis', status: 'todo', date: 'Nov 05' },
                  { title: 'Go-to-Market Playbook', status: 'todo', date: 'Nov 20' },
                ].map((task, i) => (
                  <div key={i} className="flex items-start space-x-3 p-2 rounded hover:bg-gray-50 transition-colors cursor-pointer">
                    {task.status === 'done' ? (
                      <CheckCircle2 className="h-5 w-5 text-alert-opportunity flex-shrink-0" />
                    ) : task.status === 'review' ? (
                      <AlertCircle className="h-5 w-5 text-amber-500 flex-shrink-0" />
                    ) : (
                      <div className="h-5 w-5 rounded-full border-2 border-gray-300 flex-shrink-0"></div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-medium truncate ${task.status === 'done' ? 'text-gray-400 line-through' : 'text-text-main'}`}>
                        {task.title}
                      </p>
                      <p className="text-xs text-text-muted">{task.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Middle Column: Main Workspace Area */}
        <div className="lg:col-span-2 flex flex-col h-full space-y-5">
          {/* Workspace Tabs */}
          <div className="flex space-x-1 bg-white p-1 border border-border-light rounded-lg shadow-sm">
            <button 
              onClick={() => setActiveTab('documents')}
              className={cn(
                "flex-1 flex items-center justify-center py-2 px-4 rounded-md text-sm font-medium transition-colors",
                activeTab === 'documents' ? "bg-interaction-primary/10 text-interaction-primary" : "text-text-muted hover:text-text-main hover:bg-gray-50"
              )}
            >
              <FileText className="w-4 h-4 mr-2" />
              Strategy Documents
            </button>
            <button 
              onClick={() => setActiveTab('stakeholders')}
              className={cn(
                "flex-1 flex items-center justify-center py-2 px-4 rounded-md text-sm font-medium transition-colors",
                activeTab === 'stakeholders' ? "bg-interaction-primary/10 text-interaction-primary" : "text-text-muted hover:text-text-main hover:bg-gray-50"
              )}
            >
              <Share2 className="w-4 h-4 mr-2" />
              Stakeholder Map
            </button>
            <button 
              onClick={() => setActiveTab('transcripts')}
              className={cn(
                "flex-1 flex items-center justify-center py-2 px-4 rounded-md text-sm font-medium transition-colors",
                activeTab === 'transcripts' ? "bg-interaction-primary/10 text-interaction-primary" : "text-text-muted hover:text-text-main hover:bg-gray-50"
              )}
            >
              <Video className="w-4 h-4 mr-2" />
              Meeting Transcripts
            </button>
          </div>

          <Card className="flex-1 flex flex-col overflow-hidden border-border-light bg-white shadow-sm">
            {activeTab === 'documents' && (
              <>
                <div className="flex items-center justify-between p-4 border-b border-border-light bg-gray-50">
                  <div className="flex items-center space-x-2">
                    <FileText className="h-5 w-5 text-interaction-primary" />
                    <h3 className="font-semibold text-text-main">Regulatory Risk Matrix (Draft)</h3>
                  </div>
                  <div className="flex space-x-2">
                    <Badge variant="amber">In Review</Badge>
                    <Button variant="text" size="sm">Edit</Button>
                  </div>
                </div>
                <div className="flex-1 p-5 overflow-y-auto custom-scrollbar bg-white">
                  <div className="prose prose-slate max-w-none">
                    <h2 className="text-2xl font-heading font-bold text-text-main mb-4">Executive Summary</h2>
                    <p className="text-text-muted mb-4 leading-relaxed">
                      The APAC region presents significant opportunities for expansion, but requires careful navigation of fragmented regulatory environments. Our initial analysis indicates that data localization laws in key target markets (specifically Singapore and Indonesia) pose the highest immediate compliance risk to the proposed cloud infrastructure rollout.
                    </p>
                    <h3 className="text-xl font-heading font-semibold text-text-main mt-8 mb-3">Key Risk Factors</h3>
                    <ul className="list-disc pl-5 space-y-2 text-text-muted mb-6">
                      <li><strong>Data Sovereignty:</strong> Strict requirements for local data storage.</li>
                      <li><strong>Cross-border Transfers:</strong> Complex mechanisms required for data sharing with EU headquarters.</li>
                      <li><strong>Sector-specific Compliance:</strong> Financial services regulations require additional licensing.</li>
                    </ul>
                    
                    <div className="p-4 rounded-lg border border-interaction-primary/30 bg-interaction-primary/5 my-8">
                      <div className="flex items-center mb-2">
                        <BrainCircuit className="h-5 w-5 text-interaction-primary mr-2" />
                        <span className="font-semibold text-interaction-primary">AI Suggestion</span>
                      </div>
                      <p className="text-sm text-text-muted">
                        Based on recent legislative drafts in Singapore (Oct 2023), consider adopting a federated data architecture to mitigate cross-border transfer risks while maintaining centralized analytics capabilities.
                      </p>
                      <Button variant="secondary" size="sm" className="mt-3 text-xs bg-white">Incorporate Suggestion</Button>
                    </div>
                  </div>
                </div>
              </>
            )}

            {activeTab === 'stakeholders' && (
              <>
                <div className="flex items-center justify-between p-4 border-b border-border-light bg-gray-50">
                  <div className="flex items-center space-x-2">
                    <Share2 className="h-5 w-5 text-interaction-primary" />
                    <h3 className="font-semibold text-text-main">Stakeholder Influence Map</h3>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="text" size="sm">Export</Button>
                  </div>
                </div>
                <div className="flex-1 p-5 flex flex-col bg-white">
                  <div className="mb-4 text-sm text-text-muted">
                    Mapping key decision-makers and their relationships for the APAC expansion initiative.
                  </div>
                  <div className="flex-1 border border-border-light rounded-lg overflow-hidden flex items-center justify-center bg-gray-50/50">
                    <NetworkGraph nodes={stakeholderNodes} links={stakeholderLinks} height={400} />
                  </div>
                </div>
              </>
            )}

            {activeTab === 'transcripts' && (
              <>
                <div className="flex items-center justify-between p-4 border-b border-border-light bg-gray-50">
                  <div className="flex items-center space-x-2">
                    <Video className="h-5 w-5 text-interaction-primary" />
                    <h3 className="font-semibold text-text-main">Meeting Transcripts & Insights</h3>
                  </div>
                  <div className="flex space-x-2 relative">
                    <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input 
                      type="text" 
                      placeholder="Search transcripts..." 
                      className="pl-8 pr-3 py-1.5 text-sm border border-border-light rounded-md focus:outline-none focus:border-interaction-primary"
                    />
                  </div>
                </div>
                <div className="flex-1 p-5 overflow-y-auto custom-scrollbar bg-white space-y-4">
                  {[
                    { title: 'Kickoff: APAC Expansion Strategy', date: 'Oct 1, 2023', duration: '45 min', participants: 4, aiSummary: 'Aligned on primary target markets (Singapore, Japan, Australia). Agreed to prioritize regulatory risk assessment before finalizing GTM strategy.' },
                    { title: 'Regulatory Deep Dive - Singapore', date: 'Oct 12, 2023', duration: '60 min', participants: 3, aiSummary: 'Discussed implications of the new PDPA amendments. Legal team advises a localized data center approach to mitigate cross-border transfer risks.' },
                    { title: 'Competitor Landscape Review', date: 'Oct 20, 2023', duration: '30 min', participants: 5, aiSummary: 'Reviewed top 3 regional competitors. Identified a gap in enterprise-grade security offerings that we can exploit in our messaging.' },
                  ].map((meeting, i) => (
                    <div key={i} className="border border-border-light rounded-lg p-4 hover:border-interaction-primary/50 transition-colors cursor-pointer group">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center space-x-2">
                          <FileAudio className="h-5 w-5 text-gray-400 group-hover:text-interaction-primary transition-colors" />
                          <h4 className="font-semibold text-text-main">{meeting.title}</h4>
                        </div>
                        <span className="text-xs text-text-muted">{meeting.date}</span>
                      </div>
                      <div className="flex items-center space-x-4 text-xs text-text-muted mb-3">
                        <span className="flex items-center"><Clock className="h-3 w-3 mr-1" /> {meeting.duration}</span>
                        <span className="flex items-center"><Users className="h-3 w-3 mr-1" /> {meeting.participants} Participants</span>
                      </div>
                      <div className="bg-interaction-primary/5 rounded p-3 border border-interaction-primary/10">
                        <div className="flex items-center mb-1">
                          <BrainCircuit className="h-3 w-3 text-interaction-primary mr-1.5" />
                          <span className="text-xs font-semibold text-interaction-primary">AI Summary</span>
                        </div>
                        <p className="text-sm text-text-main">{meeting.aiSummary}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </Card>
        </div>

        {/* Right Column: Discussion & Activity */}
        <div className="lg:col-span-1 flex flex-col h-full">
          <Card className="flex-1 flex flex-col overflow-hidden bg-white border-border-light shadow-sm">
            <CardHeader className="pb-3 border-b border-border-light bg-gray-50">
              <CardTitle className="text-lg flex items-center">
                <MessageSquare className="mr-2 h-5 w-5 text-gray-400" />
                Discussion
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 p-0 flex flex-col overflow-hidden">
              <div className="flex-1 p-4 overflow-y-auto custom-scrollbar space-y-4">
                {/* Messages */}
                <div className="flex items-start space-x-3">
                  <img src="https://picsum.photos/seed/marcus/100/100" alt="Marcus" className="w-8 h-8 rounded-full" referrerPolicy="no-referrer" />
                  <div className="bg-gray-50 rounded-lg p-3 rounded-tl-none border border-border-light">
                    <p className="text-xs font-semibold text-interaction-primary mb-1">Marcus Chen <span className="text-gray-400 font-normal ml-2">10:42 AM</span></p>
                    <p className="text-sm text-text-main">I've uploaded the initial draft of the risk matrix. Please review the section on data sovereignty.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 flex-row-reverse space-x-reverse">
                  <div className="w-8 h-8 rounded-full bg-ai-cyan flex items-center justify-center text-white font-bold text-xs">
                    YOU
                  </div>
                  <div className="bg-interaction-primary/5 rounded-lg p-3 rounded-tr-none border border-interaction-primary/20">
                    <p className="text-xs font-semibold text-ai-cyan mb-1">You <span className="text-gray-400 font-normal ml-2">11:15 AM</span></p>
                    <p className="text-sm text-text-main">Looking at it now. The AI suggestion regarding federated architecture seems promising. Can we explore the cost implications?</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-full bg-interaction-primary/10 flex items-center justify-center">
                    <BrainCircuit className="h-4 w-4 text-interaction-primary" />
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3 rounded-tl-none border border-interaction-primary/20">
                    <p className="text-xs font-semibold text-interaction-primary mb-1">Matrix AI <span className="text-gray-400 font-normal ml-2">11:16 AM</span></p>
                    <p className="text-sm text-text-main">I can generate a comparative cost analysis between centralized and federated architectures for the APAC region. Would you like me to draft this?</p>
                    <div className="mt-2 flex space-x-2">
                      <Button variant="secondary" size="sm" className="h-6 text-[10px] px-2 bg-white">Yes, generate analysis</Button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-4 border-t border-border-light bg-gray-50">
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Type a message or ask AI..." 
                    className="w-full bg-white border border-border-light rounded-full pl-4 pr-10 py-2 text-sm text-text-main focus:outline-none focus:border-interaction-primary"
                  />
                  <button className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-gray-400 hover:text-interaction-primary transition-colors">
                    <UploadCloud className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  );
}

function PlusIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19"></line>
      <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
  );
}
