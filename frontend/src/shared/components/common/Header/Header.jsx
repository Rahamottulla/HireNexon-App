import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, ArrowRight, Briefcase, Users, Sparkles, GraduationCap,
 LayoutDashboard, BookOpen, UserCheck, ClipboardList, BarChart3, Calendar,
 Building2, Zap, FileText, Target, MessageSquare, Bell } from "lucide-react";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [employersOpen, setEmployersOpen] = useState(false);
  const [universitiesOpen, setUniversitiesOpen] = useState(false);
  const [candidatesOpen, setCandidatesOpen] = useState(false);
  const location = useLocation();

  const navLinkClass = (path) =>
    `text-sm font-semibold transition-colors ${
      location.pathname === path
        ? "text-brand-500 border-b-2 border-brand-500"
        : "text-text-secondary hover:text-brand-500"
    }`;

  const megaFeatures = [
    { icon: Briefcase,     color: "text-brand-500",   bg: "bg-brand-50",   title: "Post Jobs",            desc: "Reach verified candidates across India." },
    { icon: Users,         color: "text-sky-500",      bg: "bg-sky-50",     title: "Manage Applicants",    desc: "Visual structured hiring pipeline." },
    { icon: Sparkles,      color: "text-violet-500",   bg: "bg-violet-50",  title: "AI Filtering",         desc: "Smart resume shortlisting by AI." },
    { icon: GraduationCap, color: "text-amber-500",    bg: "bg-amber-50",   title: "Campus Hiring",        desc: "50+ university partnerships." },
    { icon: BarChart3,     color: "text-emerald-500",  bg: "bg-emerald-50", title: "Analytics",            desc: "Hiring funnel & performance metrics." },
    { icon: Calendar,      color: "text-rose-500",     bg: "bg-rose-50",    title: "Interview Scheduling", desc: "No back-and-forth emails needed." },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-border-subtle shadow-sm font-jakarta">
      <div className="max-w-7xl mx-auto px-5">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <img src="/icons/favicon.png" alt="HireNexon" className="h-9 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            <Link to="/" className={`px-3 py-2 rounded-lg ${navLinkClass("/")}`}>
              Home
            </Link>

  {/* ── For Candidates with Mega Dropdown ── */}
  <div className="relative"
  onMouseEnter={() => setCandidatesOpen(true)}
  onMouseLeave={() => setCandidatesOpen(false)}
>
  <button className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
    location.pathname === "/candidates" ? "text-brand-500" : "text-text-secondary hover:text-brand-500"
  }`}>
    For Candidates
    <ChevronDown size={14} className={`transition-transform duration-200 ${candidatesOpen ? "rotate-180" : ""}`} />
  </button>

  <div className={`absolute top-full left-1/2 -translate-x-1/2 w-[620px] bg-white border border-border-subtle rounded-2xl shadow-dropdown p-5 z-50 transition-all duration-200 ${
    candidatesOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"
  }`} style={{ marginTop: 8 }}>

    <div className="flex items-center justify-between mb-4 pb-4 border-b border-border-subtle">
      <div>
        <div className="text-[10px] font-bold uppercase tracking-[0.15em] text-text-disabled mb-0.5">For Candidates</div>
        <div className="text-sm font-bold text-text-primary">Find the Career You Deserve.</div>
      </div>
      <Link to="/candidates"
        onClick={() => { setCandidatesOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
        className="text-xs font-bold text-brand-500 hover:text-brand-600 flex items-center gap-1 px-3 py-1.5 rounded-lg hover:bg-brand-50 transition-colors">
        View Full Page <ArrowRight size={11} />
      </Link>
    </div>

    <div className="grid grid-cols-3 gap-2 mb-4">
      {[
        { icon: Zap,           color: "text-brand-500",   bg: "bg-brand-50",   title: "One-Click Apply",      desc: "Apply instantly with your saved profile." },
        { icon: FileText,      color: "text-sky-500",     bg: "bg-sky-50",     title: "Application Tracking", desc: "Know where every application stands." },
        { icon: Sparkles,      color: "text-violet-500",  bg: "bg-violet-50",  title: "AI Resume Feedback",   desc: "Improve your resume score with AI." },
        { icon: Target,        color: "text-emerald-500", bg: "bg-emerald-50", title: "Career Planner",       desc: "Set goals with AI-generated roadmaps." },
        { icon: MessageSquare, color: "text-amber-500",   bg: "bg-amber-50",   title: "Mock Interviews",      desc: "Practice with AI-tailored questions." },
        { icon: Bell,          color: "text-rose-500",    bg: "bg-rose-50",    title: "Job Alerts",           desc: "Get notified for your dream roles." },
      ].map((f, i) => {
        const Icon = f.icon;
        return (
          <Link to="/candidates" key={i}
            onClick={() => setCandidatesOpen(false)}
            className="flex items-start gap-2.5 p-3 rounded-xl hover:bg-surface-base transition-colors group">
            <div className={`w-8 h-8 ${f.bg} rounded-lg flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
              <Icon size={15} className={f.color} />
            </div>
            <div>
              <div className="text-xs font-bold text-text-primary mb-0.5">{f.title}</div>
              <div className="text-[11px] text-text-muted leading-snug">{f.desc}</div>
            </div>
          </Link>
        );
      })}
    </div>

    <div className="bg-gradient-to-r from-brand-50 to-sky-50 border border-brand-100 rounded-xl p-4 flex items-center justify-between">
      <div>
        <div className="text-xs font-bold text-text-primary mb-0.5">100% Free for Candidates</div>
        <div className="text-[11px] text-text-muted">No credit card. No hidden fees. Ever.</div>
      </div>
      <div className="flex items-center gap-2">
        <Link to="/jobs" onClick={() => setCandidatesOpen(false)}
          className="text-xs font-semibold text-brand-500 hover:text-brand-600 px-3 py-2 rounded-lg hover:bg-white transition-colors">
          Browse Jobs
        </Link>
        <Link to="/register" onClick={() => setCandidatesOpen(false)}
          className="text-xs font-bold bg-brand-500 hover:bg-brand-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-1.5">
          Get Started <ArrowRight size={11} />
        </Link>
      </div>
    </div>
  </div>
</div>

            {/* ── For Employers with Mega Dropdown ── */}
            <div
              className="relative"
              onMouseEnter={() => setEmployersOpen(true)}
              onMouseLeave={() => setEmployersOpen(false)}
            >
              <button className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                location.pathname === "/employers"
                  ? "text-brand-500"
                  : "text-text-secondary hover:text-brand-500"
              }`}>
                For Employers
                <ChevronDown size={14} className={`transition-transform duration-200 ${employersOpen ? "rotate-180" : ""}`} />
              </button>

              {/* Mega Panel */}
              <div className={`absolute top-full left-1/2 -translate-x-1/2 w-[620px] bg-white border border-border-subtle rounded-2xl shadow-dropdown p-5 z-50 transition-all duration-200 ${
                employersOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"
              }`}
                style={{ marginTop: 8 }}
              >
                {/* Panel header */}
                <div className="flex items-center justify-between mb-4 pb-4 border-b border-border-subtle">
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-[0.15em] text-text-disabled mb-0.5">For Employers</div>
                    <div className="text-sm font-bold text-text-primary">Hire Smarter. Hire Faster. Hire Better.</div>
                  </div>
                  <Link
                    to="/employers"
                    onClick={() => { setEmployersOpen(false); window.scrollTo({top:0, behavior:'smooth'}); }}
                    className="text-xs font-bold text-brand-500 hover:text-brand-600 flex items-center gap-1 px-3 py-1.5 rounded-lg hover:bg-brand-50 transition-colors"
                  >
                    View Full Page <ArrowRight size={11} />
                  </Link>
                </div>

                {/* Features grid */}
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {megaFeatures.map((f, i) => {
                    const Icon = f.icon;
                    return (
                      <Link
                        to="/employers"
                        key={i}
                        className="flex items-start gap-2.5 p-3 rounded-xl hover:bg-surface-base transition-colors group"
                        onClick={() => setEmployersOpen(false)}
                      >
                        <div className={`w-8 h-8 ${f.bg} rounded-lg flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                          <Icon size={15} className={f.color} />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-text-primary mb-0.5">{f.title}</div>
                          <div className="text-[11px] text-text-muted leading-snug">{f.desc}</div>
                        </div>
                      </Link>
                    );
                  })}
                </div>

                {/* Bottom CTA strip */}
                <div className="bg-gradient-to-r from-brand-50 to-violet-50 border border-brand-100 rounded-xl p-4 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-text-primary mb-0.5">Ready to start hiring?</div>
                    <div className="text-[11px] text-text-muted">Free starter plan — no credit card needed.</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link
                      to="/employers#pricing"
                      onClick={() => { setEmployersOpen(false);
                      setTimeout(() => {document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" });
                    }, 100);
                    }}
                      className="text-xs font-semibold text-brand-500 hover:text-brand-600 px-3 py-2 rounded-lg hover:bg-white transition-colors"
                    >
                      View Pricing
                    </Link>
                    <Link
                      to="/recruiter/register"
                      onClick={() => setEmployersOpen(false)}
                      className="text-xs font-bold bg-brand-500 hover:bg-brand-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-1.5"
                    >
                      Get Started <ArrowRight size={11} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

{/* ── For Universities with Mega Dropdown ── */}
<div
  className="relative"
  onMouseEnter={() => setUniversitiesOpen(true)}
  onMouseLeave={() => setUniversitiesOpen(false)}
>
  <button className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
    location.pathname === "/universities"
      ? "text-emerald-500"
      : "text-text-secondary hover:text-emerald-500"
  }`}>
    For Universities
    <ChevronDown size={14} className={`transition-transform duration-200 ${universitiesOpen ? "rotate-180" : ""}`} />
  </button>

  <div className={`absolute top-full left-1/2 -translate-x-1/2 w-[620px] bg-white border border-border-subtle rounded-2xl shadow-dropdown p-5 z-50 transition-all duration-200 ${
    universitiesOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"
  }`} style={{ marginTop: 8 }}>

    {/* Panel header */}
    <div className="flex items-center justify-between mb-4 pb-4 border-b border-border-subtle">
      <div>
        <div className="text-[10px] font-bold uppercase tracking-[0.15em] text-text-disabled mb-0.5">For Universities</div>
        <div className="text-sm font-bold text-text-primary">Empower Your Campus Placements.</div>
      </div>
      <Link
      to="/universities"
      onClick={() => { setUniversitiesOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
      className="text-xs font-bold text-emerald-500 hover:text-emerald-600 flex items-center gap-1 px-3 py-1.5 rounded-lg hover:bg-emerald-50 transition-colors"
      >
        View Full Page <ArrowRight size={11} />
      </Link>
    </div>

    {/* Features grid */}
    <div className="grid grid-cols-3 gap-2 mb-4">
      {[
        { icon: LayoutDashboard, color: "text-brand-500",   bg: "bg-brand-50",   title: "Placement Dashboard",  desc: "Central hub for all placement activity." },
        { icon: UserCheck,       color: "text-sky-500",     bg: "bg-sky-50",     title: "Student Verification", desc: "Verified profiles trusted by employers." },
        { icon: ClipboardList,   color: "text-emerald-500", bg: "bg-emerald-50", title: "Track Applications",   desc: "Monitor every student's status live." },
        { icon: BarChart3,       color: "text-violet-500",  bg: "bg-violet-50",  title: "Placement Analytics",  desc: "Deep insights on packages and trends." },
        { icon: Building2,       color: "text-amber-500",   bg: "bg-amber-50",   title: "Company Drives",       desc: "Schedule and manage drives easily." },
        { icon: BookOpen,        color: "text-rose-500",    bg: "bg-rose-50",    title: "Resume Builder",       desc: "Help students build ATS-ready resumes." },
      ].map((f, i) => {
        const Icon = f.icon;
        return (
          <Link
            to="/universities"
            key={i}
            className="flex items-start gap-2.5 p-3 rounded-xl hover:bg-surface-base transition-colors group"
            onClick={() => setUniversitiesOpen(false)}
          >
            <div className={`w-8 h-8 ${f.bg} rounded-lg flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
              <Icon size={15} className={f.color} />
            </div>
            <div>
              <div className="text-xs font-bold text-text-primary mb-0.5">{f.title}</div>
              <div className="text-[11px] text-text-muted leading-snug">{f.desc}</div>
            </div>
          </Link>
        );
      })}
    </div>

    {/* Bottom CTA strip */}
    <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-100 rounded-xl p-4 flex items-center justify-between">
      <div>
        <div className="text-xs font-bold text-text-primary mb-0.5">Ready to digitise placements?</div>
        <div className="text-[11px] text-text-muted">Free starter plan — no credit card needed.</div>
      </div>
      <div className="flex items-center gap-2">
        <Link
          to="/universities#pricing"
          onClick={() => {
            setUniversitiesOpen(false);
            setTimeout(() => document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" }), 100);
          }}
          className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 px-3 py-2 rounded-lg hover:bg-white transition-colors"
        >
          View Pricing
        </Link>
        <Link
          to="/university/register"
          onClick={() => setUniversitiesOpen(false)}
          className="text-xs font-bold bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-1.5"
        >
          Get Started <ArrowRight size={11} />
        </Link>
      </div>
    </div>
  </div>
</div>
</nav>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-3">
            <Link to="/login" className="text-sm font-semibold text-text-secondary hover:text-brand-500 transition-colors px-3 py-2">
              Login
            </Link>
            <Link
              to="/register"
              className="bg-brand-500 hover:bg-brand-600 text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-all hover:-translate-y-0.5 shadow-sm hover:shadow-md"
            >
              Post a Free Job
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-lg text-text-secondary hover:bg-surface-base transition-colors"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden py-4 space-y-1 border-t border-border-subtle">
            {[
              { to: "/",            label: "Home" },
              { to: "/candidates",  label: "For Candidates" },
              { to: "/employers",   label: "For Employers" },
              { to: "/universities",label: "For Universities" },
            ].map(item => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setMenuOpen(false)}
                className={`block px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                  location.pathname === item.to
                    ? "bg-brand-50 text-brand-500"
                    : "text-text-secondary hover:bg-surface-base hover:text-brand-500"
                }`}
              >
                {item.label}
              </Link>
            ))}

            <div className="pt-3 mt-3 border-t border-border-subtle flex flex-col gap-2">
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="block px-3 py-2.5 rounded-xl text-sm font-semibold text-text-secondary hover:bg-surface-base transition-colors"
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={() => setMenuOpen(false)}
                className="bg-brand-500 text-white text-sm font-bold px-4 py-3 rounded-xl text-center hover:bg-brand-600 transition-colors"
              >
                Post a Free Job
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
