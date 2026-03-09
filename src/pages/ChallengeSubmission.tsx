import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/src/components/ui/Card';
import { Button } from '@/src/components/ui/Button';
import { Input, Textarea } from '@/src/components/ui/Input';
import { Target, BrainCircuit, ArrowRight, Shield, CheckCircle2 } from 'lucide-react';

export default function ChallengeSubmission() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call and AI processing
    setTimeout(() => {
      setIsSubmitting(false);
      navigate('/enterprise/match');
    }, 2000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-5xl mx-auto space-y-8"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 border-b border-border-light pb-8">
        <div className="flex items-start space-x-5">
          <div className="h-14 w-14 rounded-xl bg-interaction-primary/10 flex items-center justify-center flex-shrink-0 border border-interaction-primary/20">
            <Target className="h-7 w-7 text-interaction-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-heading font-bold text-text-main mb-2">Define Strategic Challenge</h1>
            <p className="text-text-muted text-lg max-w-2xl">Articulate your organizational objective to initiate the expert matching process and establish a secure collaboration workspace.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="bg-white border-border-light shadow-sm">
            <CardHeader className="border-b border-border-light pb-6 mb-6">
              <CardTitle className="text-xl">Challenge Parameters</CardTitle>
              <CardDescription className="text-base">Provide detailed context to ensure alignment with the most relevant strategic advisors.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-3">
                  <label className="text-sm font-bold text-text-main uppercase tracking-wider">Initiative Title</label>
                  <Input required placeholder="e.g., APAC Market Entry Strategy Q4" className="h-12 text-base" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label className="text-sm font-bold text-text-main uppercase tracking-wider">Industry Context</label>
                    <select required className="flex h-12 w-full rounded-md border border-border-light bg-white px-4 py-2 text-base text-text-main focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-interaction-primary transition-shadow">
                      <option value="">Select Industry...</option>
                      <option value="technology">Technology & Software</option>
                      <option value="healthcare">Healthcare & Life Sciences</option>
                      <option value="finance">Financial Services</option>
                      <option value="manufacturing">Advanced Manufacturing</option>
                      <option value="energy">Energy & Utilities</option>
                      <option value="retail">Retail & Consumer Goods</option>
                    </select>
                  </div>
                  <div className="space-y-3">
                    <label className="text-sm font-bold text-text-main uppercase tracking-wider">Target Region</label>
                    <select required className="flex h-12 w-full rounded-md border border-border-light bg-white px-4 py-2 text-base text-text-main focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-interaction-primary transition-shadow">
                      <option value="">Select Region...</option>
                      <option value="global">Global / Multi-Region</option>
                      <option value="na">North America</option>
                      <option value="emea">EMEA</option>
                      <option value="apac">APAC</option>
                      <option value="latam">LATAM</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-bold text-text-main uppercase tracking-wider">Strategic Problem Description</label>
                  <Textarea required placeholder="Describe the core issue, current state, and why external expertise is needed..." className="min-h-[160px] text-base p-4" />
                  <p className="text-xs text-text-muted">Be as specific as possible regarding the challenges you are facing.</p>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-bold text-text-main uppercase tracking-wider">Expected Outcome / Deliverables</label>
                  <Textarea required placeholder="What does success look like? (e.g., Go-to-market plan, risk assessment report, regulatory compliance roadmap)" className="min-h-[120px] text-base p-4" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label className="text-sm font-bold text-text-main uppercase tracking-wider">Engagement Timeline</label>
                    <select required className="flex h-12 w-full rounded-md border border-border-light bg-white px-4 py-2 text-base text-text-main focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-interaction-primary transition-shadow">
                      <option value="">Select Timeline...</option>
                      <option value="immediate">Immediate (Next 2 weeks)</option>
                      <option value="short">Short-term (1-3 months)</option>
                      <option value="medium">Medium-term (3-6 months)</option>
                      <option value="long">Long-term (6+ months)</option>
                    </select>
                  </div>
                  <div className="space-y-3">
                    <label className="text-sm font-bold text-text-main uppercase tracking-wider">Budget Allocation</label>
                    <select required className="flex h-12 w-full rounded-md border border-border-light bg-white px-4 py-2 text-base text-text-main focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-interaction-primary transition-shadow">
                      <option value="">Select Budget Range...</option>
                      <option value="tier1">$10k - $50k</option>
                      <option value="tier2">$50k - $150k</option>
                      <option value="tier3">$150k - $500k</option>
                      <option value="tier4">$500k+</option>
                    </select>
                  </div>
                </div>

                <div className="pt-8 border-t border-border-light flex items-center justify-between">
                  <div className="flex items-center text-sm text-text-muted">
                    <Shield className="h-4 w-4 mr-2 text-interaction-primary" />
                    Information is securely encrypted.
                  </div>
                  <Button 
                    type="submit" 
                    className="h-12 px-8 text-base shadow-sm"
                    isLoading={isSubmitting}
                  >
                    {isSubmitting ? 'Analyzing Requirements...' : 'Submit & Find Experts'}
                    {!isSubmitting && <ArrowRight className="ml-2 h-5 w-5" />}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="border-border-light bg-white shadow-sm">
            <CardHeader className="pb-4 border-b border-border-light">
              <CardTitle className="flex items-center text-lg text-text-main">
                <BrainCircuit className="mr-2 h-5 w-5 text-interaction-primary" />
                Intelligent Matching
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="text-sm text-text-muted mb-6 leading-relaxed">
                Our matching engine analyzes your challenge parameters against our curated network of strategic advisors to identify the optimal fit based on industry experience, functional expertise, and availability.
              </p>
              <ul className="space-y-4 text-sm text-text-main font-medium">
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-alert-opportunity mr-3 flex-shrink-0" />
                  <span>Precise alignment with strategic goals</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-alert-opportunity mr-3 flex-shrink-0" />
                  <span>Access to vetted, high-caliber experts</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-alert-opportunity mr-3 flex-shrink-0" />
                  <span>Secure collaboration environment</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-white border-border-light shadow-sm">
            <CardHeader className="pb-4 border-b border-border-light">
              <CardTitle className="text-lg text-text-main">Example Challenges</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-gray-50 border border-border-light cursor-pointer hover:border-interaction-primary/30 hover:bg-white transition-all group">
                  <h4 className="text-sm font-bold text-text-main mb-2 group-hover:text-interaction-primary transition-colors">Regulatory Compliance Strategy</h4>
                  <p className="text-xs text-text-muted leading-relaxed">Navigating new EU AI Act requirements for enterprise software deployments.</p>
                </div>
                <div className="p-4 rounded-lg bg-gray-50 border border-border-light cursor-pointer hover:border-interaction-primary/30 hover:bg-white transition-all group">
                  <h4 className="text-sm font-bold text-text-main mb-2 group-hover:text-interaction-primary transition-colors">Supply Chain Resilience</h4>
                  <p className="text-xs text-text-muted leading-relaxed">Mitigating geopolitical risks and restructuring semiconductor manufacturing logistics.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  );
}
