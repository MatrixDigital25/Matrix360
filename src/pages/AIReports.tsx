import React from 'react';
import { motion } from 'motion/react';
import { FileText, Sparkles, Download, Filter } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/Card';

export default function AIReports() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold text-text-main tracking-tight">AI Strategic Reports</h1>
          <p className="text-text-muted mt-2">Automated intelligence synthesis and strategic analysis.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-secondary-bg border border-border-light rounded-lg text-sm font-bold hover:bg-border-light transition-all">
            <Filter className="h-4 w-4" />
            Filter
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-interaction-primary text-white rounded-lg text-sm font-bold hover:bg-interaction-primary/90 transition-all shadow-lg shadow-interaction-primary/20">
            <Sparkles className="h-4 w-4" />
            Generate New Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: 'Market Volatility Analysis', date: 'Oct 24, 2026', type: 'Market Intelligence', status: 'Ready' },
          { title: 'Competitor AI Strategy', date: 'Oct 22, 2026', type: 'Strategic Benchmarking', status: 'Ready' },
          { title: 'Supply Chain Risk Assessment', date: 'Oct 20, 2026', type: 'Operational Risk', status: 'Archived' },
        ].map((report, i) => (
          <Card key={i} className="hover:border-interaction-primary/30 transition-all cursor-pointer group">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold text-interaction-primary uppercase tracking-wider">{report.type}</span>
                <FileText className="h-4 w-4 text-text-muted group-hover:text-interaction-primary transition-colors" />
              </div>
              <CardTitle className="text-lg">{report.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between text-xs text-text-muted mt-4">
                <span>{report.date}</span>
                <button className="flex items-center gap-1 text-interaction-primary font-bold hover:underline">
                  <Download className="h-3 w-3" />
                  Download PDF
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
