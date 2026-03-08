import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  Label,
} from "recharts";

interface PieData {
  name: string;
  value: number;
}

interface PieChartsProps {
  data: PieData[];
}

const COLORS = ["#16a34a", "#dc2626", "#148c68", "#f59e0b", "#6366f1"];

const PieCharts = ({ data }: PieChartsProps) => {
  const total = data.reduce((acc, item) => acc + item.value, 0);

  return (
    <div className="w-full h-80">
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius={70}
            outerRadius={100}
            paddingAngle={4}
          >
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}

            {/* Center Text */}
            <Label
              value={`₹ ${total.toLocaleString("en-IN")}`}
              position="center"
              className="text-sm font-semibold fill-slate-600"
            />
          </Pie>

          <Tooltip
            formatter={(value) => `₹ ${Number(value).toLocaleString("en-IN")}`}
          />

          <Legend verticalAlign="bottom" height={36} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PieCharts;
