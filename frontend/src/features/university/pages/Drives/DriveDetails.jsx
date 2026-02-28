import { useParams } from "react-router-dom";
import UniversityLayout from "@/features/university/components/layout/UniversityLayout";
import Loader from "@/features/university/components/ui/Loader";
import useDriveDetails from "@/features/university/hooks/useDriveDetails";

const DriveDetails = () => {
  const { id } = useParams();
  const { drive, loading, error } = useDriveDetails(id);

  return (
    <UniversityLayout>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {loading && <Loader />}

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl">
            {error}
          </div>
        )}

        {!loading && drive && (
          <div className="bg-white p-8 rounded-2xl shadow-sm space-y-8">

            <div>
              <h1 className="text-3xl font-bold">
                {drive.company?.name}
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                {drive.role}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600">
              <p><strong>Date:</strong> {drive.date}</p>
              <p><strong>Status:</strong> {drive.status}</p>
              <p><strong>Package:</strong> ₹ {drive.package} LPA</p>
              <p><strong>Eligible Students:</strong> {drive.eligibleCount}</p>
            </div>

            {drive.description && (
              <div>
                <h2 className="text-lg font-semibold mb-2">
                  Description
                </h2>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {drive.description}
                </p>
              </div>
            )}

          </div>
        )}

      </div>
    </UniversityLayout>
  );
};

export default DriveDetails;