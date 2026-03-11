

// src/layouts/company/CompanyLayout.jsx
// ─────────────────────────────────────────────────────────────
// HireNexon — Company Workspace Layout
// Usage:
//   <CompanyLayout orgName="Acme Corp" orgLogo="/acme.png">
//     <YourPage />
//   </CompanyLayout>
//
// Or wrap routes:
//   <Route element={<CompanyLayout orgName="Acme Corp" />}>
//     <Route path="dashboard" element={<Dashboard />} />
//     ...
//   </Route>
// ─────────────────────────────────────────────────────────────
import { Outlet } from "react-router-dom";
import BaseLayout from "../shared/BaseLayout";
import { COMPANY_NAV } from "../shared/navConfig";

export default function CompanyLayout({ orgName = "Your Company", orgLogo = null, children }) {
  return (
    <BaseLayout
      navItems={COMPANY_NAV}
      workspaceType="company"
      orgName={orgName}
      orgLogo={orgLogo}
    >
      {children ?? <Outlet />}
    </BaseLayout>
  );
}

