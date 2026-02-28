import LineChart from "@/features/company/components/charts/LineChart";
import BarChart from "@/features/company/components/charts/BarChart";
import PieChart from "@/features/company/components/charts/PieChart";

const ChartsSection = ({ data }) => {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
      <LineChart
        title="Hiring Trend"
        data={data?.trend}
        xKey="month"
        dataKey="value"
      />

      <BarChart
        title="Department Hiring"
        data={data?.departments}
        xKey="name"
        dataKey="count"
      />

      <PieChart
        title="Offer Distribution"
        data={data?.offers}
        nameKey="name"
        dataKey="value"
      />
    </div>
  );
};

export default ChartsSection;