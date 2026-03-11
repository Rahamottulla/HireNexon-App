// frontend/src/layouts/university/UniversitySidebar.jsx
import { Link, useLocation } from "react-router-dom";
import {
  FaHome, FaChartBar, FaCalendarAlt, FaUserGraduate, FaFileAlt,
  FaEnvelopeOpen, FaChartLine, FaBuilding, FaBriefcase, FaTrophy,
  FaUniversity, FaUsersCog, FaCog, FaQuestionCircle,
} from "react-icons/fa";

const sidebarData = [
  {
    section: "Overview",
    links: [
      { name: "Dashboard",           path: "/university/dashboard",          icon: <FaHome /> },
      { name: "Analytics",           path: "/university/analytics",          icon: <FaChartBar /> },
    ],
  },
  {
    section: "Placements",
    links: [
      { name: "Drive Calendar",      path: "/university/drives",             icon: <FaCalendarAlt /> },
      { name: "Students",            path: "/university/students",           icon: <FaUserGraduate />, badge: 8 },
      { name: "Applications",        path: "/university/applications",       icon: <FaFileAlt /> },
      { name: "Offer Letters",       path: "/university/offers",             icon: <FaEnvelopeOpen /> },
      { name: "Placement Stats",     path: "/university/placement-stats",    icon: <FaChartLine /> },
    ],
  },
  {
    section: "Partnerships",
    links: [
      { name: "Companies",           path: "/university/companies",          icon: <FaBuilding /> },
      { name: "Job Postings",        path: "/university/jobs",               icon: <FaBriefcase /> },
      { name: "Contests",            path: "/university/contests",           icon: <FaTrophy /> },
    ],
  },
  {
    section: "Institution",
    links: [
      { name: "University Profile",  path: "/university/profile",            icon: <FaUniversity /> },
      { name: "Departments",         path: "/university/departments",        icon: <FaUsersCog /> },
      { name: "Settings",            path: "/university/settings",           icon: <FaCog /> },
    ],
  },
  {
    section: "Help & Support",
    links: [
      { name: "Help Center",         path: "/university/help",               icon: <FaQuestionCircle /> },
    ],
  },
];

const UniversitySidebar = ({ isCollapsed }) => {
  const location = useLocation();

  return (
    <aside className="hn-sidebar" style={{ width: isCollapsed ? 56 : 240 }}>
      <div className="pointer-events-none absolute top-0 left-0 right-0 h-[200px] bg-sidebar-glow" />

      {/* Org identity */}
      {!isCollapsed && (
        <div className="relative flex items-center gap-2.5 px-3 pt-4 pb-3 border-b border-white/[0.06]">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-lg"
            style={{ background: "rgba(245,158,11,0.18)", border: "1.5px solid rgba(245,158,11,0.3)" }}>
            🏛️
          </div>
          <div className="min-w-0">
            <div className="text-[13px] font-bold text-slate-200 truncate">Your University</div>
            <div className="text-[10.5px] font-semibold mt-0.5" style={{ color: "#f59e0b" }}>University Workspace</div>
          </div>
        </div>
      )}

      <div className="relative px-2.5 py-4 flex-1 flex flex-col gap-1">
        {sidebarData.map((section, i) => (
          <div key={i} className="mb-1">
            {!isCollapsed && <div className="sidebar-section-label">{section.section}</div>}
            {isCollapsed && i > 0 && <div className="sidebar-divider my-1.5 mx-2.5" />}

            <ul className="list-none m-0 p-0 flex flex-col gap-px">
              {section.links.map((link, idx) => {
                const active = location.pathname === link.path || location.pathname.startsWith(link.path + "/");
                return (
                  <li key={idx}>
                    <Link
                      to={link.path}
                      className={`sidebar-link ${active ? "is-active" : ""}`}
                      style={isCollapsed ? { justifyContent: "center", padding: "9px 0" } : {}}
                      title={isCollapsed ? link.name : undefined}
                    >
                      {active && <span className="absolute left-0 top-[20%] bottom-[20%] w-[3px] rounded-r-[3px] sidebar-active-bar" />}
                      <span className="sidebar-icon">{link.icon}</span>
                      {!isCollapsed && (
                        <>
                          <span className="flex-1 truncate">{link.name}</span>
                          {link.badge && (
                            <span className="text-[10.5px] font-bold px-1.5 py-0.5 rounded-full"
                              style={{ background: active ? "rgba(99,102,241,0.25)" : "rgba(255,255,255,0.1)", color: active ? "#a5b4fc" : "#7a8fad" }}>
                              {link.badge}
                            </span>
                          )}
                        </>
                      )}
                      {isCollapsed && link.badge && (
                        <span className="absolute top-1.5 right-1.5 w-[7px] h-[7px] rounded-full bg-rose-500 border-2 border-navy-900" />
                      )}
                      {isCollapsed && <span className="sidebar-tooltip">{link.name}{link.badge ? ` (${link.badge})` : ""}</span>}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default UniversitySidebar;
