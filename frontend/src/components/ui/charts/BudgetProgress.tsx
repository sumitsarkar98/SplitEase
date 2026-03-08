import { FiEdit2 } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import { IoIosCheckmarkCircle } from "react-icons/io";

interface BudgetProgressProps {
  name: string;
  spent: number;
  target: number;
}

const BudgetProgress = ({ name, spent, target }: BudgetProgressProps) => {
  const percentage = Math.min((spent / target) * 100, 100);
  const isCompleted = spent >= target;

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-4 flex flex-col gap-3 hover:shadow-md transition">
      {/* Top Row */}
      <div className="flex justify-between items-start">
        {/* Title + Completed */}
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold text-slate-700 capitalize">
            {name}
          </h2>

          {isCompleted && (
            <span className="flex items-center gap-1 text-green-600 text-xs font-medium">
              <IoIosCheckmarkCircle size={16} />
              Completed
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <button className="text-blue-500 hover:scale-110 transition">
            <FiEdit2 size={16} />
          </button>

          <button className="text-red-500 hover:scale-110 transition">
            <MdDeleteOutline size={18} />
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-200 rounded-full h-3">
        <div
          className="h-3 rounded-full bg-amber-400 transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>

      {/* Footer */}
      <div className="flex justify-between text-sm text-slate-600">
        <span>{percentage.toFixed(0)}%</span>
        <span>
          ₹{spent} / ₹{target}
        </span>
      </div>
    </div>
  );
};

export default BudgetProgress;
