// frontend/src/pages/Messages/ChatPopup.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion"; // ✅ Import Framer Motion
import { FaSearch, FaTimes, FaFilter, FaCog, FaExpand, FaEdit } from "react-icons/fa";
import "./Messages.css";

const ChatPopup = ({ isOpen = true, onClose, variant = "popup", onSelectChat }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const navigate = useNavigate();

  const chatsData = [
    { id: 1, name: "Riya Sharma", lastMsg: "Hey! How are you?", online: true },
    { id: 2, name: "Tech Community", lastMsg: "New post on AI updates", online: false },
    { id: 3, name: "Suraj", lastMsg: "Got the update done!", online: true },
    { id: 4, name: "Monika", lastMsg: "Let's meet tomorrow.", online: false },
    { id: 5, name: "Shubham", lastMsg: "Sent you the file.", online: true },
    { id: 6, name: "Growix Team", lastMsg: "Internship meeting today.", online: false },
    { id: 7, name: "Saurabh", lastMsg: "Can you check the PR?", online: true },
    { id: 8, name: "CU Coding Group", lastMsg: "Contest on Sunday!", online: false },
  ];

  const filteredChats = chatsData.filter(chat =>
    chat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleFullScreen = () => {
    if (variant === "popup") {
      onClose(false);
      navigate("/candidate/messages");
    }
  };

  return (
    <AnimatePresence>
      {(isOpen || variant === "page") && (
        <motion.div
          className={variant === "popup" ? "messenger-popup" : "messenger-page-left"}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.3 }}
        >
          {/* Header */}
          <div className="popup-header flex justify-between items-center">
            <h3>Messages</h3>
            <div className="flex gap-2">
              <button className="header-icon" title="New Message">
                <FaEdit />
              </button>
              <button className="header-icon" title="Settings">
                <FaCog />
              </button>
              {variant === "popup" && (
                <button className="header-icon" title="Full Screen" onClick={handleFullScreen}>
                  <FaExpand />
                </button>
              )}
              {variant === "popup" && (
                <button onClick={() => onClose(true)} className="close-btn" title="Close">
                  <FaTimes />
                </button>
              )}
            </div>
          </div>

          {/* Search Bar */}
          <div className="popup-search flex items-center px-3 py-2">
            <FaSearch className="mr-2 text-gray-500" />
            <input
              type="text"
              placeholder="Search messages..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaFilter className="ml-auto text-gray-500 cursor-pointer" />
          </div>

          {/* Filter Tabs */}
          <div className="filter-tabs flex justify-around border-b">
            {["All", "Unread", "Groups"].map(tab => (
              <button
                key={tab}
                className={`filter-tab ${activeFilter === tab ? "active" : ""}`}
                onClick={() => setActiveFilter(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Chat List */}
          <div className="chat-list">
            {filteredChats.length > 0 ? (
              filteredChats.map(chat => (
                <div
                  key={chat.id}
                  className="chat-item"
                  onClick={() => onSelectChat && onSelectChat(chat)}
                >
                  <div className="avatar">
                    <span className={`status-dot ${chat.online ? "online" : ""}`}></span>
                    {chat.name.charAt(0)}
                  </div>
                  <div className="chat-info">
                    <h4>{chat.name}</h4>
                    <p>{chat.lastMsg}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="no-chat">No chats found</p>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ChatPopup;


