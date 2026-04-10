import type { BudgetDataType } from "../../../types/ApiDataTypes";

import { FiTarget } from "react-icons/fi";
import { LuWallet } from "react-icons/lu";
import { HiCheckCircle } from "react-icons/hi2";

interface BudgetCardProps {
  item: BudgetDataType;
  type?: "budget" | "goal";
}

const BudgetCard = ({ item, type = "budget" }: BudgetCardProps) => {
  const { category, limit, spent } = item;

  const percentage = Math.min((spent / limit) * 100, 100);

  let color = "bg-green-500";
  if (percentage > 70) color = "bg-yellow-500";
  if (percentage > 90) color = "bg-red-500";

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm hover:shadow-md transition space-y-3">
      {/* Top */}
      <div className="flex justify-between items-center">
        <h2 className="text-sm font-semibold text-slate-700">{category}</h2>

        {/* Badge */}
        <span
          className={`flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-medium
          ${
            type === "goal"
              ? "bg-amber-100 text-amber-600"
              : "bg-green-100 text-green-600"
          }`}
        >
          {type === "goal" ? <FiTarget size={12} /> : <LuWallet size={12} />}
          {type === "goal" ? "Goal" : "Budget"}
        </span>
      </div>

      {/* Amount */}
      <div className="flex justify-between text-xs text-slate-500">
        <span>₹{spent}</span>
        <span>₹{limit}</span>
      </div>

      {/* Progress */}
      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
        <div
          className={`h-full ${color}`}
          style={{ width: `${percentage}%` }}
        />
      </div>

      {/* Bottom */}
      <div className="flex justify-between text-xs">
        <span className="text-slate-500">
          {percentage.toFixed(0)}% {type === "goal" ? "completed" : "used"}
        </span>

        {/* Status */}
        {type === "goal"
          ? spent >= limit && (
              <span className="flex items-center gap-1 text-green-500 font-medium">
                <HiCheckCircle size={14} />
                Completed
              </span>
            )
          : spent > limit && (
              <span className="text-red-500 font-medium">Over limit</span>
            )}
      </div>
    </div>
  );
};

export default BudgetCard;
