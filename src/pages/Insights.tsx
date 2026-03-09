import React from 'react';
import { motion } from 'motion/react';
import { BrainCircuit, Target, Shield, Zap, ArrowRight, BarChart3, Users, Globe, Search, CheckCircle2, Calendar, Clock, ChevronRight } from 'lucide-react';
import { Button } from '@/src/components/ui/Button';
import { Link } from 'react-router-dom';

export default function Insights() {
  const insights = [
    {
      id: 1,
      category: 'Market Analysis',
      date: 'Oct 2023',
      title: 'Navigating the New EU AI Act: Strategic Implications for Global Tech',
      description: 'An in-depth analysis of how upcoming regulatory frameworks will impact product development cycles and market entry strategies.',
      image: 'https://picsum.photos/seed/insight1/800/600',
      readTime: '12 min read'
    },
    {
      id: 2,
      category: 'Supply Chain',
      date: 'Sep 2023',
      title: 'Resilience Beyond Efficiency: The Shift in Global Manufacturing',
      description: 'Why leading manufacturers are prioritizing supply chain diversification and local sourcing in an era of geopolitical uncertainty.',
      image: 'https://picsum.photos/seed/insight2/800/600',
      readTime: '10 min read'
    },
    {
      id: 3,
      category: 'Digital Transformation',
      date: 'Aug 2023',
      title: 'The Generative AI Roadmap for the Enterprise',
      description: 'A practical framework for integrating generative AI into enterprise workflows while maintaining security and compliance.',
      image: 'https://picsum.photos/seed/insight3/800/600',
      readTime: '15 min read'
    },
    {
      id: 4,
      category: 'ESG Strategy',
      date: 'Jul 2023',
      title: 'Carbon Accounting: From Compliance to Competitive Advantage',
      description: 'How organizations are leveraging sustainability metrics to drive operational efficiency and brand value.',
      image: 'https://picsum.photos/seed/insight4/800/600',
      readTime: '8 min read'
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
              Strategic Insights
            </h1>
            <p className="text-xl text-text-muted mb-10 leading-relaxed">
              Latest intelligence, market analysis, and thought leadership from the Matrix360 network of experts.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Insights Grid */}
      <section className="py-24 px-4 bg-secondary-bg">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {insights.map((insight, i) => (
              <motion.div 
                key={insight.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-xl border border-border-light shadow-sm hover:shadow-md transition-all overflow-hidden group flex flex-col"
              >
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={insight.image} 
                    alt={insight.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-8 flex-1 flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-semibold text-interaction-primary uppercase tracking-wider">{insight.category}</span>
                    <div className="flex items-center text-xs text-text-muted">
                      <Calendar className="h-3 w-3 mr-1" />
                      {insight.date}
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-text-main mb-4 group-hover:text-interaction-primary transition-colors">{insight.title}</h3>
                  <p className="text-text-muted leading-relaxed mb-6 flex-1">{insight.description}</p>
                  <div className="flex items-center justify-between pt-6 border-t border-border-light">
                    <div className="flex items-center text-xs text-text-muted">
                      <Clock className="h-3 w-3 mr-1" />
                      {insight.readTime}
                    </div>
                    <a href="#" className="text-interaction-primary font-semibold text-sm inline-flex items-center group/link">
                      Read Full Report
                      <ChevronRight className="ml-1 h-4 w-4 group-hover/link:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-24 px-4 bg-primary-bg border-t border-border-light text-center">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-3xl font-heading font-bold text-text-main mb-6">Stay Informed</h2>
          <p className="text-lg text-text-muted mb-10">
            Subscribe to our weekly briefing for the latest strategic intelligence and expert analysis.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="flex-1 h-12 px-4 rounded-md border border-border-light bg-white focus:outline-none focus:ring-2 focus:ring-interaction-primary"
            />
            <Button variant="primary" className="h-12 px-8">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
