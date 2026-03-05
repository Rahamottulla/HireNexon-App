import React from "react";
import { Link } from "react-router-dom";

const Section = ({ title, children }) => (
  <div className="mb-8">
    <h2 className="mb-3 text-lg font-bold text-gray-900">{title}</h2>
    <div className="space-y-2 text-sm leading-relaxed text-gray-600">{children}</div>
  </div>
);

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 px-5 py-12 font-sans">
      <div className="mx-auto max-w-2xl">
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
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <span className="text-xs font-semibold uppercase tracking-widest text-blue-600">Legal</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Terms of Service</h1>
            <p className="mt-2 text-sm text-gray-400">Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>
          </div>

          <Section title="1. Acceptance of Terms">
            <p>By creating an account or using HireNexon, you agree to be bound by these Terms of Service. If you do not agree, you must not use our platform.</p>
          </Section>

          <Section title="2. Account Responsibilities">
            <p>You are responsible for maintaining the security of your account credentials. You agree to notify us immediately of any unauthorized access. HireNexon is not liable for losses from unauthorized use.</p>
            <p>You must provide accurate and complete information when creating your account. Impersonating others or creating false identities is strictly prohibited.</p>
          </Section>

          <Section title="3. Permitted Use">
            <p>HireNexon is a professional platform connecting candidates, employers, and universities. You agree to use the platform only for lawful purposes and in accordance with these terms.</p>
            <p>Prohibited activities include: spamming, posting false job listings, harvesting contact information, scraping data, or any activity that disrupts platform operations.</p>
          </Section>

          <Section title="4. Role-Specific Terms">
            <p><strong>Candidates:</strong> You may apply for jobs, upload resumes, and connect with employers. You grant HireNexon a license to display your profile to relevant employers.</p>
            <p><strong>Employers:</strong> You may post job listings and review candidate profiles. All job listings must be for genuine positions. Discriminatory postings are prohibited.</p>
            <p><strong>Universities:</strong> You may manage campus placement activities for verified students. You are responsible for the accuracy of placement data submitted.</p>
          </Section>

          <Section title="5. Intellectual Property">
            <p>HireNexon and its logos, platform design, and software are owned by HireNexon and protected by intellectual property laws. You may not copy, modify, or distribute our proprietary content without permission.</p>
          </Section>

          <Section title="6. Limitation of Liability">
            <p>HireNexon provides the platform "as is" and makes no warranties about job placement outcomes or employer/candidate quality. We are not liable for losses arising from use of the platform, to the extent permitted by law.</p>
          </Section>

          <Section title="7. Termination">
            <p>We reserve the right to suspend or terminate accounts that violate these terms. You may delete your account at any time through account settings.</p>
          </Section>

          <Section title="8. Changes to Terms">
            <p>We may update these terms periodically. Continued use of HireNexon after changes constitutes acceptance of the updated terms. We will notify users of material changes via email.</p>
          </Section>

          <Section title="9. Governing Law">
            <p>These Terms are governed by the laws of India. Disputes shall be subject to the jurisdiction of courts in [Your City], India.</p>
          </Section>

          <Section title="10. Contact">
            <p>For legal inquiries, contact us at <a href="mailto:legal@hirenexon.com" className="text-blue-600 hover:underline">legal@hirenexon.com</a>.</p>
          </Section>
        </div>

        <div className="mt-6 text-center text-xs text-gray-400">
          <Link to="/privacy" className="text-blue-500 hover:underline">Privacy Policy</Link>
          <span className="mx-2">·</span>
          <Link to="/signup" className="text-blue-500 hover:underline">Back to Signup</Link>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
