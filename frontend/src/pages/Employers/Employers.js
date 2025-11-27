import React from 'react';
import './Employers.css';

const Employers = () => {
  const pricingPlans = [
    {
      id: 1,
      name: 'Basic',
      price: '$199',
      period: 'per month',
      features: [
        '1 Job Posting',
        '30-Day Listing',
        'Basic Analytics',
        'Email Support'
      ],
      recommended: false
    },
    {
      id: 2,
      name: 'Professional',
      price: '$399',
      period: 'per month',
      features: [
        '5 Job Postings',
        '60-Day Listings',
        'Advanced Analytics',
        'Priority Support',
        'Company Profile',
        'Resume Database Access'
      ],
      recommended: true
    },
    {
      id: 3,
      name: 'Enterprise',
      price: '$799',
      period: 'per month',
      features: [
        'Unlimited Job Postings',
        '90-Day Listings',
        'Premium Analytics',
        'Dedicated Account Manager',
        'Custom Branding',
        'AI Candidate Matching',
        'Recruitment Marketing'
      ],
      recommended: false
    }
  ];

  return (
    <div className="employers-page">
      <div className="container">
        <div className="page-header">
          <h1>Hire the Best Talent</h1>
          <p>Powerful recruiting software to find, attract, and hire top talent</p>
        </div>
        
        <section className="employer-benefits">
          <div className="benefits-grid">
            <div className="benefit-card">
              <div className="benefit-icon">🚀</div>
              <h3>Reach Qualified Candidates</h3>
              <p>Get your job in front of millions of qualified job seekers.</p>
            </div>
            
            <div className="benefit-card">
              <div className="benefit-icon">⚡</div>
              <h3>Hire Faster</h3>
              <p>Streamline your hiring process with our powerful tools.</p>
            </div>
            
            <div className="benefit-card">
              <div className="benefit-icon">🎯</div>
              <h3>Targeted Matching</h3>
              <p>Our AI matches you with candidates who fit your requirements.</p>
            </div>
          </div>
        </section>
        
        <section className="pricing-section">
          <h2 className="section-title">Simple, Transparent Pricing</h2>
          <div className="pricing-grid">
            {pricingPlans.map(plan => (
              <div key={plan.id} className={`pricing-card ${plan.recommended ? 'recommended' : ''}`}>
                {plan.recommended && <div className="recommended-badge">Most Popular</div>}
                <h3>{plan.name}</h3>
                <div className="price">
                  <span className="amount">{plan.price}</span>
                  <span className="period">{plan.period}</span>
                </div>
                <ul className="features">
                  {plan.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
                <button className="btn btn-primary">Get Started</button>
              </div>
            ))}
          </div>
        </section>
        
        <section className="success-stories">
          <h2 className="section-title">Success Stories</h2>
          <div className="stories-grid">
            <div className="story-card">
              <div className="story-content">
                "HireSphere helped us reduce our time-to-hire by 40% and find quality candidates we wouldn't have found elsewhere."
              </div>
              <div className="story-author">
                <img src="/images/company-logo-1.png" alt="TechCorp" />
                <div>
                  <h4>Jennifer Lee</h4>
                  <p>HR Director, TechCorp</p>
                </div>
              </div>
            </div>
            
            <div className="story-card">
              <div className="story-content">
                "The candidate matching algorithm is incredible. We're seeing better qualified applicants than ever before."
              </div>
              <div className="story-author">
                <img src="/images/company-logo-2.png" alt="DesignHub" />
                <div>
                  <h4>Marcus Johnson</h4>
                  <p>CEO, DesignHub</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Employers;
