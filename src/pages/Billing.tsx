import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  CreditCard, 
  Check, 
  ArrowUpRight, 
  History, 
  Download, 
  Plus, 
  ShieldCheck, 
  Zap, 
  Globe,
  Building2,
  Users,
  BarChart3,
  Wallet,
  Receipt,
  AlertCircle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/src/components/ui/Card';
import { Button } from '@/src/components/ui/Button';
import { Badge } from '@/src/components/ui/Badge';
import { cn } from '@/src/utils/cn';

// --- Types ---

interface SubscriptionTier {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  isPopular?: boolean;
}

interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  status: 'Completed' | 'Pending' | 'Failed';
  type: 'Subscription' | 'Commission' | 'Session' | 'Project';
}

// --- Data ---

const SUBSCRIPTION_TIERS: SubscriptionTier[] = [
  {
    id: 'starter',
    name: 'Starter',
    price: '$499',
    period: '/month',
    description: 'Perfect for small teams exploring AI-driven strategic growth.',
    features: [
      '5 Autonomous AI Agents',
      'Basic Consultant Matching',
      '1 Strategy Room Session/mo',
      'Standard Automation Workflows',
      'Basic Knowledge Graph access',
      'Community Support'
    ]
  },
  {
    id: 'professional',
    name: 'Professional',
    price: '$1,299',
    period: '/month',
    description: 'Advanced capabilities for growing enterprises with complex needs.',
    features: [
      '25 Autonomous AI Agents',
      'Priority Consultant Access',
      '10 Strategy Room Sessions/mo',
      'Advanced Automation Orchestration',
      'Knowledge Graph Memory',
      'Custom AI Agent Workflows',
      'Priority Expert Matching'
    ],
    isPopular: true
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'Full-scale strategic intelligence for global organizations.',
    features: [
      'Unlimited AI Agents',
      'Dedicated Strategic Advisors',
      'Unlimited Strategy Room Sessions',
      'Custom Automation Systems',
      'Full API & ERP Integration',
      'On-premise Deployment Support',
      'SLA & Dedicated Support'
    ]
  }
];

const RECENT_TRANSACTIONS: Transaction[] = [
  { id: 'TX-9021', date: '2024-03-01', description: 'Professional Subscription - March', amount: 1299.00, status: 'Completed', type: 'Subscription' },
  { id: 'TX-8842', date: '2024-02-28', description: 'Marketplace Commission: Project Alpha', amount: 450.00, status: 'Completed', type: 'Commission' },
  { id: 'TX-8711', date: '2024-02-25', description: 'Strategy Room: APAC Expansion Advisory', amount: 250.00, status: 'Completed', type: 'Session' },
  { id: 'TX-8655', date: '2024-02-20', description: 'Project Execution Fee: Supply Chain Audit', amount: 1500.00, status: 'Completed', type: 'Project' },
];

export default function Billing() {
  const [currentTier, setCurrentTier] = useState('professional');
  const [transactions, setTransactions] = useState<Transaction[]>(RECENT_TRANSACTIONS);
  const [isLoading, setIsLoading] = useState(true);

  React.useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch('/api/transactions');
        if (response.ok) {
          const data = await response.json();
          // Map API data to Transaction interface
          const mappedData = data.map((tx: any) => ({
            id: `TX-${tx.transaction_id}`,
            date: tx.created_at.split(' ')[0],
            description: tx.description,
            amount: tx.amount,
            status: tx.status,
            type: tx.type === 'Advisory Session' ? 'Session' : 'Project'
          }));
          setTransactions([...mappedData, ...RECENT_TRANSACTIONS]);
        }
      } catch (error) {
        console.error('Failed to fetch transactions:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div className="max-w-6xl mx-auto space-y-10 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-heading font-bold text-white mb-2">Billing & Subscription</h1>
          <p className="text-white/40 max-w-2xl">Manage your enterprise subscription, view transaction history, and configure payment methods for the strategic intelligence platform.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="secondary" className="border-white/10 bg-white/5 text-white hover:bg-white/10">
            <Receipt className="h-4 w-4 mr-2" />
            Billing History
          </Button>
          <Button className="bg-interaction-primary text-white shadow-lg shadow-interaction-primary/20">
            <Plus className="h-4 w-4 mr-2" />
            Add Payment Method
          </Button>
        </div>
      </div>

      {/* Subscription Tiers */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Zap className="h-5 w-5 text-interaction-primary" />
            Enterprise Tiers
          </h2>
          <div className="flex items-center gap-2 bg-white/5 p-1 rounded-lg border border-white/10">
            <button className="px-4 py-1.5 text-xs font-bold text-white bg-interaction-primary rounded-md">Monthly</button>
            <button className="px-4 py-1.5 text-xs font-bold text-white/40 hover:text-white transition-colors">Yearly (Save 20%)</button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SUBSCRIPTION_TIERS.map((tier) => (
            <Card 
              key={tier.id} 
              className={cn(
                "relative border-white/5 bg-zinc-900/50 transition-all duration-300 hover:border-interaction-primary/30",
                tier.isPopular && "border-interaction-primary/50 bg-interaction-primary/5 ring-1 ring-interaction-primary/20",
                currentTier === tier.id && "ring-2 ring-interaction-primary"
              )}
            >
              {tier.isPopular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge className="bg-interaction-primary text-white text-[10px] font-bold px-3 py-0.5 border-none shadow-lg">
                    MOST POPULAR
                  </Badge>
                </div>
              )}
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start mb-2">
                  <CardTitle className="text-xl font-bold text-white">{tier.name}</CardTitle>
                  {currentTier === tier.id && (
                    <Badge variant="secondary" className="bg-interaction-primary/20 text-interaction-primary border-none text-[10px]">
                      Current Plan
                    </Badge>
                  )}
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-white">{tier.price}</span>
                  <span className="text-sm text-white/40">{tier.period}</span>
                </div>
                <CardDescription className="text-white/60 text-sm mt-2">{tier.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  {tier.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="mt-1 h-4 w-4 rounded-full bg-interaction-primary/20 flex items-center justify-center shrink-0">
                        <Check className="h-2.5 w-2.5 text-interaction-primary" />
                      </div>
                      <span className="text-xs text-white/70">{feature}</span>
                    </div>
                  ))}
                </div>
                <Button 
                  className={cn(
                    "w-full font-bold",
                    currentTier === tier.id 
                      ? "bg-white/10 text-white cursor-default hover:bg-white/10" 
                      : "bg-interaction-primary text-white hover:bg-interaction-primary/80"
                  )}
                  onClick={() => tier.id !== 'enterprise' && setCurrentTier(tier.id)}
                >
                  {currentTier === tier.id ? 'Active Plan' : tier.id === 'enterprise' ? 'Contact Sales' : 'Upgrade Now'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Monetization Models & Revenue */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Revenue Breakdown */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-ai-cyan" />
            Platform Revenue & Fees
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-zinc-900/50 border-white/5">
              <CardContent className="p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Marketplace Commission</span>
                  <ArrowUpRight className="h-3 w-3 text-green-500" />
                </div>
                <div className="text-2xl font-mono font-bold text-white">15%</div>
                <p className="text-[10px] text-white/40">Standard platform fee for expert engagements.</p>
              </CardContent>
            </Card>
            <Card className="bg-zinc-900/50 border-white/5">
              <CardContent className="p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Strategy Sessions</span>
                  <ArrowUpRight className="h-3 w-3 text-green-500" />
                </div>
                <div className="text-2xl font-mono font-bold text-white">$250</div>
                <p className="text-[10px] text-white/40">Per session advisory fee for non-pro users.</p>
              </CardContent>
            </Card>
            <Card className="bg-zinc-900/50 border-white/5">
              <CardContent className="p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Project Execution</span>
                  <ArrowUpRight className="h-3 w-3 text-green-500" />
                </div>
                <div className="text-2xl font-mono font-bold text-white">5%</div>
                <p className="text-[10px] text-white/40">Success fee on completed project milestones.</p>
              </CardContent>
            </Card>
          </div>

          {/* Transaction History */}
          <Card className="border-white/5 bg-zinc-900/50 overflow-hidden">
            <CardHeader className="border-b border-white/5">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-bold text-white">Recent Transactions</CardTitle>
                <Button variant="secondary" size="sm" className="h-8 text-[10px] border-white/10 bg-white/5">View All</Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-white/5 bg-white/5">
                      <th className="px-4 py-3 text-[10px] font-bold text-white/40 uppercase tracking-widest">Transaction ID</th>
                      <th className="px-4 py-3 text-[10px] font-bold text-white/40 uppercase tracking-widest">Date</th>
                      <th className="px-4 py-3 text-[10px] font-bold text-white/40 uppercase tracking-widest">Description</th>
                      <th className="px-4 py-3 text-[10px] font-bold text-white/40 uppercase tracking-widest">Amount</th>
                      <th className="px-4 py-3 text-[10px] font-bold text-white/40 uppercase tracking-widest">Status</th>
                      <th className="px-4 py-3 text-[10px] font-bold text-white/40 uppercase tracking-widest">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((tx) => (
                      <tr key={tx.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                        <td className="px-4 py-4 text-xs font-mono text-white/60">{tx.id}</td>
                        <td className="px-4 py-4 text-xs text-white/60">{tx.date}</td>
                        <td className="px-4 py-4">
                          <div className="flex flex-col">
                            <span className="text-xs font-bold text-white">{tx.description}</span>
                            <span className="text-[10px] text-white/40">{tx.type}</span>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-xs font-bold text-white">${tx.amount.toLocaleString()}</td>
                        <td className="px-4 py-4">
                          <Badge className={cn(
                            "text-[9px] border-none",
                            tx.status === 'Completed' ? 'bg-green-500/20 text-green-500' : 'bg-yellow-500/20 text-yellow-500'
                          )}>
                            {tx.status}
                          </Badge>
                        </td>
                        <td className="px-4 py-4">
                          <button className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white/40 hover:text-white">
                            <Download className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Revenue Sharing Model */}
          <Card className="border-white/5 bg-zinc-900/50 overflow-hidden">
            <CardHeader className="border-b border-white/5 bg-interaction-primary/5">
              <CardTitle className="text-sm font-bold text-white flex items-center gap-2">
                <Users className="h-4 w-4 text-interaction-primary" />
                Consultant Revenue Sharing Model
              </CardTitle>
              <CardDescription className="text-white/40 text-xs">How we distribute value between the platform and our expert network.</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-1 space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                      <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1">Consultant Share</p>
                      <p className="text-3xl font-bold text-interaction-primary">85%</p>
                      <p className="text-[10px] text-white/40 mt-1">Direct compensation for expertise and deliverables.</p>
                    </div>
                    <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                      <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1">Platform Fee</p>
                      <p className="text-3xl font-bold text-white">15%</p>
                      <p className="text-[10px] text-white/40 mt-1">Covers AI infrastructure, matching, and escrow.</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Check className="h-4 w-4 text-green-500" />
                      <span className="text-xs text-white/70 font-medium">Automated escrow and milestone-based payouts.</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Check className="h-4 w-4 text-green-500" />
                      <span className="text-xs text-white/70 font-medium">Transparent tracking of all engagement fees.</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Check className="h-4 w-4 text-green-500" />
                      <span className="text-xs text-white/70 font-medium">Instant payout capability for verified experts.</span>
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-64 aspect-square rounded-full border-8 border-white/5 flex items-center justify-center relative">
                  <div className="absolute inset-0 rounded-full border-8 border-interaction-primary border-t-transparent border-r-transparent rotate-[45deg]" />
                  <div className="text-center">
                    <p className="text-4xl font-bold text-white">85/15</p>
                    <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Split Ratio</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar: Payment & Security */}
        <div className="space-y-6">
          <Card className="border-white/5 bg-zinc-900/50">
            <CardHeader>
              <CardTitle className="text-sm font-bold text-white flex items-center gap-2">
                <CreditCard className="h-4 w-4 text-interaction-primary" />
                Payment Methods
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-white/5 rounded-xl border border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-12 bg-zinc-800 rounded flex items-center justify-center border border-white/10">
                    <span className="text-[10px] font-bold text-white">VISA</span>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">•••• 4242</p>
                    <p className="text-[10px] text-white/40">Expires 12/26</p>
                  </div>
                </div>
                <Badge className="bg-interaction-primary/20 text-interaction-primary text-[8px] border-none">Primary</Badge>
              </div>
              <Button variant="secondary" className="w-full h-10 border-white/10 bg-white/5 text-white text-xs font-bold">
                <Plus className="h-3 w-3 mr-2" />
                Add New Card
              </Button>
            </CardContent>
          </Card>

          <Card className="border-white/5 bg-zinc-900/50">
            <CardHeader>
              <CardTitle className="text-sm font-bold text-white flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-green-500" />
                Enterprise Billing
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <p className="text-xs font-bold text-white">Billing Entity</p>
                <p className="text-xs text-white/60">Matrix 360 Operations Ltd.</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-bold text-white">Tax ID</p>
                <p className="text-xs text-white/60">VAT GB 123 4567 89</p>
              </div>
              <div className="pt-2">
                <Button variant="secondary" className="w-full h-10 border-white/10 bg-white/5 text-white text-xs font-bold">
                  Edit Billing Details
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="p-4 bg-interaction-primary/5 border border-interaction-primary/20 rounded-2xl space-y-3">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-interaction-primary" />
              <span className="text-[10px] font-bold text-interaction-primary uppercase tracking-widest">Billing Notice</span>
            </div>
            <p className="text-[11px] text-white/70 leading-relaxed">
              Your next billing cycle starts on <span className="text-white font-bold">April 1st, 2024</span>. You will be charged <span className="text-white font-bold">$1,299.00</span> for the Professional tier.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
