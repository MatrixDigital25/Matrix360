import React from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/Card';
import { Badge } from '@/src/components/ui/Badge';
import { Loader2, Users, RefreshCw, ExternalLink } from 'lucide-react';
import { Button } from '@/src/components/ui/Button';

interface Application {
  id: number;
  full_name: string;
  professional_title: string;
  organization: string;
  years_experience: number;
  industry: string;
  specializations: string;
  linkedin_url: string;
  bio: string;
  status: string;
  created_at: string;
}

export default function Admin() {
  const [applications, setApplications] = React.useState<Application[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState('');

  const fetchApplications = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/admin/applications');
      if (!res.ok) throw new Error('Failed to fetch applications');
      const contentType = res.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const data = await res.json();
        setApplications(Array.isArray(data) ? data : []);
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to load applications');
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchApplications();
  }, []);

  const statusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'green';
      case 'rejected': return 'red';
      default: return 'amber';
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-heading font-bold text-text-main">Admin — Consultant Applications</h1>
            <p className="text-text-muted mt-1">Review and manage incoming consultant applications.</p>
          </div>
          <Button variant="secondary" onClick={fetchApplications} className="flex items-center gap-2">
            <RefreshCw className="h-4 w-4" /> Refresh
          </Button>
        </div>
      </motion.div>

      {loading && (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-interaction-primary" />
        </div>
      )}

      {error && (
        <div className="rounded-md bg-red-50 border border-red-200 p-4 text-sm text-red-700 mb-6">{error}</div>
      )}

      {!loading && !error && applications.length === 0 && (
        <div className="text-center py-20 text-text-muted">
          <Users className="h-12 w-12 mx-auto mb-4 text-gray-300" />
          <p className="text-lg font-medium">No applications yet.</p>
          <p className="text-sm mt-2">Applications submitted through the <a href="/apply" className="text-interaction-primary hover:underline">Apply page</a> will appear here.</p>
        </div>
      )}

      {!loading && applications.length > 0 && (
        <div className="space-y-4">
          <p className="text-sm text-text-muted">{applications.length} application{applications.length !== 1 ? 's' : ''} found</p>
          {applications.map((app, i) => (
            <motion.div key={app.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <Card className="border-border-light bg-white shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2 flex-wrap">
                        <h3 className="text-lg font-semibold text-text-main">{app.full_name}</h3>
                        <Badge variant={statusColor(app.status) as any}>{app.status}</Badge>
                      </div>
                      <p className="text-sm text-text-secondary mb-1">{app.professional_title} at {app.organization}</p>
                      <div className="flex flex-wrap gap-3 text-xs text-text-muted mt-2">
                        <span className="bg-panel-bg px-2 py-1 rounded">{app.industry}</span>
                        <span className="bg-panel-bg px-2 py-1 rounded">{app.years_experience} years exp.</span>
                        <span className="text-text-muted">{new Date(app.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {app.specializations.split(',').map((s, j) => (
                          <Badge key={j} variant="outline" className="text-xs">{s.trim()}</Badge>
                        ))}
                      </div>
                      <p className="text-sm text-text-secondary mt-3 line-clamp-2">{app.bio}</p>
                    </div>
                    <div className="flex-shrink-0">
                      <a href={app.linkedin_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm text-interaction-primary hover:underline">
                        <ExternalLink className="h-3.5 w-3.5" /> LinkedIn
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
