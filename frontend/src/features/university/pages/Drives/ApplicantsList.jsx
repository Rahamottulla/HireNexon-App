import { useParams } from "react-router-dom";
import UniversityLayout from "@/features/university/components/layout/UniversityLayout";
import useDriveApplicants from "@/features/university/hooks/useDriveApplicants";
import Loader from "@/features/university/components/ui/Loader";
import Skeleton from "@/features/university/components/ui/Skeleton";
import Badge from "@/features/university/components/ui/Badge";

const ApplicantsList = () => {
  const { driveId } = useParams();
  const { applicants, loading, error } = useDriveApplicants(driveId);

  return (
    <UniversityLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Drive Applicants
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage and review students who applied for this drive.
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="bg-white rounded-2xl shadow-sm p-6 space-y-4">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="h-10 w-full" />
            ))}
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl">
            {error}
          </div>
        )}

        {/* Data Table */}
        {!loading && applicants?.length > 0 && (
          <div className="bg-white rounded-2xl shadow-sm overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50 border-b text-left">
                <tr>
                  <th className="px-6 py-4 font-medium">Name</th>
                  <th className="px-6 py-4 font-medium">Department</th>
                  <th className="px-6 py-4 font-medium">CGPA</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {applicants.map((applicant) => (
                  <tr
                    key={applicant._id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="px-6 py-4 font-medium">
                      {applicant.student?.name}
                    </td>

                    <td className="px-6 py-4 text-gray-600">
                      {applicant.student?.department}
                    </td>

                    <td className="px-6 py-4 text-gray-600">
                      {applicant.student?.cgpa}
                    </td>

                    <td className="px-6 py-4">
                      <Badge
                        color={
                          applicant.status === "selected"
                            ? "green"
                            : applicant.status === "rejected"
                            ? "red"
                            : "blue"
                        }
                      >
                        {applicant.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Empty State */}
        {!loading && applicants?.length === 0 && (
          <div className="bg-white p-12 rounded-2xl shadow-sm text-center text-gray-500">
            No applicants found for this drive.
          </div>
        )}

      </div>
    </UniversityLayout>
  );
};

export default ApplicantsList;