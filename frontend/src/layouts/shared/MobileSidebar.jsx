// src/layouts/shared/MobileSidebar.jsx
// ─────────────────────────────────────────────────────────────
// HireNexon — Mobile Slide-in Sidebar Drawer
// Props:
//   open          bool     — controlled open state
//   onClose       () => void
//   navItems      array    — from COMPANY_NAV or UNIVERSITY_NAV
//   workspaceType string   — "company" | "university" | "candidate"
//   orgName       string
// ─────────────────────────────────────────────────────────────
import { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { WORKSPACES } from "./navConfig";

const WS_THEME = {
  company:    { accent: "#10b981", accentDim: "rgba(16,185,129,0.18)", label: "Company Workspace",    icon: "corporate_fare" },
  university: { accent: "#f59e0b", accentDim: "rgba(245,158,11,0.18)", label: "University Workspace",  icon: "account_balance" },
  candidate:  { accent: "#6366f1", accentDim: "rgba(99,102,241,0.18)",  label: "Personal Workspace",   icon: "person" },
};

const DOT_COLORS = { brand: "#6366f1", emerald: "#10b981", amber: "#f59e0b" };

function Icon({ name, size = 20 }) {
  return <span className="material-symbols-rounded" style={{ fontSize: size, lineHeight: 1, flexShrink: 0 }}>{name}</span>;
}

function MobileNavItem({ item, onClose }) {
  const location = useLocation();
  const isActive = location.pathname === item.path || location.pathname.startsWith(item.path + "/");

  return (
    <Link
      to={item.path}
      onClick={onClose}
      style={{
        display: "flex", alignItems: "center", gap: 12,
        padding: "10px 14px", borderRadius: 12, textDecoration: "none",
        background: isActive ? "linear-gradient(135deg,rgba(99,102,241,0.22),rgba(129,140,248,0.12))" : "transparent",
        color: isActive ? "#a5b4fc" : "#a8b8d0",
        fontWeight: isActive ? 600 : 500,
        fontSize: 14,
        transition: "all 0.15s",
        position: "relative",
      }}
    >
      {isActive && (
        <span style={{
          position: "absolute", left: 0, top: "20%", bottom: "20%",
          width: 3, borderRadius: "0 3px 3px 0",
          background: "linear-gradient(180deg,#6366f1,#818cf8)",
        }} />
      )}
      <div style={{
        width: 36, height: 36, borderRadius: 10, flexShrink: 0,
        display: "flex", alignItems: "center", justifyContent: "center",
        background: isActive ? "rgba(99,102,241,0.22)" : "rgba(255,255,255,0.05)",
        color: isActive ? "#a5b4fc" : "#a8b8d0",
        transition: "all 0.15s",
      }}>
        <Icon name={item.icon} size={18} />
      </div>
      <span style={{ flex: 1 }}>{item.label}</span>
      {item.badge && (
        <span style={{
          minWidth: 20, height: 18, borderRadius: 9, padding: "0 5px",
          background: isActive ? "rgba(99,102,241,0.25)" : "rgba(255,255,255,0.1)",
          fontSize: 10.5, fontWeight: 700,
          color: isActive ? "#a5b4fc" : "#7a8fad",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          {item.badge}
        </span>
      )}
    </Link>
  );
}

export default function MobileSidebar({ open, onClose, navItems = [], workspaceType = "company", orgName = "" }) {
  const theme = WS_THEME[workspaceType] || WS_THEME.company;
  const drawerRef = useRef(null);

  // Close on Escape
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape" && open) onClose(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // Prevent body scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Focus trap
  useEffect(() => {
    if (open && drawerRef.current) drawerRef.current.focus();
  }, [open]);

  return (
    <>
      {/* ── Backdrop ── */}
      <div
        onClick={onClose}
        style={{
          position: "fixed", inset: 0, zIndex: 200,
          background: "rgba(6,11,24,0.65)",
          backdropFilter: "blur(3px)",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transition: "opacity 0.28s cubic-bezier(0.4,0,0.2,1)",
        }}
        aria-hidden="true"
      />

      {/* ── Drawer ── */}
      <div
        ref={drawerRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        style={{
          position: "fixed", top: 0, left: 0, bottom: 0,
          width: 280, zIndex: 201,
          background: "#0d1425",
          display: "flex", flexDirection: "column",
          transform: open ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 0.3s cubic-bezier(0.4,0,0.2,1)",
          boxShadow: open ? "4px 0 40px rgba(0,0,0,0.45)" : "none",
          outline: "none",
        }}
      >
        {/* ── Header ── */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "14px 16px 12px",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}>
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{
              width: 32, height: 32, borderRadius: 9,
              background: "linear-gradient(135deg,#6366f1,#818cf8)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <span style={{ fontSize: 15, fontWeight: 800, color: "#fff" }}>H</span>
            </div>
            <span style={{ fontSize: 16, fontWeight: 800, color: "#e2e8f0", letterSpacing: "-0.02em" }}>
              Hire<span style={{ color: "#818cf8" }}>Nexon</span>
            </span>
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            style={{
              width: 32, height: 32, borderRadius: 8,
              background: "rgba(255,255,255,0.06)",
              border: "none", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "#7a8fad", transition: "all 0.15s",
            }}
            aria-label="Close menu"
          >
            <Icon name="close" size={18} />
          </button>
        </div>

        {/* ── Org identity ── */}
        <div style={{
          display: "flex", alignItems: "center", gap: 10,
          padding: "12px 16px",
          background: "rgba(255,255,255,0.02)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}>
          <div style={{
            width: 40, height: 40, borderRadius: 10, flexShrink: 0,
            background: theme.accentDim,
            border: `1.5px solid ${theme.accent}33`,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <Icon name={theme.icon} size={20} />
          </div>
          <div>
            <div style={{ fontSize: 13.5, fontWeight: 700, color: "#e2e8f0" }}>{orgName || "Your Organization"}</div>
            <div style={{ fontSize: 11, fontWeight: 600, color: theme.accent, marginTop: 1 }}>{theme.label}</div>
          </div>
        </div>

        {/* ── Nav sections (scrollable) ── */}
        <div style={{ flex: 1, overflowY: "auto", padding: "8px 8px 0" }}>
          {navItems.map(section => (
            <div key={section.section} style={{ marginBottom: 4 }}>
              <div style={{
                padding: "8px 14px 4px",
                fontSize: 10, fontWeight: 700, color: "#546080",
                textTransform: "uppercase", letterSpacing: "0.1em",
              }}>
                {section.section}
              </div>
              {section.items.map(item => (
                <MobileNavItem key={item.path} item={item} onClose={onClose} />
              ))}
            </div>
          ))}
        </div>

        {/* ── Workspace switcher ── */}
        <div style={{
          padding: "12px 8px",
          borderTop: "1px solid rgba(255,255,255,0.06)",
        }}>
          <div style={{ padding: "4px 14px 8px", fontSize: 10, fontWeight: 700, color: "#546080", textTransform: "uppercase", letterSpacing: "0.1em" }}>
            Switch Workspace
          </div>
          {WORKSPACES.map(ws => (
            <Link
              key={ws.label}
              to={ws.path}
              onClick={onClose}
              style={{
                display: "flex", alignItems: "center", gap: 10,
                padding: "9px 14px", borderRadius: 10, textDecoration: "none",
                color: "#a8b8d0", fontSize: 13.5, fontWeight: 500,
                transition: "background 0.15s",
              }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.05)"}
              onMouseLeave={e => e.currentTarget.style.background = "transparent"}
            >
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: DOT_COLORS[ws.dot], flexShrink: 0 }} />
              {ws.label}
            </Link>
          ))}
        </div>

        {/* ── Footer ── */}
        <div style={{
          padding: "10px 16px 20px",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          display: "flex", flexDirection: "column", gap: 8,
        }}>
          <div style={{
            padding: "10px 12px", borderRadius: 12,
            background: "rgba(99,102,241,0.1)",
            border: "1px solid rgba(99,102,241,0.15)",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Icon name="auto_awesome" size={18} />
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: "#c7d2fe" }}>Nexon AI</div>
                <div style={{ fontSize: 10.5, color: "#7a8fad" }}>Upgrade for AI features</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
