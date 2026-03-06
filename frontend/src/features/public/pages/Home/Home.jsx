// frontend/src/features/public/pages/Home/Home.jsx
import useTitle from "@/shared/hooks/useTitle";

import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight, ChevronRight, CheckCircle2, Star, Zap, Brain,
  Users, Building2, GraduationCap, Target, FileText, Bell,
  BarChart3, Calendar, Sparkles, MessageSquare, Shield,
  TrendingUp, Award, Check, X, BookOpen, ClipboardList,
  LayoutDashboard, UserCheck, Trophy,
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
        let cur = 0;
        const inc = end / 60;
        const t = setInterval(() => {
          cur += inc;
          if (cur >= end) { setVal(end); clearInterval(t); }
          else setVal(Math.floor(cur));
        }, 18);
        obs.disconnect();
      }
    }, { threshold: 0.4 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [end]);
  return <span ref={ref}>{prefix}{val.toLocaleString()}{suffix}</span>;
};

/* ── Data ── */
const ecosystemCards = [
  {
    icon: Users, color: "text-brand-500", bg: "bg-brand-50", border: "border-brand-100",
    audience: "For Candidates", headline: "Find the Career You Deserve",
    desc: "Apply smarter, grow faster, and plan your long-term career with AI-powered tools.",
    features: ["One-Click Apply", "Career Planner", "AI Resume Feedback", "Mock Interviews", "Job Alerts"],
    cta: "Explore Candidate Workspace", link: "/candidates",
  },
  {
    icon: Building2, color: "text-violet-500", bg: "bg-violet-50", border: "border-violet-100",
    audience: "For Employers", headline: "Hire Smarter. Faster. Better.",
    desc: "Post jobs, manage applicants, and leverage AI to find the perfect candidate every time.",
    features: ["Post Jobs", "Manage Applicants", "AI Resume Filtering", "Interview Scheduling", "Hiring Analytics"],
    cta: "Explore Employer Workspace", link: "/employers",
  },
  {
    icon: GraduationCap, color: "text-emerald-500", bg: "bg-emerald-50", border: "border-emerald-100",
    audience: "For Universities", headline: "Digitise Campus Placements",
    desc: "Connect students with verified employers and manage your entire placement cell in one workspace.",
    features: ["Placement Dashboard", "Student Verification", "Campus Drives", "Placement Analytics", "Resume Builder"],
    cta: "Explore University Workspace", link: "/universities",
  },
];

// features 
const platformFeatures = [
  { icon: Target,        color: "text-violet-500",  bg: "bg-violet-50",     title: "Nexon Career Planner",     desc: "Set 1-year and 5-year goals. Get AI-generated roadmaps, daily tasks, and streak tracking with Nexon Coach." },
  { icon: Brain,         color: "text-brand-500",   bg: "bg-brand-50",      title: "Nexon Coach (AI Mentor)",  desc: "Your personal AI career mentor available 24/7 — guidance, preparation, feedback, and motivation in one place." },
  { icon: FileText,      color: "text-sky-500",     bg: "bg-sky-50",        title: "NexonCV Builder",          desc: "Build ATS-optimized, recruiter-ready resumes with AI-powered suggestions and real-time scoring." },
  { icon: Trophy,        color: "text-emerald-500", bg: "bg-emerald-50",    title: "NexArena — Compete & Win", desc: "Enter real competitions — Hackathons, Techathons, Business Challenges, Design, Marketing, Finance & Research." },
  { icon: MessageSquare, color: "text-rose-500",    bg: "bg-rose-50",       title: "AI Mock Interviews",       desc: "Practice with AI-tailored mock interviews for your target company and role. Get instant, honest feedback." },
  { icon: Zap,           color: "text-amber-500",   bg: "bg-amber-50",      title: "One-Click Apply",          desc: "Apply to multiple verified jobs instantly with your saved profile — no re-filling forms ever again." },
  { icon: ClipboardList, color: "text-indigo-500",  bg: "bg-indigo-50",     title: "Application Tracking",     desc: "Know every application's real-time status — from applied to offer, all in one dashboard." },
  { icon: Users,         color: "text-teal-500",    bg: "bg-teal-50",       title: "Hiring & Networking",      desc: "Connect with recruiters, peers, and mentors. Build your professional network while building your career." },
  { icon: GraduationCap, color: "text-brand-500",   bg: "bg-brand-50",      title: "Campus Hiring Access",     desc: "Access university-exclusive placement drives. Only verified students of partner universities can apply." },
];

const testimonials = [
  {
    name: "Rohan Verma", role: "SDE at Google", type: "Candidate",
    initials: "RV", color: "from-brand-500 to-sky-500", typeColor: "bg-brand-50 text-brand-600",
    text: "HireNexon helped me track applications and prepare for interviews. Got placed in 3 weeks.",
  },
  {
    name: "Priya Sharma", role: "HR Head, Razorpay", type: "Employer",
    initials: "PS", color: "from-violet-500 to-brand-500", typeColor: "bg-violet-50 text-violet-600",
    text: "We streamlined hiring using HireNexon's applicant management tools. 85% faster time-to-hire.",
  },
  {
    name: "Dr. Ramesh Iyer", role: "Head of Placements, Symbiosis", type: "University",
    initials: "RI", color: "from-emerald-500 to-teal-500", typeColor: "bg-emerald-50 text-emerald-600",
    text: "HireNexon simplified campus placement operations. Managing 2,400 students is now seamless.",
  },
];

// HireNexon differentiators
const differentiators = [
  {
    icon: Target,        color: "text-violet-500",  bg: "bg-violet-50",  border: "border-violet-100",
    title: "AI-Powered Career Planner",
    desc: "Not just jobs — full career planning. Set goals, follow roadmaps, track daily progress, and get coached by Nexon AI.",
  },
  {
    icon: GraduationCap, color: "text-emerald-500", bg: "bg-emerald-50", border: "border-emerald-100",
    title: "University-Integrated Campus Hiring",
    desc: "A dedicated placement ecosystem for universities — verified students, campus drives, and placement analytics in one place.",
  },
  {
    icon: Trophy,        color: "text-amber-500",   bg: "bg-amber-50",   border: "border-amber-100",
    title: "NexArena — Skill Competitions",
    desc: "Hackathons, Techathons, Business Challenges, Design, Marketing & more. Prove your skills beyond your resume.",
  },
  {
    icon: Brain,         color: "text-brand-500",   bg: "bg-brand-50",   border: "border-brand-100",
    title: "Nexon Coach — Your AI Mentor",
    desc: "A 24/7 AI mentor that knows your goals, tracks your progress, and guides every step of your career journey.",
  },
  {
    icon: FileText,      color: "text-sky-500",     bg: "bg-sky-50",     border: "border-sky-100",
    title: "NexonCV — Smart Resume Builder",
    desc: "ATS-optimized resumes with AI scoring and real-time feedback. Built for the Indian job market.",
  },
  {
    icon: Users,         color: "text-teal-500",    bg: "bg-teal-50",    border: "border-teal-100",
    title: "Three-Way Hiring Ecosystem",
    desc: "Candidates, employers, and universities — all connected on one unified platform. No other platform does this.",
  },
];

/* ── Main Component ── */
export default function Home() {
  useTitle();
  return (
    <div className="min-h-screen bg-surface-card font-jakarta text-text-primary overflow-x-hidden">

      {/* ══════════════════ HERO ══════════════════ */}
      <section className="relative pt-16 pb-24 overflow-hidden bg-surface-card">
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, #e2e8f0 1px, transparent 0)",
          backgroundSize: "32px 32px", opacity: 0.5,
        }} />
        <div className="absolute -top-60 -left-60 w-[700px] h-[700px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 65%)" }} />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(16,185,129,0.05) 0%, transparent 65%)" }} />

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* Left: Text */}
            <div>
              <div className="inline-flex items-center gap-2 bg-brand-50 border border-brand-100 text-brand-600 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider mb-8">
                <span className="w-2 h-2 bg-brand-500 rounded-full animate-pulse" />
                Trusted by growing companies and leading universities
              </div>
              <h1 className="text-[54px] leading-[1.08] font-extrabold text-text-primary mb-5 tracking-tight">
                The Future of Hiring
                <span className="bg-gradient-to-r from-brand-500 via-violet-500 to-sky-500 bg-clip-text text-transparent"> Starts Here.</span>
              </h1>
              <p className="text-lg font-semibold text-text-secondary mb-3">Learning. Hiring. Networking - All in one place.</p>
              <p className="text-base text-text-muted leading-relaxed mb-10 max-w-lg">
                HireNexon connects candidates, companies, and universities into one intelligent hiring network — from career planning and campus placements to enterprise recruitment.
              </p>
              <div className="flex flex-wrap gap-4 mb-10">
                <Link to="/signup"
                  className="inline-flex items-center gap-2 bg-brand-500 hover:bg-brand-600 text-white font-bold px-7 py-4 rounded-xl transition-all hover:-translate-y-0.5 shadow-md text-[15px]">
                  Create Free Account <ArrowRight size={16} />
                </Link>
                <Link to="/candidates"
                  className="inline-flex items-center gap-2 bg-white border-2 border-border-base text-text-secondary hover:border-brand-400 hover:text-brand-500 font-bold px-7 py-4 rounded-xl transition-all text-[15px]">
                  Explore Opportunities <ChevronRight size={16} />
                </Link>
              </div>
              <div className="flex flex-wrap gap-3">
                {[
                  { label: "For Candidates",  sub: "Find and grow your career",  color: "border-brand-200 bg-brand-50 text-brand-600",      link: "/candidates" },
                  { label: "For Employers",   sub: "Post jobs and hire smarter", color: "border-violet-200 bg-violet-50 text-violet-600",    link: "/employers" },
                  { label: "For Universities",sub: "Manage placements",          color: "border-emerald-200 bg-emerald-50 text-emerald-600", link: "/universities" },
                ].map((p, i) => (
                  <Link key={i} to={p.link}
                    className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl border-2 ${p.color} hover:-translate-y-0.5 transition-all`}>
                    <div>
                      <div className="text-xs font-bold leading-tight">{p.label}</div>
                      <div className="text-[10px] opacity-60 font-medium">{p.sub}</div>
                    </div>
                    <ArrowRight size={12} />
                  </Link>
                ))}
              </div>
            </div>

            {/* Right: Ecosystem Orbit Visual */}
            <div className="relative flex items-center justify-center" style={{ height: 500 }}>
              <div className="absolute w-[440px] h-[440px] rounded-full border border-dashed border-slate-200 animate-[spin_35s_linear_infinite]" />
              <div className="absolute w-[320px] h-[320px] rounded-full border border-dashed border-brand-100 animate-[spin_22s_linear_infinite_reverse]" />

              {/* Center hub */}
              <div className="relative z-10 w-36 h-36 bg-white rounded-full shadow-[0_8px_48px_rgba(99,102,241,0.18)] border-2 border-brand-100 flex flex-col items-center justify-center">
                <div className="text-lg font-extrabold text-brand-600 leading-tight text-center">Hire<span className="text-text-primary">Nexon</span></div>
                <div className="text-[12px] text-text-muted font-semibold text-center mt-1 leading-tight px-3">Connecting the<br/>Career Ecosystem</div>
                <div className="absolute inset-0 rounded-full border-2 border-brand-300 animate-ping opacity-20" />
              </div>

              {/* Job Seekers left */}
              <div className="group absolute left-0 top-1/2 -translate-y-1/2 w-44 bg-white rounded-2xl shadow-[0_8px_32px_rgba(30,41,59,0.12)] border border-border-subtle p-4 hover:border-brand-300 hover:shadow-[0_12px_40px_rgba(99,102,241,0.18)] hover:scale-105 transition-all duration-300 cursor-pointer"
                style={{ animation: "orbitFloat 4s ease-in-out infinite" }}>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 bg-brand-50 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform"><Users size={14} className="text-brand-500" /></div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-brand-500 group-hover:text-brand-600">Job Seekers</div>
                </div>
                <div className="space-y-1.5">
                  {["Explore Jobs", "Track Applications", "Career Planner"].map((t, i) => (
                    <div key={i} className="flex items-center gap-2 text-[12px] text-text-secondary font-medium">
                      <div className="w-1.5 h-1.5 bg-brand-400 rounded-full" />{t}
                    </div>
                  ))}
                </div>
                <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-brand-400 rounded-full border-2 border-white shadow-sm" />
              </div>

              {/* Companies top */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-52 bg-white rounded-2xl shadow-[0_8px_32px_rgba(30,41,59,0.12)] border border-border-subtle p-4 hover:border-violet-300 hover:shadow-[0_12px_40px_rgba(139,92,246,0.18)] hover:scale-105 transition-all duration-300 cursor-pointer"
                style={{ animation: "orbitFloat2 5s ease-in-out infinite" }}>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 bg-violet-50 rounded-lg flex items-center justify-center"><Building2 size={14} className="text-violet-500" /></div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-violet-500">Companies</div>
                </div>
                <div className="space-y-1.5">
                  {["Post Jobs", "Manage Applicants", "Campus Hiring"].map((t, i) => (
                    <div key={i} className="flex items-center gap-2 text-[12px] text-text-secondary font-medium">
                      <div className="w-1.5 h-1.5 bg-brand-400 rounded-full" />{t}
                    </div>
                  ))}
                </div>
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-violet-400 rounded-full border-2 border-white shadow-sm" />
              </div>

              {/* Universities right */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-44 bg-white rounded-2xl shadow-[0_8px_32px_rgba(30,41,59,0.12)] border border-border-subtle p-4 hover:border-emerald-300 hover:shadow-[0_12px_40px_rgba(16,185,129,0.18)] hover:scale-105 transition-all duration-300 cursor-pointer"
                style={{ animation: "orbitFloat3 4.5s ease-in-out infinite" }}>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 bg-emerald-50 rounded-lg flex items-center justify-center"><GraduationCap size={14} className="text-emerald-500" /></div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-500">Universities</div>
                </div>
                <div className="space-y-1.5">
                  {["Educational Hubs", "Campus Drives", "Career Services"].map((t, i) => (
                    <div key={i} className="flex items-center gap-2 text-[12px] text-text-secondary font-medium">
                      <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />{t}
                    </div>
                  ))}
                </div>
                <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-emerald-400 rounded-full border-2 border-white shadow-sm" />
              </div>

              {/* Bottom tagline */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-brand-500 to-violet-500 rounded-xl px-6 py-2.5 shadow-lg whitespace-nowrap">
                <div className="text-white text-xs font-bold">One Platform. One Ecosystem. One Future.</div>
              </div>

              {/* Floating stat */}
              <div className="absolute bottom-20 right-2 bg-white rounded-xl shadow-md border border-border-subtle px-3 py-2 flex items-center gap-2"
                style={{ animation: "orbitFloat 3.5s ease-in-out infinite" }}>
                <div className="w-6 h-6 bg-emerald-50 rounded-lg flex items-center justify-center">
                  <CheckCircle2 size={12} className="text-emerald-500" />
                </div>
                <div>
                  <div className="text-xs font-extrabold text-text-primary leading-none">10,000+</div>
                  <div className="text-[9px] text-text-muted">Placements Done</div>
                </div>
              </div>

              <style>{`
                @keyframes orbitFloat  { 0%,100%{transform:translateY(-50%)} 50%{transform:translateY(calc(-50% - 9px))} }
                @keyframes orbitFloat2 { 0%,100%{transform:translateX(-50%) translateY(0)} 50%{transform:translateX(-50%) translateY(-11px)} }
                @keyframes orbitFloat3 { 0%,100%{transform:translateY(-50%)} 50%{transform:translateY(calc(-50% - 7px))} }
              `}</style>
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════ STATS BAR ══════════════════ */}
      <section className="bg-slate-50 border-y border-border-subtle py-12">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { end: 10000, suffix: "+", label: "Candidates",           color: "text-brand-500" },
              { end: 500,   suffix: "+", label: "Active Jobs",          color: "text-violet-500" },
              { end: 100,   suffix: "+", label: "Hiring Companies",     color: "text-sky-500" },
              { end: 50,    suffix: "+", label: "Partner Universities", color: "text-emerald-500" },
            ].map(s => (
              <div key={s.label}>
                <div className={`text-4xl font-extrabold ${s.color} mb-1`}>
                  <Counter end={s.end} suffix={s.suffix} />
                </div>
                <div className="text-sm font-semibold text-text-muted">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════ ECOSYSTEM SECTION ══════════════════ */}
      <section className="pt-16 pb-24 bg-surface-card">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-slate-100 border border-border-subtle text-text-muted rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider mb-5">
              <Zap size={12} /> The Full Ecosystem
            </div>
            <h2 className="text-4xl font-bold text-text-primary mb-4">Built for the Entire Hiring Ecosystem</h2>
            <p className="text-lg text-text-muted max-w-xl mx-auto">Three powerful workspaces. One unified network.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {ecosystemCards.map((card, i) => {
              const Icon = card.icon;
              return (
                <div key={i} className={`group bg-white border-2 ${card.border} rounded-2xl p-8 hover:-translate-y-2 hover:shadow-[0_24px_60px_rgba(30,41,59,0.12)] transition-all duration-300 flex flex-col`}>
                  <div className="flex items-center gap-3 mb-6">
                    <div className={`w-12 h-12 ${card.bg} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <Icon size={22} className={card.color} />
                    </div>
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-widest text-text-disabled">{card.audience}</div>
                      <div className="text-base font-bold text-text-primary">{card.headline}</div>
                    </div>
                  </div>
                  <p className="text-sm text-text-muted leading-relaxed mb-6">{card.desc}</p>
                  <ul className="space-y-2.5 mb-8 flex-1">
                    {card.features.map((f, j) => (
                      <li key={j} className="flex items-center gap-2.5 text-sm text-text-secondary">
                        <CheckCircle2 size={14} className={card.color} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link to={card.link}
                    className={`w-full text-center py-3 rounded-xl text-sm font-bold transition-all inline-flex items-center justify-center gap-2 ${card.bg} ${card.color} hover:opacity-80 border ${card.border}`}>
                    {card.cta} <ArrowRight size={14} />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════ CAMPUS HIRING NETWORK ══════════════════ */}
      <section className="pt-16 pb-24 bg-gradient-to-br from-emerald-600 to-teal-600 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }} />
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/15 border border-white/25 text-white rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider mb-6">
                <GraduationCap size={12} /> Campus Network
              </div>
              <h2 className="text-4xl font-bold text-white mb-5 leading-tight">
                India's Connected Campus<br />Hiring Network
              </h2>
              <p className="text-lg text-emerald-100 mb-8 leading-relaxed">
                HireNexon connects universities, students, and companies to streamline campus placements and hiring — creating opportunities that are earned, not stumbled upon.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-10">
                {["50+ Universities Connected", "Verified Campus Drives", "University-Verified Candidates", "Direct Employer Collaboration"].map((item, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-sm font-semibold text-white">
                    <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center shrink-0">
                      <Check size={11} className="text-white" />
                    </div>
                    {item}
                  </div>
                ))}
              </div>
              <Link to="/universities"
                className="inline-flex items-center gap-2 bg-white text-emerald-700 hover:bg-emerald-50 font-bold px-7 py-4 rounded-xl transition-all hover:-translate-y-0.5 shadow-lg text-[15px]">
                Explore Campus Opportunities <ArrowRight size={16} />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { val: 50,    suffix: "+", label: "Partner Universities", icon: GraduationCap, color: "text-emerald-400" },
                { val: 200,   suffix: "+", label: "Campus Drives/Month",  icon: Calendar,      color: "text-sky-300" },
                { val: 10000, suffix: "+", label: "Students Placed",      icon: Users,         color: "text-white" },
                { val: 92,    suffix: "%", label: "Avg. Placement Rate",  icon: TrendingUp,    color: "text-amber-300" },
              ].map((s, i) => {
                const Icon = s.icon;
                return (
                  <div key={i} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-center hover:bg-white/15 transition-colors">
                    <Icon size={22} className={`${s.color} mx-auto mb-3`} />
                    <div className={`text-3xl font-extrabold ${s.color} mb-1`}>
                      <Counter end={s.val} suffix={s.suffix} />
                    </div>
                    <div className="text-xs font-semibold text-emerald-100">{s.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════ CAREER GROWTH ENGINE ══════════════════ */}
      <section className="pt-16 pb-24 bg-surface-card">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-4">
              <div className="bg-white border border-border-subtle rounded-2xl p-6 shadow-card">
                <div className="flex items-center justify-between mb-5">
                  <div className="text-sm font-bold text-text-primary">Career Goal Tracker</div>
                  <div className="text-xs font-bold text-brand-500 bg-brand-50 px-2.5 py-1 rounded-full">Powered by Nexon Coach</div>
                </div>
                {[
                  { goal: "FAANG SDE",     progress: 68, color: "bg-brand-500",  timeframe: "1 Year" },
                  { goal: "DSA Mastery",   progress: 45, color: "bg-sky-500",    timeframe: "3 Months" },
                  { goal: "System Design", progress: 30, color: "bg-violet-500", timeframe: "6 Months" },
                ].map((g, i) => (
                  <div key={i} className="mb-4 last:mb-0">
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="text-xs font-bold text-text-primary">{g.goal}</div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-text-muted">{g.timeframe}</span>
                        <span className="text-xs font-extrabold text-text-primary">{g.progress}%</span>
                      </div>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className={`h-full ${g.color} rounded-full`} style={{ width: `${g.progress}%` }} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white border border-border-subtle rounded-2xl p-5 shadow-card">
                  <div className="text-xs font-bold text-text-muted mb-3">Today's Tasks</div>
                  {["2 DSA problems", "Resume review", "Mock interview"].map((t, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-text-secondary mb-2">
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${i === 0 ? "border-brand-500 bg-brand-500" : "border-slate-300"}`}>
                        {i === 0 && <Check size={9} className="text-white" />}
                      </div>
                      {t}
                    </div>
                  ))}
                </div>
                <div className="bg-gradient-to-br from-brand-500 to-violet-500 rounded-2xl p-5">
                  <div className="text-xs font-bold text-white/70 mb-2">Nexon Coach Says</div>
                  <div className="text-xs font-semibold text-white leading-relaxed">
                    "You're 2 days ahead of schedule. Keep it up — one more mock interview this week! 🚀"
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="inline-flex items-center gap-2 bg-violet-50 border border-violet-100 text-violet-600 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider mb-6">
                <Brain size={12} /> Career Growth Engine
              </div>
              <h2 className="text-4xl font-bold text-text-primary mb-5 leading-tight">
                Plan Your Career.<br />Not Just Your<br />Applications.
              </h2>
              <p className="text-lg text-text-muted mb-8 leading-relaxed">
                Set career goals, follow AI-generated roadmaps, and track your progress with the help of Nexon Coach — your personal AI career mentor.
              </p>
              <ul className="space-y-4 mb-10">
                {[
                  { icon: Target,    color: "text-brand-500",   bg: "bg-brand-50",    label: "Goal planning (1 month / 1 year / 5 years)" },
                  { icon: Calendar,  color: "text-sky-500",     bg: "bg-sky-50",      label: "Daily task tracking and consistency streaks" },
                  { icon: BookOpen,  color: "text-violet-500",  bg: "bg-violet-50",   label: "Skill roadmap guidance and resource curation" },
                  { icon: BarChart3, color: "text-emerald-500", bg: "bg-emerald-50",  label: "Progress analytics and performance insights" },
                  { icon: Brain,     color: "text-amber-500",   bg: "bg-amber-50",    label: "AI career mentor available 24/7" },
                ].map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <li key={i} className="flex items-center gap-3">
                      <div className={`w-8 h-8 ${item.bg} rounded-lg flex items-center justify-center shrink-0`}>
                        <Icon size={15} className={item.color} />
                      </div>
                      <span className="text-sm font-semibold text-text-secondary">{item.label}</span>
                    </li>
                  );
                })}
              </ul>
              <Link to="/candidates"
                className="inline-flex items-center gap-2 bg-brand-500 hover:bg-brand-600 text-white font-bold px-7 py-4 rounded-xl transition-all hover:-translate-y-0.5 shadow-md text-[15px]">
                Start Your Career Plan <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════ PLATFORM FEATURES — 3 cols ══════════════════ */}
      <section className="pt-16 pb-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-brand-50 border border-brand-100 text-brand-600 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider mb-5">
              <Sparkles size={12} /> One Unified Platform
            </div>
            <h2 className="text-4xl font-bold text-text-primary mb-4">
              Learning. Hiring. Networking.<br />
              <span className="bg-gradient-to-r from-brand-500 to-violet-500 bg-clip-text text-transparent">All in One Place.</span>
            </h2>
            <p className="text-lg text-text-muted max-w-2xl mx-auto">
              HireNexon isn't just a job board — it's a complete career operating system. From your first goal to your first offer letter, everything lives here.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {platformFeatures.map((f, i) => {
              const Icon = f.icon;
              return (
                <div key={i} className="group bg-white border border-border-subtle rounded-2xl p-6 hover:-translate-y-1.5 hover:shadow-[0_16px_40px_rgba(30,41,59,0.1)] hover:border-transparent transition-all duration-300 relative overflow-hidden">
                  
                  <div className={`w-12 h-12 ${f.bg} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon size={22} className={f.color} />
                  </div>
                  <div className="text-sm font-bold text-text-primary mb-2 pr-16">{f.title}</div>
                  <div className="text-xs text-text-muted leading-relaxed">{f.desc}</div>
                </div>
              );
            })}
          </div>

          <div className="mt-12 bg-gradient-to-r from-brand-500 to-violet-500 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <div className="text-white font-extrabold text-xl mb-1">Everything above is 100% free for candidates.</div>
              <div className="text-brand-100 text-sm">No credit card. No hidden fees. Just your career, supercharged.</div>
            </div>
            <Link to="/signup"
              className="inline-flex items-center gap-2 bg-white text-brand-600 hover:bg-brand-50 font-bold px-7 py-3.5 rounded-xl transition-all hover:-translate-y-0.5 shadow-md whitespace-nowrap text-sm">
              Create Free Account <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════ HOW IT WORKS ══════════════════ */}
      <section className="pt-16 pb-24 bg-surface-card">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-brand-50 border border-brand-100 text-brand-600 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider mb-5">
              <Zap size={12} /> How It Works
            </div>
            <h2 className="text-4xl font-bold text-text-primary mb-4">Simple. Fast. Effective.</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-10 left-[33%] right-[33%] h-px bg-gradient-to-r from-brand-200 via-sky-200 to-emerald-200" />
            {[
              { step: "01", icon: UserCheck, color: "text-brand-500",   bg: "bg-brand-50",   ring: "ring-brand-200",   title: "Create Your Profile",        desc: "Set up in 5 minutes. Add skills, experience, and career goals." },
              { step: "02", icon: Zap,       color: "text-sky-500",     bg: "bg-sky-50",     ring: "ring-sky-200",     title: "Connect with Opportunities", desc: "Browse jobs, campus drives, or candidates tailored to you." },
              { step: "03", icon: Award,     color: "text-emerald-500", bg: "bg-emerald-50", ring: "ring-emerald-200", title: "Track Progress & Get Hired", desc: "Monitor everything, improve with AI, and land your goal." },
            ].map((s, i) => {
              const Icon = s.icon;
              return (
                <div key={i} className="text-center relative">
                  <div className={`w-20 h-20 ${s.bg} ring-4 ${s.ring} rounded-full flex items-center justify-center mx-auto mb-5 relative z-10`}>
                    <Icon size={32} className={s.color} />
                  </div>
                  <div className={`text-xs font-extrabold uppercase tracking-widest ${s.color} mb-2`}>Step {s.step}</div>
                  <h3 className="text-lg font-bold text-text-primary mb-2">{s.title}</h3>
                  <p className="text-sm text-text-muted leading-relaxed max-w-xs mx-auto">{s.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════ TESTIMONIALS ══════════════════ */}
      <section className="pt-16 pb-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-100 text-amber-600 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider mb-5">
              <Star size={12} /> Testimonials
            </div>
            <h2 className="text-4xl font-bold text-text-primary mb-4">Loved Across the Ecosystem</h2>
            <p className="text-lg text-text-muted max-w-xl mx-auto">From fresh graduates to Fortune 500 HRs — here's what they say.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white border border-border-subtle rounded-2xl p-8 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(30,41,59,0.09)] transition-all duration-300 flex flex-col">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex gap-1">
                    {[1,2,3,4,5].map(j => <Star key={j} size={13} className="text-amber-400 fill-amber-400" />)}
                  </div>
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${t.typeColor}`}>{t.type}</span>
                </div>
                <p className="text-sm text-text-secondary leading-relaxed flex-1 mb-6">"{t.text}"</p>
                <div className="flex items-center gap-3 pt-5 border-t border-border-subtle">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-white text-xs font-bold shrink-0`}>
                    {t.initials}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-text-primary">{t.name}</div>
                    <div className="text-xs text-text-muted">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════ WHY HIRENEXON — differentiators, no competitor names ══════════════════ */}
      <section className="pt-16 pb-24 bg-surface-card">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-brand-50 border border-brand-100 text-brand-600 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider mb-5">
              <Shield size={12} /> Why HireNexon
            </div>
            <h2 className="text-4xl font-bold text-text-primary mb-4">What Makes HireNexon Different</h2>
            <p className="text-lg text-text-muted max-w-2xl mx-auto">
              We didn't build another job board. We built the infrastructure for India's next generation of hiring — where learning, competing, and getting hired all happen in one place.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {differentiators.map((d, i) => {
              const Icon = d.icon;
              return (
                <div key={i} className={`group bg-white border-2 ${d.border} rounded-2xl p-7 hover:-translate-y-1.5 hover:shadow-[0_20px_50px_rgba(30,41,59,0.1)] transition-all duration-300 relative overflow-hidden`}>
                  {/* Only on HireNexon badge */}
                  <div className="absolute top-0 right-0 bg-gradient-to-r from-brand-500 to-violet-500 text-white text-[9px] font-extrabold px-3 py-1 rounded-bl-xl tracking-wider uppercase">
                    Only on HireNexon
                  </div>
                  <div className={`w-12 h-12 ${d.bg} rounded-xl flex items-center justify-center mb-5 mt-3 group-hover:scale-110 transition-transform`}>
                    <Icon size={22} className={d.color} />
                  </div>
                  <h3 className="text-base font-bold text-text-primary mb-3">{d.title}</h3>
                  <p className="text-sm text-text-muted leading-relaxed">{d.desc}</p>
                </div>
              );
            })}
          </div>

          {/* Bottom conviction line */}
          <div className="mt-14 text-center">
            <div className="inline-flex items-center gap-3 bg-slate-50 border border-border-subtle rounded-2xl px-8 py-5">
              <CheckCircle2 size={20} className="text-emerald-500 shrink-0" />
              <p className="text-sm font-semibold text-text-secondary">
                HireNexon is the <span className="text-text-primary font-bold">only platform</span> where candidates can plan careers, compete in challenges, build AI-powered resumes, and get hired — all for free.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════ FINAL CTA ══════════════════ */}
      <section className="pt-16 pb-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-brand-900 to-slate-900" />
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.04) 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }} />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none"
          style={{ background: "radial-gradient(ellipse, rgba(99,102,241,0.15) 0%, transparent 70%)" }} />

        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider mb-8">
            <span className="w-2 h-2 bg-brand-400 rounded-full animate-pulse" />
            The Next Generation Hiring Network
          </div>
          <h2 className="text-5xl font-extrabold text-white mb-6 leading-tight tracking-tight">
            Join the Next Generation<br />Hiring Network!
          </h2>
          <p className="text-xl text-slate-300 mb-10 leading-relaxed">
            Build your career, hire top talent, or manage campus placements — all in one platform.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Link to="/signup"
              className="inline-flex items-center gap-2 bg-brand-500 hover:bg-brand-600 text-white font-bold px-8 py-4 rounded-xl transition-all hover:-translate-y-0.5 shadow-lg text-[15px]">
              Create Free Account <ArrowRight size={16} />
            </Link>
            <Link to="/jobs"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border-2 border-white/20 text-white font-bold px-8 py-4 rounded-xl transition-all text-[15px]">
              Explore Opportunities <ChevronRight size={16} />
            </Link>
          </div>
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            {[
              { label: "I'm a Candidate →",  link: "/candidates",  color: "text-brand-300 hover:text-brand-200" },
              { label: "I'm an Employer →",   link: "/employers",   color: "text-violet-300 hover:text-violet-200" },
              { label: "I'm a University →",  link: "/universities",color: "text-emerald-300 hover:text-emerald-200" },
            ].map((l, i) => (
              <Link key={i} to={l.link} className={`text-sm font-bold transition-colors ${l.color}`}>{l.label}</Link>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
