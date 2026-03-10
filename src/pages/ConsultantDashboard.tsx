import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/src/components/ui/Card';
import { Badge } from '@/src/components/ui/Badge';
import { Button } from '@/src/components/ui/Button';
import { 
  Briefcase, 
  CheckCircle, 
  Clock, 
  Calendar, 
  FileText, 
  BrainCircuit, 
  Users, 
  ChevronRight, 
  MessageSquare, 
  Activity, 
  Target, 
  Zap, 
  Upload, 
  Network, 
  AlertTriangle,
  Wallet,
  ArrowUpRight,
  TrendingUp,
  History
} from 'lucide-react';
import { cn } from '@/src/utils/cn';
import { SystemDiagram } from '@/src/components/ui/SystemDiagram';

export default function ConsultantDashboard() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-12 max-w-7xl mx-auto"
    >
      {/* 1. Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-panel-border">
        <div>
          <h1 className="text-2xl md:text-3xl font-heading font-bold text-text-main">Consultant Workspace</h1>
          <p className="text-text-muted mt-2 text-sm md:text-base max-w-2xl">Manage engagements, analyze industry intelligence, and collaborate with clients.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="secondary" className="h-10 px-6 bg-white border-border-light text-text-main flex-1 sm:flex-none">
            <Wallet className="mr-2 h-4 w-4" />
            Payout Settings
          </Button>
          <Button variant="primary" className="h-10 px-6 flex-1 sm:flex-none">
            <BrainCircuit className="mr-2 h-4 w-4" />
            AI Strategy Assistant
          </Button>
        </div>
      </div>

      {/* 2. Earnings Overview */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h2 className="text-xl font-heading font-semibold text-text-main flex items-center">
            <Wallet className="h-5 w-5 mr-2 text-interaction-primary" />
            Earnings & Revenue
          </h2>
          <Badge className="bg-interaction-primary/10 text-interaction-primary border-none text-[10px] font-bold w-fit">
            85/15 Revenue Share Active
          </Badge>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          <Card className="border-panel-border shadow-sm bg-panel-bg">
            <CardContent className="p-6">
              <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest mb-1">Total Earnings</p>
              <div className="flex items-baseline gap-2">
                <h3 className="text-2xl font-bold text-text-main">$12,450</h3>
                <span className="text-[10px] text-alert-opportunity font-bold flex items-center">
                  <TrendingUp className="h-3 w-3 mr-0.5" /> +12%
                </span>
              </div>
              <p className="text-[10px] text-text-muted mt-1">Lifetime platform revenue</p>
            </CardContent>
          </Card>
          <Card className="border-panel-border shadow-sm bg-panel-bg">
            <CardContent className="p-6">
              <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest mb-1">Pending Payout</p>
              <h3 className="text-2xl font-bold text-text-main">$3,200</h3>
              <p className="text-[10px] text-text-muted mt-1">Next payout: March 15th</p>
            </CardContent>
          </Card>
          <Card className="border-panel-border shadow-sm bg-panel-bg">
            <CardContent className="p-6">
              <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest mb-1">Active Engagements</p>
              <h3 className="text-2xl font-bold text-text-main">4</h3>
              <p className="text-[10px] text-text-muted mt-1">Current billable projects</p>
            </CardContent>
          </Card>
          <Card className="border-panel-border shadow-sm bg-panel-bg">
            <CardContent className="p-6">
              <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest mb-1">Avg. Hourly Rate</p>
              <h3 className="text-2xl font-bold text-text-main">$285</h3>
              <p className="text-[10px] text-text-muted mt-1">Across all strategic domains</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 3. Signals Section */}
      <section className="space-y-6">
        <h2 className="text-xl font-heading font-semibold text-text-main flex items-center">
          <Activity className="h-5 w-5 mr-2 text-interaction-primary" />
          Signals
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="border-panel-border shadow-sm hover:shadow-md transition-shadow bg-panel-bg">
            <CardContent className="p-5 flex items-start space-x-4">
              <div className="h-10 w-10 rounded-lg bg-interaction-primary/10 flex items-center justify-center flex-shrink-0">
                <Briefcase className="h-5 w-5 text-interaction-primary" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-text-main mb-1">New Engagement Requests</h3>
                <p className="text-sm text-text-muted leading-relaxed">2 new match requests from enterprise clients in the APAC region.</p>
                <Link to="/consultant/requests" className="text-xs font-medium text-interaction-primary hover:underline mt-2 inline-block">Review Requests &rarr;</Link>
              </div>
            </CardContent>
          </Card>

          <Card className="border-panel-border shadow-sm hover:shadow-md transition-shadow bg-panel-bg">
            <CardContent className="p-5 flex items-start space-x-4">
              <div className="h-10 w-10 rounded-lg bg-amber-100 flex items-center justify-center flex-shrink-0">
                <FileText className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-text-main mb-1">Pending Deliverables</h3>
                <p className="text-sm text-text-muted leading-relaxed">"EU Regulatory Audit" draft is due for client review in 2 days.</p>
                <Link to="/enterprise/workspace" className="text-xs font-medium text-interaction-primary hover:underline mt-2 inline-block">Go to Workspace &rarr;</Link>
              </div>
            </CardContent>
          </Card>

          <Card className="border-panel-border shadow-sm hover:shadow-md transition-shadow bg-panel-bg">
            <CardContent className="p-5 flex items-start space-x-4">
              <div className="h-10 w-10 rounded-lg bg-alert-opportunity/10 flex items-center justify-center flex-shrink-0">
                <Calendar className="h-5 w-5 text-alert-opportunity" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-text-main mb-1">Upcoming Client Meetings</h3>
                <p className="text-sm text-text-muted leading-relaxed">Next strategy sync with Acme Corp at 2:00 PM today.</p>
                <Link to="/enterprise/workspace" className="text-xs font-medium text-interaction-primary hover:underline mt-2 inline-block">View Schedule &rarr;</Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 3. Insights Section */}
      <section className="space-y-6">
        <h2 className="text-xl font-heading font-semibold text-text-main flex items-center">
          <BrainCircuit className="h-5 w-5 mr-2 text-interaction-primary" />
          Insights
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="border-panel-border shadow-sm bg-panel-bg lg:col-span-1">
            <CardHeader className="pb-4 border-b border-panel-border p-5">
              <CardTitle className="text-lg flex items-center">
                <Network className="mr-2 h-5 w-5 text-interaction-primary" />
                Industry Intelligence Feed
              </CardTitle>
              <CardDescription>Curated signals relevant to your expertise.</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border-light">
                {[
                  { title: 'New EU AI Act Draft Published', time: '2h ago', type: 'Regulatory' },
                  { title: 'Supply Chain Disruptions in SEA', time: '5h ago', type: 'Operations' },
                  { title: 'Tech M&A Activity Spikes in Q3', time: '1d ago', type: 'Market' },
                ].map((item, i) => (
                  <div key={i} className="p-4 hover:bg-gray-50 transition-colors cursor-pointer">
                    <div className="flex items-center justify-between mb-1">
                      <Badge variant="secondary" className="text-[10px] bg-gray-100 text-text-muted border-panel-border font-medium">{item.type}</Badge>
                      <span className="text-xs text-text-muted">{item.time}</span>
                    </div>
                    <p className="text-sm font-semibold text-text-main">{item.title}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-panel-border shadow-sm bg-panel-bg lg:col-span-1">
            <CardHeader className="pb-4 border-b border-panel-border p-5">
              <CardTitle className="text-lg flex items-center">
                <BrainCircuit className="mr-2 h-5 w-5 text-interaction-primary" />
                AI Strategy Suggestions
              </CardTitle>
              <CardDescription>Automated recommendations for active projects.</CardDescription>
            </CardHeader>
            <CardContent className="p-5 space-y-4">
              <div className="p-4 rounded-lg bg-interaction-primary/5 border border-interaction-primary/20">
                <h4 className="text-sm font-bold text-text-main mb-2 flex items-center">
                  <Zap className="h-4 w-4 mr-2 text-interaction-primary" />
                  Framework Recommendation
                </h4>
                <p className="text-sm text-text-muted leading-relaxed">
                  Based on Acme Corp's recent filings, consider applying the "McKinsey 7S Framework" to their upcoming digital transformation initiative to ensure organizational alignment.
                </p>
              </div>
              <Button variant="secondary" className="w-full bg-panel-bg border-panel-border shadow-sm">
                Generate Framework Outline
              </Button>
            </CardContent>
          </Card>

          <Card className="border-panel-border shadow-sm bg-panel-bg lg:col-span-1">
            <CardHeader className="pb-4 border-b border-panel-border p-5">
              <CardTitle className="text-lg flex items-center">
                <Target className="mr-2 h-5 w-5 text-interaction-primary" />
                Client Context Insights
              </CardTitle>
              <CardDescription>Key data points for your current engagements.</CardDescription>
            </CardHeader>
            <CardContent className="p-5">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-panel-border">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-panel-bg border border-panel-border flex items-center justify-center text-xs font-bold text-text-main">
                      AC
                    </div>
                    <div>
                      <p className="text-sm font-bold text-text-main">Acme Corp</p>
                      <p className="text-xs text-text-muted">High risk tolerance • Growth focus</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-panel-border">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-panel-bg border border-panel-border flex items-center justify-center text-xs font-bold text-text-main">
                      GI
                    </div>
                    <div>
                      <p className="text-sm font-bold text-text-main">Globex Inc</p>
                      <p className="text-xs text-text-muted">Compliance driven • Cost sensitive</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Collaboration Network */}
      <section className="space-y-6">
        <h2 className="text-xl font-heading font-semibold text-text-main flex items-center">
          <Users className="h-5 w-5 mr-2 text-interaction-primary" />
          Collaboration Network
        </h2>
        <Card className="border-panel-border shadow-sm bg-panel-bg overflow-hidden">
          <CardHeader className="pb-4 border-b border-panel-border p-5">
            <CardTitle className="text-lg">Expert-AI Synergy</CardTitle>
            <CardDescription>Visualizing how consultants and AI agents collaborate on client strategies.</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <SystemDiagram type="consultant-collaboration" className="border-none rounded-none aspect-video md:aspect-[21/9]" />
          </CardContent>
        </Card>
      </section>

      {/* 4. Actions Section */}
      <section className="space-y-6">
        <h2 className="text-xl font-heading font-semibold text-text-main flex items-center">
          <Zap className="h-5 w-5 mr-2 text-interaction-primary" />
          Actions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="border-panel-border shadow-sm hover:shadow-md transition-shadow bg-panel-bg cursor-pointer group">
            <Link to="/enterprise/workspace">
              <CardContent className="p-5 flex flex-col items-center text-center h-full justify-center">
                <div className="h-12 w-12 rounded-full bg-interaction-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Upload className="h-6 w-6 text-interaction-primary" />
                </div>
                <h3 className="text-base font-bold text-text-main mb-2">Upload Deliverable</h3>
                <p className="text-sm text-text-muted">Submit documents or frameworks to a client workspace.</p>
              </CardContent>
            </Link>
          </Card>

          <Card className="border-panel-border shadow-sm hover:shadow-md transition-shadow bg-panel-bg cursor-pointer group">
            <Link to="/enterprise/workspace">
              <CardContent className="p-5 flex flex-col items-center text-center h-full justify-center">
                <div className="h-12 w-12 rounded-full bg-ai-cyan/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Calendar className="h-6 w-6 text-ai-cyan" />
                </div>
                <h3 className="text-base font-bold text-text-main mb-2">Schedule Client Meeting</h3>
                <p className="text-sm text-text-muted">Propose times for strategy sessions or reviews.</p>
              </CardContent>
            </Link>
          </Card>

          <Card className="border-panel-border shadow-sm hover:shadow-md transition-shadow bg-panel-bg cursor-pointer group">
            <Link to="/consultants">
              <CardContent className="p-5 flex flex-col items-center text-center h-full justify-center">
                <div className="h-12 w-12 rounded-full bg-alert-opportunity/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Users className="h-6 w-6 text-alert-opportunity" />
                </div>
                <h3 className="text-base font-bold text-text-main mb-2">Collaborate with Consultant</h3>
                <p className="text-sm text-text-muted">Find experts to partner with on complex engagements.</p>
              </CardContent>
            </Link>
          </Card>
        </div>
      </section>
    </motion.div>
  );
}
