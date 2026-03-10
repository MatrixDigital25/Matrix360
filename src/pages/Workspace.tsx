import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/src/components/ui/Card';
import { Badge } from '@/src/components/ui/Badge';
import { Button } from '@/src/components/ui/Button';
import { 
  FileText, 
  CheckSquare, 
  MessageSquare, 
  Users, 
  Clock, 
  Plus, 
  MoreHorizontal, 
  Search, 
  Filter,
  LayoutGrid,
  List,
  Calendar,
  Sparkles,
  ChevronRight,
  ArrowUpRight,
  Settings,
  Share2,
  Download
} from 'lucide-react';
import { cn } from '@/src/utils/cn';

const TASKS = [
  { id: 1, title: 'Market Regulatory Analysis', status: 'In Progress', priority: 'High', assignee: 'Sarah J.', deadline: 'Oct 15' },
  { id: 2, title: 'Supply Chain Mapping', status: 'Completed', priority: 'Medium', assignee: 'Marcus C.', deadline: 'Oct 10' },
  { id: 3, title: 'Competitor Benchmarking', status: 'Todo', priority: 'High', assignee: 'Wei Z.', deadline: 'Oct 20' },
  { id: 4, title: 'Risk Assessment Framework', status: 'Todo', priority: 'Low', assignee: 'Sarah J.', deadline: 'Oct 25' },
];

const DOCUMENTS = [
  { id: 1, name: 'APAC_Strategy_Draft_v2.pdf', type: 'PDF', size: '2.4 MB', updated: '2h ago' },
  { id: 2, name: 'Market_Entry_Financials.xlsx', type: 'XLSX', size: '1.1 MB', updated: '5h ago' },
  { id: 3, name: 'Regulatory_Compliance_Checklist.docx', type: 'DOCX', size: '850 KB', updated: '1d ago' },
];

const THREADS = [
  { id: 1, title: 'Regulatory classification for AI systems', author: 'Dr. Sarah Jenkins', replies: 12, lastActive: '10m ago' },
  { id: 2, title: 'Logistics partnership options in Vietnam', author: 'Marcus Chen', replies: 5, lastActive: '2h ago' },
];

const TRANSCRIPTS = [
  { id: 1, title: 'Strategy Sync: Project Alpha', date: 'Oct 12, 2023', duration: '45m', summary: 'Discussed regulatory hurdles and supply chain mapping.' },
  { id: 2, title: 'AI Integration Workshop', date: 'Oct 10, 2023', duration: '60m', summary: 'Explored efficiency gains through automated procurement.' },
];

export default function Workspace() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="space-y-6">
      {/* Workspace Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-panel-border pb-6">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-xl bg-interaction-primary/10 flex items-center justify-center border border-interaction-primary/20">
            <LayoutGrid className="h-6 w-6 text-interaction-primary" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-2xl font-heading font-bold text-text-main">APAC Market Entry Strategy</h1>
              <Badge variant="secondary" className="bg-interaction-primary/10 text-interaction-primary border-none text-[10px]">Active</Badge>
            </div>
            <p className="text-text-muted text-sm">Fintech Global Ltd. • Strategic Consulting Engagement</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm" className="h-9">
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
          <Button variant="secondary" size="sm" className="h-9">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
          <Button variant="primary" size="sm" className="h-9">
            <Plus className="h-4 w-4 mr-2" />
            New Action
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-6 border-b border-panel-border">
        {['Overview', 'Tasks', 'Documents', 'Discussions', 'Transcripts', 'Intelligence', 'Team'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab.toLowerCase())}
            className={cn(
              "pb-3 text-sm font-medium transition-all relative",
              activeTab === tab.toLowerCase() ? "text-interaction-primary" : "text-text-muted hover:text-text-main"
            )}
          >
            {tab}
            {activeTab === tab.toLowerCase() && (
              <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-interaction-primary" />
            )}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-6">
          {activeTab === 'overview' && (
            <>
              {/* Project Summary Card */}
              <Card className="border-panel-border bg-panel-bg shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-bold flex items-center">
                    <Sparkles className="h-4 w-4 mr-2 text-ai-violet" />
                    AI Executive Summary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-text-main leading-relaxed">
                    The APAC market entry strategy is currently in the <strong>Regulatory Analysis phase</strong>. We have identified three key compliance hurdles in the Singapore market. The supply chain mapping is complete, showing a 15% potential efficiency gain through local partnerships. Next milestone: Competitor Benchmarking (Due in 4 days).
                  </p>
                  <div className="mt-4 flex items-center gap-4">
                    <div className="flex-1">
                      <div className="flex justify-between text-[10px] font-bold text-text-muted mb-1 uppercase">
                        <span>Overall Progress</span>
                        <span>75%</span>
                      </div>
                      <div className="h-1.5 w-full bg-secondary-bg rounded-full overflow-hidden border border-panel-border">
                        <div className="h-full bg-interaction-primary" style={{ width: '75%' }} />
                      </div>
                    </div>
                    <Button variant="secondary" size="sm" className="h-8 text-[10px]">View Roadmap</Button>
                  </div>
                </CardContent>
              </Card>

              {/* Tasks Section */}
              <section className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-text-main flex items-center">
                    <CheckSquare className="h-4 w-4 mr-2 text-interaction-primary" />
                    Active Tasks
                  </h3>
                  <Button variant="secondary" size="sm" className="h-8 text-[10px]">View All</Button>
                </div>
                <div className="grid grid-cols-1 gap-3">
                  {TASKS.map((task) => (
                    <div key={task.id} className="p-3 bg-panel-bg border border-panel-border rounded-xl hover:border-interaction-primary/30 transition-all group flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={cn(
                          "h-2 w-2 rounded-full",
                          task.status === 'Completed' ? "bg-alert-opportunity" : task.status === 'In Progress' ? "bg-interaction-primary" : "bg-text-muted"
                        )} />
                        <div>
                          <p className="text-xs font-bold text-text-main group-hover:text-interaction-primary transition-colors">{task.title}</p>
                          <div className="flex items-center gap-3 mt-1">
                            <span className="text-[10px] text-text-muted flex items-center">
                              <Users className="h-3 w-3 mr-1" />
                              {task.assignee}
                            </span>
                            <span className="text-[10px] text-text-muted flex items-center">
                              <Calendar className="h-3 w-3 mr-1" />
                              {task.deadline}
                            </span>
                          </div>
                        </div>
                      </div>
                      <Badge variant="secondary" className={cn(
                        "text-[8px] uppercase tracking-wider",
                        task.priority === 'High' ? "bg-alert-risk/10 text-alert-risk" : "bg-secondary-bg text-text-muted"
                      )}>
                        {task.priority}
                      </Badge>
                    </div>
                  ))}
                </div>
              </section>
            </>
          )}

          {activeTab === 'discussions' && (
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-text-main flex items-center">
                  <MessageSquare className="h-4 w-4 mr-2 text-interaction-primary" />
                  Discussion Threads
                </h3>
                <Button variant="primary" size="sm" className="h-8 text-[10px]">New Thread</Button>
              </div>
              <div className="space-y-3">
                {THREADS.map((thread) => (
                  <div key={thread.id} className="p-4 bg-white border border-border-light rounded-xl hover:shadow-sm transition-all cursor-pointer group">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-sm font-bold text-text-main group-hover:text-interaction-primary transition-colors">{thread.title}</h4>
                      <span className="text-[10px] text-text-muted">{thread.lastActive}</span>
                    </div>
                    <div className="flex items-center gap-4 text-[10px] text-text-muted">
                      <span className="font-bold text-interaction-primary uppercase tracking-wider">{thread.author}</span>
                      <span className="flex items-center"><MessageSquare className="h-3 w-3 mr-1" /> {thread.replies} replies</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {activeTab === 'transcripts' && (
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-text-main flex items-center">
                  <FileText className="h-4 w-4 mr-2 text-interaction-primary" />
                  Meeting Transcripts
                </h3>
              </div>
              <div className="space-y-3">
                {TRANSCRIPTS.map((transcript) => (
                  <div key={transcript.id} className="p-4 bg-white border border-border-light rounded-xl hover:shadow-sm transition-all cursor-pointer">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-sm font-bold text-text-main">{transcript.title}</h4>
                      <Badge variant="secondary" className="bg-secondary-bg text-text-muted text-[9px]">{transcript.duration}</Badge>
                    </div>
                    <p className="text-xs text-text-muted mb-3 leading-relaxed">{transcript.summary}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-text-muted font-bold uppercase tracking-wider">{transcript.date}</span>
                      <Button variant="text" className="h-7 px-2 text-[10px] text-interaction-primary">View Transcript</Button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Right Sidebar Area */}
        <div className="space-y-6">
          {/* Documents Section */}
          <Card className="border-panel-border bg-panel-bg shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-bold flex items-center">
                <FileText className="h-4 w-4 mr-2 text-interaction-primary" />
                Project Assets
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {DOCUMENTS.map((doc) => (
                <div key={doc.id} className="p-2 rounded-lg hover:bg-secondary-bg transition-all group cursor-pointer border border-transparent hover:border-panel-border">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-[11px] font-bold text-text-main truncate group-hover:text-interaction-primary transition-colors">{doc.name}</p>
                    <Download className="h-3 w-3 text-text-muted group-hover:text-interaction-primary" />
                  </div>
                  <div className="flex items-center justify-between text-[9px] text-text-muted">
                    <span>{doc.type} • {doc.size}</span>
                    <span>{doc.updated}</span>
                  </div>
                </div>
              ))}
              <Button variant="secondary" size="sm" className="w-full h-8 text-[10px] mt-2">
                <Plus className="h-3 w-3 mr-2" />
                Upload Asset
              </Button>
            </CardContent>
          </Card>

          {/* Team Section */}
          <Card className="border-panel-border bg-panel-bg shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-bold flex items-center">
                <Users className="h-4 w-4 mr-2 text-interaction-primary" />
                Strategic Team
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { name: 'Sarah Jenkins', role: 'Lead Strategist', img: 'https://picsum.photos/seed/sarah/100/100' },
                { name: 'Marcus Chen', role: 'APAC Expert', img: 'https://picsum.photos/seed/marcus/100/100' },
                { name: 'Wei Zhang', role: 'Operations', img: 'https://picsum.photos/seed/wei/100/100' }
              ].map((member, i) => (
                <div key={i} className="flex items-center gap-3">
                  <img src={member.img} alt={member.name} className="h-8 w-8 rounded-full object-cover border border-panel-border" referrerPolicy="no-referrer" />
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] font-bold text-text-main truncate">{member.name}</p>
                    <p className="text-[9px] text-text-muted truncate">{member.role}</p>
                  </div>
                  <MessageSquare className="h-3 w-3 text-text-muted hover:text-interaction-primary cursor-pointer" />
                </div>
              ))}
              <Button variant="secondary" size="sm" className="w-full h-8 text-[10px] mt-2">
                <Plus className="h-3 w-3 mr-2" />
                Add Member
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
