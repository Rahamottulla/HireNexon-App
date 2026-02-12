import React from "react";

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

const AppliedJobs = () => {
  return (
    <div className="bg-gray-50 p-8 font-[Poppins]">
      <h2 className="mb-1 text-2xl font-bold text-gray-900">
        Applied Jobs
      </h2>
      <p className="mb-5 text-base text-gray-600">
        Track all the jobs you have applied for. You can see status,
        applied date, and take action.
      </p>

      <div className="max-h-[400px] overflow-x-auto overflow-y-auto rounded-xl bg-white shadow-md">
        <table className="min-w-[800px] w-full border-collapse">
          <thead className="sticky top-0 z-10 bg-gray-100">
            <tr>
              <th className="border-b border-r px-4 py-3 text-left font-semibold">
                Role
              </th>
              <th className="border-b border-r px-4 py-3 text-left font-semibold">
                Company
              </th>
              <th className="border-b border-r px-4 py-3 text-left font-semibold">
                Location
              </th>
              <th className="border-b border-r px-4 py-3 text-left font-semibold">
                Status
              </th>
              <th className="border-b border-r px-4 py-3 text-left font-semibold">
                Applied Date
              </th>
              <th className="border-b px-4 py-3 text-left font-semibold">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {appliedJobsData.map((job, index) => {
              const statusClass =
                job.status === "Under Review"
                  ? "bg-amber-500"
                  : job.status === "Interview Scheduled"
                  ? "bg-emerald-500"
                  : "bg-red-500";

              return (
                <tr
                  key={index}
                  className="hover:bg-gray-50 transition"
                >
                  <td className="border-b border-r px-4 py-3">
                    {job.title}
                  </td>
                  <td className="border-b border-r px-4 py-3">
                    {job.company}
                  </td>
                  <td className="border-b border-r px-4 py-3">
                    {job.location}
                  </td>
                  <td className="border-b border-r px-4 py-3">
                    <span
                      className={`inline-block rounded-lg px-3 py-1 text-sm font-semibold text-white ${statusClass}`}
                    >
                      {job.status}
                    </span>
                  </td>
                  <td className="border-b border-r px-4 py-3">
                    {job.appliedDate}
                  </td>
                  <td className="border-b px-4 py-3">
                    <button className="rounded-md bg-blue-500 px-4 py-1.5 text-sm font-medium text-white transition hover:bg-blue-600">
                      View Details
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AppliedJobs;
