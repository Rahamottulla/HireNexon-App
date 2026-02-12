import React from "react";

const JobList = () => {
  const jobs = [
    { title: "Frontend Developer", company: "HireNexon" },
    { title: "Backend Developer", company: "GrowixTech" },
    { title: "UI Designer", company: "Bytexl" },
  ];

  return (
    <div className="bg-white rounded-xl p-4 shadow-md mb-4 transition hover:shadow-lg">
      <h4 className="font-semibold text-gray-800 mb-3">Recommended Jobs</h4>

      {jobs.map((j, i) => (
        <div
          key={i}
          className="py-2 border-b last:border-none border-gray-200"
        >
          <p className="font-medium">{j.title}</p>
          <p className="text-sm text-gray-500">{j.company}</p>
        </div>
      ))}
    </div>
  );
};

export default JobList;
