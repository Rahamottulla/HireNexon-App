// src/components/Sidebar/Sidebar/SidebarSection.js
import React from "react";
import SidebarItem from "./SidebarItem";

const SidebarSection = ({ section }) => {
  return (
    <div className="sidebar-section">
      <h4 className="sidebar-section-title">{section.section}</h4>
      <ul>
        {section.links.map((link, index) => (
          <SidebarItem
            key={index}
            name={link.name}
            path={link.path}
            icon={link.icon}
          />
        ))}
      </ul>
    </div>
  );
};

export default SidebarSection;
