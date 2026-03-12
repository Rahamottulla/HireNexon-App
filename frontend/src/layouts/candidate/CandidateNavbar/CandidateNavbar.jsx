// navbar/CandidateNavbar.jsx
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import {
  IconIndent, IconOutdent,
  IconFeed, IconPropals, IconJobs,
  IconContests, IconMessages, IconAlerts,
} from "./NavIcons";
import NavSearch        from "./NavSearch";
import WorkspaceDropdown from "./WorkspaceDropdown";
import ProfileDropdown  from "./ProfileDropdown";

// ── Nav items config ─────────────────────────────────────────────
const NAV_ITEMS = [
  { to: "/candidate/feed",           label: "Feed",     Icon: IconFeed     },
  { to: "/candidate/propals",        label: "Propals",  Icon: IconPropals  },
  { to: "/candidate/jobs",           label: "Jobs",     Icon: IconJobs     },
  { to: "/candidate/live-contests",  label: "NexArena", Icon: IconContests },
];

// ── NavItem ──────────────────────────────────────────────────────
const NavItem = ({ to, label, Icon }) => {
  const { pathname } = useLocation();
  const active = pathname === to;

  return (
    <Link
      to={to}
      className={`relative flex flex-col items-center gap-0.5 px-2.5 py-1.5
        rounded-xl transition-all duration-150 cursor-pointer no-underline group
        ${active ? "bg-transparent" : "hover:bg-slate-100"}`}
    >
      {/* Icon */}
      <span className={`flex h-[30px] w-[30px] items-center justify-center rounded-lg
        transition-all duration-150
        ${active
          ? "text-brand-500"
          : "text-slate-500 group-hover:text-brand-500 group-hover:-translate-y-px"
        }`}>
        <Icon size={18} />
      </span>

      {/* Label */}
      <span className={`text-[11px] whitespace-nowrap transition-colors duration-150
        ${active
          ? "text-brand-500 font-semibold"
          : "text-slate-500 font-medium group-hover:text-brand-500"
        }`}>
        {label}
      </span>

      {/* Active underline */}
      {active && (
        <span className="absolute -bottom-px left-[20%] right-[20%] h-[2.5px]
          rounded-t-full bg-gradient-to-r from-brand-500 to-brand-400" />
      )}
    </Link>
  );
};

// ── NavButton (for click-handler items: Messages, Alerts) ────────
const NavButton = ({ label, Icon, onClick, badge = false }) => (
  <button
    onClick={onClick}
    className="relative flex flex-col items-center gap-0.5 px-2.5 py-1.5
      rounded-xl border-none bg-transparent cursor-pointer
      hover:bg-slate-100 transition-all duration-150 group"
  >
    <span className="relative flex h-[30px] w-[30px] items-center justify-center rounded-lg
      text-slate-500 group-hover:text-brand-500 group-hover:-translate-y-px transition-all duration-150">
      <Icon size={18} />
      {badge && (
        <span className="absolute top-0.5 right-0.5 h-2 w-2 rounded-full
          bg-rose-500 border-2 border-white" />
      )}
    </span>
    <span className="text-[11px] font-medium whitespace-nowrap text-slate-500
      group-hover:text-brand-500 transition-colors duration-150">
      {label}
    </span>
  </button>
);

// ── CandidateNavbar ──────────────────────────────────────────────
const CandidateNavbar = ({
  isSidebarCollapsed,
  onToggleSidebar,
  onOpenMobileMenu,
  onMessagesClick,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [activeWorkspace, setActiveWorkspace] = useState("personal");

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 4);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 flex h-[60px] items-center gap-2 px-5
        border-b border-border-subtle bg-white/[0.97] backdrop-blur-xl
        transition-shadow duration-300
        ${scrolled ? "shadow-navbar" : ""}`}
    >
      {/* ── Desktop sidebar toggle ─────────────────────────────── */}
      <button
        onClick={onToggleSidebar}
        title={isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        className="hidden lg:flex h-9 w-9 items-center justify-center rounded-xl
          bg-slate-100 text-slate-600 cursor-pointer border-none
          hover:bg-slate-200 hover:text-slate-900 hover:scale-[1.06]
          active:scale-[0.94] transition-all duration-150"
      >
        {isSidebarCollapsed ? <IconIndent size={16} /> : <IconOutdent size={16} />}
      </button>

      {/* ── Mobile menu toggle ────────────────────────────────── */}
      <button
        onClick={onOpenMobileMenu}
        title="Open menu"
        className="flex lg:hidden h-9 w-9 items-center justify-center rounded-xl
          bg-slate-100 text-slate-600 cursor-pointer border-none
          hover:bg-slate-200 hover:text-slate-900 hover:scale-[1.06]
          active:scale-[0.94] transition-all duration-150"
      >
        <IconIndent size={16} />
      </button>

      {/* ── Logo (icon only) ──────────────────────────────────── */}
      <Link
        to="/candidate/dashboard"
        className="flex items-center mr-1 shrink-0"
        aria-label="HireNexon home"
      >
        <img
          src="/icons/favicon.png"
          alt="HireNexon"
          className="h-9 w-auto object-contain"
        />
      </Link>

      {/* ── Search ────────────────────────────────────────────── */}
      <NavSearch />

      {/* ── Nav items ─────────────────────────────────────────── */}
      <nav className="flex items-center gap-0.5 ml-auto overflow-visible">
        {NAV_ITEMS.map(item => <NavItem key={item.to} {...item} />)}

        <NavButton
          label="Messages"
          Icon={IconMessages}
          onClick={onMessagesClick}
          badge
        />

        <Link
          to="/candidate/notifications"
          className="relative flex flex-col items-center gap-0.5 px-2.5 py-1.5
            rounded-xl no-underline hover:bg-slate-100 transition-all duration-150 group"
        >
          <span className="relative flex h-[30px] w-[30px] items-center justify-center rounded-lg
            text-slate-500 group-hover:text-brand-500 group-hover:-translate-y-px transition-all duration-150">
            <IconAlerts size={18} />
            <span className="absolute top-0.5 right-0.5 h-2 w-2 rounded-full
              bg-rose-500 border-2 border-white" />
          </span>
          <span className="text-[11px] font-medium text-slate-500
            group-hover:text-brand-500 transition-colors duration-150">
            Alerts
          </span>
        </Link>
      </nav>

      {/* ── Right cluster ─────────────────────────────────────── */}
      <div className="flex items-center gap-2 ml-2.5 shrink-0">
        <WorkspaceDropdown
          activeId={activeWorkspace}
          onSwitch={setActiveWorkspace}
        />
        <ProfileDropdown
          activeWorkspaceId={activeWorkspace}
          onSwitchWorkspace={setActiveWorkspace}
        />
      </div>
    </header>
  );
};

export default CandidateNavbar;
