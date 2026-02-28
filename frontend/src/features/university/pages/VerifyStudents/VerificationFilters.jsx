const VerificationFilters = () => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm flex flex-col md:flex-row gap-4 md:items-center md:justify-between">

      <input
        type="text"
        placeholder="Search student..."
        className="px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500 w-full md:w-64"
      />

      <select className="px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500 w-full md:w-48">
        <option value="">All Departments</option>
      </select>

    </div>
  );
};

export default VerificationFilters;