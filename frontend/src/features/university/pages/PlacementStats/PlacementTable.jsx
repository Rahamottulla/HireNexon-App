const PlacementTable = ({ placements }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-50 border-b text-left">
          <tr>
            <th className="px-6 py-4 font-medium">Student</th>
            <th className="px-6 py-4 font-medium">Department</th>
            <th className="px-6 py-4 font-medium">Company</th>
            <th className="px-6 py-4 font-medium">Package</th>
          </tr>
        </thead>
        <tbody>
          {placements.map((item) => (
            <tr
              key={item._id}
              className="border-b hover:bg-gray-50 transition"
            >
              <td className="px-6 py-4">
                {item.student?.name}
              </td>
              <td className="px-6 py-4 text-gray-600">
                {item.student?.department}
              </td>
              <td className="px-6 py-4 text-gray-600">
                {item.company?.name}
              </td>
              <td className="px-6 py-4 text-gray-600">
                ₹ {item.package} LPA
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PlacementTable;