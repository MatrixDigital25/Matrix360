import React from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/src/components/ui/Card';
import { Badge } from '@/src/components/ui/Badge';
import { Button } from '@/src/components/ui/Button';
import { Target, Activity, Users, PlusCircle, ArrowRight, BrainCircuit, BarChart3, AlertTriangle, CheckCircle2, Briefcase, ChevronRight, Shield, Globe, Calendar, Zap, Network, LayoutDashboard } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/src/utils/cn';
import { BarChart } from '@/src/components/ui/Charts';

export default function EnterpriseDashboard() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8 max-w-7xl mx-auto"
    >
      {/* 1. Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-panel-border">
        <div>
          <h1 className="text-3xl font-heading font-bold text-text-main">Strategic Intelligence Dashboard</h1>
          <p className="text-text-muted mt-2 text-base">Monitor strategic signals, gather insights, and execute initiatives.</p>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/enterprise/challenge">
            <Button variant="primary" className="h-10 px-6">
              <PlusCircle className="mr-2 h-4 w-4" />
              Submit New Strategic Challenge
            </Button>
          </Link>
        </div>
      </div>

      {/* 2. Signals Section */}
      <section className="space-y-4">
        <h2 className="text-xl font-heading font-semibold text-text-main flex items-center">
          <Activity className="h-5 w-5 mr-2 text-interaction-primary" />
          Signals
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <Card className="border-panel-border shadow-sm hover:shadow-md transition-shadow bg-panel-bg">
            <CardContent className="p-5">
              <div className="flex items-start space-x-4">
                <div className="h-10 w-10 rounded-lg bg-interaction-primary/10 flex items-center justify-center flex-shrink-0">
                  <Target className="h-5 w-5 text-interaction-primary" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-text-main mb-1">Active Strategic Challenges</h3>
                  <p className="text-sm text-text-muted leading-relaxed">2 challenges currently seeking expert alignment. 1 challenge in active scoping.</p>
                  <Link to="/enterprise/challenge" className="text-xs font-medium text-interaction-primary hover:underline mt-2 inline-block">View Challenges &rarr;</Link>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-panel-border shadow-sm hover:shadow-md transition-shadow bg-panel-bg">
            <CardContent className="p-5">
              <div className="flex items-start space-x-4">
                <div className="h-10 w-10 rounded-lg bg-alert-opportunity/10 flex items-center justify-center flex-shrink-0">
                  <Users className="h-5 w-5 text-alert-opportunity" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-text-main mb-1">Consultant Match Alerts</h3>
                  <p className="text-sm text-text-muted leading-relaxed">3 new high-confidence expert matches found for "APAC Market Entry".</p>
                  <Link to="/enterprise/match" className="text-xs font-medium text-interaction-primary hover:underline mt-2 inline-block">Review Matches &rarr;</Link>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-panel-border shadow-sm hover:shadow-md transition-shadow bg-panel-bg">
            <CardContent className="p-5">
              <div className="flex items-start space-x-4">
                <div className="h-10 w-10 rounded-lg bg-amber-100 flex items-center justify-center flex-shrink-0">
                  <Calendar className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-text-main mb-1">Upcoming Strategy Sessions</h3>
                  <p className="text-sm text-text-muted leading-relaxed">Next milestone review with Marcus Chen scheduled for tomorrow at 10 AM.</p>
                  <Link to="/enterprise/workspace" className="text-xs font-medium text-interaction-primary hover:underline mt-2 inline-block">View Schedule &rarr;</Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 3. Insights Section */}
      <section className="space-y-4">
        <h2 className="text-xl font-heading font-semibold text-text-main flex items-center">
          <BrainCircuit className="h-5 w-5 mr-2 text-interaction-primary" />
          Insights
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <Card className="border-panel-border shadow-sm bg-panel-bg lg:col-span-1">
            <CardHeader className="pb-4 border-b border-panel-border">
              <CardTitle className="text-lg flex items-center">
                <Globe className="mr-2 h-5 w-5 text-interaction-primary" />
                Industry Radar
              </CardTitle>
              <CardDescription>Real-time signals and competitor movements.</CardDescription>
            </CardHeader>
            <CardContent className="p-5 space-y-4">
              <div className="p-4 rounded-lg bg-gray-50 border border-panel-border">
                <h4 className="text-sm font-bold text-text-main mb-2 flex items-center">
                  <AlertTriangle className="h-4 w-4 mr-2 text-amber-600" />
                  Regulatory Shift Detected
                </h4>
                <p className="text-sm text-text-muted leading-relaxed">
                  Recent policy drafts in the EU suggest stricter compliance requirements for cross-border data transfers by Q3.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-gray-50 border border-panel-border">
                <h4 className="text-sm font-bold text-text-main mb-2 flex items-center">
                  <Activity className="h-4 w-4 mr-2 text-interaction-primary" />
                  Competitor Activity
                </h4>
                <p className="text-sm text-text-muted leading-relaxed">
                  Competitor activity in Singapore has increased by 15% this quarter.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-panel-border shadow-sm bg-panel-bg lg:col-span-1">
            <CardHeader className="pb-4 border-b border-panel-border">
              <CardTitle className="text-lg flex items-center">
                <Network className="mr-2 h-5 w-5 text-interaction-primary" />
                Stakeholder Intelligence Map
              </CardTitle>
              <CardDescription>Key influencers and decision-makers.</CardDescription>
            </CardHeader>
            <CardContent className="p-5 space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-panel-border">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-interaction-primary/10 flex items-center justify-center text-xs font-bold text-interaction-primary">
                    CEO
                  </div>
                  <div>
                    <p className="text-sm font-bold text-text-main">High Influence</p>
                    <p className="text-xs text-text-muted">Requires weekly updates</p>
                  </div>
                </div>
                <Badge variant="green">Aligned</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-panel-border">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-alert-risk/10 flex items-center justify-center text-xs font-bold text-alert-risk">
                    REG
                  </div>
                  <div>
                    <p className="text-sm font-bold text-text-main">Regulators</p>
                    <p className="text-xs text-text-muted">Critical blocker</p>
                  </div>
                </div>
                <Badge variant="amber">Monitoring</Badge>
              </div>
              <Link to="/enterprise/workspace">
                <Button variant="secondary" className="w-full bg-panel-bg border-panel-border shadow-sm mt-2">
                  View Full Map
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="border-panel-border shadow-sm bg-panel-bg lg:col-span-1">
            <CardHeader className="pb-4 border-b border-panel-border">
              <CardTitle className="text-lg flex items-center">
                <BrainCircuit className="mr-2 h-5 w-5 text-interaction-primary" />
                AI Strategy Insights
              </CardTitle>
              <CardDescription>Automated intelligence briefings.</CardDescription>
            </CardHeader>
            <CardContent className="p-5 space-y-4">
              <div className="p-4 rounded-lg bg-interaction-primary/5 border border-interaction-primary/20">
                <h4 className="text-sm font-bold text-text-main mb-2 flex items-center">
                  <Zap className="h-4 w-4 mr-2 text-interaction-primary" />
                  Strategic Recommendation
                </h4>
                <p className="text-sm text-text-muted leading-relaxed">
                  Based on the APAC Market Entry challenge, consider accelerating the timeline for the initial market assessment deliverable to preempt competitor moves.
                </p>
              </div>
              <Button variant="secondary" className="w-full bg-panel-bg border-panel-border shadow-sm">
                Generate Full Brief
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 4. Actions Section */}
      <section className="space-y-4">
        <h2 className="text-xl font-heading font-semibold text-text-main flex items-center">
          <Zap className="h-5 w-5 mr-2 text-interaction-primary" />
          Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <Card className="border-panel-border shadow-sm hover:shadow-md transition-shadow bg-panel-bg cursor-pointer group">
            <Link to="/enterprise/challenge">
              <CardContent className="p-6 flex flex-col items-center text-center h-full justify-center">
                <div className="h-12 w-12 rounded-full bg-interaction-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <PlusCircle className="h-6 w-6 text-interaction-primary" />
                </div>
                <h3 className="text-base font-bold text-text-main mb-2">Submit Strategic Challenge</h3>
                <p className="text-sm text-text-muted">Define a new objective and find expert matches.</p>
              </CardContent>
            </Link>
          </Card>

          <Card className="border-panel-border shadow-sm hover:shadow-md transition-shadow bg-panel-bg cursor-pointer group">
            <Link to="/enterprise/match">
              <CardContent className="p-6 flex flex-col items-center text-center h-full justify-center">
                <div className="h-12 w-12 rounded-full bg-ai-cyan/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Calendar className="h-6 w-6 text-ai-cyan" />
                </div>
                <h3 className="text-base font-bold text-text-main mb-2">Schedule Consultation</h3>
                <p className="text-sm text-text-muted">Book an introductory session with a matched advisor.</p>
              </CardContent>
            </Link>
          </Card>

          <Card className="border-panel-border shadow-sm hover:shadow-md transition-shadow bg-panel-bg cursor-pointer group">
            <Link to="/enterprise/workspace">
              <CardContent className="p-6 flex flex-col items-center text-center h-full justify-center">
                <div className="h-12 w-12 rounded-full bg-alert-opportunity/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Zap className="h-6 w-6 text-alert-opportunity" />
                </div>
                <h3 className="text-base font-bold text-text-main mb-2">Launch Strategic Initiative</h3>
                <p className="text-sm text-text-muted">Open a collaborative workspace to begin execution.</p>
              </CardContent>
            </Link>
          </Card>
        </div>
      </section>
    </motion.div>
  );
}
