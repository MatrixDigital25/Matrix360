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
  MessageSquare,
  Menu,
  X,
  FileText,
  ShoppingBag,
  Zap,
  CreditCard,
  LayoutDashboard,
  BarChart3
} from 'lucide-react';
import { cn } from '@/src/utils/cn';
import { motion, AnimatePresence } from 'motion/react';

const LOGO_URL = "/Matrix360.png";

interface NavItem {
  title: string;
  href: string;
  icon: React.ElementType;
}

interface NavGroup {
  group: string;
  items: NavItem[];
}

const navigationGroups: NavGroup[] = [
  {
    group: 'Home',
    items: [
      { title: 'Intelligence Dashboard', href: '/', icon: LayoutDashboard },
    ]
  },
  {
    group: 'Intelligence',
    items: [
      { title: 'Intelligence Feed', href: '/ai-intelligence', icon: Rss },
      { title: 'Strategic Analytics', href: '/analytics', icon: BarChart3 },
      { title: 'Strategic Domains', href: '/industries', icon: Globe },
      { title: 'Knowledge Graph', href: '/knowledge-graph', icon: Network },
      { title: 'AI Reports', href: '/ai-reports', icon: FileText },
    ]
  },
  {
    group: 'Strategy',
    items: [
      { title: 'Strategic Challenges', href: '/marketplace', icon: Target },
      { title: 'Strategy Rooms', href: '/strategy-room', icon: Video },
      { title: 'AI Strategy Agents', href: '/ai-agents', icon: BrainCircuit },
    ]
  },
  {
    group: 'Execution',
    items: [
      { title: 'Projects', href: '/projects', icon: Briefcase },
      { title: 'Automation Systems', href: '/automation', icon: Cpu },
    ]
  },
  {
    group: 'Network',
    items: [
      { title: 'Consultant Network', href: '/network', icon: Users },
      { title: 'Expert Marketplace', href: '/expert-marketplace', icon: ShoppingBag },
    ]
  },
  {
    group: 'System',
    items: [
      { title: 'Settings', href: '/settings', icon: Settings },
      { title: 'API & Integrations', href: '/api-integrations', icon: Zap },
      { title: 'Subscription', href: '/subscription', icon: CreditCard },
    ]
  }
];

export function AppLayout() {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-primary-bg text-text-main font-sans">
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Left Sidebar Navigation */}
      <aside 
        className={cn(
          "bg-white border-r border-zinc-200 flex flex-col transition-all duration-300 ease-in-out z-[70]",
          "fixed inset-y-0 left-0 lg:relative",
          isSidebarOpen ? "w-64" : "w-20",
          !isMobileMenuOpen && "translate-x-[-100%] lg:translate-x-0"
        )}
      >
        <div className="p-6 flex items-center justify-between shrink-0">
          <Link to="/" className={cn("flex items-center gap-2 overflow-hidden transition-all", !isSidebarOpen && "opacity-0 w-0")}>
            <img src={LOGO_URL} alt="Matrix360 Logo" className="h-8 w-auto object-contain" />
          </Link>
          <button 
            onClick={() => {
              if (window.innerWidth < 1024) {
                setIsMobileMenuOpen(false);
              } else {
                setIsSidebarOpen(!isSidebarOpen);
              }
            }}
            className="p-1.5 rounded-lg hover:bg-zinc-100 transition-colors text-zinc-500"
          >
            {isSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* User Profile Summary */}
        <div className="px-4 mb-6 shrink-0">
          <div className={cn(
            "flex items-center gap-3 p-3 rounded-xl bg-zinc-50 border border-zinc-200 hover:bg-zinc-100 transition-all cursor-pointer group",
            !isSidebarOpen && "justify-center px-0 bg-transparent border-transparent"
          )}>
            <div className="h-9 w-9 rounded-full bg-zinc-900 flex items-center justify-center text-xs font-bold text-white shadow-sm flex-shrink-0 group-hover:scale-105 transition-transform">
              AS
            </div>
            {isSidebarOpen && (
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-zinc-900 truncate">Arjun Singh</p>
                <p className="text-[10px] text-zinc-500 font-medium uppercase tracking-wider truncate">Enterprise Admin</p>
              </div>
            )}
          </div>
        </div>

        <nav className="flex-1 px-3 pb-6 space-y-6 overflow-y-auto no-scrollbar">
          {navigationGroups.map((group) => (
            <div key={group.group} className="space-y-1">
              {isSidebarOpen && (
                <p className="px-3 text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em] mb-2">
                  {group.group}
                </p>
              )}
              <div className="space-y-0.5">
                {group.items.map((item) => {
                  const isActive = location.pathname === item.href || (item.href !== '/' && location.pathname.startsWith(item.href));
                  return (
                    <Link
                      key={item.href}
                      to={item.href}
                      className={cn(
                        "flex items-center px-3 py-2 rounded-lg transition-all group relative",
                        isActive 
                          ? "bg-zinc-900 text-white shadow-sm" 
                          : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100"
                      )}
                    >
                      <item.icon className={cn("h-4 w-4 flex-shrink-0", isActive ? "text-white" : "group-hover:text-zinc-900")} />
                      {isSidebarOpen && (
                        <span className="ml-3 font-medium text-xs whitespace-nowrap transition-all duration-300">
                          {item.title}
                        </span>
                      )}
                      {isActive && !isSidebarOpen && (
                        <div className="absolute left-0 w-1 h-4 bg-zinc-900 rounded-r-full" />
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        <div className="p-4 border-t border-zinc-100 shrink-0 space-y-3">
          <div className={cn(
            "flex items-center gap-2 px-2 py-1.5 rounded-md bg-zinc-50 border border-zinc-100",
            !isSidebarOpen && "justify-center"
          )}>
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            {isSidebarOpen && (
              <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-wider">System Status: Optimal</span>
            )}
          </div>
          <div className={cn("flex items-center gap-3 px-2 text-zinc-300 text-[10px] font-medium uppercase tracking-widest", !isSidebarOpen && "justify-center")}>
            {isSidebarOpen ? "© 2026 Matrix360 Strategic Intelligence OS" : "M360"}
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        {/* Top Bar */}
        <header className="h-14 border-b border-zinc-200 bg-white flex items-center justify-between px-4 md:px-8 shrink-0 z-40">
          <div className="flex items-center gap-4 flex-1 max-w-xl">
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 text-zinc-500 hover:text-zinc-900 transition-colors"
            >
              <Menu className="h-5 w-5" />
            </button>
            <div className="relative w-full group hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-400 group-focus-within:text-zinc-900 transition-colors" />
              <input 
                type="text" 
                placeholder="Search intelligence database..." 
                className="w-full bg-zinc-50 border border-zinc-200 rounded-lg pl-9 pr-4 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-zinc-900/5 focus:border-zinc-400 transition-all"
              />
            </div>
          </div>

          <div className="flex items-center space-x-2 md:space-x-6">
            <button className="p-2 text-zinc-400 hover:text-zinc-900 rounded-full transition-all relative">
              <Bell className="h-4 w-4" />
              <span className="absolute top-2 right-2 h-1.5 w-1.5 bg-red-500 rounded-full border border-white"></span>
            </button>
            <button className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg border border-zinc-200 hover:border-zinc-400 transition-all group">
              <Sparkles className="h-3.5 w-3.5 text-indigo-500 group-hover:animate-pulse" />
              <span className="text-[11px] font-semibold text-zinc-600">AI Insights</span>
            </button>
            <div className="h-6 w-px bg-zinc-200 mx-1 md:mx-2"></div>
            <div className="flex items-center gap-2 md:gap-3">
              <div className="text-right hidden md:block">
                <p className="text-[11px] font-bold text-zinc-900 uppercase tracking-wider">Matrix360 OS</p>
                <p className="text-[9px] text-zinc-400 uppercase tracking-wider font-medium">Enterprise Intelligence</p>
              </div>
              <div className="h-8 w-8 rounded-full bg-zinc-100 border border-zinc-200 flex items-center justify-center text-zinc-400 hover:text-zinc-900 hover:border-zinc-400 transition-all cursor-pointer overflow-hidden">
                <img src="https://picsum.photos/seed/user/40/40" alt="User" className="h-full w-full object-cover grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all" referrerPolicy="no-referrer" />
              </div>
            </div>
          </div>
        </header>

        {/* Workspace Area */}
        <div className="flex flex-1 overflow-hidden">
          <main className="flex-1 overflow-y-auto bg-primary-bg custom-scrollbar relative">
            <div className="max-w-[1600px] mx-auto p-6 md:p-8">
              <Outlet />
            </div>
          </main>

          {/* Contextual Right Panel (Visible on large screens) */}
          <aside className="hidden xl:flex w-80 border-l border-border-light bg-white flex-col overflow-y-auto custom-scrollbar shrink-0">
            <div className="p-6 space-y-8">
              {/* Contextual Insights Section */}
              <section>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-[10px] font-bold text-text-muted uppercase tracking-[0.2em]">AI Intelligence Alerts</h3>
                  <Sparkles className="h-4 w-4 text-ai-violet" />
                </div>
                <div className="space-y-3">
                  {[
                    { title: 'Market Shift Detected', desc: 'APAC manufacturing signals 12% volatility increase.', type: 'risk' },
                    { title: 'Strategy Optimization', desc: 'New efficiency model available for Project Alpha.', type: 'opportunity' }
                  ].map((alert, i) => (
                    <div key={i} className={cn(
                      "p-3 rounded-xl border-l-4 text-xs transition-all hover:translate-x-1 cursor-pointer",
                      alert.type === 'risk' ? "bg-alert-risk/5 border-alert-risk" : "bg-alert-opportunity/5 border-alert-opportunity"
                    )}>
                      <p className="font-bold text-text-main mb-1">{alert.title}</p>
                      <p className="text-text-secondary leading-relaxed">{alert.desc}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h3 className="text-[10px] font-bold text-text-muted uppercase tracking-[0.2em] mb-4">Recommended Experts</h3>
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
                <button className="w-full mt-4 py-2 text-xs font-bold text-interaction-primary hover:bg-interaction-primary/5 rounded-lg transition-all border border-interaction-primary/20">
                  View Full Network
                </button>
              </section>

              <section>
                <h3 className="text-[10px] font-bold text-text-muted uppercase tracking-[0.2em] mb-4">Upcoming Meetings</h3>
                <div className="space-y-3">
                  {[
                    { title: 'Strategy Sync: Project Alpha', time: 'Today, 2:00 PM', expert: 'Dr. Sarah Chen' },
                    { title: 'AI Integration Workshop', time: 'Tomorrow, 10:00 AM', expert: 'Matrix AI' }
                  ].map((meeting, i) => (
                    <div key={i} className="p-3 rounded-xl bg-secondary-bg border border-border-light hover:border-interaction-primary/30 transition-all cursor-pointer group">
                      <p className="text-xs font-bold text-text-main mb-1 group-hover:text-interaction-primary transition-colors">{meeting.title}</p>
                      <div className="flex items-center justify-between">
                        <p className="text-[10px] text-text-muted">{meeting.time}</p>
                        <p className="text-[10px] text-interaction-primary font-medium">{meeting.expert}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h3 className="text-[10px] font-bold text-text-muted uppercase tracking-[0.2em] mb-4">Active Projects</h3>
                <div className="space-y-4">
                  {[
                    { name: 'Project Alpha', status: 'In Progress', progress: 65 },
                    { name: 'Supply Chain AI', status: 'Review', progress: 90 }
                  ].map((project, i) => (
                    <div key={i} className="space-y-2 cursor-pointer group">
                      <div className="flex justify-between items-center">
                        <p className="text-xs font-bold text-text-main group-hover:text-interaction-primary transition-colors">{project.name}</p>
                        <span className="text-[10px] text-interaction-primary font-bold">{project.progress}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-secondary-bg rounded-full overflow-hidden">
                        <div className="h-full bg-interaction-primary rounded-full transition-all duration-1000" style={{ width: `${project.progress}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h3 className="text-[10px] font-bold text-text-muted uppercase tracking-[0.2em] mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  {[
                    { user: 'Dr. Sarah Jenkins', action: 'posted a new insight', time: '2h ago' },
                    { user: 'Matrix AI', action: 'generated a research report', time: '4h ago' }
                  ].map((activity, i) => (
                    <div key={i} className="flex gap-3">
                      <div className="h-8 w-8 rounded-lg bg-secondary-bg flex items-center justify-center shrink-0">
                        <User className="h-4 w-4 text-text-muted" />
                      </div>
                      <div>
                        <p className="text-[11px] leading-tight">
                          <span className="font-bold text-text-main">{activity.user}</span>
                          <span className="text-text-muted"> {activity.action}</span>
                        </p>
                        <p className="text-[9px] text-text-muted mt-1">{activity.time}</p>
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
