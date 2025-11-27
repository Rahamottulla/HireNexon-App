import React from "react";
import { Helmet } from "react-helmet";
import "./Communities.css";

const Communities = () => {
  return (
    <>
          <Helmet>
            <title>Communities | HireNexon</title>
          </Helmet>
    <div className="communities-container">
      <h2>Communities</h2>
      <p>Explore groups, connect with people, and join communities that interest you.</p>

      {/* Example list of communities */}
      <div className="community-list">
        <div className="community-card">Tech Enthusiasts</div>
        <div className="community-card">AI & ML Learners</div>
        <div className="community-card">Web Developers</div>
        <div className="community-card">Hackathon Participants</div>
      </div>
    </div>
    </>
  );
};

export default Communities;
