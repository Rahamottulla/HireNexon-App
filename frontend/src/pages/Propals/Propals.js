import React, { useState, useEffect } from "react";
import { FaUserFriends, FaUsers, FaUserPlus, FaPaperPlane, FaBuilding, FaCalendarAlt, FaBookmark, FaLayerGroup,
} from "react-icons/fa";
import { FaPeopleGroup } from "react-icons/fa6";
import { Helmet } from "react-helmet";
import "./Propals.css";

import "./Propals.css";

const Propals = () => {
  const [activeMenu, setActiveMenu] = useState("My Propals");
  const [activeTab, setActiveTab] = useState("requests");
  const [subFilter, setSubFilter] = useState("all"); // For Suggestions/NexWish subfilters

  // 🟢 Reset subFilter to "all" whenever Suggestions or NexWish tab is opened
  useEffect(() => {
    if (activeTab === "suggestions" || activeTab === "nexwish") {
      setSubFilter("all");
    }
  }, [activeTab]);

  const sidebarItems = [
  { name: "My Propals", icon: <FaUserFriends />, online: 240, total: 500 },
  { name: "Followers", icon: <FaUserPlus />, total: 700 },
  { name: "Following", icon: <FaPaperPlane />, total: 100 },
  { name: "Groups", icon: < FaPeopleGroup />, total: 120 },
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
    <>
      <Helmet>
      <title>Propals | HireNexon</title>
      </Helmet>
    <div className="propals-container">
      {/* ---------- LEFT SIDEBAR ---------- */}
      <aside className="propals-sidebar">
        <h3 className="sidebar-title">My Network</h3>
        <ul className="sidebar-links">
          {sidebarItems.map((item) => (
            <li
  key={item.name}
  className={`sidebar-item ${activeMenu === item.name ? "active" : ""}`}
  onClick={() => setActiveMenu(item.name)}
>
  <span className="sidebar-icon">{item.icon}</span>
  <span className="sidebar-name">{item.name}</span>
  
  {item.online ? (
    <span className="online-count">
      (<span className="dot"></span> {item.online} online)
    </span>
  ) : null}

  {item.total && <span className="sidebar-total">{item.total}</span>}
</li>

          ))}
        </ul>
      </aside>

      {/* ---------- MAIN CONTENT ---------- */}
      <main className="propals-main">
        {/* ---------- Div 1: Tabs / Filters ---------- */}
        <div className="propals-filters-section">
          <div className="propals-tabs">
            <button
              className={`propals-tab ${
                activeTab === "requests" ? "active" : ""
              }`}
              onClick={() => setActiveTab("requests")}
            >
              Propal Requests
            </button>
            <button
              className={`propals-tab ${
                activeTab === "suggestions" ? "active" : ""
              }`}
              onClick={() => setActiveTab("suggestions")}
            >
              Suggestions
            </button>
            <button
              className={`propals-tab ${
                activeTab === "nexwish" ? "active" : ""
              }`}
              onClick={() => setActiveTab("nexwish")}
            >
              NexWish 🎉
            </button>
          </div>

          {/* Subfilters for Suggestions */}
          {activeTab === "suggestions" && (
            <div className="propals-subfilters">
              <button
                className={subFilter === "all" ? "active" : ""}
                onClick={() => setSubFilter("all")}
              >
                All
              </button>
               <button
                className={subFilter === "university" ? "active" : ""}
                onClick={() => setSubFilter("university")}
              >
                Your University
              </button>
              <button
                className={subFilter === "roles" ? "active" : ""}
                onClick={() => setSubFilter("roles")}
              >
                Similar Roles
              </button>
              <button
                className={subFilter === "activities" ? "active" : ""}
                onClick={() => setSubFilter("activities")}
              >
                Recent Activities
              </button>
              <button
                className={subFilter === "nearby" ? "active" : ""}
                onClick={() => setSubFilter("nearby")}
              >
               Nearby You
              </button>
            </div>
          )}

          {/* Subfilters for NexWish */}
          {activeTab === "nexwish" && (
            <div className="propals-subfilters">
              <button
                className={subFilter === "all" ? "active" : ""}
                onClick={() => setSubFilter("all")}
              >
                All
              </button>
              
              <button
                className={subFilter === "celebrations" ? "active" : ""}
                onClick={() => setSubFilter("celebrations")}
              >
                Celebrations
              </button>
              <button
                className={subFilter === "education" ? "active" : ""}
                onClick={() => setSubFilter("education")}
              >
                Education
              </button>
              <button
                className={subFilter === "opportunities" ? "active" : ""}
                onClick={() => setSubFilter("opportunities")}
              >
               Opportunities
              </button>
              <button
                className={subFilter === "milestones" ? "active" : ""}
                onClick={() => setSubFilter("milestones")}
              >
                Milestones
              </button>
            </div>
          )}
        </div>

        {/* ---------- Div 2: Content ---------- */}
        <div className="propals-content-section">
          {activeTab === "requests" && (
            <div className="propals-request-section">
              {requests.map((person) => (
                <div key={person.id} className="propals-request-row">
                  <img
                    src={person.avatar}
                    alt={person.name}
                    className="propals-request-avatar"
                  />
                  <div className="propals-request-info">
                    <span className="propals-request-name">{person.name}</span>
                    <span className="propals-request-title">
                      {person.title}
                    </span>
                    <span className="propals-request-location">
                      {person.location}
                    </span>
                    <span className="propals-request-connections">
                      {person.mutualConnections} mutual connections
                    </span>
                  </div>
                  <div className="propals-request-actions">
                    <button className="propals-btn accept">Accept</button>
                    <button className="propals-btn decline">Decline</button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "suggestions" && (
            <div className="propals-suggestions">
              {suggestions.map((person) => (
                <div key={person.id} className="propals-card">
                  <img
                    src={person.cover}
                    alt="Cover"
                    className="propals-card-cover"
                  />
                  <img
                    src={person.avatar}
                    alt={person.name}
                    className="propals-card-avatar"
                  />
                  <div className="propals-card-info">
                    <h4 className="propals-card-name">{person.name}</h4>
                    <p className="propals-card-headline">
                      {person.headline}
                    </p>
                    <p className="propals-card-connections">
                      {person.mutualConnections} mutual connections
                    </p>
                    <button className="propals-card-btn">Send Propal</button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "nexwish" && (
            <div className="propals-nexwish">
              <h4>✨ Share your NexWish with your network!</h4>
              <p>Coming soon...</p>
            </div>
          )}
        </div>
      </main>
    </div>
    </>
  );
};

export default Propals;
