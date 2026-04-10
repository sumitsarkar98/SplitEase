import {
  Pie,
  PieChart,
  Sector,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { useState } from "react";
import type { CategoryDataTypes } from "../../../types/ApiDataTypes";

// ===== PROPS =====
interface PieChartProps {
  data: CategoryDataTypes[];
  category: "income" | "expense";
}

// ===== ACTIVE SHAPE =====
const renderActiveShape = (props: any) => {
  const RADIAN = Math.PI / 180;

  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;

  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);

  const sx = cx + (outerRadius + 6) * cos;
  const sy = cy + (outerRadius + 6) * sin;
  const mx = cx + (outerRadius + 18) * cos;
  const my = cy + (outerRadius + 18) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 14;
  const ey = my;

  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      {/* center label */}
      <text x={cx} y={cy} dy={6} textAnchor="middle" fill={fill}>
        {payload?.name}
      </text>

      {/* main sector */}
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />

      {/* outer highlight */}
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={outerRadius + 2}
        outerRadius={outerRadius + 6}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />

      {/* line */}
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />

      <circle cx={ex} cy={ey} r={2} fill={fill} />

      {/* value */}
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 8}
        y={ey}
        textAnchor={textAnchor}
        fill="#334155"
        className="text-xs"
      >
        ₹{value}
      </text>

      {/* percentage */}
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 8}
        y={ey + 14}
        textAnchor={textAnchor}
        fill="#94a3b8"
        className="text-[10px]"
      >
        {(percent * 100).toFixed(1)}%
      </text>
    </g>
  );
};

// ===== COMPONENT =====
export default function CustomPieCharts({ data, category }: PieChartProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  // ===== FORMAT DATA =====
  const chartData = data.map((item) => ({
    name: item.title,
    value: Number(item.amount) || 0,
  }));

  // ===== COLORS =====
  const COLORS =
    category === "income"
      ? ["#16a34a", "#22c55e", "#4ade80", "#86efac"]
      : ["#f59e0b", "#f97316", "#fb923c", "#fdba74"];

  return (
    <div className="w-full h-55 sm:h-65 lg:h-75">
      <ResponsiveContainer>
        <PieChart margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
          <Pie
            data={chartData}
            dataKey="value"
            cx="50%"
            cy="50%"
            innerRadius="40%"
            outerRadius="70%"
            onMouseEnter={(_, index) => setActiveIndex(index)}
            {...({
              activeIndex,
              activeShape: renderActiveShape,
            } as any)}
          >
            {chartData.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>

          {/* Tooltip */}
          <Tooltip
            formatter={(value: any, name: any) => [
              `₹${Number(value) || 0}`,
              name,
            ]}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
