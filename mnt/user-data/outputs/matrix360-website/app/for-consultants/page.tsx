'use client'

import Link from 'next/link'
import { CheckCircle, Zap, Users, TrendingUp, Award, DollarSign } from 'lucide-react'

export default function ForConsultants() {
  return (
    <div className="w-full">
      {/* Hero */}
      <section className="section-padding bg-gradient-to-br from-white via-matrix-light to-white">
        <div className="container-max">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="hero-title mb-6">Amplify Your Impact with Hybrid Intelligence</h1>
            <p className="text-xl text-gray-600 mb-8">
              Access AI-powered tools, a global network of clients, and collaboration opportunities that transform your consulting practice. Earn more. Scale your impact.
            </p>
            <Link href="/consultant-onboard" className="btn-primary inline-flex items-center gap-2">
              Join as Consultant
            </Link>
          </div>
        </div>
      </section>

      {/* Why Matrix360 */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <h2 className="section-title text-center">Why Consultants Love Matrix360</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="card">
              <div className="flex items-start gap-4">
                <Zap className="text-matrix-blue flex-shrink-0 mt-1" size={28} />
                <div>
                  <h3 className="text-xl font-bold mb-2">AI-Powered Amplification</h3>
                  <p className="text-gray-600">Your expertise meets cutting-edge AI. Analyze markets faster. Model scenarios instantly. Deliver insights your clients can't get anywhere else.</p>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="flex items-start gap-4">
                <Users className="text-matrix-blue flex-shrink-0 mt-1" size={28} />
                <div>
                  <h3 className="text-xl font-bold mb-2">Global Client Network</h3>
                  <p className="text-gray-600">Access high-quality opportunities from enterprises across industries. No more hustle for clients. Let them find you.</p>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="flex items-start gap-4">
                <DollarSign className="text-matrix-blue flex-shrink-0 mt-1" size={28} />
                <div>
                  <h3 className="text-xl font-bold mb-2">Multiple Revenue Streams</h3>
                  <p className="text-gray-600">One-to-one consulting. Strategy Room sessions with AI support. Marketplace of your services. Earn on your terms.</p>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="flex items-start gap-4">
                <Award className="text-matrix-blue flex-shrink-0 mt-1" size={28} />
                <div>
                  <h3 className="text-xl font-bold mb-2">Build Your Reputation</h3>
                  <p className="text-gray-600">Ratings, reviews, and published expertise. Stand out in the network. Become the go-to expert in your niche.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section-padding bg-matrix-light">
        <div className="container-max">
          <h2 className="section-title text-center mb-12">How Consultant Earning Works</h2>
          <div className="space-y-6">
            <div className="bg-white rounded-lg p-8 border-2 border-gray-100">
              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 bg-matrix-blue text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold text-lg">1</div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Set Your Profile & Rates</h3>
                  <p className="text-gray-600">Create your profile on Matrix360. Show your expertise, certifications, and past work. Set your hourly rate or project pricing. Free trial until you book your first engagement.</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg p-8 border-2 border-gray-100">
              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 bg-matrix-blue text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold text-lg">2</div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Get Matched with Opportunities</h3>
                  <p className="text-gray-600">Browse available opportunities in the marketplace. Enterprises post projects and consulting needs. Apply or let them find you based on your expertise.</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg p-8 border-2 border-gray-100">
              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 bg-matrix-blue text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold text-lg">3</div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Collaborate in Strategy Rooms</h3>
                  <p className="text-gray-600">Meet clients in real-time strategy sessions. AI agents provide live intelligence. You provide the strategic thinking. Split compensation based on engagement type.</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg p-8 border-2 border-gray-100">
              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 bg-matrix-blue text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold text-lg">4</div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Earn & Build Reputation</h3>
                  <p className="text-gray-600">Get paid directly for sessions and projects. Earn ratings from clients. Build your consulting brand within the network.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing for Consultants */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <h2 className="section-title text-center mb-12">Consultant Pricing & Revenue</h2>
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="card border-2 border-matrix-blue">
              <h3 className="text-2xl font-bold mb-4">Free Trial</h3>
              <p className="text-gray-600 mb-6">Start with zero commitment</p>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <CheckCircle size={20} className="text-matrix-blue flex-shrink-0" />
                  <span>Create your profile</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle size={20} className="text-matrix-blue flex-shrink-0" />
                  <span>Browse opportunities</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle size={20} className="text-matrix-blue flex-shrink-0" />
                  <span>No credit card required</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle size={20} className="text-matrix-blue flex-shrink-0" />
                  <span>Free for life (no engagements)</span>
                </li>
              </ul>
            </div>
            <div className="card border-4 border-matrix-blue bg-gradient-to-b from-white to-matrix-light">
              <h3 className="text-2xl font-bold mb-4">Subscription Plans</h3>
              <p className="text-gray-600 mb-6">When you're ready to unlock premium features</p>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <CheckCircle size={20} className="text-matrix-blue flex-shrink-0" />
                  <span>Pro: $99/mo - Premium client match</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle size={20} className="text-matrix-blue flex-shrink-0" />
                  <span>Premium: $299/mo - Strategy Room access</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle size={20} className="text-matrix-blue flex-shrink-0" />
                  <span>Elite: $599/mo - Full AI agent suite</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-matrix-light rounded-lg p-8">
            <h3 className="text-2xl font-bold mb-6 text-center">How You Earn</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-bold mb-2">One-to-One Sessions</h4>
                <p className="text-gray-600 text-sm mb-4">You set your hourly rate. Matrix360 takes 15% commission. You keep 85% of session fees.</p>
                <div className="text-lg font-bold text-matrix-blue">$100/hr rate = $85/hr earnings</div>
              </div>
              <div>
                <h4 className="font-bold mb-2">Strategy Room Sessions</h4>
                <p className="text-gray-600 text-sm mb-4">AI agents support the session. You provide strategic expertise. Shared compensation model.</p>
                <div className="text-lg font-bold text-matrix-blue">$50 base + commission</div>
              </div>
              <div>
                <h4 className="font-bold mb-2">Marketplace Bonuses</h4>
                <p className="text-gray-600 text-sm mb-4">Top-rated consultants earn performance bonuses and exclusive opportunities.</p>
                <div className="text-lg font-bold text-matrix-blue">Up to 20% bonus</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-gradient-to-r from-matrix-blue to-matrix-teal text-white">
        <div className="container-max text-center">
          <h2 className="text-3xl font-bold mb-6">Join 1000+ Consultants Transforming the Industry</h2>
          <p className="text-lg mb-8 opacity-90">
            Start free. Grow your practice. Join the network.
          </p>
          <Link href="/consultant-onboard" className="bg-white text-matrix-blue px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block">
            Create Your Profile
          </Link>
        </div>
      </section>
    </div>
  )
}
