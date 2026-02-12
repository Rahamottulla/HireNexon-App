import React from "react";

const freelanceJobsData = [
  {
    title: "React Developer",
    company: "TechCorp Freelance",
    pay: "$500 / month",
    duration: "3 months",
    location: "Remote",
  },
  {
    title: "UI/UX Designer",
    company: "DesignX",
    pay: "$400 / month",
    duration: "2 months",
    location: "Remote",
  },
  {
    title: "Content Writer",
    company: "WriteHub",
    pay: "$300 / month",
    duration: "1 month",
    location: "Remote",
  },
];

const Freelance = () => {
  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-800">
          Freelance Opportunities
        </h2>
        <p className="mt-1 text-sm text-slate-600">
          Earn while you learn. Flexible freelance work for students & freshers.
        </p>
      </div>

      {/* Grid */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {freelanceJobsData.map((job, index) => (
          <div
            key={index}
            className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            {/* Title */}
            <h3 className="text-lg font-semibold text-sky-600">
              {job.title}
            </h3>

            {/* Company */}
            <p className="mt-1 text-sm font-medium text-slate-500">
              {job.company}
            </p>

            {/* Meta */}
            <div className="mt-3 space-y-1 text-sm text-slate-700">
              <p>📍 {job.location}</p>
              <p>⏳ {job.duration}</p>
              <p>💰 {job.pay}</p>
            </div>

            {/* Action */}
            <button
              className="mt-4 w-full rounded-lg bg-sky-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-sky-700"
            >
              Apply Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Freelance;
