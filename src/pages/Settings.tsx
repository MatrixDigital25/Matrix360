import React from 'react';
import { motion } from 'motion/react';
import { 
  User, Shield, Bell, Globe, 
  Database, Zap, CreditCard, HelpCircle,
  ChevronRight, LogOut, Moon, Sun
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/src/components/ui/Card';
import { Button } from '@/src/components/ui/Button';
import { Input } from '@/src/components/ui/Input';
import { Badge } from '@/src/components/ui/Badge';

export default function Settings() {
  const sections = [
    { id: 'profile', label: 'Profile Settings', icon: User },
    { id: 'security', label: 'Security & Privacy', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'workspace', label: 'Workspace Config', icon: Globe },
    { id: 'billing', label: 'Subscription', icon: CreditCard },
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
              className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-text-muted hover:text-text-main hover:bg-secondary-bg rounded-lg transition-all group"
            >
              <section.icon className="h-4 w-4 group-hover:text-interaction-primary transition-colors" />
              {section.label}
            </button>
          ))}
          <div className="pt-4 mt-4 border-t border-panel-border">
            <button className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-alert-risk hover:bg-alert-risk/5 rounded-lg transition-all">
              <LogOut className="h-4 w-4" />
              Sign Out
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="md:col-span-3 space-y-6">
          {/* Profile Section */}
          <Card className="border-panel-border bg-panel-bg">
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your personal details and professional identity.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-6">
                <div className="h-20 w-20 rounded-full bg-secondary-bg border border-panel-border flex items-center justify-center text-2xl font-bold text-text-main">
                  JD
                </div>
                <div className="space-y-2">
                  <Button variant="secondary" size="sm">Change Avatar</Button>
                  <p className="text-[10px] text-text-muted uppercase tracking-wider">JPG, PNG or GIF. Max 1MB.</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-text-muted uppercase tracking-widest">Full Name</label>
                  <Input defaultValue="John Doe" className="h-10" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-text-muted uppercase tracking-widest">Email Address</label>
                  <Input defaultValue="john.doe@enterprise.com" className="h-10" />
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

          {/* Security Section */}
          <Card className="border-panel-border bg-panel-bg">
            <CardHeader>
              <CardTitle>Security</CardTitle>
              <CardDescription>Manage your password and account security settings.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-secondary-bg rounded-xl border border-panel-border">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-lg bg-panel-bg flex items-center justify-center">
                    <Shield className="h-5 w-5 text-interaction-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-text-main">Two-Factor Authentication</p>
                    <p className="text-xs text-text-muted">Add an extra layer of security to your account.</p>
                  </div>
                </div>
                <Badge variant="secondary">Disabled</Badge>
              </div>

              <div className="flex items-center justify-between p-4 bg-secondary-bg rounded-xl border border-panel-border">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-lg bg-panel-bg flex items-center justify-center">
                    <Database className="h-5 w-5 text-ai-cyan" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-text-main">Connected Devices</p>
                    <p className="text-xs text-text-muted">Manage your active sessions and devices.</p>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-text-muted" />
              </div>
            </CardContent>
          </Card>

          {/* Workspace Section */}
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
        </div>
      </div>
    </motion.div>
  );
}
