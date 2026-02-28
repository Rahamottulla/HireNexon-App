import CustomBarChart from "./BarChart";
import CustomLineChart from "./LineChart";

const PlacementChart = ({ barData, lineData }) => {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
      <CustomBarChart data={barData} />
      <CustomLineChart data={lineData} />
    </div>
  );
};

export default PlacementChart;