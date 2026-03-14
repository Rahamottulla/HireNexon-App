// frontend/src/layouts/candidate/CandidateNavbar/WorkspaceDropdown.jsx
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useWorkspaceContext } from "@/features/candidate/context/WorkspaceContext";
import useWorkspaceRedirect from "@/features/candidate/hooks/useWorkspaceRedirect";
import { IconCheck, IconPlus, IconChevronDown } from "./NavIcons";

// ── Type → visual config ─────────────────────────────────────────
const TYPE_CONFIG = {
  personal: {
    gradient:    "linear-gradient(135deg,#6366f1,#818cf8)",
    ringTw:      "ring-brand-500/40",
    checkColor:  "text-brand-500",
    badgeTw:     "bg-brand-100 text-brand-600",
    activeBgTw:  "bg-brand-50",
    activeBdrTw: "border-brand-200",
  },
  company: {
    gradient:    "linear-gradient(135deg,#0ea5e9,#38bdf8)",
    ringTw:      "ring-sky-500/40",
    checkColor:  "text-sky-500",
    badgeTw:     "bg-sky-100 text-sky-600",
    activeBgTw:  "bg-sky-50",
    activeBdrTw: "border-sky-200",
  },
  university: {
    gradient:    "linear-gradient(135deg,#10b981,#34d399)",
    ringTw:      "ring-emerald-500/40",
    checkColor:  "text-emerald-500",
    badgeTw:     "bg-emerald-100 text-emerald-600",
    activeBgTw:  "bg-emerald-50",
    activeBdrTw: "border-emerald-200",
  },
};

export const getTypeConfig = (type) => TYPE_CONFIG[type] || TYPE_CONFIG.personal;

// ── Reusable WorkspaceAvatar ─────────────────────────────────────
export const WorkspaceAvatar = ({ ws, size = 34, ring = false }) => {
  const cfg      = getTypeConfig(ws?.type);
  const initials = ws?.initials
    || ws?.name?.split(" ").map(w => w[0]).join("").slice(0, 3).toUpperCase()
    || "?";

  return (
    <div
      style={{ width: size, height: size, background: cfg.gradient, borderRadius: size * 0.28 }}
      className={`flex items-center justify-center shrink-0 font-bold text-white
        transition-shadow duration-200 ${ring ? `ring-2 ${cfg.ringTw}` : ""}`}
    >
      <span style={{ fontSize: size * 0.33, letterSpacing: "-0.4px" }}>{initials}</span>
    </div>
  );
};

// ── Component ────────────────────────────────────────────────────
const WorkspaceDropdown = () => {
  const { workspaces, activeWorkspace, switchWorkspace, loading } = useWorkspaceContext();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const { redirectTo } = useWorkspaceRedirect();

  useEffect(() => {
    const fn = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, []);

  // Nothing to show while loading or no workspace exists yet
  if (loading || !activeWorkspace) return null;

  const SHOW_MAX = 3;
  const visible  = workspaces.slice(0, SHOW_MAX);
  const hasMore  = workspaces.length > SHOW_MAX;

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
        <WorkspaceAvatar ws={activeWorkspace} size={26} />
        <span className="max-w-[80px] truncate">{activeWorkspace.name}</span>
        <span className={`flex items-center text-slate-400 transition-transform duration-200
          ${open ? "rotate-180" : ""}`}>
          <IconChevronDown size={12} />
        </span>
      </button>

      {/* ── Dropdown ──────────────────────────────────────────── */}
      {open && (
        <div className="absolute right-0 top-[calc(100%+10px)] z-50 w-72 rounded-2xl
          border border-border-subtle bg-surface-card shadow-dropdown
          animate-drop-in overflow-hidden">

          <div className="px-4 pt-3.5 pb-2 border-b border-border-subtle">
            <p className="text-[10.5px] font-bold tracking-[0.07em] uppercase text-slate-400">
              Switch Workspace
            </p>
          </div>

          {/* Real workspaces only */}
          <div className="p-2.5 flex flex-col gap-0.5">
            {visible.map((ws) => {
              const wsCfg   = getTypeConfig(ws.type);
              const isActive = activeWorkspace._id === ws._id;
              return (
                <button
                  key={ws._id}
                  onClick={() => { switchWorkspace(ws); redirectTo(ws.type); setOpen(false); }}
                  className={`flex items-center gap-3 w-full px-2.5 py-2.5 rounded-xl
                    border transition-all duration-150 text-left cursor-pointer
                    ${isActive
                      ? `${wsCfg.activeBgTw} ${wsCfg.activeBdrTw}`
                      : "border-transparent hover:bg-slate-50"
                    }`}
                >
                  <WorkspaceAvatar ws={ws} size={40} ring={isActive} />
                  <div className="flex-1 flex flex-col gap-0.5 min-w-0">
                    <span className="flex items-center gap-1.5 text-[13px] font-semibold
                      text-slate-800 font-jakarta">
                      {ws.name}
                      <span className={`text-[9px] font-extrabold tracking-[0.06em]
                        uppercase rounded px-1.5 py-0.5 ${wsCfg.badgeTw}`}>
                        {ws.type}
                      </span>
                    </span>
                    <span className="text-[11.5px] text-slate-400 truncate font-jakarta">
                      {ws.tagline || ws.type}
                    </span>
                  </div>
                  {isActive && (
                    <span className={`shrink-0 ${wsCfg.checkColor}`}>
                      <IconCheck size={14} />
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* See all — only if > 3 workspaces */}
          {hasMore && (
            <div className="px-2.5 pb-1 border-t border-border-subtle">
              <Link
                to="/candidate/workspaces"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center w-full py-2
                  text-[12.5px] font-semibold text-brand-500 font-jakarta
                  hover:text-brand-600 transition-colors no-underline"
              >
                See all workspaces ({workspaces.length}) →
              </Link>
            </div>
          )}

          {/* Create new — always */}
          <div className={`px-2.5 pb-2.5 pt-1 ${!hasMore ? "border-t border-border-subtle" : ""}`}>
            <Link
              to="/candidate/create-workspace"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2.5 w-full px-2.5 py-2 rounded-xl
                border-[1.5px] border-dashed border-brand-200 bg-brand-50/50
                text-[13px] font-semibold text-brand-500 font-jakarta
                hover:bg-brand-50 hover:border-brand-400
                transition-all duration-150 no-underline"
            >
              <span className="w-7 h-7 rounded-lg bg-brand-100 flex items-center
                justify-center text-brand-500 shrink-0">
                <IconPlus size={14} />
              </span>
              Create new workspace
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkspaceDropdown;
