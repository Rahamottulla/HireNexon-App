const DepartmentFilters = ({
  searchValue,
  statusValue,
  onSearchChange,
  onStatusChange,
  placeholder = "Search...",
  statusOptions = []
}) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm flex flex-col md:flex-row gap-4 md:items-center md:justify-between">

      <input
        type="text"
        value={searchValue}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder={placeholder}
        className="px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500 w-full md:w-64"
      />

      <select
        value={statusValue}
        onChange={(e) => onStatusChange(e.target.value)}
        className="px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500 w-full md:w-48"
      >
        {statusOptions.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

    </div>
  );
};

export default DepartmentFilters;