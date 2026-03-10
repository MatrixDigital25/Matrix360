import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Building2, UserCircle, Target, 
  Sparkles, ArrowRight, ArrowLeft, 
  CheckCircle2, Globe, Cpu, 
  Zap, Briefcase, ShieldCheck 
} from 'lucide-react';
import { useAuth } from '@/src/utils/AuthContext';
import { cn } from '@/src/utils/cn';
import { Button } from '@/src/components/ui/Button';

const Onboarding: React.FC = () => {
  const { user, refreshUser } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  // Enterprise State
  const [enterpriseData, setEnterpriseData] = useState({
    name: '',
    industry: 'Technology',
    region: 'Global',
    priorities: ''
  });

  const [challengeData, setChallengeData] = useState({
    description: '',
    objective: '',
    timeline: '6 months'
  });

  const [agentData, setAgentData] = useState({
    name: 'Strategic Analyst Alpha',
    type: 'ANALYST',
    config: { focus: 'Market Trends' }
  });

  // Consultant State
  const [consultantData, setConsultantData] = useState({
    name: '',
    title: '',
    domain: 'Strategy',
    industry_expertise: '',
    specialization: '',
    geographies: ['Global'],
    years_experience: 10,
    bio: '',
    hourly_rate: 250
  });

  const handleEnterpriseOnboarding = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/onboarding/enterprise', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          enterprise: enterpriseData,
          challenge: challengeData,
          agent: agentData
        })
      });
      if (res.ok) {
        await refreshUser();
        navigate('/');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleConsultantOnboarding = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/onboarding/consultant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          profile: consultantData
        })
      });
      if (res.ok) {
        await refreshUser();
        navigate('/');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  if (!user) return null;

  const isEnterprise = user.user_type === 'ENTERPRISE';

  return (
    <div className="min-h-screen bg-zinc-50 flex items-center justify-center p-6">
      <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-5 gap-10">
        
        {/* Progress Sidebar */}
        <div className="lg:col-span-2 space-y-8 py-8">
          <div className="space-y-2">
            <div className="h-10 w-10 bg-zinc-900 rounded-lg flex items-center justify-center text-white font-bold text-xl mb-4">M</div>
            <h1 className="text-3xl font-serif text-zinc-900">Onboarding</h1>
            <p className="text-zinc-500 text-sm">Setting up your Matrix360 Strategic Intelligence workspace.</p>
          </div>

          <div className="space-y-6">
            {[
              { id: 1, title: 'Identity & Profile', desc: 'Define your core identity.' },
              { id: 2, title: isEnterprise ? 'Strategic Challenge' : 'Expertise & Domain', desc: isEnterprise ? 'Set your first objective.' : 'Define your specializations.' },
              { id: 3, title: isEnterprise ? 'AI Orchestration' : 'Network Integration', desc: isEnterprise ? 'Deploy your first agent.' : 'Finalize your profile.' },
            ].map((s) => (
              <div key={s.id} className="flex gap-4 group">
                <div className={cn(
                  "h-8 w-8 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-all shrink-0",
                  step === s.id ? "border-zinc-900 bg-zinc-900 text-white" : 
                  step > s.id ? "border-emerald-500 bg-emerald-500 text-white" : "border-zinc-200 text-zinc-300"
                )}>
                  {step > s.id ? <CheckCircle2 className="h-4 w-4" /> : s.id}
                </div>
                <div className="space-y-0.5">
                  <p className={cn("text-xs font-bold uppercase tracking-widest", step >= s.id ? "text-zinc-900" : "text-zinc-300")}>{s.title}</p>
                  <p className="text-[11px] text-zinc-400">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-8 border-t border-zinc-200">
            <div className="p-4 bg-zinc-900 text-white rounded-xl space-y-3 shadow-lg">
              <div className="flex items-center gap-2 text-emerald-400">
                <ShieldCheck className="h-4 w-4" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Enterprise Secure</span>
              </div>
              <p className="text-[11px] text-zinc-400 leading-relaxed">
                Your data is isolated and protected by the Matrix360 Strategic Intelligence Operating System's enterprise-grade security protocols.
              </p>
            </div>
          </div>
        </div>

        {/* Form Area */}
        <div className="lg:col-span-3 bg-white border border-zinc-200 rounded-3xl p-8 md:p-12 shadow-xl relative overflow-hidden">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="space-y-2">
                  <h2 className="text-2xl font-serif text-zinc-900">Welcome, {user.email}</h2>
                  <p className="text-zinc-500 text-sm">Let's build your professional profile.</p>
                </div>

                <div className="space-y-6">
                  {isEnterprise ? (
                    <>
                      <div>
                        <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-2">Organization Name</label>
                        <input 
                          type="text" 
                          value={enterpriseData.name}
                          onChange={e => setEnterpriseData({...enterpriseData, name: e.target.value})}
                          className="w-full bg-zinc-50 border border-zinc-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-zinc-900 transition-all"
                          placeholder="e.g. Global Tech Solutions"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-2">Industry</label>
                          <select 
                            value={enterpriseData.industry}
                            onChange={e => setEnterpriseData({...enterpriseData, industry: e.target.value})}
                            className="w-full bg-zinc-50 border border-zinc-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-zinc-900 transition-all"
                          >
                            <option>Technology</option>
                            <option>Finance</option>
                            <option>Healthcare</option>
                            <option>Manufacturing</option>
                            <option>Energy</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-2">Region</label>
                          <select 
                            value={enterpriseData.region}
                            onChange={e => setEnterpriseData({...enterpriseData, region: e.target.value})}
                            className="w-full bg-zinc-50 border border-zinc-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-zinc-900 transition-all"
                          >
                            <option>Global</option>
                            <option>North America</option>
                            <option>Europe</option>
                            <option>APAC</option>
                            <option>EMEA</option>
                          </select>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-2">Full Name</label>
                          <input 
                            type="text" 
                            value={consultantData.name}
                            onChange={e => setConsultantData({...consultantData, name: e.target.value})}
                            className="w-full bg-zinc-50 border border-zinc-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-zinc-900 transition-all"
                            placeholder="Jane Doe"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-2">Professional Title</label>
                          <input 
                            type="text" 
                            value={consultantData.title}
                            onChange={e => setConsultantData({...consultantData, title: e.target.value})}
                            className="w-full bg-zinc-50 border border-zinc-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-zinc-900 transition-all"
                            placeholder="Senior Strategy Advisor"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-2">Core Domain</label>
                        <select 
                          value={consultantData.domain}
                          onChange={e => setConsultantData({...consultantData, domain: e.target.value})}
                          className="w-full bg-zinc-50 border border-zinc-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-zinc-900 transition-all"
                        >
                          <option>Strategy</option>
                          <option>Operations</option>
                          <option>Technology</option>
                          <option>Regulatory</option>
                          <option>M&A</option>
                        </select>
                      </div>
                    </>
                  )}
                </div>

                <div className="pt-6">
                  <Button onClick={nextStep} className="w-full bg-zinc-900 text-white h-12 rounded-xl font-bold uppercase tracking-widest flex items-center justify-center gap-2">
                    Continue <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="space-y-2">
                  <h2 className="text-2xl font-serif text-zinc-900">
                    {isEnterprise ? 'Define Strategic Challenge' : 'Expertise & Experience'}
                  </h2>
                  <p className="text-zinc-500 text-sm">
                    {isEnterprise ? 'What is the primary objective you want to achieve?' : 'Tell us about your professional background.'}
                  </p>
                </div>

                <div className="space-y-6">
                  {isEnterprise ? (
                    <>
                      <div>
                        <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-2">Challenge Description</label>
                        <textarea 
                          value={challengeData.description}
                          onChange={e => setChallengeData({...challengeData, description: e.target.value})}
                          className="w-full bg-zinc-50 border border-zinc-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-zinc-900 transition-all h-24 resize-none"
                          placeholder="Describe the problem or opportunity..."
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-2">Strategic Objective</label>
                        <input 
                          type="text" 
                          value={challengeData.objective}
                          onChange={e => setChallengeData({...challengeData, objective: e.target.value})}
                          className="w-full bg-zinc-50 border border-zinc-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-zinc-900 transition-all"
                          placeholder="e.g. Reduce operational costs by 20%"
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-2">Industry Expertise</label>
                        <input 
                          type="text" 
                          value={consultantData.industry_expertise}
                          onChange={e => setConsultantData({...consultantData, industry_expertise: e.target.value})}
                          className="w-full bg-zinc-50 border border-zinc-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-zinc-900 transition-all"
                          placeholder="e.g. Financial Services, Fintech"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-2">Years of Experience</label>
                          <input 
                            type="number" 
                            value={consultantData.years_experience}
                            onChange={e => setConsultantData({...consultantData, years_experience: parseInt(e.target.value)})}
                            className="w-full bg-zinc-50 border border-zinc-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-zinc-900 transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-2">Hourly Rate ($)</label>
                          <input 
                            type="number" 
                            value={consultantData.hourly_rate}
                            onChange={e => setConsultantData({...consultantData, hourly_rate: parseInt(e.target.value)})}
                            className="w-full bg-zinc-50 border border-zinc-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-zinc-900 transition-all"
                          />
                        </div>
                      </div>
                    </>
                  )}
                </div>

                <div className="pt-6 flex gap-4">
                  <Button variant="secondary" onClick={prevStep} className="flex-1 h-12 rounded-xl font-bold uppercase tracking-widest flex items-center justify-center gap-2">
                    <ArrowLeft className="h-4 w-4" /> Back
                  </Button>
                  <Button onClick={nextStep} className="flex-[2] bg-zinc-900 text-white h-12 rounded-xl font-bold uppercase tracking-widest flex items-center justify-center gap-2">
                    Continue <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="space-y-2">
                  <h2 className="text-2xl font-serif text-zinc-900">
                    {isEnterprise ? 'Deploy AI Agent' : 'Finalize Profile'}
                  </h2>
                  <p className="text-zinc-500 text-sm">
                    {isEnterprise ? 'Select your first strategic AI agent to assist you.' : 'Add a brief bio to complete your onboarding.'}
                  </p>
                </div>

                <div className="space-y-6">
                  {isEnterprise ? (
                    <div className="grid grid-cols-1 gap-4">
                      {[
                        { type: 'STRATEGIST', name: 'Strategic Architect', icon: Target, desc: 'Focuses on long-term planning and objective setting.' },
                        { type: 'ANALYST', name: 'Market Analyst', icon: Zap, desc: 'Synthesizes market signals and identifies trends.' },
                        { type: 'RESEARCHER', name: 'Regulatory Researcher', icon: Globe, desc: 'Monitors global policy and compliance shifts.' }
                      ].map(a => (
                        <button
                          key={a.type}
                          onClick={() => setAgentData({...agentData, type: a.type, name: a.name})}
                          className={cn(
                            "flex items-center gap-4 p-4 rounded-2xl border-2 transition-all text-left group",
                            agentData.type === a.type ? "border-zinc-900 bg-zinc-50" : "border-zinc-100 hover:border-zinc-200"
                          )}
                        >
                          <div className={cn(
                            "h-10 w-10 rounded-lg flex items-center justify-center transition-all",
                            agentData.type === a.type ? "bg-zinc-900 text-white" : "bg-zinc-100 text-zinc-400 group-hover:bg-zinc-200"
                          )}>
                            <a.icon className="h-5 w-5" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-bold text-zinc-900">{a.name}</p>
                            <p className="text-[11px] text-zinc-500">{a.desc}</p>
                          </div>
                          {agentData.type === a.type && <CheckCircle2 className="h-5 w-5 text-zinc-900" />}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div>
                      <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-2">Professional Bio</label>
                      <textarea 
                        value={consultantData.bio}
                        onChange={e => setConsultantData({...consultantData, bio: e.target.value})}
                        className="w-full bg-zinc-50 border border-zinc-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-zinc-900 transition-all h-32 resize-none"
                        placeholder="Tell enterprises why they should work with you..."
                      />
                    </div>
                  )}
                </div>

                <div className="pt-6 flex gap-4">
                  <Button variant="secondary" onClick={prevStep} className="flex-1 h-12 rounded-xl font-bold uppercase tracking-widest flex items-center justify-center gap-2">
                    <ArrowLeft className="h-4 w-4" /> Back
                  </Button>
                  <Button 
                    onClick={isEnterprise ? handleEnterpriseOnboarding : handleConsultantOnboarding} 
                    disabled={loading}
                    className="flex-[2] bg-zinc-900 text-white h-12 rounded-xl font-bold uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg shadow-zinc-900/20"
                  >
                    {loading ? 'Finalizing...' : 'Complete Setup'} 
                    {!loading && <Sparkles className="h-4 w-4" />}
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
