import React from "react";
import { Link, useLocation } from "react-router-dom";

const SidebarItem = ({ name, path, icon }) => {
  const location = useLocation();
  const isActive = location.pathname.startsWith(path); // ✅ highlight for nested routes too

  return (
    <li className={isActive ? "active" : ""}>
      <Link to={path}>
        <span className="sidebar-icon">{icon}</span>
        <span className="link-name">{name}</span>
      </Link>
    </li>
  );
};

export default SidebarItem;