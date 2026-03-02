//frontend/src/layouts/candidate/CandidateLayout.jsx
import { useState, Suspense } from "react";
import { Outlet } from "react-router-dom";
import { FaComments } from "react-icons/fa";

import ChatPopup from "@/features/candidate/pages/Messages/ChatPopup";
import CandidateNavbar from "./CandidateNavbar";
import CandidateSidebar from "./CandidateSidebar";
import MobileSidebar from "./MobileSidebar";

const PageLoader = () => (
  <div className="flex items-center justify-center h-[200px] gap-3 text-slate-400 text-sm font-jakarta">
    <span className="w-[18px] h-[18px] border-[2.5px] border-slate-200 border-t-brand-500 rounded-full animate-spin-sm inline-block" />
    Loading…
  </div>
);

const CandidateLayout = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className="hn-layout">
      <CandidateNavbar
        isSidebarCollapsed={isSidebarCollapsed}
        onToggleSidebar={() => setIsSidebarCollapsed(prev => !prev)}
        onOpenMobileMenu={() => setIsMobileSidebarOpen(true)}
        onMessagesClick={() => setIsChatOpen(true)}
      />

      <div className="hn-body">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block shrink-0">
          <CandidateSidebar isCollapsed={isSidebarCollapsed} />
        </div>

        {/* Mobile Sidebar */}
        <MobileSidebar
          isOpen={isMobileSidebarOpen}
          onClose={() => setIsMobileSidebarOpen(false)}
        />

        {/* Main Content */}
        <main className="hn-main">
          <div className="hn-content">
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
          className="hn-fab border-none cursor-pointer"
          title="Open Messages"
        >
          <span className="absolute inset-0 rounded-full bg-brand-500/35 animate-ping-fab" />
          <FaComments size={20} />
        </button>
      )}
    </div>
  );
};

export default CandidateLayout;


