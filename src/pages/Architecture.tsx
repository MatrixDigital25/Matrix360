import React from 'react';
import { motion } from 'motion/react';
import { Server, BrainCircuit, Workflow, Database, Shield, Activity, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/Card';
import { Button } from '@/src/components/ui/Button';
import { Link } from 'react-router-dom';
import { SystemDiagram } from '@/src/components/ui/SystemDiagram';

export default function Architecture() {
  return (
    <div className="flex flex-col min-h-screen bg-secondary-bg pt-24">
      <div className="container mx-auto px-4 max-w-7xl py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-heading font-bold text-text-main mb-6">AI Automation Architecture</h1>
          <p className="text-xl text-text-muted max-w-3xl mx-auto leading-relaxed">
            Matrix360 is built on a scalable, secure foundation designed to orchestrate complex AI agents and enterprise workflows.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {[
            { title: 'Data Ingestion Layer', desc: 'Securely connects to enterprise data sources, APIs, and unstructured documents.', icon: Database },
            { title: 'AI Agent Orchestration', desc: 'Manages specialized LLMs and agents for specific strategic tasks.', icon: BrainCircuit },
            { title: 'Execution Engine', desc: 'Triggers workflows, updates systems, and delivers insights to stakeholders.', icon: Workflow },
          ].map((layer, i) => (
            <Card key={i} className="bg-gray-50/50 border-border-light rounded-2xl">
              <CardHeader>
                <layer.icon className="h-10 w-10 text-interaction-primary mb-4" />
                <CardTitle className="text-2xl text-text-main">{layer.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-text-muted leading-relaxed">{layer.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-white border border-border-light rounded-3xl overflow-hidden shadow-sm text-center mb-16">
          <div className="p-8 border-b border-border-light bg-gray-50/50">
            <h2 className="text-3xl font-heading font-bold text-text-main">System Architecture</h2>
            <p className="text-text-muted mt-2">Visualizing the Matrix360 strategic intelligence network.</p>
          </div>
          <CardContent className="p-0">
            <SystemDiagram type="agent-network" className="border-none rounded-none aspect-video" />
          </CardContent>
        </div>

        <div className="text-center">
          <Link to="/enterprise/challenge">
            <Button variant="primary" className="h-14 px-8 text-lg shadow-sm">
              Discuss Your Architecture
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
