//frontend/src/components/candidateHeader/candidateHeader.js
import React, { useState, useEffect, useRef } from "react";
import { FaBell, FaIndent, FaOutdent, FaUserFriends, FaUsers, FaUser, FaTrophy, FaEnvelope, FaSearch, FaRss, FaBriefcase } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./candidateHeader.css";

const CandidateHeader = ({ onToggleSidebar, onMessagesClick }) => {
  const location = useLocation();
  const navigate = useNavigate();

  // SAFE AUTH ACCESS
  const auth = useAuth();
  const logout = auth?.logout;

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // SAFE LOGOUT
  const handleLogout = () => {
    if (logout) logout();
    navigate("/login");
  };

  return (
    <header className="header flex justify-between items-center px-4 py-2 bg-white sticky top-0 z-50">
      {/* Sidebar Toggle Button */}
      <button
        className="sidebar-toggle mr-4 p-2 rounded bg-gray-200 hover:bg-gray-300"
        onClick={() => {
          if (onToggleSidebar) onToggleSidebar();
          setIsSidebarOpen((prev) => !prev);
        }}
      >
        {isSidebarOpen ? (
          <FaIndent className="text-xl" />
        ) : (
          <FaOutdent className="text-xl" />
        )}
      </button>

      {/* Logo */}
      <div className="logo">
        <Link to="/candidate/dashboard">
          <img src="/images/hn.png" alt="HireNexon" className="h-10" />
        </Link>
      </div>

      {/* Search Box */}
      <div className="search flex items-center border w-1/3">
        <FaSearch className="mr-2 text-gray-500" />
        <input
          type="text"
          placeholder="Search on HireNexon"
          className="w-full outline-none"
        />
      </div>

      {/* Navigation */}
      <nav className="flex items-center space-x-6">
        <Link
          to="/candidate/feed"
          className={`nav-feed flex flex-col items-center font-semibold ${
            location.pathname === "/candidate/feed" ? "active" : ""
          }`}
        >
          <FaRss size={20} />
          <span className="text-xs mt-1">Feed</span>
        </Link>

        <Link
          to="/candidate/propals"
          className={`nav-propals flex flex-col items-center font-semibold ${
            location.pathname === "/candidate/propals" ? "active" : ""
          }`}
        >
          <FaUserFriends size={20} />
          <span className="text-xs mt-1">Propals</span>
        </Link>

        <Link
          to="/candidate/communities"
          className={`nav-communities flex flex-col items-center font-semibold ${
            location.pathname === "/candidate/communities" ? "active" : ""
          }`}
        >
          <FaUsers size={20} />
          <span className="text-xs mt-1">Communities</span>
        </Link>

        <Link
          to="/candidate/jobs"
          className={`nav-jobs flex flex-col items-center font-semibold ${
            location.pathname === "/candidate/jobs" ? "active" : ""
          }`}
        >
          <FaBriefcase size={20} />
          <span className="text-xs mt-1">Jobs</span>
        </Link>

        <Link
          to="/candidate/live-contests"
          className={`nav-contests flex flex-col items-center font-semibold ${
            location.pathname === "/candidate/live-contests" ? "active" : ""
          }`}
        >
          <FaTrophy size={20} />
          <span className="text-xs mt-1">Live Contests</span>
        </Link>

        <button
          onClick={() => onMessagesClick && onMessagesClick()}
          className="nav-messages flex flex-col items-center font-semibold"
        >
          <FaEnvelope size={20} />
          <span className="text-xs mt-1">Messages</span>
          <span className="absolute top-0 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        <Link
          to="/candidate/notifications"
          className={`nav-notifications relative flex flex-col items-center font-semibold ${
            location.pathname === "/candidate/notifications" ? "active" : ""
          }`}
        >
          <FaBell size={20} />
          <span className="text-xs mt-1">Notifications</span>
          <span className="absolute top-0 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </Link>

        {/* Profile Dropdown */}
        <div className="nav-profile relative" ref={dropdownRef}>
  <button
    className="flex items-center gap-1"
    onClick={(e) => {
      e.stopPropagation();
      setIsDropdownOpen((prev) => !prev);
    }}
  >
    <FaUser size={20} />
    <span className="text-xs">Profile ▼</span>
  </button>

  {isDropdownOpen && (
<ul className="dropdown-menu">
<li><Link to="/candidate/my-profile" onClick={() => setIsDropdownOpen(false)}>My Profile</Link></li>
<li><Link to="/candidate/manage-account" onClick={() => setIsDropdownOpen(false)}>Manage Account</Link></li>
<li><Link to="/candidate/settings" onClick={() => setIsDropdownOpen(false)}>Settings</Link></li>
<li><Link to="/candidate/help" onClick={() => setIsDropdownOpen(false)}>Help</Link></li>

      <li className="signout-item" onClick={handleLogout}>Sign out</li>
    </ul>
  )}
</div>

      </nav>
    </header>
  );
};

export default CandidateHeader;