// src/layouts/shared/navConfig.js
// ─────────────────────────────────────────────────────────────
// Central nav config for all workspace types.
// Import and pick the right one per layout.
// ─────────────────────────────────────────────────────────────

export const WORKSPACE_TYPES = {
  CANDIDATE:  "candidate",
  COMPANY:    "company",
  UNIVERSITY: "university",
};

// ── Company Sidebar Nav ──────────────────────────────────────
export const COMPANY_NAV = [
  {
    section: "Overview",
    items: [
      { label: "Dashboard",        icon: "grid_view",          path: "/company/dashboard" },
      { label: "Analytics",        icon: "bar_chart",          path: "/company/analytics" },
    ],
  },
  {
    section: "Hiring",
    items: [
      { label: "Job Postings",     icon: "work",               path: "/company/jobs",            badge: 3 },
      { label: "Applications",     icon: "description",        path: "/company/applications",    badge: 12 },
      { label: "Interviews",       icon: "video_call",         path: "/company/interviews" },
      { label: "Offer Letters",    icon: "mark_email_read",    path: "/company/offers" },
      { label: "Talent Pool",      icon: "groups",             path: "/company/talent" },
    ],
  },
  {
    section: "Engagement",
    items: [
      { label: "Contests",         icon: "emoji_events",       path: "/company/contests" },
      { label: "Propals",          icon: "handshake",          path: "/company/propals" },
      { label: "Messages",         icon: "chat_bubble",        path: "/company/messages",        badge: 5 },
    ],
  },
  {
    section: "Company",
    items: [
      { label: "Company Profile",  icon: "apartment",          path: "/company/profile" },
      { label: "Team Members",     icon: "manage_accounts",    path: "/company/team" },
      { label: "Billing & Plans",  icon: "credit_card",        path: "/company/billing" },
      { label: "Settings",         icon: "settings",           path: "/company/settings" },
    ],
  },
];

// ── University Sidebar Nav ───────────────────────────────────
export const UNIVERSITY_NAV = [
  {
    section: "Overview",
    items: [
      { label: "Dashboard",        icon: "grid_view",          path: "/university/dashboard" },
      { label: "Analytics",        icon: "bar_chart",          path: "/university/analytics" },
    ],
  },
  {
    section: "Placements",
    items: [
      { label: "Drive Calendar",   icon: "event",              path: "/university/drives" },
      { label: "Students",         icon: "school",             path: "/university/students",     badge: 8 },
      { label: "Applications",     icon: "description",        path: "/university/applications" },
      { label: "Offer Letters",    icon: "mark_email_read",    path: "/university/offers" },
      { label: "Reports",          icon: "assessment",         path: "/university/reports" },
    ],
  },
  {
    section: "Partnerships",
    items: [
      { label: "Companies",        icon: "corporate_fare",     path: "/university/companies" },
      { label: "Job Postings",     icon: "work",               path: "/university/jobs" },
      { label: "Contests",         icon: "emoji_events",       path: "/university/contests" },
    ],
  },
  {
    section: "Institution",
    items: [
      { label: "University Profile", icon: "account_balance",  path: "/university/profile" },
      { label: "Department Heads",   icon: "manage_accounts",  path: "/university/departments" },
      { label: "Settings",           icon: "settings",         path: "/university/settings" },
    ],
  },
];

// ── Top Navbar Items (shared across all workspaces) ──────────
export const NAVBAR_ITEMS = [
  { label: "Feed",       icon: "rss_feed",       path: "/feed" },
  { label: "Propals",    icon: "group_add",       path: "/propals" },
  { label: "Jobs",       icon: "work_outline",    path: "/jobs" },
  { label: "Contests",   icon: "emoji_events",    path: "/contests" },
  { label: "Messages",   icon: "chat_bubble_outline", path: "/messages", badge: true },
  { label: "Alerts",     icon: "notifications",   path: "/alerts",   badge: true },
];

// Workspace switcher options
export const WORKSPACES = [
  { label: "Personal Workspace",    dot: "brand",   path: "/candidate/dashboard" },
  { label: "Company Workspace",     dot: "emerald", path: "/company/dashboard" },
  { label: "University Workspace",  dot: "amber",   path: "/university/dashboard" },
];
