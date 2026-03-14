import Head from 'next/head';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ForEnterprises() {
  return (
    <>
      <Head>
        <title>For Enterprises - Matrix 360</title>
      </Head>
      <Header />
      <main>
        <section className="bg-gradient-to-br from-primary to-gray-900 text-white py-32">
          <div className="container mx-auto px-6">
            <h1 className="text-5xl font-bold mb-6">Transform Enterprise Decisions</h1>
            <p className="text-xl text-gray-300 max-w-2xl mb-8">Access consultant expertise + AI capability for better strategic decisions, faster execution, and measurable outcomes.</p>
            <Link href="/enterprise-signup" className="btn btn-primary text-lg">Start Free Trial</Link>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-center mb-16">Enterprise Benefits</h2>
            <div className="grid md:grid-cols-3 gap-12">
              <div className="card">
                <h3 className="text-2xl font-bold mb-4 text-accent">On-Demand Expertise</h3>
                <p className="text-gray-700">Access vetted consultants instantly. No long-term contracts. Pay for what you use.</p>
              </div>
              <div className="card">
                <h3 className="text-2xl font-bold mb-4 text-accent">AI-Enhanced Analysis</h3>
                <p className="text-gray-700">AI agents provide real-time market intelligence, scenario modeling, and decision quality metrics.</p>
              </div>
              <div className="card">
                <h3 className="text-2xl font-bold mb-4 text-accent">Strategy Room</h3>
                <p className="text-gray-700">Real-time collaborative environment with video, whiteboarding, and AI-powered insights.</p>
              </div>
              <div className="card">
                <h3 className="text-2xl font-bold mb-4 text-accent">Measurable ROI</h3>
                <p className="text-gray-700">Decision logging tracks outcomes and KPIs. Continuous improvement with data-driven insights.</p>
              </div>
              <div className="card">
                <h3 className="text-2xl font-bold mb-4 text-accent">Enterprise Security</h3>
                <p className="text-gray-700">SOC 2 compliant. Data encryption at rest and in transit. Role-based access control.</p>
              </div>
              <div className="card">
                <h3 className="text-2xl font-bold mb-4 text-accent">Seamless Integration</h3>
                <p className="text-gray-700">Connect with your existing tools. APIs for CRM, data warehouses, and BI platforms.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-center mb-16">Use Cases</h2>
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-bold mb-4">Strategic Planning</h3>
                <p className="text-gray-700 mb-4">Annual strategy sessions powered by market intelligence and scenario modeling.</p>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-4">M&A Due Diligence</h3>
                <p className="text-gray-700 mb-4">Quick integration of expert opinions with AI-powered risk analysis.</p>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-4">Risk Management</h3>
                <p className="text-gray-700 mb-4">Proactive identification and mitigation with advisor expertise.</p>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-4">Product Launches</h3>
                <p className="text-gray-700 mb-4">Go-to-market strategy with real-time market validation.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-xl text-gray-700 mb-10">14-day free trial. No credit card required. Full access to all features.</p>
            <Link href="/enterprise-signup" className="btn btn-primary text-lg">Start Your Trial</Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
