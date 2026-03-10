import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';
import { Lock, Mail, ArrowRight, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [requires2FA, setRequires2FA] = useState(false);
  const [tempToken, setTempToken] = useState('');
  const [twoFactorCode, setTwoFactorCode] = useState('');
  
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        if (data.requires2FA) {
          setRequires2FA(true);
          setTempToken(data.tempToken);
        } else {
          login(data.user);
          navigate('/dashboard');
        }
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handle2FAVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/2fa/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: twoFactorCode, tempToken }),
      });

      const data = await res.json();

      if (res.ok) {
        login(data.user);
        navigate('/dashboard');
      } else {
        setError(data.error || 'Invalid 2FA code');
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
          <h1 className="text-2xl font-serif text-zinc-900 mb-2">Matrix360</h1>
          <p className="text-zinc-500 text-sm">Strategic Intelligence Operating System</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-100 text-red-600 p-3 rounded-lg mb-6 text-xs font-bold uppercase tracking-wider">
            {error}
          </div>
        )}

        {!requires2FA ? (
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-2">Email Address</label>
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
              {loading ? 'Authenticating...' : 'Sign In'}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <p className="text-center text-zinc-400 text-xs">
              Don't have an account? <Link to="/register" className="text-zinc-900 font-bold hover:underline">Register your organization</Link>
            </p>
          </form>
        ) : (
          <form onSubmit={handle2FAVerify} className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-xl font-serif text-zinc-900 mb-2">Verify Identity</h2>
              <p className="text-zinc-500 text-sm">Enter the 6-digit code from your authenticator app.</p>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-2">Verification Code</label>
              <input
                type="text"
                value={twoFactorCode}
                onChange={(e) => setTwoFactorCode(e.target.value)}
                className="w-full bg-zinc-50 border border-zinc-200 rounded-xl py-4 text-center text-2xl tracking-[0.5em] text-zinc-900 focus:outline-none focus:border-zinc-900 transition-colors font-mono"
                placeholder="000000"
                maxLength={6}
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-zinc-900 hover:bg-zinc-800 disabled:opacity-50 text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2 text-xs uppercase tracking-[0.2em]"
            >
              {loading ? 'Verifying...' : 'Verify & Continue'}
            </button>

            <button
              type="button"
              onClick={() => setRequires2FA(false)}
              className="w-full text-zinc-400 hover:text-zinc-900 text-xs font-bold uppercase tracking-widest transition-colors"
            >
              Back to login
            </button>
          </form>
        )}
      </motion.div>
    </div>
  );
};

export default Login;
