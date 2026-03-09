import React from 'react';
import { motion } from 'motion/react';
import { BrainCircuit, Cpu, Workflow, Database, Shield, Activity, Users, MessageSquare, Target, Zap } from 'lucide-react';

interface Node {
  id: string;
  x: number;
  y: number;
  label: string;
  icon: React.ElementType;
  color?: string;
}

interface Connection {
  from: string;
  to: string;
}

interface SystemDiagramProps {
  type: 'agent-network' | 'automation-pipeline' | 'client-workflow' | 'consultant-collaboration';
  className?: string;
}

const DIAGRAM_DATA = {
  'agent-network': {
    nodes: [
      { id: 'core', x: 50, y: 50, label: 'Matrix Core', icon: BrainCircuit, color: 'text-ai-cyan' },
      { id: 'research', x: 20, y: 20, label: 'Research Agent', icon: Target, color: 'text-ai-cyan' },
      { id: 'compliance', x: 80, y: 20, label: 'Compliance Bot', icon: Shield, color: 'text-ai-cyan' },
      { id: 'strategy', x: 20, y: 80, label: 'Strategy Sim', icon: Cpu, color: 'text-ai-cyan' },
      { id: 'market', x: 80, y: 80, label: 'Market Intel', icon: Activity, color: 'text-ai-cyan' },
    ],
    connections: [
      { from: 'core', to: 'research' },
      { from: 'core', to: 'compliance' },
      { from: 'core', to: 'strategy' },
      { from: 'core', to: 'market' },
      { from: 'research', to: 'market' },
      { from: 'strategy', to: 'compliance' },
    ]
  },
  'automation-pipeline': {
    nodes: [
      { id: 'data', x: 10, y: 50, label: 'Data Ingestion', icon: Database, color: 'text-ai-cyan' },
      { id: 'process', x: 40, y: 50, label: 'AI Processing', icon: BrainCircuit, color: 'text-ai-cyan' },
      { id: 'validate', x: 70, y: 50, label: 'Validation', icon: Shield, color: 'text-ai-cyan' },
      { id: 'execute', x: 90, y: 50, label: 'Execution', icon: Zap, color: 'text-ai-cyan' },
    ],
    connections: [
      { from: 'data', to: 'process' },
      { from: 'process', to: 'validate' },
      { from: 'validate', to: 'execute' },
    ]
  },
  'client-workflow': {
    nodes: [
      { id: 'input', x: 15, y: 30, label: 'Client Input', icon: MessageSquare, color: 'text-ai-cyan' },
      { id: 'analysis', x: 50, y: 30, label: 'AI Analysis', icon: BrainCircuit, color: 'text-ai-cyan' },
      { id: 'strategy', x: 85, y: 30, label: 'Strategy Dev', icon: Target, color: 'text-ai-cyan' },
      { id: 'feedback', x: 50, y: 70, label: 'Expert Review', icon: Users, color: 'text-ai-cyan' },
    ],
    connections: [
      { from: 'input', to: 'analysis' },
      { from: 'analysis', to: 'strategy' },
      { from: 'strategy', to: 'feedback' },
      { from: 'feedback', to: 'input' },
    ]
  },
  'consultant-collaboration': {
    nodes: [
      { id: 'expert1', x: 20, y: 30, label: 'Strategy Expert', icon: Users, color: 'text-ai-cyan' },
      { id: 'expert2', x: 80, y: 30, label: 'Tech Lead', icon: Users, color: 'text-ai-cyan' },
      { id: 'ai-assist', x: 50, y: 60, label: 'AI Assistant', icon: BrainCircuit, color: 'text-ai-cyan' },
      { id: 'output', x: 50, y: 90, label: 'Final Strategy', icon: Workflow, color: 'text-ai-cyan' },
    ],
    connections: [
      { from: 'expert1', to: 'ai-assist' },
      { from: 'expert2', to: 'ai-assist' },
      { from: 'ai-assist', to: 'output' },
      { from: 'expert1', to: 'expert2' },
    ]
  }
};

export const SystemDiagram: React.FC<SystemDiagramProps> = ({ type, className }) => {
  const data = DIAGRAM_DATA[type];

  const getNodePos = (id: string) => {
    const node = data.nodes.find(n => n.id === id);
    return node ? { x: node.x, y: node.y } : { x: 0, y: 0 };
  };

  return (
    <div className={`relative w-full aspect-square md:aspect-video bg-secondary-bg/50 rounded-3xl border border-border-light overflow-hidden ${className}`}>
      <svg viewBox="0 0 100 100" className="w-full h-full p-8 md:p-12">
        {/* Connections */}
        {data.connections.map((conn, i) => {
          const from = getNodePos(conn.from);
          const to = getNodePos(conn.to);
          return (
            <g key={i}>
              <motion.line
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                stroke="currentColor"
                strokeWidth="0.5"
                className="text-ai-cyan/20"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.5, delay: i * 0.2 }}
              />
              {/* Data Flow Animation */}
              <motion.circle
                r="0.8"
                fill="currentColor"
                className="text-ai-cyan"
                initial={{ offset: 0 }}
                animate={{ 
                  cx: [from.x, to.x],
                  cy: [from.y, to.y],
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity, 
                  ease: "linear",
                  delay: i * 0.5
                }}
              />
            </g>
          );
        })}

        {/* Nodes */}
        {data.nodes.map((node, i) => (
          <motion.g
            key={node.id}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 + 0.5, type: 'spring', stiffness: 200 }}
          >
            <circle
              cx={node.x}
              cy={node.y}
              r="6"
              fill="white"
              className="stroke-ai-cyan/30 shadow-sm"
              strokeWidth="0.5"
            />
            <foreignObject x={node.x - 3} y={node.y - 3} width="6" height="6">
              <div className="w-full h-full flex items-center justify-center">
                <node.icon className={`w-3 h-3 ${node.color}`} />
              </div>
            </foreignObject>
            <text
              x={node.x}
              y={node.y + 10}
              textAnchor="middle"
              className="text-[3px] font-bold fill-text-main uppercase tracking-wider"
            >
              {node.label}
            </text>
          </motion.g>
        ))}
      </svg>
    </div>
  );
};
