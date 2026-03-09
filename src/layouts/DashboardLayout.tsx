import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { 
  Search, Bell, User, 
  LayoutDashboard, Briefcase, Users, 
  FileText, MessageSquare, Settings,
  BrainCircuit, Activity, Target,
  ChevronRight, Home, Lightbulb, Compass, Play, BookOpen, Layers,
  X, Sparkles, LineChart, FileSearch
} from 'lucide-react';
import { cn } from '@/src/utils/cn';
import { Button } from '@/src/components/ui/Button';
import { motion, AnimatePresence } from 'motion/react';

interface NavItem {
  title: string;
  href: string;
  icon: React.ElementType;
}

const sidebarNav: NavItem[] = [
  { title: 'Home', href: '/enterprise', icon: Home },
  { title: 'Intelligence', href: '/enterprise/intelligence', icon: Lightbulb },
  { title: 'Strategy', href: '/enterprise/strategy', icon: Compass },
  { title: 'Execution', href: '/enterprise/execution', icon: Play },
  { title: 'Knowledge', href: '/enterprise/knowledge', icon: BookOpen },
  { title: 'Platform', href: '/enterprise/platform', icon: Layers },
];

const LOGO_URL = "/Matrix360.png";

export function DashboardLayout({ type }: { type: 'consultant' | 'enterprise' }) {
  const location = useLocation();
  const [isAIAssistantOpen, setIsAIAssistantOpen] = useState(false);
  // Using the same sidebar nav for both for now to match the design system request
  const navItems = sidebarNav;

  return (
    <div className="min-h-screen flex flex-col bg-secondary-bg text-text-main">
      {/* Top Navigation Bar */}
      <header className="h-16 border-b border-border-light bg-primary-bg flex items-center justify-between px-6 sticky top-0 z-50">
        <div className="flex items-center gap-8 w-64">
          <Link to="/" className="flex items-center space-x-2 text-text-main">
            <img src={LOGO_URL} alt="Matrix360 Consulting" className="h-10 w-auto" />
          </Link>
        </div>

        <div className="flex flex-1 items-center max-w-2xl px-8">
          <div className="w-full relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search intelligence, experts, or strategies..." 
              className="w-full bg-secondary-bg border border-border-light rounded-md pl-10 pr-4 py-2 text-sm text-text-main focus:outline-none focus:ring-1 focus:ring-interaction-primary focus:border-interaction-primary transition-all"
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <Button 
            variant="text" 
            size="sm" 
            className="hidden md:flex items-center text-interaction-primary hover:bg-interaction-primary/5"
            onClick={() => setIsAIAssistantOpen(true)}
          >
            <BrainCircuit className="h-4 w-4 mr-2" />
            AI Assistant
          </Button>
          <button className="relative p-2 text-gray-400 hover:text-text-main transition-colors rounded-full hover:bg-gray-100">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-alert-risk"></span>
          </button>
          <div className="h-8 w-8 rounded-full bg-gray-100 border border-border-light flex items-center justify-center overflow-hidden cursor-pointer hover:border-interaction-primary transition-colors">
            <User className="h-5 w-5 text-gray-500" />
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden relative">
        {/* Sidebar Navigation */}
        <aside className="w-64 border-r border-border-light bg-secondary-bg flex flex-col hidden md:flex overflow-y-auto">
          <div className="px-4 py-6">
            <div className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-4 px-3">
              {type === 'consultant' ? 'Consultant Portal' : 'Enterprise Portal'}
            </div>
            <nav className="space-y-1">
              {navItems.map((item) => {
                const isActive = location.pathname === item.href || location.pathname.startsWith(item.href + '/');
                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={cn(
                      'flex items-center px-3 py-2.5 text-sm font-medium rounded-md transition-colors group',
                      isActive 
                        ? 'bg-interaction-primary/10 text-interaction-primary' 
                        : 'text-text-muted hover:bg-gray-100 hover:text-text-main'
                    )}
                  >
                    <item.icon className={cn('mr-3 h-5 w-5 flex-shrink-0', isActive ? 'text-interaction-primary' : 'text-gray-400 group-hover:text-gray-600')} />
                    {item.title}
                  </Link>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-secondary-bg p-8">
          <Outlet />
        </main>

        {/* AI Intelligence Module Overlay */}
        <AnimatePresence>
          {isAIAssistantOpen && (
            <>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsAIAssistantOpen(false)}
                className="absolute inset-0 bg-black/20 z-40 backdrop-blur-sm"
              />
              <motion.div 
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="absolute top-0 right-0 h-full w-96 bg-white border-l border-border-light shadow-2xl z-50 flex flex-col"
              >
                <div className="p-4 border-b border-border-light flex items-center justify-between bg-gray-50">
                  <div className="flex items-center space-x-2">
                    <BrainCircuit className="h-5 w-5 text-interaction-primary" />
                    <h2 className="font-heading font-bold text-text-main">Matrix AI Assistant</h2>
                  </div>
                  <button onClick={() => setIsAIAssistantOpen(false)} className="p-1 text-gray-400 hover:text-text-main rounded-full hover:bg-gray-200 transition-colors">
                    <X className="h-5 w-5" />
                  </button>
                </div>
                
                <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar">
                  <div className="space-y-2">
                    <p className="text-sm text-text-muted">How can I assist with your strategic intelligence today?</p>
                  </div>

                  <div className="grid grid-cols-1 gap-3">
                    <button className="flex items-start p-3 rounded-lg border border-border-light hover:border-interaction-primary/50 hover:bg-interaction-primary/5 transition-colors text-left group">
                      <LineChart className="h-5 w-5 text-interaction-primary mt-0.5 mr-3 flex-shrink-0 group-hover:scale-110 transition-transform" />
                      <div>
                        <p className="text-sm font-semibold text-text-main">Analyze Industry Signals</p>
                        <p className="text-xs text-text-muted mt-1">Scan recent market data for trends and anomalies.</p>
                      </div>
                    </button>
                    <button className="flex items-start p-3 rounded-lg border border-border-light hover:border-interaction-primary/50 hover:bg-interaction-primary/5 transition-colors text-left group">
                      <Sparkles className="h-5 w-5 text-amber-500 mt-0.5 mr-3 flex-shrink-0 group-hover:scale-110 transition-transform" />
                      <div>
                        <p className="text-sm font-semibold text-text-main">Generate Strategy Framework</p>
                        <p className="text-xs text-text-muted mt-1">Draft a custom framework based on your current challenge.</p>
                      </div>
                    </button>
                    <button className="flex items-start p-3 rounded-lg border border-border-light hover:border-interaction-primary/50 hover:bg-interaction-primary/5 transition-colors text-left group">
                      <Target className="h-5 w-5 text-alert-opportunity mt-0.5 mr-3 flex-shrink-0 group-hover:scale-110 transition-transform" />
                      <div>
                        <p className="text-sm font-semibold text-text-main">Create Stakeholder Map</p>
                        <p className="text-xs text-text-muted mt-1">Identify and map key influencers for your initiative.</p>
                      </div>
                    </button>
                    <button className="flex items-start p-3 rounded-lg border border-border-light hover:border-interaction-primary/50 hover:bg-interaction-primary/5 transition-colors text-left group">
                      <FileSearch className="h-5 w-5 text-ai-cyan mt-0.5 mr-3 flex-shrink-0 group-hover:scale-110 transition-transform" />
                      <div>
                        <p className="text-sm font-semibold text-text-main">Summarize Research</p>
                        <p className="text-xs text-text-muted mt-1">Extract key insights from uploaded documents.</p>
                      </div>
                    </button>
                  </div>

                  <div className="pt-4 border-t border-border-light">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 rounded-full bg-interaction-primary/10 flex items-center justify-center flex-shrink-0">
                        <BrainCircuit className="h-4 w-4 text-interaction-primary" />
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3 rounded-tl-none border border-border-light">
                        <p className="text-sm text-text-main">I've noticed you're looking at the APAC Market Entry strategy. Would you like me to pull the latest regulatory updates for Singapore and Indonesia?</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 border-t border-border-light bg-white">
                  <div className="relative">
                    <input 
                      type="text" 
                      placeholder="Ask Matrix AI..." 
                      className="w-full bg-gray-50 border border-border-light rounded-lg pl-4 pr-10 py-3 text-sm text-text-main focus:outline-none focus:border-interaction-primary focus:ring-1 focus:ring-interaction-primary"
                    />
                    <button className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-interaction-primary hover:bg-interaction-primary/10 rounded-md transition-colors">
                      <Sparkles className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
