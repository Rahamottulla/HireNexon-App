import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Search, Sparkles, Target, Calendar, Brain, CheckCircle2,
  Star, ArrowRight, ChevronRight, TrendingUp, FileText,
  Bell, Zap, Award, BookOpen, Building2, BarChart3,
  MessageSquare, Briefcase, Users, MapPin, Clock, Shield,GraduationCap
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
  { icon: Target,        color: "text-violet-500",  bg: "bg-violet-50",  title: "Career Planner",         desc: "Set goals, track progress, and grow with Nexon Coach." },
  { icon: Zap,           color: "text-brand-500",   bg: "bg-brand-50",   title: "One-Click Apply",        desc: "Apply to multiple jobs instantly with your saved profile." },
  { icon: FileText,      color: "text-sky-500",     bg: "bg-sky-50",     title: "Application Tracking",   desc: "Know exactly where every application stands in real time." },
  { icon: MessageSquare, color: "text-emerald-500", bg: "bg-emerald-50", title: "Interview Practice",     desc: "Prepare with mock interviews tailored to your target roles." },
  { icon: FileText,      color: "text-rose-500",    bg: "bg-rose-50",    title: "Resume Builder",         desc: "Build ATS-optimized resumes with guided templates." },
  { icon: Sparkles,      color: "text-violet-500",  bg: "bg-violet-50",  title: "AI Resume Feedback",     desc: "Get AI-powered suggestions to improve your resume score." },
  { icon: TrendingUp,    color: "text-sky-500",     bg: "bg-sky-50",     title: "Skill Development",      desc: "Access curated courses and resources to upskill for your target role." },
  { icon: Award,         color: "text-amber-500",   bg: "bg-amber-50",   title: "Achievement Badges",     desc: "Earn verified badges for skills, certifications, and placement milestones." },
  { icon: Bell,          color: "text-sky-500",     bg: "bg-sky-50",     title: "Job Alerts",             desc: "Get notified instantly when your dream role is posted." },
  { icon: GraduationCap, color: "text-emerald-500", bg: "bg-emerald-50", title: "Campus Hiring Access",   desc: "Access university placement drives and exclusive campus-only job listings." },
  { icon: Shield,        color: "text-brand-500",   bg: "bg-brand-50",   title: "Verified Companies",     desc: "Apply only to GST-verified, trusted employer profiles." },
  { icon: BarChart3,     color: "text-amber-500",   bg: "bg-amber-50",   title: "Salary Insights",        desc: "Benchmark your expected salary against real market data." },
 
];

const jobCategories = [
  { label: "Technology",         icon: "💻", count: "12,400+ jobs", color: "hover:border-brand-300 hover:bg-brand-50" },
  { label: "Finance & Banking",  icon: "💰", count: "4,200+ jobs",  color: "hover:border-sky-300 hover:bg-sky-50" },
  { label: "Marketing",          icon: "📣", count: "3,800+ jobs",  color: "hover:border-violet-300 hover:bg-violet-50" },
  { label: "Core Engineering",   icon: "⚙️", count: "5,600+ jobs",  color: "hover:border-amber-300 hover:bg-amber-50" },
  { label: "Government",         icon: "🏛️", count: "2,100+ jobs",  color: "hover:border-emerald-300 hover:bg-emerald-50" },
  { label: "Startup Roles",      icon: "🚀", count: "6,900+ jobs",  color: "hover:border-rose-300 hover:bg-rose-50" },
];

const testimonials = [
  {
    name: "Rohan Verma", role: "SDE at Google", college: "IIT Bombay, 2024",
    initials: "RV", color: "from-brand-500 to-violet-500", rating: 5,
    text: "I landed my first job within 3 weeks using HireNexon. The AI resume feedback improved my shortlist rate by 3x. Nexon Coach helped me plan my entire interview prep.",
  },
  {
    name: "Sneha Patel", role: "Product Manager at Razorpay", college: "BITS Pilani, 2024",
    initials: "SP", color: "from-sky-500 to-emerald-500", rating: 5,
    text: "The Career Planner is unlike anything I've seen. I set my 1-year goal and it broke it into daily actions. Got my dream PM role in 6 weeks.",
  },
  {
    name: "Arjun Mehta", role: "Data Analyst at Zomato", college: "VIT Vellore, 2023",
    initials: "AM", color: "from-amber-500 to-rose-500", rating: 5,
    text: "One-click apply saved me hours every week. The salary insights helped me negotiate ₹2L more than the initial offer. HireNexon is genuinely different.",
  },
];

/* ── Hero Mock UI ── */
const HeroMockup = () => (
  <div className="w-full h-full p-5 flex flex-col gap-3">
    {/* Resume score card */}
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 flex items-center gap-4">
      <div className="relative w-14 h-14 shrink-0">
        <svg viewBox="0 0 36 36" className="w-14 h-14 -rotate-90">
          <circle cx="18" cy="18" r="15.9" fill="none" stroke="#e2e8f0" strokeWidth="3" />
          <circle cx="18" cy="18" r="15.9" fill="none" stroke="#6366f1" strokeWidth="3"
            strokeDasharray="82 100" strokeLinecap="round" />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs font-extrabold text-brand-600">82%</span>
        </div>
      </div>
      <div className="flex-1">
        <div className="text-xs font-bold text-slate-700 mb-1">Resume Score</div>
        <div className="text-[10px] text-slate-400 mb-2">3 improvements suggested</div>
        <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-brand-500 to-violet-500 rounded-full" style={{ width: "82%" }} />
        </div>
      </div>
      <div className="text-[10px] font-bold text-brand-500 bg-brand-50 px-2 py-1 rounded-lg">Improve →</div>
    </div>

    {/* Recommended jobs */}
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 flex-1">
      <div className="flex items-center justify-between mb-3">
        <div className="text-xs font-bold text-slate-700">Recommended for You</div>
        <div className="text-[10px] font-bold text-brand-500">See all</div>
      </div>
      <div className="space-y-2.5">
        {[
          { role: "Frontend Engineer",  company: "Google",    loc: "Bangalore",   match: "96%", color: "bg-brand-50 text-brand-600",   logo: "G" },
          { role: "Product Designer",   company: "Razorpay",  loc: "Remote",      match: "91%", color: "bg-sky-50 text-sky-600",       logo: "R" },
          { role: "Data Scientist",     company: "Zomato",    loc: "Gurgaon",     match: "88%", color: "bg-emerald-50 text-emerald-600",logo: "Z" },
          { role: "Backend Engineer",   company: "Meesho",    loc: "Bangalore",   match: "85%", color: "bg-violet-50 text-violet-600", logo: "M" },
        ].map((j, i) => (
          <div key={i} className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${j.color}`}>{j.logo}</div>
            <div className="flex-1 min-w-0">
              <div className="text-[11px] font-bold text-slate-700 truncate">{j.role}</div>
              <div className="text-[10px] text-slate-400">{j.company} · {j.loc}</div>
            </div>
            <div className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full shrink-0">{j.match}</div>
          </div>
        ))}
      </div>
    </div>

    {/* Application status */}
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4">
      <div className="text-xs font-bold text-slate-700 mb-3">Application Status</div>
      <div className="grid grid-cols-4 gap-2">
        {[
          { label: "Applied",     val: 12, color: "text-slate-600",   bg: "bg-slate-50" },
          { label: "Shortlisted", val: 5,  color: "text-sky-600",     bg: "bg-sky-50" },
          { label: "Interview",   val: 3,  color: "text-amber-600",   bg: "bg-amber-50" },
          { label: "Offered",     val: 1,  color: "text-emerald-600", bg: "bg-emerald-50" },
        ].map(s => (
          <div key={s.label} className={`${s.bg} rounded-xl p-2 text-center`}>
            <div className={`text-lg font-extrabold ${s.color}`}>{s.val}</div>
            <div className="text-[9px] font-semibold text-slate-400">{s.label}</div>
          </div>
        ))}
      </div>
    </div>

    {/* Career goal progress */}
    <div className="bg-gradient-to-r from-brand-50 to-violet-50 border border-brand-100 rounded-2xl p-4">
      <div className="flex items-center justify-between mb-2">
        <div className="text-xs font-bold text-brand-700">Career Goal: SDE at FAANG</div>
        <div className="text-[10px] font-bold text-brand-500">68% complete</div>
      </div>
      <div className="h-1.5 bg-white rounded-full overflow-hidden mb-2">
        <div className="h-full bg-gradient-to-r from-brand-500 to-violet-500 rounded-full" style={{ width: "68%" }} />
      </div>
      <div className="text-[10px] text-brand-600 font-medium">Next: Complete 2 DSA problems today</div>
    </div>
  </div>
);

/* ── Main Component ── */
export default function ForCandidates() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const el = document.getElementById(location.hash.replace("#", ""));
      if (el) setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 100);
    }
  }, [location.hash]);

  return (
    <div className="min-h-screen bg-surface-card font-jakarta text-text-primary overflow-x-hidden">

      {/* ══════════════════ HERO ══════════════════ */}
      <section className="relative bg-surface-card pt-16 pb-24 overflow-hidden">
        {/* Subtle dot grid */}
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, #e2e8f0 1px, transparent 0)",
          backgroundSize: "32px 32px", opacity: 0.5,
        }} />
        {/* Soft glow orbs — aspirational sky/violet */}
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(99,102,241,0.07) 0%, transparent 70%)" }} />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(14,165,233,0.06) 0%, transparent 70%)" }} />

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Left */}
            <div>
              <div className="inline-flex items-center gap-2 bg-brand-50 border border-brand-100 text-brand-600 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider mb-8">
                <span className="w-2 h-2 bg-brand-500 rounded-full animate-pulse" />
                100% Free for Candidates · Always
              </div>

              <h1 className="text-[52px] leading-[1.1] font-extrabold text-text-primary mb-6 tracking-tight">
                Find the Career<br />
                <span className="text-brand-500">You Deserve.</span><br />
                <span className="text-[40px] text-text-secondary">Apply Smarter.</span>
              </h1>

              <p className="text-lg text-text-muted leading-relaxed mb-10 max-w-[480px]">
                Explore verified companies, access exclusive campus drives, track every application, build ATS-ready resumes, and plan your long-term career with Nexon Coach.
              </p>
              
              <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-100 text-emerald-600 rounded-full px-4 py-2 text-xs font-bold mb-6">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              Campus Drives Available for Registered University Students
              </div>

              <div className="flex flex-wrap gap-4 mb-12">
                <Link to="/register"
                  className="inline-flex items-center gap-2 bg-brand-500 hover:bg-brand-600 text-white font-bold px-7 py-4 rounded-xl transition-all hover:-translate-y-0.5 shadow-md hover:shadow-lg text-[15px]">
                  Create Free Account <ArrowRight size={16} />
                </Link>
                <Link to="/jobs"
                  className="inline-flex items-center gap-2 bg-white border-2 border-border-base text-text-secondary hover:border-brand-400 hover:text-brand-500 font-bold px-7 py-4 rounded-xl transition-all text-[15px]">
                  Browse Jobs <Search size={16} />
                </Link>
              </div>

              {/* Social proof strip */}
              <div className="flex items-center gap-6">
                <div>
                  <div className="text-2xl font-extrabold text-text-primary"><Counter end={50000} suffix="+" /></div>
                  <div className="text-xs text-text-muted font-semibold">Registered Candidates</div>
                </div>
                <div className="w-px h-10 bg-border-subtle" />
                <div>
                  <div className="text-2xl font-extrabold text-text-primary"><Counter end={10000} suffix="+" /></div>
                  <div className="text-xs text-text-muted font-semibold">Jobs Posted</div>
                </div>
                <div className="w-px h-10 bg-border-subtle" />
                <div>
                  <div className="text-2xl font-extrabold text-emerald-500"><Counter end={92} suffix="%" /></div>
                  <div className="text-xs text-text-muted font-semibold">Placement Rate</div>
                </div>
              </div>
            </div>

            {/* Right – Personal Dashboard mockup */}
            <div className="relative">
              <div className="relative bg-surface-base border border-border-subtle rounded-[28px] shadow-[0_32px_80px_rgba(30,41,59,0.12)] overflow-hidden" style={{ height: 520 }}>
                <HeroMockup />
              </div>

              {/* Floating cards */}
              <div className="absolute -left-10 top-16 bg-white rounded-2xl shadow-[0_8px_32px_rgba(30,41,59,0.14)] border border-border-subtle px-5 py-4 flex items-center gap-3"
                style={{ animation: "floatA 4s ease-in-out infinite" }}>
                <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center">
                  <CheckCircle2 size={18} className="text-emerald-500" />
                </div>
                <div>
                  <div className="text-sm font-extrabold text-emerald-600 leading-none">Offer Received!</div>
                  <div className="text-[11px] text-text-muted font-semibold">Google · ₹28 LPA</div>
                </div>
              </div>

              <div className="absolute -right-8 top-1/3 bg-white rounded-2xl shadow-[0_8px_32px_rgba(30,41,59,0.14)] border border-border-subtle px-5 py-4 flex items-center gap-3"
                style={{ animation: "floatB 4.5s ease-in-out infinite" }}>
                <div className="w-10 h-10 bg-brand-50 rounded-xl flex items-center justify-center">
                  <Sparkles size={18} className="text-brand-500" />
                </div>
                <div>
                  <div className="text-sm font-extrabold text-brand-600 leading-none">Resume Score</div>
                  <div className="text-[11px] text-text-muted font-semibold">82% · Top 15%</div>
                </div>
              </div>

              <div className="absolute -left-6 bottom-14 bg-white rounded-2xl shadow-[0_8px_32px_rgba(30,41,59,0.14)] border border-border-subtle px-5 py-4 flex items-center gap-3"
                style={{ animation: "floatC 5s ease-in-out infinite" }}>
                <div className="w-10 h-10 bg-violet-50 rounded-xl flex items-center justify-center">
                  <Target size={18} className="text-violet-500" />
                </div>
                <div>
                  <div className="text-sm font-extrabold text-text-primary leading-none">Goal: 68%</div>
                  <div className="text-[11px] text-text-muted font-semibold">FAANG SDE · On Track</div>
                </div>
              </div>

              <style>{`
                @keyframes floatA { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
                @keyframes floatB { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
                @keyframes floatC { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
              `}</style>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════ CAREER PLANNER USP ══════════════════ */}
      <section className="pt-16 pb-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-violet-50 border border-violet-100 text-violet-600 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider mb-5">
              <Brain size={12} /> New · Nexon Career Planner
            </div>
            <h2 className="text-4xl font-bold text-text-primary mb-4">
              Plan Your Career.<br />Not Just Your Applications.
            </h2>
            <p className="text-lg text-text-muted max-w-2xl mx-auto">
              Introducing HireNexon Career Planner — your long-term growth system powered by Nexon Coach. Set goals, execute daily, and grow with AI.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              {
                icon: Target, color: "text-brand-500", bg: "bg-brand-50", iconBg: "bg-brand-500",
                title: "Goal Planning",
                desc: "Set 1 month, 1 year, or 5 year career goals with AI-generated roadmaps tailored to your skills and aspirations.",
                tag: "AI Powered",
              },
              {
                icon: Calendar, color: "text-emerald-500", bg: "bg-emerald-50", iconBg: "bg-emerald-500",
                title: "Daily Execution Tracking",
                desc: "Track your daily learning, project progress, and interview prep. Stay consistent and see your growth in real time.",
                tag: "Daily Check-ins",
              },
              {
                icon: Brain, color: "text-violet-500", bg: "bg-violet-50", iconBg: "bg-violet-500",
                title: "Nexon Coach Guidance",
                desc: "Get adaptive mentoring, resource suggestions, and smart progress insights from your personal AI career coach.",
                tag: "Adaptive AI",
              },
            ].map((card, i) => {
              const Icon = card.icon;
              return (
                <div key={i} className="group bg-white border border-border-subtle rounded-2xl p-8 hover:-translate-y-1.5 hover:shadow-[0_20px_48px_rgba(30,41,59,0.1)] hover:border-transparent transition-all duration-300 relative overflow-hidden">
                  <div className="absolute top-4 right-4">
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${card.bg} ${card.color}`}>{card.tag}</span>
                  </div>
                  <div className={`w-14 h-14 ${card.bg} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon size={26} className={card.color} />
                  </div>
                  <h3 className="text-xl font-bold text-text-primary mb-3">{card.title}</h3>
                  <p className="text-sm text-text-muted leading-relaxed">{card.desc}</p>
                </div>
              );
            })}
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/register"
              className="inline-flex items-center gap-2 bg-brand-500 hover:bg-brand-600 text-white font-bold px-8 py-4 rounded-xl transition-all hover:-translate-y-0.5 shadow-md text-[15px]">
              Start Career Plan <ArrowRight size={16} />
            </Link>
            <Link to="/candidates/features"
              className="inline-flex items-center gap-2 bg-white border-2 border-border-base text-text-secondary hover:border-brand-400 hover:text-brand-500 font-bold px-8 py-4 rounded-xl transition-all text-[15px]">
              Explore Features <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </section>

{/* ══════════════════ AI TOOLS HIGHLIGHT ══════════════════ */}
      <section className="pt-16 pb-24 bg-surface-card">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-violet-50 border border-violet-100 text-violet-600 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider mb-5">
              <Brain size={12} /> AI-Powered
            </div>
            <h2 className="text-4xl font-bold text-text-primary mb-4">AI-Powered Career Growth</h2>
            <p className="text-lg text-text-muted max-w-xl mx-auto">
              Your personal AI career accelerator — working 24/7 to get you hired faster.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: FileText, color: "text-brand-500", bg: "bg-brand-50",
                title: "Resume Score & Feedback",
                desc: "AI analyzes your resume against ATS systems and real job descriptions. Get a score, identify gaps, and apply fixes in minutes.",
                metric: "82%", metricLabel: "Avg. resume score improvement",
              },
              {
                icon: BarChart3, color: "text-sky-500", bg: "bg-sky-50",
                title: "Skill Gap Analysis",
                desc: "Compare your current skills against your target role requirements. Get a personalized learning path to close the gap fast.",
                metric: "3x", metricLabel: "More interview calls",
              },
              {
                icon: MessageSquare, color: "text-emerald-500", bg: "bg-emerald-50",
                title: "Mock Interview Practice",
                desc: "Practice with AI-generated questions tailored to your target company and role. Get instant feedback on your answers.",
                metric: "94%", metricLabel: "Users feel more confident",
              },
              {
                icon: Brain, color: "text-violet-500", bg: "bg-violet-50",
                title: "Nexon Coach Mentorship",
                desc: "Your always-on AI career mentor. Ask questions, get career advice, and receive personalized guidance at any time.",
                metric: "24/7", metricLabel: "Always available",
              },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="group bg-white border border-border-subtle rounded-2xl p-8 hover:-translate-y-1 hover:shadow-[0_20px_48px_rgba(30,41,59,0.09)] transition-all duration-300 flex gap-6">
                  <div className={`w-14 h-14 ${item.bg} rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                    <Icon size={26} className={item.color} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-text-primary mb-2">{item.title}</h3>
                    <p className="text-sm text-text-muted leading-relaxed mb-4">{item.desc}</p>
                    <div className="flex items-center gap-2">
                      <span className={`text-2xl font-extrabold ${item.color}`}>{item.metric}</span>
                      <span className="text-xs text-text-muted font-medium">{item.metricLabel}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

{/* ══════════════════ HOW IT WORKS ══════════════════ */}
      <section className="pt-16 pb-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-sky-50 border border-sky-100 text-sky-600 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider mb-5">
              <Zap size={12} /> How It Works
            </div>
            <h2 className="text-4xl font-bold text-text-primary mb-4">From Profile to Placed in 3 Steps</h2>
            <p className="text-lg text-text-muted max-w-xl mx-auto">Simple, fast, and designed for the modern job seeker.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connector line */}
            <div className="hidden md:block absolute top-12 left-[33%] right-[33%] h-px bg-gradient-to-r from-brand-200 via-sky-200 to-emerald-200" />

            {[
              { step: "01", icon: Users,     color: "text-brand-500",   bg: "bg-brand-50",   ring: "ring-brand-200",   title: "Create Your Profile",              desc: "Set up your profile in 5 minutes. Add your skills, experience, and career goals." },
              { step: "02", icon: Search,    color: "text-sky-500",     bg: "bg-sky-50",     ring: "ring-sky-200",     title: "Apply to Verified Jobs",           desc: "Browse thousands of verified jobs and apply with one click using your saved profile." },
              { step: "03", icon: TrendingUp,color: "text-emerald-500", bg: "bg-emerald-50", ring: "ring-emerald-200", title: "Track & Grow with Nexon Coach",    desc: "Monitor your applications, get AI feedback, and plan your long-term career growth." },
            ].map((s, i) => {
              const Icon = s.icon;
              return (
                <div key={i} className="text-center relative">
                  <div className={`w-24 h-24 ${s.bg} ring-4 ${s.ring} rounded-full flex items-center justify-center mx-auto mb-6 relative z-10`}>
                    <Icon size={36} className={s.color} />
                  </div>
                  <div className={`text-xs font-extrabold uppercase tracking-widest ${s.color} mb-2`}>Step {s.step}</div>
                  <h3 className="text-xl font-bold text-text-primary mb-3">{s.title}</h3>
                  <p className="text-sm text-text-muted leading-relaxed max-w-xs mx-auto">{s.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

{/* ══════════════════ CAMPUS HIRING ACCESS ══════════════════ */}
<section className="pt-16 pb-24 bg-surface-card">
  <div className="max-w-7xl mx-auto px-6">
    <div className="grid lg:grid-cols-2 gap-16 items-center">
      
      {/* Left text */}
      <div>
        <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-100 text-emerald-600 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider mb-6">
          <GraduationCap size={12} /> Campus Hiring Access
        </div>
        <h2 className="text-4xl font-bold text-text-primary mb-4 leading-tight">
          Unlock Exclusive <br />Campus Opportunities
        </h2>
        <p className="text-lg text-text-muted mb-8 leading-relaxed">
          If your university is partnered with HireNexon, you can access campus drives exclusively organized for your institution. Only registered students of that university can apply — keeping it fair, verified, and competitive.
        </p>

        <ul className="space-y-5 mb-10">
          {[
            {
              icon: Building2, color: "text-brand-500", bg: "bg-brand-50",
              title: "University-Verified Companies",
              desc: "Companies visit your campus specifically to hire from your university's talent pool.",
            },
            {
              icon: Bell, color: "text-amber-500", bg: "bg-amber-50",
              title: "Campus Drive Notifications",
              desc: "Get instant alerts for drives happening at your university.",
            },
            {
              icon: Target, color: "text-emerald-500", bg: "bg-emerald-50",
              title: "Priority Shortlisting",
              desc: "Your campus profile is pre-verified by your placement cell, giving you faster employer visibility.",
            },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <li key={i} className="flex items-start gap-4 group">
                <div className={`w-11 h-11 ${item.bg} rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                  <Icon size={18} className={item.color} />
                </div>
                <div>
                  <div className="text-sm font-bold text-text-primary mb-1">{item.title}</div>
                  <div className="text-sm text-text-muted leading-relaxed">{item.desc}</div>
                </div>
              </li>
            );
          })}
        </ul>

        <div className="flex flex-wrap gap-3">
          <Link to="/register"
            className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-6 py-3 rounded-xl transition-all hover:-translate-y-0.5 shadow-sm text-sm">
            Connect My University <ArrowRight size={14} />
          </Link>
          <Link to="/universities"
            className="inline-flex items-center gap-2 bg-white border-2 border-border-base text-text-secondary hover:border-emerald-400 hover:text-emerald-600 font-bold px-6 py-3 rounded-xl transition-all text-sm">
            Check Campus Access <ChevronRight size={14} />
          </Link>
        </div>
      </div>

      {/* Right — University cards visual */}
      <div className="space-y-4">
        {/* Connected universities */}
        <div className="bg-white border border-border-subtle rounded-2xl p-6 shadow-card">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm font-bold text-text-primary">Partner Universities</div>
            <div className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">50+ Connected</div>
          </div>
          <div className="flex flex-wrap gap-2">
            {["IIT Delhi", "NMIMS", "Symbiosis", "VIT", "Amity", "Manipal", "SRM", "LPU", "BITS Pilani", "Chandigarh Univ."].map(u => (
              <div key={u} className="bg-slate-50 border border-border-subtle rounded-lg px-3 py-1.5 text-xs font-bold text-text-muted hover:border-emerald-300 hover:text-emerald-600 hover:bg-emerald-50 transition-all cursor-default">
                🎓 {u}
              </div>
            ))}
          </div>
        </div>

        {/* Live drive card */}
        <div className="bg-white border border-border-subtle rounded-2xl p-6 shadow-card">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm font-bold text-text-primary">Upcoming Campus Drives</div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-red-500">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" /> Live
            </div>
          </div>
          <div className="space-y-3">
            {[
              { company: "Google",    role: "SDE Intern",          date: "Mar 15", colleges: "IIT, BITS", color: "bg-brand-100 text-brand-600" },
              { company: "Razorpay",  role: "Product Manager",     date: "Mar 18", colleges: "NMIMS, Symbiosis", color: "bg-sky-100 text-sky-600" },
              { company: "Deloitte",  role: "Business Analyst",    date: "Mar 22", colleges: "Amity, VIT", color: "bg-violet-100 text-violet-600" },
            ].map((d, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 hover:bg-white border border-transparent hover:border-border-subtle transition-all">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${d.color}`}>
                  {d.company[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-bold text-text-primary">{d.company} — {d.role}</div>
                  <div className="text-[10px] text-text-muted">For students of: {d.colleges}</div>
                </div>
                <div className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded-lg shrink-0">{d.date}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats strip */}
        <div className="grid grid-cols-3 gap-3">
        {[
        { end: 50,   suffix: "+",  label: "Partner Universities", color: "text-emerald-500" },
        { end: 200,  suffix: "+",  label: "Campus Drives/Month",  color: "text-brand-500" },
        { end: 10000,suffix: "+",  label: "Campus Placements",    color: "text-violet-500" },
        ].map(s => (
        <div key={s.label} className="bg-white border border-border-subtle rounded-xl p-4 text-center">
        <div className={`text-xl font-extrabold ${s.color} mb-1`}>
        <Counter end={s.end} suffix={s.suffix} />
        </div>
        <div className="text-[10px] font-semibold text-text-muted leading-tight">{s.label}</div>
        </div>
        ))}
      </div>
      </div>
    </div>
  </div>
</section> 

      {/* ══════════════════ FEATURES GRID ══════════════════ */}
      <section id="features" className="pt-16 pb-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-brand-50 border border-brand-100 text-brand-600 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider mb-5">
              <Sparkles size={12} /> Features
            </div>
            <h2 className="text-4xl font-bold text-text-primary mb-4">Everything You Need to Get Hired</h2>
            <p className="text-lg text-text-muted max-w-xl mx-auto">
              One platform. Everything from job discovery to offer letter — completely free.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <div key={i} className="group bg-white border border-border-subtle rounded-2xl p-8 hover:-translate-y-1.5 hover:shadow-[0_20px_48px_rgba(30,41,59,0.1)] hover:border-transparent transition-all duration-300">
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

      {/* ══════════════════ JOB CATEGORIES ══════════════════ */}
      <section className="py-10 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-100 text-amber-600 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider mb-5">
              <Briefcase size={12} /> Explore by Category
            </div>
            <h2 className="text-4xl font-bold text-text-primary mb-4">Find Your Domain</h2>
            <p className="text-lg text-text-muted max-w-xl mx-auto">
              Browse jobs across industries — from FAANG tech roles to government positions.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {jobCategories.map((cat, i) => (
              <Link to="/jobs" key={i}
                className={`group bg-white border-2 border-border-subtle rounded-2xl p-6 flex items-center gap-4 transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(30,41,59,0.09)] ${cat.color}`}>
                <div className="text-3xl">{cat.icon}</div>
                <div>
                  <div className="text-base font-bold text-text-primary group-hover:text-text-primary">{cat.label}</div>
                  <div className="text-xs text-text-muted font-semibold mt-0.5">{cat.count}</div>
                </div>
                <ArrowRight size={16} className="ml-auto text-text-disabled group-hover:text-brand-500 transition-colors" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════ TESTIMONIALS ══════════════════ */}
      <section className="pt-16 pb-24 bg-surface-card">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-rose-50 border border-rose-100 text-rose-500 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider mb-5">
              <Star size={12} /> Success Stories
            </div>
            <h2 className="text-4xl font-bold text-text-primary mb-4">Real People. Real Careers.</h2>
            <p className="text-lg text-text-muted max-w-xl mx-auto">
              From campus to dream job — here's what our candidates say.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white border border-border-subtle rounded-2xl p-8 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(30,41,59,0.09)] transition-all duration-300 flex flex-col">
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
                    <div className="text-xs text-text-muted">{t.role}</div>
                    <div className="text-xs text-text-disabled">{t.college}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════ FINAL CTA ══════════════════ */}
      <section className="pt-16 pb-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-600 via-brand-500 to-sky-500" />
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.06) 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }} />
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)" }} />

        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/25 text-white rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider mb-8">
            <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
            Free Forever for Candidates
          </div>
          <h2 className="text-5xl font-extrabold text-white mb-6 leading-tight tracking-tight">
            Ready to Start Your<br />Career Journey?
          </h2>
          <p className="text-xl text-brand-100 mb-10 leading-relaxed">
            Join 50,000+ candidates who are finding their dream careers on HireNexon — completely free.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/register"
              className="inline-flex items-center gap-2 bg-white text-brand-600 hover:bg-brand-50 font-bold px-8 py-4 rounded-xl transition-all hover:-translate-y-0.5 shadow-lg hover:shadow-xl text-[15px]">
              Create Free Account <ArrowRight size={16} />
            </Link>
            <Link to="/jobs"
              className="inline-flex items-center gap-2 bg-white/15 hover:bg-white/25 backdrop-blur-sm border-2 border-white/30 text-white font-bold px-8 py-4 rounded-xl transition-all text-[15px]">
              Browse Jobs <Search size={16} />
            </Link>
          </div>
          <p className="text-brand-100 text-sm mt-6 font-medium">
            ✓ 100% Free for Candidates &nbsp;·&nbsp; ✓ No credit card required &nbsp;·&nbsp; ✓ Setup in 2 minutes
          </p>
        </div>
      </section>

    </div>
  );
}
