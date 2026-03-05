import React from "react";
import { Link } from "react-router-dom";

const Section = ({ title, children }) => (
  <div className="mb-8">
    <h2 className="mb-3 text-lg font-bold text-gray-900">{title}</h2>
    <div className="space-y-2 text-sm leading-relaxed text-gray-600">{children}</div>
  </div>
);

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 px-5 py-12 font-sans">
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <div className="mb-8 flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2 text-gray-500 hover:text-blue-600 transition text-sm">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back
          </Link>
        </div>

        <div className="rounded-2xl bg-white p-8 shadow-lg shadow-gray-100 ring-1 ring-gray-100">
          <div className="mb-8 border-b border-gray-100 pb-6">
            <div className="mb-3 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
                <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <span className="text-xs font-semibold uppercase tracking-widest text-blue-600">Legal</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Privacy Policy</h1>
            <p className="mt-2 text-sm text-gray-400">Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>
          </div>

          <Section title="1. Information We Collect">
            <p>We collect information you provide directly when creating an account, such as your username, email address, full name, and selected role (Candidate, Employer, or University).</p>
            <p>We also collect usage data, device information, and IP addresses to improve our services and ensure platform security.</p>
          </Section>

          <Section title="2. How We Use Your Information">
            <p>Your information is used to provide and personalize HireNexon services, facilitate connections between candidates and employers, send account-related communications, and improve our platform.</p>
            <p>We do not sell your personal information to third parties.</p>
          </Section>

          <Section title="3. Data Sharing">
            <p>We may share information with trusted service providers who assist in operating our platform (e.g., email delivery, cloud storage) under strict confidentiality agreements.</p>
            <p>We may disclose data when required by law or to protect the safety of our users and platform.</p>
          </Section>

          <Section title="4. Cookies & Tracking">
            <p>We use cookies and similar technologies to maintain session state, remember preferences, and analyze usage patterns. You may control cookie settings through your browser.</p>
          </Section>

          <Section title="5. Data Security">
            <p>We implement industry-standard security measures including TLS encryption, password hashing (bcrypt), rate limiting, and regular security audits to protect your data.</p>
          </Section>

          <Section title="6. Your Rights (GDPR)">
            <p>If you are in the EU/EEA, you have the right to access, correct, delete, or export your data. You may also object to certain processing activities. Contact us at <a href="mailto:privacy@hirenexon.com" className="text-blue-600 hover:underline">privacy@hirenexon.com</a> to exercise these rights.</p>
          </Section>

          <Section title="7. Data Retention">
            <p>We retain your data for as long as your account is active or as needed to provide services. You may request deletion of your account and associated data at any time.</p>
          </Section>

          <Section title="8. Contact Us">
            <p>For privacy-related inquiries, contact our Data Protection Officer at <a href="mailto:privacy@hirenexon.com" className="text-blue-600 hover:underline">privacy@hirenexon.com</a>.</p>
          </Section>
        </div>

        <div className="mt-6 text-center text-xs text-gray-400">
          <Link to="/terms" className="text-blue-500 hover:underline">Terms of Service</Link>
          <span className="mx-2">·</span>
          <Link to="/signup" className="text-blue-500 hover:underline">Back to Signup</Link>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
