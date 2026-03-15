export default function ForConsultants() {
  return (
    <div className="space-y-20 pb-20">
      {/* Hero */}
      <section className="px-4 sm:px-6 lg:px-8 pt-20 pb-20 max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">For Consultants</h1>
        <p className="text-xl text-gray-600 max-w-3xl">
          Scale your consulting practice with AI-powered insights. Connect directly with enterprises seeking expert strategic guidance.
        </p>
      </section>

      {/* Why Join */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
        <h2 className="text-4xl font-bold text-gray-900 text-center mb-16">Why Join Matrix360?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Expand Your Reach</h3>
            <p className="text-gray-600 mb-4">Access a curated network of enterprises actively seeking expert strategic guidance. No cold calling. Just connections.</p>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">AI-Powered Efficiency</h3>
            <p className="text-gray-600 mb-4">Leverage advanced AI for research, analysis, and recommendations. Deliver more value in less time.</p>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Real-Time Collaboration</h3>
            <p className="text-gray-600 mb-4">Work directly with clients through Strategy Room. Live co-creation of strategic recommendations.</p>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Flexible Engagement</h3>
            <p className="text-gray-600 mb-4">Choose projects that fit your schedule. Hourly engagements or long-term retainers. Your choice.</p>
          </div>
        </div>
      </section>

      {/* Earning Model */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-gray-900 text-center mb-16">Consultant Plans</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 border border-gray-200 rounded-lg">
            <h3 className="text-2xl font-bold mb-2">Free</h3>
            <p className="text-gray-600 mb-6">Perfect for getting started</p>
            <ul className="space-y-3 text-gray-700 mb-8">
              <li>✓ Profile listing</li>
              <li>✓ Browse opportunities</li>
              <li>✓ Basic analytics</li>
              <li>✓ Community access</li>
            </ul>
            <a href="/consultant-onboard" className="btn-secondary w-full text-center block">Join Free</a>
          </div>

          <div className="p-8 border-2 border-blue-600 rounded-lg bg-blue-50">
            <h3 className="text-2xl font-bold mb-2">Pro</h3>
            <p className="text-4xl font-bold text-blue-600 mb-6">$99<span className="text-sm text-gray-600">/month</span></p>
            <ul className="space-y-3 text-gray-700 mb-8">
              <li>✓ Featured profile</li>
              <li>✓ AI insight tools</li>
              <li>✓ Priority matching</li>
              <li>✓ Advanced analytics</li>
              <li>✓ You keep 70% of revenue</li>
            </ul>
            <a href="/consultant-onboard" className="btn-primary w-full text-center block">Get Started</a>
          </div>

          <div className="p-8 border border-gray-200 rounded-lg">
            <h3 className="text-2xl font-bold mb-2">Elite</h3>
            <p className="text-4xl font-bold text-blue-600 mb-6">$599<span className="text-sm text-gray-600">/month</span></p>
            <ul className="space-y-3 text-gray-700 mb-8">
              <li>✓ Top-tier profile placement</li>
              <li>✓ Custom branding</li>
              <li>✓ Dedicated account manager</li>
              <li>✓ You keep 80% of revenue</li>
              <li>✓ Exclusive opportunities</li>
            </ul>
            <a href="/consultant-onboard" className="btn-primary w-full text-center block">Apply</a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 bg-blue-600 text-white rounded-lg max-w-7xl mx-auto">
        <div className="text-center space-y-6">
          <h2 className="text-4xl font-bold">Ready to Grow Your Consulting Practice?</h2>
          <p className="text-xl opacity-90">Join top consultants already scaling with Matrix360.</p>
          <a href="/consultant-onboard" className="inline-block px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100">Create Your Profile</a>
        </div>
      </section>
    </div>
  )
}
