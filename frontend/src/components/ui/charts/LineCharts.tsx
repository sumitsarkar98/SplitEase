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

interface Transaction {
  id: number;
  date: string;
  category: string;
  description: string;
  amount: number;
  type: "income" | "expense";
}
const initialTransactions: Transaction[] = [
  {
    id: 1,
    date: "12 Mar 2026",
    category: "Food",
    description: "Lunch",
    amount: 250,
    type: "expense",
  },
  {
    id: 2,
    date: "11 Mar 2026",
    category: "Salary",
    description: "March Salary",
    amount: 50000,
    type: "income",
  },
  {
    id: 3,
    date: "10 Mar 2026",
    category: "Travel",
    description: "Metro",
    amount: 120,
    type: "expense",
  },
  {
    id: 4,
    date: "10 Mar 2026",
    category: "Travel",
    description: "Metro",
    amount: 140,
    type: "expense",
  },
  {
    id: 5,
    date: "09 Mar 2026",
    category: "Shopping",
    description: "Clothes",
    amount: 1800,
    type: "expense",
  },
  {
    id: 6,
    date: "08 Mar 2026",
    category: "Freelance",
    description: "Website project",
    amount: 12000,
    type: "income",
  },
  {
    id: 7,
    date: "07 Mar 2026",
    category: "Bills",
    description: "Electricity Bill",
    amount: 2100,
    type: "expense",
  },
  {
    id: 8,
    date: "06 Mar 2026",
    category: "Food",
    description: "Dinner",
    amount: 450,
    type: "expense",
  },
  {
    id: 9,
    date: "05 Mar 2026",
    category: "Investment",
    description: "Stock profit",
    amount: 3500,
    type: "income",
  },
  {
    id: 10,
    date: "04 Mar 2026",
    category: "Travel",
    description: "Bus ticket",
    amount: 80,
    type: "expense",
  },
];

const LineCharts = () => {
  // Convert transactions → chart data
  const chartData = initialTransactions.reduce((acc: any[], txn) => {
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
      <h2 className="text-lg text-center md:text-start md:text-xl text-slate-600 hover:text-green-700 cursor-pointer font-semibold capitalize py-4 mb-4">
        Income vs Expense Trend
      </h2>

      <div className="w-full h-75 md:100">
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
