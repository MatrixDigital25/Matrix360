import React, { useState, useEffect } from 'react';
import { Shield, Smartphone, CheckCircle2, AlertCircle, Copy, Check } from 'lucide-react';
import { motion } from 'motion/react';

const SecuritySettings: React.FC = () => {
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  const [showSetup, setShowSetup] = useState(false);
  const [qrCode, setQrCode] = useState('');
  const [secret, setSecret] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Check if 2FA is enabled
    fetch('/api/auth/me')
      .then(res => res.json())
      .then(data => {
        // In a real app, the /me endpoint would return 2fa status
        // For now we'll assume it's based on the user object
      });
  }, []);

  const handleStartSetup = async () => {
    try {
      const res = await fetch('/api/auth/2fa/setup', { method: 'POST' });
      const data = await res.json();
      if (res.ok) {
        setQrCode(data.qrCodeUrl);
        setSecret(data.secret);
        setShowSetup(true);
      }
    } catch (err) {
      setError('Failed to start 2FA setup');
    }
  };

  const handleVerify = async () => {
    setError('');
    try {
      const res = await fetch('/api/auth/2fa/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: verificationCode }),
      });
      if (res.ok) {
        setIs2FAEnabled(true);
        setShowSetup(false);
        setSuccess('Two-factor authentication enabled successfully!');
      } else {
        setError('Invalid verification code');
      }
    } catch (err) {
      setError('Verification failed');
    }
  };

  const copySecret = () => {
    navigator.clipboard.writeText(secret);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
        <div className="flex items-start justify-between mb-6">
          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
              <Shield className="w-6 h-6 text-emerald-500" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Two-Factor Authentication (2FA)</h3>
              <p className="text-white/40 text-sm">Add an extra layer of security to your account.</p>
            </div>
          </div>
          <div className={`px-3 py-1 rounded-full text-xs font-medium ${is2FAEnabled ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' : 'bg-white/5 text-white/40 border border-white/10'}`}>
            {is2FAEnabled ? 'Enabled' : 'Disabled'}
          </div>
        </div>

        {success && (
          <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 p-4 rounded-xl mb-6 flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5" />
            <span className="text-sm font-medium">{success}</span>
          </div>
        )}

        {!is2FAEnabled && !showSetup && (
          <button
            onClick={handleStartSetup}
            className="bg-emerald-500 hover:bg-emerald-600 text-black font-bold py-2 px-6 rounded-xl transition-all"
          >
            Enable 2FA
          </button>
        )}

        {showSetup && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6 border-t border-white/10 pt-6"
          >
            <div className="grid md:grid-columns-2 gap-8">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-white font-medium">
                  <span className="w-6 h-6 rounded-full bg-emerald-500 text-black flex items-center justify-center text-xs">1</span>
                  Scan QR Code
                </div>
                <p className="text-white/40 text-sm">Scan this QR code with your authenticator app (e.g., Google Authenticator, Authy).</p>
                <div className="bg-white p-4 rounded-xl inline-block">
                  <img src={qrCode} alt="2FA QR Code" className="w-48 h-48" />
                </div>
                <div className="space-y-2">
                  <p className="text-xs text-white/20 uppercase tracking-wider font-medium">Or enter code manually</p>
                  <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-3 py-2">
                    <code className="text-emerald-500 font-mono text-sm flex-1">{secret}</code>
                    <button onClick={copySecret} className="text-white/40 hover:text-white transition-colors">
                      {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2 text-white font-medium">
                  <span className="w-6 h-6 rounded-full bg-emerald-500 text-black flex items-center justify-center text-xs">2</span>
                  Verify Code
                </div>
                <p className="text-white/40 text-sm">Enter the 6-digit code from your app to confirm setup.</p>
                
                {error && (
                  <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-3 rounded-lg text-sm flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    {error}
                  </div>
                )}

                <div className="space-y-4">
                  <input
                    type="text"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    placeholder="000000"
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white text-center text-2xl tracking-[0.5em] font-mono focus:outline-none focus:border-emerald-500/50"
                    maxLength={6}
                  />
                  <div className="flex gap-3">
                    <button
                      onClick={handleVerify}
                      className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-black font-bold py-2 rounded-xl transition-all"
                    >
                      Verify & Enable
                    </button>
                    <button
                      onClick={() => setShowSetup(false)}
                      className="flex-1 bg-white/5 hover:bg-white/10 text-white font-bold py-2 rounded-xl transition-all border border-white/10"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
            <Smartphone className="w-6 h-6 text-blue-500" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Login Sessions</h3>
            <p className="text-white/40 text-sm">Manage your active sessions and devices.</p>
            <button className="mt-4 text-white/60 hover:text-white text-sm font-medium underline underline-offset-4">
              View active sessions
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecuritySettings;
