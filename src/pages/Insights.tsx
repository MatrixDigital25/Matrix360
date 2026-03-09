import React from 'react';
import { motion } from 'motion/react';
import { Card, CardContent } from '@/src/components/ui/Card';
import { Badge } from '@/src/components/ui/Badge';
import { Button } from '@/src/components/ui/Button';
import { 
  MessageSquare, 
  Share2, 
  ThumbsUp, 
  MoreHorizontal, 
  Globe, 
  Lock, 
  TrendingUp, 
  AlertCircle,
  BrainCircuit,
  ArrowUpRight,
  Search,
  User,
  Target,
  Users
} from 'lucide-react';

const FEED_POSTS = [
  {
    id: 1,
    author: {
      name: 'Dr. Sarah Jenkins',
      role: 'Regulatory Strategist',
      avatar: 'https://picsum.photos/seed/sarah/100/100'
    },
    type: 'Strategic Insight',
    timestamp: '2h ago',
    title: 'EU AI Act: Strategic Compliance Framework',
    content: 'The new EU AI Act implementation guidelines have just been released. Key takeaway for enterprise: focus on high-risk system classification and data governance audit trails. We are seeing a 40% increase in compliance overhead for non-prepared firms.',
    tags: ['AI Regulation', 'Compliance', 'EU Policy'],
    stats: { likes: 24, comments: 8, shares: 12 },
    isAI: false,
    actionType: 'discuss'
  },
  {
    id: 2,
    author: {
      name: 'Matrix AI',
      role: 'Intelligence System',
      avatar: null
    },
    type: 'AI Research Report',
    timestamp: '4h ago',
    title: 'APAC Semiconductor Supply Chain Volatility',
    content: 'Market Signal Detected: Significant shift in APAC semiconductor supply chain routes. Predictive models suggest a 15% increase in lead times for high-end GPUs over the next quarter. Recommended Action: Diversify supplier base or front-load inventory.',
    tags: ['Supply Chain', 'Semiconductors', 'APAC'],
    stats: { likes: 45, comments: 15, shares: 30 },
    isAI: true,
    actionType: 'save'
  },
  {
    id: 3,
    author: {
      name: 'Global Logistics Corp',
      role: 'Enterprise Client',
      avatar: 'https://picsum.photos/seed/corp/100/100'
    },
    type: 'Strategic Challenge',
    timestamp: '6h ago',
    title: 'Sustainable Last-Mile Delivery Optimization',
    content: 'We are seeking experts to help us integrate AI-driven route optimization with our new electric vehicle fleet. Goal: Reduce carbon footprint by 30% while maintaining delivery windows in dense urban environments.',
    tags: ['Sustainability', 'Logistics', 'EV'],
    stats: { likes: 12, comments: 5, shares: 2 },
    isAI: false,
    actionType: 'join'
  },
  {
    id: 4,
    author: {
      name: 'Marcus Chen',
      role: 'APAC Expansion Lead',
      avatar: 'https://picsum.photos/seed/marcus/100/100'
    },
    type: 'Project Update',
    timestamp: '1d ago',
    title: 'Vietnam Market Entry: Phase 1 Complete',
    content: 'Successfully completed the market entry strategy for a major fintech client in Vietnam. The local regulatory landscape is rapidly evolving, favoring decentralized finance solutions. Great collaboration with the local policy team.',
    tags: ['Market Entry', 'Fintech', 'Vietnam'],
    stats: { likes: 18, comments: 4, shares: 5 },
    isAI: false,
    actionType: 'expert'
  },
  {
    id: 5,
    author: {
      name: 'Automation Core',
      role: 'System Monitor',
      avatar: null
    },
    type: 'Automation Alert',
    timestamp: '2d ago',
    title: 'Workflow Efficiency Peak Detected',
    content: 'The new automated procurement pipeline has reached 95% efficiency, reducing manual intervention by 60 hours per week. System suggests expanding this model to the inventory management module.',
    tags: ['Automation', 'Efficiency', 'Procurement'],
    stats: { likes: 32, comments: 2, shares: 8 },
    isAI: true,
    actionType: 'discuss'
  }
];

export default function Feed() {
  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-12">
      {/* Feed Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-heading font-bold text-text-main">Strategic Intelligence Feed</h1>
          <p className="text-text-muted mt-1">Live ecosystem of consultants, enterprises, and AI systems.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" className="h-10 px-4 text-xs bg-white border-border-light shadow-sm">
            All Intelligence
          </Button>
          <Button variant="secondary" className="h-10 px-4 text-xs bg-white border-border-light shadow-sm">
            My Network
          </Button>
        </div>
      </div>

      {/* Post Creator */}
      <Card className="bg-white border-border-light shadow-sm">
        <CardContent className="p-5">
          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-xl bg-secondary-bg flex items-center justify-center border border-border-light">
              <User className="h-6 w-6 text-text-muted" />
            </div>
            <div className="flex-1">
              <button className="w-full text-left px-5 py-3 rounded-xl bg-secondary-bg text-text-muted text-sm border border-border-light hover:bg-gray-100 transition-colors">
                Share a strategic insight, challenge, or intelligence alert...
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-border-light">
            <div className="flex gap-6">
              <button className="flex items-center gap-2 text-xs font-bold text-text-muted hover:text-interaction-primary transition-colors">
                <BrainCircuit className="h-4 w-4 text-interaction-primary" />
                AI Analysis
              </button>
              <button className="flex items-center gap-2 text-xs font-bold text-text-muted hover:text-interaction-primary transition-colors">
                <Globe className="h-4 w-4 text-ai-cyan" />
                Market Signal
              </button>
              <button className="flex items-center gap-2 text-xs font-bold text-text-muted hover:text-interaction-primary transition-colors">
                <Target className="h-4 w-4 text-alert-risk" />
                Challenge
              </button>
            </div>
            <Button className="h-9 px-6 text-xs bg-interaction-primary text-white border-none shadow-sm">
              Post
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Posts List */}
      <div className="space-y-6">
        {FEED_POSTS.map((post) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="bg-white border-border-light shadow-sm hover:shadow-md transition-all duration-300">
              <CardContent className="p-6">
                {/* Post Header */}
                <div className="flex items-start justify-between mb-5">
                  <div className="flex gap-4">
                    {post.author.avatar ? (
                      <img 
                        src={post.author.avatar} 
                        alt={post.author.name} 
                        className="w-12 h-12 rounded-xl object-cover border border-border-light shadow-sm"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-xl bg-interaction-primary/10 flex items-center justify-center border border-interaction-primary/20 shadow-sm">
                        <BrainCircuit className="h-6 w-6 text-interaction-primary" />
                      </div>
                    )}
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-text-main text-sm">{post.author.name}</h3>
                        {post.isAI && (
                          <Badge className="bg-interaction-primary/10 text-interaction-primary border-none text-[10px] px-1.5 py-0 font-bold uppercase tracking-wider">AI System</Badge>
                        )}
                      </div>
                      <p className="text-xs text-text-muted font-medium">{post.author.role}</p>
                      <div className="flex items-center gap-1.5 mt-1">
                        <span className="text-[10px] text-text-muted font-bold uppercase tracking-tighter">{post.timestamp}</span>
                        <span className="text-[10px] text-text-muted">•</span>
                        <Globe className="h-3 w-3 text-text-muted" />
                      </div>
                    </div>
                  </div>
                  <button className="p-2 hover:bg-secondary-bg rounded-xl transition-colors">
                    <MoreHorizontal className="h-5 w-5 text-text-muted" />
                  </button>
                </div>

                {/* Post Content */}
                <div className="mb-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="secondary" className="bg-secondary-bg text-text-muted border-border-light text-[10px] px-2 py-0.5 font-bold uppercase tracking-wider">
                      {post.type}
                    </Badge>
                  </div>
                  <h2 className="text-lg font-bold text-text-main mb-2 leading-tight">{post.title}</h2>
                  <p className="text-sm text-text-main leading-relaxed">
                    {post.content}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {post.tags.map(tag => (
                    <span key={tag} className="text-xs font-bold text-interaction-primary hover:underline cursor-pointer bg-interaction-primary/5 px-2 py-0.5 rounded-md">
                      #{tag.replace(/\s+/g, '')}
                    </span>
                  ))}
                </div>

                {/* Interaction Buttons */}
                <div className="flex items-center justify-between pt-4 border-t border-border-light">
                  <div className="flex gap-2">
                    <Button variant="secondary" className="h-9 px-4 text-xs bg-white border-border-light hover:bg-secondary-bg">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Discuss
                    </Button>
                    {post.actionType === 'join' && (
                      <Button className="h-9 px-4 text-xs bg-interaction-primary text-white border-none shadow-sm">
                        <Target className="mr-2 h-4 w-4" />
                        Join Project
                      </Button>
                    )}
                    {post.actionType === 'expert' && (
                      <Button className="h-9 px-4 text-xs bg-ai-violet text-white border-none shadow-sm">
                        <Users className="mr-2 h-4 w-4" />
                        Request Expert
                      </Button>
                    )}
                    {post.actionType === 'save' && (
                      <Button variant="secondary" className="h-9 px-4 text-xs bg-white border-border-light hover:bg-secondary-bg">
                        <ArrowUpRight className="mr-2 h-4 w-4" />
                        Save Insight
                      </Button>
                    )}
                  </div>
                  <div className="flex gap-4">
                    <button className="flex items-center gap-1.5 text-xs font-bold text-text-muted hover:text-interaction-primary transition-colors">
                      <ThumbsUp className="h-4 w-4" />
                      {post.stats.likes}
                    </button>
                    <button className="flex items-center gap-1.5 text-xs font-bold text-text-muted hover:text-interaction-primary transition-colors">
                      <Share2 className="h-4 w-4" />
                      {post.stats.shares}
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
