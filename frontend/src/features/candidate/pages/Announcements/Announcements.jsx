import React, { useState } from "react";
import { Bell, Search, Filter } from "lucide-react";
import { announcementsData } from "./AnnouncementsData";

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
    <div className="min-h-screen bg-slate-50 p-6 md:p-10">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
        <h2 className="flex items-center gap-2 text-2xl font-semibold text-slate-800">
          <Bell className="text-indigo-600" />
          Announcements
        </h2>

        <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg shadow-sm w-full md:w-72">
          <Search size={18} className="text-slate-500" />
          <input
            type="text"
            placeholder="Search announcements..."
            className="w-full outline-none text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2 mb-8">
        <Filter size={18} className="text-slate-500" />
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-1.5 text-sm rounded-full font-medium transition
              ${
                filter === cat
                  ? "bg-indigo-600 text-white shadow"
                  : "bg-white text-slate-600 hover:bg-indigo-50 hover:text-indigo-600"
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Announcements Grid */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filteredAnnouncements.length > 0 ? (
          filteredAnnouncements.map((item) => (
            <div
              key={item.id}
              className="bg-white border-l-4 border-indigo-600 rounded-xl p-5 shadow-sm hover:shadow-md transition"
            >
              <h3 className="text-base font-semibold text-slate-800 mb-1">
                {item.title}
              </h3>

              <p className="text-xs text-slate-400 mb-2">{item.date}</p>

              <p className="text-sm text-slate-600 mb-3">
                {item.description}
              </p>

              <span className="inline-block bg-indigo-50 text-indigo-600 text-xs font-medium px-3 py-1 rounded-full">
                {item.category}
              </span>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-slate-500">
            No announcements found.
          </p>
        )}
      </div>
    </div>
  );
};

export default Announcements;
