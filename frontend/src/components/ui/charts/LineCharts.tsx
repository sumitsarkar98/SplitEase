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

import { useTrends } from "../../../HOOKS/dashboard/useTrends";
import Empty from "../../../pages/Empty";

export default function SimpleLineChart() {
  const { data = [], isLoading, isError } = useTrends();

  if (isLoading) {
    return <p className="text-center text-sm">Loading chart...</p>;
  }

  if (isError) {
    return (
      <p className="text-center text-sm text-red-500">Error loading chart</p>
    );
  }

  // EMPTY STATE
  if (!data || data.length === 0) {
    return (
      <div className="h-[250px] flex items-center justify-center">
        <Empty
          title="No trend data yet"
          buttonText="Add Transaction"
          link="/home/transactions"
        />
      </div>
    );
  }

  return (
    <div className="w-full h-75 sm:h-90 lg:h-100">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="month" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />

          <Tooltip />
          <Legend />

          <Line
            type="monotone"
            dataKey="income"
            stroke="#16a34a"
            strokeWidth={2}
          />

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
