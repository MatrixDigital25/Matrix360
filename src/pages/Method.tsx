import React from 'react';
import { motion } from 'motion/react';
import { BrainCircuit, Target, Shield, Zap, ArrowRight, BarChart3, Users, Globe, Search, CheckCircle2 } from 'lucide-react';
import { Button } from '@/src/components/ui/Button';
import { Link } from 'react-router-dom';

export default function Method() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 bg-primary-bg relative overflow-hidden border-b border-border-light">
        <div className="container mx-auto max-w-6xl relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-heading font-bold text-text-main leading-tight mb-6">
              The Matrix360 Method
            </h1>
            <p className="text-xl text-text-muted mb-10 leading-relaxed">
              A structured approach to strategic intelligence, expert matching, and collaborative execution.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-24 px-4 bg-secondary-bg">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                step: '01',
                title: 'Intelligence Gathering',
                description: 'We use AI-driven signal intelligence to monitor global markets, regulatory shifts, and competitor movements, providing a foundation for strategic decision-making.'
              },
              {
                step: '02',
                title: 'Expert Curation',
                description: 'Our proprietary algorithm matches your specific challenge with the most relevant experts from our vetted network of elite strategic consultants.'
              },
              {
                step: '03',
                title: 'Collaborative Execution',
                description: 'Work securely with internal teams and external experts in a dedicated workspace, leveraging AI tools to accelerate research and synthesis.'
              }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative"
              >
                <div className="text-6xl font-heading font-bold text-interaction-primary/10 absolute -top-10 -left-4 z-0">
                  {item.step}
                </div>
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold text-text-main mb-4">{item.title}</h3>
                  <p className="text-text-muted leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 px-4 bg-primary-bg border-t border-border-light text-center">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-3xl font-heading font-bold text-text-main mb-6">Ready to experience the method?</h2>
          <p className="text-lg text-text-muted mb-10">
            Join leading enterprises using Matrix360 to navigate complex strategic landscapes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/enterprise/challenge">
              <Button variant="primary" className="h-12 px-8 text-lg">
                Submit a Challenge
              </Button>
            </Link>
            <Link to="/apply">
              <Button variant="secondary" className="h-12 px-8 text-lg bg-white">
                Apply as Consultant
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
