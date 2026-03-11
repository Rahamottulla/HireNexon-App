

// src/layouts/university/UniversityLayout.jsx
// ─────────────────────────────────────────────────────────────
// HireNexon — University Workspace Layout
// Usage:
//   <UniversityLayout orgName="MIT" orgLogo="/mit.png">
//     <YourPage />
//   </UniversityLayout>
//
// Or wrap routes:
//   <Route element={<UniversityLayout orgName="MIT" />}>
//     <Route path="dashboard" element={<Dashboard />} />
//     ...
//   </Route>
// ─────────────────────────────────────────────────────────────
import { Outlet } from "react-router-dom";
import BaseLayout from "../shared/BaseLayout";
import { UNIVERSITY_NAV } from "../shared/navConfig";

export default function UniversityLayout({ orgName = "Your University", orgLogo = null, children }) {
  return (
    <BaseLayout
      navItems={UNIVERSITY_NAV}
      workspaceType="university"
      orgName={orgName}
      orgLogo={orgLogo}
    >
      {children ?? <Outlet />}
    </BaseLayout>
  );
}

