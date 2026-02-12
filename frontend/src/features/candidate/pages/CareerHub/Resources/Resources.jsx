import React, { useState } from "react";
import { Search, FileText } from "lucide-react";

const resourceData = [
  { title: "Resume Tips", type: "Guide", date: "2025-09-25" },
  { title: "Interview Preparation", type: "Video", date: "2025-09-28" },
  { title: "Top Tech Skills 2025", type: "Article", date: "2025-10-01" },
  { title: "Freelancing 101", type: "Guide", date: "2025-10-03" },
];

const Resources = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const filteredResources = resourceData.filter((res) => {
    const matchesSearch = res.title.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "All" || res.type === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
        <h2 className="flex items-center gap-2 text-3xl font-bold text-slate-800">
          <FileText className="text-blue-600" size={26} />
          HireNexon Resources
        </h2>

        <div className="flex items-center gap-2 rounded-xl bg-white px-4 py-2 shadow-sm border border-gray-200 w-full sm:w-72">
          <Search size={16} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search resources..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full text-sm outline-none bg-transparent"
          />
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-8">
        {["All", "Guide", "Video", "Article"].map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`rounded-full px-5 py-2 text-sm font-medium transition
              ${
                filter === type
                  ? "bg-indigo-600 text-white shadow-md"
                  : "bg-white text-slate-600 border border-gray-200 hover:bg-indigo-50 hover:text-indigo-600"
              }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Resource Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.length > 0 ? (
          filteredResources.map((res, idx) => (
            <div
              key={idx}
              className="flex flex-col justify-between rounded-2xl bg-white p-6 border border-gray-200 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div>
                <h3 className="text-xl font-semibold text-sky-600 mb-2">
                  {res.title}
                </h3>

                <div className="flex items-center gap-3 text-sm text-slate-600 mb-4">
                  <span className="rounded-full bg-slate-100 px-3 py-1 font-medium">
                    {res.type}
                  </span>
                  <span className="text-slate-500">{res.date}</span>
                </div>
              </div>

              <button className="mt-auto inline-flex items-center justify-center rounded-lg bg-sky-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-sky-600 active:scale-95">
                View / Download
              </button>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-slate-500">
            No resources found.
          </p>
        )}
      </div>
    </div>
  );
};

export default Resources;
