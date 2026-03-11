// src/layouts/shared/Navbar.jsx
// ─────────────────────────────────────────────────────────────
// HireNexon — Universal Navbar
// Used by: CompanyLayout, UniversityLayout, CandidateLayout
// Props:
//   onMenuClick     () => void   — toggles mobile sidebar
//   onSidebarToggle () => void   — toggles desktop sidebar collapse
//   workspaceType   string       — "candidate" | "company" | "university"
//   currentPath     string       — active route
// ─────────────────────────────────────────────────────────────
import { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { NAVBAR_ITEMS, WORKSPACES } from "./navConfig";

// ── Workspace accent map ─────────────────────────────────────
const WS_CONFIG = {
  candidate:  { label: "Personal",    color: "#6366f1", bg: "rgba(99,102,241,0.12)",  border: "rgba(99,102,241,0.3)"  },
  company:    { label: "Company",     color: "#10b981", bg: "rgba(16,185,129,0.12)",  border: "rgba(16,185,129,0.3)"  },
  university: { label: "University",  color: "#f59e0b", bg: "rgba(245,158,11,0.12)",  border: "rgba(245,158,11,0.3)"  },
};

const DOT_COLORS = { brand: "#6366f1", emerald: "#10b981", amber: "#f59e0b" };

// ── Tiny sub-components ──────────────────────────────────────
function NavIcon({ icon, size = 22 }) {
  return <span className="material-symbols-rounded" style={{ fontSize: size, lineHeight: 1 }}>{icon}</span>;
}

function NavBadge({ count }) {
  if (!count) return null;
  return (
    <span style={{
      position: "absolute", top: 2, right: 2,
      minWidth: 16, height: 16, borderRadius: 8,
      background: "#f43f5e", border: "2px solid #fff",
      fontSize: 9, fontWeight: 700, color: "#fff",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "0 3px", lineHeight: 1,
    }}>
      {count > 99 ? "99+" : count}
    </span>
  );
}

// ── Workspace Switcher Dropdown ──────────────────────────────
function WorkspaceSwitcher({ workspaceType }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const navigate = useNavigate();
  const ws = WS_CONFIG[workspaceType] || WS_CONFIG.candidate;

  useEffect(() => {
    function handleClick(e) { if (ref.current && !ref.current.contains(e.target)) setOpen(false); }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button
        onClick={() => setOpen(v => !v)}
        style={{
          display: "flex", alignItems: "center", gap: 6,
          padding: "5px 10px 5px 8px", borderRadius: 10,
          border: `1.5px solid ${ws.border}`,
          background: ws.bg, cursor: "pointer",
          fontSize: 12.5, fontWeight: 600, color: ws.color,
          transition: "all 0.18s",
        }}
      >
        <span className="material-symbols-rounded" style={{ fontSize: 16, color: ws.color }}>corporate_fare</span>
        {ws.label}
        <span className="material-symbols-rounded" style={{ fontSize: 15, transition: "transform 0.2s", transform: open ? "rotate(180deg)" : "none" }}>expand_more</span>
      </button>

      {open && (
        <div className="hn-dropdown" style={{ minWidth: 230, top: "calc(100% + 8px)" }}>
          <div style={{ padding: "8px 14px 6px", fontSize: 10.5, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.08em" }}>
            Switch Workspace
          </div>
          {WORKSPACES.map(ws => (
            <button
              key={ws.label}
              onClick={() => { navigate(ws.path); setOpen(false); }}
              className="hn-drop-item"
              style={{ display: "flex", alignItems: "center", gap: 10, width: "100%", textAlign: "left" }}
            >
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: DOT_COLORS[ws.dot], flexShrink: 0 }} />
              {ws.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Profile Dropdown ─────────────────────────────────────────
function ProfileDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    function handleClick(e) { if (ref.current && !ref.current.contains(e.target)) setOpen(false); }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const items = [
    { label: "My Profile",        icon: "person",          path: "/profile" },
    { label: "Account Settings",  icon: "manage_accounts", path: "/settings" },
    { label: "Nexon CV",          icon: "description",     path: "/cv",      badge: "AI" },
    { divider: true },
    { label: "Help Center",       icon: "help_outline",    path: "/help" },
    { label: "Sign Out",          icon: "logout",          path: "/logout",  danger: true },
  ];

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button onClick={() => setOpen(v => !v)} style={{
        width: 36, height: 36, borderRadius: "50%",
        background: "linear-gradient(135deg,#6366f1,#818cf8)",
        border: open ? "2.5px solid #6366f1" : "2.5px solid transparent",
        cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 13, fontWeight: 700, color: "#fff",
        boxShadow: open ? "0 0 0 4px rgba(99,102,241,0.18)" : "none",
        transition: "all 0.18s",
      }}>
        AD
      </button>

      {open && (
        <div className="hn-dropdown" style={{ minWidth: 220, top: "calc(100% + 8px)" }}>
          <div style={{ padding: "12px 14px 10px", borderBottom: "1px solid #f1f5f9" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{
                width: 38, height: 38, borderRadius: "50%",
                background: "linear-gradient(135deg,#6366f1,#818cf8)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 14, fontWeight: 700, color: "#fff", flexShrink: 0,
              }}>AD</div>
              <div>
                <div style={{ fontSize: 13.5, fontWeight: 700, color: "#0d1425" }}>Admin User</div>
                <div style={{ fontSize: 11.5, color: "#64748b" }}>admin@hirenexon.com</div>
              </div>
            </div>
          </div>
          <div style={{ padding: "6px 0" }}>
            {items.map((item, i) =>
              item.divider
                ? <div key={i} className="hn-drop-divider" />
                : (
                  <button
                    key={i}
                    onClick={() => { navigate(item.path); setOpen(false); }}
                    className={`hn-drop-item${item.danger ? " danger" : ""}`}
                    style={{ display: "flex", alignItems: "center", gap: 9, width: "100%", textAlign: "left" }}
                  >
                    <span className="material-symbols-rounded" style={{ fontSize: 17, opacity: 0.8 }}>{item.icon}</span>
                    <span style={{ flex: 1 }}>{item.label}</span>
                    {item.badge && (
                      <span style={{
                        fontSize: 9, fontWeight: 700, color: "#7c3aed",
                        background: "#ede9fe", borderRadius: 6, padding: "1px 6px",
                      }}>{item.badge}</span>
                    )}
                  </button>
                )
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Main Navbar ──────────────────────────────────────────────
export default function Navbar({ onMenuClick, onSidebarToggle, workspaceType = "candidate" }) {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`hn-navbar${scrolled ? " is-scrolled" : ""}`}
      style={{ height: 60 }}
    >
      {/* Left: hamburger + logo */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
        {/* Mobile menu toggle */}
        <button
          className="hn-toggle lg:hidden"
          onClick={onMenuClick}
          aria-label="Open menu"
        >
          <NavIcon icon="menu" size={20} />
        </button>

        {/* Desktop sidebar collapse */}
        <button
          className="hn-toggle hidden lg:flex"
          onClick={onSidebarToggle}
          aria-label="Toggle sidebar"
        >
          <NavIcon icon="menu" size={20} />
        </button>

        {/* Logo */}
        <Link
          to="/"
          style={{ display: "flex", alignItems: "center", gap: 7, textDecoration: "none", marginLeft: 2 }}
        >
          <div style={{
            width: 30, height: 30, borderRadius: 8,
            background: "linear-gradient(135deg,#6366f1,#818cf8)",
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0,
          }}>
            <span style={{ fontSize: 14, fontWeight: 800, color: "#fff", fontFamily: "Plus Jakarta Sans" }}>H</span>
          </div>
          <span style={{ fontSize: 16.5, fontWeight: 800, color: "#0d1425", letterSpacing: "-0.02em" }}>
            Hire<span style={{ color: "#6366f1" }}>Nexon</span>
          </span>
        </Link>
      </div>

      {/* Centre: search */}
      <div style={{ flex: 1, display: "flex", justifyContent: "center", padding: "0 16px", maxWidth: 540, margin: "0 auto" }}>
        <div
          className="hn-search"
          style={{
            width: "100%", maxWidth: 460,
            boxShadow: searchFocused ? "0 0 0 3px rgba(99,102,241,0.13)" : "none",
            borderColor: searchFocused ? "#6366f1" : undefined,
          }}
        >
          <NavIcon icon="search" size={17} />
          <input
            placeholder="Search jobs, people, companies…"
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
          />
          <span style={{
            fontSize: 10.5, fontWeight: 600, color: "#94a3b8",
            background: "#f1f5f9", borderRadius: 5, padding: "2px 6px",
            flexShrink: 0,
          }}>⌘K</span>
        </div>
      </div>

      {/* Right: nav items + workspace switcher + profile */}
      <div style={{ display: "flex", alignItems: "center", gap: 2, flexShrink: 0 }}>
        {/* Nav items — hidden on small screens */}
        <nav style={{ display: "flex", alignItems: "center", gap: 1, marginRight: 6 }} className="hidden md:flex">
          {NAVBAR_ITEMS.map(item => {
            const isActive = location.pathname.startsWith(item.path);
            const isWS = item.label === "Workspaces";
            return (
              <Link
                key={item.label}
                to={item.path}
                className="nav-item"
                style={{ textDecoration: "none" }}
              >
                <div className="nav-icon" style={{ position: "relative" }}>
                  <NavIcon icon={item.icon} size={22} />
                  {item.badge && <NavBadge count={item.label === "Messages" ? 5 : item.label === "Alerts" ? 3 : 0} />}
                </div>
                <span className={`nav-label${isActive ? " is-active" : ""}`}>{item.label}</span>
                {isActive && (
                  <span className="nav-underline nav-active-indicator" />
                )}
              </Link>
            );
          })}

          {/* Workspaces special nav item */}
          <div style={{ position: "relative", marginLeft: 4 }}>
            <WorkspaceSwitcher workspaceType={workspaceType} />
          </div>
        </nav>

        {/* Divider */}
        <div style={{ width: 1, height: 28, background: "#e2e8f0", margin: "0 8px" }} />

        {/* Profile */}
        <ProfileDropdown />
      </div>
    </header>
  );
}
