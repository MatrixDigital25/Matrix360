'use client'

import Link from 'next/link'
import { ArrowRight, BarChart3, Users, Zap } from 'lucide-react'

export default function Home() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-white via-matrix-light to-white">
        <div className="container-max">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="hero-title mb-6">
                Transform Enterprise Decisions with <span className="text-matrix-blue">Hybrid Intelligence</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Matrix360 is the operating system that bridges consultant expertise with AI-powered intelligence. Guide enterprise strategy with confidence. Enable consultant networks with cutting-edge tools.
              </p>
              <div className="flex gap-4 flex-wrap">
                <Link href="/enterprise-trial" className="btn-primary inline-flex items-center gap-2">
                  Start Enterprise Trial <ArrowRight size={20} />
                </Link>
                <Link href="/for-consultants" className="btn-secondary inline-flex items-center gap-2">
                  Join as Consultant
                </Link>
              </div>
            </div>
            <div className="bg-matrix-light rounded-lg p-8 border-2 border-matrix-blue border-opacity-20">
              <div className="aspect-video bg-gradient-to-br from-matrix-blue to-matrix-teal rounded-lg flex items-center justify-center text-white text-lg font-semibold">
                [Platform Demo Visual]
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <h2 className="section-title text-center">The Challenge</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card">
              <h3 className="text-xl font-bold mb-4 text-matrix-dark">Enterprise Complexity</h3>
              <p className="text-gray-600">Strategic decisions require real-time market intelligence, scenario modeling, and consultant expertise. Traditional approaches are fragmented and slow.</p>
            </div>
            <div className="card">
              <h3 className="text-xl font-bold mb-4 text-matrix-dark">Consultant Isolation</h3>
              <p className="text-gray-600">Independent consultants lack integrated tools, knowledge networks, and AI-powered capabilities to scale their impact and earning potential.</p>
            </div>
            <div className="card">
              <h3 className="text-xl font-bold mb-4 text-matrix-dark">Intelligence Gap</h3>
              <p className="text-gray-600">AI systems are powerful but lack human judgment. Strategic decisions need both algorithmic precision and expert reasoning.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution */}
      <section className="section-padding bg-matrix-light">
        <div className="container-max">
          <h2 className="section-title text-center">Hybrid Intelligence: The Solution</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-matrix-blue rounded-full flex items-center justify-center text-white font-bold">1</div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Real-Time Intelligence</h3>
                    <p className="text-gray-700">AI agents continuously gather market data, competitor intelligence, and scenario analysis.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-matrix-blue rounded-full flex items-center justify-center text-white font-bold">2</div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Strategy Room Collaboration</h3>
                    <p className="text-gray-700">Humans and AI meet in real-time collaborative environment to make decisions together.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-matrix-blue rounded-full flex items-center justify-center text-white font-bold">3</div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Decision Accountability</h3>
                    <p className="text-gray-700">Every decision is logged with outcomes, creating a knowledge base that improves future choices.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg p-8 border-2 border-matrix-blue">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Zap className="text-matrix-blue" size={24} />
                  <span className="font-semibold">AI-Powered Agents</span>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="text-matrix-blue" size={24} />
                  <span className="font-semibold">Consultant Network</span>
                </div>
                <div className="flex items-center gap-3">
                  <BarChart3 className="text-matrix-blue" size={24} />
                  <span className="font-semibold">Decision Analytics</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Growth Roadmap Preview */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <h2 className="section-title text-center">Three Parallel Growth Tracks</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card border-l-4 border-l-matrix-blue">
              <h3 className="text-xl font-bold mb-4">Technology Track</h3>
              <p className="text-gray-600 mb-4">Infrastructure maturation, API stability, advanced AI agent capabilities driving enterprise scale.</p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>✓ Expanded agent ecosystem</li>
                <li>✓ Enhanced collaboration tools</li>
                <li>✓ Real-time data integration</li>
              </ul>
            </div>
            <div className="card border-l-4 border-l-matrix-teal">
              <h3 className="text-xl font-bold mb-4">Consultant Network</h3>
              <p className="text-gray-600 mb-4">Building the professional community, marketplace of expertise, reputation and earning potential.</p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>✓ Consultant marketplace</li>
                <li>✓ Skill-based matching</li>
                <li>✓ Network effects</li>
              </ul>
            </div>
            <div className="card border-l-4 border-l-blue-500">
              <h3 className="text-xl font-bold mb-4">Enterprise Adoption</h3>
              <p className="text-gray-600 mb-4">Scaling across mid-market and enterprise segments, demonstrating ROI through decision quality.</p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>✓ Industry verticals</li>
                <li>✓ Enterprise security</li>
                <li>✓ Governance tools</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-matrix-blue to-matrix-teal text-white">
        <div className="container-max text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Strategy?</h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Start your journey with Hybrid Intelligence today. Whether you lead an enterprise or advise clients, Matrix360 empowers smarter decisions.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/enterprise-trial" className="bg-white text-matrix-blue px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Enterprise Trial
            </Link>
            <Link href="/for-consultants" className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:bg-opacity-10 transition-colors">
              Consultant Onboarding
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
