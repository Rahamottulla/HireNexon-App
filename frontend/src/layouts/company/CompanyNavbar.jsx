import { Menu, Bell } from "lucide-react";

const Topbar = ({ title, onMenuClick }) => {
  return (
    <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="lg:hidden"
        >
          <Menu size={20} />
        </button>
        <h1 className="text-lg font-semibold text-gray-900">
          {title}
        </h1>
      </div>

      <div className="flex items-center gap-5">
        <Bell size={18} className="text-gray-600 cursor-pointer" />
        <div className="w-8 h-8 bg-gray-200 rounded-full" />
      </div>
    </header>
  );
};

export default Topbar;
