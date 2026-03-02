import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaHome, FaNewspaper, FaBullhorn, FaFileAlt, FaBook, FaGlobe, FaTrophy, FaRoad,FaBriefcase,
FaClipboardList, FaGraduationCap, FaComments, FaBuilding, FaMapMarkerAlt, FaGlobeAmericas,
FaStar, FaCalendarAlt, FaQuestionCircle, } from "react-icons/fa";

const sidebarData = [
  {
    section: "News & Updates",
    links: [
      { name: "HireNexon News", path: "/candidate/hirenexon-news", icon: <FaNewspaper /> },
      { name: "Announcements", path: "/candidate/announcements", icon: <FaBullhorn /> },
    ],
  },
  {
    section: "Dashboard & Overview",
    links: [
      { name: "Dashboard", path: "/candidate/dashboard", icon: <FaHome /> },
      { name: "Saved Jobs", path: "/candidate/saved-jobs", icon: <FaStar /> },
      { name: "Recommended", path: "/candidate/recommended", icon: <FaClipboardList /> },
    ],
  },
  {
    section: "Applications",
    links: [
      { name: "Interview Calendar", path: "/candidate/interviews", icon: <FaCalendarAlt /> },
      { name: "My Applications", path: "/candidate/applied-jobs", icon: <FaFileAlt /> },
      { name: "Offer Letters", path: "/candidate/offers", icon: <FaBriefcase /> },
    ],
  },
  {
    section: "Learning & Dev",
    links: [
      { name: "Nexon CV", path: "/candidate/nexoncv", icon: <FaFileAlt /> },
      { name: "Roadmaps", path: "/candidate/roadmaps", icon: <FaRoad /> },
      { name: "Career Resources", path: "/candidate/resources", icon: <FaBook /> },
      { name: "Courses", path: "/candidate/courses", icon: <FaGraduationCap /> },
      { name: "Skill Tests", path: "/candidate/tests", icon: <FaClipboardList /> },
    ],
  },
  {
    section: "Global Opportunities",
    links: [
      { name: "Remote Jobs", path: "/candidate/remote-jobs", icon: <FaGlobeAmericas /> },
      { name: "Top Countries", path: "/candidate/top-countries", icon: <FaMapMarkerAlt /> },
      { name: "Company Insights", path: "/candidate/company-reviews", icon: <FaBuilding /> },
      { name: "Trending Roles", path: "/candidate/trending-jobs", icon: <FaTrophy /> },
      { name: "Visa Guides", path: "/candidate/visa-guides", icon: <FaGlobe /> },
    ],
  },
  {
    section: "Help & Support",
    links: [
      { name: "Help Center", path: "/candidate/help", icon: <FaQuestionCircle /> },
      { name: "Feedback", path: "/candidate/feedback", icon: <FaComments /> },
    ],
  },
];

const CandidateSidebar = ({ isCollapsed }) => {
  const location = useLocation();

  return (
    <aside
      className="hn-sidebar"
      style={{ width: isCollapsed ? 56 : 228 }}
    >
      {/* Top glow overlay */}
      <div className="pointer-events-none absolute top-0 left-0 right-0 h-[200px] bg-sidebar-glow" />

      <div className="relative px-2.5 py-4 flex-1 flex flex-col gap-1">
        {sidebarData.map((section, i) => (
          <div key={i} className="mb-1">
            {/* Section label */}
            {!isCollapsed && (
              <div className="sidebar-section-label">{section.section}</div>
            )}

            {/* Divider in collapsed mode (except first) */}
            {isCollapsed && i > 0 && (
              <div className="sidebar-divider my-1.5 mx-2.5" />
            )}

            <ul className="list-none m-0 p-0 flex flex-col gap-px">
              {section.links.map((link, idx) => {
                const active = location.pathname.startsWith(link.path);
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

                      <span className="sidebar-icon">{link.icon}</span>

                      {!isCollapsed && (
                        <span className="flex-1 truncate">{link.name}</span>
                      )}

                      {isCollapsed && (
                        <span className="sidebar-tooltip">{link.name}</span>
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

export default CandidateSidebar;
