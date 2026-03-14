import Head from 'next/head';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Pricing() {
  return (
    <>
      <Head>
        <title>Pricing - Matrix 360</title>
      </Head>
      <Header />
      <main>
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <h1 className="text-5xl font-bold text-center mb-16">Flexible Pricing for Every Stage</h1>
            
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-center mb-12">Enterprise Plans</h2>
              <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                <div className="card">
                  <h3 className="text-2xl font-bold mb-2">Startup</h3>
                  <p className="text-4xl font-bold text-accent mb-6">$499<span className="text-base">/month</span></p>
                  <ul className="space-y-3 mb-8 text-gray-700">
                    <li className="flex items-center gap-2">✓ Up to 5 team members</li>
                    <li className="flex items-center gap-2">✓ Strategy Room (3 sessions/month)</li>
                    <li className="flex items-center gap-2">✓ Basic AI agents</li>
                    <li className="flex items-center gap-2">✓ 100 AI credits/month</li>
                    <li className="flex items-center gap-2">✓ Email support</li>
                  </ul>
                  <Link href="/enterprise-signup" className="btn btn-primary w-full text-center">Start Trial</Link>
                </div>

                <div className="card border-2 border-accent">
                  <div className="bg-accent text-white px-3 py-1 rounded inline-block mb-4 text-sm font-bold">POPULAR</div>
                  <h3 className="text-2xl font-bold mb-2">Professional</h3>
                  <p className="text-4xl font-bold text-accent mb-6">$1,299<span className="text-base">/month</span></p>
                  <ul className="space-y-3 mb-8 text-gray-700">
                    <li className="flex items-center gap-2">✓ Up to 20 team members</li>
                    <li className="flex items-center gap-2">✓ Unlimited Strategy Room</li>
                    <li className="flex items-center gap-2">✓ Advanced AI agents</li>
                    <li className="flex items-center gap-2">✓ 500 AI credits/month</li>
                    <li className="flex items-center gap-2">✓ Consultant network access</li>
                    <li className="flex items-center gap-2">✓ Priority support</li>
                  </ul>
                  <Link href="/enterprise-signup" className="btn btn-primary w-full text-center">Start Trial</Link>
                </div>

                <div className="card">
                  <h3 className="text-2xl font-bold mb-2">Enterprise</h3>
                  <p className="text-4xl font-bold text-accent mb-6">Custom</p>
                  <ul className="space-y-3 mb-8 text-gray-700">
                    <li className="flex items-center gap-2">✓ Unlimited team members</li>
                    <li className="flex items-center gap-2">✓ Full Strategy Room suite</li>
                    <li className="flex items-center gap-2">✓ Custom AI agents</li>
                    <li className="flex items-center gap-2">✓ Unlimited AI credits</li>
                    <li className="flex items-center gap-2">✓ API access</li>
                    <li className="flex items-center gap-2">✓ Dedicated account manager</li>
                  </ul>
                  <Link href="/contact" className="btn btn-secondary w-full text-center">Contact Sales</Link>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-center mb-12">Consultant Plans</h2>
              <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                <div className="card">
                  <h3 className="text-2xl font-bold mb-2">Free</h3>
                  <p className="text-4xl font-bold text-accent mb-6">$0</p>
                  <ul className="space-y-3 mb-8 text-gray-700">
                    <li className="flex items-center gap-2">✓ Create profile</li>
                    <li className="flex items-center gap-2">✓ Browse opportunities</li>
                    <li className="flex items-center gap-2">✓ Standard session rates</li>
                    <li className="flex items-center gap-2">✓ Basic credentialing</li>
                  </ul>
                  <Link href="/consultant-onboarding" className="btn btn-secondary w-full text-center">Get Started</Link>
                </div>

                <div className="card border-2 border-accent">
                  <div className="bg-accent text-white px-3 py-1 rounded inline-block mb-4 text-sm font-bold">RECOMMENDED</div>
                  <h3 className="text-2xl font-bold mb-2">Professional</h3>
                  <p className="text-4xl font-bold text-accent mb-6">$99<span className="text-base">/month</span></p>
                  <ul className="space-y-3 mb-8 text-gray-700">
                    <li className="flex items-center gap-2">✓ All Free features</li>
                    <li className="flex items-center gap-2">✓ AI agent assistance</li>
                    <li className="flex items-center gap-2">✓ Premium session rates (+20%)</li>
                    <li className="flex items-center gap-2">✓ Advanced credentialing</li>
                    <li className="flex items-center gap-2">✓ Priority matching</li>
                  </ul>
                  <Link href="/consultant-onboarding" className="btn btn-primary w-full text-center">Get Started</Link>
                </div>

                <div className="card">
                  <h3 className="text-2xl font-bold mb-2">Enterprise</h3>
                  <p className="text-4xl font-bold text-accent mb-6">Custom</p>
                  <ul className="space-y-3 mb-8 text-gray-700">
                    <li className="flex items-center gap-2">✓ All Professional features</li>
                    <li className="flex items-center gap-2">✓ Custom AI agents</li>
                    <li className="flex items-center gap-2">✓ Enterprise rates (custom)</li>
                    <li className="flex items-center gap-2">✓ Dedicated support</li>
                  </ul>
                  <Link href="/contact" className="btn btn-secondary w-full text-center">Contact Us</Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12">AI Credit System</h2>
            <div className="max-w-3xl mx-auto card">
              <p className="text-gray-700 mb-4">AI Credits power your agent usage:</p>
              <ul className="space-y-2 text-gray-700 mb-6">
                <li>• <strong>1 Credit</strong> = Market intelligence query</li>
                <li>• <strong>2 Credits</strong> = Scenario modeling session</li>
                <li>• <strong>3 Credits</strong> = Complex analysis or co-advisor</li>
                <li>• <strong>Unused credits roll over</strong> to next month</li>
                <li>• <strong>Purchase additional credits</strong> at $0.10/credit</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-8">All Plans Include</h2>
            <div className="grid md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              <div>
                <p className="font-bold text-accent mb-2">🔒 Security</p>
                <p className="text-sm text-gray-700">SOC 2 compliant, encryption at rest & transit</p>
              </div>
              <div>
                <p className="font-bold text-accent mb-2">📱 Mobile</p>
                <p className="text-sm text-gray-700">Native iOS & Android apps</p>
              </div>
              <div>
                <p className="font-bold text-accent mb-2">🔌 API</p>
                <p className="text-sm text-gray-700">RESTful API for integrations</p>
              </div>
              <div>
                <p className="font-bold text-accent mb-2">📊 Analytics</p>
                <p className="text-sm text-gray-700">Decision tracking & ROI measurement</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-accent text-white">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-6">Questions About Pricing?</h2>
            <p className="text-lg mb-8">Our team is ready to help you find the right plan.</p>
            <Link href="/contact" className="bg-white text-accent font-bold py-3 px-8 rounded hover:opacity-90 transition">Contact Sales</Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
