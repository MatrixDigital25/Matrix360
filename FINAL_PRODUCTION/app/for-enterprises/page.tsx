export default function ForEnterprises() {
  return (
    <div className="space-y-20 pb-20">
      {/* Hero */}
      <section className="px-4 sm:px-6 lg:px-8 pt-20 pb-20 max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">For Enterprises</h1>
        <p className="text-xl text-gray-600 max-w-3xl">
          Transform strategic decision-making with Hybrid Intelligence. Combine AI agents with expert consultants in real-time collaboration environments.
        </p>
      </section>

      {/* Value Props */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">AI-Powered Insights</h3>
            <p className="text-gray-600 mb-4">Real-time market analysis, competitor intelligence, and strategic recommendations powered by advanced AI.</p>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Expert Collaboration</h3>
            <p className="text-gray-600 mb-4">Access top-tier consultants directly through the Strategy Room for live strategic discussions and decision-making.</p>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Decision Tracking</h3>
            <p className="text-gray-600 mb-4">Comprehensive audit trails, decision logs, and outcome tracking for all strategic initiatives.</p>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Custom Integration</h3>
            <p className="text-gray-600 mb-4">Seamless integration with your existing systems and data sources for unified intelligence.</p>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-gray-900 text-center mb-16">Pricing Plans</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 border border-gray-200 rounded-lg">
            <h3 className="text-2xl font-bold mb-2">Startup</h3>
            <p className="text-4xl font-bold text-blue-600 mb-6">$999<span className="text-lg text-gray-600">/month</span></p>
            <ul className="space-y-3 text-gray-700 mb-8">
              <li>✓ Up to 5 team members</li>
              <li>✓ Basic AI insights</li>
              <li>✓ Consultant access (5 hours/month)</li>
              <li>✓ Decision tracking</li>
            </ul>
            <a href="/enterprise-trial" className="btn-primary w-full text-center block">Get Started</a>
          </div>

          <div className="p-8 border-2 border-blue-600 rounded-lg bg-blue-50">
            <h3 className="text-2xl font-bold mb-2">Professional</h3>
            <p className="text-4xl font-bold text-blue-600 mb-6">$2,999<span className="text-lg text-gray-600">/month</span></p>
            <ul className="space-y-3 text-gray-700 mb-8">
              <li>✓ Up to 25 team members</li>
              <li>✓ Advanced AI insights</li>
              <li>✓ Unlimited consultant access</li>
              <li>✓ Custom integrations</li>
              <li>✓ Priority support</li>
            </ul>
            <a href="/enterprise-trial" className="btn-primary w-full text-center block">Get Started</a>
          </div>

          <div className="p-8 border border-gray-200 rounded-lg">
            <h3 className="text-2xl font-bold mb-2">Enterprise</h3>
            <p className="text-4xl font-bold text-blue-600 mb-6">Custom</p>
            <ul className="space-y-3 text-gray-700 mb-8">
              <li>✓ Unlimited team members</li>
              <li>✓ Dedicated AI models</li>
              <li>✓ Exclusive consultant network</li>
              <li>✓ White-label option</li>
              <li>✓ 24/7 support</li>
            </ul>
            <a href="/enterprise-trial" className="btn-secondary w-full text-center block">Contact Sales</a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 bg-gray-900 text-white rounded-lg max-w-7xl mx-auto">
        <div className="text-center space-y-6">
          <h2 className="text-4xl font-bold">Start Your Free Trial</h2>
          <p className="text-xl opacity-90">30-day free access to all Professional features. No credit card required.</p>
          <a href="/enterprise-trial" className="inline-block px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700">Begin Trial</a>
        </div>
      </section>
    </div>
  )
}
