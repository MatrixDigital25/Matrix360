import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Zap, Shield, Key, Code, CheckCircle2, RefreshCw, Trash2, Database, Globe, Briefcase, Cpu } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/Card';
import { Badge } from '@/src/components/ui/Badge';
import { Button } from '@/src/components/ui/Button';
import { cn } from '@/src/utils/cn';

interface Integration {
  integration_id: number;
  name: string;
  type: string;
  provider: string;
  status: string;
  last_sync: string | null;
}

export default function APIIntegrations() {
  const [integrations, setIntegrations] = useState<Integration[]>([]);
  const [loading, setLoading] = useState(true);
  const [syncingId, setSyncingId] = useState<number | null>(null);

  const fetchIntegrations = async () => {
    try {
      const res = await fetch('/api/integrations');
      const data = await res.json();
      setIntegrations(data);
    } catch (err) {
      console.error('Failed to fetch integrations:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIntegrations();
  }, []);

  const handleSync = async (id: number) => {
    setSyncingId(id);
    try {
      await fetch(`/api/integrations/${id}/sync`, { method: 'POST' });
      await fetchIntegrations();
    } catch (err) {
      console.error('Sync failed:', err);
    } finally {
      setSyncingId(null);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to remove this integration?')) return;
    try {
      await fetch(`/api/integrations/${id}`, { method: 'DELETE' });
      await fetchIntegrations();
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'CRM': return <Briefcase className="h-4 w-4" />;
      case 'ERP': return <Cpu className="h-4 w-4" />;
      case 'DATA': return <Database className="h-4 w-4" />;
      case 'INTEL': return <Globe className="h-4 w-4" />;
      default: return <Zap className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold text-text-main tracking-tight">API & Integrations</h1>
          <p className="text-text-muted mt-2">Connect Matrix360 to your enterprise ecosystem.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="secondary" className="bg-white/5 border-white/10 text-white hover:bg-white/10">
            <RefreshCw className={cn("h-4 w-4 mr-2", loading && "animate-spin")} onClick={fetchIntegrations} />
            Refresh
          </Button>
          <Button className="bg-interaction-primary text-white shadow-lg shadow-interaction-primary/20">
            + Add Integration
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-ai-cyan" />
                Enterprise Connectors
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {loading ? (
                  <div className="py-12 text-center text-text-muted animate-pulse">Loading integrations...</div>
                ) : integrations.length === 0 ? (
                  <div className="py-12 text-center text-text-muted border-2 border-dashed border-border-light rounded-xl">
                    No active integrations found.
                  </div>
                ) : (
                  integrations.map((integration) => (
                    <div key={integration.integration_id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-secondary-bg rounded-xl border border-border-light gap-4">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 bg-white/5 rounded-lg flex items-center justify-center text-interaction-primary border border-white/10">
                          {getIcon(integration.type)}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-bold text-text-main">{integration.name}</p>
                            <Badge className="text-[8px] px-1.5 py-0 bg-white/10 text-white/40 border-none">{integration.type}</Badge>
                          </div>
                          <p className="text-[10px] text-text-muted mt-0.5">Provider: {integration.provider}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between sm:justify-end gap-4">
                        <div className="text-right hidden sm:block">
                          <p className={cn(
                            "text-[10px] font-bold uppercase tracking-wider",
                            integration.status === 'Connected' ? "text-alert-opportunity" : "text-alert-risk"
                          )}>
                            {integration.status}
                          </p>
                          <p className="text-[9px] text-text-muted mt-0.5">
                            {integration.last_sync ? `Last sync: ${new Date(integration.last_sync).toLocaleTimeString()}` : 'Never synced'}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button 
                            variant="secondary" 
                            size="sm" 
                            className="h-8 w-8 p-0" 
                            onClick={() => handleSync(integration.integration_id)}
                            disabled={syncingId === integration.integration_id}
                          >
                            <RefreshCw className={cn("h-3.5 w-3.5", syncingId === integration.integration_id && "animate-spin")} />
                          </Button>
                          <Button 
                            variant="secondary" 
                            size="sm" 
                            className="h-8 w-8 p-0 text-alert-risk hover:bg-alert-risk/10"
                            onClick={() => handleDelete(integration.integration_id)}
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="h-5 w-5 text-interaction-primary" />
                Active API Keys
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: 'Production OS Key', key: 'mx_live_••••••••••••••••', status: 'Active' },
                  { name: 'Development Sandbox', key: 'mx_test_••••••••••••••••', status: 'Active' },
                ].map((k, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-secondary-bg rounded-xl border border-border-light">
                    <div>
                      <p className="text-sm font-bold text-text-main">{k.name}</p>
                      <p className="text-xs font-mono text-text-muted mt-1">{k.key}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="flex items-center gap-1 text-[10px] font-bold text-alert-opportunity uppercase">
                        <CheckCircle2 className="h-3 w-3" />
                        {k.status}
                      </span>
                      <button className="text-xs font-bold text-interaction-primary hover:underline ml-4">Revoke</button>
                    </div>
                  </div>
                ))}
                <button className="w-full py-3 border-2 border-dashed border-border-light rounded-xl text-sm font-bold text-text-muted hover:border-interaction-primary hover:text-interaction-primary transition-all">
                  + Generate New API Key
                </button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="bg-brand-primary text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Code className="h-5 w-5 text-ai-cyan" />
                Developer Docs
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-xs text-white/70 leading-relaxed">
                Access our comprehensive documentation to build custom integrations and automate your strategic workflows.
              </p>
              <button className="w-full py-2 bg-white/10 hover:bg-white/20 rounded-lg text-xs font-bold transition-all border border-white/20">
                View Documentation
              </button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-alert-risk" />
                Security & Webhooks
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-text-secondary">Webhook Retries</span>
                <span className="font-bold">Enabled</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-text-secondary">IP Whitelisting</span>
                <span className="font-bold">Disabled</span>
              </div>
              <button className="w-full py-2 text-xs font-bold text-interaction-primary hover:bg-interaction-primary/5 rounded-lg transition-all border border-interaction-primary/20">
                Configure Webhooks
              </button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
