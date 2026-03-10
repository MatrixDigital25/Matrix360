import React, { useState, useEffect } from 'react';
import { History, Search, Filter, Download, User, Shield, Activity } from 'lucide-react';
import { motion } from 'motion/react';

interface AuditLog {
  log_id: number;
  user_id: number;
  org_id: number;
  action: string;
  details: string;
  ip_address: string;
  created_at: string;
}

const AuditLogs: React.FC = () => {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('/api/audit-logs')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setLogs(data);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const filteredLogs = logs.filter(log => 
    log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.details.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#050505] text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div>
            <h1 className="text-4xl font-bold tracking-tight mb-2 flex items-center gap-3">
              <History className="w-10 h-10 text-emerald-500" />
              Audit Logs
            </h1>
            <p className="text-white/40">Enterprise-wide security event monitoring and compliance tracking.</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2 rounded-xl flex items-center gap-2 transition-all">
              <Download className="w-4 h-4" />
              Export CSV
            </button>
            <button className="bg-emerald-500 hover:bg-emerald-600 text-black font-bold px-6 py-2 rounded-xl transition-all">
              Live Monitor
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <div className="text-white/40 text-xs font-medium uppercase tracking-wider mb-2">Total Events</div>
            <div className="text-3xl font-bold">{logs.length}</div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <div className="text-white/40 text-xs font-medium uppercase tracking-wider mb-2">Security Alerts</div>
            <div className="text-3xl font-bold text-red-500">0</div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <div className="text-white/40 text-xs font-medium uppercase tracking-wider mb-2">Active Users</div>
            <div className="text-3xl font-bold text-emerald-500">1</div>
          </div>
        </div>

        <div className="bg-[#111] border border-white/10 rounded-2xl overflow-hidden">
          <div className="p-4 border-bottom border-white/10 flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
              <input
                type="text"
                placeholder="Search by action or details..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-emerald-500/50"
              />
            </div>
            <div className="flex gap-2">
              <button className="bg-white/5 border border-white/10 px-4 py-2 rounded-xl text-sm flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Filter
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white/5 text-xs font-medium uppercase tracking-wider text-white/40">
                  <th className="px-6 py-4">Timestamp</th>
                  <th className="px-6 py-4">Action</th>
                  <th className="px-6 py-4">User</th>
                  <th className="px-6 py-4">Details</th>
                  <th className="px-6 py-4">IP Address</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {loading ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-white/20">Loading logs...</td>
                  </tr>
                ) : filteredLogs.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-white/20">No logs found</td>
                  </tr>
                ) : (
                  filteredLogs.map((log) => (
                    <tr key={log.log_id} className="hover:bg-white/5 transition-colors group">
                      <td className="px-6 py-4 text-sm text-white/60 whitespace-nowrap">
                        {new Date(log.created_at).toLocaleString()}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                          log.action === 'LOGIN' ? 'bg-blue-500/10 text-blue-500' :
                          log.action === 'REGISTER' ? 'bg-emerald-500/10 text-emerald-500' :
                          log.action === '2FA_VERIFY' ? 'bg-purple-500/10 text-purple-500' :
                          'bg-white/10 text-white/60'
                        }`}>
                          {log.action}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
                            <User className="w-3 h-3 text-white/40" />
                          </div>
                          <span className="text-sm font-medium">User #{log.user_id}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-white/60">
                        {log.details}
                      </td>
                      <td className="px-6 py-4 text-sm font-mono text-white/20">
                        {log.ip_address}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuditLogs;
