import React from 'react';
import { motion } from 'motion/react';

export default function Privacy() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 bg-primary-bg relative overflow-hidden border-b border-border-light">
        <div className="container mx-auto max-w-6xl relative z-10 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-heading font-bold text-text-main leading-tight mb-6">
              Privacy Policy
            </h1>
            <p className="text-xl text-text-muted mb-10 leading-relaxed">
              How we protect and manage your data at Matrix360.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-24 px-4 bg-secondary-bg">
        <div className="container mx-auto max-w-4xl bg-white p-12 rounded-xl border border-border-light shadow-sm">
          <div className="prose prose-slate max-w-none text-text-muted leading-relaxed space-y-8">
            <div>
              <h2 className="text-2xl font-heading font-bold text-text-main mb-4">1. Information We Collect</h2>
              <p>
                We collect information that you provide directly to us when you create an account, submit a challenge, apply as a consultant, or contact us for support. This may include your name, email address, company name, professional title, and any other information you choose to provide.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-heading font-bold text-text-main mb-4">2. How We Use Your Information</h2>
              <p>
                We use the information we collect to provide, maintain, and improve our services, to match organizations with expert consultants, to facilitate collaboration in our workspaces, and to communicate with you about your account and our services.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-heading font-bold text-text-main mb-4">3. Data Security</h2>
              <p>
                We take the security of your data seriously. We use industry-standard encryption and security measures to protect your information from unauthorized access, disclosure, alteration, or destruction. Our workspaces are encrypted and access is controlled through advanced permissioning.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-heading font-bold text-text-main mb-4">4. Sharing of Information</h2>
              <p>
                We do not sell your personal information to third parties. We may share your information with expert consultants as part of the matching process, or with service providers who perform services on our behalf, subject to strict confidentiality agreements.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-heading font-bold text-text-main mb-4">5. Your Choices</h2>
              <p>
                You have the right to access, update, or delete your personal information at any time. You can manage your account settings through the platform or contact us for assistance.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-heading font-bold text-text-main mb-4">6. Changes to This Policy</h2>
              <p>
                We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on our website and updating the "Last Updated" date.
              </p>
            </div>
            <div className="pt-8 border-t border-border-light text-sm">
              <p>Last Updated: October 2023</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
