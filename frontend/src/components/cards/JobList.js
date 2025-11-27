import React from "react";
import "./cards.css";

const JobList = () => {
  const jobs = [
    { title: "Frontend Developer", company: "HireNexon" },
    { title: "Backend Developer", company: "GrowixTech" },
    { title: "UI Designer", company: "Bytexl" },
  ];

  return (
    <div className="card">
      <h4 className="card-header">Recommended Jobs</h4>
      {jobs.map((j, i) => (
        <div
          key={i}
          style={{
            padding: "10px 0",
            borderBottom: "1px solid #e5e7eb",
          }}
        >
          <p style={{ fontWeight: "500" }}>{j.title}</p>
          <p style={{ color: "#6b7280", fontSize: "0.9rem" }}>{j.company}</p>
        </div>
      ))}
    </div>
  );
};

export default JobList;
