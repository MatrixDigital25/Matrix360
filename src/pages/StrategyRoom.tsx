import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import {
  Video, Mic, MicOff, VideoOff, PhoneOff,
  MessageSquare, Users, BrainCircuit, FileText,
  Settings, Share2, MoreVertical, Send,
  Play, Square, Layout, Maximize2, StopCircle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/Card';
import { Button } from '@/src/components/ui/Button';
import { Badge } from '@/src/components/ui/Badge';
import { Input } from '@/src/components/ui/Input';
import { JitsiMeeting } from '@jitsi/react-sdk';

export default function StrategyRoom() {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [activeTab, setActiveTab] = useState<'chat' | 'insights' | 'participants'>('insights');
  const [isRecording, setIsRecording] = useState(false);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const roomName = "Matrix360-Strategy-Room-APAC-" + new Date().toISOString().split('T')[0];

  const toggleRecording = async () => {
    if (isRecording) {
      if (mediaRecorderRef.current) {
        mediaRecorderRef.current.stop();
      }
      setIsRecording(false);
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: { displaySurface: 'browser' } as any,
        audio: true
      });

      const options = { mimeType: 'video/webm;codecs=vp9,opus' };
      const mediaRecorder = new MediaRecorder(stream, options);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        document.body.appendChild(a);
        a.style.display = 'none';
        a.href = url;
        a.download = `Matrix360-Strategy-Recording-${new Date().getTime()}.webm`;
        a.click();
        window.URL.revokeObjectURL(url);

        // Ensure tracks are stopped
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);

      stream.getVideoTracks()[0].onended = () => {
        if (mediaRecorder.state !== 'inactive') {
          mediaRecorder.stop();
        }
        setIsRecording(false);
      };
    } catch (err) {
      console.error('Error starting recording:', err);
      setIsRecording(false);
    }
  };

  const participants = [
    { id: 1, name: 'Marcus Chen', role: 'Strategic Advisor', active: true, avatar: 'MC' },
    { id: 2, name: 'Sarah Jenkins', role: 'Enterprise Lead', active: true, avatar: 'SJ' },
    { id: 3, name: 'AI Strategy Bot', role: 'Intelligence Assistant', active: true, avatar: 'AI', isAI: true },
    { id: 4, name: 'David Miller', role: 'Technical Architect', active: false, avatar: 'DM' },
  ];

  const insights = [
    { id: 1, time: '10:14 AM', type: 'Decision', content: 'Approved APAC market entry timeline for Q3 2024.' },
    { id: 2, time: '10:22 AM', type: 'Risk', content: 'Potential regulatory bottleneck identified in Singapore data laws.' },
    { id: 3, time: '10:35 AM', type: 'Action', content: 'Marcus to draft initial compliance framework by Friday.' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="h-[calc(100vh-120px)] flex flex-col gap-12"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-heading font-bold text-text-main">APAC Strategy Session</h1>
            <Badge variant="red" className="animate-pulse">LIVE</Badge>
          </div>
          <p className="text-text-muted text-sm">Strategic Intelligence Room #402 • 4 Participants</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="secondary" size="sm">
            <Share2 className="h-4 w-4 mr-2" />
            Invite
          </Button>
          <Button variant="secondary" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Room Settings
          </Button>
        </div>
      </div>

      <div className="flex-1 flex gap-6 overflow-hidden">
        {/* Main Video Area */}
        <div className="flex-1 flex flex-col gap-6">
          <div className="flex-1 bg-black rounded-2xl relative overflow-hidden group">
            <JitsiMeeting
              roomName={roomName}
              configOverwrite={{
                startWithAudioMuted: true,
                disableModeratorIndicator: true,
                startScreenSharing: false,
                enableEmailInStats: false,
                prejoinPageEnabled: false,
              }}
              interfaceConfigOverwrite={{
                DISABLE_JOIN_LEAVE_NOTIFICATIONS: true,
                SHOW_JITSI_WATERMARK: false,
                SHOW_WATERMARK_FOR_GUESTS: false,
                SHOW_CHROME_EXTENSION_BANNER: false,
                APP_NAME: 'Matrix 360 Consulting',
                NATIVE_APP_NAME: 'Matrix 360 Consulting',
                PROVIDER_NAME: 'Matrix 360 Consulting'
              }}
              userInfo={{
                displayName: 'Matrix Advisor',
                email: 'advisor@matrix360.com'
              }}
              getIFrameRef={(iframeRef) => {
                iframeRef.style.height = '100%';
                iframeRef.style.width = '100%';
              }}
            />

            {/* Matrix 360 Custom Branding Overlay */}
            <div className="absolute top-4 left-4 z-10 pointer-events-none flex items-center gap-3">
              <div className="bg-black/50 backdrop-blur-md px-4 py-2 rounded-lg border border-white/10 flex items-center gap-2">
                <BrainCircuit className="h-5 w-5 text-interaction-primary" />
                <span className="text-sm font-heading font-bold text-white tracking-widest uppercase">
                  Matrix 360 Consulting
                </span>
                <span className="text-xs text-text-muted border-l border-white/20 pl-2 ml-1">
                  Secure video room
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Toolbar */}
          <div className="flex items-center justify-between bg-panel-bg p-5 rounded-xl border border-panel-border">
            <div className="flex items-center gap-6">
              {isRecording ? (
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-xs font-mono text-red-500 uppercase tracking-widest">Recording Active</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-xs font-mono text-text-muted uppercase tracking-widest">Meeting Live</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <BrainCircuit className="h-4 w-4 text-interaction-primary" />
                <span className="text-xs font-mono text-text-muted uppercase tracking-widest">AI Analysis: High Confidence</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant={isRecording ? "red" : "secondary"} size="sm" onClick={toggleRecording}>
                {isRecording ? <StopCircle className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
                {isRecording ? "Stop Recording" : "Record Room"}
              </Button>
              <Button variant="secondary" size="sm">
                <FileText className="h-4 w-4 mr-2" />
                Whiteboard
              </Button>
              <Button variant="secondary" size="sm">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Right Sidebar Panel */}
        <div className="w-80 flex flex-col gap-6">
          <div className="flex p-1 bg-secondary-bg rounded-lg border border-panel-border">
            <button
              onClick={() => setActiveTab('insights')}
              className={cn(
                "flex-1 py-1.5 text-xs font-bold rounded-md transition-all",
                activeTab === 'insights' ? "bg-panel-bg text-interaction-primary shadow-sm" : "text-text-muted hover:text-text-main"
              )}
            >
              AI Insights
            </button>
            <button
              onClick={() => setActiveTab('chat')}
              className={cn(
                "flex-1 py-1.5 text-xs font-bold rounded-md transition-all",
                activeTab === 'chat' ? "bg-panel-bg text-interaction-primary shadow-sm" : "text-text-muted hover:text-text-main"
              )}
            >
              Chat
            </button>
            <button
              onClick={() => setActiveTab('participants')}
              className={cn(
                "flex-1 py-1.5 text-xs font-bold rounded-md transition-all",
                activeTab === 'participants' ? "bg-panel-bg text-interaction-primary shadow-sm" : "text-text-muted hover:text-text-main"
              )}
            >
              People
            </button>
          </div>

          <Card className="flex-1 flex flex-col overflow-hidden border-panel-border bg-panel-bg">
            <CardContent className="p-0 flex-1 flex flex-col overflow-hidden">
              {activeTab === 'insights' && (
                <div className="p-5 space-y-4 overflow-y-auto">
                  <div className="p-3 bg-interaction-primary/5 border border-interaction-primary/10 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <BrainCircuit className="h-4 w-4 text-interaction-primary" />
                      <span className="text-[10px] font-bold text-interaction-primary uppercase tracking-wider">AI Summary</span>
                    </div>
                    <p className="text-xs text-text-muted leading-relaxed">
                      The team is converging on a phased entry strategy, prioritizing Singapore as the regional hub.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Key Moments</h4>
                    {insights.map((insight) => (
                      <div key={insight.id} className="p-3 border border-panel-border rounded-lg hover:border-interaction-primary/30 transition-colors">
                        <div className="flex items-center justify-between mb-1">
                          <Badge variant={insight.type === 'Decision' ? 'green' : insight.type === 'Risk' ? 'red' : 'secondary'} className="text-[9px] px-1.5 py-0">
                            {insight.type}
                          </Badge>
                          <span className="text-[9px] font-mono text-text-muted">{insight.time}</span>
                        </div>
                        <p className="text-xs text-text-main leading-relaxed">{insight.content}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'chat' && (
                <div className="flex flex-col h-full">
                  <div className="flex-1 p-5 space-y-4 overflow-y-auto">
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] font-bold text-text-muted">Marcus Chen • 10:12 AM</span>
                      <div className="p-2 bg-secondary-bg rounded-lg text-xs text-text-main">
                        Has everyone reviewed the latest compliance doc?
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] font-bold text-text-muted">Sarah Jenkins • 10:14 AM</span>
                      <div className="p-2 bg-secondary-bg rounded-lg text-xs text-text-main">
                        Yes, looks solid. Ready to discuss.
                      </div>
                    </div>
                  </div>
                  <div className="p-5 border-t border-panel-border">
                    <div className="flex gap-2">
                      <Input placeholder="Type a message..." className="h-9 text-xs" />
                      <Button size="icon" className="h-9 w-9 shrink-0">
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'participants' && (
                <div className="p-5 space-y-4 overflow-y-auto">
                  {participants.map((p) => (
                    <div key={p.id} className="flex items-center justify-between group">
                      <div className="flex items-center gap-3">
                        <div className={cn(
                          "h-8 w-8 rounded-full flex items-center justify-center text-[10px] font-bold border",
                          p.isAI ? "bg-interaction-primary/10 text-interaction-primary border-interaction-primary/20" : "bg-secondary-bg text-text-main border-panel-border"
                        )}>
                          {p.avatar}
                        </div>
                        <div>
                          <p className="text-xs font-bold text-text-main flex items-center gap-1">
                            {p.name}
                            {p.isAI && <BrainCircuit className="h-3 w-3 text-interaction-primary" />}
                          </p>
                          <p className="text-[10px] text-text-muted">{p.role}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button variant="ghost" size="icon" className="h-7 w-7">
                          <MoreVertical className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
