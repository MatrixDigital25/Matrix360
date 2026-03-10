import React from 'react';
import { motion } from 'motion/react';
import { Globe, Users, Shield } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/Card';

export default function About() {
  return (
    <div className="flex flex-col min-h-screen bg-secondary-bg pt-24">
      <div className="container mx-auto px-4 max-w-7xl py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-heading font-bold text-text-main mb-6">Matrix360 Strategic Intelligence</h1>
          <p className="text-xl text-text-muted max-w-3xl mx-auto leading-relaxed">
            Matrix360 is the Strategic Intelligence Operating System for enterprise strategy, combining elite human expertise with advanced artificial intelligence.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto mb-24">
          <h2 className="text-3xl font-heading font-bold text-text-main mb-6">Our Vision</h2>
          <p className="text-lg text-text-muted leading-relaxed mb-8">
            The complexity of the modern enterprise environment—driven by rapid technological shifts, intricate regulatory landscapes, and globalized markets—requires a new approach to strategic decision-making. The Matrix360 Strategic Intelligence Operating System was founded on the belief that the most effective strategies emerge from the synthesis of deep human experience and the analytical power of AI.
          </p>
          <p className="text-lg text-text-muted leading-relaxed mb-12">
            We provide a unified platform where organizations can define their most critical challenges, connect with world-class advisors, and deploy intelligent systems to automate execution.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-gray-50/50 border-border-light rounded-2xl text-center p-6">
              <Globe className="h-10 w-10 text-interaction-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold text-text-main mb-2">Global Perspective</h3>
              <p className="text-text-muted">Navigating international markets and cross-border complexities.</p>
            </Card>
            <Card className="bg-gray-50/50 border-border-light rounded-2xl text-center p-6">
              <Users className="h-10 w-10 text-ai-cyan mx-auto mb-4" />
              <h3 className="text-xl font-bold text-text-main mb-2">Elite Network</h3>
              <p className="text-text-muted">Curating the highest caliber of strategic advisors and technologists.</p>
            </Card>
            <Card className="bg-gray-50/50 border-border-light rounded-2xl text-center p-6">
              <Shield className="h-10 w-10 text-alert-opportunity mx-auto mb-4" />
              <h3 className="text-xl font-bold text-text-main mb-2">Enterprise Security</h3>
              <p className="text-text-muted">Ensuring data privacy and compliance in every interaction.</p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
