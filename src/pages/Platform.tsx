import React from 'react';
import { motion } from 'motion/react';
import { Layers, Users, BrainCircuit, Zap, Target } from 'lucide-react';
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
          <h1 className="text-5xl font-heading font-bold text-text-main mb-6">Matrix360 Strategic Intelligence Operating System</h1>
          <p className="text-xl text-text-muted max-w-3xl mx-auto leading-relaxed">
            A unified ecosystem combining human expertise with artificial intelligence to solve complex enterprise challenges.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <Card className="bg-white border-border-light rounded-3xl p-8 shadow-sm">
            <BrainCircuit className="h-12 w-12 text-interaction-primary mb-6" />
            <h2 className="text-3xl font-bold text-text-main mb-4">Intelligence Layer</h2>
            <p className="text-lg text-text-muted leading-relaxed mb-6">
              Our proprietary AI models analyze global signals, industry trends, and strategic insights, acting as a force multiplier for enterprise decision-making.
            </p>
            <ul className="space-y-3 text-text-muted">
              <li>• Global Signal Analysis</li>
              <li>• AI-Driven Strategic Insights</li>
              <li>• Knowledge Graph Memory</li>
            </ul>
          </Card>

          <Card className="bg-white border-border-light rounded-3xl p-8 shadow-sm">
            <Target className="h-12 w-12 text-ai-violet mb-6" />
            <h2 className="text-3xl font-bold text-text-main mb-4">Strategy Layer</h2>
            <p className="text-lg text-text-muted leading-relaxed mb-6">
              High-fidelity collaboration environments where human expertise meets AI-driven strategy design to solve complex enterprise challenges.
            </p>
            <ul className="space-y-3 text-text-muted">
              <li>• Strategic Challenge Design</li>
              <li>• Video Strategy War Rooms</li>
              <li>• Expert Collaboration Hubs</li>
            </ul>
          </Card>

          <Card className="bg-white border-border-light rounded-3xl p-8 shadow-sm">
            <Zap className="h-12 w-12 text-alert-opportunity mb-6" />
            <h2 className="text-3xl font-bold text-text-main mb-4">Execution Layer</h2>
            <p className="text-lg text-text-muted leading-relaxed mb-6">
              Translate strategy into action with automated workflows and project management systems that integrate directly into enterprise infrastructure.
            </p>
            <ul className="space-y-3 text-text-muted">
              <li>• Transformation Program Management</li>
              <li>• Workflow Automation Systems</li>
              <li>• Continuous Execution Monitoring</li>
            </ul>
          </Card>

          <Card className="bg-white border-border-light rounded-3xl p-8 shadow-sm">
            <Users className="h-12 w-12 text-ai-cyan mb-6" />
            <h2 className="text-3xl font-bold text-text-main mb-4">Network Layer</h2>
            <p className="text-lg text-text-muted leading-relaxed mb-6">
              Access a curated global network of elite consultants, specialized advisors, and industry experts who provide nuanced judgment and deep domain expertise.
            </p>
            <ul className="space-y-3 text-text-muted">
              <li>• Global Advisory Marketplace</li>
              <li>• Vetted Strategic Experts</li>
              <li>• Enterprise Partner Ecosystem</li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}
