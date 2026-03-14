'use client'

import { Calendar, DollarSign, Star, TrendingUp, Clock } from 'lucide-react'

export default function ConsultantDashboard() {
  return (
    <div className="w-full bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container-max section-padding">
          <h1 className="text-3xl font-bold">Consultant Dashboard</h1>
          <p className="text-gray-600">Welcome back! Manage your engagements and earnings.</p>
        </div>
      </div>

      {/* Content */}
      <div className="container-max section-padding">
        {/* Stats Row */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-lg p-6 border-2 border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-600">This Month Earnings</h3>
              <DollarSign className="text-green-600" size={24} />
            </div>
            <div className="text-4xl font-bold text-green-600 mb-2">$8,450</div>
            <p className="text-sm text-gray-600">+15% vs last month</p>
          </div>

          <div className="bg-white rounded-lg p-6 border-2 border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-600">Rating</h3>
              <Star className="text-yellow-500" size={24} />
            </div>
            <div className="text-4xl font-bold mb-2">4.9 / 5.0</div>
            <p className="text-sm text-gray-600">From 47 reviews</p>
          </div>

          <div className="bg-white rounded-lg p-6 border-2 border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-600">Active Engagements</h3>
              <Calendar className="text-matrix-blue" size={24} />
            </div>
            <div className="text-4xl font-bold mb-2">3</div>
            <p className="text-sm text-gray-600">+1 pending approval</p>
          </div>

          <div className="bg-white rounded-lg p-6 border-2 border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-600">Hours This Month</h3>
              <Clock className="text-matrix-teal" size={24} />
            </div>
            <div className="text-4xl font-bold mb-2">67.5</div>
            <p className="text-sm text-gray-600">Billable hours</p>
          </div>
        </div>

        {/* Active Engagements */}
        <div className="bg-white rounded-lg border-2 border-gray-100 overflow-hidden mb-12">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-bold">Active Engagements</h2>
          </div>
          <div className="space-y-4 p-6">
            {[
              { client: 'TechCorp Inc', project: 'Digital Transformation Strategy', rate: '$175/hr', hours: 24, status: 'in-progress' },
              { client: 'Finance Pro Ltd', project: 'Market Entry Analysis', rate: '$150/hr', hours: 18, status: 'in-progress' },
              { client: 'Retail Innovations', project: 'Supply Chain Optimization', rate: '$160/hr', hours: 15.5, status: 'scheduled' },
            ].map((engagement, idx) => (
              <div key={idx} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-bold text-matrix-dark">{engagement.client}</h3>
                    <p className="text-sm text-gray-600">{engagement.project}</p>
                  </div>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                    engagement.status === 'in-progress'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {engagement.status === 'in-progress' ? 'In Progress' : 'Scheduled'}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex gap-6">
                    <div>
                      <p className="text-gray-600">Rate:</p>
                      <p className="font-semibold text-matrix-dark">{engagement.rate}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Hours:</p>
                      <p className="font-semibold text-matrix-dark">{engagement.hours}h</p>
                    </div>
                  </div>
                  <button className="text-matrix-blue hover:text-blue-700 font-semibold">View Details →</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Marketplace Opportunities */}
        <div className="bg-white rounded-lg border-2 border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-xl font-bold">Recommended Opportunities</h2>
            <button className="text-matrix-blue hover:text-blue-700 font-semibold">View All →</button>
          </div>
          <div className="space-y-4 p-6">
            {[
              { title: 'Growth Strategy for SaaS Startup', rate: '$200/hr', urgency: 'Urgent' },
              { title: 'Financial Model Development', rate: '$180/hr', urgency: 'This Week' },
              { title: 'Competitive Analysis - Healthcare', rate: '$170/hr', urgency: 'Flexible' },
            ].map((opp, idx) => (
              <div key={idx} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-matrix-dark">{opp.title}</h4>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                    <span>{opp.rate}</span>
                    <span className={`${
                      opp.urgency === 'Urgent'
                        ? 'text-red-600'
                        : opp.urgency === 'This Week'
                        ? 'text-orange-600'
                        : 'text-gray-600'
                    }`}>
                      {opp.urgency}
                    </span>
                  </div>
                </div>
                <button className="bg-matrix-blue text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm font-semibold">
                  View & Apply
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
