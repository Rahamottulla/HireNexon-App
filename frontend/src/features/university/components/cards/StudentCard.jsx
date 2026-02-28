const StudentCard = ({ name, department, status }) => {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm">
      <h4 className="font-semibold">{name}</h4>
      <p className="text-sm text-gray-500">{department}</p>
      <p className="text-xs mt-2 text-blue-600">{status}</p>
    </div>
  );
};

export default StudentCard;