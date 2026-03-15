export default function EnterpriseDashboard() {
  return (
    <div className="space-y-8 pb-20">
      {/* Header */}
      <section className="px-4 sm:px-6 lg:px-8 pt-8 max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Welcome back, Acme Corporation</p>
      </section>

      {/* KPIs */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="p-6 bg-white border border-gray-200 rounded-lg">
            <h3 className="text-gray-600 text-sm font-medium mb-2">Active Strategies</h3>
            <p className="text-3xl font-bold text-gray-900">8</p>
            <p className="text-xs text-gray-500 mt-2">+2 this month</p>
          </div>
          <div className="p-6 bg-white border border-gray-200 rounded-lg">
            <h3 className="text-gray-600 text-sm font-medium mb-2">Decisions Made</h3>
            <p className="text-3xl font-bold text-gray-900">24</p>
            <p className="text-xs text-gray-500 mt-2">+6 this week</p>
          </div>
          <div className="p-6 bg-white border border-gray-200 rounded-lg">
            <h3 className="text-gray-600 text-sm font-medium mb-2">Consultant Hours</h3>
            <p className="text-3xl font-bold text-gray-900">156</p>
            <p className="text-xs text-gray-500 mt-2">Of 200 allocated</p>
          </div>
          <div className="p-6 bg-white border border-gray-200 rounded-lg">
            <h3 className="text-gray-600 text-sm font-medium mb-2">AI Insights</h3>
            <p className="text-3xl font-bold text-gray-900">47</p>
            <p className="text-xs text-gray-500 mt-2">Generated this month</p>
          </div>
        </div>
      </section>

      {/* Active Strategies */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Active Strategies</h2>
        <div className="space-y-4">
          {[
            { title: 'Q1 Market Expansion', status: 'In Progress', team: '3 consultants', completion: 65 },
            { title: 'Digital Transformation Initiative', status: 'In Progress', team: '2 consultants', completion: 45 },
            { title: 'Cost Optimization Program', status: 'Planning', team: '1 consultant', completion: 20 },
            { title: 'AI Integration Strategy', status: 'Planning', team: 'Pending', completion: 0 },
          ].map((strategy, idx) => (
            <div key={idx} className="p-6 bg-white border border-gray-200 rounded-lg">
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-semibold text-gray-900">{strategy.title}</h3>
                <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                  strategy.status === 'In Progress' 
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {strategy.status}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-4">{strategy.team}</p>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all"
                  style={{ width: `${strategy.completion}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-500 mt-2">{strategy.completion}% complete</p>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Actions */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <a href="/strategy-room" className="p-6 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors">
            <h3 className="font-semibold text-gray-900 mb-2">Enter Strategy Room</h3>
            <p className="text-sm text-gray-600">Collaborate with consultants in real-time</p>
          </a>
          <a href="#" className="p-6 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors">
            <h3 className="font-semibold text-gray-900 mb-2">Request New Strategy</h3>
            <p className="text-sm text-gray-600">Initiate a new strategic initiative</p>
          </a>
        </div>
      </section>
    </div>
  )
}
