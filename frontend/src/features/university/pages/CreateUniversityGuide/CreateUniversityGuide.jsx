// frontend/src/features/university/pages/CreateUniversityGuide/CreateUniversityGuide.jsx
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
          "Create University Workspace"
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
          official university email
        </strong>
        , and a secure{" "}
        <strong className="font-semibold text-text-primary">password</strong>.
        These become your placement cell admin login.
      </>
    ),
  },
  {
    num: 3,
    title: "Select Your Role",
    tag: "important",
    desc: "During signup you'll be asked to pick a role — selecting University activates your placement cell tools, student management, and campus drive features.",
    chips: [
      { label: "Candidate",  icon: "🎯", active: false },
      { label: "Employer",   icon: "🏢", active: false },
      { label: "University", icon: "🎓", active: true  },
    ],
  },
  {
    num: 4,
    title: "Verify Your Email",
    tag: "important",
    desc: (
      <>
        We send a verification link to your inbox. Click it to confirm your
        account. Check your spam folder if you don't see it within a minute.
      </>
    ),
  },
  {
    num: 5,
    title: "Set Up University Profile",
    tag: "important",
    desc: (
      <>
        Upload your{" "}
        <strong className="font-semibold text-text-primary">
          institution logo
        </strong>
        , add your{" "}
        <strong className="font-semibold text-text-primary">
          university name
        </strong>
        , location, and placement cell details. This is what hiring companies
        see when browsing partner universities.
      </>
    ),
  },
  {
    num: 6,
    title: "Empower Your Placements 🎉",
    tag: "done",
    desc: "Your placement workspace is live! Invite students, schedule campus drives, track every offer, and view real-time placement analytics.",
    features: [
      { icon: "📊", title: "Placement Analytics", sub: "Students placed, avg. package" },
      { icon: "🏕️", title: "Campus Drives",       sub: "Schedule & manage drives"     },
      { icon: "👥", title: "Student Pipeline",    sub: "Track every application"      },
      { icon: "🤝", title: "Company Connect",     sub: "100+ hiring partners"         },
    ],
  },
];

/* ── Tag config ────────────────────────────────────────────────── */
const TAG = {
  quick:     { cls: "bg-emerald-50 text-emerald-600",   label: "Quick"       },
  important: { cls: "bg-amber-50   text-amber-600",     label: "Important"   },
  done:      { cls: "bg-emerald-50 text-emerald-600",   label: "You're live!"},
};

/* ── Component ─────────────────────────────────────────────────── */
export default function CreateUniversityWorkspace() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-surface-page font-jakarta">
      <div className="mx-auto max-w-[780px] px-5 py-14">

        {/* ── Back link ──────────────────────────────── */}
        <button
          onClick={() => navigate("/universities")}
          className="mb-9 inline-flex items-center gap-1.5 text-sm font-medium
                     text-text-muted hover:text-emerald-600 transition-colors duration-150"
        >
          <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.5"
            strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back to For Universities
        </button>

        {/* ── Header ─────────────────────────────────── */}
        <div className="flex items-start gap-5 pb-9 mb-10 border-b border-border-subtle">
          <div className="flex h-[58px] w-[58px] shrink-0 items-center justify-center
                          rounded-2xl border-2 border-emerald-200 bg-emerald-50 text-[26px]">
            🎓
          </div>
          <div>
            <h1
              className="font-extrabold leading-tight tracking-tight text-text-primary mb-2"
              style={{ fontSize: "clamp(22px, 4vw, 30px)" }}
            >
              Create Your{" "}
              <span className="text-emerald-600">University</span> Workspace
            </h1>
            <p className="max-w-[460px] text-sm leading-relaxed text-text-muted">
              Set up your placement cell on HireNexon in minutes. Track
              students, manage campus drives, and connect with 100+ hiring
              companies.
            </p>
            <span
              className="mt-3 inline-flex items-center gap-1.5 rounded-full
                         border border-border-base bg-surface-card
                         px-3 py-1 text-xs font-semibold text-text-muted"
            >
              <svg className="h-3 w-3 text-emerald-600" viewBox="0 0 24 24" fill="none"
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
                             rounded-full border-2 border-emerald-200 bg-emerald-50
                             text-sm font-bold text-emerald-600
                             transition-all duration-200
                             group-hover:border-emerald-500 group-hover:bg-emerald-500
                             group-hover:text-white
                             group-hover:shadow-[0_4px_14px_rgba(5,150,105,0.35)]"
                >
                  {step.num}
                </div>
                {i < STEPS.length - 1 && (
                  <div className="mt-1.5 w-0.5 flex-1 min-h-5
                                  bg-gradient-to-b from-emerald-200 to-emerald-50" />
                )}
              </div>

              {/* Card */}
              <div
                className="flex-1 rounded-2xl border border-border-subtle bg-surface-card
                           px-5 py-4 shadow-card
                           transition-all duration-200
                           group-hover:border-emerald-200
                           group-hover:shadow-[0_4px_16px_rgba(5,150,105,0.08)]"
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
                                        ? "border-emerald-200 bg-emerald-50 text-emerald-600"
                                        : "border-border-subtle bg-surface-base text-text-secondary"
                                    }`}
                      >
                        <span className="text-sm">{chip.icon}</span>
                        {chip.label}
                        {chip.active && (
                          <span
                            className="ml-1 flex h-4 w-4 items-center justify-center
                                       rounded-full bg-emerald-500 text-[9px] font-bold text-white"
                          >
                            ✓
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Features grid — last step only */}
                {step.features && (
                  <div className="mt-4 grid grid-cols-2 gap-2.5">
                    {step.features.map((f) => (
                      <div
                        key={f.title}
                        className="flex items-start gap-2.5 rounded-xl
                                   bg-surface-base px-3 py-2.5"
                      >
                        <span className="mt-0.5 shrink-0 text-base">{f.icon}</span>
                        <div>
                          <p className="text-xs font-semibold text-text-primary">
                            {f.title}
                          </p>
                          <p className="text-xs text-text-muted">{f.sub}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* ── CTA — matches /universities landing page style ── */}
        <div
          className="relative overflow-hidden rounded-3xl px-10 py-14 text-center"
          style={{
            background:
              "linear-gradient(135deg, #059669 0%, #10b981 50%, #0d9488 100%)",
          }}
        >
          {/* Same decorative blobs as landing page */}
          <div className="pointer-events-none absolute -right-16 -top-16
                          h-64 w-64 rounded-full bg-white/[0.05]" />
          <div className="pointer-events-none absolute -bottom-20 -left-12
                          h-72 w-72 rounded-full bg-white/[0.04]" />

          <div className="relative z-10">
            {/* Badge — same as landing page pill */}
            <div className="mb-5 inline-flex items-center gap-2 rounded-full
                            border border-white/20 bg-white/10 px-4 py-1.5
                            text-xs font-bold uppercase tracking-widest text-white/80">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-200" />
              Start Digitising Today
            </div>

            {/* Big heading — same weight & size as landing page */}
            <h2 className="mb-4 font-extrabold leading-tight tracking-tight text-white"
                style={{ fontSize: "clamp(26px, 4vw, 38px)" }}>
              Ready to Digitize Your<br />Placement Process Today?
            </h2>

            <p className="mx-auto mb-8 max-w-[420px] text-base leading-relaxed text-white/70">
              Create your university workspace in minutes and bring your entire
              placement cell online.
            </p>

            {/* Two-button row — identical to landing page */}
            <div className="flex flex-wrap items-center justify-center gap-4 mb-5">
              <button
                onClick={() => navigate("/signup?type=university")}
                className="inline-flex items-center gap-2 rounded-xl bg-white
                           px-7 py-3.5 text-sm font-bold text-emerald-800
                           shadow-[0_4px_20px_rgba(0,0,0,0.18)]
                           transition-all duration-200
                           hover:-translate-y-0.5
                           hover:shadow-[0_8px_28px_rgba(0,0,0,0.22)]
                           active:translate-y-0"
              >
                Create University Workspace
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2.5"
                  strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Trust notes — same ✓ style as landing page */}
            <p className="text-xs text-white/50">
              ✓ No credit card required for Starter Plan &nbsp;·&nbsp; ✓ Setup in under 5 minutes
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
