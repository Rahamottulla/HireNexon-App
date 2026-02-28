import { Link } from "react-router-dom";

const CompanyList = ({ companies }) => {
  if (!companies.length) {
    return (
      <div className="bg-white p-10 rounded-2xl shadow-sm text-center text-gray-500">
        No companies found.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
      {companies.map((company) => (
        <Link
          key={company._id}
          to={`/university/companies/${company._id}`}
          className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">
              {company.name}
            </h3>
            <span className="text-xs px-3 py-1 bg-green-100 text-green-600 rounded-full">
              {company.status}
            </span>
          </div>

          <div className="mt-4 space-y-2 text-sm text-gray-600">
            <p>
              Total Drives:{" "}
              <span className="font-medium">
                {company.totalDrives}
              </span>
            </p>
            <p>
              Students Hired:{" "}
              <span className="font-medium">
                {company.totalHired}
              </span>
            </p>
          </div>

          <div className="mt-6 text-blue-600 text-sm font-medium">
            View Details →
          </div>
        </Link>
      ))}
    </div>
  );
};

export default CompanyList;