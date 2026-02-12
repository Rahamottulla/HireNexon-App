import React, { useState } from "react";
import useTitle from "@/shared/hooks/useTitle";
import { Search, Users } from "lucide-react";

const Communities = () => {
  useTitle("Communities");
  const [search, setSearch] = useState("");
  const [joined, setJoined] = useState([]);

  const communities = [
    {
      id: 1,
      name: "Tech Enthusiasts",
      category: "Technology",
      members: 1240,
      description: "Discuss latest tech trends, tools, and startups.",
    },
    {
      id: 2,
      name: "AI & ML Learners",
      category: "Artificial Intelligence",
      members: 980,
      description: "Learn AI, ML, and data science together.",
    },
    {
      id: 3,
      name: "Web Developers",
      category: "Development",
      members: 1560,
      description: "Frontend, backend, and full-stack discussions.",
    },
    {
      id: 4,
      name: "Hackathon Participants",
      category: "Competitions",
      members: 670,
      description: "Find teammates and hackathon opportunities.",
    },
  ];

  const toggleJoin = (id) => {
    setJoined((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const filteredCommunities = communities.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-slate-800">
            Communities 🌐
          </h1>
          <p className="text-slate-600 mt-1">
            Join communities, collaborate, and grow with like-minded people.
          </p>
        </div>

        {/* Search */}
        <div className="mb-6 flex items-center gap-3 bg-white p-3 rounded-xl shadow-sm border">
          <Search className="text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Search communities..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full outline-none text-sm"
          />
        </div>

        {/* Community Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCommunities.map((community) => {
            const isJoined = joined.includes(community.id);

            return (
              <div
                key={community.id}
                className="bg-white border rounded-xl p-5 shadow-sm hover:shadow-lg transition"
              >
                <div className="flex justify-between items-start mb-3">
                  <span className="text-xs font-medium bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                    {community.category}
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-slate-800 mb-1">
                  {community.name}
                </h3>

                <p className="text-sm text-slate-600 mb-4">
                  {community.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-sm text-slate-500">
                    <Users size={16} />
                    {community.members.toLocaleString()} members
                  </div>

                  <button
                    onClick={() => toggleJoin(community.id)}
                    className={`px-4 py-1.5 rounded-lg text-sm font-medium transition
                      ${
                        isJoined
                          ? "bg-slate-200 text-slate-700 hover:bg-slate-300"
                          : "bg-blue-600 text-white hover:bg-blue-700"
                      }`}
                  >
                    {isJoined ? "Joined" : "Join"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty state */}
        {filteredCommunities.length === 0 && (
          <p className="text-center text-slate-500 mt-10">
            No communities found 🔍
          </p>
        )}
      </div>
  );
};

export default Communities;
