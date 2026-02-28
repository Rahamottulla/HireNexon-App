const TopRecruitersSection = ({ recruiters }) => {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm">
      <h2 className="text-lg font-semibold mb-6">
        Top Recruiters
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {recruiters.map((company) => (
          <div
            key={company._id}
            className="border border-gray-100 p-6 rounded-xl hover:shadow-md transition"
          >
            <h3 className="font-semibold text-base">
              {company.name}
            </h3>
            <p className="text-sm text-gray-500 mt-2">
              Students Hired: {company.hiredCount}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopRecruitersSection;