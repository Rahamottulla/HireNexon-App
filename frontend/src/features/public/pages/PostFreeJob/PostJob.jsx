import { useState } from "react";
import { createJob } from "../services/companyJobs.api";

// ── Icons (inline SVG to avoid import deps) ──────────────────────────────────
const Icon = ({ d, size = 18, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
    className={className}>
    <path d={d} />
  </svg>
);

const ICONS = {
  briefcase: "M20 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2",
  location:  "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z",
  dollar:    "M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6",
  clock:     "M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zM12 6v6l4 2",
  users:     "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75",
  check:     "M20 6 9 17l-5-5",
  plus:      "M12 5v14M5 12h14",
  x:         "M18 6 6 18M6 6l12 12",
  arrow:     "M5 12h14M12 5l7 7-7 7",
  sparkle:   "M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3zM5 17l.75 2.25L8 20l-2.25.75L5 23l-.75-2.25L2 20l2.25-.75L5 17zM19 3l.75 2.25L22 6l-2.25.75L19 9l-.75-2.25L16 6l2.25-.75L19 3z",
};

// ── Constants ─────────────────────────────────────────────────────────────────
const JOB_TYPES     = ["Full-Time", "Part-Time", "Contract", "Internship", "Freelance"];
const WORK_MODES    = ["On-Site", "Remote", "Hybrid"];
const EXP_LEVELS    = ["Fresher (0–1 yr)", "Junior (1–3 yrs)", "Mid (3–5 yrs)", "Senior (5–8 yrs)", "Lead (8+ yrs)"];
const SALARY_TYPES  = ["Monthly", "Annual", "Hourly", "Fixed (Project)"];
const CURRENCIES    = ["INR ₹", "USD $", "EUR €", "GBP £"];
const POPULAR_SKILLS = [
  "React", "Node.js", "Python", "Java", "TypeScript", "MongoDB",
  "AWS", "Docker", "Figma", "SQL", "Machine Learning", "Next.js",
  "Flutter", "Kotlin", "Swift", "GraphQL", "Redis", "Kubernetes",
];

const STEPS = [
  { id: 1, label: "Basics",       icon: "briefcase" },
  { id: 2, label: "Details",      icon: "users"     },
  { id: 3, label: "Compensation", icon: "dollar"    },
  { id: 4, label: "Preview",      icon: "sparkle"   },
];

const EMPTY_FORM = {
  title: "", department: "", jobType: "", workMode: "", location: "",
  experienceLevel: "", openings: "1",
  salaryMin: "", salaryMax: "", salaryType: "Monthly", currency: "INR ₹", isNegotiable: false, hideSalary: false,
  description: "", responsibilities: "", requirements: "",
  skills: [], customSkill: "",
  applicationDeadline: "", urgentHiring: false,
};

// ── Sub-components ─────────────────────────────────────────────────────────────

const Label = ({ children, required }) => (
  <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">
    {children}{required && <span className="text-rose-500 ml-0.5">*</span>}
  </label>
);

const Input = ({ className = "", ...props }) => (
  <input
    className={`w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5
      text-[13.5px] text-slate-800 placeholder:text-slate-400
      focus:outline-none focus:border-brand-500 focus:bg-white focus:ring-2 focus:ring-brand-500/10
      transition-all duration-150 ${className}`}
    {...props}
  />
);

const Textarea = ({ className = "", ...props }) => (
  <textarea
    className={`w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5
      text-[13.5px] text-slate-800 placeholder:text-slate-400 resize-none
      focus:outline-none focus:border-brand-500 focus:bg-white focus:ring-2 focus:ring-brand-500/10
      transition-all duration-150 ${className}`}
    {...props}
  />
);

const Select = ({ children, className = "", ...props }) => (
  <select
    className={`w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5
      text-[13.5px] text-slate-800
      focus:outline-none focus:border-brand-500 focus:bg-white focus:ring-2 focus:ring-brand-500/10
      transition-all duration-150 appearance-none cursor-pointer ${className}`}
    {...props}
  >{children}</select>
);

const PillToggle = ({ options, value, onChange }) => (
  <div className="flex flex-wrap gap-2">
    {options.map(opt => (
      <button key={opt} type="button"
        onClick={() => onChange(opt)}
        className={`px-3.5 py-1.5 rounded-full text-[12.5px] font-semibold border transition-all duration-150
          ${value === opt
            ? "bg-brand-500 border-brand-500 text-white shadow-sm shadow-brand-500/30"
            : "bg-white border-slate-200 text-slate-600 hover:border-brand-400 hover:text-brand-500"}`}>
        {opt}
      </button>
    ))}
  </div>
);

const Toggle = ({ checked, onChange, label }) => (
  <label className="flex items-center gap-2.5 cursor-pointer select-none group">
    <div onClick={onChange}
      className={`relative w-10 h-5 rounded-full transition-colors duration-200
        ${checked ? "bg-brand-500" : "bg-slate-200"}`}>
      <span className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200
        ${checked ? "translate-x-5" : "translate-x-0"}`} />
    </div>
    <span className="text-[13px] text-slate-600 font-medium group-hover:text-slate-800 transition-colors">{label}</span>
  </label>
);

// ── Step components ────────────────────────────────────────────────────────────

const Step1Basics = ({ form, set }) => (
  <div className="space-y-5">
    <div>
      <Label required>Job Title</Label>
      <Input placeholder="e.g. Senior Frontend Engineer" value={form.title}
        onChange={e => set("title", e.target.value)} />
    </div>
    <div className="grid grid-cols-2 gap-4">
      <div>
        <Label>Department</Label>
        <Input placeholder="e.g. Engineering" value={form.department}
          onChange={e => set("department", e.target.value)} />
      </div>
      <div>
        <Label required>No. of Openings</Label>
        <Input type="number" min="1" placeholder="1" value={form.openings}
          onChange={e => set("openings", e.target.value)} />
      </div>
    </div>
    <div>
      <Label required>Job Type</Label>
      <PillToggle options={JOB_TYPES} value={form.jobType} onChange={v => set("jobType", v)} />
    </div>
    <div>
      <Label required>Work Mode</Label>
      <PillToggle options={WORK_MODES} value={form.workMode} onChange={v => set("workMode", v)} />
    </div>
    <div>
      <Label required>Location</Label>
      <Input placeholder="e.g. Bangalore, India" value={form.location}
        onChange={e => set("location", e.target.value)} />
    </div>
    <div>
      <Label required>Application Deadline</Label>
      <Input type="date" value={form.applicationDeadline}
        onChange={e => set("applicationDeadline", e.target.value)} />
    </div>
    <Toggle checked={form.urgentHiring} onChange={() => set("urgentHiring", !form.urgentHiring)}
      label="Mark as Urgent Hiring 🔥" />
  </div>
);

const Step2Details = ({ form, set }) => {
  const addSkill = (skill) => {
    if (!form.skills.includes(skill)) set("skills", [...form.skills, skill]);
  };
  const removeSkill = (skill) => set("skills", form.skills.filter(s => s !== skill));
  const addCustom = () => {
    const s = form.customSkill.trim();
    if (s && !form.skills.includes(s)) {
      set("skills", [...form.skills, s]);
      set("customSkill", "");
    }
  };

  return (
    <div className="space-y-5">
      <div>
        <Label required>Experience Level</Label>
        <PillToggle options={EXP_LEVELS} value={form.experienceLevel}
          onChange={v => set("experienceLevel", v)} />
      </div>
      <div>
        <Label required>Job Description</Label>
        <Textarea rows={4} placeholder="Describe the role, team, and impact…"
          value={form.description} onChange={e => set("description", e.target.value)} />
      </div>
      <div>
        <Label>Key Responsibilities</Label>
        <Textarea rows={3} placeholder="• Lead the frontend architecture…&#10;• Collaborate with designers…"
          value={form.responsibilities} onChange={e => set("responsibilities", e.target.value)} />
      </div>
      <div>
        <Label>Requirements</Label>
        <Textarea rows={3} placeholder="• 3+ years of React experience…&#10;• Strong problem-solving skills…"
          value={form.requirements} onChange={e => set("requirements", e.target.value)} />
      </div>
      <div>
        <Label>Required Skills</Label>
        {/* Selected skills */}
        {form.skills.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {form.skills.map(s => (
              <span key={s} className="flex items-center gap-1 px-3 py-1 rounded-full bg-brand-50 border border-brand-200 text-brand-600 text-[12px] font-semibold">
                {s}
                <button type="button" onClick={() => removeSkill(s)}
                  className="ml-0.5 hover:text-rose-500 transition-colors">
                  <Icon d={ICONS.x} size={12} />
                </button>
              </span>
            ))}
          </div>
        )}
        {/* Popular skills */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {POPULAR_SKILLS.filter(s => !form.skills.includes(s)).map(s => (
            <button key={s} type="button" onClick={() => addSkill(s)}
              className="flex items-center gap-1 px-3 py-1 rounded-full bg-slate-100 border border-slate-200
                text-slate-500 text-[12px] font-medium hover:bg-brand-50 hover:border-brand-300 hover:text-brand-600 transition-all">
              <Icon d={ICONS.plus} size={11} />
              {s}
            </button>
          ))}
        </div>
        {/* Custom skill */}
        <div className="flex gap-2">
          <Input placeholder="Add custom skill…" value={form.customSkill}
            onChange={e => set("customSkill", e.target.value)}
            onKeyDown={e => e.key === "Enter" && (e.preventDefault(), addCustom())} />
          <button type="button" onClick={addCustom}
            className="px-4 rounded-xl bg-brand-500 text-white text-[13px] font-semibold hover:bg-brand-600 transition-colors whitespace-nowrap">
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

const Step3Compensation = ({ form, set }) => (
  <div className="space-y-5">
    <div>
      <Label>Salary Type</Label>
      <PillToggle options={SALARY_TYPES} value={form.salaryType} onChange={v => set("salaryType", v)} />
    </div>
    <div>
      <Label>Currency</Label>
      <PillToggle options={CURRENCIES} value={form.currency} onChange={v => set("currency", v)} />
    </div>
    <div className="grid grid-cols-2 gap-4">
      <div>
        <Label>Min Salary</Label>
        <Input type="number" placeholder="e.g. 50000" value={form.salaryMin}
          onChange={e => set("salaryMin", e.target.value)} />
      </div>
      <div>
        <Label>Max Salary</Label>
        <Input type="number" placeholder="e.g. 100000" value={form.salaryMax}
          onChange={e => set("salaryMax", e.target.value)} />
      </div>
    </div>
    <div className="space-y-3 pt-1">
      <Toggle checked={form.isNegotiable} onChange={() => set("isNegotiable", !form.isNegotiable)}
        label="Salary is negotiable" />
      <Toggle checked={form.hideSalary} onChange={() => set("hideSalary", !form.hideSalary)}
        label="Hide salary from candidates" />
    </div>

    {/* Salary preview card */}
    {(form.salaryMin || form.salaryMax) && (
      <div className="rounded-2xl bg-gradient-to-br from-brand-50 to-violet-50 border border-brand-100 p-4">
        <p className="text-[11px] font-bold uppercase tracking-widest text-brand-400 mb-1">Salary Preview</p>
        <p className="text-[22px] font-bold text-brand-600">
          {form.currency.split(" ")[1]}{form.salaryMin ? Number(form.salaryMin).toLocaleString() : "—"}
          {form.salaryMax ? ` – ${form.currency.split(" ")[1]}${Number(form.salaryMax).toLocaleString()}` : "+"}
        </p>
        <p className="text-[12px] text-brand-400 mt-0.5">
          {form.salaryType} {form.isNegotiable ? "· Negotiable" : ""} {form.hideSalary ? "· Hidden from candidates" : ""}
        </p>
      </div>
    )}
  </div>
);

const PreviewRow = ({ label, value }) => value ? (
  <div className="flex justify-between items-start gap-4 py-2.5 border-b border-slate-100 last:border-0">
    <span className="text-[12px] font-semibold text-slate-400 uppercase tracking-wide min-w-[120px]">{label}</span>
    <span className="text-[13.5px] text-slate-700 font-medium text-right">{value}</span>
  </div>
) : null;

const Step4Preview = ({ form }) => {
  const salaryStr = form.hideSalary ? "Hidden" :
    form.salaryMin || form.salaryMax
      ? `${form.currency.split(" ")[1]}${Number(form.salaryMin||0).toLocaleString()} – ${form.currency.split(" ")[1]}${Number(form.salaryMax||0).toLocaleString()} / ${form.salaryType}`
      : "Not specified";

  return (
    <div className="space-y-5">
      {/* Header card */}
      <div className="rounded-2xl bg-gradient-to-br from-navy-900 to-navy-800 p-5 text-white">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-[20px] font-bold">{form.title || "Untitled Job"}</h3>
            <p className="text-navy-300 text-[13px] mt-0.5">{form.department || "No Department"}</p>
          </div>
          {form.urgentHiring && (
            <span className="px-2.5 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300 text-[11px] font-bold">
              🔥 URGENT
            </span>
          )}
        </div>
        <div className="flex flex-wrap gap-2 mt-4">
          {[form.jobType, form.workMode, form.experienceLevel].filter(Boolean).map(tag => (
            <span key={tag} className="px-2.5 py-1 rounded-full bg-white/10 text-white/80 text-[12px] font-medium">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Details */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4">
        <PreviewRow label="Location"    value={form.location} />
        <PreviewRow label="Openings"    value={form.openings} />
        <PreviewRow label="Salary"      value={salaryStr} />
        <PreviewRow label="Deadline"    value={form.applicationDeadline} />
      </div>

      {/* Skills */}
      {form.skills.length > 0 && (
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-3">Required Skills</p>
          <div className="flex flex-wrap gap-1.5">
            {form.skills.map(s => (
              <span key={s} className="px-3 py-1 rounded-full bg-brand-50 border border-brand-200 text-brand-600 text-[12px] font-semibold">
                {s}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Description */}
      {form.description && (
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-2">Description</p>
          <p className="text-[13.5px] text-slate-600 leading-relaxed whitespace-pre-line">{form.description}</p>
        </div>
      )}
    </div>
  );
};

// ── Main Component ─────────────────────────────────────────────────────────────
export default function PostJobForm({ onSuccess, onCancel }) {
  const [step, setStep]       = useState(1);
  const [form, setForm]       = useState(EMPTY_FORM);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");
  const [success, setSuccess] = useState(false);

  const set = (key, value) => setForm(f => ({ ...f, [key]: value }));

  const canNext = () => {
    if (step === 1) return form.title && form.jobType && form.workMode && form.location;
    if (step === 2) return form.description && form.experienceLevel;
    return true;
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    try {
      const payload = {
        title:              form.title,
        department:         form.department,
        jobType:            form.jobType,
        workMode:           form.workMode,
        location:           form.location,
        experienceLevel:    form.experienceLevel,
        openings:           Number(form.openings),
        description:        form.description,
        responsibilities:   form.responsibilities,
        requirements:       form.requirements,
        skills:             form.skills,
        salary: {
          min:          form.salaryMin ? Number(form.salaryMin) : null,
          max:          form.salaryMax ? Number(form.salaryMax) : null,
          type:         form.salaryType,
          currency:     form.currency,
          isNegotiable: form.isNegotiable,
          isHidden:     form.hideSalary,
        },
        applicationDeadline: form.applicationDeadline || null,
        urgentHiring:        form.urgentHiring,
      };
      await createJob(payload);
      setSuccess(true);
      setTimeout(() => onSuccess?.(), 1800);
    } catch (err) {
      setError(err?.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ── Success state ──────────────────────────────────────────────────────────
  if (success) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
        <div className="w-16 h-16 rounded-full bg-emerald-50 border-2 border-emerald-200 flex items-center justify-center mb-4 animate-bounce">
          <Icon d={ICONS.check} size={28} className="text-emerald-500" />
        </div>
        <h3 className="text-[20px] font-bold text-slate-800 mb-1">Job Posted Successfully!</h3>
        <p className="text-[13.5px] text-slate-500">Your job listing is now live and visible to candidates.</p>
      </div>
    );
  }

  // ── Main render ────────────────────────────────────────────────────────────
  return (
    <div className="flex flex-col h-full max-h-[90vh] bg-white rounded-3xl overflow-hidden shadow-2xl w-full max-w-[560px] mx-auto">

      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 shrink-0">
        <div>
          <h2 className="text-[17px] font-bold text-slate-900">Post a New Job</h2>
          <p className="text-[12px] text-slate-400 mt-0.5">Step {step} of {STEPS.length}</p>
        </div>
        {onCancel && (
          <button onClick={onCancel}
            className="w-8 h-8 flex items-center justify-center rounded-xl text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-all">
            <Icon d={ICONS.x} size={16} />
          </button>
        )}
      </div>

      {/* Step indicator */}
      <div className="flex px-6 py-3 gap-2 border-b border-slate-100 shrink-0">
        {STEPS.map((s, i) => (
          <div key={s.id} className="flex items-center gap-1 flex-1 min-w-0">
            <button
              type="button"
              onClick={() => s.id < step && setStep(s.id)}
              className={`flex items-center gap-1.5 shrink-0 transition-all duration-200
                ${s.id < step ? "cursor-pointer" : "cursor-default"}`}>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold transition-all duration-200
                ${step === s.id ? "bg-brand-500 text-white shadow-sm shadow-brand-500/40 scale-110"
                  : s.id < step  ? "bg-emerald-500 text-white"
                  : "bg-slate-100 text-slate-400"}`}>
                {s.id < step ? <Icon d={ICONS.check} size={12} /> : s.id}
              </div>
              <span className={`text-[11.5px] font-semibold hidden sm:block transition-colors duration-200
                ${step === s.id ? "text-brand-500" : s.id < step ? "text-emerald-500" : "text-slate-400"}`}>
                {s.label}
              </span>
            </button>
            {i < STEPS.length - 1 && (
              <div className={`flex-1 h-px mx-1 transition-colors duration-300
                ${s.id < step ? "bg-emerald-300" : "bg-slate-200"}`} />
            )}
          </div>
        ))}
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto px-6 py-5">
        {step === 1 && <Step1Basics    form={form} set={set} />}
        {step === 2 && <Step2Details   form={form} set={set} />}
        {step === 3 && <Step3Compensation form={form} set={set} />}
        {step === 4 && <Step4Preview   form={form} />}

        {error && (
          <div className="mt-4 rounded-xl bg-rose-50 border border-rose-200 px-4 py-3 text-[13px] text-rose-600 font-medium">
            {error}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100 bg-slate-50/60 shrink-0">
        <button type="button"
          onClick={() => step > 1 ? setStep(s => s - 1) : onCancel?.()}
          className="px-4 py-2 rounded-xl text-[13px] font-semibold text-slate-500 hover:bg-slate-200 hover:text-slate-800 transition-all">
          {step === 1 ? "Cancel" : "← Back"}
        </button>

        <div className="flex items-center gap-2">
          {/* Progress dots */}
          <div className="flex gap-1 mr-2">
            {STEPS.map(s => (
              <div key={s.id} className={`rounded-full transition-all duration-300
                ${step === s.id ? "w-4 h-1.5 bg-brand-500" : s.id < step ? "w-1.5 h-1.5 bg-emerald-400" : "w-1.5 h-1.5 bg-slate-300"}`} />
            ))}
          </div>

          {step < 4 ? (
            <button type="button"
              onClick={() => setStep(s => s + 1)}
              disabled={!canNext()}
              className={`flex items-center gap-1.5 px-5 py-2 rounded-xl text-[13px] font-bold transition-all duration-150
                ${canNext()
                  ? "bg-brand-500 text-white hover:bg-brand-600 shadow-sm shadow-brand-500/30 hover:shadow-brand-500/50"
                  : "bg-slate-200 text-slate-400 cursor-not-allowed"}`}>
              Continue
              <Icon d={ICONS.arrow} size={14} />
            </button>
          ) : (
            <button type="button"
              onClick={handleSubmit}
              disabled={loading}
              className="flex items-center gap-1.5 px-5 py-2 rounded-xl text-[13px] font-bold
                bg-brand-500 text-white hover:bg-brand-600 shadow-sm shadow-brand-500/30
                disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-150">
              {loading ? (
                <>
                  <span className="w-3.5 h-3.5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                  Posting…
                </>
              ) : (
                <>
                  <Icon d={ICONS.sparkle} size={14} />
                  Post Job
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
