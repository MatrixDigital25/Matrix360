import React from 'react';
import { motion } from 'motion/react';
import { Video, Mic, FileText, BrainCircuit, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/Card';

export default function StrategyRoom() {
  return (
    <div className="flex flex-col min-h-screen bg-secondary-bg pt-24">
      <div className="container mx-auto px-4 max-w-7xl py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-heading font-bold text-text-main mb-6">Video Strategy Room</h1>
          <p className="text-xl text-text-muted max-w-3xl mx-auto leading-relaxed">
            A secure, AI-enhanced collaboration environment designed for high-stakes strategic planning.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <div className="relative">
            <div className="aspect-video bg-gray-100 rounded-2xl border border-border-light shadow-xl overflow-hidden flex items-center justify-center relative">
              <img src="https://picsum.photos/seed/videoroom2/800/450" alt="Video Strategy Room Interface" className="w-full h-full object-cover opacity-80" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-20 w-20 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow-lg border border-border-light">
                  <Video className="h-8 w-8 text-interaction-primary" />
                </div>
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-heading font-bold text-text-main mb-6">Intelligent Collaboration</h2>
            <p className="text-lg text-text-muted leading-relaxed mb-8">
              The Video Strategy Room goes beyond standard conferencing. It actively listens, analyzes, and supports your consulting engagements with real-time AI capabilities.
            </p>
            <div className="space-y-6">
              <div className="flex items-start">
                <Mic className="h-6 w-6 text-interaction-primary mr-4 mt-1" />
                <div>
                  <h3 className="font-bold text-text-main">Real-time Transcription</h3>
                  <p className="text-text-muted">Every session is accurately transcribed and securely stored.</p>
                </div>
              </div>
              <div className="flex items-start">
                <BrainCircuit className="h-6 w-6 text-interaction-primary mr-4 mt-1" />
                <div>
                  <h3 className="font-bold text-text-main">AI Insight Extraction</h3>
                  <p className="text-text-muted">Automatically identify key decisions, action items, and strategic shifts.</p>
                </div>
              </div>
              <div className="flex items-start">
                <FileText className="h-6 w-6 text-interaction-primary mr-4 mt-1" />
                <div>
                  <h3 className="font-bold text-text-main">Integrated Whiteboarding</h3>
                  <p className="text-text-muted">Collaborate visually on frameworks and process diagrams.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
