import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/Card';
import { Badge } from '@/src/components/ui/Badge';
import { Button } from '@/src/components/ui/Button';
import { 
  Search, 
  MessageSquare, 
  Users, 
  MoreHorizontal, 
  Send, 
  Paperclip, 
  Smile, 
  Phone, 
  Video, 
  Info,
  Check,
  CheckCheck,
  Clock,
  BrainCircuit,
  Zap
} from 'lucide-react';
import { cn } from '@/src/utils/cn';

const CONVERSATIONS = [
  {
    id: 1,
    name: 'APAC Strategy Sync',
    lastMessage: 'The regulatory draft is ready for review.',
    time: '10:45 AM',
    unread: 2,
    type: 'group',
    members: 4,
    avatar: null
  },
  {
    id: 2,
    name: 'Dr. Sarah Jenkins',
    lastMessage: 'I will send the compliance checklist by EOD.',
    time: '9:30 AM',
    unread: 0,
    type: 'direct',
    avatar: 'https://picsum.photos/seed/sarah/100/100'
  },
  {
    id: 3,
    name: 'Matrix AI Assistant',
    lastMessage: 'I have analyzed the latest market signals.',
    time: 'Yesterday',
    unread: 0,
    type: 'ai',
    avatar: null
  },
  {
    id: 4,
    name: 'Marcus Chen',
    lastMessage: 'Let\'s discuss the Vietnam entry strategy.',
    time: 'Yesterday',
    unread: 0,
    type: 'direct',
    avatar: 'https://picsum.photos/seed/marcus/100/100'
  }
];

const MESSAGES = [
  {
    id: 1,
    sender: 'Dr. Sarah Jenkins',
    content: 'Hello team, I have completed the initial regulatory scan for the Singapore market.',
    time: '10:30 AM',
    isMe: false,
    avatar: 'https://picsum.photos/seed/sarah/100/100'
  },
  {
    id: 2,
    sender: 'Me',
    content: 'Great work Sarah. Any major blockers identified?',
    time: '10:32 AM',
    isMe: true,
    avatar: null
  },
  {
    id: 3,
    sender: 'Matrix AI',
    content: 'Analysis: The new data sovereignty guidelines in Singapore may require localized storage solutions for Fintech Global. Impact score: Medium.',
    time: '10:33 AM',
    isMe: false,
    isAI: true,
    avatar: null
  },
  {
    id: 4,
    sender: 'Dr. Sarah Jenkins',
    content: 'Exactly what the AI suggests. I am drafting the mitigation plan now.',
    time: '10:45 AM',
    isMe: false,
    avatar: 'https://picsum.photos/seed/sarah/100/100'
  }
];

export default function Conversations() {
  const [selectedId, setSelectedId] = useState(1);
  const [message, setMessage] = useState('');

  const selectedChat = CONVERSATIONS.find(c => c.id === selectedId);

  return (
    <div className="h-[calc(100vh-12rem)] flex gap-6">
      {/* Sidebar: Chat List */}
      <div className="w-80 flex flex-col gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
          <input 
            type="text" 
            placeholder="Search conversations..." 
            className="w-full bg-white border border-border-light rounded-xl pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-interaction-primary/20 focus:border-interaction-primary transition-all"
          />
        </div>

        <Card className="flex-1 border-border-light bg-white shadow-sm overflow-hidden flex flex-col">
          <CardHeader className="py-4 px-5 border-b border-border-light shrink-0">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-bold">Messages</CardTitle>
              <Button variant="text" size="sm" className="h-8 w-8 p-0 rounded-full">
                <Users className="h-4 w-4 text-text-muted" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0 flex-1 overflow-y-auto custom-scrollbar">
            <div className="divide-y divide-border-light">
              {CONVERSATIONS.map((chat) => (
                <div 
                  key={chat.id}
                  onClick={() => setSelectedId(chat.id)}
                  className={cn(
                    "p-4 cursor-pointer transition-all hover:bg-secondary-bg flex gap-3",
                    selectedId === chat.id && "bg-interaction-primary/5 border-l-4 border-interaction-primary"
                  )}
                >
                  <div className="relative shrink-0">
                    {chat.avatar ? (
                      <img src={chat.avatar} alt={chat.name} className="w-10 h-10 rounded-xl object-cover border border-border-light" referrerPolicy="no-referrer" />
                    ) : (
                      <div className={cn(
                        "w-10 h-10 rounded-xl flex items-center justify-center border",
                        chat.type === 'ai' ? "bg-interaction-primary/10 border-interaction-primary/20" : "bg-secondary-bg border-border-light"
                      )}>
                        {chat.type === 'ai' ? <BrainCircuit className="h-5 w-5 text-interaction-primary" /> : <Users className="h-5 w-5 text-text-muted" />}
                      </div>
                    )}
                    {chat.unread > 0 && (
                      <div className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-interaction-primary text-[10px] font-bold text-white flex items-center justify-center border-2 border-white">
                        {chat.unread}
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center mb-0.5">
                      <h4 className={cn("text-xs font-bold truncate", chat.unread > 0 ? "text-text-main" : "text-text-secondary")}>
                        {chat.name}
                      </h4>
                      <span className="text-[10px] text-text-muted whitespace-nowrap">{chat.time}</span>
                    </div>
                    <p className="text-[11px] text-text-muted truncate leading-tight">
                      {chat.lastMessage}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main: Chat Window */}
      <Card className="flex-1 border-border-light bg-white shadow-sm overflow-hidden flex flex-col">
        {/* Chat Header */}
        <CardHeader className="py-3 px-6 border-b border-border-light shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                {selectedChat?.avatar ? (
                  <img src={selectedChat.avatar} alt={selectedChat.name} className="w-10 h-10 rounded-xl object-cover border border-border-light" referrerPolicy="no-referrer" />
                ) : (
                  <div className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center border",
                    selectedChat?.type === 'ai' ? "bg-interaction-primary/10 border-interaction-primary/20" : "bg-secondary-bg border-border-light"
                  )}>
                    {selectedChat?.type === 'ai' ? <BrainCircuit className="h-5 w-5 text-interaction-primary" /> : <Users className="h-5 w-5 text-text-muted" />}
                  </div>
                )}
                <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-alert-opportunity border-2 border-white"></div>
              </div>
              <div>
                <h3 className="text-sm font-bold text-text-main">{selectedChat?.name}</h3>
                <p className="text-[10px] text-text-muted flex items-center gap-1">
                  {selectedChat?.type === 'group' ? `${selectedChat.members} members` : 'Online'}
                  <span className="h-1 w-1 rounded-full bg-alert-opportunity"></span>
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Button variant="text" size="sm" className="h-9 w-9 p-0 rounded-xl hover:bg-secondary-bg">
                <Phone className="h-4 w-4 text-text-muted" />
              </Button>
              <Button variant="text" size="sm" className="h-9 w-9 p-0 rounded-xl hover:bg-secondary-bg">
                <Video className="h-4 w-4 text-text-muted" />
              </Button>
              <Button variant="text" size="sm" className="h-9 w-9 p-0 rounded-xl hover:bg-secondary-bg">
                <Info className="h-4 w-4 text-text-muted" />
              </Button>
              <Button variant="text" size="sm" className="h-9 w-9 p-0 rounded-xl hover:bg-secondary-bg">
                <MoreHorizontal className="h-4 w-4 text-text-muted" />
              </Button>
            </div>
          </div>
        </CardHeader>

        {/* Messages Area */}
        <CardContent className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar bg-gray-50/30">
          {MESSAGES.map((msg) => (
            <div key={msg.id} className={cn(
              "flex gap-3 max-w-[80%]",
              msg.isMe ? "ml-auto flex-row-reverse" : ""
            )}>
              <div className="shrink-0">
                {msg.avatar ? (
                  <img src={msg.avatar} alt={msg.sender} className="w-8 h-8 rounded-lg object-cover border border-border-light shadow-sm" referrerPolicy="no-referrer" />
                ) : (
                  <div className={cn(
                    "w-8 h-8 rounded-lg flex items-center justify-center border shadow-sm",
                    msg.isAI ? "bg-interaction-primary/10 border-interaction-primary/20" : "bg-secondary-bg border-border-light"
                  )}>
                    {msg.isAI ? <BrainCircuit className="h-4 w-4 text-interaction-primary" /> : <User className="h-4 w-4 text-text-muted" />}
                  </div>
                )}
              </div>
              <div className={cn(
                "space-y-1",
                msg.isMe ? "items-end" : "items-start"
              )}>
                <div className={cn(
                  "px-4 py-2.5 rounded-2xl text-sm shadow-sm",
                  msg.isMe 
                    ? "bg-interaction-primary text-white rounded-tr-none" 
                    : msg.isAI 
                      ? "bg-white border border-interaction-primary/20 text-text-main rounded-tl-none"
                      : "bg-white border border-border-light text-text-main rounded-tl-none"
                )}>
                  {msg.isAI && (
                    <div className="flex items-center gap-1.5 mb-1.5 pb-1.5 border-b border-interaction-primary/10">
                      <Zap className="h-3 w-3 text-interaction-primary" />
                      <span className="text-[10px] font-bold text-interaction-primary uppercase tracking-wider">AI Intelligence Insight</span>
                    </div>
                  )}
                  <p className="leading-relaxed">{msg.content}</p>
                </div>
                <div className="flex items-center gap-1.5 px-1">
                  <span className="text-[10px] text-text-muted font-medium">{msg.time}</span>
                  {msg.isMe && <CheckCheck className="h-3 w-3 text-interaction-primary" />}
                </div>
              </div>
            </div>
          ))}
        </CardContent>

        {/* Input Area */}
        <div className="p-4 border-t border-border-light bg-white shrink-0">
          <div className="flex items-end gap-3">
            <div className="flex gap-1 mb-1">
              <Button variant="text" size="sm" className="h-9 w-9 p-0 rounded-xl hover:bg-secondary-bg">
                <Paperclip className="h-4 w-4 text-text-muted" />
              </Button>
              <Button variant="text" size="sm" className="h-9 w-9 p-0 rounded-xl hover:bg-secondary-bg">
                <Smile className="h-4 w-4 text-text-muted" />
              </Button>
            </div>
            <div className="flex-1 relative">
              <textarea 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message or ask AI for strategic analysis..." 
                className="w-full bg-secondary-bg border border-border-light rounded-2xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-interaction-primary/20 focus:border-interaction-primary transition-all resize-none min-h-[44px] max-h-32 custom-scrollbar"
                rows={1}
              />
            </div>
            <Button 
              className={cn(
                "h-10 w-10 p-0 rounded-xl shadow-md transition-all",
                message ? "bg-interaction-primary text-white" : "bg-secondary-bg text-text-muted"
              )}
              disabled={!message}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}

function User({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
