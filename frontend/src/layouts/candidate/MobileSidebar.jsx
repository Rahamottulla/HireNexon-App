// frontend/src/layouts/candidate/MobileSidebar.jsx

const MobileSidebar = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />

      {/* Sidebar Panel */}
      <div className="absolute left-0 top-0 h-full w-64 bg-white shadow-xl p-5 transition-transform duration-300">
        <h2 className="text-lg font-semibold mb-4">Menu</h2>

        <button
          onClick={onClose}
          className="text-sm text-gray-500 hover:text-black"
        >
          Close
        </button>

        {/* Add sidebar links here later */}
      </div>
    </div>
  );
};

export default MobileSidebar;
