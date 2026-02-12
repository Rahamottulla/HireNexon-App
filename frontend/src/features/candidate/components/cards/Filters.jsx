import React from "react";

const Filters = () => {
  return (
    <div className="bg-white rounded-xl p-4 shadow-md mb-4 transition hover:shadow-lg">
      <h4 className="font-semibold text-gray-800 mb-3">Filters</h4>

      <div className="text-sm text-gray-700 space-y-2">
        <label className="flex items-center gap-2">
          <input type="checkbox" />
          Remote Only
        </label>

        <label className="flex items-center gap-2">
          <input type="checkbox" />
          Internship
        </label>

        <label className="flex items-center gap-2">
          <input type="checkbox" />
          Full-time
        </label>
      </div>
    </div>
  );
};

export default Filters;
