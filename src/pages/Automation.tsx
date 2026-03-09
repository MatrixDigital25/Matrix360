import React from 'react';
import { motion } from 'motion/react';
import { Workflow, Zap, Activity, CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/Card';

export default function Automation() {
  return (
    <div className="flex flex-col min-h-screen bg-secondary-bg pt-24">
      <div className="container mx-auto px-4 max-w-7xl py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-heading font-bold text-text-main mb-6">Enterprise Workflow Automation</h1>
          <p className="text-xl text-text-muted max-w-3xl mx-auto leading-relaxed">
            Deploy intelligent agents to orchestrate complex processes, reduce manual overhead, and accelerate strategic execution.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <div>
            <h2 className="text-3xl font-heading font-bold text-text-main mb-6">Automate the Unautomatable</h2>
            <p className="text-lg text-text-muted leading-relaxed mb-8">
              Traditional automation handles repetitive tasks. Matrix360's AI-driven automation tackles complex, cognitive workflows that previously required human intervention.
            </p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start">
                <CheckCircle2 className="h-6 w-6 text-interaction-primary mr-3 flex-shrink-0" />
                <span className="text-lg text-text-main">Intelligent Document Processing</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-6 w-6 text-interaction-primary mr-3 flex-shrink-0" />
                <span className="text-lg text-text-main">Automated Regulatory Compliance Checks</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-6 w-6 text-interaction-primary mr-3 flex-shrink-0" />
                <span className="text-lg text-text-main">Dynamic Supply Chain Re-routing</span>
              </li>
            </ul>
          </div>
          <div className="relative">
            <div className="aspect-square bg-gray-50 rounded-3xl border border-border-light shadow-sm p-8 flex flex-col items-center justify-center">
              <Workflow className="h-24 w-24 text-interaction-primary mb-8" />
              <div className="w-full max-w-sm space-y-4">
                <div className="h-12 bg-white rounded-xl border border-border-light shadow-sm flex items-center px-4">
                  <Activity className="h-5 w-5 text-text-muted mr-3" />
                  <div className="h-2 w-32 bg-gray-200 rounded-full"></div>
                </div>
                <div className="h-12 bg-white rounded-xl border border-border-light shadow-sm flex items-center px-4 ml-8">
                  <Zap className="h-5 w-5 text-alert-opportunity mr-3" />
                  <div className="h-2 w-24 bg-gray-200 rounded-full"></div>
                </div>
                <div className="h-12 bg-white rounded-xl border border-border-light shadow-sm flex items-center px-4 ml-16">
                  <CheckCircle2 className="h-5 w-5 text-interaction-primary mr-3" />
                  <div className="h-2 w-40 bg-gray-200 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
