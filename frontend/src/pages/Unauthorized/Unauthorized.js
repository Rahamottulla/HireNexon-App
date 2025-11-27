import React from "react";
import { Link } from "react-router-dom";
import "./Unauthorized.css"; 

const Unauthorized = () => {
  return (
    <div className="unauthorized-container">
      <h1>403 - Unauthorized</h1>
      <p>You do not have permission to access this page.</p>
      <Link to="/" className="home-link">Go to Home</Link>
    </div>
  );
};

export default Unauthorized;
