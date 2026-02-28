import BarChart from "@/features/university/components/charts/BarChart";

const DepartmentBreakdown = ({ data }) => {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm">
      <h2 className="text-lg font-semibold mb-6">
        Department Performance
      </h2>
      <BarChart data={data} />
    </div>
  );
};

export default DepartmentBreakdown;