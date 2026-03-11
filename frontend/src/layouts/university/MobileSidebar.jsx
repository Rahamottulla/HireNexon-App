// frontend/src/layouts/university/MobileSidebar.jsx
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaHome, FaChartBar, FaCalendarAlt, FaUserGraduate, FaFileAlt,
  FaEnvelopeOpen, FaChartLine, FaBuilding, FaBriefcase, FaTrophy,
  FaUniversity, FaUsersCog, FaCog, FaQuestionCircle, FaTimes,
} from "react-icons/fa";

const sidebarData = [
  {
    section: "Overview",
    links: [
      { name: "Dashboard",           path: "/university/dashboard",        icon: <FaHome /> },
      { name: "Analytics",           path: "/university/analytics",        icon: <FaChartBar /> },
    ],
  },
  {
    section: "Placements",
    links: [
      { name: "Drive Calendar",      path: "/university/drives",           icon: <FaCalendarAlt /> },
      { name: "Students",            path: "/university/students",         icon: <FaUserGraduate />, badge: 8 },
      { name: "Applications",        path: "/university/applications",     icon: <FaFileAlt /> },
      { name: "Offer Letters",       path: "/university/offers",           icon: <FaEnvelopeOpen /> },
      { name: "Placement Stats",     path: "/university/placement-stats",  icon: <FaChartLine /> },
    ],
  },
  {
    section: "Partnerships",
    links: [
      { name: "Companies",           path: "/university/companies",        icon: <FaBuilding /> },
      { name: "Job Postings",        path: "/university/jobs",             icon: <FaBriefcase /> },
      { name: "Contests",            path: "/university/contests",         icon: <FaTrophy /> },
    ],
  },
  {
    section: "Institution",
    links: [
      { name: "University Profile",  path: "/university/profile",          icon: <FaUniversity /> },
      { name: "Departments",         path: "/university/departments",      icon: <FaUsersCog /> },
      { name: "Settings",            path: "/university/settings",         icon: <FaCog /> },
    ],
  },
  {
    section: "Help & Support",
    links: [
      { name: "Help Center",         path: "/university/help",             icon: <FaQuestionCircle /> },
    ],
  },
];

const MobileSidebar = ({ isOpen, onClose }) => {
  const location = useLocation();

  useEffect(() => { onClose(); }, [location.pathname]);
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <>
      <div onClick={onClose} className="fixed inset-0 z-[200] lg:hidden"
        style={{
          background: "rgba(6,11,24,0.65)", backdropFilter: "blur(3px)",
          opacity: isOpen ? 1 : 0, pointerEvents: isOpen ? "auto" : "none",
          transition: "opacity 0.28s cubic-bezier(0.4,0,0.2,1)",
        }}
      />
      <div className="fixed top-0 left-0 bottom-0 z-[201] lg:hidden flex flex-col"
        style={{
          width: 280, background: "#0d1425",
          transform: isOpen ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 0.3s cubic-bezier(0.4,0,0.2,1)",
          boxShadow: isOpen ? "4px 0 40px rgba(0,0,0,0.45)" : "none",
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3.5 border-b border-white/[0.06]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center text-sm"
              style={{ background: "rgba(245,158,11,0.18)", border: "1.5px solid rgba(245,158,11,0.3)" }}>
              🏛️
            </div>
            <div>
              <div className="text-[13px] font-bold text-slate-200">Your University</div>
              <div className="text-[10px] font-semibold" style={{ color: "#f59e0b" }}>University Workspace</div>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-lg flex items-center justify-center text-navy-400 hover:bg-white/10 transition-colors border-none bg-transparent cursor-pointer">
            <FaTimes size={15} />
          </button>
        </div>

        {/* Nav */}
        <div className="flex-1 overflow-y-auto px-2.5 py-3">
          {sidebarData.map((section, i) => (
            <div key={i} className="mb-2">
              <div className="sidebar-section-label">{section.section}</div>
              <ul className="list-none m-0 p-0 flex flex-col gap-px">
                {section.links.map((link, idx) => {
                  const active = location.pathname === link.path || location.pathname.startsWith(link.path + "/");
                  return (
                    <li key={idx}>
                      <Link to={link.path} className={`sidebar-link ${active ? "is-active" : ""}`}>
                        {active && <span className="absolute left-0 top-[20%] bottom-[20%] w-[3px] rounded-r-[3px] sidebar-active-bar" />}
                        <span className="sidebar-icon">{link.icon}</span>
                        <span className="flex-1 truncate">{link.name}</span>
                        {link.badge && (
                          <span className="text-[10.5px] font-bold px-1.5 py-0.5 rounded-full"
                            style={{ background: active ? "rgba(99,102,241,0.25)" : "rgba(255,255,255,0.1)", color: active ? "#a5b4fc" : "#7a8fad" }}>
                            {link.badge}
                          </span>
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        {/* Workspace footer */}
        <div className="px-3 py-4 border-t border-white/[0.06]">
          <div className="sidebar-section-label mb-2">Switch Workspace</div>
          {[
            { label: "Personal Workspace",   path: "/candidate/dashboard",       color: "#6366f1" },
            { label: "Company Workspace",    path: "/company/create-workspace",  color: "#10b981" },
            { label: "University Workspace", path: "/university/dashboard",      color: "#f59e0b" },
          ].map(w => (
            <Link key={w.label} to={w.path}
              className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-[13px] font-medium text-navy-300 hover:bg-white/5 transition-colors">
              <span className="w-2 h-2 rounded-full shrink-0" style={{ background: w.color }} />
              {w.label}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default MobileSidebar;
