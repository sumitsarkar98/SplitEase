import type { OverviewDataType } from "../../../types/ApiDataTypes.ts";
import {
  MdOutlineAccountBalance,
  MdOutlinePayments,
  MdSavings,
} from "react-icons/md";

interface CardProps {
  data: OverviewDataType;
  period?: string;
}

const OverviewCard = ({ data, period = "month" }: CardProps) => {
  const { title, value, percentage } = data;

  let label = title;
  let colorClass = "text-slate-600 bg-slate-100";
  let icon = <MdOutlineAccountBalance />;

  // switch case
  switch (title) {
    case "savings":
      label = "My Savings";
      colorClass = "text-blue-600 bg-blue-100";
      icon = <MdOutlineAccountBalance />;
      break;

    case "spending":
      label = "Total Spending";
      colorClass = "text-red-600 bg-red-100";
      icon = <MdOutlinePayments />;
      break;

    case "goal":
      label = "Goal Progress";
      colorClass = "text-green-600 bg-green-100";
      icon = <MdSavings />;
      break;

    default:
      break;
  }

  const formattedValue =
    typeof value === "number" ? `₹ ${value.toLocaleString("en-IN")}` : value;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 px-5 py-3 shadow-sm hover:shadow-md transition">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h2 className="text-sm font-semibold text-slate-500">{label}</h2>

        <div
          className={`w-10 h-10 flex items-center justify-center rounded-xl ${colorClass}`}
        >
          {icon}
        </div>
      </div>

      {/* BODY */}
      <h1 className="text-3xl lg:text-4xl font-bold text-slate-600 tracking-wide">
        {formattedValue}
      </h1>

      <div className="flex items-center gap-2 text-xs mt-1">
        <span className="px-2 py-1 rounded-md bg-green-100 text-green-600">
          {Math.abs(percentage).toFixed(1)}%
        </span>

        <span className="text-slate-400">this {period}</span>
      </div>
    </div>
  );
};

export default OverviewCard;
