import React, { useState, useEffect } from "react";
import { FaUserFriends, FaUsers, FaUserPlus, FaPaperPlane, FaBuilding, 
FaCalendarAlt, FaBookmark, } from "react-icons/fa";
import { FaPeopleGroup } from "react-icons/fa6";
import useTitle from "@/shared/hooks/useTitle";

const Propals = () => {
  useTitle("Propals");
  const [activeMenu, setActiveMenu] = useState("My Propals");
  const [activeTab, setActiveTab] = useState("requests");
  const [subFilter, setSubFilter] = useState("all");

  useEffect(() => {
    if (activeTab === "suggestions" || activeTab === "nexwish") {
      setSubFilter("all");
    }
  }, [activeTab]);

  const sidebarItems = [
    { name: "My Propals", icon: <FaUserFriends />, online: 240, total: 500 },
    { name: "Followers", icon: <FaUserPlus />, total: 700 },
    { name: "Following", icon: <FaPaperPlane />, total: 100 },
    { name: "Groups", icon: <FaPeopleGroup />, total: 120 },
    { name: "Communities", icon: <FaUsers />, total: 70 },
    { name: "Pages", icon: <FaBuilding />, total: 80 },
    { name: "Events", icon: <FaCalendarAlt />, total: 50 },
    { name: "Saved Profiles", icon: <FaBookmark />, total: 120 },
  ];

  const requests = [
    {
      id: 1,
      name: "Arjun Sharma",
      title: "Frontend Developer @Google",
      location: "Mumbai, India",
      mutualConnections: 10,
      avatar: "/images/hnn.jpg",
    },
    {
      id: 2,
      name: "Riya Singh",
      title: "UI/UX Designer @Amazon",
      location: "Delhi, India",
      mutualConnections: 5,
      avatar: "/images/y.jpg",
    },
  ];

  const suggestions = [
    {
      id: 3,
      name: "Rahul Verma",
      headline: "Backend Developer @Microsoft",
      cover: "/images/hirenexon-logo.png",
      avatar: "/images/y.jpg",
      mutualConnections: 5,
    },
    {
      id: 4,
      name: "Neha Kapoor",
      headline: "Data Scientist @TCS",
      cover: "/images/hirenexon-logo.png",
      avatar: "/images/h.jpg",
      mutualConnections: 3,
    },
  ];

  return (
      <div className="flex gap-3 bg-[#f6f6ed] min-h-screen p-3 font-['Poppins']">

        {/* ---------- LEFT SIDEBAR ---------- */}
        <aside className="w-[330px] bg-white rounded-xl shadow-md p-4 h-fit">
          <h3 className="text-xl font-semibold text-blue-600 border-b pb-1 mb-3">
            My Network
          </h3>

          <ul className="flex flex-col gap-2">
            {sidebarItems.map((item) => (
              <li
                key={item.name}
                onClick={() => setActiveMenu(item.name)}
                className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition
                  ${activeMenu === item.name
                    ? "bg-blue-600 text-white"
                    : "bg-gray-50 hover:bg-blue-50"}
                `}
              >
                <div className="flex items-center gap-2 flex-1">
                  <span
                    className={`text-lg ${
                      activeMenu === item.name ? "text-white" : "text-blue-600"
                    }`}
                  >
                    {item.icon}
                  </span>
                  <span>{item.name}</span>
                </div>

                {item.online && (
                  <span className="text-sm font-medium">
                    <span className="inline-block w-2 h-2 bg-green-600 rounded-full mr-1"></span>
                    {item.online}
                  </span>
                )}

                {item.total && (
                  <span className={`font-semibold ${activeMenu === item.name ? "text-white" : "text-black"}`}>
                    {item.total}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </aside>

        {/* ---------- MAIN ---------- */}
        <main className="flex-1 flex flex-col gap-4">

          {/* ---------- FILTERS ---------- */}
          <div className="bg-white rounded-xl border shadow-sm p-4">
            <div className="flex gap-2 mb-3">
              {["requests", "suggestions", "nexwish"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-2 rounded-lg border font-medium transition
                    ${activeTab === tab
                      ? "border-blue-600 text-blue-600 shadow"
                      : "hover:bg-blue-50"}
                  `}
                >
                  {tab === "requests" && "Propal Requests"}
                  {tab === "suggestions" && "Suggestions"}
                  {tab === "nexwish" && "NexWish 🎉"}
                </button>
              ))}
            </div>

            {(activeTab === "suggestions" || activeTab === "nexwish") && (
              <div className="flex flex-wrap gap-2">
                {[
                  "all",
                  ...(activeTab === "suggestions"
                    ? ["university", "roles", "activities", "nearby"]
                    : ["celebrations", "education", "opportunities", "milestones"]),
                ].map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setSubFilter(filter)}
                    className={`px-4 h-9 rounded-lg border text-sm font-medium
                      ${subFilter === filter
                        ? "bg-blue-600 text-white"
                        : "bg-gray-50 hover:bg-blue-50"}
                    `}
                  >
                    {filter.charAt(0).toUpperCase() + filter.slice(1)}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ---------- CONTENT ---------- */}
          <div className="bg-white rounded-xl border shadow-sm p-4">

            {/* REQUESTS */}
            {activeTab === "requests" && (
              <div className="flex flex-col">
                {requests.map((person) => (
                  <div
                    key={person.id}
                    className="flex items-center gap-4 p-4 border-b last:border-none hover:bg-blue-50 transition"
                  >
                    <img
                      src={person.avatar}
                      className="w-14 h-14 rounded-full object-cover"
                      alt={person.name}
                    />

                    <div className="flex-1">
                      <p className="font-semibold">{person.name}</p>
                      <p className="text-sm text-gray-600">{person.title}</p>
                      <p className="text-sm text-gray-500">{person.location}</p>
                      <p className="text-xs text-gray-400">
                        {person.mutualConnections} mutual connections
                      </p>
                    </div>

                    <div className="flex gap-2">
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                        Accept
                      </button>
                      <button className="px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200">
                        Decline
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* SUGGESTIONS */}
            {activeTab === "suggestions" && (
              <div className="flex flex-wrap gap-4">
                {suggestions.map((person) => (
                  <div
                    key={person.id}
                    className="w-[220px] border rounded-xl overflow-hidden text-center hover:shadow transition"
                  >
                    <img src={person.cover} className="h-20 w-full object-cover" />
                    <img
                      src={person.avatar}
                      className="w-16 h-16 rounded-full mx-auto -mt-8 border-4 border-white"
                    />
                    <div className="p-3">
                      <h4 className="font-semibold">{person.name}</h4>
                      <p className="text-sm text-gray-600">{person.headline}</p>
                      <p className="text-xs text-gray-400 mb-2">
                        {person.mutualConnections} mutual connections
                      </p>
                      <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
                        Send Propal
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* NEXWISH */}
            {activeTab === "nexwish" && (
              <div className="text-center py-10">
                <h4 className="text-lg font-semibold mb-2">
                  ✨ Share your NexWish with your network!
                </h4>
                <p className="text-gray-500">Coming soon...</p>
              </div>
            )}
          </div>
        </main>
      </div>
  );
};

export default Propals;
