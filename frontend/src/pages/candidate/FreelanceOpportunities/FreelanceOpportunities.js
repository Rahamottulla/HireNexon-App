import React from "react";
import "./FreelanceOpportunities.css";

const freelanceJobsData = [
  {
    title: "React Developer",
    company: "TechCorp Freelance",
    pay: "$500/month",
    duration: "3 months",
    location: "Remote",
  },
  {
    title: "UI/UX Designer",
    company: "DesignX",
    pay: "$400/month",
    duration: "2 months",
    location: "Remote",
  },
  {
    title: "Content Writer",
    company: "WriteHub",
    pay: "$300/month",
    duration: "1 month",
    location: "Remote",
  },
];

const HireNexonFreelanceOpportunities = () => {
  return (
    <div className="hnc-freelance-page-container">
      <h2 className="hnc-freelance-page-title">Freelance Opportunities</h2>
      <p className="hnc-freelance-page-subtitle">
        Explore the latest freelance jobs and remote work opportunities.
      </p>

      <div className="hnc-freelance-grid">
        {freelanceJobsData.map((job, index) => (
          <div key={index} className="hnc-freelance-card">
            <h3 className="hnc-freelance-job-title">{job.title}</h3>
            <p className="hnc-freelance-company">{job.company}</p>
            <p className="hnc-freelance-details">
              {job.location} | {job.duration} | {job.pay}
            </p>
            <button className="hnc-freelance-apply-btn">Apply Now</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HireNexonFreelanceOpportunities;

