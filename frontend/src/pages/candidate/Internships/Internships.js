import React from "react";
import "./Internships.css";

const internshipsData = [
  {
    title: "Frontend Developer Intern",
    company: "TechCorp",
    duration: "3 months",
    stipend: "$300/month",
    location: "Remote",
  },
  {
    title: "Backend Developer Intern",
    company: "InnovateX",
    duration: "6 months",
    stipend: "$400/month",
    location: "Delhi",
  },
  {
    title: "Data Analyst Intern",
    company: "DataX",
    duration: "4 months",
    stipend: "$350/month",
    location: "Bengaluru",
  },
];

const HireNexonInternships = () => {
  return (
    <div className="hnc-internships-page-container">
      <h2 className="hnc-internships-page-title">Internship Opportunities</h2>
      <p className="hnc-internships-page-subtitle">
        Explore the latest internship openings to kickstart your career.
      </p>

      <div className="hnc-internships-grid">
        {internshipsData.map((internship, index) => (
          <div key={index} className="hnc-internship-card">
            <h3 className="hnc-internship-title">{internship.title}</h3>
            <p className="hnc-internship-company">{internship.company}</p>
            <p className="hnc-internship-details">
              {internship.location} | {internship.duration} | Stipend: {internship.stipend}
            </p>
            <button className="hnc-internship-apply-btn">Apply Now</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HireNexonInternships;

