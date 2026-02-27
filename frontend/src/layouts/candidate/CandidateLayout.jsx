import { useState, Suspense } from "react";
import { Outlet } from "react-router-dom";
import { FaComments } from "react-icons/fa";

import CandidateNavbar from "@/layouts/candidate/CandidateLayout";
import CandidateHeader from "@/features/candidate/components/navbar/CandidateHeader";
import Sidebar from "@/features/candidate/components/Sidebar/Sidebar";
import ChatPopup from "@/features/candidate/pages/Messages/ChatPopup";

const CandidateLayout = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-slate-100">
      {/* Header */}
      <CandidateHeader
        onToggleSidebar={() =>
          setIsSidebarCollapsed((prev) => !prev)
        }
        onMessagesClick={() => setIsChatOpen(true)}
      />

      {/* Body */}
      <div className="flex flex-1">
        <Sidebar isCollapsed={isSidebarCollapsed} />

        <main
          className={`flex-1 p-5 bg-[#f6f6ed] rounded-xl shadow-sm transition-all duration-300
            ${isSidebarCollapsed ? "ml-16" : "ml-60"}`}
        >
          <Suspense fallback={<div>Loading page...</div>}>
            <Outlet />
          </Suspense>
        </main>
      </div>

      {/* Chat */}
      {isChatOpen ? (
        <ChatPopup
          isOpen={isChatOpen}
          onClose={() => setIsChatOpen(false)}
        />
      ) : (
        <button
          onClick={() => setIsChatOpen(true)}
          title="Open Chats"
          className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition"
        >
          <FaComments size={20} />
        </button>
      )}
    </div>
  );
};

export default CandidateLayout;
