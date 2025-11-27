import React, { useState } from "react";
import ContestBannerCarousel from "./ContestBanner";
import { Helmet } from "react-helmet";
import { Search } from "lucide-react"; // 👈 search icon from lucide-react
import "./LiveContests.css";

const LiveContests = () => {
  const [contests] = useState([
    {
      id: 1,
      name: "Google Hackathon 2025",
      status: "Ongoing",
      description:
        "A coding competition by Google focusing on scalable cloud and AI-based solutions.",
      prize: "$10,000 + Internship Offer",
      deadline: "Nov 10, 2025",
    },
    {
      id: 2,
      name: "Amazon Code Challenge",
      status: "Upcoming",
      description:
        "Solve algorithmic challenges to showcase your problem-solving and optimization skills.",
      prize: "$8,000 + Amazon Swags",
      deadline: "Dec 2, 2025",
    },
    {
      id: 3,
      name: "Microsoft AI Contest",
      status: "Ended",
      description:
        "Develop creative AI applications using Azure services to solve real-world problems.",
      prize: "$12,000 + Mentorship",
      deadline: "Oct 10, 2025",
    },
  ]);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const filteredContests = contests.filter((c) => {
    const matchesFilter = filter === "All" || c.status === filter;
    const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <>
      <Helmet>
        <title>Live Contests | HireNexon</title>
      </Helmet>

      <div className="page-container">
       
      <h1 className="page-title"> Live Contests 🚀</h1>
        {/* 🔔 Welcome Scroll */}
  <div className="contest-welcome-scroll">
    <span className="contest-scroll-text">
      <span className="contest-blink-text">
      Welcome to HireNexon! 🎉 Explore ongoing contests, upcoming challenges and exciting opportunities - stay ready for what’s next!
      </span>
    </span>
  </div>
  {/* 🔍 Search & Filter */}
        <div className="controls">
          <div className="search-wrapper">
            <Search className="search-icon" size={18} />
            <input
              type="text"
              placeholder="Search contest..."
              className="search-box"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <select
            className="filter-select"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Ongoing">Ongoing</option>
            <option value="Upcoming">Upcoming</option>
            <option value="Ended">Ended</option>
          </select>
        </div>

  <ContestBannerCarousel />

        {/* 🏆 Contest Cards */}
        {filteredContests.length > 0 ? (
          filteredContests.map((c) => (
            <div
              key={c.id}
              className={`contest-card ${
                c.status.toLowerCase() === "ongoing" ? "active-card" : ""
              }`}
            >
              <div className="contest-info">
                <h3>{c.name}</h3>
                <p className="contest-desc">{c.description}</p>
                <p className="contest-meta">
                  <strong>Prize:</strong> {c.prize} |{" "}
                  <strong>Deadline:</strong> {c.deadline}
                </p>
              </div>

              <div className="contest-actions">
                <span className={`status ${c.status.toLowerCase()}`}>
                  {c.status}
                </span>
                <button className="view-btn">View Details</button>
              </div>
            </div>
          ))
        ) : (
          <p className="no-results">No contests found 🔍</p>
        )}
      </div>
    </>
  );
};

export default LiveContests;


