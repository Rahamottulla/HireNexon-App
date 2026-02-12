import React, { useState, useEffect } from "react";
import useTitle from "@/shared/hooks/useTitle";
import { FaSearch, FaFilter } from "react-icons/fa";
import JobCard from "../../components/JobCard";

/* ---------- INDUSTRIES ---------- */
const industries = [
  "Agriculture","Automotive","Banking & Finance","Construction","Consulting",
  "Design & Creative","Education & Training","Energy & Utilities",
  "Entertainment & Media","FMCG","Government","Healthcare","Hospitality",
  "Human Resources","IT / Software","Insurance","Legal","Logistics",
  "Manufacturing","Marketing","NGO","Oil & Gas","Real Estate",
  "Retail","Telecom","Transportation","Other",
];

/* ---------- JOB DATA (demo) ---------- */
const allJobs = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "HireNexon",
    location: "Kolkata",
    locationType: "On-site",
    type: "Full-time",
    experienceLevel: "Senior",
    posted: "2 hours ago",
    logo: "/images/hnn.jpg",
  },
  {
    id: 2,
    title: "Product Designer",
    company: "DesignHub",
    location: "Mumbai",
    locationType: "Remote",
    type: "Full-time",
    experienceLevel: "Entry",
    posted: "1 day ago",
    logo: "/images/h.jpg",
  },
];

/* ---------- POSTED TIME HELPERS ---------- */
const postedRanges = {
  "1 hour": [0, 1],
  "6 hours": [2, 6],
  "12 hours": [7, 12],
  "1 day": [13, 24],
  "1 week": [25, 168],
  "1 month": [169, 720],
};

const getHoursAgo = (posted) => {
  const n = parseInt(posted);
  if (posted.includes("hour")) return n;
  if (posted.includes("day")) return n * 24;
  if (posted.includes("week")) return n * 168;
  if (posted.includes("month")) return n * 720;
  return 0;
};

const Jobs = () => {
  useTitle("Jobs");
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    jobType: "",
    locationType: "",
    experience: "",
    posted: "",
  });

  const [showMobileFilters, setShowMobileFilters] = useState(false);

  /* ---------- FILTER LOGIC ---------- */
  const filteredJobs = allJobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.company.toLowerCase().includes(search.toLowerCase());

    const matchesJobType =
      !filters.jobType || job.type === filters.jobType;

    const matchesLocationType =
      !filters.locationType || job.locationType === filters.locationType;

    const matchesExperience =
      !filters.experience || job.experienceLevel === filters.experience;

    const matchesPosted = (() => {
      if (!filters.posted) return true;
      const [min, max] = postedRanges[filters.posted];
      const hoursAgo = getHoursAgo(job.posted);
      return hoursAgo >= min && hoursAgo <= max;
    })();

    return (
      matchesSearch &&
      matchesJobType &&
      matchesLocationType &&
      matchesExperience &&
      matchesPosted
    );
  });

  return (
      <div className="min-h-screen bg-slate-50 px-4 py-6">
        {/* ---------- HEADER ---------- */}
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-indigo-600">
            Find Your Dream Job 🚀
          </h1>
          <p className="mt-2 text-slate-600">
            Explore verified opportunities tailored for you
          </p>
        </div>

        {/* ---------- SEARCH + FILTER BUTTON ---------- */}
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2 rounded-lg bg-white px-4 py-2 shadow-sm">
            <FaSearch className="text-slate-400" />
            <input
              type="text"
              placeholder="Search jobs, companies..."
              className="w-full outline-none text-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Mobile filter button */}
          <button
            onClick={() => setShowMobileFilters(true)}
            className="flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-white lg:hidden"
          >
            <FaFilter />
            Filters
          </button>
        </div>

        {/* ---------- MAIN LAYOUT ---------- */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* ---------- SIDEBAR (Desktop) ---------- */}
          <aside className="hidden rounded-xl bg-white p-4 shadow lg:col-span-3 lg:block">
            <h3 className="mb-4 font-semibold text-slate-800">Filters</h3>

            {[
              ["Job Type", "jobType", ["Full-time", "Part-time", "Internship"]],
              ["Location Type", "locationType", ["Remote", "Hybrid", "On-site"]],
              ["Experience", "experience", ["Entry", "Senior", "Executive"]],
            ].map(([label, key, options]) => (
              <div key={key} className="mb-4">
                <label className="mb-1 block text-sm font-medium text-slate-600">
                  {label}
                </label>
                <select
                  className="w-full rounded-lg border px-3 py-2 text-sm"
                  value={filters[key]}
                  onChange={(e) =>
                    setFilters({ ...filters, [key]: e.target.value })
                  }
                >
                  <option value="">All</option>
                  {options.map((opt) => (
                    <option key={opt}>{opt}</option>
                  ))}
                </select>
              </div>
            ))}
          </aside>

          {/* ---------- JOB LIST ---------- */}
          <main className="lg:col-span-9">
            <div className="space-y-4">
              {filteredJobs.length ? (
                filteredJobs.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))
              ) : (
                <p className="text-center text-slate-500">
                  No jobs found.
                </p>
              )}
            </div>
          </main>
        </div>

        {/* ---------- MOBILE FILTER DRAWER ---------- */}
        {showMobileFilters && (
          <div className="fixed inset-0 z-50 bg-black/40 lg:hidden">
            <div className="absolute bottom-0 w-full rounded-t-2xl bg-white p-5">
              <h3 className="mb-4 text-lg font-semibold">Filters</h3>

              {["jobType", "locationType", "experience"].map((key) => (
                <select
                  key={key}
                  className="mb-3 w-full rounded-lg border px-3 py-2"
                  value={filters[key]}
                  onChange={(e) =>
                    setFilters({ ...filters, [key]: e.target.value })
                  }
                >
                  <option value="">
                    {key.replace(/([A-Z])/g, " $1")}
                  </option>
                  <option>Full-time</option>
                  <option>Remote</option>
                  <option>Entry</option>
                </select>
              ))}

              <button
                onClick={() => setShowMobileFilters(false)}
                className="mt-3 w-full rounded-lg bg-indigo-600 py-2 text-white"
              >
                Apply Filters
              </button>
            </div>
          </div>
        )}
      </div>
  );
};

export default Jobs;
