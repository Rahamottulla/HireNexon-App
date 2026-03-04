import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  GraduationCap, Building2, BarChart3, ShieldCheck, CheckCircle2,
  Star, ArrowRight, ChevronRight, Users, FileText, Award,
  TrendingUp, BookOpen, Briefcase, ClipboardList, Upload,
  PieChart, Globe2, Zap, Database, UserCheck, LayoutDashboard,
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
const benefits = [
  {
    icon: LayoutDashboard, color: "text-brand-500", bg: "bg-brand-50",
    title: "Centralized Placement Dashboard",
    desc: "Manage all placement activity — drives, offers, and student progress — in one unified workspace.",
  },
  {
    icon: Building2, color: "text-sky-500", bg: "bg-sky-50",
    title: "Direct Company Collaboration",
    desc: "Connect directly with verified employers and schedule campus drives without any middlemen.",
  },
  {
    icon: BarChart3, color: "text-emerald-500", bg: "bg-emerald-50",
    title: "Real-Time Placement Analytics",
    desc: "Track placement performance across departments, batches, and companies with live dashboards.",
  },
  {
    icon: ShieldCheck, color: "text-violet-500", bg: "bg-violet-50",
    title: "Verified Student Profiles",
    desc: "Every student profile is verified for credentials, ensuring employer trust and credibility.",
  },
];

const features = [
  { icon: LayoutDashboard, color: "text-brand-500",   bg: "bg-brand-50",   title: "Placement Dashboard",        desc: "Central hub for all placement activity and team coordination." },
  { icon: UserCheck,       color: "text-sky-500",     bg: "bg-sky-50",     title: "Student Verification",       desc: "Credential-verified student profiles trusted by employers." },
  { icon: ClipboardList,   color: "text-emerald-500", bg: "bg-emerald-50", title: "Track Applications",         desc: "Monitor every student's application status in real time." },
  { icon: BarChart3,       color: "text-indigo-500",  bg: "bg-indigo-50",  title: "Placement Analytics",        desc: "Deep insights on placement rate, packages, and trends." },
  { icon: Briefcase,       color: "text-amber-500",   bg: "bg-amber-50",   title: "Company Drive Management",   desc: "Schedule and manage employer drives from one place." },
  { icon: Upload,          color: "text-teal-500",    bg: "bg-teal-50",    title: "Offer Letter Tracking",      desc: "Digital offer letter upload and verification system." },
  { icon: Users,           color: "text-violet-500",  bg: "bg-violet-50",  title: "Bulk Student Management",    desc: "Import, manage and track thousands of students at scale." },
  { icon: FileText,        color: "text-rose-500",    bg: "bg-rose-50",    title: "Resume Builder",             desc: "Help students build ATS-friendly resumes in minutes." },
  { icon: Globe2,          color: "text-sky-500",     bg: "bg-sky-50",     title: "Employer Collaboration",     desc: "Build long-term employer partnerships through the platform." },
];

const pipelineStages = [
  { label: "Applied",     color: "bg-slate-100 text-slate-600 border-slate-200",      dot: "bg-slate-400",    count: 420 },
  { label: "Shortlisted", color: "bg-sky-50 text-sky-600 border-sky-200",             dot: "bg-sky-500",      count: 285 },
  { label: "Interview",   color: "bg-amber-50 text-amber-600 border-amber-200",       dot: "bg-amber-500",    count: 196 },
  { label: "Offer",       color: "bg-violet-50 text-violet-600 border-violet-200",    dot: "bg-violet-500",   count: 134 },
  { label: "Placed",      color: "bg-emerald-50 text-emerald-600 border-emerald-200", dot: "bg-emerald-500",  count: 98  },
];

const pricingPlans = [
  {
    name: "Starter", price: "₹0", period: "/month", badge: null, highlight: false,
    desc: "For small colleges beginning their placement digitisation.",
    features: ["Up to 300 students", "3 company drives/month", "Basic placement reports", "Community support"],
    cta: "Get Started Free",
  },
  {
    name: "Campus Plus", price: "₹1,999", period: "/month", badge: null, highlight: false,
    desc: "For growing placement cells managing multiple drives.",
    features: ["Up to 1,000 students", "10 company drives/month", "Department analytics", "Student verification", "Email support"],
    cta: "Start Campus Plus",
  },
  {
    name: "Professional", price: "₹12,999", period: "/month", badge: "Most Popular", highlight: true,
    desc: "The complete placement management system for serious institutions.",
    features: ["Unlimited students", "Unlimited company drives", "Advanced analytics & reports", "Offer letter tracking", "Bulk student management", "Dedicated placement manager"],
    cta: "Start Professional",
  },
  {
    name: "Enterprise", price: "Custom", period: "", badge: null, highlight: false,
    desc: "Tailored solutions for large universities and institutions.",
    features: ["Everything in Professional", "Multi-campus management", "Custom integrations & API", "SLA guarantee (99.9%)", "On-premise option", "Executive priority support"],
    cta: "Contact Sales",
  },
];

const testimonials = [
  {
    name: "Dr. Ramesh Iyer", role: "Head of Placements", company: "Symbiosis Institute of Technology",
    initials: "RI", color: "from-brand-500 to-sky-500", rating: 5,
    text: "HireNexon helped us digitize our entire placement process. What used to take 3 weeks of manual coordination now happens in 3 days.",
  },
  {
    name: "Prof. Sunita Nair", role: "Dean, Training & Placement", company: "NMIMS University",
    initials: "SN", color: "from-emerald-500 to-teal-500", rating: 5,
    text: "The real-time analytics dashboard gave our management complete visibility into placement performance for the first time. Truly remarkable.",
  },
  {
    name: "Mr. Arun Sharma", role: "Placement Director", company: "Amity University, Noida",
    initials: "AS", color: "from-violet-500 to-indigo-500", rating: 5,
    text: "Managing 2,400 students across 12 departments is now seamless. The bulk management tools and department-wise tracking are outstanding.",
  },
];

const trustedUniversities = ["IIT Delhi", "NMIMS", "Symbiosis", "Amity", "VIT", "SRM", "Manipal", "LPU", "BITS Pilani", "Chandigarh Univ."];

/* ── Placement Dashboard Mockup ── */
const PlacementDashboard = () => (
  <div className="w-full h-full p-5 flex flex-col gap-4">
    {/* Header */}
    <div className="flex items-center justify-between">
      <div>
        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Placement Cell</div>
        <div className="text-base font-bold text-slate-800">2025 Batch Overview</div>
      </div>
      <div className="flex gap-1.5">
        {["All Dept.", "CSE", "ECE"].map((t, i) => (
          <div key={t} className={`px-2.5 py-1 rounded-lg text-[10px] font-bold cursor-pointer ${i === 0 ? "bg-brand-500 text-white" : "bg-white text-slate-500 border border-slate-200"}`}>{t}</div>
        ))}
      </div>
    </div>

    {/* Stats */}
    <div className="grid grid-cols-4 gap-2">
      {[
        { label: "Students Placed", val: "420",    change: "+32%", color: "text-emerald-500" },
        { label: "Companies Visited", val: "35",   change: "+18%", color: "text-brand-500" },
        { label: "Offers Issued",   val: "280",    change: "+25%", color: "text-violet-500" },
        { label: "Avg Package",     val: "₹7.2L",  change: "+12%", color: "text-amber-500" },
      ].map(s => (
        <div key={s.label} className="bg-white rounded-xl p-2.5 border border-slate-100 shadow-sm">
          <div className="text-[9px] font-bold text-slate-400 uppercase tracking-wide mb-1">{s.label}</div>
          <div className={`text-lg font-extrabold ${s.color} leading-none`}>{s.val}</div>
          <div className="text-[9px] text-emerald-500 font-semibold mt-0.5">{s.change}</div>
        </div>
      ))}
    </div>

    {/* Pipeline */}
    <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-3">
      <div className="text-[10px] font-bold text-slate-600 mb-2.5">Student Pipeline</div>
      <div className="flex items-center gap-1">
        {pipelineStages.map((stage, i) => (
          <div key={i} className="flex items-center gap-1 flex-1">
            <div className={`flex-1 rounded-lg border px-2 py-1.5 text-center ${stage.color}`}>
              <div className="text-[9px] font-bold leading-none mb-0.5">{stage.label}</div>
              <div className="text-xs font-extrabold">{stage.count}</div>
            </div>
            {i < pipelineStages.length - 1 && <ChevronRight size={10} className="text-slate-300 shrink-0" />}
          </div>
        ))}
      </div>
    </div>

    {/* Recent students */}
    <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-3 flex-1">
      <div className="text-[10px] font-bold text-slate-600 mb-2">Recent Placements</div>
      <div className="space-y-2">
        {[
          { name: "Arjun Mehta",    dept: "CSE",  company: "Google",     pkg: "₹28L", color: "bg-brand-100 text-brand-600" },
          { name: "Priya Singh",    dept: "ECE",  company: "Qualcomm",   pkg: "₹18L", color: "bg-sky-100 text-sky-600" },
          { name: "Ravi Kumar",     dept: "MBA",  company: "Deloitte",   pkg: "₹14L", color: "bg-emerald-100 text-emerald-600" },
          { name: "Anjali Verma",   dept: "CSE",  company: "Microsoft",  pkg: "₹32L", color: "bg-violet-100 text-violet-600" },
        ].map(s => (
          <div key={s.name} className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-slate-50">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold shrink-0 ${s.color}`}>
              {s.name.split(" ").map(n => n[0]).join("")}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[10px] font-bold text-slate-700 truncate">{s.name}</div>
              <div className="text-[9px] text-slate-400">{s.dept}</div>
            </div>
            <div className="text-[9px] font-bold text-slate-600">{s.company}</div>
            <div className="text-[9px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">{s.pkg}</div>
          </div>
        ))}
      </div>
    </div>

    {/* Bar chart */}
    <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-3">
      <div className="flex items-center justify-between mb-2">
        <div className="text-[10px] font-bold text-slate-600">Dept. Placement Rate</div>
        <div className="text-[9px] text-slate-400">2025 Batch</div>
      </div>
      <div className="flex items-end gap-2 h-12">
        {[
          { label: "CSE", val: 92, color: "bg-brand-500" },
          { label: "ECE", val: 85, color: "bg-sky-500" },
          { label: "MBA", val: 78, color: "bg-emerald-500" },
          { label: "ME",  val: 71, color: "bg-amber-500" },
          { label: "CE",  val: 65, color: "bg-violet-500" },
        ].map((d, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-1">
            <div className="text-[8px] font-bold text-slate-500">{d.val}%</div>
            <div className={`w-full rounded-t-md ${d.color}`} style={{ height: `${d.val * 0.45}px` }} />
            <div className="text-[8px] text-slate-400 font-medium">{d.label}</div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

/* ── Main Component ── */
export default function ForUniversities() {
  
  const location = useLocation();
  useEffect(() => {
    if (location.hash) {
      const el = document.getElementById(location.hash.replace("#", ""));
      if (el) setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 100);
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
      <section className="relative bg-surface-card pt-16 pb-24 overflow-hidden">
        {/* Grid bg */}
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, #e2e8f0 1px, transparent 0)",
          backgroundSize: "32px 32px", opacity: 0.5,
        }} />
        {/* Glow orbs — calmer emerald/sky tones for universities */}
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(16,185,129,0.07) 0%, transparent 70%)" }} />
        <div className="absolute -top-20 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(14,165,233,0.06) 0%, transparent 70%)" }} />

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Left */}
            <div>
              <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-100 text-emerald-600 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider mb-8">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                Trusted by 50+ Universities Across India
              </div>

              <h1 className="text-[52px] leading-[1.12] font-extrabold text-text-primary mb-6 tracking-tight">
                Empower Your<br />
                <span className="text-emerald-500">Campus Placements.</span><br />
                Track. Connect. Succeed.
              </h1>

              <p className="text-lg text-text-muted leading-relaxed mb-10 max-w-[480px]">
                India's next-generation placement management system designed for universities and colleges. From student tracking to company collaboration — one powerful workspace.
              </p>

              <div className="flex flex-wrap gap-4 mb-12">
                <Link to="/university/register"
                  className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-7 py-4 rounded-xl transition-all hover:-translate-y-0.5 shadow-md hover:shadow-lg text-[15px]">
                  Create University Workspace <ArrowRight size={16} />
                </Link>
                <a href="#pricing"
                  className="inline-flex items-center gap-2 bg-white border-2 border-border-base text-text-secondary hover:border-emerald-400 hover:text-emerald-600 font-bold px-7 py-4 rounded-xl transition-all text-[15px]">
                  View Pricing <ChevronRight size={16} />
                </a>
              </div>

              {/* Trusted logos */}
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-text-disabled mb-4">Trusted by institutions at</p>
                <div className="flex flex-wrap gap-3">
                  {["IIT Delhi", "NMIMS", "Symbiosis", "Amity", "VIT", "Manipal"].map(u => (
                    <div key={u} className="bg-surface-base border border-border-subtle rounded-lg px-4 py-2 text-xs font-bold text-text-muted">
                      {u}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right – Dashboard mockup */}
            <div className="relative">
              <div className="relative bg-surface-base border border-border-subtle rounded-[28px] shadow-[0_32px_80px_rgba(30,41,59,0.12)] overflow-hidden" style={{ height: 520 }}>
                <PlacementDashboard />
              </div>

              {/* Floating stat cards */}
              <div className="absolute -left-10 top-12 bg-white rounded-2xl shadow-[0_8px_32px_rgba(30,41,59,0.14)] border border-border-subtle px-5 py-4 flex items-center gap-3"
                style={{ animation: "floatA 4s ease-in-out infinite" }}>
                <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center">
                  <GraduationCap size={18} className="text-emerald-500" />
                </div>
                <div>
                  <div className="text-lg font-extrabold text-text-primary leading-none"><Counter end={420} suffix="+" /></div>
                  <div className="text-[11px] text-text-muted font-semibold">Students Placed</div>
                </div>
              </div>

              <div className="absolute -right-8 top-1/3 bg-white rounded-2xl shadow-[0_8px_32px_rgba(30,41,59,0.14)] border border-border-subtle px-5 py-4 flex items-center gap-3"
                style={{ animation: "floatB 4.5s ease-in-out infinite" }}>
                <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center">
                  <TrendingUp size={18} className="text-amber-500" />
                </div>
                <div>
                  <div className="text-lg font-extrabold text-amber-600 leading-none"><Counter end={7} prefix="₹" suffix=".2 LPA" /></div>
                  <div className="text-[11px] text-text-muted font-semibold">Avg. Package</div>
                </div>
              </div>

              <div className="absolute -left-6 bottom-14 bg-white rounded-2xl shadow-[0_8px_32px_rgba(30,41,59,0.14)] border border-border-subtle px-5 py-4 flex items-center gap-3"
                style={{ animation: "floatC 5s ease-in-out infinite" }}>
                <div className="w-10 h-10 bg-brand-50 rounded-xl flex items-center justify-center">
                  <Building2 size={18} className="text-brand-500" />
                </div>
                <div>
                  <div className="text-lg font-extrabold text-text-primary leading-none"><Counter end={35} suffix="+" /></div>
                  <div className="text-[11px] text-text-muted font-semibold">Companies Visited</div>
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
              { val: 50,    suffix: "+",   label: "Partner Universities",    color: "text-emerald-500" },
              { val: 10000, suffix: "+",   label: "Students Placed",         color: "text-brand-500" },
              { val: 500,   suffix: "+",   label: "Recruiting Companies",    color: "text-sky-500" },
              { val: 92,    suffix: "%",   label: "Avg. Placement Rate",     color: "text-violet-500" },
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

      {/* ══════════════════ TRUSTED UNIVERSITIES ══════════════════ */}
      <section className="bg-slate-50 py-14 border-y border-border-subtle overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-8 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-text-disabled">
            Placement cells modernising with HireNexon
          </p>
        </div>
        <div className="flex gap-6 w-max" style={{ animation: "slideLogos 22s linear infinite" }}>
          {[...trustedUniversities, ...trustedUniversities].map((u, i) => (
            <div key={i} className="bg-white border border-border-subtle rounded-xl px-8 py-4 text-sm font-bold text-text-muted whitespace-nowrap shadow-sm hover:shadow-md hover:border-emerald-200 transition-all">
              🎓 {u}
            </div>
          ))}
        </div>
        <style>{`@keyframes slideLogos { from{transform:translateX(0)} to{transform:translateX(-50%)} }`}</style>
      </section>

      {/* ══════════════════ CAMPUS HIRING BENEFITS ══════════════════ */}
      <section id="features" className="pt-16 pb-24 bg-surface-card">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-100 text-emerald-600 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider mb-5">
              <Award size={12} /> Why Universities Choose Us
            </div>
            <h2 className="text-4xl font-bold text-text-primary mb-4">Why Modern Universities Choose HireNexon</h2>
            <p className="text-lg text-text-muted max-w-xl mx-auto">
              Purpose-built for placement cells — not adapted from a generic HR tool.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {benefits.map((b, i) => {
              const Icon = b.icon;
              return (
                <div key={i} className="bg-white border border-border-subtle rounded-2xl p-8 hover:-translate-y-1 hover:shadow-[0_20px_48px_rgba(30,41,59,0.09)] transition-all duration-300 flex items-start gap-5">
                  <div className={`w-14 h-14 ${b.bg} rounded-2xl flex items-center justify-center shrink-0`}>
                    <Icon size={26} className={b.color} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-text-primary mb-2">{b.title}</h3>
                    <p className="text-sm text-text-muted leading-relaxed">{b.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════ STUDENT TRACKING SYSTEM ══════════════════ */}
      <section className="pt-16 pb-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Left text */}
            <div>
              <div className="inline-flex items-center gap-2 bg-sky-50 border border-sky-100 text-sky-600 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider mb-6">
                <ClipboardList size={12} /> Student Tracking
              </div>
              <h2 className="text-4xl font-bold text-text-primary mb-6 leading-tight">
                Track Every Student's<br />Placement Journey
              </h2>
              <p className="text-lg text-text-muted mb-8 leading-relaxed">
                From the first application to the final offer letter — every step is tracked, timestamped, and visible to your placement team.
              </p>
              <ul className="space-y-4">
                {[
                  { icon: ClipboardList, label: "Application Tracking",           desc: "Know exactly which student applied where." },
                  { icon: Users,         label: "Interview Status",               desc: "Live updates on every interview round." },
                  { icon: Upload,        label: "Offer Letter Upload",            desc: "Digitally collect and verify offer letters." },
                  { icon: CheckCircle2,  label: "Final Placement Confirmation",   desc: "Mark students as placed with one click." },
                  { icon: BarChart3,     label: "Department-wise Tracking",       desc: "Compare performance across all departments." },
                ].map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <li key={i} className="flex items-start gap-4 group">
                      <div className="w-10 h-10 bg-sky-50 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-sky-100 transition-colors">
                        <Icon size={16} className="text-sky-500" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-text-primary">{item.label}</div>
                        <div className="text-xs text-text-muted mt-0.5">{item.desc}</div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Right pipeline visual */}
            <div className="bg-white border border-border-subtle rounded-2xl p-8 shadow-card">
              <div className="text-sm font-bold text-text-primary mb-6">Placement Pipeline — 2025 Batch</div>

              {/* Horizontal pipeline */}
              <div className="flex items-center gap-1 mb-8 overflow-x-auto pb-2">
                {pipelineStages.map((stage, i) => (
                  <div key={i} className="flex items-center gap-2 flex-shrink-0">
                    <div className={`flex flex-col items-center gap-1.5 px-4 py-3 rounded-xl border-2 ${stage.color} min-w-[80px]`}>
                      <span className={`w-2.5 h-2.5 rounded-full ${stage.dot}`} />
                      <span className="text-xs font-bold whitespace-nowrap">{stage.label}</span>
                      <span className="text-lg font-extrabold">{stage.count}</span>
                    </div>
                    {i < pipelineStages.length - 1 && (
                      <ArrowRight size={16} className="text-slate-300 flex-shrink-0" />
                    )}
                  </div>
                ))}
              </div>

              {/* Student rows */}
              <div className="space-y-3">
                <div className="text-xs font-bold text-text-muted uppercase tracking-wider mb-3">Recent Activity</div>
                {[
                  { name: "Arjun Mehta",  dept: "CSE", stage: "Placed",      company: "Google",    color: "bg-emerald-100 text-emerald-600", stageColor: "bg-emerald-50 text-emerald-600" },
                  { name: "Priya Singh",  dept: "ECE", stage: "Offer",       company: "Qualcomm",  color: "bg-sky-100 text-sky-600",         stageColor: "bg-violet-50 text-violet-600" },
                  { name: "Ravi Kumar",   dept: "MBA", stage: "Interview",   company: "Deloitte",  color: "bg-brand-100 text-brand-600",     stageColor: "bg-amber-50 text-amber-600" },
                  { name: "Neha Patel",   dept: "CSE", stage: "Shortlisted", company: "Infosys",   color: "bg-violet-100 text-violet-600",   stageColor: "bg-sky-50 text-sky-600" },
                  { name: "Karan Shah",   dept: "ME",  stage: "Applied",     company: "Tata",      color: "bg-amber-100 text-amber-600",     stageColor: "bg-slate-50 text-slate-600" },
                ].map((s, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 hover:bg-white border border-transparent hover:border-border-subtle transition-all">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${s.color}`}>
                      {s.name.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-bold text-text-primary truncate">{s.name}</div>
                      <div className="text-[10px] text-text-muted">{s.dept} · {s.company}</div>
                    </div>
                    <div className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${s.stageColor}`}>{s.stage}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════ ANALYTICS SECTION ══════════════════ */}
      <section className="pt-16 pb-24 bg-surface-card">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-brand-50 border border-brand-100 text-brand-600 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider mb-5">
              <BarChart3 size={12} /> Analytics
            </div>
            <h2 className="text-4xl font-bold text-text-primary mb-4">Placement Analytics That Drive Results</h2>
            <p className="text-lg text-text-muted max-w-xl mx-auto">
              Move beyond Excel sheets. Get real-time insights that help you improve placement outcomes every year.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              { label: "Placement Rate",    val: "92%",   sub: "+8% vs last year",  color: "text-emerald-500", bg: "bg-emerald-50", icon: TrendingUp },
              { label: "Highest Package",   val: "₹32 LPA", sub: "CSE Branch",      color: "text-amber-500",   bg: "bg-amber-50",   icon: Award },
              { label: "Average Package",   val: "₹7.2 LPA",sub: "All Branches",   color: "text-brand-500",   bg: "bg-brand-50",   icon: BarChart3 },
              { label: "Companies Visited", val: "35",    sub: "+12 vs last year",  color: "text-sky-500",     bg: "bg-sky-50",     icon: Building2 },
            ].map((s, i) => {
              const Icon = s.icon;
              return (
                <div key={i} className="bg-white border border-border-subtle rounded-2xl p-6 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(30,41,59,0.09)] transition-all">
                  <div className={`w-11 h-11 ${s.bg} rounded-xl flex items-center justify-center mb-4`}>
                    <Icon size={20} className={s.color} />
                  </div>
                  <div className={`text-3xl font-extrabold ${s.color} mb-1`}>{s.val}</div>
                  <div className="text-sm font-bold text-text-primary mb-1">{s.label}</div>
                  <div className="text-xs text-text-muted">{s.sub}</div>
                </div>
              );
            })}
          </div>

          {/* Department Comparison */}
          <div className="bg-white border border-border-subtle rounded-2xl p-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-lg font-bold text-text-primary">Department-wise Placement Rate</h3>
                <p className="text-sm text-text-muted mt-1">Comparing all departments — 2025 Batch</p>
              </div>
              <div className="text-xs font-bold text-brand-500 bg-brand-50 px-3 py-1.5 rounded-lg">2025 Batch</div>
            </div>
            <div className="space-y-4">
              {[
                { dept: "Computer Science",     rate: 92, placed: 138, total: 150, color: "bg-brand-500" },
                { dept: "Electronics & Comm.",  rate: 85, placed: 102, total: 120, color: "bg-sky-500" },
                { dept: "MBA",                  rate: 78, placed: 78,  total: 100, color: "bg-emerald-500" },
                { dept: "Mechanical Engg.",     rate: 71, placed: 71,  total: 100, color: "bg-amber-500" },
                { dept: "Civil Engg.",          rate: 65, placed: 52,  total: 80,  color: "bg-violet-500" },
              ].map((d, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-44 shrink-0 text-sm font-semibold text-text-secondary truncate">{d.dept}</div>
                  <div className="flex-1 bg-slate-100 rounded-full h-2.5 overflow-hidden">
                    <div className={`h-full rounded-full transition-all duration-700 ${d.color}`} style={{ width: `${d.rate}%` }} />
                  </div>
                  <div className="w-12 text-right text-sm font-bold text-text-primary shrink-0">{d.rate}%</div>
                  <div className="w-20 text-right text-xs text-text-muted shrink-0">{d.placed}/{d.total}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════ FEATURES GRID ══════════════════ */}
      <section className="pt-16 pb-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-sky-50 border border-sky-100 text-sky-600 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider mb-5">
              <Zap size={12} /> Full Feature Suite
            </div>
            <h2 className="text-4xl font-bold text-text-primary mb-4">Everything Your Placement Cell Needs</h2>
            <p className="text-lg text-text-muted max-w-xl mx-auto">
              A complete institutional placement operating system — built for scale.
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

      {/* ══════════════════ PRICING ══════════════════ */}
      <section id="pricing" className="pt-16 pb-24 bg-surface-card">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-violet-50 border border-violet-100 text-violet-600 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider mb-5">
              <Zap size={12} /> Transparent Pricing
            </div>
            <h2 className="text-4xl font-bold text-text-primary mb-4">Plans Built for Every Institution</h2>
            <p className="text-lg text-text-muted max-w-xl mx-auto">
              No hidden fees. Designed around students, drives, and reporting — not seat counts.
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
                  ? "bg-gradient-to-b from-emerald-500 to-emerald-700 border-emerald-500 shadow-[0_24px_60px_rgba(16,185,129,0.28)] scale-105 text-white"
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
                      <CheckCircle2 size={15} className={`shrink-0 mt-0.5 ${plan.highlight ? "text-emerald-200" : "text-emerald-500"}`} />
                      {feat}
                    </li>
                  ))}
                </ul>

                <Link to={plan.name === "Enterprise" ? "/contact" : "/university/register"}
                  className={`w-full text-center py-3.5 rounded-xl text-sm font-bold transition-all inline-block ${
                    plan.highlight
                      ? "bg-white text-emerald-700 hover:bg-emerald-50 shadow-sm"
                      : plan.name === "Starter"
                        ? "border-2 border-emerald-400 text-emerald-600 hover:bg-emerald-50"
                        : plan.name === "Enterprise"
                          ? "bg-slate-900 text-white hover:bg-slate-800"
                          : "bg-emerald-500 text-white hover:bg-emerald-600 shadow-sm"
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
              <Star size={12} /> Placement Officers Speak
            </div>
            <h2 className="text-4xl font-bold text-text-primary mb-4">Trusted by Placement Leaders Across India</h2>
            <p className="text-lg text-text-muted max-w-xl mx-auto">
              Hear from the people running some of India's most active placement cells.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-16">
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
                    <div className="text-xs text-text-disabled">{t.company}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* University logos */}
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-text-disabled mb-6">Universities already using HireNexon</p>
            <div className="flex flex-wrap justify-center gap-4">
              {trustedUniversities.map(u => (
                <div key={u} className="bg-white border border-border-subtle rounded-xl px-6 py-3 text-sm font-bold text-text-muted hover:border-emerald-200 hover:text-emerald-600 transition-all cursor-default">
                  🎓 {u}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════ FINAL CTA ══════════════════ */}
      <section className="pt-16 pb-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-700 via-emerald-600 to-teal-600" />
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }} />
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(255,255,255,0.07) 0%, transparent 70%)" }} />

        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/25 text-white rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider mb-8">
            <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
            Start Digitising Today
          </div>
          <h2 className="text-5xl font-extrabold text-white mb-6 leading-tight tracking-tight">
            Ready to Digitize Your<br /> Placement Process Today?
          </h2>
          <p className="text-xl text-emerald-100 mb-10 leading-relaxed">
            Create your university workspace in minutes and bring your entire placement cell online.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/university/register"
              className="inline-flex items-center gap-2 bg-white text-emerald-700 hover:bg-emerald-50 font-bold px-8 py-4 rounded-xl transition-all hover:-translate-y-0.5 shadow-lg hover:shadow-xl text-[15px]">
              Create University Workspace <ArrowRight size={16} />
            </Link>
            <a href="#pricing"
              className="inline-flex items-center gap-2 bg-white/15 hover:bg-white/25 backdrop-blur-sm border-2 border-white/30 text-white font-bold px-8 py-4 rounded-xl transition-all text-[15px]">
              View Pricing <ChevronRight size={16} />
            </a>
          </div>
          <p className="text-emerald-100 text-sm mt-6 font-medium">
            ✓ No credit card required for Starter Plan &nbsp;·&nbsp; ✓ Setup in under 10 minutes
          </p>
        </div>
      </section>

    </div>
  );
}
