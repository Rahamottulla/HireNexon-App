import React from "react";
import SidebarSection from "./SidebarSection";
import SidebarData from "./SidebarData";
import "./Sidebar.css";

const Sidebar = ({ isCollapsed }) => {
  return (
    <div className={`sidebar ${isCollapsed ? "sidebar-collapsed" : ""}`}>
      {SidebarData.map((section, index) => (
        <SidebarSection key={index} section={section} />
      ))}
    </div>
  );
};

export default Sidebar;

