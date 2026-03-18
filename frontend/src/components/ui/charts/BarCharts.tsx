import type { BarchartDataType } from "../../../types/DataTypes";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const BarData: BarchartDataType[] = [
  { month: "Jan", income: 50000, expense: 32000 },
  { month: "Feb", income: 42000, expense: 28000 },
  { month: "May", income: 48000, expense: 30000 },
  { month: "Jun", income: 55000, expense: 37000 },
  { month: "aug", income: 55000, expense: 37000 },
];

const BarCharts = () => {
  return (
    <div className="w-full h-100">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={BarData}
          margin={{
            top: 10,
            right: 10,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="month" tick={{ fontSize: 12 }} />

          <YAxis
            width={40}
            tick={{ fontSize: 12 }}
            tickFormatter={(value) => `${value / 1000}k`}
          />

          <Tooltip />

          <Legend />

          <Bar dataKey="income" fill="#16a34a" radius={[6, 6, 0, 0]} />

          <Bar dataKey="expense" fill="#dc2626" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarCharts;
