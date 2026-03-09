import React from 'react';
import {
  LineChart as RechartsLineChart,
  Line,
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

interface ChartProps {
  data: any[];
  dataKey: string;
  categories: string[];
  colors?: string[];
  height?: number;
}

const defaultColors = ['#2F5BFF', '#2BB3A3', '#E5484D', '#2E9E6F'];

export function LineChart({ data, dataKey, categories, colors = defaultColors, height = 300 }: ChartProps) {
  return (
    <div style={{ width: '100%', height }}>
      <ResponsiveContainer>
        <RechartsLineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
          <XAxis dataKey={dataKey} axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} dy={10} />
          <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
          <Tooltip 
            contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' }}
            itemStyle={{ fontSize: '14px', fontWeight: 500 }}
            labelStyle={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}
          />
          <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '20px' }} />
          {categories.map((category, index) => (
            <Line 
              key={category} 
              type="monotone" 
              dataKey={category} 
              stroke={colors[index % colors.length]} 
              strokeWidth={2}
              dot={{ r: 4, strokeWidth: 2 }}
              activeDot={{ r: 6, strokeWidth: 0 }}
            />
          ))}
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  );
}

export function BarChart({ data, dataKey, categories, colors = defaultColors, height = 300 }: ChartProps) {
  return (
    <div style={{ width: '100%', height }}>
      <ResponsiveContainer>
        <RechartsBarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
          <XAxis dataKey={dataKey} axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} dy={10} />
          <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
          <Tooltip 
            contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' }}
            itemStyle={{ fontSize: '14px', fontWeight: 500 }}
            labelStyle={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}
            cursor={{ fill: '#f7f8fa' }}
          />
          <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '20px' }} />
          {categories.map((category, index) => (
            <Bar 
              key={category} 
              dataKey={category} 
              fill={colors[index % colors.length]} 
              radius={[4, 4, 0, 0]}
              maxBarSize={50}
            />
          ))}
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
}

interface Node {
  id: string;
  label: string;
  x: number;
  y: number;
  size: number;
  color: string;
}

interface Link {
  source: string;
  target: string;
  value: number;
}

interface NetworkGraphProps {
  nodes: Node[];
  links: Link[];
  height?: number;
}

export function NetworkGraph({ nodes, links, height = 300 }: NetworkGraphProps) {
  return (
    <div style={{ width: '100%', height, position: 'relative' }} className="bg-secondary-bg rounded-lg border border-border-light overflow-hidden">
      <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
        {/* Draw links */}
        {links.map((link, i) => {
          const sourceNode = nodes.find(n => n.id === link.source);
          const targetNode = nodes.find(n => n.id === link.target);
          if (!sourceNode || !targetNode) return null;
          return (
            <line
              key={`link-${i}`}
              x1={sourceNode.x}
              y1={sourceNode.y}
              x2={targetNode.x}
              y2={targetNode.y}
              stroke="#e5e7eb"
              strokeWidth={link.value}
              opacity={0.6}
            />
          );
        })}
        
        {/* Draw nodes */}
        {nodes.map((node) => (
          <g key={node.id} transform={`translate(${node.x}, ${node.y})`}>
            <circle
              r={node.size}
              fill={node.color}
              stroke="#ffffff"
              strokeWidth={1.5}
              className="transition-all duration-300 hover:opacity-80 cursor-pointer"
            />
            <text
              dy={node.size + 4}
              textAnchor="middle"
              fill="#6b7280"
              fontSize={3}
              fontWeight={500}
              className="pointer-events-none"
            >
              {node.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
