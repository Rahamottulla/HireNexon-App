import { Link } from "react-router-dom";
import UniversityLayout from "@/features/university/components/layout/UniversityLayout";
import Loader from "@/features/university/components/ui/Loader";
import useDrives from "@/features/university/hooks/useDrives";

const Drives = () => {
  const { drives, loading, error } = useDrives();

  return (
    <UniversityLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Placement Drives
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Manage and monitor recruitment drives.
            </p>
          </div>

          <Link
            to="/university/drives/create"
            className="bg-blue-600 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-blue-700 transition"
          >
            + Create Drive
          </Link>
        </div>

        {/* States */}
        {loading && <Loader />}

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl">
            {error}
          </div>
        )}

        {!loading && drives?.length === 0 && (
          <div className="bg-white p-10 rounded-2xl shadow-sm text-center text-gray-500">
            No drives available.
          </div>
        )}

        {/* Grid */}
        {!loading && drives?.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
            {drives.map((drive) => (
              <Link
                key={drive._id}
                to={`/university/drives/${drive._id}`}
                className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition border border-gray-100"
              >
                <h3 className="text-lg font-semibold">
                  {drive.company?.name}
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  {drive.role}
                </p>

                <div className="mt-4 text-sm text-gray-600 space-y-1">
                  <p>Date: {drive.date}</p>
                  <p>Status: {drive.status}</p>
                </div>

                <div className="mt-6 text-blue-600 text-sm font-medium">
                  View Details →
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </UniversityLayout>
  );
};

export default Drives;