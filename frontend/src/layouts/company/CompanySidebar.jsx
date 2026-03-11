// frontend/src/layouts/company/CompanySidebar.jsx
import { Link, useLocation } from "react-router-dom";
import {
  FaHome, FaChartBar, FaBriefcase, FaFileAlt, FaVideo,
  FaEnvelopeOpen, FaUsers, FaTrophy, FaHandshake, FaComments,
  FaBuilding, FaUsersCog, FaCreditCard, FaCog, FaQuestionCircle,
} from "react-icons/fa";

const sidebarData = [
  {
    section: "Overview",
    links: [
      { name: "Dashboard",        path: "/company/dashboard",       icon: <FaHome /> },
      { name: "Analytics",        path: "/company/analytics",       icon: <FaChartBar /> },
    ],
  },
  {
    section: "Hiring",
    links: [
      { name: "Job Postings",     path: "/company/jobs",            icon: <FaBriefcase />,    badge: 3  },
      { name: "Applications",     path: "/company/applications",    icon: <FaFileAlt />,      badge: 12 },
      { name: "Interviews",       path: "/company/interviews",      icon: <FaVideo /> },
      { name: "Offer Letters",    path: "/company/offers",          icon: <FaEnvelopeOpen /> },
      { name: "Talent Pool",      path: "/company/talent",          icon: <FaUsers /> },
    ],
  },
  {
    section: "Engagement",
    links: [
      { name: "Contests",         path: "/company/contests",        icon: <FaTrophy /> },
      { name: "Propals",          path: "/company/propals",         icon: <FaHandshake /> },
      { name: "Messages",         path: "/company/messages",        icon: <FaComments />,     badge: 5  },
    ],
  },
  {
    section: "Company",
    links: [
      { name: "Company Profile",  path: "/company/profile",         icon: <FaBuilding /> },
      { name: "Team Members",     path: "/company/team",            icon: <FaUsersCog /> },
      { name: "Billing & Plans",  path: "/company/billing",         icon: <FaCreditCard /> },
      { name: "Settings",         path: "/company/settings",        icon: <FaCog /> },
    ],
  },
  {
    section: "Help & Support",
    links: [
      { name: "Help Center",      path: "/company/help",            icon: <FaQuestionCircle /> },
    ],
  },
];

const CompanySidebar = ({ isCollapsed }) => {
  const location = useLocation();

  return (
    <aside
      className="hn-sidebar"
      style={{ width: isCollapsed ? 56 : 240 }}
    >
      {/* Top glow */}
      <div className="pointer-events-none absolute top-0 left-0 right-0 h-[200px] bg-sidebar-glow" />

      {/* Org identity strip */}
      {!isCollapsed && (
        <div className="relative flex items-center gap-2.5 px-3 pt-4 pb-3 border-b border-white/[0.06]">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-lg"
            style={{ background: "rgba(16,185,129,0.18)", border: "1.5px solid rgba(16,185,129,0.3)" }}>
            🏢
          </div>
          <div className="min-w-0">
            <div className="text-[13px] font-bold text-slate-200 truncate">Your Company</div>
            <div className="text-[10.5px] font-semibold mt-0.5" style={{ color: "#10b981" }}>Company Workspace</div>
          </div>
        </div>
      )}

      <div className="relative px-2.5 py-4 flex-1 flex flex-col gap-1">
        {sidebarData.map((section, i) => (
          <div key={i} className="mb-1">

            {/* Section label */}
            {!isCollapsed && (
              <div className="sidebar-section-label">{section.section}</div>
            )}

            {/* Divider in collapsed mode */}
            {isCollapsed && i > 0 && (
              <div className="sidebar-divider my-1.5 mx-2.5" />
            )}

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
                      {/* Active left bar */}
                      {active && (
                        <span className="absolute left-0 top-[20%] bottom-[20%] w-[3px] rounded-r-[3px] sidebar-active-bar" />
                      )}

                      {/* Icon */}
                      <span className="sidebar-icon">{link.icon}</span>

                      {/* Label + badge */}
                      {!isCollapsed && (
                        <>
                          <span className="flex-1 truncate">{link.name}</span>
                          {link.badge && (
                            <span className="text-[10.5px] font-bold px-1.5 py-0.5 rounded-full"
                              style={{
                                background: active ? "rgba(99,102,241,0.25)" : "rgba(255,255,255,0.1)",
                                color: active ? "#a5b4fc" : "#7a8fad",
                              }}>
                              {link.badge}
                            </span>
                          )}
                        </>
                      )}

                      {/* Collapsed badge dot */}
                      {isCollapsed && link.badge && (
                        <span className="absolute top-1.5 right-1.5 w-[7px] h-[7px] rounded-full bg-rose-500 border-2 border-navy-900" />
                      )}

                      {/* Tooltip */}
                      {isCollapsed && (
                        <span className="sidebar-tooltip">
                          {link.name}{link.badge ? ` (${link.badge})` : ""}
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
    </aside>
  );
};

export default CompanySidebar;
