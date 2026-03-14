'use client'

import Link from 'next/link'
import { CheckCircle, BarChart3, Users, Lock, Zap, TrendingUp } from 'lucide-react'

export default function ForEnterprises() {
  return (
    <div className="w-full">
      {/* Hero */}
      <section className="section-padding bg-gradient-to-br from-white via-matrix-light to-white">
        <div className="container-max">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="hero-title mb-6">Empower Enterprise Decision-Making</h1>
            <p className="text-xl text-gray-600 mb-8">
              Combine your team's strategic expertise with AI-powered intelligence. Make faster, better-informed decisions. Reduce risk. Accelerate growth.
            </p>
            <Link href="/enterprise-trial" className="btn-primary inline-flex items-center gap-2">
              Start Your Free Trial
            </Link>
          </div>
        </div>
      </section>

      {/* Core Benefits */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <h2 className="section-title text-center">Why Enterprise Leaders Choose Matrix360</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="card">
              <div className="flex items-start gap-4">
                <Zap className="text-matrix-blue flex-shrink-0 mt-1" size={28} />
                <div>
                  <h3 className="text-xl font-bold mb-2">Real-Time Market Intelligence</h3>
                  <p className="text-gray-600">AI agents continuously monitor market trends, competitive moves, and emerging opportunities. Make decisions with the latest data.</p>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="flex items-start gap-4">
                <Users className="text-matrix-blue flex-shrink-0 mt-1" size={28} />
                <div>
                  <h3 className="text-xl font-bold mb-2">Expert Consultant Network</h3>
                  <p className="text-gray-600">Access specialized consultants across industries and domains. Get human expertise when you need it, integrated with AI insights.</p>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="flex items-start gap-4">
                <BarChart3 className="text-matrix-blue flex-shrink-0 mt-1" size={28} />
                <div>
                  <h3 className="text-xl font-bold mb-2">Decision Quality Metrics</h3>
                  <p className="text-gray-600">Track decision outcomes. Understand what works. Improve strategic performance over time with data-driven insights.</p>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="flex items-start gap-4">
                <Lock className="text-matrix-blue flex-shrink-0 mt-1" size={28} />
                <div>
                  <h3 className="text-xl font-bold mb-2">Enterprise-Grade Security</h3>
                  <p className="text-gray-600">SOC 2 compliance, end-to-end encryption, role-based access control. Your strategy stays confidential.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Strategy Room Feature */}
      <section className="section-padding bg-matrix-light">
        <div className="container-max">
          <h2 className="section-title text-center mb-12">The Strategy Room: Where Humans & AI Meet</h2>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white rounded-lg p-8 border-2 border-gray-100">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-matrix-blue text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                Real-Time Collaboration
              </h3>
              <p className="text-gray-600">Bring your team together virtually. One consultant, multiple team members, and AI agents—all in the same room, seeing the same intelligence in real-time.</p>
            </div>
            <div className="bg-white rounded-lg p-8 border-2 border-gray-100">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-matrix-blue text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                Live Intelligence Panel
              </h3>
              <p className="text-gray-600">Market data, competitor analysis, scenario models, and risk assessments stream into the session. Ask questions. Get instant answers.</p>
            </div>
            <div className="bg-white rounded-lg p-8 border-2 border-gray-100">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-matrix-blue text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                Decision Log
              </h3>
              <p className="text-gray-600">Every decision is recorded with context, reasoning, and expected outcomes. Build organizational memory. Track decision quality.</p>
            </div>
          </div>
          <div className="bg-white rounded-lg p-8 border-2 border-matrix-blue">
            <div className="aspect-video bg-gradient-to-br from-matrix-blue to-matrix-teal rounded-lg flex items-center justify-center text-white text-lg font-semibold">
              [Strategy Room Interface Mock]
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <h2 className="section-title text-center mb-12">Enterprise Pricing Plans</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Startup Plan */}
            <div className="card border-2 border-matrix-blue">
              <h3 className="text-2xl font-bold mb-2">Startup Plan</h3>
              <p className="text-gray-600 mb-6">Perfect for growing companies</p>
              <div className="mb-6">
                <div className="text-4xl font-bold text-matrix-blue mb-2">$999<span className="text-lg text-gray-600">/mo</span></div>
                <p className="text-sm text-gray-600">Billed annually</p>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2">
                  <CheckCircle size={20} className="text-matrix-blue flex-shrink-0" />
                  <span>Up to 10 users</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle size={20} className="text-matrix-blue flex-shrink-0" />
                  <span>Strategy Room (5 sessions/month)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle size={20} className="text-matrix-blue flex-shrink-0" />
                  <span>Basic AI Agents</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle size={20} className="text-matrix-blue flex-shrink-0" />
                  <span>Standard Support</span>
                </li>
              </ul>
              <Link href="/enterprise-trial" className="btn-primary w-full text-center">
                Start Trial
              </Link>
            </div>

            {/* Pro Plan */}
            <div className="card border-4 border-matrix-blue bg-gradient-to-b from-white to-matrix-light relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-matrix-blue text-white px-4 py-1 rounded-full text-sm font-bold">
                RECOMMENDED
              </div>
              <h3 className="text-2xl font-bold mb-2 mt-4">Pro Plan</h3>
              <p className="text-gray-600 mb-6">For scaling teams</p>
              <div className="mb-6">
                <div className="text-4xl font-bold text-matrix-blue mb-2">$2,999<span className="text-lg text-gray-600">/mo</span></div>
                <p className="text-sm text-gray-600">Billed annually</p>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2">
                  <CheckCircle size={20} className="text-matrix-blue flex-shrink-0" />
                  <span>Up to 50 users</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle size={20} className="text-matrix-blue flex-shrink-0" />
                  <span>Unlimited Strategy Rooms</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle size={20} className="text-matrix-blue flex-shrink-0" />
                  <span>AI Agents + Consultant Access</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle size={20} className="text-matrix-blue flex-shrink-0" />
                  <span>Advanced Analytics</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle size={20} className="text-matrix-blue flex-shrink-0" />
                  <span>Priority Support</span>
                </li>
              </ul>
              <Link href="/enterprise-trial" className="btn-primary w-full text-center">
                Start Trial
              </Link>
            </div>

            {/* Enterprise Plan */}
            <div className="card border-2 border-matrix-blue">
              <h3 className="text-2xl font-bold mb-2">Enterprise Plan</h3>
              <p className="text-gray-600 mb-6">For large organizations</p>
              <div className="mb-6">
                <div className="text-4xl font-bold text-matrix-blue mb-2">Custom<span className="text-lg text-gray-600"></span></div>
                <p className="text-sm text-gray-600">Contact for pricing</p>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2">
                  <CheckCircle size={20} className="text-matrix-blue flex-shrink-0" />
                  <span>Unlimited users</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle size={20} className="text-matrix-blue flex-shrink-0" />
                  <span>Full AI Agent Ecosystem</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle size={20} className="text-matrix-blue flex-shrink-0" />
                  <span>Strategic Transformation Roadmap</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle size={20} className="text-matrix-blue flex-shrink-0" />
                  <span>Custom Integrations</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle size={20} className="text-matrix-blue flex-shrink-0" />
                  <span>Dedicated Account Manager</span>
                </li>
              </ul>
              <button className="btn-secondary w-full text-center">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-gradient-to-r from-matrix-blue to-matrix-teal text-white">
        <div className="container-max text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Strategy?</h2>
          <p className="text-lg mb-8 opacity-90">
            Start a free 14-day trial. No credit card required.
          </p>
          <Link href="/enterprise-trial" className="bg-white text-matrix-blue px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block">
            Start Free Trial
          </Link>
        </div>
      </section>
    </div>
  )
}
