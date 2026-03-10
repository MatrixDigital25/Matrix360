import React from 'react';
import { motion } from 'motion/react';
import { BrainCircuit, Target, Shield, Zap, ArrowRight, BarChart3, Users, Globe, Search, CheckCircle2, FlaskConical, Landmark, Factory, Lightbulb, ShoppingCart, Landmark as Government } from 'lucide-react';
import { Button } from '@/src/components/ui/Button';
import { Link } from 'react-router-dom';

export default function Industries() {
  const industries = [
    {
      icon: <BrainCircuit className="h-8 w-8 text-interaction-primary" />,
      title: 'Technology & Software',
      description: 'Navigate rapid innovation cycles, platform competition, and complex regulatory environments in AI, SaaS, and deep tech.',
      topics: ['AI Regulation', 'Market Entry', 'Platform Strategy']
    },
    {
      icon: <FlaskConical className="h-8 w-8 text-ai-cyan" />,
      title: 'Healthcare & Life Sciences',
      description: 'Strategic guidance for biotech, pharma, and digital health firms facing clinical, regulatory, and market access challenges.',
      topics: ['R&D Strategy', 'Compliance', 'Market Access']
    },
    {
      icon: <Landmark className="h-8 w-8 text-alert-risk" />,
      title: 'Financial Services',
      description: 'Adapt to fintech disruption, shifting monetary policies, and evolving global financial regulations.',
      topics: ['Fintech Strategy', 'Risk Management', 'M&A']
    },
    {
      icon: <Factory className="h-8 w-8 text-interaction-primary" />,
      title: 'Manufacturing & Supply Chain',
      description: 'Optimize global operations, mitigate geopolitical risks, and build resilient, sustainable supply chains.',
      topics: ['Resilience Audit', 'Logistics', 'Sustainability']
    },
    {
      icon: <Lightbulb className="h-8 w-8 text-ai-cyan" />,
      title: 'Energy & Utilities',
      description: 'Navigate the energy transition, ESG requirements, and the shift toward renewable energy sources.',
      topics: ['Energy Transition', 'ESG Strategy', 'Infrastructure']
    },
    {
      icon: <ShoppingCart className="h-8 w-8 text-alert-opportunity" />,
      title: 'Retail & Consumer Goods',
      description: 'Strategic advice for omnichannel retail, global brand expansion, and evolving consumer behavior.',
      topics: ['Brand Strategy', 'Omnichannel', 'Consumer Insights']
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 bg-primary-bg relative overflow-hidden border-b border-border-light">
        <div className="container mx-auto max-w-6xl relative z-10 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-heading font-bold text-text-main leading-tight mb-6">
              Industries We Serve
            </h1>
            <p className="text-xl text-text-muted mb-10 leading-relaxed">
              The Matrix360 Strategic Intelligence Operating System provides elite expertise across the world's most critical and complex sectors.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Industries Grid */}
      <section className="py-24 px-4 bg-secondary-bg">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {industries.map((industry, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-8 rounded-xl border border-border-light shadow-sm hover:shadow-md transition-shadow flex flex-col"
              >
                <div className="mb-6">{industry.icon}</div>
                <h3 className="text-2xl font-bold text-text-main mb-4">{industry.title}</h3>
                <p className="text-text-muted leading-relaxed mb-6 flex-1">{industry.description}</p>
                <div className="flex flex-wrap gap-2 pt-6 border-t border-border-light">
                  {industry.topics.map(topic => (
                    <span key={topic} className="text-[10px] uppercase tracking-wider bg-gray-50 text-text-muted px-2 py-1 rounded border border-border-light font-medium">
                      {topic}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 px-4 bg-primary-bg border-t border-border-light text-center">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-3xl font-heading font-bold text-text-main mb-6">Don't see your industry?</h2>
          <p className="text-lg text-text-muted mb-10">
            Our network of experts covers a vast range of specialized domains. Contact us to discuss your specific needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button variant="primary" className="h-12 px-8 text-lg">
                Contact Us
              </Button>
            </Link>
            <Link to="/enterprise/challenge">
              <Button variant="secondary" className="h-12 px-8 text-lg bg-white">
                Submit a Challenge
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
