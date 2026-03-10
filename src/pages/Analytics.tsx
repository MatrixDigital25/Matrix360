import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  LineChart, Line, AreaChart, Area, PieChart, Pie, Cell, Legend 
} from 'recharts';
import { 
  TrendingUp, Users, BrainCircuit, Globe, 
  ArrowUpRight, ArrowDownRight, Activity, 
  Target, Zap, ShieldCheck, Clock, Filter,
  Download, RefreshCw, ChevronRight, BarChart3
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/src/components/ui/Card';
import { Button } from '@/src/components/ui/Button';
import { Badge } from '@/src/components/ui/Badge';
import { cn } from '@/src/utils/cn';

const COLORS = ['#00f2ff', '#8b5cf6', '#10b981', '#f27d26', '#ef4444', '#64748b'];

export default function Analytics() {
  const [loading, setLoading] = useState(true);
  const [transformationData, setTransformationData] = useState<any>(null);
  const [utilizationData, setUtilizationData] = useState<any>(null);
  const [aiPerformance, setAiPerformance] = useState<any>(null);
  const [marketTrends, setMarketTrends] = useState<any>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [transRes, utilRes, aiRes, marketRes] = await Promise.all([
        fetch('/api/analytics/transformation-success'),
        fetch('/api/analytics/consultant-utilization'),
        fetch('/api/analytics/ai-performance'),
        fetch('/api/analytics/market-trends')
      ]);

      setTransformationData(await transRes.json());
      setUtilizationData(await utilRes.json());
      setAiPerformance(await aiRes.json());
      setMarketTrends(await marketRes.json());
    } catch (error) {
      console.error('Error fetching analytics data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="h-[calc(100vh-8rem)] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <RefreshCw className="h-8 w-8 text-interaction-primary animate-spin" />
          <p className="text-white/40 font-mono text-xs uppercase tracking-widest">Synchronizing Strategic Intelligence...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold text-white mb-1 flex items-center gap-3">
            <BarChart3 className="h-8 w-8 text-interaction-primary" />
            Strategic Analytics Dashboard
          </h1>
          <p className="text-white/40 text-sm font-medium">Real-time performance metrics and transformation intelligence.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="secondary" className="bg-white/5 border-white/10 text-white hover:bg-white/10 h-10">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="secondary" className="bg-white/5 border-white/10 text-white hover:bg-white/10 h-10">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Button onClick={fetchData} className="bg-interaction-primary text-white h-10 px-6 shadow-lg shadow-interaction-primary/20">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh Data
          </Button>
        </div>
      </div>

      {/* Top Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Transformation Success', value: '84.2%', trend: '+2.4%', icon: Target, color: 'text-ai-cyan' },
          { label: 'Consultant Utilization', value: '78.5%', trend: '+5.1%', icon: Users, color: 'text-ai-violet' },
          { label: 'AI Reasoning Accuracy', value: '94.2%', trend: '+0.8%', icon: BrainCircuit, color: 'text-emerald-500' },
          { label: 'Market Signal Volume', value: '1,240', trend: '+12%', icon: Globe, color: 'text-interaction-primary' },
        ].map((stat, i) => (
          <Card key={i} className="bg-zinc-900/50 border-white/5 shadow-xl overflow-hidden relative group">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <stat.icon className="h-16 w-16" />
            </div>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className={cn("p-2 rounded-xl bg-white/5", stat.color)}>
                  <stat.icon className="h-5 w-5" />
                </div>
                <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">{stat.label}</span>
              </div>
              <div className="flex items-end justify-between">
                <h3 className="text-3xl font-heading font-bold text-white">{stat.value}</h3>
                <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-full">
                  <ArrowUpRight className="h-3 w-3" />
                  {stat.trend}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Transformation Success & ROI */}
        <Card className="bg-zinc-900/50 border-white/5 shadow-xl">
          <CardHeader className="border-b border-white/5 bg-white/5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Target className="h-5 w-5 text-ai-cyan" />
                <div>
                  <CardTitle className="text-sm font-bold text-white uppercase tracking-wider">Transformation ROI Trend</CardTitle>
                  <CardDescription className="text-[10px] text-white/40">Projected vs Actual Return on Investment</CardDescription>
                </div>
              </div>
              <Badge className="bg-ai-cyan/10 text-ai-cyan border-ai-cyan/20">Monthly View</Badge>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={transformationData?.roiData}>
                  <defs>
                    <linearGradient id="colorRoi" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00f2ff" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#00f2ff" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                  <XAxis dataKey="month" stroke="#ffffff40" fontSize={10} tickLine={false} axisLine={false} />
                  <YAxis stroke="#ffffff40" fontSize={10} tickLine={false} axisLine={false} tickFormatter={(val) => `$${val}M`} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#18181b', border: '1px solid #ffffff10', borderRadius: '12px' }}
                    itemStyle={{ color: '#00f2ff', fontSize: '12px' }}
                  />
                  <Area type="monotone" dataKey="roi" stroke="#00f2ff" fillOpacity={1} fill="url(#colorRoi)" strokeWidth={3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Consultant Utilization */}
        <Card className="bg-zinc-900/50 border-white/5 shadow-xl">
          <CardHeader className="border-b border-white/5 bg-white/5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Users className="h-5 w-5 text-ai-violet" />
                <div>
                  <CardTitle className="text-sm font-bold text-white uppercase tracking-wider">Consultant Utilization Rate</CardTitle>
                  <CardDescription className="text-[10px] text-white/40">Weekly resource allocation across initiatives</CardDescription>
                </div>
              </div>
              <Badge className="bg-ai-violet/10 text-ai-violet border-ai-violet/20">Weekly View</Badge>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={utilizationData?.utilizationTrends}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                  <XAxis dataKey="week" stroke="#ffffff40" fontSize={10} tickLine={false} axisLine={false} />
                  <YAxis stroke="#ffffff40" fontSize={10} tickLine={false} axisLine={false} tickFormatter={(val) => `${val}%`} />
                  <Tooltip 
                    cursor={{ fill: '#ffffff05' }}
                    contentStyle={{ backgroundColor: '#18181b', border: '1px solid #ffffff10', borderRadius: '12px' }}
                    itemStyle={{ color: '#8b5cf6', fontSize: '12px' }}
                  />
                  <Bar dataKey="rate" fill="#8b5cf6" radius={[4, 4, 0, 0]} barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* AI Performance Insights */}
        <Card className="bg-zinc-900/50 border-white/5 shadow-xl">
          <CardHeader className="border-b border-white/5 bg-white/5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <BrainCircuit className="h-5 w-5 text-emerald-500" />
                <div>
                  <CardTitle className="text-sm font-bold text-white uppercase tracking-wider">AI Intelligence Distribution</CardTitle>
                  <CardDescription className="text-[10px] text-white/40">Breakdown of AI-generated strategic insights</CardDescription>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6 flex flex-col md:flex-row items-center gap-8">
            <div className="h-64 w-full md:w-1/2">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={aiPerformance?.insights}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="count"
                    nameKey="insight_type"
                  >
                    {aiPerformance?.insights.map((entry: any, index: number) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#18181b', border: '1px solid #ffffff10', borderRadius: '12px' }}
                    itemStyle={{ fontSize: '12px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="w-full md:w-1/2 space-y-4">
              {aiPerformance?.insights.map((item: any, i: number) => (
                <div key={i} className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5">
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                    <span className="text-[10px] font-bold text-white/60 uppercase tracking-widest">{item.insight_type}</span>
                  </div>
                  <span className="text-sm font-bold text-white">{item.count}</span>
                </div>
              ))}
              <div className="pt-4 border-t border-white/5">
                <div className="flex items-center justify-between text-[10px] font-bold text-emerald-500 uppercase tracking-widest">
                  <span>Efficiency Gain</span>
                  <span>+{aiPerformance?.performanceMetrics.efficiencyGain}%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Market Signal Trends */}
        <Card className="bg-zinc-900/50 border-white/5 shadow-xl">
          <CardHeader className="border-b border-white/5 bg-white/5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Globe className="h-5 w-5 text-interaction-primary" />
                <div>
                  <CardTitle className="text-sm font-bold text-white uppercase tracking-wider">Market Signal Intensity</CardTitle>
                  <CardDescription className="text-[10px] text-white/40">Daily volume of strategic market signals</CardDescription>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={marketTrends?.signalVolume}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                  <XAxis dataKey="day" stroke="#ffffff40" fontSize={10} tickLine={false} axisLine={false} />
                  <YAxis stroke="#ffffff40" fontSize={10} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#18181b', border: '1px solid #ffffff10', borderRadius: '12px' }}
                    itemStyle={{ color: '#2F80ED', fontSize: '12px' }}
                  />
                  <Line type="monotone" dataKey="volume" stroke="#2F80ED" strokeWidth={3} dot={{ fill: '#2F80ED', strokeWidth: 2, r: 4 }} activeDot={{ r: 6, strokeWidth: 0 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Insights Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 bg-zinc-900/50 border-white/5 shadow-xl">
          <CardHeader className="border-b border-white/5 bg-white/5">
            <CardTitle className="text-xs font-bold text-white uppercase tracking-widest flex items-center gap-2">
              <Activity className="h-4 w-4 text-interaction-primary" />
              Strategic Signal Heatmap
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {marketTrends?.trends.map((trend: any, i: number) => (
                <div key={i} className="p-4 bg-white/5 rounded-2xl border border-white/5 hover:border-interaction-primary/30 transition-all group">
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-[9px] font-bold text-white/40 uppercase tracking-widest">{trend.category}</span>
                    {trend.trend === 'up' ? (
                      <ArrowUpRight className="h-4 w-4 text-emerald-500" />
                    ) : trend.trend === 'down' ? (
                      <ArrowDownRight className="h-4 w-4 text-red-500" />
                    ) : (
                      <Activity className="h-4 w-4 text-white/20" />
                    )}
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-white">Intensity</span>
                      <span className="text-interaction-primary">{trend.strength}%</span>
                    </div>
                    <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-interaction-primary transition-all duration-1000" style={{ width: `${trend.strength}%` }}></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-interaction-primary/5 border-interaction-primary/20 shadow-none">
          <CardHeader className="border-b border-interaction-primary/10">
            <CardTitle className="text-xs font-bold text-interaction-primary uppercase tracking-widest flex items-center gap-2">
              <Zap className="h-4 w-4" />
              AI Strategic Outlook
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            {[
              "High probability of regulatory shift in APAC Q4.",
              "Consultant utilization peaking; suggest expanding expert network.",
              "AI efficiency gains exceeding targets by 15%."
            ].map((insight, i) => (
              <div key={i} className="flex gap-3 group cursor-pointer">
                <div className="h-5 w-5 rounded-full bg-interaction-primary/10 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-interaction-primary/20 transition-colors">
                  <ChevronRight className="h-3 w-3 text-interaction-primary" />
                </div>
                <p className="text-xs text-white/70 leading-relaxed group-hover:text-white transition-colors">{insight}</p>
              </div>
            ))}
            <Button className="w-full mt-4 bg-interaction-primary text-white text-[10px] font-bold uppercase tracking-widest h-10">
              Generate Full Report
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
