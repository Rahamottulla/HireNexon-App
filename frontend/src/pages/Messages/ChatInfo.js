// frontend/src/pages/Messages/ChatInfo.js
import React from "react";
import { FaUserCircle, FaBell, FaImages, FaLock } from "react-icons/fa";
import "./Messages.css";

const ChatInfo = ({ chat }) => {
  if (!chat) return null;

  return (
    <div className="chat-info">
      <div className="info-header">
        <FaUserCircle className="info-avatar" />
        <h3>{chat.name}</h3>
        <p>Recruiter</p>
      </div>

      <div className="info-section">
        <h4>Chat Info</h4>
        <ul>
          <li><FaBell /> Notifications: On</li>
          <li><FaImages /> Shared Media</li>
          <li><FaLock /> End-to-end encrypted</li>
        </ul>
      </div>

      <div className="info-footer">
        <button className="info-btn">View Profile</button>
        <button className="info-btn danger">Block</button>
      </div>
    </div>
  );
};

export default ChatInfo;
