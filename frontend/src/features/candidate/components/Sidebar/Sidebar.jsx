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
      { name: "Recommended Jobs", path: "/candidate/recommended", icon: <FaClipboardList /> },
    ],
  },
  {
    section: "Applications & Tracking",
    links: [
      { name: "Interview Calendar", path: "/candidate/interviews", icon: <FaCalendarAlt /> },
      { name: "My Applications", path: "/candidate/applied-jobs", icon: <FaFileAlt /> },
      { name: "Offer Letters", path: "/candidate/offers", icon: <FaBriefcase /> },
    ],
  },
  {
    section: "Learning & Development",
    links: [
      { name: "Nexon CV", path: "/candidate/nexoncv", icon: <FaFileAlt /> },
      { name: "Roadmaps", path: "/candidate/roadmaps", icon: <FaRoad /> },
      { name: "Career Resources", path: "/candidate/resources", icon: <FaBook /> },
      { name: "Courses & Certifications", path: "/candidate/courses", icon: <FaGraduationCap /> },
      { name: "Skill Assessment Tests", path: "/candidate/tests", icon: <FaClipboardList /> },
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

const Sidebar = ({ isCollapsed }) => {
  const location = useLocation();

  return (
    <aside
      className={`fixed h-[90vh] overflow-y-auto bg-slate-800 text-white shadow-md transition-all duration-300
        ${isCollapsed ? "w-16 px-2" : "w-60 px-4"}`}
    >
      {sidebarData.map((section, i) => (
        <div key={i} className="mb-6">
          {!isCollapsed && (
            <h4 className="text-xs uppercase text-slate-400 mb-3 tracking-wide">
              {section.section}
            </h4>
          )}

          <ul className="space-y-1">
            {section.links.map((link, idx) => {
              const isActive = location.pathname.startsWith(link.path);

              return (
                <li key={idx}>
                  <Link
                    to={link.path}
                    className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition
                      ${
                        isActive
                          ? "bg-blue-500 font-semibold"
                          : "hover:bg-slate-700"
                      }
                      ${isCollapsed ? "justify-center px-0" : ""}
                    `}
                  >
                    <span className="text-lg">{link.icon}</span>
                    {!isCollapsed && <span>{link.name}</span>}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </aside>
  );
};

export default Sidebar;
