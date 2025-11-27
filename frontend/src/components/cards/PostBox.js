import React from "react";
import "./cards.css";

const PostBox = () => {
  return (
    <div className="card">
      <div className="flex">
        <img
          src="https://via.placeholder.com/48"
          alt="User"
          className="avatar"
        />
        <input
          type="text"
          placeholder="Start a post..."
          style={{
            flex: 1,
            border: "1px solid #d1d5db",
            borderRadius: "24px",
            padding: "10px 16px",
          }}
        />
      </div>
      <div
        style={{
          marginTop: "12px",
          display: "flex",
          justifyContent: "space-around",
          fontSize: "0.9rem",
          color: "#6b7280",
        }}
      >
        <span>📸 Photo</span>
        <span>🎥 Video</span>
        <span>📰 Article</span>
      </div>
    </div>
  );
};

export default PostBox;
