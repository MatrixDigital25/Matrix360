import Head from 'next/head';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ForConsultants() {
  return (
    <>
      <Head>
        <title>For Consultants - Matrix 360</title>
      </Head>
      <Header />
      <main>
        <section className="bg-gradient-to-br from-primary to-gray-900 text-white py-32">
          <div className="container mx-auto px-6">
            <h1 className="text-5xl font-bold mb-6">Amplify Your Impact</h1>
            <p className="text-xl text-gray-300 max-w-2xl mb-8">AI agents multiply your impact. Access enterprise opportunities. Earn more while helping more.</p>
            <Link href="/consultant-onboarding" className="btn btn-primary text-lg">Join Free</Link>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-center mb-16">Why Join Matrix 360?</h2>
            <div className="grid md:grid-cols-3 gap-12">
              <div className="card">
                <h3 className="text-2xl font-bold mb-4 text-accent">AI Agents</h3>
                <p className="text-gray-700">Custom AI agents augment your expertise. Scale your impact without hiring.</p>
              </div>
              <div className="card">
                <h3 className="text-2xl font-bold mb-4 text-accent">Enterprise Access</h3>
                <p className="text-gray-700">Direct access to vetted enterprise clients seeking your expertise.</p>
              </div>
              <div className="card">
                <h3 className="text-2xl font-bold mb-4 text-accent">Professional Network</h3>
                <p className="text-gray-700">Collaborate with other experts. Co-advise on complex engagements.</p>
              </div>
              <div className="card">
                <h3 className="text-2xl font-bold mb-4 text-accent">Flexible Engagement</h3>
                <p className="text-gray-700">One-off sessions or long-term retainers. You control your schedule.</p>
              </div>
              <div className="card">
                <h3 className="text-2xl font-bold mb-4 text-accent">Transparent Earnings</h3>
                <p className="text-gray-700">Clear pricing. Session charges + subscription bonuses. Real-time tracking.</p>
              </div>
              <div className="card">
                <h3 className="text-2xl font-bold mb-4 text-accent">Profile Showcase</h3>
                <p className="text-gray-700">Build your reputation with reviews and credentials. Grow your personal brand.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-center mb-16">Pricing for Consultants</h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="card">
                <h3 className="text-2xl font-bold mb-2 text-accent">Free Tier</h3>
                <p className="text-4xl font-bold mb-4">$0<span className="text-base">/mo</span></p>
                <ul className="space-y-2 text-gray-700 mb-6">
                  <li>✓ Create profile</li>
                  <li>✓ Browse opportunities</li>
                  <li>✓ Per-session rates</li>
                </ul>
              </div>
              <div className="card border-2 border-accent">
                <h3 className="text-2xl font-bold mb-2 text-accent">Professional</h3>
                <p className="text-4xl font-bold mb-4">$99<span className="text-base">/mo</span></p>
                <ul className="space-y-2 text-gray-700 mb-6">
                  <li>✓ All Free features</li>
                  <li>✓ AI agent assist</li>
                  <li>✓ Priority matching</li>
                </ul>
              </div>
              <div className="card">
                <h3 className="text-2xl font-bold mb-2 text-accent">Enterprise</h3>
                <p className="text-4xl font-bold mb-4">Custom</p>
                <ul className="space-y-2 text-gray-700 mb-6">
                  <li>✓ All Professional</li>
                  <li>✓ Custom agents</li>
                  <li>✓ Direct support</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Amplify?</h2>
            <p className="text-xl text-gray-700 mb-10">Create your profile in 5 minutes. Start getting opportunities immediately.</p>
            <Link href="/consultant-onboarding" className="btn btn-primary text-lg">Get Started</Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
