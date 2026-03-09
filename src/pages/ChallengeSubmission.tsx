import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/src/components/ui/Card';
import { Button } from '@/src/components/ui/Button';
import { Badge } from '@/src/components/ui/Badge';
import { Input, Textarea } from '@/src/components/ui/Input';
import { Target, BrainCircuit, ArrowRight, Shield, CheckCircle2, Info, Sparkles } from 'lucide-react';

export default function ChallengeSubmission() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate AI processing
    setTimeout(() => {
      setIsSubmitting(false);
      navigate('/enterprise/match');
    }, 2500);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto space-y-6"
    >
      <div className="flex items-center justify-between mb-2">
        <div>
          <h1 className="text-2xl font-heading font-bold text-text-main">New Strategic Challenge</h1>
          <p className="text-text-muted text-sm">Define your objective to initiate expert matching.</p>
        </div>
        <div className="flex items-center gap-2">
          {[1, 2, 3].map((s) => (
            <div 
              key={s} 
              className={`h-1.5 w-8 rounded-full transition-all ${s <= step ? 'bg-interaction-primary' : 'bg-secondary-bg border border-panel-border'}`} 
            />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="border-panel-border bg-panel-bg shadow-sm">
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {step === 1 && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Initiative Title</label>
                      <Input required placeholder="e.g., APAC Market Entry Strategy Q4" className="h-10 text-sm" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Industry</label>
                        <select required className="flex h-10 w-full rounded-md border border-panel-border bg-secondary-bg px-3 py-1 text-sm text-text-main focus:outline-none focus:border-interaction-primary transition-colors">
                          <option value="">Select...</option>
                          <option value="tech">Technology</option>
                          <option value="health">Healthcare</option>
                          <option value="finance">Finance</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Region</label>
                        <select required className="flex h-10 w-full rounded-md border border-panel-border bg-secondary-bg px-3 py-1 text-sm text-text-main focus:outline-none focus:border-interaction-primary transition-colors">
                          <option value="">Select...</option>
                          <option value="global">Global</option>
                          <option value="apac">APAC</option>
                          <option value="emea">EMEA</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <Button type="button" onClick={() => setStep(2)} variant="primary" className="h-10 px-6">
                        Next Step
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Strategic Problem</label>
                      <Textarea required placeholder="Describe the core issue..." className="min-h-[120px] text-sm p-3 bg-secondary-bg border-panel-border" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Expected Outcome</label>
                      <Textarea required placeholder="What does success look like?" className="min-h-[100px] text-sm p-3 bg-secondary-bg border-panel-border" />
                    </div>
                    <div className="flex justify-between">
                      <Button type="button" onClick={() => setStep(1)} variant="secondary" className="h-10 px-6">Back</Button>
                      <Button type="button" onClick={() => setStep(3)} variant="primary" className="h-10 px-6">
                        Next Step
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Timeline</label>
                        <select required className="flex h-10 w-full rounded-md border border-panel-border bg-secondary-bg px-3 py-1 text-sm text-text-main focus:outline-none focus:border-interaction-primary transition-colors">
                          <option value="short">1-3 Months</option>
                          <option value="medium">3-6 Months</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Budget Range</label>
                        <select required className="flex h-10 w-full rounded-md border border-panel-border bg-secondary-bg px-3 py-1 text-sm text-text-main focus:outline-none focus:border-interaction-primary transition-colors">
                          <option value="t1">$10k - $50k</option>
                          <option value="t2">$50k - $150k</option>
                        </select>
                      </div>
                    </div>

                    <div className="p-4 bg-interaction-primary/5 border border-interaction-primary/20 rounded-xl flex items-start gap-3">
                      <Shield className="h-5 w-5 text-interaction-primary shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs font-bold text-text-main">Enterprise Security Active</p>
                        <p className="text-[10px] text-text-muted leading-relaxed">Your challenge data is encrypted and will only be shared with high-confidence expert matches under NDA.</p>
                      </div>
                    </div>

                    <div className="flex justify-between pt-4">
                      <Button type="button" onClick={() => setStep(2)} variant="secondary" className="h-10 px-6">Back</Button>
                      <Button 
                        type="submit" 
                        variant="primary" 
                        className="h-10 px-8"
                        isLoading={isSubmitting}
                      >
                        {isSubmitting ? 'Analyzing Requirements...' : 'Submit & Find Experts'}
                      </Button>
                    </div>
                  </motion.div>
                )}
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="border-panel-border bg-panel-bg">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-interaction-primary" />
                AI Assistant
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-[11px] text-text-muted leading-relaxed">
                I can help you refine your challenge to get better expert matches. Try to be specific about your regional constraints.
              </p>
              <div className="space-y-2">
                <h4 className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Suggested Tags</h4>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="text-[9px] cursor-pointer hover:bg-interaction-primary/10 transition-colors">Market Entry</Badge>
                  <Badge variant="secondary" className="text-[9px] cursor-pointer hover:bg-interaction-primary/10 transition-colors">Supply Chain</Badge>
                  <Badge variant="secondary" className="text-[9px] cursor-pointer hover:bg-interaction-primary/10 transition-colors">Compliance</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-panel-border bg-panel-bg">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <Info className="h-4 w-4 text-interaction-primary" />
                Matching Logic
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {[
                  'Industry alignment check',
                  'Functional expertise scan',
                  'Regional presence verify',
                  'Availability synchronization'
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-[10px] text-text-muted">
                    <CheckCircle2 className="h-3 w-3 text-alert-opportunity" />
                    {item}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  );
}
