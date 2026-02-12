import React from "react";
import { Link } from "react-router-dom";
import { Linkedin, Twitter, Instagram, Youtube, } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-6 py-14">

        {/* Top Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img
                src="/images/public/hi.png"
                alt="HireNexon"
                className="h-9 w-auto"
              />
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Connecting talent with opportunity. Find your dream job or the
              perfect candidate with HireNexon.
            </p>
          </div>

          {/* Job Seekers */}
          <div>
            <h4 className="text-white font-semibold mb-4">
              For Job Seekers
            </h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/jobs" className="hover:text-white">Browse Jobs</Link></li>
              <li><Link to="/companies" className="hover:text-white">Browse Companies</Link></li>
              <li><Link to="/salary-calculator" className="hover:text-white">Salary Calculator</Link></li>
              <li><Link to="/career-resources" className="hover:text-white">Career Advice</Link></li>
            </ul>
          </div>

          {/* Employers */}
          <div>
            <h4 className="text-white font-semibold mb-4">
              For Employers
            </h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/post-job" className="hover:text-white">Post a Job</Link></li>
              <li><Link to="/pricing" className="hover:text-white">Pricing</Link></li>
              <li><Link to="/recruitment-solutions" className="hover:text-white">Recruitment Solutions</Link></li>
              <li><Link to="/employer-blog" className="hover:text-white">Employer Blog</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold mb-4">
              Company
            </h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="hover:text-white">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
              <li><Link to="/privacy-policy" className="hover:text-white">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-white">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-700 my-10" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">

          <p className="text-sm text-slate-400">
            © {new Date().getFullYear()} HireNexon. All rights reserved.
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-5">
            <a
              href="https://www.linkedin.com/company/hirenexon"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="hover:text-white"
            >
              <Linkedin size={20} />
            </a>

            <a
              href="https://twitter.com"
              aria-label="Twitter"
              className="hover:text-white"
            >
              <Twitter size={20} />
            </a>

            <a
              href="https://instagram.com"
              aria-label="Instagram"
              className="hover:text-white"
            >
              <Instagram size={20} />
            </a>

            <a
              href="https://youtube.com"
              aria-label="YouTube"
              className="hover:text-white"
            >
              <Youtube size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
