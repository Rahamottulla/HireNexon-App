// navbar/WorkspaceDropdown.jsx
import { useState, useRef, useEffect } from "react";
import { IconCheck, IconPlus, IconPersonal, IconBuilding, IconGradCap, IconChevronDown } from "./NavIcons";

// ── Workspace definitions ────────────────────────────────────────
// Colors kept as inline styles only where Tailwind can't reach
// (gradients, dynamic ring colors). Everything else is Tailwind.
export const WORKSPACES = [
  {
    id: "personal",
    label: "Personal",
    sublabel: "Your individual profile",
    path: "/candidate/create-workspace",
    Icon: IconPersonal,
    initials: "RH",
    // Tailwind color tokens
    ringTw:       "ring-brand-500/40",
    checkColor:   "text-brand-500",
    badgeTw:      "bg-brand-100 text-brand-600",
    activeBgTw:   "bg-brand-50",
    activeBdrTw:  "border-brand-200",
    hoverIconTw:  "bg-brand-100 text-brand-500",
    // Inline-only (gradients can't be done in Tailwind without arbitrary values)
    gradient: "linear-gradient(135deg,#6366f1,#818cf8)",
  },
  {
    id: "company",
    label: "Company",
    sublabel: "Corporate hiring space",
    path: "/company/create-workspace",
    Icon: IconBuilding,
    initials: "CO",
    ringTw:       "ring-sky-500/40",
    checkColor:   "text-sky-500",
    badgeTw:      "bg-sky-100 text-sky-600",
    activeBgTw:   "bg-sky-50",
    activeBdrTw:  "border-sky-200",
    hoverIconTw:  "bg-sky-100 text-sky-500",
    gradient: "linear-gradient(135deg,#0ea5e9,#38bdf8)",
  },
  {
    id: "university",
    label: "University",
    sublabel: "Campus talent gateway",
    path: "/university/create-workspace",
    Icon: IconGradCap,
    initials: "UNI",
    ringTw:       "ring-emerald-500/40",
    checkColor:   "text-emerald-500",
    badgeTw:      "bg-emerald-100 text-emerald-600",
    activeBgTw:   "bg-emerald-50",
    activeBdrTw:  "border-emerald-200",
    hoverIconTw:  "bg-emerald-100 text-emerald-500",
    gradient: "linear-gradient(135deg,#10b981,#34d399)",
  },
];

// ── Reusable avatar — gradient must be inline ────────────────────
export const WorkspaceAvatar = ({ ws, size = 34, ring = false }) => (
  <div
    style={{ width: size, height: size, background: ws.gradient, borderRadius: size * 0.28 }}
    className={`flex items-center justify-center shrink-0 font-bold text-white transition-shadow duration-200
      ${ring ? `ring-2 ${ws.ringTw}` : ""}`}
  >
    <span style={{ fontSize: size * 0.33, letterSpacing: "-0.4px" }}>{ws.initials}</span>
  </div>
);

// ── Component ────────────────────────────────────────────────────
const WorkspaceDropdown = ({ activeId, onSwitch }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const active = WORKSPACES.find(w => w.id === activeId) || WORKSPACES[0];

  useEffect(() => {
    const fn = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, []);

  return (
    <div ref={ref} className="relative shrink-0">

      {/* ── Trigger pill ──────────────────────────────────────── */}
      <button
        onClick={() => setOpen(p => !p)}
        className={`flex items-center gap-1.5 pl-1.5 pr-3 py-[5px] rounded-full border-[1.5px]
          bg-white font-jakarta text-[12.5px] font-semibold text-slate-700
          transition-all duration-200 cursor-pointer
          ${open
            ? "border-brand-500 text-brand-600 bg-brand-50"
            : "border-border-base hover:border-brand-400 hover:text-brand-600 hover:bg-brand-50"
          }`}
      >
        <WorkspaceAvatar ws={active} size={26} />
        <span className="max-w-[80px] truncate">{active.label}</span>
        <span className={`flex items-center text-slate-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}>
          <IconChevronDown size={12} />
        </span>
      </button>

      {/* ── Dropdown ──────────────────────────────────────────── */}
      {open && (
        <div className="absolute right-0 top-[calc(100%+10px)] z-50 w-72 rounded-2xl
          border border-border-subtle bg-surface-card shadow-dropdown
          animate-drop-in overflow-hidden">

          {/* Header */}
          <div className="px-4 pt-3.5 pb-2 border-b border-border-subtle">
            <p className="text-[10.5px] font-bold tracking-[0.07em] uppercase text-slate-400">
              Switch Workspace
            </p>
          </div>

          {/* List */}
          <div className="p-2.5 flex flex-col gap-0.5">
            {WORKSPACES.map((ws) => {
              const isActive = ws.id === activeId;
              return (
                <button
                  key={ws.id}
                  onClick={() => { onSwitch(ws.id); setOpen(false); }}
                  className={`flex items-center gap-3 w-full px-2.5 py-2.5 rounded-xl
                    border transition-all duration-150 text-left cursor-pointer
                    ${isActive
                      ? `${ws.activeBgTw} ${ws.activeBdrTw}`
                      : "border-transparent hover:bg-slate-50"
                    }`}
                >
                  <WorkspaceAvatar ws={ws} size={40} ring={isActive} />

                  <div className="flex-1 flex flex-col gap-0.5 min-w-0">
                    <span className="flex items-center gap-1.5 text-[13px] font-semibold text-slate-800 font-jakarta">
                      {ws.label}
                      {ws.id === "personal" && (
                        <span className={`text-[9px] font-extrabold tracking-[0.06em] uppercase
                          rounded px-1.5 py-0.5 ${ws.badgeTw}`}>
                          Default
                        </span>
                      )}
                    </span>
                    <span className="text-[11.5px] text-slate-400 truncate font-jakarta">
                      {ws.sublabel}
                    </span>
                  </div>

                  {isActive && (
                    <span className={`shrink-0 ${ws.checkColor}`}>
                      <IconCheck size={14} />
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Footer — create new */}
          <div className="px-2.5 pb-2.5 pt-0.5 border-t border-border-subtle">
            <button className="flex items-center gap-2.5 w-full px-2.5 py-2 rounded-xl
              border-[1.5px] border-dashed border-brand-200 bg-brand-50/50
              text-[13px] font-semibold text-brand-500 font-jakarta
              hover:bg-brand-50 hover:border-brand-400
              transition-all duration-150 cursor-pointer">
              <span className="w-7 h-7 rounded-lg bg-brand-100 flex items-center justify-center text-brand-500 shrink-0">
                <IconPlus size={14} />
              </span>
              Create new workspace
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkspaceDropdown;
