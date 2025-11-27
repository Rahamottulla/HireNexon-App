import React from "react";
import "./AppliedJobs.css";

const appliedJobsData = [
  {
    title: "Full Stack Developer",
    company: "HireNexon",
    location: "Kolkata",
    status: "Under Review",
    appliedDate: "2025-09-20",
  },
  {
    title: "Software Developer",
    company: "Google",
    location: "Delhi",
    status: "Interview Scheduled",
    appliedDate: "2025-09-18",
  },
  {
    title: "Data Analyst",
    company: "DataX",
    location: "Bengaluru",
    status: "Rejected",
    appliedDate: "2025-09-15",
  },
  {
    title: "UI/UX Designer",
    company: "DesignHub",
    location: "Pune",
    status: "Under Review",
    appliedDate: "2025-09-12",
  },
  {
    title: "Cyber Security",
    company: "InnovateX",
    location: "Bangalore",
    status: "Interview Scheduled",
    appliedDate: "2025-09-10",
  },
];

const HireNexonAppliedJobs = () => {
  return (
    <div className="hnc-applied-page-container">
      <h2 className="hnc-applied-page-title">Applied Jobs</h2>
      <p className="hnc-applied-page-subtitle">
        Track all the jobs you have applied for. You can see status, applied date, and take action.
      </p>

      <div className="hnc-applied-table-container">
        <table className="hnc-applied-table">
          <thead>
            <tr>
              <th>Role</th>
              <th>Company</th>
              <th>Location</th>
              <th>Status</th>
              <th>Applied Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {appliedJobsData.map((job, index) => (
              <tr key={index}>
                <td>{job.title}</td>
                <td>{job.company}</td>
                <td>{job.location}</td>
                <td>
                  <span className={`hnc-job-status ${job.status.replace(/\s/g, "-").toLowerCase()}`}>
                    {job.status}
                  </span>
                </td>
                <td>{job.appliedDate}</td>
                <td>
                  <button className="hnc-view-btn">
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HireNexonAppliedJobs;


