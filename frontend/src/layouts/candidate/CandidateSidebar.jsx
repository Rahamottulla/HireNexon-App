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
      { name: "Courses & Certs", path: "/candidate/courses", icon: <FaGraduationCap /> },
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
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');

        .hn-sidebar {
          font-family: 'Plus Jakarta Sans', sans-serif;
          height: calc(100vh - 60px);
          overflow-y: auto;
          overflow-x: hidden;
          background: #0f172a;
          color: white;
          transition: width 0.28s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          flex-direction: column;
          scrollbar-width: thin;
          scrollbar-color: #1e293b transparent;
          position: relative;
        }
        .hn-sidebar::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 200px;
          background: linear-gradient(180deg, rgba(99, 102, 241, 0.06) 0%, transparent 100%);
          pointer-events: none;
        }
        .hn-sidebar::-webkit-scrollbar { width: 4px; }
        .hn-sidebar::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 4px; }

        .sidebar-inner {
          padding: 16px 10px 24px;
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .sidebar-section {
          margin-bottom: 4px;
        }

        .sidebar-section-label {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #475569;
          padding: 10px 10px 4px;
          white-space: nowrap;
          overflow: hidden;
          transition: opacity 0.2s;
        }

        .sidebar-link {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 9px 10px;
          border-radius: 10px;
          text-decoration: none;
          color: #94a3b8;
          font-size: 13.5px;
          font-weight: 500;
          transition: background 0.18s, color 0.18s, transform 0.15s;
          white-space: nowrap;
          position: relative;
          overflow: hidden;
        }
        .sidebar-link:hover {
          background: rgba(99, 102, 241, 0.1);
          color: #c7d2fe;
          transform: translateX(2px);
        }
        .sidebar-link.active {
          background: linear-gradient(135deg, rgba(99, 102, 241, 0.25), rgba(129, 140, 248, 0.15));
          color: #a5b4fc;
          font-weight: 600;
        }
        .sidebar-link.active::before {
          content: '';
          position: absolute;
          left: 0; top: 20%; bottom: 20%;
          width: 3px;
          border-radius: 0 3px 3px 0;
          background: linear-gradient(180deg, #6366f1, #818cf8);
        }

        .sidebar-icon {
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border-radius: 8px;
          font-size: 14px;
          transition: background 0.18s;
        }
        .sidebar-link.active .sidebar-icon {
          background: rgba(99, 102, 241, 0.2);
          color: #818cf8;
        }
        .sidebar-link:not(.active):hover .sidebar-icon {
          background: rgba(99, 102, 241, 0.1);
          color: #a5b4fc;
        }

        .sidebar-name {
          flex: 1;
          transition: opacity 0.2s;
        }

        .sidebar-divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, #1e293b, transparent);
          margin: 6px 10px;
        }

        /* Tooltip for collapsed */
        .sidebar-link {
          position: relative;
        }
        .sidebar-tooltip {
          position: absolute;
          left: calc(100% + 8px);
          top: 50%;
          transform: translateY(-50%);
          background: #1e293b;
          color: #e2e8f0;
          font-size: 12px;
          font-weight: 500;
          padding: 6px 10px;
          border-radius: 8px;
          white-space: nowrap;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.15s;
          z-index: 999;
          border: 1px solid #334155;
          box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        }
        .sidebar-tooltip::before {
          content: '';
          position: absolute;
          left: -5px; top: 50%; transform: translateY(-50%);
          border: 5px solid transparent;
          border-right-color: #1e293b;
          border-left: none;
        }
        .sidebar-link:hover .sidebar-tooltip {
          opacity: 1;
        }
      `}</style>

      <aside
        className="hn-sidebar"
        style={{ width: isCollapsed ? 56 : 228 }}
      >
        <div className="sidebar-inner">
          {sidebarData.map((section, i) => (
            <div key={i} className="sidebar-section">
              {!isCollapsed && (
                <div className="sidebar-section-label">{section.section}</div>
              )}
              {isCollapsed && i > 0 && <div className="sidebar-divider" />}

              <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 1 }}>
                {section.links.map((link, idx) => {
                  const active = location.pathname.startsWith(link.path);
                  return (
                    <li key={idx}>
                      <Link
                        to={link.path}
                        className={`sidebar-link${active ? " active" : ""}`}
                        style={isCollapsed ? { justifyContent: "center", padding: "9px 0" } : {}}
                        title={isCollapsed ? link.name : undefined}
                      >
                        <span className="sidebar-icon">{link.icon}</span>
                        {!isCollapsed && <span className="sidebar-name">{link.name}</span>}
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
    </>
  );
};

export default CandidateSidebar;
