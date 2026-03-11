// src/layouts/shared/Sidebar.jsx
// ─────────────────────────────────────────────────────────────
// HireNexon — Universal Collapsible Sidebar
// Props:
//   navItems      array    — from COMPANY_NAV or UNIVERSITY_NAV
//   collapsed     bool     — controlled collapse state
//   workspaceType string   — "company" | "university"
//   orgName       string   — e.g. "Acme Corp" or "MIT"
//   orgLogo       string?  — image URL (optional)
// ─────────────────────────────────────────────────────────────
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

// ── Workspace theme ──────────────────────────────────────────
const WS_THEME = {
  company:    { accent: "#10b981", accentDim: "rgba(16,185,129,0.18)", label: "Company Workspace",    icon: "corporate_fare" },
  university: { accent: "#f59e0b", accentDim: "rgba(245,158,11,0.18)", label: "University Workspace",  icon: "account_balance" },
  candidate:  { accent: "#6366f1", accentDim: "rgba(99,102,241,0.18)",  label: "Personal Workspace",   icon: "person" },
};

function Icon({ name, size = 20 }) {
  return <span className="material-symbols-rounded" style={{ fontSize: size, lineHeight: 1, flexShrink: 0 }}>{name}</span>;
}

// ── Sidebar link item ────────────────────────────────────────
function SidebarItem({ item, collapsed }) {
  const location = useLocation();
  const isActive = location.pathname === item.path || location.pathname.startsWith(item.path + "/");

  return (
    <Link
      to={item.path}
      className={`sidebar-link${isActive ? " is-active" : ""}`}
      title={collapsed ? item.label : undefined}
      style={{ position: "relative", justifyContent: collapsed ? "center" : undefined }}
    >
      {/* Active left bar */}
      {isActive && (
        <span style={{
          position: "absolute", left: 0, top: "20%", bottom: "20%",
          width: 3, borderRadius: "0 3px 3px 0",
          background: "linear-gradient(180deg,#6366f1,#818cf8)",
        }} />
      )}

      {/* Icon chip */}
      <div className="sidebar-icon" style={{ marginLeft: isActive && !collapsed ? 4 : 0 }}>
        <Icon name={item.icon} size={18} />
      </div>

      {/* Label + badge */}
      {!collapsed && (
        <>
          <span style={{ flex: 1, fontSize: 13.5, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {item.label}
          </span>
          {item.badge ? (
            <span style={{
              minWidth: 20, height: 18, borderRadius: 9, padding: "0 5px",
              background: isActive ? "rgba(99,102,241,0.25)" : "rgba(255,255,255,0.1)",
              fontSize: 10.5, fontWeight: 700,
              color: isActive ? "#a5b4fc" : "#7a8fad",
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0,
            }}>
              {item.badge}
            </span>
          ) : null}
        </>
      )}

      {/* Tooltip in collapsed mode */}
      {collapsed && <span className="sidebar-tooltip">{item.label}{item.badge ? ` (${item.badge})` : ""}</span>}

      {/* Notification dot in collapsed mode */}
      {collapsed && item.badge && (
        <span style={{
          position: "absolute", top: 6, right: 6,
          width: 7, height: 7, borderRadius: "50%",
          background: "#f43f5e", border: "2px solid #0d1425",
        }} />
      )}
    </Link>
  );
}

// ── Main Sidebar ─────────────────────────────────────────────
export default function Sidebar({ navItems = [], collapsed = false, workspaceType = "company", orgName = "", orgLogo = null }) {
  const theme = WS_THEME[workspaceType] || WS_THEME.company;

  return (
    <aside
      className="hn-sidebar"
      style={{
        width: collapsed ? 64 : 240,
        minWidth: collapsed ? 64 : 240,
        padding: collapsed ? "12px 8px" : "12px 10px",
      }}
    >
      {/* ── Org header ───────────────────────────────────── */}
      <div style={{
        display: "flex", alignItems: "center", gap: 10,
        padding: collapsed ? "6px 0 14px" : "6px 4px 14px",
        justifyContent: collapsed ? "center" : undefined,
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        marginBottom: 8,
      }}>
        {/* Org avatar */}
        <div style={{
          width: 36, height: 36, borderRadius: 10, flexShrink: 0,
          background: theme.accentDim,
          border: `1.5px solid ${theme.accent}33`,
          display: "flex", alignItems: "center", justifyContent: "center",
          position: "relative",
        }}>
          {orgLogo
            ? <img src={orgLogo} alt={orgName} style={{ width: "100%", height: "100%", borderRadius: 10, objectFit: "cover" }} />
            : <span className="material-symbols-rounded" style={{ fontSize: 18, color: theme.accent }}>{theme.icon}</span>
          }
          {/* Online dot */}
          <span style={{
            position: "absolute", bottom: -2, right: -2,
            width: 9, height: 9, borderRadius: "50%",
            background: "#10b981", border: "2px solid #0d1425",
          }} />
        </div>

        {!collapsed && (
          <div style={{ minWidth: 0 }}>
            <div style={{
              fontSize: 13, fontWeight: 700, color: "#e2e8f0",
              whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
            }}>
              {orgName || "Your Organization"}
            </div>
            <div style={{
              fontSize: 10.5, fontWeight: 600, color: theme.accent,
              marginTop: 1, letterSpacing: "0.01em",
            }}>
              {theme.label}
            </div>
          </div>
        )}
      </div>

      {/* ── Nav sections ─────────────────────────────────── */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
        {navItems.map((section) => (
          <div key={section.section}>
            {!collapsed && (
              <div className="sidebar-section-label">{section.section}</div>
            )}
            {collapsed && (
              <div style={{
                height: 1, background: "rgba(255,255,255,0.06)",
                margin: "6px 0",
              }} />
            )}
            <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
              {section.items.map(item => (
                <SidebarItem key={item.path} item={item} collapsed={collapsed} />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* ── Footer ───────────────────────────────────────── */}
      <div style={{
        marginTop: "auto", paddingTop: 12,
        borderTop: "1px solid rgba(255,255,255,0.06)",
        display: "flex", flexDirection: "column", gap: 1,
      }}>
        {!collapsed && (
          <div style={{
            padding: "8px 10px", borderRadius: 12,
            background: "rgba(99,102,241,0.1)",
            border: "1px solid rgba(99,102,241,0.15)",
            marginBottom: 6,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span className="material-symbols-rounded" style={{ fontSize: 18, color: "#818cf8" }}>auto_awesome</span>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: "#c7d2fe" }}>Nexon AI</div>
                <div style={{ fontSize: 10.5, color: "#7a8fad" }}>Upgrade for AI features</div>
              </div>
            </div>
          </div>
        )}

        <Link
          to="/help"
          className="sidebar-link"
          style={{ justifyContent: collapsed ? "center" : undefined }}
        >
          <div className="sidebar-icon"><Icon name="help_outline" size={18} /></div>
          {!collapsed && <span style={{ fontSize: 13.5 }}>Help & Support</span>}
          {collapsed && <span className="sidebar-tooltip">Help & Support</span>}
        </Link>
      </div>
    </aside>
  );
}
