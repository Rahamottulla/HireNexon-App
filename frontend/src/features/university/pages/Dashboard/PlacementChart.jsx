import LineChart from "@/features/university/components/charts/LineChart";

const PlacementChart = ({ data }) => {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm">
      <h2 className="text-lg font-semibold mb-6">
        Placement Trend
      </h2>
      <LineChart data={data} />
    </div>
  );
};

export default PlacementChart;