import LineChart from "@/features/university/components/charts/LineChart";
import BarChart from "@/features/university/components/charts/BarChart";
import PlacementChart from "@/features/university/components/charts/PlacementChart";

const ChartsSection = ({ analytics }) => {
  return (
    <div className="space-y-10">

      {/* Row 1 */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-2xl shadow-sm">
          <h2 className="text-lg font-semibold mb-6">
            Placement Trend
          </h2>
          <LineChart data={analytics.placementTrend} />
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-sm">
          <h2 className="text-lg font-semibold mb-6">
            Department Comparison
          </h2>
          <BarChart data={analytics.departmentComparison} />
        </div>
      </div>

      {/* Row 2 */}
      <div className="bg-white p-8 rounded-2xl shadow-sm">
        <h2 className="text-lg font-semibold mb-6">
          Company-wise Hiring Distribution
        </h2>
        <PlacementChart data={analytics.companyDistribution} />
      </div>

    </div>
  );
};

export default ChartsSection;