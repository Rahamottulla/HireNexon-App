import { useState, useEffect, useRef  } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Briefcase, Users, Calendar, Sparkles, Building2, Database,
  BarChart3, GraduationCap, Zap, Globe2, ShieldCheck, CheckCircle2,
  Star, ArrowRight, ChevronRight, TrendingUp, Award, Building,
} from "lucide-react";

/* ── Animated Counter ── */
const Counter = ({ end, suffix = "", prefix = "" }) => {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        let current = 0;
        const increment = end / 55;
        const timer = setInterval(() => {
          current += increment;
          if (current >= end) { setVal(end); clearInterval(timer); }
          else setVal(Math.floor(current));
        }, 20);
        obs.disconnect();
      }
    }, { threshold: 0.4 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [end]);
  return <span ref={ref}>{prefix}{val.toLocaleString()}{suffix}</span>;
};

/* ── Data ── */
const features = [
  { icon: Briefcase,     color: "text-brand-500",  bg: "bg-brand-50",   title: "Post Jobs",                   desc: "Publish openings and reach verified candidates across India instantly." },
  { icon: Users,         color: "text-sky-500",     bg: "bg-sky-50",     title: "Manage Applicants",           desc: "Track every candidate through a visual, structured hiring pipeline." },
  { icon: Calendar,      color: "text-emerald-500", bg: "bg-emerald-50", title: "Interview Scheduling",        desc: "Built-in coordination tools — no back-and-forth emails needed." },
  { icon: Sparkles,      color: "text-violet-500",  bg: "bg-violet-50",  title: "AI Resume Filtering",         desc: "Intelligent shortlisting powered by AI — save 80% of screening time." },
  { icon: Building2,     color: "text-amber-500",   bg: "bg-amber-50",   title: "Company Branding Page",       desc: "Custom profile to showcase your brand, culture, and open roles." },
  { icon: Database,      color: "text-rose-500",    bg: "bg-rose-50",    title: "Resume Database Access",      desc: "Search thousands of active, skill-verified candidate profiles." },
  { icon: BarChart3,     color: "text-brand-500",   bg: "bg-brand-50",   title: "Analytics Dashboard",         desc: "Hiring funnel metrics, time-to-hire, source quality — all in one view." },
  { icon: GraduationCap, color: "text-sky-500",     bg: "bg-sky-50",     title: "Campus Hiring Access",        desc: "Directly connect with placement cells at 50+ partner universities." },
  { icon: Zap,           color: "text-emerald-500", bg: "bg-emerald-50", title: "Bulk Hiring Tools",           desc: "Designed for mass drives — post, filter, and hire at scale effortlessly." },
];

const whyUs = [
  {
    icon: Sparkles, color: "text-violet-500", bg: "bg-violet-50", iconColor: "#8b5cf6",
    title: "AI-Powered Hiring",
    desc: "Smart resume matching and intelligent filtering reduce time-to-hire by 85%.",
    points: ["Skill-based candidate matching", "Auto-ranking & shortlisting", "Bias-free AI screening"],
  },
  {
    icon: GraduationCap, color: "text-sky-500", bg: "bg-sky-50", iconColor: "#0ea5e9",
    title: "Campus Network Access",
    desc: "Direct pipeline to verified universities and placement cells across India.",
    points: ["50+ university partnerships", "Verified student profiles", "Placement cell integration"],
  },
  {
    icon: ShieldCheck, color: "text-emerald-500", bg: "bg-emerald-50", iconColor: "#10b981",
    title: "Secure & Verified Platform",
    desc: "Every organization is verified before getting access to candidate data.",
    points: ["GST-verified companies only", "End-to-end data encryption", "DPDP Act compliant"],
  },
  {
    icon: Globe2, color: "text-amber-500", bg: "bg-amber-50", iconColor: "#f59e0b",
    title: "Built for India",
    desc: "Pricing and hiring workflows tailored for the Indian hiring ecosystem.",
    points: ["INR pricing, no hidden fees", "Regional language filters", "Indian job taxonomy"],
  },
];

const pricingPlans = [
  {
    name: "Starter", price: "₹0", period: "/month", badge: null, highlight: false,
    desc: "Perfect for early-stage startups exploring hiring.",
    features: ["5 active job posts", "250 candidate views/month", "Campus hiring access","Company branding page", "Basic applicant pipeline", "Community support"],
    cta: "Get Started Free",
  },
  {
    name: "Hiring Pro", price: "₹2,999", period: "/month", badge: null, highlight: false,
    desc: "For growing teams that need more reach and smarter filtering.",
    features: ["15 active job posts", "1000 candidate views/month", "Campus hiring access","Company branding page", "AI resume filtering", "Interview scheduler", "Email & chat support"],
    cta: "Start Hiring Pro",
  },
  {
    name: "Professional", price: "₹14,999", period: "/month", badge: "Most Popular", highlight: true,
    desc: "The complete hiring suite for serious companies.",
    features: ["Unlimited job posts", "Unlimited candidate views", "Campus hiring access","Company branding page", "Full AI hiring suite", "Analytics dashboard", "Dedicated account manager"],
    cta: "Start Professional",
  },
  {
    name: "Enterprise", price: "Custom", period: "", badge: null, highlight: false,
    desc: "Tailored solutions for large organisations.",
    features: ["Everything in Professional", "Custom integrations & API", "Bulk hiring tools", "SLA guarantee (99.9%)", "On-premise deployment", "Executive priority support"],
    cta: "Contact Sales",
  },
];

const testimonials = [
  {
    name: "Priya Sharma", role: "HR Head", company: "FinScale Technologies",
    initials: "PS", color: "from-brand-500 to-violet-500", rating: 5,
    text: "HireNexon cut our campus hiring cycle from 6 weeks to 10 days. The university pipeline is genuinely game-changing for us at scale.",
  },
  {
    name: "Rahul Mehta", role: "Talent Acquisition Lead", company: "LogiSoft India",
    initials: "RM", color: "from-sky-500 to-emerald-500", rating: 5,
    text: "The AI filtering is incredibly accurate. We went from reviewing 400 resumes to just 30 qualified shortlists. The ROI was visible in week one.",
  },
  {
    name: "Anjali Verma", role: "Co-founder", company: "BuildRight Infra",
    initials: "AV", color: "from-amber-500 to-rose-500", rating: 5,
    text: "As a growing startup, Professional plan gave us enterprise-grade hiring tools at a price we could afford. Onboarding took less than 20 minutes.",
  },
];

const trustedLogos = ["Infosys", "HDFC Bank", "Zomato", "Meesho", "Razorpay", "PhonePe", "Groww", "CRED", "Swiggy", "Ola"];

/* ── Dashboard Mockup ── */
const DashboardMockup = () => (
  <div className="w-full h-full p-6 flex flex-col gap-4">
    {/* Top bar */}
    <div className="flex items-center justify-between">
      <div>
        <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Hiring Overview</div>
        <div className="text-lg font-bold text-slate-800">Q1 2025 Dashboard</div>
      </div>
      <div className="flex gap-2">
        {["All Time", "This Month", "This Week"].map((t, i) => (
          <div key={t} className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${i === 1 ? "bg-brand-500 text-white shadow-sm" : "bg-white text-slate-500 border border-slate-200"}`}>{t}</div>
        ))}
      </div>
    </div>

    {/* Stats row */}
    <div className="grid grid-cols-4 gap-3">
      {[
        { label: "Applications", val: "1,284", change: "+18%", color: "text-brand-500" },
        { label: "Shortlisted",  val: "342",   change: "+24%", color: "text-emerald-500" },
        { label: "Interviews",   val: "89",    change: "+12%", color: "text-sky-500" },
        { label: "Hired",        val: "23",    change: "+8%",  color: "text-violet-500" },
      ].map(s => (
        <div key={s.label} className="bg-white rounded-xl p-3 border border-slate-100 shadow-sm">
          <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">{s.label}</div>
          <div className={`text-xl font-bold ${s.color}`}>{s.val}</div>
          <div className="text-[10px] text-emerald-500 font-semibold mt-0.5">{s.change} vs last month</div>
        </div>
      ))}
    </div>

    {/* Pipeline */}
    <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-4 flex-1">
      <div className="text-xs font-bold text-slate-700 mb-3">Hiring Pipeline</div>
      <div className="space-y-2.5">
        {[
          { name: "Aditya Kumar",    role: "Frontend Engineer",    stage: "Interview",  avatar: "AK", color: "bg-brand-100 text-brand-600" },
          { name: "Sneha Patil",     role: "Product Manager",      stage: "Offer Sent", avatar: "SP", color: "bg-emerald-100 text-emerald-600" },
          { name: "Rohan Mishra",    role: "Data Scientist",       stage: "Screening",  avatar: "RM", color: "bg-sky-100 text-sky-600" },
          { name: "Kavya Reddy",     role: "UX Designer",          stage: "Applied",    avatar: "KR", color: "bg-violet-100 text-violet-600" },
        ].map(c => (
          <div key={c.name} className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 transition-colors">
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${c.color}`}>{c.avatar}</div>
            <div className="flex-1 min-w-0">
              <div className="text-[11px] font-semibold text-slate-700 truncate">{c.name}</div>
              <div className="text-[10px] text-slate-400 truncate">{c.role}</div>
            </div>
            <div className={`text-[9px] font-bold px-2 py-1 rounded-full ${
              c.stage === "Offer Sent" ? "bg-emerald-100 text-emerald-600" :
              c.stage === "Interview" ? "bg-brand-100 text-brand-600" :
              c.stage === "Screening" ? "bg-sky-100 text-sky-600" : "bg-slate-100 text-slate-500"
            }`}>{c.stage}</div>
          </div>
        ))}
      </div>
    </div>

    {/* Bar chart */}
    <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-4">
      <div className="text-xs font-bold text-slate-700 mb-3">Applications This Week</div>
      <div className="flex items-end gap-2 h-16">
        {[40, 65, 45, 80, 55, 90, 72].map((h, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-1">
            <div className="w-full rounded-t-md transition-all" style={{
              height: `${h}%`,
              background: i === 5 ? "linear-gradient(180deg,#6366f1,#818cf8)" : "#e0e7ff"
            }} />
            <div className="text-[8px] text-slate-400">{["M","T","W","T","F","S","S"][i]}</div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

/* ── Main Component ── */
export default function ForEmployers() {
  const location = useLocation();
  
  useEffect(() => {
  if (location.hash) {
    const el = document.getElementById(location.hash.replace("#", ""));
    if (el) {
      setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 100);
    }
  }
}, [location.hash]);

   //discount amount
     const [billing, setBilling] = useState("monthly");
     const getPrice = (base) => {
     if (base === "₹0" || base === "Custom") return null;
     const num = parseInt(base.replace(/[₹,]/g, ""));
     if (billing === "6months") return `₹${Math.floor(num * 0.9).toLocaleString("en-IN")}`;
     if (billing === "yearly")  return `₹${Math.floor(num * 0.75).toLocaleString("en-IN")}`;
     return null;
     };
   
     const getSaveLabel  = () =>
      billing === "yearly" ? "Save 25% + 3 months free" : billing === "6months" ? "Save 10% + 1 month free" : null;
   

  return (
    <div className="min-h-screen bg-surface-card font-jakarta text-text-primary overflow-x-hidden">

      {/* ══════════════════ HERO ══════════════════ */}
      <section id="for-employers" className="relative bg-surface-card pt-16 pb-24 overflow-hidden">
        {/* Background grid */}
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, #e2e8f0 1px, transparent 0)",
          backgroundSize: "32px 32px",
          opacity: 0.6,
        }} />
        {/* Glow orbs */}
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)" }} />
        <div className="absolute -top-20 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 70%)" }} />

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Left */}
            <div>
              {/* Trust badge */}
              <div className="inline-flex items-center gap-2 bg-brand-50 border border-brand-100 text-brand-600 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider mb-8">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                Trusted by 100+ Growing Companies
              </div>

              <h1 className="text-[52px] leading-[1.12] font-extrabold text-text-primary mb-6 tracking-tight">
                Hire Smarter.<br />
                <span className="text-brand-500">Hire Faster.</span><br />
                Hire Better.
              </h1>

              <p className="text-lg text-text-muted leading-relaxed mb-10 max-w-[480px]">
                India's next-generation hiring platform designed for modern companies. From campus to corporate — one powerful workspace.
              </p>

              <div className="flex flex-wrap gap-4 mb-12">
                <Link to="/recruiter/register"
                  className="inline-flex items-center gap-2 bg-brand-500 hover:bg-brand-600 text-white font-bold px-7 py-4 rounded-xl transition-all hover:-translate-y-0.5 shadow-md hover:shadow-lg text-[15px]">
                  Create Company Workspace <ArrowRight size={16} />
                </Link>
                <a href="#pricing"
                  className="inline-flex items-center gap-2 bg-white border-2 border-border-base text-text-secondary hover:border-brand-400 hover:text-brand-500 font-bold px-7 py-4 rounded-xl transition-all text-[15px]">
                  View Pricing <ChevronRight size={16} />
                </a>
              </div>

              {/* Trusted logos strip */}
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-text-disabled mb-4">Trusted by teams at</p>
                <div className="flex flex-wrap gap-3">
                  {["Infosys", "Zomato", "Razorpay", "Groww", "CRED", "PhonePe"].map(logo => (
                    <div key={logo} className="bg-surface-base border border-border-subtle rounded-lg px-4 py-2 text-xs font-bold text-text-muted">
                      {logo}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right – Dashboard mockup */}
            <div className="relative">
              {/* Main card */}
              <div className="relative bg-surface-base border border-border-subtle rounded-[28px] shadow-[0_32px_80px_rgba(30,41,59,0.12)] overflow-hidden"
                style={{ height: 480 }}>
                <DashboardMockup />
              </div>

              {/* Floating stat cards */}
              <div className="absolute -left-10 top-16 bg-white rounded-2xl shadow-[0_8px_32px_rgba(30,41,59,0.14)] border border-border-subtle px-5 py-4 flex items-center gap-3"
                style={{ animation: "floatA 4s ease-in-out infinite" }}>
                <div className="w-10 h-10 bg-brand-50 rounded-xl flex items-center justify-center">
                  <Users size={18} className="text-brand-500" />
                </div>
                <div>
                  <div className="text-lg font-extrabold text-text-primary leading-none"><Counter end={10000} suffix="+" /></div>
                  <div className="text-[11px] text-text-muted font-semibold">Active Candidates</div>
                </div>
              </div>

              <div className="absolute -right-8 top-1/3 bg-white rounded-2xl shadow-[0_8px_32px_rgba(30,41,59,0.14)] border border-border-subtle px-5 py-4 flex items-center gap-3"
                style={{ animation: "floatB 4.5s ease-in-out infinite" }}>
                <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center">
                  <TrendingUp size={18} className="text-emerald-500" />
                </div>
                <div>
                  <div className="text-lg font-extrabold text-emerald-600 leading-none"><Counter end={85} suffix="% Faster" /></div>
                  <div className="text-[11px] text-text-muted font-semibold">Time to Hire</div>
                </div>
              </div>

              <div className="absolute -left-6 bottom-16 bg-white rounded-2xl shadow-[0_8px_32px_rgba(30,41,59,0.14)] border border-border-subtle px-5 py-4 flex items-center gap-3"
                style={{ animation: "floatC 5s ease-in-out infinite" }}>
                <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center">
                  <GraduationCap size={18} className="text-amber-500" />
                </div>
                <div>
                  <div className="text-lg font-extrabold text-text-primary leading-none"><Counter end={50} suffix="+" /></div>
                  <div className="text-[11px] text-text-muted font-semibold">Universities Connected</div>
                </div>
              </div>

              <style>{`
                @keyframes floatA { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
                @keyframes floatB { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
                @keyframes floatC { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
              `}</style>
            </div>
          </div>

          {/* Stats bar */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { val: 10000, suffix: "+", label: "Active Candidates",   color: "text-brand-500" },
              { val: 100,   suffix: "+", label: "Verified Companies",  color: "text-emerald-500" },
              { val: 50,    suffix: "+", label: "Partner Universities",color: "text-sky-500" },
              { val: 85,    suffix: "%", label: "Faster Time-to-Hire", color: "text-violet-500" },
            ].map(s => (
              <div key={s.label} className="bg-surface-base border border-border-subtle rounded-2xl p-6 text-center">
                <div className={`text-4xl font-extrabold ${s.color} mb-1`}>
                  <Counter end={s.val} suffix={s.suffix} />
                </div>
                <div className="text-sm font-semibold text-text-muted">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════ TRUSTED LOGOS ══════════════════ */}
      <section className="bg-slate-50 py-14 border-y border-border-subtle overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-8 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-text-disabled">
            Trusted by fast-growing companies across India
          </p>
        </div>
        <div className="flex gap-6 animate-[slideLogos_22s_linear_infinite] w-max">
          {[...trustedLogos, ...trustedLogos].map((logo, i) => (
            <div key={i} className="bg-white border border-border-subtle rounded-xl px-8 py-4 text-sm font-bold text-text-muted whitespace-nowrap shadow-sm hover:shadow-md hover:border-brand-200 transition-all">
              {logo}
            </div>
          ))}
        </div>
        <style>{`@keyframes slideLogos { from{transform:translateX(0)} to{transform:translateX(-50%)} }`}</style>
      </section>

      {/* ══════════════════ FEATURES ══════════════════ */}
      <section id="features" className="pt-16 pb-24 bg-surface-card">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-brand-50 border border-brand-100 text-brand-600 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider mb-5">
              <Sparkles size={12} /> What We Provide
            </div>
            <h2 className="text-4xl font-bold text-text-primary mb-4">Everything You Need to Hire</h2>
            <p className="text-lg text-text-muted max-w-xl mx-auto">
              A complete hiring operating system — from job posting to offer letter, built for modern Indian companies.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <div key={i} className="group bg-white border border-border-subtle rounded-2xl p-8 hover:-translate-y-1.5 hover:shadow-[0_20px_48px_rgba(30,41,59,0.1)] hover:border-transparent transition-all duration-300 cursor-default">
                  <div className={`w-12 h-12 ${f.bg} rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon size={22} className={f.color} />
                  </div>
                  <h3 className="text-[17px] font-bold text-text-primary mb-2">{f.title}</h3>
                  <p className="text-sm text-text-muted leading-relaxed">{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════ WHY CHOOSE US ══════════════════ */}
      <section id="why-us" className="pt-16 pb-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-100 text-emerald-600 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider mb-5">
              <Award size={12} /> Why Choose Us
            </div>
            <h2 className="text-4xl font-bold text-text-primary mb-4">Built Different. Built Better.</h2>
            <p className="text-lg text-text-muted max-w-xl mx-auto">
              We didn't just copy a global platform — we built from scratch for the Indian hiring reality.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {whyUs.map((w, i) => {
              const Icon = w.icon;
              return (
                <div key={i} className="bg-white border border-border-subtle rounded-2xl p-8 hover:-translate-y-1 hover:shadow-[0_20px_48px_rgba(30,41,59,0.09)] transition-all duration-300">
                  <div className="flex items-start gap-5">
                    <div className={`w-14 h-14 ${w.bg} rounded-2xl flex items-center justify-center shrink-0`}>
                      <Icon size={26} className={w.color} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-text-primary mb-2">{w.title}</h3>
                      <p className="text-sm text-text-muted leading-relaxed mb-5">{w.desc}</p>
                      <ul className="space-y-2">
                        {w.points.map((p, j) => (
                          <li key={j} className="flex items-center gap-2.5 text-sm font-semibold text-text-secondary">
                            <CheckCircle2 size={15} className="text-emerald-500 shrink-0" />
                            {p}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════ PRICING ══════════════════ */}
      <section id="pricing" className="pt-16 pb-24 bg-surface-card">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-violet-50 border border-violet-100 text-violet-600 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider mb-5">
              <Zap size={12} /> Transparent Pricing
            </div>
            <h2 className="text-4xl font-bold text-text-primary mb-4">Plans Built for Every Stage</h2>
            <p className="text-lg text-text-muted max-w-xl mx-auto">
              No hidden fees. No surprise bills. Cancel anytime.
            </p>
          </div>

{/* Billing Toggle */}
<div className="flex items-center justify-center mb-12">
  <div className="flex items-center bg-slate-100 rounded-xl p-1.5 gap-1">
    {[
      { key: "monthly", label: "Monthly" },
      { key: "6months", label: "6 Months", save: "Save 10% + 1 Month Free" },
      { key: "yearly",  label: "1 Year",   save: "Save 25% + 3 Months Free" },
    ].map(b => (
      <button key={b.key} onClick={() => setBilling(b.key)}
        className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold transition-all ${
          billing === b.key
            ? "bg-white shadow-sm text-text-primary"
            : "text-text-muted hover:text-text-primary"
        }`}>
        {b.label}
        {b.save && (
          <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full whitespace-nowrap">
            {b.save}
          </span>
        )}
      </button>
    ))}
  </div>
</div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
            {pricingPlans.map((plan, i) => (
              <div key={i} className={`relative rounded-2xl border p-8 flex flex-col transition-all duration-300 ${
                plan.highlight
                  ? "bg-gradient-to-b from-brand-500 to-brand-700 border-brand-500 shadow-[0_24px_60px_rgba(99,102,241,0.3)] scale-105 text-white"
                  : "bg-white border-border-subtle hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(30,41,59,0.09)]"
              }`}>
                {plan.badge && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-violet-500 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-md whitespace-nowrap">
                    ⭐ {plan.badge}
                  </div>
                )}

<div className={`text-sm font-bold uppercase tracking-widest mb-3 ${plan.highlight ? "text-brand-200" : "text-text-muted"}`}>
{plan.name}
</div>

{/* Crossed original price */}
{getPrice(plan.price) && (
  <div className="relative inline-block mb-1 w-fit">
    <span className={`text-base font-semibold ${plan.highlight ? "text-white/50" : "text-text-muted"}`}>
      {plan.price}<span className="text-xs">/mo</span>
    </span>
    <div className="absolute inset-0 flex items-center">
      <div className="w-full h-[1.5px] bg-red-400 rotate-[-8deg]" />
    </div>
  </div>
)}

{/* Discounted price */}
<div className="flex items-end gap-1 mb-1">
  <span className={`text-4xl font-extrabold ${plan.highlight ? "text-white" : "text-text-primary"}`}>
    {getPrice(plan.price) ?? plan.price}
  </span>
  <span className={`text-sm font-semibold mb-1.5 ${plan.highlight ? "text-brand-200" : "text-text-muted"}`}>
    {plan.price === "Custom" ? "" : billing === "yearly" ? "/mo · yearly" : billing === "6months" ? "/mo · 6mo" : plan.period}
  </span>
</div>

{/* Save badge */}
{getPrice(plan.price) && (
  <div className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full mb-3 ${
    plan.highlight ? "bg-white/20 text-white" : "bg-emerald-50 text-emerald-600"
  }`}>
    🎉 {getSaveLabel()}
  </div>
)}

<p className={`text-xs leading-relaxed mb-6 ${plan.highlight ? "text-brand-200" : "text-text-muted"}`}>
  {plan.desc}
</p>

                <div className={`h-px w-full mb-6 ${plan.highlight ? "bg-white/20" : "bg-border-subtle"}`} />

                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feat, j) => (
                    <li key={j} className={`flex items-start gap-2.5 text-sm font-medium ${plan.highlight ? "text-white" : "text-text-secondary"}`}>
                      <CheckCircle2 size={15} className={`shrink-0 mt-0.5 ${plan.highlight ? "text-brand-200" : "text-emerald-500"}`} />
                      {feat}
                    </li>
                  ))}
                </ul>

                <Link to={plan.name === "Enterprise" ? "/contact" : "/recruiter/register"}
                  className={`w-full text-center py-3.5 rounded-xl text-sm font-bold transition-all inline-block ${
                    plan.highlight
                      ? "bg-white text-brand-600 hover:bg-brand-50 shadow-sm"
                      : plan.name === "Starter"
                        ? "border-2 border-brand-400 text-brand-500 hover:bg-brand-50"
                        : plan.name === "Enterprise"
                          ? "bg-slate-900 text-white hover:bg-slate-800"
                          : "bg-brand-500 text-white hover:bg-brand-600 shadow-sm"
                  }`}>
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>

          <p className="text-center text-sm text-text-muted mt-10">
            All plans include a <strong className="text-text-secondary">14-day free trial</strong>. No credit card required for Starter.
          </p>
        </div>
      </section>

      {/* ══════════════════ TESTIMONIALS ══════════════════ */}
      <section id="testimonials" className="pt-16 pb-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-100 text-amber-600 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider mb-5">
              <Star size={12} /> Social Proof
            </div>
            <h2 className="text-4xl font-bold text-text-primary mb-4">Built for Growing Companies Across India</h2>
            <p className="text-lg text-text-muted max-w-xl mx-auto">
              HR leaders and founders trust HireNexon to hire their best teams.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white border border-border-subtle rounded-2xl p-8 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(30,41,59,0.09)] transition-all duration-300 flex flex-col">
                {/* Stars */}
                <div className="flex gap-1 mb-5">
                  {Array(t.rating).fill(0).map((_, j) => (
                    <Star key={j} size={14} className="text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-text-secondary leading-relaxed flex-1 mb-6">"{t.text}"</p>
                <div className="flex items-center gap-3 pt-5 border-t border-border-subtle">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-white text-xs font-bold shrink-0`}>
                    {t.initials}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-text-primary">{t.name}</div>
                    <div className="text-xs text-text-muted">{t.role}, {t.company}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Logo row */}
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-text-disabled mb-6">Companies already hiring on HireNexon</p>
            <div className="flex flex-wrap justify-center gap-4">
              {trustedLogos.map(logo => (
                <div key={logo} className="bg-white border border-border-subtle rounded-xl px-6 py-3 text-sm font-bold text-text-muted hover:border-brand-200 hover:text-brand-500 transition-all cursor-default">
                  {logo}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════ FINAL CTA ══════════════════ */}
      <section className="pt-16 pb-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-600 via-brand-500 to-violet-600" />
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.06) 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }} />
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)" }} />

        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/25 text-white rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider mb-8">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            Start Hiring Today
          </div>
          <h2 className="text-5xl font-extrabold text-white mb-6 leading-tight tracking-tight">
            Ready to Transform<br />Your Hiring Process?
          </h2>
          <p className="text-xl text-brand-200 mb-10 leading-relaxed">
            Create your company workspace in minutes and start reaching India's best talent today.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/recruiter/register"
              className="inline-flex items-center gap-2 bg-white text-brand-600 hover:bg-brand-50 font-bold px-8 py-4 rounded-xl transition-all hover:-translate-y-0.5 shadow-lg hover:shadow-xl text-[15px]">
              Create Company Workspace <ArrowRight size={16} />
            </Link>
            <a href="#pricing"
              className="inline-flex items-center gap-2 bg-white/15 hover:bg-white/25 backdrop-blur-sm border-2 border-white/30 text-white font-bold px-8 py-4 rounded-xl transition-all text-[15px]">
              View Pricing <ChevronRight size={16} />
            </a>
          </div>
          <p className="text-brand-200 text-sm mt-6 font-medium">
            ✓ No credit card required for Starter Plan &nbsp;·&nbsp; ✓ Setup in under 5 minutes
          </p>
        </div>
      </section>
    </div>
  );
}
