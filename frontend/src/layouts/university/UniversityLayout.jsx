//frontend/src/layouts/university/UniversityLayout.jsx
import { useState, Suspense } from "react";
import { Outlet } from "react-router-dom";
import { FaComments } from "react-icons/fa";
import PageLoader from "@/shared/components/common/PageLoader";

import UniversityNavbar  from "./UniversityNavbar";
import UniversitySidebar from "./UniversitySidebar";
import MobileSidebar     from "./MobileSidebar";

const UniversityLayout = () => {
  const [isSidebarCollapsed,  setIsSidebarCollapsed]  = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isChatOpen,          setIsChatOpen]          = useState(false);

  return (
    <div className="hn-layout">
      <UniversityNavbar
        isSidebarCollapsed={isSidebarCollapsed}
        onToggleSidebar={() => setIsSidebarCollapsed(prev => !prev)}
        onOpenMobileMenu={() => setIsMobileSidebarOpen(true)}
      />

      <div className="hn-body">
        <div className="hidden lg:block shrink-0">
          <UniversitySidebar isCollapsed={isSidebarCollapsed} />
        </div>

        <MobileSidebar
          isOpen={isMobileSidebarOpen}
          onClose={() => setIsMobileSidebarOpen(false)}
        />

        <main className="hn-main">
          <div className="hn-content">
            <Suspense fallback={<PageLoader />}>
              <Outlet />
            </Suspense>
          </div>
        </main>
      </div>

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

export default UniversityLayout;
