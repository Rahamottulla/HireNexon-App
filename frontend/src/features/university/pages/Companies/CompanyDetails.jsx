import { useParams } from "react-router-dom";
import UniversityLayout from "@/features/university/components/layout/UniversityLayout";
import useCompanyDetails from "@/features/university/hooks/useCompanyDetails";
import Loader from "@/features/university/components/ui/Loader";

const CompanyDetails = () => {
  const { id } = useParams();
  const { company, loading, error } = useCompanyDetails(id);

  return (
    <UniversityLayout>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {loading && <Loader />}

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl">
            {error}
          </div>
        )}

        {!loading && company && (
          <div className="bg-white p-8 rounded-2xl shadow-sm space-y-8">

            <div>
              <h1 className="text-3xl font-bold">
                {company.name}
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                {company.industry}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600">
              <p>
                <strong>Total Drives:</strong> {company.totalDrives}
              </p>
              <p>
                <strong>Total Hired:</strong> {company.totalHired}
              </p>
              <p>
                <strong>Average Package:</strong> ₹ {company.avgPackage} LPA
              </p>
              <p>
                <strong>Last Visit:</strong> {company.lastVisit}
              </p>
            </div>

            {company.description && (
              <div>
                <h2 className="text-lg font-semibold mb-2">
                  About Company
                </h2>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {company.description}
                </p>
              </div>
            )}

          </div>
        )}

      </div>
    </UniversityLayout>
  );
};

export default CompanyDetails;