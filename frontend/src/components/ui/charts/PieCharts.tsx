import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

interface PieData {
  name: string;
  value: number;
}

const PieCharts = () => {
  const data: PieData[] = [
    { name: "Income", value: 50000 },
    { name: "Expense", value: 30000 },
    { name: "Savings", value: 20000 },
  ];

  const COLORS = ["#16a34a", "#dc2626", "#148c68"];

  const total = data.reduce((acc, item) => acc + item.value, 0);

  return (
    <div className="w-full h-80 bg-white p-4">
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={100}
            innerRadius={70}
            paddingAngle={4}
            isAnimationActive={true}
            animationDuration={800}
          >
            {data.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>

          <Tooltip
            formatter={(value) => `₹ ${Number(value).toLocaleString("en-IN")}`}
          />

          <Legend verticalAlign="bottom" height={36} />

          {/* Center Text */}
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            className="text-sm fill-slate-600"
          >
            ₹ {total.toLocaleString("en-IN")}
          </text>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PieCharts;
