import UniversityLayout from "@/features/university/components/layout/UniversityLayout";
import useUniversityAnalytics from "@/features/university/hooks/useUniversityAnalytics";
import Loader from "@/features/university/components/ui/Loader";

import ChartsSection from "./ChartsSection";

const Analytics = () => {
  const { data, loading, error } = useUniversityAnalytics();

  return (
    <UniversityLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">

        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Analytics
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Advanced placement insights and performance metrics.
          </p>
        </div>

        {loading && <Loader />}

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl">
            {error}
          </div>
        )}

        {!loading && data && (
          <ChartsSection analytics={data} />
        )}

      </div>
    </UniversityLayout>
  );
};

export default Analytics;