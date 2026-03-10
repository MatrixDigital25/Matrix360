import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/src/components/ui/Card';
import { Badge } from '@/src/components/ui/Badge';
import { Button } from '@/src/components/ui/Button';
import { 
  Activity, 
  AlertTriangle, 
  Zap, 
  TrendingUp, 
  ShieldAlert, 
  Lightbulb, 
  ArrowRight, 
  RefreshCw,
  Clock,
  ExternalLink,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { detectMarketSignals, StrategicSignal as SignalType } from '@/src/services/geminiService';

interface StrategicSignal extends SignalType {
  signal_id?: number;
  status: 'New' | 'Reviewed' | 'Actioned';
  created_at: string;
}

export function IntelligenceFeed() {
  const [signals, setSignals] = useState<StrategicSignal[]>([]);
  const [loading, setLoading] = useState(false);
  const [detecting, setDetecting] = useState(false);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const fetchSignals = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/strategic-signals');
      const data = await response.json();
      setSignals(data);
    } catch (error) {
      console.error("Error fetching signals:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSignals();
  }, []);

  const handleDetectSignals = async () => {
    setDetecting(true);
    try {
      // In a real app, we'd get industry/region from user context
      const newSignals = await detectMarketSignals('Technology', 'Global');
      
      // Save signals to backend
      for (const signal of newSignals) {
        await fetch('/api/strategic-signals', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(signal)
        });
      }
      
      await fetchSignals();
    } catch (error) {
      console.error("Error detecting signals:", error);
    } finally {
      setDetecting(false);
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Opportunity Signals': return <Lightbulb className="h-4 w-4 text-emerald-500" />;
      case 'Risk Alerts': return <ShieldAlert className="h-4 w-4 text-rose-500" />;
      case 'Market Shifts': return <TrendingUp className="h-4 w-4 text-blue-500" />;
      case 'Technology Disruptions': return <Zap className="h-4 w-4 text-purple-500" />;
      default: return <Activity className="h-4 w-4 text-zinc-500" />;
    }
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'High': return <Badge variant="red" className="text-[10px] px-1.5 py-0">High</Badge>;
      case 'Medium': return <Badge variant="amber" className="text-[10px] px-1.5 py-0">Medium</Badge>;
      case 'Low': return <Badge variant="secondary" className="text-[10px] px-1.5 py-0">Low</Badge>;
      default: return null;
    }
  };

  return (
    <Card className="border-panel-border shadow-sm bg-panel-bg h-full flex flex-col">
      <CardHeader className="pb-4 border-b border-panel-border p-5 flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-lg flex items-center">
            <Activity className="mr-2 h-5 w-5 text-interaction-primary" />
            Strategic Intelligence Feed
          </CardTitle>
          <CardDescription>Continuous market signal detection & risk analysis.</CardDescription>
        </div>
        <Button 
          variant="secondary" 
          size="sm" 
          onClick={handleDetectSignals}
          disabled={detecting}
          className="h-8 px-3 text-xs"
        >
          {detecting ? (
            <RefreshCw className="h-3 w-3 mr-2 animate-spin" />
          ) : (
            <Zap className="h-3 w-3 mr-2 text-interaction-primary" />
          )}
          {detecting ? 'Detecting...' : 'Scan for Signals'}
        </Button>
      </CardHeader>
      
      <CardContent className="p-0 flex-1 overflow-y-auto max-h-[600px] custom-scrollbar">
        {loading && signals.length === 0 ? (
          <div className="p-8 text-center text-text-muted">
            <RefreshCw className="h-8 w-8 mx-auto mb-2 animate-spin opacity-20" />
            <p className="text-sm italic">Synchronizing intelligence streams...</p>
          </div>
        ) : signals.length === 0 ? (
          <div className="p-12 text-center text-text-muted">
            <Activity className="h-12 w-12 mx-auto mb-4 opacity-10" />
            <p className="text-sm">No signals detected yet. Run a scan to begin.</p>
          </div>
        ) : (
          <div className="divide-y divide-panel-border">
            {signals.map((signal) => (
              <div 
                key={signal.signal_id} 
                className={`p-5 transition-colors hover:bg-zinc-50/50 cursor-pointer ${expandedId === signal.signal_id ? 'bg-zinc-50/80' : ''}`}
                onClick={() => setExpandedId(expandedId === signal.signal_id ? null : signal.signal_id || null)}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {getCategoryIcon(signal.category)}
                    <span className="text-[10px] font-bold uppercase tracking-wider text-text-muted">
                      {signal.category}
                    </span>
                    {getSeverityBadge(signal.severity)}
                  </div>
                  <div className="flex items-center text-[10px] text-text-muted">
                    <Clock className="h-3 w-3 mr-1" />
                    {new Date(signal.created_at).toLocaleDateString()}
                  </div>
                </div>
                
                <h4 className="text-sm font-bold text-text-main mb-2 leading-tight">
                  {signal.title}
                </h4>
                
                <p className={`text-xs text-text-muted leading-relaxed ${expandedId === signal.signal_id ? '' : 'line-clamp-2'}`}>
                  {signal.content}
                </p>

                <AnimatePresence>
                  {expandedId === signal.signal_id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-4 pt-4 border-t border-panel-border space-y-4">
                        <div className="bg-interaction-primary/5 p-3 rounded-lg border border-interaction-primary/10">
                          <h5 className="text-[10px] font-bold uppercase tracking-wider text-interaction-primary mb-2 flex items-center">
                            <Zap className="h-3 w-3 mr-1" />
                            AI Action Recommendation
                          </h5>
                          <p className="text-xs text-text-main leading-relaxed italic">
                            "{signal.recommendation}"
                          </p>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] text-text-muted italic">
                            Source: {signal.source}
                          </span>
                          <Button variant="secondary" size="sm" className="h-7 text-[10px] px-2">
                            Execute Response <ArrowRight className="ml-1 h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                
                <div className="mt-3 flex justify-center">
                  {expandedId === signal.signal_id ? (
                    <ChevronUp className="h-3 w-3 text-text-muted opacity-30" />
                  ) : (
                    <ChevronDown className="h-3 w-3 text-text-muted opacity-30" />
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
      
      <div className="p-4 border-t border-panel-border bg-zinc-50/50">
        <Button variant="secondary" className="w-full h-9 text-xs font-medium">
          View Full Intelligence Report <ExternalLink className="ml-2 h-3 w-3" />
        </Button>
      </div>
    </Card>
  );
}
