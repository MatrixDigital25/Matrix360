'use client'

import { BarChart3, Users, Zap, TrendingUp, ArrowRight } from 'lucide-react'

export default function EnterpriseDashboard() {
  return (
    <div className="w-full bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container-max section-padding">
          <h1 className="text-3xl font-bold">My Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's your strategy performance.</p>
        </div>
      </div>

      {/* Content */}
      <div className="container-max section-padding">
        {/* KPI Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-lg p-6 border-2 border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-600">Active Strategies</h3>
              <Zap className="text-matrix-blue" size={24} />
            </div>
            <div className="text-4xl font-bold mb-2">7</div>
            <p className="text-sm text-gray-600">+2 this month</p>
          </div>

          <div className="bg-white rounded-lg p-6 border-2 border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-600">Team Members</h3>
              <Users className="text-matrix-blue" size={24} />
            </div>
            <div className="text-4xl font-bold mb-2">12</div>
            <p className="text-sm text-gray-600">All active</p>
          </div>

          <div className="bg-white rounded-lg p-6 border-2 border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-600">Decision Quality</h3>
              <TrendingUp className="text-matrix-blue" size={24} />
            </div>
            <div className="text-4xl font-bold mb-2">87%</div>
            <p className="text-sm text-gray-600">+5% vs last quarter</p>
          </div>

          <div className="bg-white rounded-lg p-6 border-2 border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-600">Avg Session Time</h3>
              <BarChart3 className="text-matrix-blue" size={24} />
            </div>
            <div className="text-4xl font-bold mb-2">47 min</div>
            <p className="text-sm text-gray-600">per Strategy Room</p>
          </div>
        </div>

        {/* Recent Strategies */}
        <div className="bg-white rounded-lg border-2 border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-bold">Recent Strategies</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Strategy</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Status</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Assigned To</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Decisions</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  { name: 'Q1 Market Expansion', status: 'active', assigned: 'John Davis', decisions: 5 },
                  { name: 'Digital Transformation', status: 'active', assigned: 'Sarah Chen', decisions: 8 },
                  { name: 'Cost Optimization', status: 'planning', assigned: 'Michael Brown', decisions: 2 },
                  { name: 'Product Roadmap 2026', status: 'active', assigned: 'Emily Rodriguez', decisions: 12 },
                ].map((item, idx) => (
                  <tr key={idx} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 text-sm font-semibold text-matrix-dark">{item.name}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                        item.status === 'active' 
                          ? 'bg-green-100 text-green-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{item.assigned}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{item.decisions}</td>
                    <td className="px-6 py-4">
                      <button className="text-matrix-blue hover:text-blue-700 flex items-center gap-1">
                        View <ArrowRight size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-12 bg-gradient-to-r from-matrix-blue to-matrix-teal rounded-lg p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">Ready to Start a Strategy Session?</h3>
          <p className="mb-6 opacity-90">Book a Strategy Room with our AI agents and consultant network.</p>
          <button className="bg-white text-matrix-blue px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
            Schedule Strategy Room
          </button>
        </div>
      </div>
    </div>
  )
}
