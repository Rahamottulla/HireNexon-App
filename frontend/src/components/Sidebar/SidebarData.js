// src/components/Sidebar/Sidebar/SidebarData.js
import { FaHome,FaNewspaper,FaBullhorn, FaFileAlt, FaUser, FaBook, FaGlobe, FaEnvelope, FaTrophy, FaRoad, FaBriefcase,FaClipboardList,
  FaGraduationCap,FaUsers, FaPhoneAlt, FaHeadset, FaComments,FaBuilding,FaMapMarkerAlt,FaGlobeAmericas,FaLifeRing,FaStar,  FaCalendarAlt, FaQuestionCircle
} from "react-icons/fa";
import "./Sidebar.css";

const SidebarData = [
  {
    section: "News & Updates",
    links: [
      { name: "HireNexon News", path: "/candidate/hirenexon-news", icon: <FaNewspaper /> },
      { name: "Announcements", path: "/candidate/announcements", icon: <FaBullhorn  /> },
      
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
    section: "Internship Opportunities",
    links: [
      { name: "Available Internships", path: "/candidate/internships", icon: <FaGraduationCap /> },
    ],
  },
  
  {
    section: "Global Opportunities",
    links: [
      { name: "Remote Opportunities", path: "/candidate/remote-jobs", icon: <FaGlobeAmericas /> },
      { name: "Top Hiring Countries", path: "/candidate/top-countries", icon: <FaMapMarkerAlt /> },
      { name: "Company Insights", path: "/candidate/company-reviews", icon: <FaBuilding /> },
      { name: "Trending Job Roles", path: "/candidate/trending-jobs", icon: <FaTrophy /> },
      { name: "Global Internships", path: "/candidate/global-internships", icon: <FaGraduationCap /> },
      { name: "International Freelance ", path: "/candidate/freelance-opportunities", icon: <FaBriefcase /> },
      { name: "Visa & Relocation Guides", path: "/candidate/visa-guides", icon: <FaGlobe /> },
      { name: "Top Companies Abroad", path: "/candidate/top-global-companies", icon: <FaBuilding /> },
    ],
  },
  {
    section: "Help & Support",
    links: [
      { name: "Help Center", path: "/candidate/help", icon: <  FaQuestionCircle /> },
      { name: "Feedback", path: "/candidate/feedback", icon: <FaComments /> },
    ],
  },
];

export default SidebarData;