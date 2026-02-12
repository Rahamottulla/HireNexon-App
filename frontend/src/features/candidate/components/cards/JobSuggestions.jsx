import React from "react";

const JobSuggestions = () => {
  const jobs = [
    { title: "Software Engineer", company: "Google" },
    { title: "AI Developer", company: "Microsoft" },
    { title: "Full Stack Intern", company: "Amazon" },
  ];

  return (
    <div className="bg-white rounded-xl p-4 shadow-md mb-4 transition hover:shadow-lg">
      <h4 className="font-semibold text-gray-800 mb-3">Top Job Picks</h4>

      {jobs.map((job, index) => (
        <div key={index} className="mb-3">
          <p className="font-medium">{job.title}</p>
          <p className="text-sm text-gray-500">{job.company}</p>
        </div>
      ))}
    </div>
  );
};

export default JobSuggestions;
