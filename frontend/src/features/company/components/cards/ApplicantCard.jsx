const StudentCard = ({ student }) => {
  return (
    <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
      <h4 className="font-medium text-gray-900">{student.name}</h4>
      <p className="text-sm text-gray-500">{student.department}</p>
      <p className="text-xs text-gray-400 mt-1">
        CGPA: {student.cgpa}
      </p>
    </div>
  );
};

export default StudentCard;
