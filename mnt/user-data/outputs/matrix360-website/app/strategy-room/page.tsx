'use client'

import { Video, MessageCircle, BarChart3, Save, Maximize2 } from 'lucide-react'

export default function StrategyRoom() {
  return (
    <div className="w-full bg-matrix-dark h-screen flex flex-col">
      {/* Header */}
      <div className="bg-black border-b border-gray-700 p-4 flex items-center justify-between">
        <div className="text-white">
          <h2 className="font-bold text-lg">Q1 Strategy Session: Market Expansion</h2>
          <p className="text-sm text-gray-400">Active • 3 participants • AI agents engaged</p>
        </div>
        <div className="flex gap-4">
          <button className="px-4 py-2 bg-matrix-blue text-white rounded hover:bg-blue-700 transition">
            Save Decision
          </button>
          <button className="text-white hover:text-gray-300">
            <Maximize2 size={20} />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex gap-0 overflow-hidden">
        {/* Video Feed */}
        <div className="w-3/5 flex flex-col bg-black border-r border-gray-700">
          <div className="flex-1 bg-gradient-to-br from-matrix-blue to-matrix-teal flex items-center justify-center">
            <div className="text-center">
              <Video size={64} className="text-white mx-auto mb-4 opacity-30" />
              <p className="text-white text-lg opacity-50">[Video Collaboration]</p>
            </div>
          </div>
        </div>

        {/* Intelligence Panel */}
        <div className="w-2/5 flex flex-col bg-gray-900">
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <div className="bg-gray-800 rounded p-3">
              <div className="flex items-center gap-2 mb-2">
                <BarChart3 size={16} className="text-matrix-blue" />
                <h4 className="text-white text-sm font-bold">Market Intelligence</h4>
              </div>
              <div className="text-xs text-gray-400 space-y-1">
                <p>• APAC growth: +12% YoY</p>
                <p>• New competitor launches: 3</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 p-4">
            <button className="w-full bg-matrix-blue text-white py-2 rounded font-semibold hover:bg-blue-700 transition text-sm">
              Log Decision
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
