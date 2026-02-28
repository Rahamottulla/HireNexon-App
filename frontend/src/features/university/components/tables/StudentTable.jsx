const StudentTable = ({ data = [] }) => {
  return (
    <div className="bg-white rounded-2xl shadow overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="p-3">Name</th>
            <th className="p-3">Department</th>
            <th className="p-3">Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((student, i) => (
            <tr key={i} className="border-t">
              <td className="p-3">{student.name}</td>
              <td className="p-3">{student.department}</td>
              <td className="p-3">{student.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentTable;