import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import CandidateHeader from "../../components/candidateHeader/candidateHeader";
import Sidebar from "../../components/Sidebar/Sidebar";
import ChatPopup from "../../pages/Messages/Chatpopup";
import { FaComments } from "react-icons/fa";
import "./Layout.css";

const Layout = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [isChatOpen, setIsChatOpen] = useState(false); // 👈 controls chat popup visibility

  const toggleChat = () => setIsChatOpen(!isChatOpen);

  return (
    <div className="user-page">
      {/* Header */}
      <CandidateHeader
        onToggleSidebar={() => setIsSidebarVisible(!isSidebarVisible)}
        onMessagesClick={toggleChat} // 👈 pass handler to header
      />

      <div className="user-body flex">
        {isSidebarVisible && <Sidebar onMessagesClick={toggleChat} />} {/* 👈 optional if you want sidebar control */}

        <div className="user-content flex-1 p-4">
          <Outlet />
        </div>
      </div>

      {/* ✅ Chat popup */}
      {isChatOpen ? (
        <ChatPopup isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
      ) : (
        // ✅ Mini chat bubble when popup is closed
        <button
          className="mini-chat-btn"
          onClick={() => setIsChatOpen(true)}
          title="Open Chats"
        >
          <FaComments />
        </button>
      )}
    </div>
  );
};

export default Layout;


