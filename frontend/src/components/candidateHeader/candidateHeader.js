//frontend/src/components/candidateHeader/candidateHeader.js
import React, { useState } from "react";
import { FaBell, FaIndent, FaOutdent, FaUserFriends, FaUsers, FaUser, FaTrophy, FaEnvelope, FaSearch, FaRss, FaBriefcase } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./candidateHeader.css";

const CandidateHeader = ({ onToggleSidebar, onMessagesClick }) => {
  const location = useLocation();
  const navigate = useNavigate();

  // ✅ SAFE AUTH ACCESS
  const auth = useAuth();
  const logout = auth?.logout;

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // ✅ SAFE LOGOUT
  const handleLogout = () => {
    if (logout) logout();
    navigate("/login");
  };

  return (
    <header className="header flex justify-between items-center p-4 shadow-md bg-white sticky top-0 z-50">
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
      <div className="search flex items-center border rounded-md px-2 py-1 w-1/3">
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
          className={`flex flex-col items-center font-semibold ${
            location.pathname === "/candidate/propals" ? "active" : ""
          }`}
        >
          <FaUserFriends size={20} />
          <span className="text-xs mt-1">Propals</span>
        </Link>

        <Link
          to="/candidate/Communities"
          className={`flex flex-col items-center font-semibold ${
            location.pathname === "/candidate/Communities" ? "active" : ""
          }`}
        >
          <FaUsers size={20} />
          <span className="text-xs mt-1">Communities</span>
        </Link>

        <Link
          to="/candidate/jobs"
          className={`flex flex-col items-center font-semibold ${
            location.pathname === "/candidate/jobs" ? "active" : ""
          }`}
        >
          <FaBriefcase size={20} />
          <span className="text-xs mt-1">Jobs</span>
        </Link>

        <Link
          to="/candidate/live-contests"
          className={`flex flex-col items-center font-semibold ${
            location.pathname === "/candidate/live-contests" ? "active" : ""
          }`}
        >
          <FaTrophy size={20} />
          <span className="text-xs mt-1">Live Contests</span>
        </Link>

        <button
          onClick={() => onMessagesClick && onMessagesClick()}
          className="relative flex flex-col items-center font-semibold"
        >
          <FaEnvelope size={20} />
          <span className="text-xs mt-1">Messages</span>
          <span className="absolute top-0 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        <Link
          to="/candidate/notifications"
          className={`relative flex flex-col items-center font-semibold ${
            location.pathname === "/candidate/notifications" ? "active" : ""
          }`}
        >
          <FaBell size={20} />
          <span className="text-xs mt-1">Notifications</span>
          <span className="absolute top-0 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </Link>

        {/* Profile Dropdown */}
        <div
          className="relative flex items-center cursor-pointer"
          onClick={() => setIsDropdownOpen((prev) => !prev)}
        >
          <FaUser size={20} />
          <span className="text-xs ml-1">Profile ▼</span>

          {isDropdownOpen && (
            <ul className="absolute right-0 mt-2 bg-white border rounded shadow-lg w-44 text-sm z-50">
              <li className="px-4 py-2 hover:bg-gray-100">
                <Link to="/candidate/my-profile">My Profile</Link>
              </li>
              <li className="px-4 py-2 hover:bg-gray-100">
                <Link to="/candidate/manage-account">Manage Account</Link>
              </li>
              <li className="px-4 py-2 hover:bg-gray-100">
                <Link to="/candidate/settings">Settings</Link>
              </li>
              <li className="px-4 py-2 hover:bg-gray-100">
                <Link to="/candidate/help">Help</Link>
              </li>
              <li
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={handleLogout}
              >
                Logout
              </li>
            </ul>
          )}
        </div>
      </nav>
    </header>
  );
};

export default CandidateHeader;