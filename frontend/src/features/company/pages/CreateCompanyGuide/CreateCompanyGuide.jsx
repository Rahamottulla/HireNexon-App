// src/pages/company/CreateCompanyWorkspace.jsx
//
// ── HOW TO IMPORT & USE ───────────────────────────────────────────
//
//  STEP 1 — Add the route in your App.jsx / router file:
//
//    import CreateCompanyWorkspace from "./pages/company/CreateCompanyWorkspace";
//
//    <Route path="/create-company-workspace" element={<CreateCompanyWorkspace />} />
//
//  STEP 2 — On your /employers landing page, wire the CTA button:
//
//    import { useNavigate } from "react-router-dom";
//    const navigate = useNavigate();
//
//    <button onClick={() => navigate("/create-company-workspace")}>
//      Create Company Workspace →
//    </button>
//
// ──────────────────────────────────────────────────────────────────

import { useNavigate } from "react-router-dom";

/* ── Step data ─────────────────────────────────────────────────── */
const STEPS = [
  {
    num: 1,
    title: "Go to Sign Up",
    tag: "quick",
    desc: (
      <>
        Click the{" "}
        <strong className="font-semibold text-text-primary">
          "Create Company Workspace"
        </strong>{" "}
        button at the bottom of this page. You'll land on HireNexon's signup
        screen ready to begin.
      </>
    ),
  },
  {
    num: 2,
    title: "Create Your Account",
    tag: "quick",
    desc: (
      <>
        Enter your{" "}
        <strong className="font-semibold text-text-primary">username</strong>,{" "}
        <strong className="font-semibold text-text-primary">
          email address
        </strong>
        , and a strong{" "}
        <strong className="font-semibold text-text-primary">password</strong>.
        These become your permanent login credentials.
      </>
    ),
  },
  {
    num: 3,
    title: "Select Your Role",
    tag: "important",
    desc: "During signup you'll be asked to pick a role — choosing the right one unlocks your workspace tools and dashboard.",
    chips: [
      { label: "Candidate",  icon: "🎯", active: false },
      { label: "Employer",   icon: "🏢", active: true  },
      { label: "University", icon: "🎓", active: false },
    ],
  },
  {
    num: 4,
    title: "Verify Your Email",
    tag: "important",
    desc: (
      <>
        We send a verification link to your inbox. Click{" "}
        <strong className="font-semibold text-text-primary">
          "Verify My Account"
        </strong>{" "}
        to confirm your identity. Check spam if you don't see it within a
        minute.
      </>
    ),
  },
  {
    num: 5,
    title: "Set Up Company Profile",
    tag: "important",
    desc: (
      <>
        Upload your{" "}
        <strong className="font-semibold text-text-primary">
          company logo
        </strong>
        , add your{" "}
        <strong className="font-semibold text-text-primary">
          company name
        </strong>
        , industry, size, and website. This is what candidates and universities
        will see on your profile.
      </>
    ),
  },
  {
    num: 6,
    title: "Start Hiring 🎉",
    tag: "done",
    desc: "Your workspace is live! Post jobs for free, review candidates, schedule interviews, and connect with 50+ partner universities — all from one dashboard.",
  },
];

/* ── Tag config ────────────────────────────────────────────────── */
const TAG = {
  quick:     { cls: "bg-emerald-50 text-emerald-600",   label: "Quick"       },
  important: { cls: "bg-amber-50   text-amber-600",     label: "Important"   },
  done:      { cls: "bg-brand-50   text-brand-500",     label: "You're live!"},
};

/* ── Component ─────────────────────────────────────────────────── */
export default function CreateCompanyGuide() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-surface-page font-jakarta">
      <div className="mx-auto max-w-[780px] px-5 py-14">

        {/* ── Back link ──────────────────────────────── */}
        <button
          onClick={() => navigate("/employers")}
          className="mb-9 inline-flex items-center gap-1.5 text-sm font-medium
                     text-text-muted hover:text-brand-500 transition-colors duration-150"
        >
          <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.5"
            strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back to For Employers
        </button>

        {/* ── Header ─────────────────────────────────── */}
        <div className="flex items-start gap-5 pb-9 mb-10 border-b border-border-subtle">
          <div className="flex h-[58px] w-[58px] shrink-0 items-center justify-center
                          rounded-2xl border-2 border-brand-200 bg-brand-50 text-[26px]">
            🏢
          </div>
          <div>
            <h1
              className="font-extrabold leading-tight tracking-tight text-text-primary mb-2"
              style={{ fontSize: "clamp(22px, 4vw, 30px)" }}
            >
              Create Your{" "}
              <span className="text-brand-500">Company</span> Workspace
            </h1>
            <p className="max-w-[460px] text-sm leading-relaxed text-text-muted">
              Set up your hiring hub on HireNexon in minutes. Post jobs, manage
              applicants, and connect with top university talent.
            </p>
            <span
              className="mt-3 inline-flex items-center gap-1.5 rounded-full
                         border border-border-base bg-surface-card
                         px-3 py-1 text-xs font-semibold text-text-muted"
            >
              <svg className="h-3 w-3 text-brand-500" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.5"
                strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              Takes about 3–5 minutes
            </span>
          </div>
        </div>

        {/* ── Section label ──────────────────────────── */}
        <p className="mb-5 text-[11px] font-bold uppercase tracking-[0.08em] text-text-muted">
          How it works — 6 simple steps
        </p>

        {/* ── Steps ──────────────────────────────────── */}
        <div className="mb-12 flex flex-col">
          {STEPS.map((step, i) => (
            <div
              key={step.num}
              className="group flex gap-5"
              style={{ paddingBottom: i < STEPS.length - 1 ? "28px" : 0 }}
            >
              {/* Track */}
              <div className="flex shrink-0 flex-col items-center pt-0.5">
                <div
                  className="relative z-10 flex h-9 w-9 items-center justify-center
                             rounded-full border-2 border-brand-200 bg-brand-50
                             text-sm font-bold text-brand-500
                             transition-all duration-200
                             group-hover:border-brand-500 group-hover:bg-brand-500
                             group-hover:text-white group-hover:shadow-fab"
                >
                  {step.num}
                </div>
                {i < STEPS.length - 1 && (
                  <div className="mt-1.5 w-0.5 flex-1 min-h-5
                                  bg-gradient-to-b from-brand-200 to-brand-50" />
                )}
              </div>

              {/* Card */}
              <div
                className="flex-1 rounded-2xl border border-border-subtle bg-surface-card
                           px-5 py-4 shadow-card
                           transition-all duration-200
                           group-hover:border-brand-200
                           group-hover:shadow-[0_4px_16px_rgba(99,102,241,0.08)]"
              >
                {/* Title + tag */}
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm font-bold text-text-primary">
                    {step.title}
                  </span>
                  <span
                    className={`ml-3 shrink-0 rounded-full px-2.5 py-0.5
                                text-[11px] font-semibold ${TAG[step.tag].cls}`}
                  >
                    {TAG[step.tag].label}
                  </span>
                </div>

                {/* Description */}
                <p className="text-sm leading-relaxed text-text-muted">
                  {step.desc}
                </p>

                {/* Role chips — step 3 only */}
                {step.chips && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {step.chips.map((chip) => (
                      <div
                        key={chip.label}
                        className={`flex items-center gap-1.5 rounded-xl border
                                    px-3 py-1.5 text-xs font-semibold transition-colors
                                    ${
                                      chip.active
                                        ? "border-brand-200 bg-brand-50 text-brand-500"
                                        : "border-border-subtle bg-surface-base text-text-secondary"
                                    }`}
                      >
                        <span className="text-sm">{chip.icon}</span>
                        {chip.label}
                        {chip.active && (
                          <span
                            className="ml-1 flex h-4 w-4 items-center justify-center
                                       rounded-full bg-brand-500 text-[9px] font-bold text-white"
                          >
                            ✓
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* ── CTA ────────────────────────────────────── */}
        <div
          className="relative overflow-hidden rounded-3xl p-10 text-center"
          style={{
            background:
              "linear-gradient(135deg, #4f46e5 0%, #6366f1 55%, #7c3aed 100%)",
          }}
        >
          {/* Decorative blobs */}
          <div className="pointer-events-none absolute -right-10 -top-10
                          h-40 w-40 rounded-full bg-white/[0.06]" />
          <div className="pointer-events-none absolute -bottom-14 -left-8
                          h-52 w-52 rounded-full bg-white/[0.04]" />

          <div className="relative z-10">
            <h2 className="mb-2 font-extrabold tracking-tight text-white"
                style={{ fontSize: "clamp(18px, 3vw, 22px)" }}>
              Ready to build your dream team?
            </h2>
            <p className="mx-auto mb-7 max-w-[400px] text-sm leading-relaxed text-white/70">
              Join 100+ growing companies already hiring smarter on HireNexon.
              <br />
              No credit card required — your first job post is free.
            </p>
            <button
              onClick={() => navigate("/signup?type=employer")}
              className="inline-flex items-center gap-2.5 rounded-xl bg-white
                         px-8 py-3.5 text-sm font-bold text-brand-600
                         shadow-[0_4px_20px_rgba(0,0,0,0.18)]
                         transition-all duration-200
                         hover:-translate-y-0.5
                         hover:shadow-[0_8px_28px_rgba(0,0,0,0.22)]
                         active:translate-y-0"
            >
              🏢 Create Company Workspace
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.5"
                strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
            <p className="mt-4 text-xs text-white/40">
              Free to get started · No credit card needed
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
