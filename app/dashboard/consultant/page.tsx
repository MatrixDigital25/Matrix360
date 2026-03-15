export default function ConsultantDashboard() {
  return (
    <div className="space-y-8 pb-20">
      {/* Header */}
      <section className="px-4 sm:px-6 lg:px-8 pt-8 max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">My Dashboard</h1>
        <p className="text-gray-600">Welcome back, Sarah Chen</p>
      </section>

      {/* Stats */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="p-6 bg-white border border-gray-200 rounded-lg">
            <h3 className="text-gray-600 text-sm font-medium mb-2">Total Earnings</h3>
            <p className="text-3xl font-bold text-gray-900">$12,450</p>
            <p className="text-xs text-gray-500 mt-2">+$2,100 this month</p>
          </div>
          <div className="p-6 bg-white border border-gray-200 rounded-lg">
            <h3 className="text-gray-600 text-sm font-medium mb-2">Active Engagements</h3>
            <p className="text-3xl font-bold text-gray-900">3</p>
            <p className="text-xs text-gray-500 mt-2">12 hours this week</p>
          </div>
          <div className="p-6 bg-white border border-gray-200 rounded-lg">
            <h3 className="text-gray-600 text-sm font-medium mb-2">Your Rating</h3>
            <p className="text-3xl font-bold text-gray-900">4.9★</p>
            <p className="text-xs text-gray-500 mt-2">From 18 reviews</p>
          </div>
          <div className="p-6 bg-white border border-gray-200 rounded-lg">
            <h3 className="text-gray-600 text-sm font-medium mb-2">Profile Views</h3>
            <p className="text-3xl font-bold text-gray-900">284</p>
            <p className="text-xs text-gray-500 mt-2">+42 this week</p>
          </div>
        </div>
      </section>

      {/* Opportunities */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Available Opportunities</h2>
        <div className="space-y-4">
          {[
            { title: 'Digital Transformation Strategy', company: 'Tech Startup Inc', rate: '$250/hr', match: 95 },
            { title: 'M&A Due Diligence', company: 'Fortune 500 Corp', rate: '$350/hr', match: 87 },
            { title: 'Go-to-Market Strategy', company: 'Growth Stage SaaS', rate: '$200/hr', match: 92 },
          ].map((opp, idx) => (
            <div key={idx} className="p-6 bg-white border border-gray-200 rounded-lg">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-semibold text-gray-900">{opp.title}</h3>
                  <p className="text-sm text-gray-600">{opp.company}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-green-600">{opp.rate}</p>
                  <p className="text-xs text-gray-500">{opp.match}% match</p>
                </div>
              </div>
              <div className="flex gap-3">
                <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700">
                  View Details
                </button>
                <button className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50">
                  Save
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Active Engagements */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Active Engagements</h2>
        <div className="space-y-4">
          {[
            { name: 'Acme Corp', status: 'In Progress', hours: 8, earnings: '$2,000' },
            { name: 'TechFlow Inc', status: 'In Progress', hours: 6, earnings: '$1,800' },
            { name: 'Global Solutions', status: 'Pending Approval', hours: 4, earnings: '$1,000' },
          ].map((eng, idx) => (
            <div key={idx} className="p-6 bg-white border border-gray-200 rounded-lg flex justify-between items-center">
              <div>
                <h3 className="font-semibold text-gray-900">{eng.name}</h3>
                <p className="text-sm text-gray-600">{eng.hours} hours - {eng.status}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-900">{eng.earnings}</p>
                <a href="/strategy-room" className="text-sm text-blue-600 hover:text-blue-700">Join Session</a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
