import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/src/components/ui/Card';
import { Button } from '@/src/components/ui/Button';
import { Badge } from '@/src/components/ui/Badge';
import { Input, Textarea } from '@/src/components/ui/Input';
import { 
  Target, BrainCircuit, ArrowRight, Shield, 
  CheckCircle2, Info, Sparkles, Rocket, 
  Globe, Briefcase, Clock, Zap,
  Search, Users, ChevronRight, MessageSquare,
  Video, Layout, ArrowLeft, Loader2, Layers,
  Network, Lightbulb, ShieldAlert, TrendingUp
} from 'lucide-react';
import { cn } from '@/src/utils/cn';
import { NetworkGraph } from '@/src/components/ui/Charts';

const TRANSFORMATION_SCOPES = [
  { id: 'market-entry', label: 'Market Entry', icon: Globe, description: 'Strategic expansion into new geographic or vertical markets.' },
  { id: 'ai-strategy', label: 'AI Strategy', icon: BrainCircuit, description: 'Harnessing generative AI and machine learning for competitive advantage.' },
  { id: 'digital-transformation', label: 'Digital Transformation', icon: Zap, description: 'Modernizing core operations and customer experiences through technology.' },
  { id: 'operational-efficiency', label: 'Operational Efficiency', icon: Target, description: 'Optimizing internal processes and resource allocation.' },
  { id: 'supply-chain', label: 'Supply Chain', icon: Briefcase, description: 'Building resilient, transparent, and agile global supply networks.' },
  { id: 'esg', label: 'ESG', icon: Shield, description: 'Integrating sustainability and social governance into core strategy.' },
];

export default function ChallengeSubmission() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [matches, setMatches] = useState<any[]>([]);
  const [isLoadingMatches, setIsLoadingMatches] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState<any>(null);
  const [isLoadingAnalysis, setIsLoadingAnalysis] = useState(false);
  
  const [formData, setFormData] = useState({
    // Step 1
    title: '',
    goal: '',
    industry: '',
    region: '',
    timeline: '6-12 Months',
    // Step 2
    marketConditions: '',
    competitiveLandscape: '',
    regulatoryEnvironment: '',
    internalConstraints: '',
    // Step 3
    scope: [] as string[],
    // Step 4
    selectedConsultants: [] as number[],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const toggleScope = (scopeId: string) => {
    setFormData(prev => ({
      ...prev,
      scope: prev.scope.includes(scopeId) 
        ? prev.scope.filter(id => id !== scopeId)
        : [...prev.scope, scopeId]
    }));
  };

  const fetchMatches = async () => {
    setIsLoadingMatches(true);
    try {
      // Mocking expert matching based on industry and scope
      await new Promise(resolve => setTimeout(resolve, 1500));
      const mockMatches = [
        { consultant_id: 1, name: 'Stephen Raj', title: 'Senior Strategic Consultant', industry_expertise: 'AI Strategy, Digital Transformation', profile_photo: '/Stephen.jpg' },
      ];
      setMatches(mockMatches);
    } catch (error) {
      console.error('Failed to fetch matches:', error);
    } finally {
      setIsLoadingMatches(false);
    }
  };

  const runAiAnalysis = async () => {
    setIsLoadingAnalysis(true);
    try {
      // Mocking AI analysis generation
      await new Promise(resolve => setTimeout(resolve, 2000));
      setAiAnalysis({
        insights: [
          "Market volatility in the APAC region presents a 15% risk to traditional supply chains.",
          "AI integration could improve operational efficiency by up to 22% within the first 12 months.",
          "Regulatory shifts in data privacy will require a complete audit of current digital assets."
        ],
        risks: [
          "High: Regional regulatory compliance complexity.",
          "Medium: Internal resource allocation constraints.",
          "Low: Technical debt in legacy systems."
        ],
        opportunities: [
          "First-mover advantage in AI-driven logistics.",
          "Significant cost reduction through automated governance.",
          "Enhanced brand value through ESG-aligned operations."
        ]
      });
    } catch (error) {
      console.error('Failed to run AI analysis:', error);
    } finally {
      setIsLoadingAnalysis(false);
    }
  };

  useEffect(() => {
    if (step === 4) {
      runAiAnalysis();
    }
    if (step === 5) {
      fetchMatches();
    }
  }, [step]);

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const handleFinalize = async () => {
    setIsSubmitting(true);
    try {
      // Simulate API calls for room creation
      await new Promise(resolve => setTimeout(resolve, 2000));
      setStep(6);
    } catch (error) {
      console.error('Failed to finalize transformation:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getAiSuggestion = () => {
    switch(step) {
      case 1:
        return formData.industry 
          ? `For the ${formData.industry} sector, focusing on ${formData.region || 'global'} markets requires a robust timeline of at least 12 months for full transformation.`
          : "I recommend specifying your target industry to help me tailor the strategic objective suggestions.";
      case 2:
        return `Analyzing ${formData.marketConditions ? 'your market context' : 'market signals'}... Regulatory compliance in ${formData.region || 'your target region'} is currently a high-impact factor.`;
      case 3:
        return formData.scope.includes('ai-strategy') 
          ? "Integrating AI Strategy with Operational Efficiency typically accelerates ROI by 24% in your sector."
          : "Consider adding 'AI Strategy' to future-proof your transformation pillars.";
      case 4:
        return "I am synthesizing global intelligence signals to generate initial insights for your program.";
      case 5:
        return `I've identified ${matches.length} experts with high-alignment scores for ${formData.industry} in ${formData.region}.`;
      case 6:
        return "Transformation program initialized. Strategy Room is now live with pre-configured intelligence agents.";
      default:
        return "Ready to assist with your strategic transformation.";
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      {/* Header & Progress */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold text-text-main flex items-center gap-3">
            <Rocket className="h-8 w-8 text-interaction-primary" />
            Initiate Enterprise Transformation
          </h1>
          <p className="text-text-muted text-sm mt-1">Guided strategic project configuration and expert matching.</p>
        </div>
        <div className="flex items-center gap-3">
          {[1, 2, 3, 4, 5, 6].map((s) => (
            <div key={s} className="flex flex-col items-center gap-1.5">
              <div 
                className={cn(
                  "h-2 w-10 rounded-full transition-all duration-500",
                  s < step ? "bg-emerald-500" : s === step ? "bg-interaction-primary shadow-[0_0_10px_rgba(47,91,255,0.4)]" : "bg-secondary-bg border border-panel-border"
                )} 
              />
              <span className={cn("text-[8px] font-bold uppercase tracking-widest", s === step ? "text-interaction-primary" : "text-text-muted")}>
                Step {s}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Content Area */}
        <div className="lg:col-span-8">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div 
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <Card className="border-panel-border bg-panel-bg shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Target className="h-5 w-5 text-interaction-primary" />
                      Step 1: Strategic Objective
                    </CardTitle>
                    <CardDescription>Define the high-level goals of your transformation initiative.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Initiative Title</label>
                      <Input 
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="e.g., Global Supply Chain Resilience 2026" 
                        className="h-12 text-base font-medium"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Strategic Goal</label>
                      <Textarea 
                        name="goal"
                        value={formData.goal}
                        onChange={handleChange}
                        placeholder="What is the primary objective of this project?" 
                        className="min-h-[100px] text-sm p-4 bg-secondary-bg border-panel-border"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Industry</label>
                        <select 
                          name="industry"
                          value={formData.industry}
                          onChange={handleChange}
                          className="flex h-10 w-full rounded-md border border-panel-border bg-secondary-bg px-3 py-1 text-sm text-text-main focus:outline-none focus:border-interaction-primary transition-colors"
                        >
                          <option value="">Select Industry</option>
                          <option value="Technology">Technology</option>
                          <option value="Healthcare">Healthcare</option>
                          <option value="Finance">Finance</option>
                          <option value="Manufacturing">Manufacturing</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Region</label>
                        <select 
                          name="region"
                          value={formData.region}
                          onChange={handleChange}
                          className="flex h-10 w-full rounded-md border border-panel-border bg-secondary-bg px-3 py-1 text-sm text-text-main focus:outline-none focus:border-interaction-primary transition-colors"
                        >
                          <option value="">Select Region</option>
                          <option value="Global">Global</option>
                          <option value="APAC">APAC</option>
                          <option value="EMEA">EMEA</option>
                          <option value="North America">North America</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Timeline</label>
                        <select 
                          name="timeline"
                          value={formData.timeline}
                          onChange={handleChange}
                          className="flex h-10 w-full rounded-md border border-panel-border bg-secondary-bg px-3 py-1 text-sm text-text-main focus:outline-none focus:border-interaction-primary transition-colors"
                        >
                          <option value="3-6 Months">3-6 Months</option>
                          <option value="6-12 Months">6-12 Months</option>
                          <option value="12-24 Months">12-24 Months</option>
                        </select>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <div className="flex justify-end">
                  <Button onClick={nextStep} className="h-12 px-8 bg-interaction-primary text-white hover:bg-interaction-primary/90">
                    Next: Strategic Context
                    <ChevronRight className="ml-2 h-4 w-4" />
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
                className="space-y-6"
              >
                <Card className="border-panel-border bg-panel-bg shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Layout className="h-5 w-5 text-interaction-primary" />
                      Step 2: Strategic Context
                    </CardTitle>
                    <CardDescription>Provide details about the environment surrounding this initiative.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Market Conditions</label>
                        <Textarea 
                          name="marketConditions"
                          value={formData.marketConditions}
                          onChange={handleChange}
                          placeholder="Current market trends and shifts..." 
                          className="min-h-[100px] text-sm p-4 bg-secondary-bg border-panel-border"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Competitive Landscape</label>
                        <Textarea 
                          name="competitiveLandscape"
                          value={formData.competitiveLandscape}
                          onChange={handleChange}
                          placeholder="Key competitors and their recent moves..." 
                          className="min-h-[100px] text-sm p-4 bg-secondary-bg border-panel-border"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Regulatory Environment</label>
                        <Textarea 
                          name="regulatoryEnvironment"
                          value={formData.regulatoryEnvironment}
                          onChange={handleChange}
                          placeholder="Relevant laws, compliance requirements..." 
                          className="min-h-[100px] text-sm p-4 bg-secondary-bg border-panel-border"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Internal Constraints</label>
                        <Textarea 
                          name="internalConstraints"
                          value={formData.internalConstraints}
                          onChange={handleChange}
                          placeholder="Budget, resource, or cultural limitations..." 
                          className="min-h-[100px] text-sm p-4 bg-secondary-bg border-panel-border"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <div className="flex justify-between">
                  <Button onClick={prevStep} variant="secondary" className="h-12 px-8">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                  </Button>
                  <Button onClick={nextStep} className="h-12 px-8 bg-interaction-primary text-white hover:bg-interaction-primary/90">
                    Next: Transformation Scope
                    <ChevronRight className="ml-2 h-4 w-4" />
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
                className="space-y-6"
              >
                <Card className="border-panel-border bg-panel-bg shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Layers className="h-5 w-5 text-interaction-primary" />
                      Step 3: Transformation Scope
                    </CardTitle>
                    <CardDescription>Select the core pillars of your transformation program.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {TRANSFORMATION_SCOPES.map((scope) => (
                        <button
                          key={scope.id}
                          onClick={() => toggleScope(scope.id)}
                          className={cn(
                            "flex flex-col items-center justify-center p-6 rounded-2xl border-2 transition-all text-center gap-3",
                            formData.scope.includes(scope.id)
                              ? "bg-interaction-primary/5 border-interaction-primary shadow-md"
                              : "bg-secondary-bg border-panel-border hover:border-interaction-primary/30"
                          )}
                        >
                          <div className={cn(
                            "p-3 rounded-xl mb-2",
                            formData.scope.includes(scope.id) ? "bg-interaction-primary text-white" : "bg-white text-text-muted"
                          )}>
                            <scope.icon className="h-6 w-6" />
                          </div>
                          <span className={cn(
                            "text-xs font-bold mb-1",
                            formData.scope.includes(scope.id) ? "text-interaction-primary" : "text-text-main"
                          )}>{scope.label}</span>
                          <p className="text-[10px] text-text-muted leading-tight">{scope.description}</p>
                        </button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                <div className="flex justify-between">
                  <Button onClick={prevStep} variant="secondary" className="h-12 px-8">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                  </Button>
                  <Button 
                    onClick={nextStep} 
                    disabled={formData.scope.length === 0}
                    className="h-12 px-8 bg-interaction-primary text-white hover:bg-interaction-primary/90 disabled:opacity-50"
                  >
                    Next: Expert Matching
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div 
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <Card className="border-panel-border bg-panel-bg shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-ai-cyan" />
                      Step 4: AI Strategic Analysis
                    </CardTitle>
                    <CardDescription>Synthesizing initial insights based on your strategic context.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {isLoadingAnalysis ? (
                      <div className="flex flex-col items-center justify-center py-12 gap-4">
                        <Loader2 className="h-8 w-8 text-ai-cyan animate-spin" />
                        <p className="text-sm text-text-muted">Generating strategic intelligence model...</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <h4 className="text-xs font-bold text-text-main flex items-center gap-2">
                            <Lightbulb className="h-4 w-4 text-ai-cyan" />
                            Strategic Insights
                          </h4>
                          <div className="space-y-3">
                            {aiAnalysis?.insights.map((insight: string, i: number) => (
                              <div key={i} className="p-3 rounded-xl bg-ai-cyan/5 border border-ai-cyan/10 text-xs text-text-secondary leading-relaxed">
                                {insight}
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="space-y-6">
                          <div className="space-y-3">
                            <h4 className="text-xs font-bold text-text-main flex items-center gap-2">
                              <ShieldAlert className="h-4 w-4 text-alert-risk" />
                              Identified Risks
                            </h4>
                            <div className="space-y-2">
                              {aiAnalysis?.risks.map((risk: string, i: number) => (
                                <div key={i} className="flex items-center gap-2 text-[11px] text-text-muted">
                                  <div className="h-1.5 w-1.5 rounded-full bg-alert-risk" />
                                  {risk}
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="space-y-3">
                            <h4 className="text-xs font-bold text-text-main flex items-center gap-2">
                              <TrendingUp className="h-4 w-4 text-emerald-500" />
                              Opportunities
                            </h4>
                            <div className="space-y-2">
                              {aiAnalysis?.opportunities.map((opp: string, i: number) => (
                                <div key={i} className="flex items-center gap-2 text-[11px] text-text-muted">
                                  <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                  {opp}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
                <div className="flex justify-between">
                  <Button onClick={prevStep} variant="secondary" className="h-12 px-8">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                  </Button>
                  <Button onClick={nextStep} className="h-12 px-8 bg-interaction-primary text-white hover:bg-interaction-primary/90">
                    Next: Expert Matching
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            )}

            {step === 5 && (
              <motion.div 
                key="step5"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <Card className="border-panel-border bg-panel-bg shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Users className="h-5 w-5 text-interaction-primary" />
                      Step 5: Expert Matching
                    </CardTitle>
                    <CardDescription>We've identified the top consultants for your transformation scope.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {isLoadingMatches ? (
                      <div className="flex flex-col items-center justify-center py-12 gap-4">
                        <Loader2 className="h-8 w-8 text-interaction-primary animate-spin" />
                        <p className="text-sm text-text-muted">Analyzing expert network for optimal alignment...</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {matches.map((consultant) => (
                          <div 
                            key={consultant.consultant_id}
                            className={cn(
                              "p-4 rounded-2xl border transition-all flex items-center gap-4 cursor-pointer group",
                              formData.selectedConsultants.includes(consultant.consultant_id)
                                ? "bg-interaction-primary/5 border-interaction-primary"
                                : "bg-white border-panel-border hover:border-interaction-primary/30"
                            )}
                            onClick={() => {
                              setFormData(prev => ({
                                ...prev,
                                selectedConsultants: prev.selectedConsultants.includes(consultant.consultant_id)
                                  ? prev.selectedConsultants.filter(id => id !== consultant.consultant_id)
                                  : [...prev.selectedConsultants, consultant.consultant_id]
                              }));
                            }}
                          >
                            <img 
                              src={consultant.profile_photo || `https://picsum.photos/seed/expert${consultant.consultant_id}/100/100`} 
                              className="h-14 w-14 rounded-xl object-cover border border-panel-border"
                              referrerPolicy="no-referrer"
                            />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <h4 className="text-sm font-bold text-text-main group-hover:text-interaction-primary transition-colors">{consultant.name}</h4>
                                <Badge variant="secondary" className="text-[9px] bg-emerald-100 text-emerald-700 border-none">
                                  {Math.floor(Math.random() * 10) + 90}% Match
                                </Badge>
                              </div>
                              <p className="text-xs text-text-muted mb-1">{consultant.title}</p>
                              <div className="flex flex-wrap gap-1.5">
                                {consultant.industry_expertise.split(',').slice(0, 2).map((exp: string) => (
                                  <span key={exp} className="text-[9px] font-bold text-text-muted uppercase tracking-wider bg-gray-100 px-1.5 py-0.5 rounded">
                                    {exp.trim()}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <div className={cn(
                              "h-5 w-5 rounded-full border-2 flex items-center justify-center transition-all",
                              formData.selectedConsultants.includes(consultant.consultant_id)
                                ? "bg-interaction-primary border-interaction-primary text-white"
                                : "border-panel-border"
                            )}>
                              {formData.selectedConsultants.includes(consultant.consultant_id) && <CheckCircle2 className="h-3 w-3" />}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
                <div className="flex justify-between">
                  <Button onClick={prevStep} variant="secondary" className="h-12 px-8">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                  </Button>
                  <Button 
                    onClick={handleFinalize} 
                    disabled={formData.selectedConsultants.length === 0 || isSubmitting}
                    className="h-12 px-8 bg-interaction-primary text-white hover:bg-interaction-primary/90 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Provisioning Room...
                      </>
                    ) : (
                      <>
                        Finalize & Create Strategy Room
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>
              </motion.div>
            )}

            {step === 6 && (
              <motion.div 
                key="step6"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-12 space-y-8 text-center"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-interaction-primary blur-3xl opacity-20 animate-pulse"></div>
                  <div className="relative h-24 w-24 rounded-full bg-interaction-primary flex items-center justify-center shadow-2xl shadow-interaction-primary/40">
                    <CheckCircle2 className="h-12 w-12 text-white" />
                  </div>
                </div>
                
                <div className="space-y-3 max-w-lg">
                  <h2 className="text-3xl font-heading font-bold text-text-main">Project Initialized</h2>
                  <p className="text-text-muted leading-relaxed">
                    Your transformation initiative <strong>"{formData.title}"</strong> has been successfully configured. A dedicated Strategy Room has been provisioned for collaboration with your selected experts.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-2xl">
                  <div className="p-4 rounded-2xl bg-white border border-panel-border text-left">
                    <Users className="h-5 w-5 text-interaction-primary mb-2" />
                    <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Team</p>
                    <p className="text-sm font-bold text-text-main">{formData.selectedConsultants.length} Experts</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-white border border-panel-border text-left">
                    <BrainCircuit className="h-5 w-5 text-ai-violet mb-2" />
                    <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest">AI Agents</p>
                    <p className="text-sm font-bold text-text-main">3 Deployed</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-white border border-panel-border text-left">
                    <Shield className="h-5 w-5 text-emerald-500 mb-2" />
                    <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Security</p>
                    <p className="text-sm font-bold text-text-main">Encrypted</p>
                  </div>
                </div>

                <div className="w-full max-w-2xl space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-[10px] font-bold text-text-muted uppercase tracking-widest flex items-center gap-2">
                      <Network className="h-3 w-3" />
                      Strategic Knowledge Graph Snapshot
                    </h4>
                    <Badge variant="secondary" className="text-[8px]">GENERATED</Badge>
                  </div>
                  <NetworkGraph 
                    height={150}
                    nodes={[
                      { id: '1', label: formData.title || 'Initiative', x: 50, y: 50, size: 6, color: '#2F5BFF' },
                      { id: '2', label: 'Market', x: 20, y: 30, size: 4, color: '#2BB3A3' },
                      { id: '3', label: 'Regulatory', x: 80, y: 30, size: 4, color: '#E5484D' },
                      { id: '4', label: 'Competitors', x: 20, y: 70, size: 4, color: '#F59E0B' },
                      { id: '5', label: 'Internal', x: 80, y: 70, size: 4, color: '#8B5CF6' },
                    ]}
                    links={[
                      { source: '1', target: '2', value: 2 },
                      { source: '1', target: '3', value: 2 },
                      { source: '1', target: '4', value: 2 },
                      { source: '1', target: '5', value: 2 },
                    ]}
                  />
                </div>

                <div className="flex gap-4">
                  <Link to="/strategy-room">
                    <Button className="h-14 px-10 bg-interaction-primary text-white hover:bg-interaction-primary/90 text-lg font-bold shadow-xl shadow-interaction-primary/20">
                      Enter Strategy Room
                      <Video className="ml-3 h-5 w-5" />
                    </Button>
                  </Link>
                  <Link to="/enterprise/dashboard">
                    <Button variant="secondary" className="h-14 px-8 text-lg font-bold">
                      Dashboard
                    </Button>
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Sidebar - AI Assistant & Context */}
        <div className="lg:col-span-4 space-y-6">
          <Card className="border-panel-border bg-panel-bg shadow-sm overflow-hidden">
            <div className="h-1 bg-interaction-primary"></div>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-interaction-primary" />
                AI Strategy Assistant
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-interaction-primary/5 border border-interaction-primary/10 rounded-xl relative">
                <div className="absolute -top-2 -left-2">
                  <div className="h-6 w-6 rounded-full bg-interaction-primary flex items-center justify-center text-[8px] text-white font-bold">AI</div>
                </div>
                <p className="text-xs text-text-main leading-relaxed italic">
                  "{getAiSuggestion()}"
                </p>
              </div>
              
              {step < 4 && (
                <div className="space-y-3">
                  <h4 className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Strategic Insights</h4>
                  <div className="space-y-2">
                    {[
                      'Industry benchmark analysis',
                      'Regional risk assessment',
                      'Resource optimization model'
                    ].map((insight, i) => (
                      <div key={i} className="flex items-center gap-2 text-[10px] text-text-muted">
                        <div className="h-1 w-1 rounded-full bg-interaction-primary" />
                        {insight}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-100">
                  <div className="flex items-center gap-2 mb-1">
                    <Shield className="h-3 w-3 text-emerald-600" />
                    <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider">Verification Active</span>
                  </div>
                  <p className="text-[10px] text-emerald-600 leading-relaxed">
                    All suggested experts have been pre-vetted for your specific transformation scope.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="border-panel-border bg-panel-bg shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <Info className="h-4 w-4 text-interaction-primary" />
                Program Governance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {[
                  { label: 'Confidentiality', icon: Shield },
                  { label: 'Expert Vetting', icon: CheckCircle2 },
                  { label: 'IP Protection', icon: Target },
                  { label: 'Global Compliance', icon: Globe }
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-[10px] text-text-muted">
                    <item.icon className="h-3.5 w-3.5 text-interaction-primary/60" />
                    {item.label}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export { ChallengeSubmission };

