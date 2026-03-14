import Head from 'next/head';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Head>
        <title>Matrix 360 - Hybrid Intelligence Platform | Enterprise Decision Making</title>
        <meta name="description" content="Transform enterprise decisions with Hybrid Intelligence. Combine consultant expertise with AI capability for better outcomes." />
      </Head>
      
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary to-gray-900 text-white py-32">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Enterprise Strategy<br />Powered by Hybrid Intelligence
            </h1>
            <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
              Combine the expertise of your consultant network with AI-driven insights. Make better decisions faster.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/enterprise-signup" className="btn btn-primary text-lg">Start Enterprise Trial</Link>
              <Link href="/for-consultants" className="btn btn-secondary text-lg">Join as Consultant</Link>
            </div>
          </div>
        </section>

        {/* Problem Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-center mb-16">The Challenge</h2>
            <div className="grid md:grid-cols-3 gap-12">
              <div className="card">
                <h3 className="text-2xl font-bold mb-4 text-accent">Strategy Complexity</h3>
                <p className="text-gray-700">Enterprise decisions require diverse expertise, real-time data, and scenario analysis that teams struggle to synthesize.</p>
              </div>
              <div className="card">
                <h3 className="text-2xl font-bold mb-4 text-accent">Consultant Isolation</h3>
                <p className="text-gray-700">Individual consultants lack access to collective intelligence, AI tools, and decision-quality frameworks.</p>
              </div>
              <div className="card">
                <h3 className="text-2xl font-bold mb-4 text-accent">AI Limitations</h3>
                <p className="text-gray-700">AI systems excel at analysis but lack human judgment, accountability, and domain expertise.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Solution Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-center mb-16">The Solution: Hybrid Intelligence</h2>
            <div className="max-w-4xl mx-auto">
              <p className="text-xl text-gray-700 mb-8">
                Matrix 360 bridges the gap between human expertise and artificial intelligence. Our platform creates a unified operating system where:
              </p>
              <div className="grid md:grid-cols-2 gap-12">
                <div>
                  <h4 className="text-xl font-bold mb-4 text-accent">For Enterprises</h4>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start gap-3">
                      <span className="text-accent font-bold">✓</span>
                      <span>Access consultant network on-demand</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-accent font-bold">✓</span>
                      <span>AI agents augment human decision-making</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-accent font-bold">✓</span>
                      <span>Real-time strategy room collaboration</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-accent font-bold">✓</span>
                      <span>Measurable decision quality improvement</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-4 text-accent">For Consultants</h4>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start gap-3">
                      <span className="text-accent font-bold">✓</span>
                      <span>AI agents amplify your impact</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-accent font-bold">✓</span>
                      <span>Access to enterprise opportunities</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-accent font-bold">✓</span>
                      <span>Professional network collaboration</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-accent font-bold">✓</span>
                      <span>Transparent earnings & growth</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Strategy Room Preview */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-center mb-16">Strategy Room: Where It Happens</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="card border-2 border-accent-light">
                <h4 className="text-xl font-bold mb-3 text-accent">Video Collaboration</h4>
                <p className="text-gray-700">Multi-party video, screen sharing, and session recording for real-time strategy sessions.</p>
              </div>
              <div className="card border-2 border-accent-light">
                <h4 className="text-xl font-bold mb-3 text-accent">AI Insight Panel</h4>
                <p className="text-gray-700">Live market intelligence, scenario modeling, and decision support integrated into every conversation.</p>
              </div>
              <div className="card border-2 border-accent-light">
                <h4 className="text-xl font-bold mb-3 text-accent">Decision Log</h4>
                <p className="text-gray-700">Structured outcomes, KPIs, and action items automatically captured and integrated into strategy.</p>
              </div>
            </div>
            <div className="text-center mt-12">
              <Link href="/strategy-room" className="btn btn-primary text-lg">See Strategy Room in Action</Link>
            </div>
          </div>
        </section>

        {/* Growth Roadmap Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-center mb-16">Three Parallel Growth Tracks</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="card">
                <h4 className="text-xl font-bold mb-4 text-accent">1. Technology Track</h4>
                <p className="text-gray-700 mb-4">Infrastructure maturation, API stability, and AI layer sophistication enabling seamless integrations.</p>
                <p className="text-sm text-gray-500">Quarterly: Core platform upgrades, new agent capabilities, performance improvements</p>
              </div>
              <div className="card">
                <h4 className="text-xl font-bold mb-4 text-accent">2. Consultant Network</h4>
                <p className="text-gray-700 mb-4">Building the professional community, reputation systems, and marketplace for expertise exchange.</p>
                <p className="text-sm text-gray-500">Quarterly: New specialist categories, verification programs, community features</p>
              </div>
              <div className="card">
                <h4 className="text-xl font-bold mb-4 text-accent">3. Enterprise Adoption</h4>
                <p className="text-gray-700 mb-4">Scaling implementations from startup to enterprise level with proven ROI and transformation outcomes.</p>
                <p className="text-sm text-gray-500">Quarterly: Industry verticals, integration partnerships, compliance certifications</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-accent text-white">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Decisions?</h2>
            <p className="text-xl mb-10">Start your hybrid intelligence journey today.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/enterprise-signup" className="bg-white text-accent font-bold py-3 px-8 rounded hover:opacity-90 transition">Enterprise Trial</Link>
              <Link href="/for-consultants" className="border-2 border-white text-white font-bold py-3 px-8 rounded hover:bg-white hover:text-accent transition">Join Network</Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
}
