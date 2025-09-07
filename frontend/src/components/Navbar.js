import React from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login"; // Use window.location instead of navigate
  };

  const linkStyle = ({ isActive }) => ({
    marginRight: "15px",
    color: isActive ? "yellow" : "white",
    textDecoration: "none",
  });

  return (
    <nav style={{ padding: "10px", background: "#282c34", color: "white" }}>
      <NavLink to="/" style={linkStyle}>Home</NavLink>
      <NavLink to="/jobs" style={linkStyle}>Jobs</NavLink>
      <NavLink to="/create-job" style={linkStyle}>Create Job</NavLink>

      {!token ? (
        <>
          <NavLink to="/login" style={linkStyle}>Login</NavLink>
          <NavLink to="/register" style={linkStyle}>Register</NavLink>
        </>
      ) : (
        <button 
          onClick={handleLogout} 
          style={{ marginLeft: "15px", background: "red", color: "white", border: "none", padding: "5px 10px", borderRadius: "5px" }}
        >
          Logout
        </button>
      )}
    </nav>
  );
}

export default Navbar;

