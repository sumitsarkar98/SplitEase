import type { BudgetDataType } from "../../../types/ApiDataTypes";

import { FiTarget } from "react-icons/fi";
import { LuWallet } from "react-icons/lu";
import { HiCheckCircle } from "react-icons/hi2";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

interface BudgetCardProps {
  item: BudgetDataType;
  type?: "budget" | "goal";
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
}

const BudgetCard = ({
  item,
  type = "budget",
  onEdit,
  onDelete,
}: BudgetCardProps) => {
  const { category, limit, spent, status, id } = item;

  // ✅ prevent divide by zero
  const percentage = limit > 0 ? Math.min((spent / limit) * 100, 100) : 0;

  /* ================= COLOR LOGIC ================= */
  let color = "bg-green-500";

  if (type === "goal") {
    color = status === "completed" ? "bg-green-500" : "bg-amber-500";
  } else {
    if (status === "exceeded") color = "bg-red-500";
    else if (percentage > 80) color = "bg-yellow-500";
  }

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm hover:shadow-md transition space-y-3">
      {/* ===== TOP ===== */}
      <div className="flex justify-between items-center">
        <h2 className="text-sm font-semibold text-slate-700">{category}</h2>

        <div className="flex items-center gap-2">
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

          {/* Actions */}
          <div className="flex gap-1">
            <button
              onClick={() => onEdit?.(id)}
              className="text-slate-400 hover:text-green-600"
            >
              <FaRegEdit size={14} />
            </button>
            <button
              onClick={() => onDelete?.(id)}
              className="text-slate-400 hover:text-red-600"
            >
              <MdDeleteOutline size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* ===== AMOUNT ===== */}
      <div className="flex justify-between text-xs text-slate-500">
        <span>₹{spent}</span>
        <span>₹{limit}</span>
      </div>

      {/* ===== PROGRESS ===== */}
      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
        <div
          className={`h-full ${color} transition-all duration-300`}
          style={{ width: `${percentage}%` }}
        />
      </div>

      {/* ===== BOTTOM ===== */}
      <div className="flex justify-between text-xs">
        <span className="text-slate-500">
          {percentage.toFixed(0)}% {type === "goal" ? "completed" : "used"}
        </span>

        {/* ===== STATUS ===== */}
        {type === "goal" ? (
          status === "completed" && (
            <span className="flex items-center gap-1 text-green-500 font-medium">
              <HiCheckCircle size={14} />
              Completed
            </span>
          )
        ) : status === "exceeded" ? (
          <span className="text-red-500 font-medium">Over limit</span>
        ) : status === "expired" ? (
          <span className="text-gray-400 font-medium">Expired</span>
        ) : null}
      </div>
    </div>
  );
};

export default BudgetCard;
