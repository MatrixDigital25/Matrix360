import React from 'react';
import { motion } from 'motion/react';
import { BrainCircuit, Target, Shield, Zap, ArrowRight, BarChart3, Users, Globe, Search, CheckCircle2 } from 'lucide-react';
import { Button } from '@/src/components/ui/Button';
import { Link } from 'react-router-dom';

export default function CaseStudies() {
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
              Case Studies
            </h1>
            <p className="text-xl text-text-muted mb-10 leading-relaxed">
              Real-world examples of how Matrix360 has helped organizations navigate complex strategic challenges.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="py-24 px-4 bg-secondary-bg">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[
              {
                title: 'EU AI Act Compliance Strategy',
                industry: 'Technology',
                description: 'How a global SaaS provider navigated the complex regulatory landscape of the new EU AI Act with the help of Matrix360 experts.',
                impact: 'Reduced time-to-market by 4 months and ensured full compliance across all EU jurisdictions.'
              },
              {
                title: 'APAC Market Entry - Q4',
                industry: 'Expansion',
                description: 'A leading consumer electronics manufacturer leveraged Matrix360 to identify and onboard new tier-2 suppliers in Vietnam and Thailand.',
                impact: 'Identified 12 new suppliers and reduced single-country dependency by 40%.'
              },
              {
                title: 'Supply Chain Resilience Audit',
                industry: 'Operations',
                description: 'A global manufacturing firm conducted a comprehensive supply chain resilience audit using Matrix360 strategic intelligence tools.',
                impact: 'Identified 15 high-risk nodes and implemented mitigation strategies within 60 days.'
              },
              {
                title: 'Digital Transformation Roadmap',
                industry: 'Finance',
                description: 'A major financial institution used Matrix360 to develop a comprehensive digital transformation roadmap for its retail banking division.',
                impact: 'Accelerated digital adoption by 25% and reduced operational costs by 15%.'
              }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-8 rounded-xl border border-border-light shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="text-sm font-semibold text-interaction-primary mb-2 uppercase tracking-wider">{item.industry}</div>
                <h3 className="text-2xl font-bold text-text-main mb-4">{item.title}</h3>
                <p className="text-text-muted leading-relaxed mb-6">{item.description}</p>
                <div className="p-4 bg-interaction-primary/5 border border-interaction-primary/20 rounded-lg">
                  <p className="text-sm font-semibold text-text-main mb-1">Impact:</p>
                  <p className="text-sm text-text-muted">{item.impact}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 px-4 bg-primary-bg border-t border-border-light text-center">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-3xl font-heading font-bold text-text-main mb-6">Ready to create your own success story?</h2>
          <p className="text-lg text-text-muted mb-10">
            Join leading enterprises using Matrix360 to navigate complex strategic landscapes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/enterprise/challenge">
              <Button variant="primary" className="h-12 px-8 text-lg">
                Submit a Challenge
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
