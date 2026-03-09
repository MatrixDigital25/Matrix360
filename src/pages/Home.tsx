import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  ArrowRight, BrainCircuit, Users, Target, 
  Activity, Shield, Globe, Zap, CheckCircle2,
  Briefcase, MessageSquare, Layers, Search,
  Lock, Building, LineChart, Network, AlertTriangle,
  Cpu, Workflow, Video, Database, Server
} from 'lucide-react';
import { Button } from '@/src/components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/src/components/ui/Card';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* 1. Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-white border-b border-border-light">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[var(--color-interaction-primary)]/15 via-[var(--color-ai-cyan)]/5 to-white"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-7xl font-heading font-bold tracking-tight text-text-main mb-6 leading-tight">
              Where Expertise <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-interaction-primary)] to-[var(--color-ai-cyan)]">Meets AI</span>
            </h1>
            <p className="text-xl md:text-2xl font-medium text-text-main mb-6">
              Matrix360 is an AI-powered consulting and automation platform that helps organizations design intelligent systems, automate strategic workflows, and collaborate with expert advisors.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10">
              <Link to="/enterprise/challenge">
                <Button variant="primary" className="h-14 px-8 text-lg w-full sm:w-auto shadow-sm">
                  Book Strategy Consultation
                </Button>
              </Link>
              <Link to="/platform">
                <Button variant="secondary" className="h-14 px-8 text-lg w-full sm:w-auto bg-white shadow-sm border-border-light hover:bg-gray-50">
                  Explore Platform
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. Platform Overview */}
      <section className="py-24 bg-secondary-bg border-b border-border-light">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading font-bold text-text-main mb-6">The Matrix360 Ecosystem</h2>
            <p className="text-xl text-text-muted max-w-3xl mx-auto leading-relaxed">
              A unified platform integrating AI agents, automation systems, consulting strategy, and enterprise workflows.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: 'AI Agents', desc: 'Deploy specialized AI models for research, analysis, and execution.', icon: Cpu },
              { title: 'Automation Systems', desc: 'Streamline complex enterprise workflows and data pipelines.', icon: Workflow },
              { title: 'Consulting Strategy', desc: 'Access elite human expertise to guide AI implementation.', icon: Briefcase },
              { title: 'Enterprise Workflows', desc: 'Integrate intelligence directly into your operational systems.', icon: Layers },
            ].map((item, i) => (
              <Card key={i} className="bg-white border-border-light hover:shadow-md transition-all duration-300 rounded-2xl text-center p-6">
                <div className="h-16 w-16 rounded-2xl bg-interaction-primary/5 flex items-center justify-center mx-auto mb-6 border border-interaction-primary/10">
                  <item.icon className="h-8 w-8 text-interaction-primary" />
                </div>
                <CardTitle className="text-xl mb-3 text-text-main">{item.title}</CardTitle>
                <CardDescription className="text-base text-text-muted">{item.desc}</CardDescription>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 3. AI Automation Layer */}
      <section className="py-24 bg-white border-b border-border-light relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--color-interaction-primary)] via-[var(--color-ai-cyan)] to-[var(--color-ai-violet)]"></div>
        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading font-bold text-text-main mb-6">AI Automation Infrastructure</h2>
            <p className="text-xl text-text-muted max-w-3xl mx-auto leading-relaxed">
              Matrix360 deploys specialized AI agents that support research automation, data analysis, workflow orchestration, and decision intelligence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { title: 'Research Agent', desc: 'Automates deep market research, regulatory scanning, and competitor analysis.', icon: Search },
              { title: 'Data Intelligence Agent', desc: 'Processes complex datasets to extract actionable strategic insights.', icon: Database },
              { title: 'Workflow Automation Agent', desc: 'Orchestrates multi-step enterprise processes across integrated systems.', icon: Workflow },
              { title: 'Strategic Insight Agent', desc: 'Synthesizes information to generate strategic frameworks and recommendations.', icon: BrainCircuit },
            ].map((agent, i) => (
              <Card key={i} className="bg-secondary-bg border-border-light hover:border-ai-cyan/50 transition-all duration-300 rounded-2xl flex flex-row items-center p-6 shadow-sm">
                <div className="h-14 w-14 rounded-xl bg-white flex items-center justify-center mr-6 border border-border-light shadow-sm flex-shrink-0">
                  <agent.icon className="h-7 w-7 text-interaction-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-text-main mb-2">{agent.title}</h3>
                  <p className="text-text-muted">{agent.desc}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Client Workflow */}
      <section className="py-24 bg-secondary-bg border-b border-border-light">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading font-bold text-text-main mb-6">Start Your AI Strategy Engagement</h2>
            <p className="text-xl text-text-muted max-w-3xl mx-auto leading-relaxed">
              How enterprises begin working with Matrix360 to design and deploy intelligent systems.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row items-start justify-between gap-6 relative mb-16">
            <div className="hidden lg:block absolute top-12 left-0 w-full h-0.5 bg-gray-200 z-0"></div>
            {[
              { step: 'Step 1', title: 'Submit Strategic Challenge', desc: 'Organizations describe their strategic challenge and objectives.', icon: MessageSquare },
              { step: 'Step 2', title: 'Strategy Consultation', desc: 'Matrix360 consultants analyze the challenge and define the strategic approach.', icon: Users },
              { step: 'Step 3', title: 'Video Strategy Room', desc: 'Consultants and clients collaborate in a structured strategy session to design AI systems and automation workflows.', icon: Video },
              { step: 'Step 4', title: 'AI System Deployment', desc: 'Matrix360 deploys AI agents and automation systems and provides continuous intelligence.', icon: Zap },
            ].map((step, i) => (
              <div key={i} className="relative z-10 flex flex-col items-start w-full lg:w-1/4 bg-white p-8 rounded-2xl border border-border-light shadow-sm hover:shadow-md transition-shadow">
                <div className="h-10 w-10 rounded-lg bg-interaction-primary/10 text-interaction-primary flex items-center justify-center mb-6 border border-interaction-primary/20">
                  <step.icon className="h-5 w-5" />
                </div>
                <div className="text-sm font-bold text-interaction-primary mb-2 uppercase tracking-wider">{step.step}</div>
                <h3 className="text-xl font-bold text-text-main mb-3">{step.title}</h3>
                <p className="text-text-muted leading-relaxed text-sm">{step.desc}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/enterprise/challenge">
              <Button variant="primary" className="h-14 px-8 text-lg w-full sm:w-auto shadow-sm">
                Book Strategy Consultation
              </Button>
            </Link>
            <Link to="/enterprise/challenge">
              <Button variant="secondary" className="h-14 px-8 text-lg w-full sm:w-auto bg-white shadow-sm border-border-light hover:bg-gray-50">
                Submit Strategic Challenge
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Video Strategy Room */}
      <section className="py-24 bg-white border-b border-border-light">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-heading font-bold text-text-main mb-6">Video Strategy Room</h2>
              <p className="text-xl text-text-muted leading-relaxed mb-6">
                The core collaboration environment where consulting discussions occur and strategic planning sessions take place.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <CheckCircle2 className="h-6 w-6 text-interaction-primary mr-3 flex-shrink-0" />
                  <span className="text-lg text-text-main">Secure, high-definition video conferencing.</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-6 w-6 text-interaction-primary mr-3 flex-shrink-0" />
                  <span className="text-lg text-text-main">AI systems capture insights and generate real-time transcripts.</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-6 w-6 text-interaction-primary mr-3 flex-shrink-0" />
                  <span className="text-lg text-text-main">Integrated whiteboarding and strategy document sharing.</span>
                </li>
              </ul>
              <Link to="/strategy-room">
                <Button variant="secondary" className="bg-white shadow-sm border-border-light">
                  Explore the Strategy Room <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="relative">
              <div className="aspect-video bg-gray-100 rounded-2xl border border-border-light shadow-xl overflow-hidden flex items-center justify-center relative">
                <img src="https://picsum.photos/seed/videoroom/800/450" alt="Video Strategy Room Interface" className="w-full h-full object-cover opacity-80" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-20 w-20 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow-lg border border-border-light">
                    <Video className="h-8 w-8 text-interaction-primary" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Services */}
      <section className="py-24 bg-secondary-bg border-b border-border-light">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading font-bold text-text-main mb-6">Consulting & Automation Services</h2>
            <p className="text-xl text-text-muted max-w-3xl mx-auto leading-relaxed">
              Comprehensive capabilities to transform your enterprise.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { title: 'AI Strategy Consulting', desc: 'Expert guidance on integrating AI into your core business model and operations.' },
              { title: 'AI Agent Development', desc: 'Custom design and deployment of specialized AI agents for your unique workflows.' },
              { title: 'Business Process Automation', desc: 'End-to-end automation of complex, multi-step enterprise processes.' },
              { title: 'Digital Transformation Systems', desc: 'Architecting scalable, intelligent platforms to modernize legacy infrastructure.' },
            ].map((service, i) => (
              <Card key={i} className="bg-white border-border-light hover:shadow-md transition-shadow rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-text-main mb-4">{service.title}</h3>
                <p className="text-lg text-text-muted">{service.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Technology Platform */}
      <section className="py-24 bg-white border-b border-border-light">
        <div className="container mx-auto px-4 max-w-7xl text-center">
          <h2 className="text-4xl font-heading font-bold text-text-main mb-6">Enterprise Architecture</h2>
          <p className="text-xl text-text-muted max-w-3xl mx-auto leading-relaxed mb-12">
            Matrix360 integrates AI agents, automation pipelines, consulting workflows, and enterprise collaboration systems into a single, secure backend architecture.
          </p>
          <div className="flex justify-center mb-12">
            <div className="p-8 bg-gray-50 rounded-3xl border border-border-light inline-flex items-center gap-8">
              <Server className="h-12 w-12 text-ai-cyan" />
              <ArrowRight className="h-6 w-6 text-interaction-primary" />
              <BrainCircuit className="h-16 w-16 text-ai-violet" />
              <ArrowRight className="h-6 w-6 text-interaction-primary" />
              <Workflow className="h-12 w-12 text-ai-cyan" />
            </div>
          </div>
          <Link to="/architecture">
            <Button variant="secondary" className="bg-white shadow-sm border-border-light">
              View Architecture Details
            </Button>
          </Link>
        </div>
      </section>

      {/* 8. Strategic Advisory Domains */}
      <section className="py-24 bg-secondary-bg border-b border-border-light">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading font-bold text-text-main mb-6">Strategic Advisory Domains</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[
              { title: 'Regulatory Strategy', icon: Shield },
              { title: 'Market Expansion', icon: Globe },
              { title: 'Digital Transformation', icon: Cpu },
              { title: 'Crisis Strategy', icon: AlertTriangle },
              { title: 'Stakeholder Engagement', icon: Network },
            ].map((domain, i) => (
              <Link key={i} to="/consultants">
                <Card className="bg-white border-border-light hover:border-interaction-primary/50 hover:shadow-md transition-all rounded-2xl h-full flex flex-col items-center justify-center p-6 text-center group">
                  <domain.icon className="h-10 w-10 text-text-main group-hover:text-interaction-primary transition-colors mb-4" />
                  <h3 className="text-sm font-bold text-text-main">{domain.title}</h3>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Curated Expert Network */}
      <section className="py-24 bg-white border-b border-border-light">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading font-bold text-text-main mb-6">A Curated Network of Strategic Experts</h2>
            <p className="text-xl text-text-muted max-w-3xl mx-auto leading-relaxed">
              Collaborate with former executives, policy advisors, industry specialists, and strategy consultants.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              { name: 'Dr. Michael Reynolds', title: 'Policy Advisor', img: 'https://picsum.photos/seed/michael/400/400' },
              { name: 'Anna Delgado', title: 'Strategy Consultant', img: 'https://picsum.photos/seed/anna/400/400' },
              { name: 'Marcus Chen', title: 'Former Executive', img: 'https://picsum.photos/seed/marcus/400/400' },
            ].map((expert, i) => (
              <Card key={i} className="bg-white border-border-light rounded-2xl overflow-hidden">
                <img src={expert.img} alt={expert.name} className="w-full h-64 object-cover" referrerPolicy="no-referrer" />
                <CardContent className="p-6 text-center">
                  <h3 className="text-xl font-bold text-text-main mb-1">{expert.name}</h3>
                  <p className="text-interaction-primary font-medium">{expert.title}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center">
            <Link to="/consultants">
              <Button variant="secondary" className="bg-white shadow-sm border-border-light">
                View Full Network
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 10. Use Cases */}
      <section className="py-24 bg-secondary-bg border-b border-border-light">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading font-bold text-text-main mb-6">Transformation Scenarios</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'AI-Enabled Regulatory Strategy', desc: 'Automated scanning of global policy changes combined with expert interpretation to proactively adjust compliance frameworks.' },
              { title: 'AI-Supported Digital Transformation', desc: 'Architecting intelligent systems to replace legacy processes, guided by specialized technology consultants.' },
              { title: 'Automation of Enterprise Workflows', desc: 'Deploying AI agents to orchestrate data flow between disparate enterprise systems, reducing manual overhead.' },
            ].map((usecase, i) => (
              <Card key={i} className="bg-white border-border-light rounded-2xl p-8">
                <CheckCircle2 className="h-8 w-8 text-ai-cyan mb-6" />
                <h3 className="text-xl font-bold text-text-main mb-4">{usecase.title}</h3>
                <p className="text-text-muted leading-relaxed">{usecase.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 11. Call to Action */}
      <section className="py-32 bg-gradient-to-br from-[var(--color-interaction-secondary)] to-[var(--color-ai-violet)] text-center text-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-5xl font-heading font-bold mb-8 text-white">Design Your AI Strategy</h2>
          <p className="text-xl mb-12 leading-relaxed max-w-2xl mx-auto text-white/90">
            Partner with Matrix360 to build intelligent systems and automate your enterprise workflows.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/enterprise/challenge">
              <Button variant="secondary" className="h-14 px-8 text-lg w-full sm:w-auto bg-white text-[var(--color-interaction-secondary)] border-white hover:bg-gray-50 shadow-lg">
                Book Strategy Consultation
              </Button>
            </Link>
            <Link to="/platform">
              <Button variant="secondary" className="h-14 px-8 text-lg w-full sm:w-auto bg-transparent text-white border-white/30 hover:bg-white/10 shadow-sm">
                Explore the Platform
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

