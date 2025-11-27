import React, { useState } from "react";
import { Bell, Search, Filter } from "lucide-react";
import "./Announcements.css";

const announcementsData = [
  {
    id: 1,
    title: "🎉 New Internship Opportunities!",
    date: "2025-10-04",
    category: "Career",
    description:
      "Several top companies have opened new internship roles. Apply now via the Career Portal!",
  },
  {
    id: 2,
    title: "🚀 System Update Scheduled",
    date: "2025-10-01",
    category: "System",
    description:
      "Our servers will undergo maintenance on Oct 8th from 2 AM - 4 AM. Expect short downtime.",
  },
  {
    id: 3,
    title: "📚 New Courses Available!",
    date: "2025-09-30",
    category: "Education",
    description:
      "Check out the newly launched AI/ML and Blockchain short-term certification courses.",
  },
  {
    id: 4,
    title: "💡 Job Fair 2025",
    date: "2025-09-25",
    category: "Event",
    description:
      "Join us for the Annual Job Fair on Oct 20th at the university auditorium. Meet top recruiters!",
  },
];

const Announcements = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("All");

  const categories = ["All", "Career", "System", "Education", "Event"];

  const filteredAnnouncements = announcementsData.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === "All" || item.category === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="anx-container">
      {/* ---------- Header ---------- */}
      <div className="anx-header">
        <h2 className="anx-title">
          <Bell className="anx-bell-icon" />
          Announcements
        </h2>

        <div className="anx-search-box">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search announcements..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* ---------- Filters ---------- */}
      <div className="anx-filters">
        <Filter className="anx-filter-icon" size={18} />
        {categories.map((cat) => (
          <button
            key={cat}
            className={`anx-filter-btn ${
              filter === cat ? "anx-active" : ""
            }`}
            onClick={() => setFilter(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* ---------- Announcements Grid ---------- */}
      <div className="anx-grid">
        {filteredAnnouncements.length > 0 ? (
          filteredAnnouncements.map((item) => (
            <div key={item.id} className="anx-card">
              <h3>{item.title}</h3>
              <p className="anx-date">{item.date}</p>
              <p className="anx-desc">{item.description}</p>
              <span className="anx-badge">{item.category}</span>
            </div>
          ))
        ) : (
          <p className="anx-empty">No announcements found.</p>
        )}
      </div>
    </div>
  );
};

export default Announcements;

