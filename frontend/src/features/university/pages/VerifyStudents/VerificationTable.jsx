const VerificationTable = ({ students, onAction }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-50 border-b text-left">
          <tr>
            <th className="px-6 py-4 font-medium">Name</th>
            <th className="px-6 py-4 font-medium">Department</th>
            <th className="px-6 py-4 font-medium">CGPA</th>
            <th className="px-6 py-4 font-medium">Actions</th>
          </tr>
        </thead>

        <tbody>
          {students.map((student) => (
            <tr
              key={student._id}
              className="border-b hover:bg-gray-50 transition"
            >
              <td className="px-6 py-4 font-medium">
                {student.name}
              </td>
              <td className="px-6 py-4 text-gray-600">
                {student.department}
              </td>
              <td className="px-6 py-4 text-gray-600">
                {student.cgpa}
              </td>
              <td className="px-6 py-4 flex gap-3">
                <button
                  onClick={() => onAction(student, "approve")}
                  className="text-green-600 text-sm font-medium hover:underline"
                >
                  Approve
                </button>
                <button
                  onClick={() => onAction(student, "reject")}
                  className="text-red-600 text-sm font-medium hover:underline"
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VerificationTable;