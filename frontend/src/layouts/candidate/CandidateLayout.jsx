//frontend/src/layouts/candidate/CandidateLayout.jsx
import { useState, Suspense } from "react";
import { Outlet } from "react-router-dom";
import { FaComments } from "react-icons/fa";

import ChatPopup from "@/features/candidate/pages/Messages/ChatPopup";
import CandidateNavbar from "./CandidateNavbar";
import CandidateSidebar from "./CandidateSidebar";
import MobileSidebar from "./MobileSidebar";

const CandidateLayout = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col">
    
    {/* Navbar */}
    <CandidateNavbar
      onToggleSidebar={() => setIsSidebarCollapsed(prev => !prev)}
      onOpenMobileMenu={() => setIsMobileSidebarOpen(true)}
      onMessagesClick={() => setIsChatOpen(true)}
    />

    {/* Main Body */}
    <div className="flex flex-1">
      
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <CandidateSidebar isCollapsed={isSidebarCollapsed} />
      </div>

      {/* Mobile Sidebar */}
      <MobileSidebar
        isOpen={isMobileSidebarOpen}
        onClose={() => setIsMobileSidebarOpen(false)}
      />

      {/* Content */}
      <main className="flex-1 p-4 lg:p-6 overflow-y-auto">
        <div className="bg-[#f6f6ed] min-h-full rounded-2xl shadow-sm p-6 transition-all duration-300">
          <Suspense fallback={<div>Loading page...</div>}>
            <Outlet />
          </Suspense>
        </div>
      </main>

    </div>

    {/* Floating Chat */}
    {isChatOpen && (
      <ChatPopup
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
      />
    )}

    {!isChatOpen && (
      <button
        onClick={() => setIsChatOpen(true)}
        title="Open Chats"
        className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 hover:scale-110 active:scale-95 text-white p-4 rounded-full shadow-xl transition-all duration-300"
      >
        <FaComments size={20} />
      </button>
    )}

  </div>
);
};

export default CandidateLayout;

