import React, { useState } from "react";
import ContestBannerCarousel from "./ContestBanner";
import { Helmet } from "react-helmet";
import { Search } from "lucide-react";

const NexArena = () => {
  const [contests] = useState([
    {
      id: 1,
      name: "Google Hackathon 2025",
      status: "Ongoing",
      type: "Hackathon",
      description:
        "A coding competition by Google focusing on scalable cloud and AI-based solutions.",
      prize: "$10,000 + Internship Offer",
      deadline: "Nov 10, 2025",
    },
    {
      id: 2,
      name: "Amazon Code Challenge",
      status: "Upcoming",
      type: "Challenge",
      description:
        "Solve algorithmic challenges to showcase your problem-solving and optimization skills.",
      prize: "$8,000 + Amazon Swags",
      deadline: "Dec 2, 2025",
    },
    {
      id: 3,
      name: "Microsoft AI Contest",
      status: "Ended",
      type: "Hiring Arena",
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
    const matchesSearch = c.name
      .toLowerCase()
      .includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <>
      <Helmet>
        <title>NexArena | HireNexon</title>
      </Helmet>

      <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
        {/* Header */}
        <div className="text-center space-y-1">
          <h1 className="text-3xl font-bold text-blue-800">
            NexArena 🏆
          </h1>
          <p className="text-gray-600">
            Compete in hackathons, challenges & hiring arenas
          </p>
        </div>

        {/* Welcome Scroll */}
        <div className="overflow-hidden bg-slate-100 rounded-xl py-2">
          <div className="whitespace-nowrap animate-[marquee_35s_linear_infinite] text-center font-semibold text-slate-700">
            Welcome to NexArena 🎉 Compete. Prove your skills. Get hired.
          </div>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search challenges, hackathons..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full sm:w-48 py-2 px-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="All">All</option>
            <option value="Ongoing">Live</option>
            <option value="Upcoming">Upcoming</option>
            <option value="Ended">Completed</option>
          </select>
        </div>

        {/* Banner */}
        <ContestBannerCarousel />

        {/* Arena Cards */}
        <div className="space-y-4">
          {filteredContests.length > 0 ? (
            filteredContests.map((c) => (
              <div
                key={c.id}
                className={`flex flex-col md:flex-row justify-between gap-4 p-5 rounded-xl border shadow-sm transition
                  ${
                    c.status === "Ongoing"
                      ? "border-green-400 bg-green-50"
                      : "border-gray-200 bg-white"
                  }`}
              >
                {/* Info */}
                <div className="space-y-2">
                  <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-700">
                    {c.type}
                  </span>

                  <h3 className="text-xl font-semibold text-slate-800">
                    {c.name}
                  </h3>

                  <p className="text-gray-600 text-sm max-w-2xl">
                    {c.description}
                  </p>

                  <p className="text-sm text-gray-500">
                    <strong>Prize:</strong> {c.prize} &nbsp;|&nbsp;
                    <strong>Deadline:</strong> {c.deadline}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex md:flex-col items-start md:items-end gap-3">
                  <span
                    className={`px-4 py-1 rounded-full text-sm font-semibold
                      ${
                        c.status === "Ongoing"
                          ? "bg-green-200 text-green-700"
                          : c.status === "Upcoming"
                          ? "bg-yellow-200 text-yellow-700"
                          : "bg-red-200 text-red-700"
                      }`}
                  >
                    {c.status === "Ongoing" ? "Live" : c.status}
                  </span>

                  <button className="px-5 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition">
                    Enter Arena
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">
              No arenas found 🔍
            </p>
          )}
        </div>
      </div>

      {/* Tailwind animation */}
      <style>
        {`
          @keyframes marquee {
            0% { transform: translateX(100%); }
            100% { transform: translateX(-100%); }
          }
        `}
      </style>
    </>
  );
};

export default NexArena;
