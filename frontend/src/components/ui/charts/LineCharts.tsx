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

import type { DetailsTransactionType } from "../../../types/DataTypes";

interface LineChartsProps {
  data: DetailsTransactionType[];
}

const LineCharts = ({ data }: LineChartsProps) => {
  const chartData = data.reduce((acc: any[], txn) => {
    const existing = acc.find((item) => item.date === txn.date);

    if (existing) {
      if (txn.type === "income") {
        existing.income += txn.amount;
      } else {
        existing.expense += txn.amount;
      }
    } else {
      acc.push({
        date: txn.date,
        income: txn.type === "income" ? txn.amount : 0,
        expense: txn.type === "expense" ? txn.amount : 0,
      });
    }

    return acc;
  }, []);

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-2 md:p-6">
      <h2 className="text-lg text-center md:text-start md:text-xl text-slate-600 font-semibold capitalize py-4 mb-4">
        Income vs Expense Trend
      </h2>

      <div className="w-full h-75 md:h-100">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="date" tick={{ fontSize: 12 }} />

            <YAxis
              width={40}
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => `${value / 1000}k`}
            />

            <Tooltip />
            <Legend />

            <Line
              type="monotone"
              dataKey="income"
              stroke="#16a34a"
              strokeWidth={3}
              dot={{ r: 4 }}
            />

            <Line
              type="monotone"
              dataKey="expense"
              stroke="#dc2626"
              strokeWidth={3}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default LineCharts;
