import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { 
  Home, 
  Rss, 
  Users, 
  Target, 
  Briefcase, 
  BrainCircuit, 
  Cpu, 
  Video, 
  Network, 
  Settings,
  Search,
  Bell,
  User,
  Globe,
  ChevronRight,
  Sparkles,
  Menu,
  X
} from 'lucide-react';
import { cn } from '@/src/utils/cn';
import { motion, AnimatePresence } from 'motion/react';

const LOGO_URL = "/Matrix360 (23).png";

interface NavItem {
  title: string;
  href: string;
  icon: React.ElementType;
}

const mainNavItems: NavItem[] = [
  { title: 'Home', href: '/', icon: Home },
  { title: 'Intelligence Feed', href: '/feed', icon: Rss },
  { title: 'Consultant Network', href: '/consultants', icon: Users },
  { title: 'Strategic Domains', href: '/industries', icon: Globe },
  { title: 'Strategic Challenges', href: '/challenges', icon: Target },
  { title: 'Projects', href: '/projects', icon: Briefcase },
  { title: 'AI Agents', href: '/ai-agents', icon: BrainCircuit },
  { title: 'Automation Systems', href: '/automation', icon: Cpu },
  { title: 'Video Strategy Room', href: '/strategy-room', icon: Video },
  { title: 'Knowledge Graph', href: '/knowledge-graph', icon: Network },
  { title: 'Settings', href: '/settings', icon: Settings },
];

export function AppLayout() {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen overflow-hidden bg-white text-text-main font-sans">
      {/* Left Sidebar Navigation */}
      <aside 
        className={cn(
          "bg-brand-primary text-white flex flex-col transition-all duration-300 ease-in-out z-50",
          isSidebarOpen ? "w-64" : "w-20"
        )}
      >
        <div className="p-6 flex items-center justify-between">
          <Link to="/" className={cn("flex items-center gap-3 overflow-hidden transition-all", !isSidebarOpen && "opacity-0 w-0")}>
            <img src={LOGO_URL} alt="Matrix360" className="h-8 w-auto brightness-0 invert" />
            <span className="font-heading font-bold text-lg tracking-tight whitespace-nowrap">Matrix360</span>
          </Link>
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
          >
            {isSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* User Profile Summary */}
        <div className="px-4 mb-4">
          <div className={cn(
            "flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10",
            !isSidebarOpen && "justify-center px-0"
          )}>
            <div className="h-10 w-10 rounded-full bg-interaction-primary flex items-center justify-center text-sm font-bold shadow-lg border border-white/20 flex-shrink-0">
              JD
            </div>
            {isSidebarOpen && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold truncate">Jane Doe</p>
                <p className="text-[10px] text-white/40 font-medium uppercase tracking-wider truncate">Enterprise Admin</p>
              </div>
            )}
          </div>
        </div>

        <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto custom-scrollbar">
          {mainNavItems.map((item) => {
            const isActive = location.pathname === item.href || (item.href !== '/' && location.pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "flex items-center px-3 py-3 rounded-lg transition-all group relative",
                  isActive 
                    ? "bg-white/10 text-white" 
                    : "text-white/60 hover:text-white hover:bg-white/5"
                )}
              >
                <item.icon className={cn("h-5 w-5 flex-shrink-0", isActive ? "text-ai-cyan" : "group-hover:text-white")} />
                {isSidebarOpen && (
                  <span className="ml-3 font-medium text-sm whitespace-nowrap transition-all duration-300">
                    {item.title}
                  </span>
                )}
                {!isSidebarOpen && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-brand-primary text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50 shadow-xl">
                    {item.title}
                  </div>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10">
          <div className={cn("flex items-center gap-3 p-2 rounded-lg text-white/40 text-[10px] font-medium uppercase tracking-widest", !isSidebarOpen && "justify-center")}>
            {isSidebarOpen ? "© 2026 Matrix360" : "M360"}
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        {/* Top Bar */}
        <header className="h-16 border-b border-border-light bg-white flex items-center justify-between px-6 shrink-0">
          <div className="flex items-center flex-1 max-w-xl">
            <div className="relative w-full group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted group-focus-within:text-interaction-primary transition-colors" />
              <input 
                type="text" 
                placeholder="Search strategic intelligence, experts, or projects..." 
                className="w-full bg-secondary-bg border border-border-light rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-interaction-primary/20 focus:border-interaction-primary transition-all"
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button className="p-2 text-text-muted hover:text-interaction-primary hover:bg-interaction-primary/5 rounded-full transition-all relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-2 right-2 h-2 w-2 bg-alert-risk rounded-full border-2 border-white"></span>
            </button>
            <button className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-border-light hover:border-interaction-primary transition-all group">
              <Sparkles className="h-4 w-4 text-ai-violet group-hover:animate-pulse" />
              <span className="text-xs font-semibold text-text-secondary">AI Insights</span>
            </button>
            <div className="h-8 w-1px bg-border-light mx-2"></div>
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-bold text-text-main">Matrix Global</p>
                <p className="text-[10px] text-text-muted">Enterprise Account</p>
              </div>
              <div className="h-9 w-9 rounded-full bg-secondary-bg border border-border-light flex items-center justify-center text-text-muted hover:text-interaction-primary hover:border-interaction-primary transition-all cursor-pointer">
                <User className="h-5 w-5" />
              </div>
            </div>
          </div>
        </header>

        {/* Workspace Area */}
        <div className="flex flex-1 overflow-hidden">
          <main className="flex-1 overflow-y-auto bg-primary-bg custom-scrollbar">
            <div className="max-w-[1400px] mx-auto p-6 md:p-8">
              <Outlet />
            </div>
          </main>

          {/* Contextual Right Panel (Visible on large screens) */}
          <aside className="hidden xl:flex w-80 border-l border-border-light bg-white flex-col overflow-y-auto custom-scrollbar">
            <div className="p-6 space-y-8">
              {/* Contextual Insights Section */}
              <section>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xs font-bold text-text-muted uppercase tracking-wider">AI Intelligence Alerts</h3>
                  <Sparkles className="h-4 w-4 text-ai-violet" />
                </div>
                <div className="space-y-3">
                  {[
                    { title: 'Market Shift Detected', desc: 'APAC manufacturing signals 12% volatility increase.', type: 'risk' },
                    { title: 'Strategy Optimization', desc: 'New efficiency model available for Project Alpha.', type: 'opportunity' }
                  ].map((alert, i) => (
                    <div key={i} className={cn(
                      "p-3 rounded-lg border-l-4 text-xs",
                      alert.type === 'risk' ? "bg-alert-risk/5 border-alert-risk" : "bg-alert-opportunity/5 border-alert-opportunity"
                    )}>
                      <p className="font-bold text-text-main mb-1">{alert.title}</p>
                      <p className="text-text-secondary leading-relaxed">{alert.desc}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h3 className="text-xs font-bold text-text-muted uppercase tracking-wider mb-4">Recommended Experts</h3>
                <div className="space-y-4">
                  {[
                    { name: 'Dr. Sarah Chen', role: 'AI Strategy Expert', img: 'https://picsum.photos/seed/sarah/100/100' },
                    { name: 'Marcus Thorne', role: 'Operations Architect', img: 'https://picsum.photos/seed/marcus/100/100' }
                  ].map((expert, i) => (
                    <div key={i} className="flex items-center gap-3 group cursor-pointer">
                      <img src={expert.img} alt={expert.name} className="h-10 w-10 rounded-full object-cover border border-border-light group-hover:border-interaction-primary transition-all" referrerPolicy="no-referrer" />
                      <div>
                        <p className="text-sm font-bold text-text-main group-hover:text-interaction-primary transition-colors">{expert.name}</p>
                        <p className="text-[10px] text-text-muted">{expert.role}</p>
                      </div>
                      <ChevronRight className="h-4 w-4 text-text-muted ml-auto group-hover:text-interaction-primary transition-all" />
                    </div>
                  ))}
                </div>
                <button className="w-full mt-4 py-2 text-xs font-bold text-interaction-primary hover:bg-interaction-primary/5 rounded-lg transition-all">
                  View Full Network
                </button>
              </section>

              <section>
                <h3 className="text-xs font-bold text-text-muted uppercase tracking-wider mb-4">Upcoming Meetings</h3>
                <div className="space-y-3">
                  {[
                    { title: 'Strategy Sync: Project Alpha', time: 'Today, 2:00 PM', expert: 'Dr. Sarah Chen' },
                    { title: 'AI Integration Workshop', time: 'Tomorrow, 10:00 AM', expert: 'Matrix AI' }
                  ].map((meeting, i) => (
                    <div key={i} className="p-3 rounded-lg bg-secondary-bg border border-border-light hover:border-interaction-primary/30 transition-all cursor-pointer">
                      <p className="text-xs font-bold text-text-main mb-1">{meeting.title}</p>
                      <div className="flex items-center justify-between">
                        <p className="text-[10px] text-text-muted">{meeting.time}</p>
                        <p className="text-[10px] text-interaction-primary font-medium">{meeting.expert}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h3 className="text-xs font-bold text-text-muted uppercase tracking-wider mb-4">Active Projects</h3>
                <div className="space-y-3">
                  {[
                    { name: 'Project Alpha', status: 'In Progress', progress: 65 },
                    { name: 'Supply Chain AI', status: 'Review', progress: 90 }
                  ].map((project, i) => (
                    <div key={i} className="p-3 rounded-lg border border-border-light hover:border-interaction-primary/30 transition-all cursor-pointer">
                      <div className="flex justify-between items-center mb-2">
                        <p className="text-xs font-bold text-text-main">{project.name}</p>
                        <span className="text-[10px] text-interaction-primary font-medium">{project.status}</span>
                      </div>
                      <div className="h-1.5 w-full bg-secondary-bg rounded-full overflow-hidden">
                        <div className="h-full bg-interaction-primary rounded-full" style={{ width: `${project.progress}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
