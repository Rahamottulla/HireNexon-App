const AccreditationSection = ({ data }) => {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm">
      <h2 className="text-lg font-semibold mb-6">
        Accreditation & Rankings
      </h2>

      <div className="space-y-3 text-sm text-gray-600">
        <p><strong>Accreditation:</strong> {data.accreditation}</p>
        <p><strong>Ranking:</strong> {data.ranking}</p>
      </div>
    </div>
  );
};

export default AccreditationSection;