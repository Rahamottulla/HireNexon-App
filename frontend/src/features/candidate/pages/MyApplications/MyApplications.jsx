import { NavLink, Outlet } from "react-router-dom";

const tabs = [
  { name: "Applied Jobs", path: "applied-jobs" },
  { name: "Interviews", path: "interviews" },
  { name: "Offer Letters", path: "offers" },
  { name: "Hired", path: "hired" },
];

const MyApplications = () => {
  return (
    <div className="min-h-screen bg-slate-50 p-6">
      {/* Title */}
      <h1 className="mb-6 text-2xl font-bold text-slate-800">
        My Applications
      </h1>

      {/* Tabs */}
      <div className="mb-6 flex flex-wrap gap-3 border-b border-slate-200">
        {tabs.map((tab) => (
          <NavLink
            key={tab.name}
            to={tab.path}
            className={({ isActive }) =>
              `pb-2 text-sm font-medium transition ${
                isActive
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-slate-600 hover:text-blue-600"
              }`
            }
          >
            {tab.name}
          </NavLink>
        ))}
      </div>

      {/* Tab Content */}
      <div className="rounded-xl bg-white p-4 shadow-sm">
        <Outlet />
      </div>
    </div>
  );
};

export default MyApplications;
