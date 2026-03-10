import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Loader2, Users, RefreshCw, ExternalLink, Trash2, Search, Briefcase, GraduationCap, X, AlertOctagon } from 'lucide-react';

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
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [deletingId, setDeletingId] = useState<number | null>(null);

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

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleDelete = async (id: number) => {
    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin/applications?id=${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete application');
      setApplications(prev => prev.filter(app => app.id !== id));
    } catch (err: any) {
      alert(err.message || 'Error deleting application');
    } finally {
      setDeletingId(null);
    }
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-500/10 text-green-400 border-green-500/20';
      case 'rejected': return 'bg-red-500/10 text-red-400 border-red-500/20';
      default: return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
    }
  };

  const filteredApps = applications.filter(app => 
    app.full_name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    app.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.organization.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-white py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-interaction-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[50%] bg-[#2ca9ff]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/50 text-xs font-semibold uppercase tracking-wider mb-4">
              <Users className="w-3.5 h-3.5" /> Consultant Hub
            </div>
            <h1 className="text-4xl lg:text-5xl font-heading font-bold tracking-tight text-white mb-2">
              Application Pipeline
            </h1>
            <p className="text-white/50 text-lg max-w-2xl font-light">
              Review, verify, and manage incoming applications to the Matrix360 Expert Network.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-white/30 group-focus-within:text-interaction-primary transition-colors">
                <Search className="h-4 w-4" />
              </div>
              <input 
                type="text" 
                placeholder="Search candidates..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full lg:w-64 bg-white/5 border border-white/10 focus:border-interaction-primary/50 focus:bg-white/10 rounded-full py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-white/30 outline-none transition-all shadow-inner"
              />
            </div>
            <button 
              onClick={fetchApplications} 
              className="p-2.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-white/80 hover:text-white transition-all flex-shrink-0"
              title="Refresh Data"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </motion.div>

        {error && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 flex items-start gap-3 backdrop-blur-sm">
            <AlertOctagon className="h-5 w-5 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold mb-1">Retrieval Failed</h3>
              <p className="text-sm opacity-80">{error}</p>
            </div>
          </motion.div>
        )}

        {loading && applications.length === 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="animate-pulse bg-white/5 border border-white/10 rounded-3xl h-72" />
            ))}
          </div>
        ) : !loading && applications.length === 0 && !error ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center py-32 bg-white/[0.02] border border-white/10 rounded-3xl backdrop-blur-sm">
            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6 border border-white/10">
              <Users className="h-10 w-10 text-white/30" />
            </div>
            <h3 className="text-xl font-medium text-white mb-2">Queue is Empty</h3>
            <p className="text-white/40 text-center max-w-sm mb-6">There are currently no pending applications in the system.</p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <AnimatePresence>
              {filteredApps.map((app, i) => (
                <motion.div 
                  key={app.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }} 
                  animate={{ opacity: 1, scale: 1 }} 
                  exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="group bg-white/[0.03] hover:bg-white/[0.05] border border-white/10 hover:border-white/20 rounded-3xl p-6 transition-all duration-300 backdrop-blur-md relative overflow-hidden"
                >
                  {/* Subtle Gradient Hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-interaction-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex gap-4 items-center">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 border border-white/10 flex items-center justify-center shadow-lg string-avatar text-lg font-bold text-white">
                          {app.full_name.charAt(0)}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-white tracking-tight">{app.full_name}</h3>
                          <p className="text-sm text-white/60 font-light flex items-center gap-1.5 mt-0.5">
                            <Briefcase className="w-3.5 h-3.5 opacity-70" /> {app.professional_title} @ {app.organization}
                          </p>
                        </div>
                      </div>
                      
                      {/* Actions */}
                      <div className="flex items-center gap-2">
                        <span className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded border ${getStatusStyle('pending')}`}>
                          Pending
                        </span>
                        <div className="h-6 w-px bg-white/10 mx-1" />
                        <button 
                          onClick={() => handleDelete(app.id)}
                          disabled={deletingId === app.id}
                          className="p-1.5 text-white/30 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                          title="Delete Application"
                        >
                          {deletingId === app.id ? <Loader2 className="w-5 h-5 animate-spin text-red-400" /> : <Trash2 className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-6">
                      <div className="px-3 py-1.5 bg-black/40 border border-white/5 rounded-lg text-xs font-medium text-white/70 flex items-center gap-1.5">
                        <GraduationCap className="w-3.5 h-3.5 text-interaction-primary" /> {app.industry}
                      </div>
                      <div className="px-3 py-1.5 bg-black/40 border border-white/5 rounded-lg text-xs font-medium text-white/70">
                        {app.years_experience} Yrs Exp.
                      </div>
                      <div className="px-3 py-1.5 bg-black/40 border border-white/5 rounded-lg text-xs font-medium text-white/50">
                        {new Date(app.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                      </div>
                    </div>

                    <div className="mb-6 h-px w-full bg-gradient-to-r from-white/10 via-white/5 to-transparent" />

                    <div className="space-y-4">
                      <div>
                        <h4 className="text-xs uppercase tracking-wider font-semibold text-white/40 mb-2">Areas of Expertise</h4>
                        <div className="flex flex-wrap gap-1.5">
                          {app.specializations.split(',').map((tag, i) => (
                            <span key={i} className="px-2 py-1 bg-white/5 border border-white/10 rounded text-[11px] text-white/80">
                              {tag.trim()}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-xs uppercase tracking-wider font-semibold text-white/40 mb-1.5">Professional Bio</h4>
                        <p className="text-sm text-white/70 leading-relaxed font-light line-clamp-3">
                          "{app.bio}"
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 pt-5 flex justify-end">
                      <a 
                        href={app.linkedin_url.startsWith('http') ? app.linkedin_url : `https://${app.linkedin_url}`}
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-[#0077b5]/10 hover:bg-[#0077b5]/20 border border-[#0077b5]/30 text-[#0077b5] rounded-xl text-sm font-medium transition-colors cursor-pointer"
                      >
                         View LinkedIn <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
