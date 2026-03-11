// frontend/src/layouts/company/CompanyNavbar.jsx
import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/features/auth/context/AuthContext";
import api from "@/shared/api/axios";
import {
  FaIndent, FaOutdent, FaSearch, FaRss, FaUsers, FaBriefcase,
  FaTrophy, FaEnvelope, FaBell, FaLayerGroup, FaUser,
} from "react-icons/fa";

const CompanyNavbar = ({ isSidebarCollapsed, onToggleSidebar, onOpenMobileMenu }) => {
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

      {/* Desktop sidebar toggle */}
      <button
        onClick={onToggleSidebar}
        className="hn-toggle desktop-toggle hidden lg:flex"
        title={isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {isSidebarCollapsed ? <FaIndent size={16} /> : <FaOutdent size={16} />}
      </button>

      {/* Mobile menu toggle */}
      <button
        onClick={onOpenMobileMenu}
        className="hn-toggle mobile-toggle flex lg:hidden"
        title="Open menu"
      >
        <FaIndent size={16} />
      </button>

      {/* Logo */}
      <Link to="/company/dashboard" className="flex items-center mr-1">
        <img src="/images/public/hi.png" alt="HireNexon" className="h-9 w-auto object-contain shrink-0" />
      </Link>

      {/* Search */}
      <div className="hn-search">
        <FaSearch size={13} className="text-slate-400 shrink-0" />
        <input placeholder="Search jobs, people, companies…" />
      </div>

      {/* Nav items */}
      <nav className="flex items-center gap-0.5 ml-auto">
        <NavItem to="/feed"     label="Feed"     Icon={FaRss} />
        <NavItem to="/propals"  label="Propals"  Icon={FaUsers} />
        <NavItem to="/jobs"     label="Jobs"     Icon={FaBriefcase} />
        <NavItem to="/contests" label="Contests" Icon={FaTrophy} />

        {/* Messages */}
        <Link to="/company/messages" className="nav-item">
          <span className="nav-icon relative">
            <FaEnvelope size={18} />
            <span className="nav-dot" />
          </span>
          <span className="nav-label">Messages</span>
        </Link>

        {/* Alerts */}
        <Link to="/company/alerts" className="nav-item relative">
          <span className="nav-icon relative">
            <FaBell size={18} />
            <span className="nav-dot" />
          </span>
          <span className="nav-label">Alerts</span>
        </Link>

        {/* Workspace switcher */}
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
                { label: "Personal Workspace",   path: "/candidate/dashboard",         color: "#6366f1" },
                { label: "Company Workspace",    path: "/company/dashboard",            color: "#10b981" },
                { label: "University Workspace", path: "/university/create-workspace",  color: "#f59e0b" },
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
                ["Company Profile", "/company/profile"],
                ["Team Members",    "/company/team"],
                ["Billing & Plans", "/company/billing"],
                ["Settings",        "/company/settings"],
                ["Help Center",     "/company/help"],
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

export default CompanyNavbar;
