const StudentHeader = ({ onAdd, onBulkUpload }) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Students
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage and monitor student records.
        </p>
      </div>

      <div className="flex gap-3">
        <button
          onClick={onBulkUpload}
          className="px-4 py-2 rounded-xl border border-gray-300 text-sm font-medium hover:bg-gray-50 transition"
        >
          Bulk Upload
        </button>

        <button
          onClick={onAdd}
          className="bg-blue-600 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-blue-700 transition"
        >
          + Add Student
        </button>
      </div>
    </div>
  );
};

export default StudentHeader;