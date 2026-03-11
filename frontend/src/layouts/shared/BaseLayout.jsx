// src/layouts/shared/BaseLayout.jsx
// ─────────────────────────────────────────────────────────────
// HireNexon — Base Layout (reused by Company & University)
// Handles: responsive sidebar collapse, mobile drawer, FAB
//
// Props:
//   navItems      array   — COMPANY_NAV or UNIVERSITY_NAV
//   workspaceType string  — "company" | "university"
//   orgName       string
//   orgLogo       string?
//   children      node
// ─────────────────────────────────────────────────────────────
import { useState, useEffect, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import MobileSidebar from "./MobileSidebar";

// ── FAB Chat Button ──────────────────────────────────────────
function ChatFAB() {
  const [pulse, setPulse] = useState(true);
  return (
    <div style={{ position: "fixed", bottom: 24, right: 24, zIndex: 100 }}>
      {pulse && (
        <div
          className="animate-ping-fab"
          style={{
            position: "absolute", inset: 0, borderRadius: "50%",
            background: "rgba(99,102,241,0.35)",
            pointerEvents: "none",
          }}
        />
      )}
      <button
        className="hn-fab"
        aria-label="Open chat assistant"
        onClick={() => setPulse(false)}
        style={{ position: "relative" }}
      >
        <span className="material-symbols-rounded" style={{ fontSize: 22 }}>chat_bubble</span>
      </button>
    </div>
  );
}

// ── Breadcrumb ───────────────────────────────────────────────
function Breadcrumb() {
  const location = useLocation();
  const parts = location.pathname.split("/").filter(Boolean);

  return (
    <nav aria-label="Breadcrumb" style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 18 }}>
      {parts.map((part, i) => {
        const isLast = i === parts.length - 1;
        const label = part.charAt(0).toUpperCase() + part.slice(1).replace(/-/g, " ");
        return (
          <span key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}>
            {i > 0 && (
              <span className="material-symbols-rounded" style={{ fontSize: 14, color: "#94a3b8" }}>chevron_right</span>
            )}
            <span style={{
              fontSize: 13, fontWeight: isLast ? 600 : 400,
              color: isLast ? "#0d1425" : "#94a3b8",
            }}>
              {label}
            </span>
          </span>
        );
      })}
    </nav>
  );
}

// ── Main BaseLayout ──────────────────────────────────────────
export default function BaseLayout({ navItems, workspaceType, orgName, orgLogo, children }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Auto-collapse sidebar on small desktop
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1024px)");
    const handler = (e) => { if (e.matches) setSidebarCollapsed(true); };
    handler(mq);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Close mobile sidebar on route change
  const handleMobileClose = useCallback(() => setMobileOpen(false), []);

  return (
    <div className="hn-layout" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      {/* ── Navbar ── */}
      <Navbar
        onMenuClick={() => setMobileOpen(true)}
        onSidebarToggle={() => setSidebarCollapsed(v => !v)}
        workspaceType={workspaceType}
      />

      {/* ── Body ── */}
      <div className="hn-body">
        {/* Desktop sidebar */}
        <div className="hidden lg:block" style={{ flexShrink: 0 }}>
          <Sidebar
            navItems={navItems}
            collapsed={sidebarCollapsed}
            workspaceType={workspaceType}
            orgName={orgName}
            orgLogo={orgLogo}
          />
        </div>

        {/* Mobile sidebar */}
        <MobileSidebar
          open={mobileOpen}
          onClose={handleMobileClose}
          navItems={navItems}
          workspaceType={workspaceType}
          orgName={orgName}
        />

        {/* ── Main content ── */}
        <main className="hn-main">
          {/* Breadcrumb */}
          <Breadcrumb />

          {/* Page content wrapper */}
          <div style={{ animation: "fadeSlideIn 0.25s ease forwards" }}>
            {children}
          </div>
        </main>
      </div>

      {/* ── FAB ── */}
      <ChatFAB />

      {/* ── Global page transition keyframe ── */}
      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
