import React, { useState } from "react";

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
};

const industries = [
  "Agriculture","Automotive","Banking & Finance","Construction","Consulting",
  "Design & Creative","Education & Training","Energy & Utilities","Entertainment & Media",
  "FMCG (Fast-Moving Consumer Goods)","Government & Public Sector","Healthcare & Pharmaceuticals",
  "Hospitality & Tourism","Human Resources (HR)","Information Technology (IT) / Software","Insurance",
  "Legal Services","Logistics & Supply Chain","Manufacturing","Marketing & Advertising",
  "Non-Profit / NGO","Oil & Gas","Real Estate","Retail & E-commerce","Telecommunications","Transportation","Other"
];

const Roadmaps = () => {
  const [selectedJob, setSelectedJob] = useState(null);
  const [selectedIndustry, setSelectedIndustry] = useState("");

  const filteredJobs = selectedIndustry
    ? jobsData.filter(job => job.industry === selectedIndustry)
    : jobsData;

  /* -------------------- JOB LIST -------------------- */
  if (!selectedJob) {
    return (
      <div className="min-h-screen bg-gray-50 px-6 py-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">
          Roadmaps to achieve your dream jobs faster
        </h1>

        {/* Filter */}
        <div className="flex items-center gap-3 mb-6">
          <label className="font-medium text-slate-700">Filter by Industry:</label>
          <select
            value={selectedIndustry}
            onChange={(e) => setSelectedIndustry(e.target.value)}
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Industries</option>
            {industries.map((industry, index) => (
              <option key={index} value={industry}>{industry}</option>
            ))}
          </select>
        </div>

        {/* Jobs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <div
                key={job.id}
                onClick={() => setSelectedJob(job)}
                className="cursor-pointer rounded-xl bg-white p-5 shadow-md transition hover:-translate-y-1 hover:shadow-xl"
              >
                <h2 className="text-lg font-semibold text-sky-600">{job.title}</h2>
                <p className="text-slate-700">{job.company}</p>
                <p className="text-sm text-slate-500 mt-1">{job.industry}</p>
              </div>
            ))
          ) : (
            <p className="text-slate-500">No jobs found for this industry.</p>
          )}
        </div>
      </div>
    );
  }

  /* -------------------- ROADMAP VIEW -------------------- */
  const steps = jobRoadmaps[selectedJob.id] || [];

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-8">
      <button
        onClick={() => setSelectedJob(null)}
        className="mb-6 inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-white font-medium hover:bg-blue-700"
      >
        ← Back to Jobs
      </button>

      <h1 className="text-3xl font-bold text-slate-800 mb-2">
        {selectedJob.title} Roadmap
      </h1>
      <p className="text-slate-600 mb-6">
        Steps to achieve your dream role at {selectedJob.company}
      </p>

      <div className="space-y-5">
        {steps.map((step, index) => (
          <div
            key={index}
            className="flex gap-5 rounded-xl bg-white p-6 shadow-md transition hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-500 text-white font-bold">
              {index + 1}
            </div>

            <div>
              <h3 className="text-lg font-semibold text-sky-600 mb-1">
                {step.step}
              </h3>
              <p className="text-slate-700 leading-relaxed">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Roadmaps;
