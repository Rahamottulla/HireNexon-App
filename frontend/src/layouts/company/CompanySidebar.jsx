import { NavLink } from "react-router-dom";

const nav = [
  { name: "Dashboard", path: "/company/dashboard" },
  { name: "Students", path: "/company/students" },
  { name: "Drives", path: "/company/drives" },
  { name: "Analytics", path: "/company/analytics" },
];

const Sidebar = () => {
  return (
    <aside className="hidden lg:flex w-64 bg-white border-r border-gray-100 flex-col">
      <div className="p-6 font-bold text-lg">HireNexon</div>

      <nav className="px-4 space-y-2">
        {nav.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `block px-4 py-2 rounded-xl text-sm transition ${
                isActive
                  ? "bg-black text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`
            }
          >
            {item.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
