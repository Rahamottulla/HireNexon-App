//frontend/src/layouts/Layout/Layout.js
import React, { useState, Suspense } from "react";
import { Outlet } from "react-router-dom";
import CandidateHeader from "../../components/candidateHeader/candidateHeader";
import Sidebar from "../../components/Sidebar/Sidebar";
import ChatPopup from "../../pages/Messages/Chatpopup";
import { FaComments } from "react-icons/fa";
import "./Layout.css";

const Layout = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => setIsChatOpen(prev => !prev);

  return (
    <div className="user-page">
      {/* Header */}
      <CandidateHeader
        onToggleSidebar={() => setIsSidebarCollapsed(prev => !prev)}
        onMessagesClick={toggleChat}
      />

      <div className="user-body flex">
        <Sidebar isCollapsed={isSidebarCollapsed} />
      <div className="user-content flex-1 p-4">
  <Suspense fallback={<div>Loading page...</div>}>
    <Outlet />
  </Suspense>
</div>

      </div>

      {/* Chat popup */}
      {isChatOpen ? (
        <ChatPopup isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
      ) : (
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
