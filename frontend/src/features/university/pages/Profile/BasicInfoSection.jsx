const BasicInfoSection = ({ data }) => {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm">
      <h2 className="text-lg font-semibold mb-6">
        Basic Information
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600">
        <p><strong>Name:</strong> {data.name}</p>
        <p><strong>Established:</strong> {data.establishedYear}</p>
        <p><strong>Total Students:</strong> {data.totalStudents}</p>
        <p><strong>Accreditation:</strong> {data.accreditation}</p>
      </div>
    </div>
  );
};

export default BasicInfoSection;