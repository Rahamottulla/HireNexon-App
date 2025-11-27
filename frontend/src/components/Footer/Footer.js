import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>HireNexon</h3>
            <p>Connecting talent with opportunity. Find your dream job or the perfect candidate.</p>
          </div>
          
          <div className="footer-section">
            <h4>For Job Seekers</h4>
            <ul>
              <li><a href="/jobs">Browse Jobs</a></li>
              <li><a href="/companies">Browse Companies</a></li>
              <li><a href="/salaries">Salary Calculator</a></li>
              <li><a href="/career-advice">Career Advice</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>For Employers</h4>
            <ul>
              <li><a href="/post-job">Post a Job</a></li>
              <li><a href="/pricing">Pricing</a></li>
              <li><a href="/recruitment-solutions">Recruitment Solutions</a></li>
              <li><a href="/employer-blog">Employer Blog</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Company</h4>
            <ul>
              <li><a href="/about">About Us</a></li>
              <li><a href="/contact">Contact</a></li>
              <li><a href="/privacy">Privacy Policy</a></li>
              <li><a href="/terms">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2025 HireNexon. All rights reserved.</p>
          <div className="social-links">
            <a href="#" aria-label="Facebook">📱</a>
            <a href="#" aria-label="Twitter">🐦</a>
            <a href="https://www.linkedin.com/company/hirenexon" aria-label="LinkedIn">💼</a>
            <a href="#" aria-label="Instagram">📸</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
