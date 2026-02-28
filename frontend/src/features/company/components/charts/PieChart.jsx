import {
  PieChart as RePieChart,
  Pie,
  Tooltip,
  Cell,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#111827", "#374151", "#6B7280", "#9CA3AF", "#D1D5DB"];

const PieChart = ({
  data = [],
  dataKey = "value",
  nameKey = "name",
  title,
}) => {
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
      {title && (
        <h3 className="text-sm font-semibold text-gray-800 mb-4">
          {title}
        </h3>
      )}

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <RePieChart>
            <Tooltip />
            <Pie
              data={data}
              dataKey={dataKey}
              nameKey={nameKey}
              outerRadius={100}
              innerRadius={60}
              paddingAngle={4}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </RePieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PieChart;
