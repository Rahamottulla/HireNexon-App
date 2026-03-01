//frontend/src/layouts/candidate/CandidateLayout.jsx
import { useState, Suspense } from "react";
import { Outlet } from "react-router-dom";
import { FaComments } from "react-icons/fa";

import ChatPopup from "@/features/candidate/pages/Messages/ChatPopup";
import CandidateNavbar from "./CandidateNavbar";
import CandidateSidebar from "./CandidateSidebar";
import MobileSidebar from "./MobileSidebar";

const PageLoader = () => (
  <div style={{
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "200px",
    gap: 12,
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    color: "#94a3b8",
    fontSize: 14,
  }}>
    <span style={{
      width: 18, height: 18,
      border: "2.5px solid #e2e8f0",
      borderTopColor: "#6366f1",
      borderRadius: "50%",
      animation: "spin 0.7s linear infinite",
      display: "inline-block",
    }} />
    Loading…
    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
  </div>
);

const CandidateLayout = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');

        * { box-sizing: border-box; }

        .hn-layout {
          min-height: 100vh;
          background: #f0f2f7;
          display: flex;
          flex-direction: column;
          font-family: 'Plus Jakarta Sans', sans-serif;
        }

        .hn-body {
          display: flex;
          flex: 1;
          overflow: hidden;
        }

        .hn-main {
          flex: 1;
          overflow-y: auto;
          overflow-x: hidden;
          padding: 20px;
          scrollbar-width: thin;
          scrollbar-color: #cbd5e1 transparent;
        }
        .hn-main::-webkit-scrollbar { width: 5px; }
        .hn-main::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }

        .hn-content-card {
          background: white;
          min-height: calc(100vh - 100px);
          border-radius: 18px;
          box-shadow: 0 1px 3px rgba(30,41,59,0.05), 0 4px 16px rgba(30,41,59,0.04);
          padding: 28px;
          transition: all 0.3s ease;
        }

        /* Floating chat button */
        .hn-chat-fab {
          position: fixed;
          bottom: 24px;
          right: 24px;
          width: 52px;
          height: 52px;
          border-radius: 50%;
          background: linear-gradient(135deg, #6366f1, #818cf8);
          color: white;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 20px rgba(99, 102, 241, 0.45);
          transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.2s;
          z-index: 90;
        }
        .hn-chat-fab:hover {
          transform: scale(1.12);
          box-shadow: 0 6px 28px rgba(99, 102, 241, 0.55);
        }
        .hn-chat-fab:active {
          transform: scale(0.96);
        }
        .hn-chat-fab-ping {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background: rgba(99, 102, 241, 0.35);
          animation: ping 1.6s ease-in-out infinite;
        }
        @keyframes ping {
          0%   { transform: scale(1); opacity: 0.6; }
          70%  { transform: scale(1.5); opacity: 0; }
          100% { transform: scale(1.5); opacity: 0; }
        }

        /* Mobile sidebar overlay */
        .mobile-sidebar-overlay {
          display: none;
        }
        @media (max-width: 1023px) {
          .hn-main { padding: 12px; }
          .hn-content-card { border-radius: 14px; padding: 18px; }
        }
      `}</style>

      <div className="hn-layout">
        <CandidateNavbar
          isSidebarCollapsed={isSidebarCollapsed}
          onToggleSidebar={() => setIsSidebarCollapsed(prev => !prev)}
          onOpenMobileMenu={() => setIsMobileSidebarOpen(true)}
          onMessagesClick={() => setIsChatOpen(true)}
        />

        <div className="hn-body">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block" style={{ flexShrink: 0 }}>
            <CandidateSidebar isCollapsed={isSidebarCollapsed} />
          </div>

          {/* Mobile Sidebar */}
          <MobileSidebar
            isOpen={isMobileSidebarOpen}
            onClose={() => setIsMobileSidebarOpen(false)}
          />

          {/* Main Content */}
          <main className="hn-main">
            <div className="hn-content-card">
              <Suspense fallback={<PageLoader />}>
                <Outlet />
              </Suspense>
            </div>
          </main>
        </div>

        {/* Chat Popup */}
        {isChatOpen && (
          <ChatPopup
            isOpen={isChatOpen}
            onClose={() => setIsChatOpen(false)}
          />
        )}

        {/* Floating Chat Button */}
        {!isChatOpen && (
          <button
            onClick={() => setIsChatOpen(true)}
            className="hn-chat-fab"
            title="Open Messages"
          >
            <span className="hn-chat-fab-ping" />
            <FaComments size={20} />
          </button>
        )}
      </div>
    </>
  );
};

export default CandidateLayout;

