const StudentsTable = ({ students }) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-50 text-xs uppercase text-gray-600">
          <tr>
            <th className="px-6 py-3 text-left">Name</th>
            <th className="px-6 py-3 text-left">Department</th>
            <th className="px-6 py-3 text-left">CGPA</th>
            <th className="px-6 py-3 text-left">Status</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-100">
          {students.map((s) => (
            <tr key={s.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 font-medium">{s.name}</td>
              <td className="px-6 py-4">{s.department}</td>
              <td className="px-6 py-4">{s.cgpa}</td>
              <td className="px-6 py-4">
                <span className="text-xs bg-green-100 text-green-600 px-3 py-1 rounded-full">
                  {s.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentsTable;
