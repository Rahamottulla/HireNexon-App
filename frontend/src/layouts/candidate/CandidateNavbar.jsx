import React, { useState, useEffect, useRef } from "react";
import { FaBell, FaIndent, FaOutdent, FaLayerGroup, FaEnvelope, FaSearch, FaRss,
FaBriefcase, FaTrophy, FaUser, FaUsers, } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/features/auth/context/AuthContext";

const CandidateNavbar = ({ onToggleSidebar, onMessagesClick }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth() || {};

  const [profileOpen, setProfileOpen] = useState(false);
  const [workspaceOpen, setWorkspaceOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const profileRef = useRef(null);

  useEffect(() => {
    const closeDropdowns = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
        setWorkspaceOpen(false);
      }
    };
    document.addEventListener("click", closeDropdowns);
    return () => document.removeEventListener("click", closeDropdowns);
  }, []);

  const handleLogout = () => {
    logout?.();
    navigate("/login");
  };

  const navItem = (to, label, Icon) => (
    <Link
      to={to}
      className={`flex flex-col items-center text-xs font-medium transition
        ${
          location.pathname === to
            ? "text-blue-600"
            : "text-slate-700 hover:text-blue-600"
        }`}
    >
      <Icon size={20} />
      <span className="mt-1">{label}</span>
      {location.pathname === to && (
        <span className="mt-1 h-0.5 w-full rounded bg-blue-600" />
      )}
    </Link>
  );

  return (
    <header className="sticky top-0 z-50 flex items-center gap-4 bg-white px-4 py-2 shadow">
      {/* Sidebar Toggle */}
      <button
        onClick={() => {
          onToggleSidebar?.();
          setSidebarOpen((p) => !p);
        }}
        className="rounded-md bg-slate-100 p-2 text-slate-700 hover:bg-slate-200"
      >
        {sidebarOpen ? <FaIndent size={18} /> : <FaOutdent size={18} />}
      </button>

      {/* Logo */}
      <Link to="/candidate/dashboard" className="flex items-center">
        <img
          src="/images/public/hi.png"
          alt="HireNexon"
          className="h-9 w-auto object-contain"
        />
      </Link>

      {/* Search */}
      <div className="hidden md:flex flex-1 max-w-md items-center gap-2 rounded-full border bg-slate-50 px-4 py-2">
        <FaSearch className="text-slate-500" />
        <input
          placeholder="Search on HireNexon"
          className="w-full bg-transparent text-sm outline-none"
        />
      </div>

      {/* Navigation */}
      <nav className="flex items-center gap-6">
        {navItem("/candidate/feed", "Feed", FaRss)}
        {navItem("/candidate/propals", "Propals", FaUsers)}
        {navItem("/candidate/jobs", "Jobs", FaBriefcase)}
        {navItem("/candidate/live-contests", "Contests", FaTrophy)}

        {/* Messages */}
        <button
          onClick={onMessagesClick}
          className="relative flex flex-col items-center text-xs text-slate-700 hover:text-blue-600"
        >
          <FaEnvelope size={20} />
          <span className="mt-1">Messages</span>
          <span className="absolute top-0 right-1 h-2 w-2 rounded-full bg-red-500" />
        </button>

        {/* Notifications */}
        <Link
          to="/candidate/notifications"
          className="relative flex flex-col items-center text-xs text-slate-700 hover:text-blue-600"
        >
          <FaBell size={20} />
          <span className="mt-1">Alerts</span>
          <span className="absolute top-0 right-1 h-2 w-2 rounded-full bg-red-500" />
        </Link>

        {/* Workspaces */}
        <div className="relative">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setWorkspaceOpen((p) => !p);
              setProfileOpen(false);
            }}
            className="flex flex-col items-center text-xs text-slate-700 hover:text-blue-600"
          >
            <FaLayerGroup size={20} />
            <span className="mt-1">Workspaces</span>
          </button>

          {workspaceOpen && (
            <ul className="absolute right-0 mt-3 w-56 rounded-md border bg-white shadow-lg">
              {[
                ["Personal Workspace", "/candidate/dashboard"],
                ["Company Workspace", "/recruiter/crm"],
                ["University Workspace", "/university/dashboard"],
                ["Create Organization", "/setup/organization"],
              ].map(([label, path]) => (
                <li key={label}>
                  <Link
                    to={path}
                    onClick={() => setWorkspaceOpen(false)}
                    className="block px-4 py-2 text-sm hover:bg-slate-100"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Profile */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setProfileOpen((p) => !p);
              setWorkspaceOpen(false);
            }}
            className="flex flex-col items-center text-xs text-slate-700 hover:text-blue-600"
          >
            <FaUser size={20} />
            <span className="mt-1">Profile</span>
          </button>

          {profileOpen && (
            <ul className="absolute right-0 mt-3 w-48 rounded-md border bg-white shadow-lg">
              {[
                ["My Profile", "/candidate/my-profile"],
                ["Manage Account", "/candidate/manage-account"],
                ["Settings", "/candidate/settings"],
                ["Help", "/candidate/help"],
              ].map(([label, path]) => (
                <li key={label}>
                  <Link
                    to={path}
                    onClick={() => setProfileOpen(false)}
                    className="block px-4 py-2 text-sm hover:bg-slate-100"
                  >
                    {label}
                  </Link>
                </li>
              ))}
              <li
                onClick={handleLogout}
                className="cursor-pointer px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50"
              >
                Sign out
              </li>
            </ul>
          )}
        </div>
      </nav>
    </header>
  );
};

export default CandidateNavbar;
