export default function Home() {
  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="px-4 sm:px-6 lg:px-8 pt-20 pb-20 max-w-7xl mx-auto">
        <div className="text-center space-y-6">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900">
            Transform Enterprise Decisions
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Hybrid Intelligence Operating System. Where AI agents collaborate with human experts to drive strategic advantage.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <a href="/enterprise-trial" className="btn-primary">Start Free Trial</a>
            <a href="/for-enterprises" className="btn-secondary">Learn More</a>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 max-w-7xl mx-auto">
        <h2 className="section-title text-center mb-16">Three Growth Trajectories</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 border border-gray-200 rounded-lg">
            <div className="w-12 h-12 bg-blue-600 text-white rounded-lg flex items-center justify-center mb-4 font-bold">1</div>
            <h3 className="text-xl font-bold mb-3">Strategic Optimization</h3>
            <p className="text-gray-600">Transform decision-making with AI-powered insights and expert human judgment working in tandem.</p>
          </div>
          <div className="p-8 border border-gray-200 rounded-lg">
            <div className="w-12 h-12 bg-blue-600 text-white rounded-lg flex items-center justify-center mb-4 font-bold">2</div>
            <h3 className="text-xl font-bold mb-3">Consultant Empowerment</h3>
            <p className="text-gray-600">Enable independent consultants to deliver enterprise-grade insights with AI assistance and real-time collaboration.</p>
          </div>
          <div className="p-8 border border-gray-200 rounded-lg">
            <div className="w-12 h-12 bg-blue-600 text-white rounded-lg flex items-center justify-center mb-4 font-bold">3</div>
            <h3 className="text-xl font-bold mb-3">Knowledge Synthesis</h3>
            <p className="text-gray-600">Combine proprietary frameworks with real-time market data for breakthrough strategic recommendations.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-4xl font-bold">Ready to Transform Your Decision-Making?</h2>
          <p className="text-lg opacity-90">Join leading enterprises and consultants using Matrix360's Hybrid Intelligence platform.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <a href="/enterprise-trial" className="px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100">For Enterprises</a>
            <a href="/for-consultants" className="px-6 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-blue-700">For Consultants</a>
          </div>
        </div>
      </section>
    </div>
  )
}
