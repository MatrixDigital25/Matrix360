import React from 'react';
import { motion } from 'motion/react';
import { Briefcase, BrainCircuit, Workflow, Shield, LineChart } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/Card';

export default function Services() {
  return (
    <div className="flex flex-col min-h-screen bg-secondary-bg pt-24">
      <div className="container mx-auto px-4 max-w-7xl py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-heading font-bold text-text-main mb-6">AI Consulting Services</h1>
          <p className="text-xl text-text-muted max-w-3xl mx-auto leading-relaxed">
            Expert guidance to navigate the complexities of AI integration, digital transformation, and enterprise strategy.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <Card className="bg-white border-border-light rounded-3xl p-8 shadow-sm">
            <BrainCircuit className="h-12 w-12 text-interaction-primary mb-6" />
            <h2 className="text-2xl font-bold text-text-main mb-4">AI Strategy Consulting</h2>
            <p className="text-lg text-text-muted leading-relaxed mb-6">
              Develop a comprehensive roadmap for integrating artificial intelligence into your core business model. We help identify high-impact use cases, assess technical readiness, and design ethical AI governance frameworks.
            </p>
          </Card>

          <Card className="bg-white border-border-light rounded-3xl p-8 shadow-sm">
            <Workflow className="h-12 w-12 text-ai-cyan mb-6" />
            <h2 className="text-2xl font-bold text-text-main mb-4">AI Agent Development</h2>
            <p className="text-lg text-text-muted leading-relaxed mb-6">
              Design and deploy custom AI agents tailored to your specific enterprise workflows. From research automation to complex data analysis, we build intelligent systems that augment your workforce.
            </p>
          </Card>

          <Card className="bg-white border-border-light rounded-3xl p-8 shadow-sm">
            <LineChart className="h-12 w-12 text-alert-opportunity mb-6" />
            <h2 className="text-2xl font-bold text-text-main mb-4">Business Process Automation</h2>
            <p className="text-lg text-text-muted leading-relaxed mb-6">
              End-to-end automation of complex, multi-step enterprise processes. We streamline operations, reduce manual overhead, and ensure seamless data flow across your organization.
            </p>
          </Card>

          <Card className="bg-white border-border-light rounded-3xl p-8 shadow-sm">
            <Shield className="h-12 w-12 text-text-main mb-6" />
            <h2 className="text-2xl font-bold text-text-main mb-4">Digital Transformation Systems</h2>
            <p className="text-lg text-text-muted leading-relaxed mb-6">
              Architect scalable, intelligent platforms to modernize legacy infrastructure. We guide you through the technical and organizational shifts required to become an AI-first enterprise.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
