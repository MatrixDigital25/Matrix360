export default function StrategyRoom() {
  return (
    <div className="space-y-8 pb-20">
      {/* Header */}
      <section className="px-4 sm:px-6 lg:px-8 pt-8 max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Strategy Room</h1>
        <p className="text-gray-600">Live collaboration space for strategic decision-making</p>
      </section>

      {/* Main Content */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Video/Collaboration Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Video Feed */}
            <div className="bg-gray-900 rounded-lg aspect-video flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="text-6xl">📹</div>
                <p className="text-white">Video Conference Area</p>
                <p className="text-gray-400 text-sm">Participants: Sarah Chen (Consultant), John Smith (Enterprise)</p>
              </div>
            </div>

            {/* Canvas/Whiteboard */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Strategic Canvas</h3>
              <div className="bg-gray-50 rounded-lg p-8 min-h-64 border border-gray-200 flex items-center justify-center">
                <div className="text-center text-gray-600">
                  <p className="mb-4">📊 Real-time strategy visualization</p>
                  <p className="text-sm">Market Analysis • Competitive Positioning • Growth Opportunities</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel */}
          <div className="space-y-6">
            {/* AI Insights Panel */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Insights</h3>
              <div className="space-y-4">
                <div className="p-4 bg-white rounded border border-blue-100">
                  <p className="text-sm font-medium text-gray-900 mb-2">Market Trend Analysis</p>
                  <p className="text-xs text-gray-600">Enterprise SaaS market growing at 18% YoY</p>
                </div>
                <div className="p-4 bg-white rounded border border-blue-100">
                  <p className="text-sm font-medium text-gray-900 mb-2">Competitor Insight</p>
                  <p className="text-xs text-gray-600">Main competitor recently launched feature X</p>
                </div>
                <div className="p-4 bg-white rounded border border-blue-100">
                  <p className="text-sm font-medium text-gray-900 mb-2">Risk Assessment</p>
                  <p className="text-xs text-gray-600">Regulatory changes in Q2 2026 may impact strategy</p>
                </div>
              </div>
            </div>

            {/* Decision Log */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Decision Log</h3>
              <div className="space-y-3">
                <div className="pb-3 border-b border-gray-200">
                  <p className="text-sm font-medium text-gray-900">Approved: Q1 Expansion Plan</p>
                  <p className="text-xs text-gray-500">Today at 2:45 PM</p>
                </div>
                <div className="pb-3 border-b border-gray-200">
                  <p className="text-sm font-medium text-gray-900">Pending: Budget Allocation</p>
                  <p className="text-xs text-gray-500">Awaiting CFO review</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Discussed: Market Entry Strategy</p>
                  <p className="text-xs text-gray-500">Yesterday at 3:15 PM</p>
                </div>
              </div>
            </div>

            {/* Participants */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Participants</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">SC</div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Sarah Chen</p>
                      <p className="text-xs text-gray-600">Consultant</p>
                    </div>
                  </div>
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white text-xs font-bold">JS</div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">John Smith</p>
                      <p className="text-xs text-gray-600">Enterprise</p>
                    </div>
                  </div>
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 bg-gray-50 max-w-7xl mx-auto rounded-lg">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-16">Strategy Room Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex items-start space-x-4">
            <div className="text-2xl">🎥</div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Live Video Collaboration</h3>
              <p className="text-gray-600 text-sm">High-definition video conferencing with screen sharing</p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <div className="text-2xl">✏️</div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Real-Time Canvas</h3>
              <p className="text-gray-600 text-sm">Co-create strategies with live whiteboarding and diagrams</p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <div className="text-2xl">🤖</div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">AI-Powered Insights</h3>
              <p className="text-gray-600 text-sm">Real-time market analysis and recommendations during sessions</p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <div className="text-2xl">📋</div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Decision Tracking</h3>
              <p className="text-gray-600 text-sm">Automatic logging of decisions and action items</p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <div className="text-2xl">📊</div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Data Integration</h3>
              <p className="text-gray-600 text-sm">Connect live data sources and dashboards</p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <div className="text-2xl">🔒</div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Enterprise Security</h3>
              <p className="text-gray-600 text-sm">End-to-end encryption and compliance standards</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
