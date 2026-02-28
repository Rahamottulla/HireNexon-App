const DepartmentTable = ({ departments, onEdit }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-50 border-b text-left">
          <tr>
            <th className="px-6 py-4 font-medium">Name</th>
            <th className="px-6 py-4 font-medium">HOD</th>
            <th className="px-6 py-4 font-medium">Students</th>
            <th className="px-6 py-4 font-medium">Placed</th>
            <th className="px-6 py-4 font-medium">Actions</th>
          </tr>
        </thead>

        <tbody>
          {departments.map((dept) => (
            <tr
              key={dept._id}
              className="border-b hover:bg-gray-50 transition"
            >
              <td className="px-6 py-4 font-medium">
                {dept.name}
              </td>
              <td className="px-6 py-4 text-gray-600">
                {dept.hod}
              </td>
              <td className="px-6 py-4 text-gray-600">
                {dept.totalStudents}
              </td>
              <td className="px-6 py-4 text-gray-600">
                {dept.placedStudents}
              </td>
              <td className="px-6 py-4">
                <button
                  onClick={() => onEdit(dept)}
                  className="text-blue-600 text-sm font-medium hover:underline"
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DepartmentTable;