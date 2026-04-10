import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// your data (fixed months)
const data = [
  { month: "Jan", income: 40000, expense: 20000 },
  { month: "Feb", income: 40000, expense: 21000 },
  { month: "Mar", income: 40000, expense: 25000 },
  { month: "Apr", income: 45000, expense: 60000 },
  { month: "May", income: 47000, expense: 26000 },
  { month: "Jun", income: 50000, expense: 40000 },
  { month: "Jul", income: 50000, expense: 30000 },
];

export default function SimpleLineChart() {
  return (
    <div className="w-full h-75 sm:h-90 lg:h-100">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />

          {/* correct key */}
          <XAxis dataKey="month" tick={{ fontSize: 12 }} />

          <YAxis tick={{ fontSize: 12 }} />

          <Tooltip />
          <Legend />

          {/* income line */}
          <Line
            type="monotone"
            dataKey="income"
            stroke="#16a34a"
            strokeWidth={2}
          />

          {/* expense line */}
          <Line
            type="monotone"
            dataKey="expense"
            stroke="#dc2626"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
