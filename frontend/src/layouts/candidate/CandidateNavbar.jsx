import React, { useState, useEffect, useRef } from "react";
import { FaBell, FaIndent, FaOutdent, FaLayerGroup, FaEnvelope, FaSearch, FaRss,
FaBriefcase, FaTrophy, FaUser, FaUsers, } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/features/auth/context/AuthContext";

const CandidateNavbar = ({ isSidebarCollapsed, onToggleSidebar, onOpenMobileMenu, onMessagesClick }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth() || {};

  const [profileOpen, setProfileOpen] = useState(false);
  const [workspaceOpen, setWorkspaceOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const profileRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const closeDropdowns = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
        setWorkspaceOpen(false);
      }
    };
    document.addEventListener("mousedown", closeDropdowns);
    return () => document.removeEventListener("mousedown", closeDropdowns);
  }, []);

  const handleLogout = () => {
    logout?.();
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  const navItem = (to, label, Icon) => (
    <Link
      to={to}
      className="nav-link group relative flex flex-col items-center gap-0.5"
    >
      <span className={`nav-icon-wrap ${isActive(to) ? "active" : ""}`}>
        <Icon size={18} />
      </span>
      <span className={`nav-label ${isActive(to) ? "active-label" : ""}`}>{label}</span>
      {isActive(to) && <span className="nav-indicator" />}
    </Link>
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');

        .hn-navbar {
          font-family: 'Plus Jakarta Sans', sans-serif;
          position: sticky;
          top: 0;
          z-index: 100;
          background: rgba(255, 255, 255, 0.97);
          backdrop-filter: blur(16px);
          border-bottom: 1px solid #e8eaf0;
          transition: box-shadow 0.25s ease;
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 0 20px;
          height: 60px;
        }

        .hn-navbar.scrolled {
          box-shadow: 0 4px 24px rgba(30, 41, 59, 0.08);
        }

        .toggle-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 10px;
          background: #f1f5f9;
          color: #475569;
          border: none;
          cursor: pointer;
          transition: background 0.18s, color 0.18s, transform 0.18s;
          flex-shrink: 0;
        }
        .toggle-btn:hover {
          background: #e2e8f0;
          color: #1e293b;
          transform: scale(1.06);
        }

        .logo-img {
          height: 36px;
          width: auto;
          object-fit: contain;
          flex-shrink: 0;
        }

        .search-bar {
          flex: 1;
          max-width: 380px;
          display: flex;
          align-items: center;
          gap: 8px;
          background: #f8fafc;
          border: 1.5px solid #e2e8f0;
          border-radius: 50px;
          padding: 7px 16px;
          transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
        }
        .search-bar:focus-within {
          border-color: #6366f1;
          box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
          background: #fff;
        }
        .search-bar input {
          width: 100%;
          background: transparent;
          border: none;
          outline: none;
          font-size: 13.5px;
          color: #334155;
          font-family: 'Plus Jakarta Sans', sans-serif;
        }
        .search-bar input::placeholder { color: #94a3b8; }
        .search-icon { color: #94a3b8; flex-shrink: 0; }

        .hn-nav {
          display: flex;
          align-items: center;
          gap: 2px;
          margin-left: auto;
        }

        .nav-link {
          position: relative;
          padding: 4px 10px 2px;
          border-radius: 10px;
          text-decoration: none;
          transition: background 0.18s;
          cursor: pointer;
        }
        .nav-link:hover { background: #f1f5f9; }

        .nav-icon-wrap {
          display: flex;
          justify-content: center;
          align-items: center;
          color: #64748b;
          transition: color 0.18s, transform 0.18s;
        }
        .nav-icon-wrap.active { color: #6366f1; }
        .nav-link:hover .nav-icon-wrap { color: #6366f1; transform: translateY(-1px); }

        .nav-label {
          font-size: 11px;
          font-weight: 500;
          color: #64748b;
          transition: color 0.18s;
          white-space: nowrap;
        }
        .nav-label.active-label { color: #6366f1; font-weight: 600; }
        .nav-link:hover .nav-label { color: #6366f1; }

        .nav-indicator {
          position: absolute;
          bottom: -2px;
          left: 20%;
          right: 20%;
          height: 2.5px;
          border-radius: 2px;
          background: linear-gradient(90deg, #6366f1, #818cf8);
        }

        .nav-badge {
          position: absolute;
          top: 2px;
          right: 6px;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #ef4444;
          border: 2px solid white;
        }

        /* Dropdown */
        .hn-dropdown {
          position: absolute;
          top: calc(100% + 10px);
          right: 0;
          min-width: 200px;
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 14px;
          box-shadow: 0 8px 32px rgba(30, 41, 59, 0.12), 0 2px 8px rgba(30,41,59,0.06);
          padding: 6px;
          animation: dropIn 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
          z-index: 200;
        }
        @keyframes dropIn {
          from { opacity: 0; transform: translateY(-8px) scale(0.96); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        .hn-dropdown-item {
          display: block;
          padding: 9px 14px;
          font-size: 13.5px;
          font-weight: 500;
          color: #334155;
          border-radius: 9px;
          text-decoration: none;
          transition: background 0.15s, color 0.15s;
          cursor: pointer;
        }
        .hn-dropdown-item:hover { background: #f1f5f9; color: #6366f1; }
        .hn-dropdown-divider { height: 1px; background: #f1f5f9; margin: 4px 6px; }
        .hn-dropdown-danger { color: #ef4444; }
        .hn-dropdown-danger:hover { background: #fef2f2; color: #dc2626; }

        .workspace-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 13.5px;
        }
        .workspace-dot {
          width: 7px; height: 7px; border-radius: 50%;
        }

        @media (max-width: 1023px) {
          .desktop-toggle { display: none !important; }
        }
        @media (min-width: 1024px) {
          .mobile-toggle { display: none !important; }
        }
        @media (max-width: 767px) {
          .search-bar { display: none !important; }
          .hn-nav { gap: 0; }
          .nav-label { display: none; }
          .nav-link { padding: 6px 8px; }
        }
      `}</style>

      <header className={`hn-navbar${scrolled ? " scrolled" : ""}`}>
        {/* Desktop Toggle */}
        <button onClick={onToggleSidebar} className="toggle-btn desktop-toggle" title={isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}>
          {isSidebarCollapsed ? <FaIndent size={16} /> : <FaOutdent size={16} />}
        </button>

        {/* Mobile Menu */}
        <button onClick={onOpenMobileMenu} className="toggle-btn mobile-toggle" title="Open menu">
          <FaIndent size={16} />
        </button>

        {/* Logo */}
        <Link to="/candidate/dashboard" style={{ display: "flex", alignItems: "center", marginRight: 4 }}>
          <img src="/images/public/hi.png" alt="HireNexon" className="logo-img" />
        </Link>

        {/* Search */}
        <div className="search-bar">
          <FaSearch size={13} className="search-icon" />
          <input placeholder="Search jobs, people, companies…" />
        </div>

        {/* Nav */}
        <nav className="hn-nav">
          {navItem("/candidate/feed", "Feed", FaRss)}
          {navItem("/candidate/propals", "Propals", FaUsers)}
          {navItem("/candidate/jobs", "Jobs", FaBriefcase)}
          {navItem("/candidate/live-contests", "Contests", FaTrophy)}

          {/* Messages */}
          <button
            onClick={onMessagesClick}
            className="nav-link"
            style={{ background: "none", border: "none" }}
          >
            <span className="nav-icon-wrap" style={{ position: "relative" }}>
              <FaEnvelope size={18} />
              <span className="nav-badge" />
            </span>
            <span className="nav-label">Messages</span>
          </button>

          {/* Notifications */}
          <Link to="/candidate/notifications" className="nav-link" style={{ position: "relative" }}>
            <span className="nav-icon-wrap" style={{ position: "relative" }}>
              <FaBell size={18} />
              <span className="nav-badge" />
            </span>
            <span className="nav-label">Alerts</span>
          </Link>

          {/* Workspaces */}
          <div style={{ position: "relative" }} ref={null}>
            <button
              onClick={(e) => { e.stopPropagation(); setWorkspaceOpen(p => !p); setProfileOpen(false); }}
              className="nav-link"
              style={{ background: "none", border: "none" }}
            >
              <span className={`nav-icon-wrap${workspaceOpen ? " active" : ""}`}><FaLayerGroup size={18} /></span>
              <span className={`nav-label${workspaceOpen ? " active-label" : ""}`}>Workspaces</span>
            </button>

            {workspaceOpen && (
              <div className="hn-dropdown" style={{ minWidth: 220 }}>
                {[
                  { label: "Personal Workspace", path: "/candidate/dashboard", color: "#6366f1" },
                  { label: "Company Workspace", path: "/recruiter/crm", color: "#0ea5e9" },
                  { label: "University Workspace", path: "/university/dashboard", color: "#10b981" },
                ].map(w => (
                  <Link key={w.label} to={w.path} onClick={() => setWorkspaceOpen(false)} className="hn-dropdown-item">
                    <span className="workspace-badge">
                      <span className="workspace-dot" style={{ background: w.color }} />
                      {w.label}
                    </span>
                  </Link>
                ))}
                <div className="hn-dropdown-divider" />
                <Link to="/setup/organization" onClick={() => setWorkspaceOpen(false)} className="hn-dropdown-item" style={{ color: "#6366f1", fontWeight: 600 }}>
                  + Create Organization
                </Link>
              </div>
            )}
          </div>

          {/* Profile */}
          <div style={{ position: "relative" }} ref={profileRef}>
            <button
              onClick={(e) => { e.stopPropagation(); setProfileOpen(p => !p); setWorkspaceOpen(false); }}
              className="nav-link"
              style={{ background: "none", border: "none" }}
            >
              <span className={`nav-icon-wrap${profileOpen ? " active" : ""}`}>
                <div style={{
                  width: 28, height: 28, borderRadius: "50%",
                  background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "white", fontSize: 13
                }}>
                  <FaUser size={13} />
                </div>
              </span>
              <span className={`nav-label${profileOpen ? " active-label" : ""}`}>Profile</span>
            </button>

            {profileOpen && (
              <div className="hn-dropdown">
                {[
                  ["My Profile", "/candidate/my-profile"],
                  ["Manage Account", "/candidate/manage-account"],
                  ["Settings", "/candidate/settings"],
                  ["Help", "/candidate/help"],
                ].map(([label, path]) => (
                  <Link key={label} to={path} onClick={() => setProfileOpen(false)} className="hn-dropdown-item">
                    {label}
                  </Link>
                ))}
                <div className="hn-dropdown-divider" />
                <div onClick={handleLogout} className="hn-dropdown-item hn-dropdown-danger">
                  Sign out
                </div>
              </div>
            )}
          </div>
        </nav>
      </header>
    </>
  );
};

export default CandidateNavbar;
