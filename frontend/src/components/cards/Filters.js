import React from "react";
import "./cards.css";

const Filters = () => {
  return (
    <div className="card">
      <h4 className="card-header">Filters</h4>
      <div className="card-content">
        <label>
          <input type="checkbox" /> Remote Only
        </label>
        <br />
        <label>
          <input type="checkbox" /> Internship
        </label>
        <br />
        <label>
          <input type="checkbox" /> Full-time
        </label>
      </div>
    </div>
  );
};

export default Filters;
