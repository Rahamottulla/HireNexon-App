// navbar/ProfileDropdown.jsx
import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/features/auth/context/AuthContext";
import api from "@/shared/api/axios";

import {
  IconUser, IconManage, IconSettings,
  IconShield, IconHelp, IconLogOut, IconCheck,
} from "./NavIcons";
import { WORKSPACES, WorkspaceAvatar } from "./WorkspaceDropdown";

// ── Action list ──────────────────────────────────────────────────
const ACTIONS = [
  { label: "My Profile",         path: "/candidate/my-profile",     Icon: IconUser     },
  { label: "Manage Account",     path: "/candidate/manage-account", Icon: IconManage   },
  { label: "Settings",           path: "/candidate/settings",       Icon: IconSettings },
  { label: "Privacy & Security", path: "/candidate/privacy",        Icon: IconShield   },
  { label: "Help & Support",     path: "/candidate/help",           Icon: IconHelp     },
];

// ── Component ────────────────────────────────────────────────────
const ProfileDropdown = ({ activeWorkspaceId, onSwitchWorkspace }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const navigate = useNavigate();
  const { logout } = useAuth() || {};
  const active = WORKSPACES.find(w => w.id === activeWorkspaceId) || WORKSPACES[0];

  useEffect(() => {
    const fn = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, []);

  const handleLogout = async () => {
    try { await api.post("/auth/logout"); } catch {}
    finally {
      localStorage.removeItem("token");
      sessionStorage.removeItem("token");
      logout?.();
      navigate("/login");
    }
  };

  return (
    <div ref={ref} className="relative shrink-0">

      {/* ── Avatar button ─────────────────────────────────────── */}
      <button
        onClick={() => setOpen(p => !p)}
        style={{
          background: active.gradient,
          boxShadow: open ? `0 0 0 3px ${active.id === "personal" ? "#6366f144"
            : active.id === "company" ? "#0ea5e944" : "#10b98144"}` : "none",
        }}
        className={`w-9 h-9 rounded-full border-2 border-transparent
          flex items-center justify-center text-white shrink-0 cursor-pointer
          transition-all duration-200 hover:scale-105
          ${open ? "scale-100" : ""}`}
        aria-label="Profile menu"
      >
        <IconUser size={14} />
      </button>

      {/* ── Dropdown ──────────────────────────────────────────── */}
      {open && (
        <div className="absolute right-0 top-[calc(100%+10px)] z-50 w-[288px]
          rounded-2xl border border-border-subtle bg-surface-card
          shadow-dropdown overflow-hidden animate-drop-in">

          {/* ── Banner header — gradient is inline (dynamic) ──── */}
          <div
            className="relative px-4 pt-4 pb-3.5 overflow-hidden"
            style={{ background: active.gradient }}
          >
            {/* Decorative blobs — inline because they're dynamic opacity overlays */}
            <span
              className="absolute -top-6 -right-5 w-24 h-24 rounded-full pointer-events-none"
              style={{ background: "rgba(255,255,255,0.1)" }}
            />
            <span
              className="absolute -bottom-8 left-4 w-20 h-20 rounded-full pointer-events-none"
              style={{ background: "rgba(255,255,255,0.07)" }}
            />

            {/* User info */}
            <div className="relative z-10 flex items-center gap-3">
              <div className="w-12 h-12 rounded-full flex items-center justify-center text-white shrink-0"
                style={{ background: "rgba(255,255,255,0.2)", border: "2px solid rgba(255,255,255,0.35)" }}>
                <IconUser size={22} />
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-[15px] font-bold text-white font-jakarta tracking-[-0.2px]">
                  Rahamottulla Haque
                </span>
                <span className="text-[12px] text-white/75">Full Stack Developer</span>
              </div>
            </div>

            {/* Active workspace pill */}
            <div
              className="relative z-10 mt-3 flex items-center gap-1.5 w-fit
                px-2.5 py-1 rounded-full text-[11.5px] font-semibold text-white/90 font-jakarta"
              style={{ background: "rgba(255,255,255,0.18)" }}
            >
              <span
                className="w-2 h-2 rounded-full shrink-0"
                style={{ background: active.gradient }}
              />
              {active.label} Workspace
            </div>
          </div>

          {/* ── Compact workspace switcher ────────────────────── */}
          <div className="px-3.5 pt-3 pb-2">
            <p className="text-[10.5px] font-bold tracking-[0.07em] uppercase
              text-slate-400 mb-2.5">Switch to</p>

            <div className="flex gap-1.5">
              {WORKSPACES.map(ws => {
                const isActive = ws.id === activeWorkspaceId;
                return (
                  <button
                    key={ws.id}
                    onClick={() => { onSwitchWorkspace(ws.id); setOpen(false); }}
                    className={`flex-1 flex flex-col items-center gap-1.5 py-2.5 px-1.5
                      rounded-xl border-[1.5px] cursor-pointer
                      transition-all duration-150 relative
                      ${isActive
                        ? `${ws.activeBgTw} ${ws.activeBdrTw}`
                        : "border-border-subtle bg-slate-50 hover:bg-slate-100 hover:border-slate-300"
                      }`}
                  >
                    <WorkspaceAvatar ws={ws} size={30} ring={isActive} />
                    <span className={`text-[11px] font-semibold font-jakarta
                      ${isActive ? ws.checkColor : "text-slate-500"}`}>
                      {ws.label}
                    </span>
                    {isActive && (
                      <span className={`absolute top-1 right-1.5 ${ws.checkColor}`}>
                        <IconCheck size={10} />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-border-subtle mx-3 my-1" />

          {/* ── Action links ──────────────────────────────────── */}
          <div className="px-2.5 py-1">
            {ACTIONS.map(({ label, path, Icon }) => (
              <Link
                key={label}
                to={path}
                onClick={() => setOpen(false)}
                className="flex items-center gap-2.5 px-2.5 py-2 rounded-xl
                  text-[13.5px] font-medium text-slate-600 font-jakarta
                  hover:bg-slate-100 hover:text-brand-500
                  transition-all duration-100 no-underline group"
              >
                <span className="w-8 h-8 rounded-[9px] bg-slate-100 flex items-center justify-center
                  text-slate-500 shrink-0 group-hover:bg-brand-100 group-hover:text-brand-500
                  transition-all duration-100">
                  <Icon size={15} />
                </span>
                {label}
              </Link>
            ))}
          </div>

          {/* Divider */}
          <div className="h-px bg-border-subtle mx-3 my-1" />

          {/* ── Sign out ──────────────────────────────────────── */}
          <div className="px-2.5 pb-2.5">
            <button
              onClick={handleLogout}
              className="flex items-center gap-2.5 w-full px-2.5 py-2 rounded-xl
                border-none bg-transparent cursor-pointer text-left
                text-[13.5px] font-medium text-rose-500 font-jakarta
                hover:bg-rose-50 hover:text-rose-600
                transition-all duration-100 group"
            >
              <span className="w-8 h-8 rounded-[9px] bg-rose-50 flex items-center justify-center
                text-rose-400 shrink-0 group-hover:bg-rose-100 group-hover:text-rose-600
                transition-all duration-100">
                <IconLogOut size={15} />
              </span>
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
