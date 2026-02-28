import { X } from "lucide-react";
import { NavLink } from "react-router-dom";

const nav = [
  { name: "Dashboard", path: "/company/dashboard" },
  { name: "Students", path: "/company/students" },
  { name: "Drives", path: "/company/drives" },
  { name: "Analytics", path: "/company/analytics" },
];

const MobileSidebar = ({ open, onClose }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex lg:hidden">
      <div className="bg-black/40 w-full" onClick={onClose} />

      <div className="w-64 bg-white shadow-xl p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4"
        >
          <X size={18} />
        </button>

        <nav className="mt-10 space-y-3">
          {nav.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className="block px-4 py-2 rounded-xl text-sm text-gray-600 hover:bg-gray-100"
              onClick={onClose}
            >
              {item.name}
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default MobileSidebar;
