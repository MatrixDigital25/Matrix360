import React, { useState, useRef } from 'react';
import { JitsiMeeting } from '@jitsi/react-sdk';
import {
  Video, Mic, MicOff, VideoOff, PhoneOff,
  Users, BrainCircuit, Download,
  StopCircle, Play, Settings, Share2
} from 'lucide-react';
import { cn } from '@/src/utils/cn';

export default function StrategyRoom() {
  const [isRecording, setIsRecording] = useState(false);
  const [roomName] = useState(() => 'Matrix360-Strategy-' + Math.random().toString(36).substring(2, 8));
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const toggleRecording = async () => {
    if (isRecording) {
      mediaRecorderRef.current?.stop();
      setIsRecording(false);
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: true
      });

      const recorder = new MediaRecorder(stream, { mimeType: 'video/webm' });
      chunksRef.current = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `matrix360-recording-${Date.now()}.webm`;
        a.click();
        URL.revokeObjectURL(url);
        stream.getTracks().forEach(t => t.stop());
      };

      recorder.start();
      mediaRecorderRef.current = recorder;
      setIsRecording(true);
    } catch (err) {
      console.error('Recording failed:', err);
    }
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <div className="h-10 w-10 rounded-xl bg-red-500/10 flex items-center justify-center border border-red-500/20">
            <div className="h-2.5 w-2.5 rounded-full bg-red-500 animate-pulse" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-text-main">Matrix 360 Strategy Room</h1>
            <p className="text-[10px] text-text-muted flex items-center gap-2 uppercase tracking-wider font-bold">
              <BrainCircuit className="h-3 w-3" /> Secure • Encrypted • Free
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {isRecording && (
            <div className="flex items-center gap-2 px-3 py-1.5 bg-red-500/10 border border-red-500/20 rounded-xl">
              <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-[10px] font-bold text-red-500 uppercase tracking-wider">Recording</span>
            </div>
          )}
          <button
            onClick={toggleRecording}
            className={cn(
              "h-9 px-4 rounded-xl text-xs font-bold flex items-center gap-2 transition-all border",
              isRecording
                ? "bg-red-500/10 border-red-500/30 text-red-500 hover:bg-red-500/20"
                : "bg-zinc-100 border-zinc-200 text-zinc-700 hover:bg-zinc-200"
            )}
          >
            {isRecording ? <StopCircle className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            {isRecording ? 'Stop Recording' : 'Record'}
          </button>
        </div>
      </div>

      {/* Video Area - Full Width Jitsi */}
      <div className="flex-1 rounded-2xl overflow-hidden border border-zinc-200 bg-zinc-900 relative min-h-0">
        {/* Matrix360 Logo Overlay */}
        <div className="absolute top-4 left-4 z-10 pointer-events-none">
          <img src="/Matrix360.png" alt="Matrix360" className="h-8 w-auto object-contain opacity-80 drop-shadow-lg" />
        </div>
        <JitsiMeeting
          roomName={roomName}
          configOverwrite={{
            startWithAudioMuted: true,
            disableModeratorIndicator: true,
            startScreenSharing: false,
            enableEmailInStats: false,
            prejoinPageEnabled: true
          }}
          interfaceConfigOverwrite={{
            DISABLE_JOIN_LEAVE_NOTIFICATIONS: true,
            SHOW_JITSI_WATERMARK: false,
            SHOW_WATERMARK_FOR_GUESTS: false,
            SHOW_CHROME_EXTENSION_BANNER: false,
            SHOW_PROMOTIONAL_CLOSE_PAGE: false,
            APP_NAME: 'Matrix 360 Consulting',
            NATIVE_APP_NAME: 'Matrix 360 Consulting',
            PROVIDER_NAME: 'Matrix 360 Consulting',
            TOOLBAR_BUTTONS: [
              'microphone', 'camera', 'closedcaptions', 'desktop',
              'fullscreen', 'fodeviceselection', 'hangup', 'chat',
              'raisehand', 'tileview', 'select-background',
              'participants-pane', 'toggle-camera'
            ]
          }}
          userInfo={{
            displayName: 'Matrix Advisor',
            email: 'advisor@matrix360.com'
          }}
          getIFrameRef={(iframeRef) => {
            iframeRef.style.height = '100%';
            iframeRef.style.width = '100%';
            iframeRef.style.border = 'none';
          }}
        />
      </div>

      {/* Footer Info */}
      <div className="shrink-0 flex items-center justify-between text-[10px] text-text-muted px-2">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
            Connected
          </span>
          <span>Room: {roomName}</span>
        </div>
        <span>Powered by Matrix 360 Consulting</span>
      </div>
    </div>
  );
}
