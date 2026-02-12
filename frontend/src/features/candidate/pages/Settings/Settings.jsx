import React from "react";

const Settings = () => {
  return (
    <div className="p-5">
      <h2 className="text-xl font-semibold mb-4">Settings</h2>

      <div className="flex flex-col gap-3">
        <label className="flex items-center gap-2 text-gray-800">
          <input
            type="checkbox"
            className="w-4 h-4 accent-blue-600 cursor-pointer"
          />
          Enable Notifications
        </label>

        <label className="flex items-center gap-2 text-gray-800">
          <input
            type="checkbox"
            className="w-4 h-4 accent-blue-600 cursor-pointer"
          />
          Dark Mode
        </label>

        <label className="flex items-center gap-2 text-gray-800">
          <input
            type="checkbox"
            className="w-4 h-4 accent-blue-600 cursor-pointer"
          />
          Auto Updates
        </label>
      </div>
    </div>
  );
};

export default Settings;
