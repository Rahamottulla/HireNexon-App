import React, { useState } from "react";
import "./Roadmaps.css";

const jobsData = [
  { id: 1, title: "Frontend Developer", company: "TechCorp", industry: "Information Technology (IT) / Software" },
  { id: 2, title: "Backend Developer", company: "InnovateX", industry: "Information Technology (IT) / Software" },
  { id: 3, title: "UI/UX Designer", company: "DesignHub", industry: "Design & Creative" },
  { id: 4, title: "Banking Analyst", company: "FinanceCorp", industry: "Banking & Finance" },
  { id: 5, title: "Mechanical Engineer", company: "AutoWorks", industry: "Automotive" },
  { id: 6, title: "Content Writer", company: "MediaHouse", industry: "Entertainment & Media" },
  { id: 7, title: "Civil Engineer", company: "BuildIt", industry: "Construction" },
  { id: 8, title: "HR Executive", company: "PeopleFirst", industry: "Human Resources (HR)" },
  { id: 9, title: "Marketing Specialist", company: "BrandBuzz", industry: "Marketing & Advertising" },
  { id: 10, title: "NGO Coordinator", company: "HelpingHands", industry: "Non-Profit / NGO" },
];

const jobRoadmaps = {
  1: [
    { step: "Apply for Jobs", description: "Submit your frontend application." },
    { step: "Aptitude Test", description: "Clear general aptitude tests." },
    { step: "Coding Test", description: "Solve frontend coding problems." },
    { step: "Technical Interview", description: "Show your React/JS skills." },
    { step: "Offer & Joining", description: "Receive your offer letter." },
  ],
  2: [
    { step: "Apply for Jobs", description: "Submit your backend application." },
    { step: "Aptitude Test", description: "Clear general aptitude tests." },
    { step: "Coding Test", description: "Solve backend coding problems." },
    { step: "Technical Interview", description: "Show your Node.js skills." },
    { step: "Offer & Joining", description: "Receive your offer letter." },
  ],
  3: [
    { step: "Apply for Jobs", description: "Submit your UI/UX application." },
    { step: "Portfolio Review", description: "Share your design portfolio." },
    { step: "Design Challenge", description: "Complete a UI/UX task." },
    { step: "Interview", description: "Discuss your design approach and skills." },
    { step: "Offer & Joining", description: "Receive your offer letter." },
  ],
  4: [
    { step: "Apply for Jobs", description: "Submit your banking application." },
    { step: "Aptitude Test", description: "Clear banking aptitude test." },
    { step: "Technical Interview", description: "Show your financial knowledge." },
    { step: "HR Interview", description: "Discuss your fit and communication." },
    { step: "Offer & Joining", description: "Receive your offer letter." },
  ],
};

const industries = [
  "Agriculture","Automotive","Banking & Finance","Construction","Consulting",
  "Design & Creative","Education & Training","Energy & Utilities","Entertainment & Media",
  "FMCG (Fast-Moving Consumer Goods)","Government & Public Sector","Healthcare & Pharmaceuticals",
  "Hospitality & Tourism","Human Resources (HR)","Information Technology (IT) / Software","Insurance",
  "Legal Services","Logistics & Supply Chain","Manufacturing","Marketing & Advertising",
  "Non-Profit / NGO","Oil & Gas","Real Estate","Retail & E-commerce","Telecommunications","Transportation","Other"
];

const HncJobsRoadmaps = () => {
  const [selectedJob, setSelectedJob] = useState(null);
  const [selectedIndustry, setSelectedIndustry] = useState("");

  const filteredJobs = selectedIndustry
    ? jobsData.filter(job => job.industry === selectedIndustry)
    : jobsData;

  if (!selectedJob) {
    return (
      <div className="hnc-jobs-page-container">
        <h1 className="hnc-jobs-page-title">Roadmaps to achieve your dream jobs faster</h1>

        <div className="hnc-filter-container">
          <label htmlFor="industry">Filter by Industry:</label>
          <select
            id="industry"
            value={selectedIndustry}
            onChange={(e) => setSelectedIndustry(e.target.value)}
          >
            <option value="">All Industries</option>
            {industries.map((industry, index) => (
              <option value={industry} key={index}>{industry}</option>
            ))}
          </select>
        </div>

        <div className="hnc-jobs-grid">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <div
                className="hnc-job-card"
                key={job.id}
                onClick={() => setSelectedJob(job)}
              >
                <h2>{job.title}</h2>
                <p>{job.company}</p>
                <p className="hnc-job-industry">{job.industry}</p>
              </div>
            ))
          ) : (
            <p>No jobs found for this industry.</p>
          )}
        </div>
      </div>
    );
  }

  const steps = jobRoadmaps[selectedJob.id] || [];

  return (
    <div className="hnc-roadmaps-page-container">
      <button className="hnc-back-button" onClick={() => setSelectedJob(null)}>← Back to Jobs</button>
      <h1 className="hnc-roadmaps-page-title">{selectedJob.title} Roadmap</h1>
      <p className="hnc-roadmaps-page-subtitle">
        Steps to achieve your dream role at {selectedJob.company}.
      </p>
      <div className="hnc-roadmap-steps">
        {steps.map((step, index) => (
          <div className="hnc-roadmap-step-card" key={index}>
            <div className="hnc-step-number">{index + 1}</div>
            <h2 className="hnc-step-title">{step.step}</h2>
            <p className="hnc-step-description">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HncJobsRoadmaps;


