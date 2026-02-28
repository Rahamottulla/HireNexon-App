import {
  LineChart as ReLineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const LineChart = ({ data }) => {
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm h-80">
      <ResponsiveContainer width="100%" height="100%">
        <ReLineChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke="#000" />
        </ReLineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChart;
