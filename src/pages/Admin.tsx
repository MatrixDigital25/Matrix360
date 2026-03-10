import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Loader2, Users, RefreshCw, ExternalLink, Trash2, Search, Briefcase, GraduationCap, AlertOctagon, MoreVertical } from 'lucide-react';

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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved': return <span className="px-2.5 py-1 text-xs font-semibold bg-green-50 text-green-700 rounded-lg border border-green-200">Approved</span>;
      case 'rejected': return <span className="px-2.5 py-1 text-xs font-semibold bg-red-50 text-red-700 rounded-lg border border-red-200">Rejected</span>;
      default: return <span className="px-2.5 py-1 text-xs font-semibold bg-amber-50 text-amber-700 rounded-lg border border-amber-200">Pending Review</span>;
    }
  };

  const filteredApps = applications.filter(app => 
    app.full_name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    app.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.organization.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-gray-900 py-16 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-5xl mx-auto">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-8 border-b border-gray-100"
        >
          <div>
            <div className="inline-flex items-center gap-2 text-blue-600 text-sm font-bold uppercase tracking-widest mb-3">
              <Users className="w-4 h-4" /> Application Pipeline
            </div>
            <h1 className="text-4xl font-heading font-extrabold tracking-tight text-gray-900 mb-2">
              Consultant Candidates
            </h1>
            <p className="text-gray-500 text-base max-w-xl font-light">
              Review, verify, and manage incoming executive applications to the expert network.
            </p>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative group w-full md:w-64">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-500 transition-colors">
                <Search className="h-4 w-4" />
              </div>
              <input 
                type="text" 
                placeholder="Search candidates..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-xl py-2 pl-10 pr-4 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition-all shadow-sm"
              />
            </div>
            <button 
              onClick={fetchApplications} 
              className="p-2.5 rounded-xl bg-white border border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-600 transition-all shadow-sm flex-shrink-0"
              title="Refresh Data"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin text-blue-600' : ''}`} />
            </button>
          </div>
        </motion.div>

        {error && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-8 p-4 bg-red-50 border border-red-100 rounded-xl text-red-700 flex items-start gap-3 shadow-sm">
            <AlertOctagon className="h-5 w-5 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold mb-1">Retrieval Failed</h3>
              <p className="text-sm opacity-80">{error}</p>
            </div>
          </motion.div>
        )}

        {loading && applications.length === 0 ? (
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="animate-pulse bg-white border border-gray-100 rounded-2xl h-40 shadow-sm" />
            ))}
          </div>
        ) : !loading && applications.length === 0 && !error ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center py-24 bg-white border border-gray-100 rounded-2xl shadow-sm">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-5 border border-gray-100">
              <Users className="h-8 w-8 text-gray-300" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Queue is Empty</h3>
            <p className="text-gray-500 text-center max-w-sm">There are currently no pending applications in the system.</p>
          </motion.div>
        ) : (
          <div className="space-y-5">
            <AnimatePresence>
              {filteredApps.map((app, i) => (
                <motion.div 
                  key={app.id}
                  layout
                  initial={{ opacity: 0, y: 15 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  exit={{ opacity: 0, scale: 0.98, transition: { duration: 0.2 } }}
                  transition={{ duration: 0.4, delay: i * 0.03 }}
                  className="group bg-white hover:bg-gray-50/50 border border-gray-200 hover:border-gray-300 rounded-2xl p-6 md:p-8 transition-all duration-300 shadow-[0_2px_10px_rgb(0,0,0,0.02)] relative"
                >
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                    
                    {/* Left: Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-3 mb-1">
                        <h3 className="text-xl font-bold text-gray-900">{app.full_name}</h3>
                        {getStatusBadge(app.status)}
                      </div>
                      
                      <p className="text-base text-gray-600 font-medium flex items-center flex-wrap gap-1.5 mb-4">
                        <Briefcase className="w-4 h-4 text-gray-400" /> {app.professional_title} at <span className="text-gray-900">{app.organization}</span>
                      </p>

                      <div className="flex flex-wrap gap-2 mb-5">
                        <span className="px-3 py-1 bg-gray-100/80 text-gray-600 rounded-md text-sm font-medium flex items-center gap-1.5">
                          <GraduationCap className="w-3.5 h-3.5" /> {app.industry}
                        </span>
                        <span className="px-3 py-1 bg-gray-100/80 text-gray-600 rounded-md text-sm font-medium">
                          {app.years_experience} Years Exp.
                        </span>
                        <span className="px-3 py-1 text-gray-400 rounded-md text-sm font-medium">
                          Applied {new Date(app.created_at).toLocaleDateString()}
                        </span>
                      </div>

                      <div className="mb-4">
                        <p className="text-sm text-gray-600 leading-relaxed max-w-3xl line-clamp-2 italic">"{app.bio}"</p>
                      </div>

                      <div className="flex flex-wrap gap-1.5">
                        {app.specializations.split(',').map((tag, idx) => (
                          <span key={idx} className="px-2.5 py-1 bg-blue-50/50 border border-blue-100 text-blue-700 rounded text-xs font-semibold uppercase tracking-wider">
                            {tag.trim()}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Right: Actions */}
                    <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-start gap-4 flex-shrink-0 mt-4 md:mt-0 pt-4 md:pt-0 border-t border-gray-100 md:border-0">
                      <a 
                        href={app.linkedin_url.startsWith('http') ? app.linkedin_url : `https://${app.linkedin_url}`}
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2 bg-white border border-gray-200 hover:border-[#0077b5] hover:text-[#0077b5] text-gray-700 rounded-lg text-sm font-bold transition-colors shadow-sm"
                      >
                        <Linkedin className="w-4 h-4" /> LinkedIn
                      </a>

                      <button 
                        onClick={() => handleDelete(app.id)}
                        disabled={deletingId === app.id}
                        className="inline-flex items-center gap-1.5 px-4 py-2 bg-white border border-red-100 hover:bg-red-50 hover:text-red-700 hover:border-red-200 text-red-500 rounded-lg text-sm font-semibold transition-colors disabled:opacity-50"
                      >
                        {deletingId === app.id ? <Loader2 className="w-4 h-4 animate-spin text-red-400" /> : <Trash2 className="w-4 h-4" />}
                        Delete
                      </button>
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
