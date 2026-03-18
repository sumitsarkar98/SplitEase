import type { OverviewDataType } from "../../../types/DataTypes.ts";
import {
  MdOutlineAccountBalance,
  MdOutlineCategory,
  MdSavings,
  MdOutlinePayments,
} from "react-icons/md";
import type { ReactNode } from "react";

interface CardProps {
  data: OverviewDataType;
  period?: string;
}

const OverviewCard = ({ data, period = "monthly" }: CardProps) => {
  const { title, value, change } = data;

  let icon: ReactNode;
  let colorClass: string;
  let changeTitle: string;
  let changeText: string;

  switch (title.toLowerCase()) {
    case "balance":
      icon = <MdOutlineAccountBalance className="text-lg sm:text-xl" />;
      colorClass = "text-blue-600 bg-blue-100";
      changeTitle = "Wallet Balance";
      changeText = `saved this ${period}`;
      break;

    case "average spending":
      icon = <MdOutlinePayments className="text-lg sm:text-xl" />;
      colorClass = "text-red-600 bg-red-100";
      changeTitle = "Average Spending";
      changeText = `${period}ly avg expenses`;
      break;

    case "top category":
      icon = <MdOutlineCategory className="text-lg sm:text-xl" />;
      colorClass = "text-amber-600 bg-amber-100";
      changeTitle = "Top Category";
      changeText = `used this ${period}`;
      break;

    case "savings":
      icon = <MdSavings className="text-lg sm:text-xl" />;
      colorClass = "text-green-600 bg-green-100";
      changeTitle = "Goal Progress";
      changeText = `achived this ${period}`;
      break;

    default:
      icon = <MdOutlineAccountBalance className="text-lg sm:text-xl" />;
      colorClass = "text-slate-600 bg-slate-100";
      changeTitle = title;
      changeText = `change in ${period}`;
  }

  const formattedValue =
    typeof value === "number" ? `₹  ${value.toLocaleString()}` : value;

  return (
    <div
      className="bg-white rounded-2xl border border-slate-200 cursor-pointer 
      py-4 px-6 sm:p-5 lg:p-5 shadow-sm hover:shadow-md transition-all duration-200"
    >
      {/* HEADER */}
      <div className="flex items-end justify-between mb-2">
        <h2 className="text-xs sm:text-sm font-semibold text-slate-500 tracking-wide">
          {changeTitle}
        </h2>

        <div
          className={`flex items-center justify-center 
          w-9 h-9 sm:w-10 sm:h-10 
          rounded-xl ${colorClass}`}
        >
          {icon}
        </div>
      </div>

      {/* BODY */}
      <div className="space-y-2">
        <h1 className="text-3xl lg:text-4xl font-bold text-slate-600 tracking-wide">
          {formattedValue}
        </h1>

        <div className="flex items-center gap-2 text-xs ">
          <span className="flex items-center gap-1 px-2 py-1 rounded-md font-medium bg-green-100 text-green-600 tracking-wider">
            {Math.abs(change)}%
          </span>

          <span className="text-slate-400 tracking-wider">{changeText}</span>
        </div>
      </div>
    </div>
  );
};

export default OverviewCard;
