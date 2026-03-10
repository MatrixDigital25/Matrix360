import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  User, Shield, Bell, Globe, 
  Database, Zap, CreditCard, HelpCircle,
  ChevronRight, LogOut, Moon, Sun,
  Check, ArrowUpRight, Receipt, Plus,
  Download, BarChart3, ShieldCheck, AlertCircle, History
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/src/components/ui/Card';
import { Button } from '@/src/components/ui/Button';
import { Input } from '@/src/components/ui/Input';
import { Badge } from '@/src/components/ui/Badge';
import { cn } from '@/src/utils/cn';
import Billing from './Billing';
import SecuritySettings from '../components/SecuritySettings';
import { useAuth } from '../utils/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

export default function Settings() {
  const [activeSection, setActiveSection] = useState('profile');
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const sections = [
    { id: 'profile', label: 'Profile Settings', icon: User },
    { id: 'security', label: 'Security & Privacy', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'workspace', label: 'Workspace Config', icon: Globe },
    { id: 'billing', label: 'Subscription & Billing', icon: CreditCard },
    { id: 'api', label: 'API & Integrations', icon: Zap },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto space-y-8"
    >
      <div>
        <h1 className="text-3xl font-heading font-bold text-text-main">Settings</h1>
        <p className="text-text-muted mt-2">Manage your account, workspace preferences, and system integrations.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Navigation */}
        <div className="md:col-span-1 space-y-1">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium transition-all group rounded-lg",
                activeSection === section.id 
                  ? "text-interaction-primary bg-interaction-primary/10" 
                  : "text-text-muted hover:text-text-main hover:bg-secondary-bg"
              )}
            >
              <section.icon className={cn(
                "h-4 w-4 transition-colors",
                activeSection === section.id ? "text-interaction-primary" : "group-hover:text-interaction-primary"
              )} />
              {section.label}
            </button>
          ))}
          <div className="pt-4 mt-4 border-t border-panel-border">
            <button 
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-alert-risk hover:bg-alert-risk/5 rounded-lg transition-all"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="md:col-span-3">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              {activeSection === 'profile' && (
                <Card className="border-panel-border bg-panel-bg">
                  <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                    <CardDescription>Update your personal details and professional identity.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center gap-6">
                      <div className="h-20 w-20 rounded-full bg-secondary-bg border border-panel-border flex items-center justify-center text-2xl font-bold text-text-main uppercase">
                        {user?.email.substring(0, 2)}
                      </div>
                      <div className="space-y-2">
                        <Button variant="secondary" size="sm">Change Avatar</Button>
                        <p className="text-[10px] text-text-muted uppercase tracking-wider">JPG, PNG or GIF. Max 1MB.</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-text-muted uppercase tracking-widest">Full Name</label>
                        <Input defaultValue="User" className="h-10" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-text-muted uppercase tracking-widest">Email Address</label>
                        <Input defaultValue={user?.email} className="h-10" disabled />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-text-muted uppercase tracking-widest">Professional Bio</label>
                      <textarea 
                        className="w-full min-h-[100px] p-3 rounded-lg bg-secondary-bg border border-panel-border text-sm text-text-main focus:outline-none focus:border-interaction-primary transition-colors"
                        placeholder="Tell us about your expertise..."
                      />
                    </div>

                    <div className="flex justify-end">
                      <Button variant="primary">Save Changes</Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {activeSection === 'security' && (
                <div className="space-y-6">
                  <SecuritySettings />
                  
                  {user?.role === 'ADMIN' && (
                    <Card className="border-panel-border bg-panel-bg">
                      <CardHeader>
                        <CardTitle>Enterprise Governance</CardTitle>
                        <CardDescription>Administrative security controls and monitoring.</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Link 
                          to="/audit-logs"
                          className="flex items-center justify-between p-4 bg-secondary-bg rounded-xl border border-panel-border hover:bg-secondary-bg/80 transition-all"
                        >
                          <div className="flex items-center gap-4">
                            <div className="h-10 w-10 rounded-lg bg-panel-bg flex items-center justify-center">
                              <History className="h-5 w-5 text-emerald-500" />
                            </div>
                            <div>
                              <p className="text-sm font-bold text-text-main">Audit Logs</p>
                              <p className="text-xs text-text-muted">View all security events and user actions.</p>
                            </div>
                          </div>
                          <ChevronRight className="h-4 w-4 text-text-muted" />
                        </Link>
                      </CardContent>
                    </Card>
                  )}
                </div>
              )}

              {activeSection === 'workspace' && (
                <Card className="border-panel-border bg-panel-bg">
                  <CardHeader>
                    <CardTitle>Workspace Preferences</CardTitle>
                    <CardDescription>Customize your platform experience.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-bold text-text-main">Appearance</p>
                        <p className="text-xs text-text-muted">Switch between light and dark mode.</p>
                      </div>
                      <div className="flex p-1 bg-secondary-bg rounded-lg border border-panel-border">
                        <button className="p-1.5 rounded-md bg-panel-bg text-interaction-primary shadow-sm">
                          <Sun className="h-4 w-4" />
                        </button>
                        <button className="p-1.5 rounded-md text-text-muted hover:text-text-main">
                          <Moon className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {activeSection === 'billing' && <Billing />}
              
              {activeSection === 'api' && (
                <Card className="border-panel-border bg-panel-bg">
                  <CardHeader>
                    <CardTitle>API & Integrations</CardTitle>
                    <CardDescription>Connect your workspace to external tools and services.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-text-muted">API management features coming soon.</p>
                  </CardContent>
                </Card>
              )}

              {activeSection === 'notifications' && (
                <Card className="border-panel-border bg-panel-bg">
                  <CardHeader>
                    <CardTitle>Notifications</CardTitle>
                    <CardDescription>Configure how you receive updates and alerts.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-text-muted">Notification preferences coming soon.</p>
                  </CardContent>
                </Card>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
