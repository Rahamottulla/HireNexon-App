import React from "react";
import "./cards.css";

const JobSuggestions = () => {
  const jobs = [
    { title: "Software Engineer", company: "Google" },
    { title: "AI Developer", company: "Microsoft" },
    { title: "Full Stack Intern", company: "Amazon" },
  ];

  return (
    <div className="card">
      <h4 className="card-header">Top Job Picks</h4>
      {jobs.map((job, index) => (
        <div key={index} style={{ marginBottom: "10px" }}>
          <p style={{ fontWeight: "500" }}>{job.title}</p>
          <p style={{ fontSize: "0.9rem", color: "#6b7280" }}>{job.company}</p>
        </div>
      ))}
    </div>
  );
};

export default JobSuggestions;
