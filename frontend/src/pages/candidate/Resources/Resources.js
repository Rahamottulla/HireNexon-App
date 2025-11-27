import React, { useState } from "react";
import { Search, FileText } from "lucide-react";
import "./Resources.css";

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
    <div className="rsx-page-container">
      {/* ---------- Header ---------- */}
      <div className="rsx-header">
        <h2 className="rsx-page-title">
          <FileText size={24} /> HireNexon Resources
        </h2>
        <div className="rsx-search-box">
          <Search size={16} />
          <input
            type="text"
            placeholder="Search resources..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* ---------- Filters ---------- */}
      <div className="rsx-filters">
        {["All", "Guide", "Video", "Article"].map((type) => (
          <button
            key={type}
            className={`rsx-filter-btn ${filter === type ? "rsx-active" : ""}`}
            onClick={() => setFilter(type)}
          >
            {type}
          </button>
        ))}
      </div>

      {/* ---------- Resource Grid ---------- */}
      <div className="rsx-grid">
        {filteredResources.length > 0 ? (
          filteredResources.map((res, idx) => (
            <div key={idx} className="rsx-card">
              <h3 className="rsx-card-title">{res.title}</h3>
              <p className="rsx-card-type">{res.type}</p>
              <p className="rsx-card-date">{res.date}</p>
              <button className="rsx-card-btn">View / Download</button>
            </div>
          ))
        ) : (
          <p className="rsx-empty">No resources found.</p>
        )}
      </div>
    </div>
  );
};

export default Resources;


