import React from 'react';
import './JobCard.css';

const JobCard = ({ job }) => {
  const {
    title,
    company,
    location,
    locationType, // e.g., Remote, Hybrid, Onsite
    jobType,      // e.g., Full-time, Part-time
    posted,
    logo
  } = job;

  return (
    <div className="job-card">
      <div className="job-card-header">
        <img src={logo} alt={company} className="company-logo" />
        <div className="job-info">
          <h3 className="job-role">{title}</h3> {/* Role in blue */}
          <p className="company-meta">
            {company} | 📍 {location} ({locationType}) | {jobType}
          </p>
          <p className="posted-time">{posted}</p> {/* 3rd line */}
        </div>
      </div>
    </div>
  );
};

export default JobCard;

