import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Building2, Mail, Lock, ArrowRight, ShieldCheck, UserCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '@/src/utils/cn';

const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [orgName, setOrgName] = useState('');
  const [userType, setUserType] = useState<'ENTERPRISE' | 'CONSULTANT'>('ENTERPRISE');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, organization_name: orgName, user_type: userType }),
      });

      const data = await res.json();

      if (res.ok) {
        navigate('/login', { state: { message: 'Registration successful. Please log in.' } });
      } else {
        setError(data.error || 'Registration failed');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white border border-zinc-200 rounded-2xl p-8 shadow-xl"
      >
        <div className="text-center mb-8">
          <div className="h-12 w-12 bg-zinc-900 rounded-lg flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">M</div>
          <h1 className="text-2xl font-serif text-zinc-900 mb-2">Join Matrix360</h1>
          <p className="text-zinc-500 text-sm">Strategic Intelligence Operating System</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-100 text-red-600 p-3 rounded-lg mb-6 text-xs font-bold uppercase tracking-wider">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-6">
          <div className="grid grid-cols-2 gap-3 p-1 bg-zinc-100 rounded-xl mb-6">
            <button
              type="button"
              onClick={() => setUserType('ENTERPRISE')}
              className={cn(
                "flex items-center justify-center gap-2 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all",
                userType === 'ENTERPRISE' ? "bg-white text-zinc-900 shadow-sm" : "text-zinc-400 hover:text-zinc-600"
              )}
            >
              <Building2 className="w-3.5 h-3.5" />
              Enterprise
            </button>
            <button
              type="button"
              onClick={() => setUserType('CONSULTANT')}
              className={cn(
                "flex items-center justify-center gap-2 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all",
                userType === 'CONSULTANT' ? "bg-white text-zinc-900 shadow-sm" : "text-zinc-400 hover:text-zinc-600"
              )}
            >
              <UserCircle className="w-3.5 h-3.5" />
              Consultant
            </button>
          </div>

          {userType === 'ENTERPRISE' && (
            <div>
              <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-2">Organization Name</label>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                <input
                  type="text"
                  value={orgName}
                  onChange={(e) => setOrgName(e.target.value)}
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-xl py-3 pl-10 pr-4 text-zinc-900 placeholder:text-zinc-300 focus:outline-none focus:border-zinc-900 transition-colors text-sm"
                  placeholder="Acme Industries"
                  required
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-2">
              {userType === 'ENTERPRISE' ? 'Admin Email' : 'Professional Email'}
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-zinc-50 border border-zinc-200 rounded-xl py-3 pl-10 pr-4 text-zinc-900 placeholder:text-zinc-300 focus:outline-none focus:border-zinc-900 transition-colors text-sm"
                placeholder="name@company.com"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-zinc-50 border border-zinc-200 rounded-xl py-3 pl-10 pr-4 text-zinc-900 placeholder:text-zinc-300 focus:outline-none focus:border-zinc-900 transition-colors text-sm"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-zinc-900 hover:bg-zinc-800 disabled:opacity-50 text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2 group text-xs uppercase tracking-[0.2em]"
          >
            {loading ? 'Processing...' : 'Create Account'}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <p className="text-center text-zinc-400 text-xs">
            Already have an account? <Link to="/login" className="text-zinc-900 font-bold hover:underline">Sign in</Link>
          </p>
        </form>
      </motion.div>
    </div>
  );
};

export default Register;
