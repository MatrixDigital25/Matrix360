import React from 'react';
import { motion } from 'motion/react';
import { Layers, Users, BrainCircuit, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/Card';

export default function Platform() {
  return (
    <div className="flex flex-col min-h-screen bg-secondary-bg pt-24">
      <div className="container mx-auto px-4 max-w-7xl py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-heading font-bold text-text-main mb-6">The Matrix360 Platform</h1>
          <p className="text-xl text-text-muted max-w-3xl mx-auto leading-relaxed">
            A unified ecosystem combining human expertise with artificial intelligence to solve complex enterprise challenges.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <Card className="bg-white border-border-light rounded-3xl p-8 shadow-sm">
            <BrainCircuit className="h-12 w-12 text-interaction-primary mb-6" />
            <h2 className="text-3xl font-bold text-text-main mb-4">AI Intelligence Layer</h2>
            <p className="text-lg text-text-muted leading-relaxed mb-6">
              Our proprietary AI models analyze industry trends, synthesize research, and generate strategic frameworks, acting as a force multiplier for decision-making.
            </p>
            <ul className="space-y-3 text-text-muted">
              <li>• Automated Market Research</li>
              <li>• Predictive Risk Analysis</li>
              <li>• Strategy Framework Generation</li>
            </ul>
          </Card>

          <Card className="bg-white border-border-light rounded-3xl p-8 shadow-sm">
            <Users className="h-12 w-12 text-ai-cyan mb-6" />
            <h2 className="text-3xl font-bold text-text-main mb-4">Expert Consultant Network</h2>
            <p className="text-lg text-text-muted leading-relaxed mb-6">
              Access a curated network of former executives, policy advisors, and industry specialists who provide the nuanced judgment AI cannot replicate.
            </p>
            <ul className="space-y-3 text-text-muted">
              <li>• Vetted Strategic Advisors</li>
              <li>• Domain-Specific Expertise</li>
              <li>• On-Demand Collaboration</li>
            </ul>
          </Card>

          <Card className="bg-white border-border-light rounded-3xl p-8 shadow-sm">
            <Layers className="h-12 w-12 text-text-main mb-6" />
            <h2 className="text-3xl font-bold text-text-main mb-4">Collaboration Workspace</h2>
            <p className="text-lg text-text-muted leading-relaxed mb-6">
              A secure, integrated environment where enterprises and consultants collaborate, share documents, and track strategic initiatives.
            </p>
            <ul className="space-y-3 text-text-muted">
              <li>• Video Strategy Room</li>
              <li>• Shared Document Repositories</li>
              <li>• Interactive Stakeholder Maps</li>
            </ul>
          </Card>

          <Card className="bg-white border-border-light rounded-3xl p-8 shadow-sm">
            <Zap className="h-12 w-12 text-alert-opportunity mb-6" />
            <h2 className="text-3xl font-bold text-text-main mb-4">Workflow Automation</h2>
            <p className="text-lg text-text-muted leading-relaxed mb-6">
              Translate strategy into action with automated workflows that integrate directly into your existing enterprise systems.
            </p>
            <ul className="space-y-3 text-text-muted">
              <li>• API Integrations</li>
              <li>• Automated Reporting</li>
              <li>• Continuous Monitoring</li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}
