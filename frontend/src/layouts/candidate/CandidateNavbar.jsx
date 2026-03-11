import React, { useState, useEffect, useRef } from "react";
import { FaBell, FaIndent, FaOutdent, FaLayerGroup, FaEnvelope, FaSearch, FaRss,
FaBriefcase, FaTrophy, FaUser, FaUsers, } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/features/auth/context/AuthContext";
import api from "@/shared/api/axios";

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

  const handleLogout = async () => {
  try {
    await api.post("/auth/logout");
  } catch (err) {}
  finally {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    logout?.();
    navigate("/login");
  }
  };

  const isActive = (path) => location.pathname === path;

  const NavItem = ({ to, label, Icon }) => {
    const active = isActive(to);
    return (
      <Link to={to} className="nav-item group">
        <span className={`nav-icon ${active ? "is-active" : ""}`}>
          <Icon size={18} />
        </span>
        <span className={`nav-label ${active ? "is-active" : ""}`}>{label}</span>
        {active && <span className="nav-underline nav-active-indicator" />}
      </Link>
    );
  };

  return (
    <header className={`hn-navbar ${scrolled ? "is-scrolled" : ""}`}>
      {/* Desktop Toggle */}
      <button
        onClick={onToggleSidebar}
        className="hn-toggle desktop-toggle hidden lg:flex"
        title={isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {isSidebarCollapsed ? <FaIndent size={16} /> : <FaOutdent size={16} />}
      </button>

      {/* Mobile Menu */}
      <button
        onClick={onOpenMobileMenu}
        className="hn-toggle mobile-toggle flex lg:hidden"
        title="Open menu"
      >
        <FaIndent size={16} />
      </button>

      {/* Logo */}
      <Link to="/candidate/dashboard" className="flex items-center mr-1">
        <img src="/images/public/hi.png" alt="HireNexon" className="h-9 w-auto object-contain shrink-0" />
      </Link>

      {/* Search */}
      <div className="hn-search">
        <FaSearch size={13} className="text-slate-400 shrink-0" />
        <input placeholder="Search jobs, people, companies…" />
      </div>

      {/* Nav */}
      <nav className="flex items-center gap-0.5 ml-auto">
        <NavItem to="/candidate/feed"         label="Feed"     Icon={FaRss} />
        <NavItem to="/candidate/propals"      label="Propals"  Icon={FaUsers} />
        <NavItem to="/candidate/jobs"         label="Jobs"     Icon={FaBriefcase} />
        <NavItem to="/candidate/live-contests" label="Contests" Icon={FaTrophy} />

        {/* Messages */}
        <button
          onClick={onMessagesClick}
          className="nav-item border-none bg-transparent cursor-pointer"
        >
          <span className="nav-icon relative">
            <FaEnvelope size={18} />
            <span className="nav-dot" />
          </span>
          <span className="nav-label">Messages</span>
        </button>

        {/* Notifications */}
        <Link to="/candidate/notifications" className="nav-item relative">
          <span className="nav-icon relative">
            <FaBell size={18} />
            <span className="nav-dot" />
          </span>
          <span className="nav-label">Alerts</span>
        </Link>

        {/* Workspaces */}
        <div className="relative">
          <button
            onClick={(e) => { e.stopPropagation(); setWorkspaceOpen(p => !p); setProfileOpen(false); }}
            className="nav-item border-none bg-transparent cursor-pointer"
          >
            <span className={`nav-icon ${workspaceOpen ? "is-active" : ""}`}>
              <FaLayerGroup size={18} />
            </span>
            <span className={`nav-label ${workspaceOpen ? "is-active" : ""}`}>Workspaces</span>
          </button>

          {workspaceOpen && (
            <div className="hn-dropdown" style={{ minWidth: 220 }}>
              {[
                { label: "Personal Workspace",   path: "/candidate/create-workspace", color: "#6366f1" },
                { label: "Company Workspace",    path: "/company/create-workspace",   color: "#0ea5e9" },
                { label: "University Workspace", path: "/university/create-workspace",color: "#10b981" },
              ].map(w => (
                <Link
                  key={w.label}
                  to={w.path}
                  onClick={() => setWorkspaceOpen(false)}
                  className="hn-drop-item flex items-center gap-2"
                >
                  <span className="w-[7px] h-[7px] rounded-full shrink-0" style={{ background: w.color }} />
                  {w.label}
                </Link>
              ))}
              
            </div>
          )}
        </div>

        {/* Profile */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={(e) => { e.stopPropagation(); setProfileOpen(p => !p); setWorkspaceOpen(false); }}
            className="nav-item border-none bg-transparent cursor-pointer"
          >
            <span className={`nav-icon ${profileOpen ? "is-active" : ""}`}>
              <div className="w-7 h-7 rounded-full bg-profile-avatar flex items-center justify-center text-white text-[13px]">
                <FaUser size={13} />
              </div>
            </span>
            <span className={`nav-label ${profileOpen ? "is-active" : ""}`}>Profile</span>
          </button>

          {profileOpen && (
            <div className="hn-dropdown">
              {[
                ["My Profile",      "/candidate/my-profile"],
                ["Manage Account",  "/candidate/manage-account"],
                ["Settings",        "/candidate/settings"],
                ["Help",            "/candidate/help"],
              ].map(([label, path]) => (
                <Link
                  key={label}
                  to={path}
                  onClick={() => setProfileOpen(false)}
                  className="hn-drop-item"
                >
                  {label}
                </Link>
              ))}
              <div className="hn-drop-divider" />
              <div onClick={handleLogout} className="hn-drop-item danger cursor-pointer">
                Sign out
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default CandidateNavbar;
