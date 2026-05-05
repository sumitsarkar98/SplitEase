import { useState, useEffect } from "react";
import { Box, Modal } from "@mui/material";
import { FiX, FiTarget } from "react-icons/fi";
import { HiCheckCircle } from "react-icons/hi2";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

import { useUpdateGoal } from "../../../HOOKS/budgets/useGoals";

export interface GoalType {
  id: number;
  title: string;
  targetAmount: number;
  savedAmount: number;
  status: string;
  targetDate?: string | null;
}

interface GoalCardProps {
  item: GoalType;
  onDelete?: (id: number) => void;
}

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 320,
  bgcolor: "white",
  p: 3,
  borderRadius: "10px",
};

const GoalCard = ({ item, onDelete }: GoalCardProps) => {
  const { id, title, targetAmount, savedAmount, status, targetDate } = item;

  const { mutate: update, isPending } = useUpdateGoal();

  const [open, setOpen] = useState(false);

  const [form, setForm] = useState({
    target_amount: targetAmount,
    saved_amount: savedAmount,
    target_date: targetDate || "",
  });

  /* sync when item changes */
  useEffect(() => {
    setForm({
      target_amount: targetAmount,
      saved_amount: savedAmount,
      target_date: targetDate || "",
    });
  }, [targetAmount, savedAmount, targetDate]);

  const percentage =
    targetAmount > 0 ? Math.min((savedAmount / targetAmount) * 100, 100) : 0;

  const color = status === "completed" ? "bg-green-500" : "bg-amber-500";

  const handleDelete = () => {
    if (!onDelete) return;
    if (confirm("Are you sure you want to delete?")) {
      onDelete(id);
    }
  };

  /*  FIXED SUBMIT */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    update({
      id,
      data: {
        target_amount: Number(form.target_amount) || 0,
        saved_amount: Number(form.saved_amount) || 0,
        target_date: form.target_date ? form.target_date : null,
      },
    });

    setOpen(false);
  };

  return (
    <>
      {/* CARD */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm hover:shadow-md transition space-y-3">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-sm font-semibold text-slate-700">{title}</h2>

            {targetDate && (
              <p className="text-[11px] text-slate-400">
                Target: {new Date(targetDate).toLocaleDateString("en-IN")}
              </p>
            )}
          </div>

          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-medium bg-amber-100 text-amber-600">
              <FiTarget size={12} />
              Goal
            </span>

            <div className="flex gap-1">
              <button
                onClick={() => setOpen(true)}
                className="text-slate-400 hover:text-green-600"
              >
                <FaRegEdit size={14} />
              </button>

              <button
                onClick={handleDelete}
                className="text-slate-400 hover:text-red-600"
              >
                <MdDeleteOutline size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* AMOUNT */}
        <div className="flex justify-between text-xs text-slate-500">
          <span>₹{savedAmount}</span>
          <span>₹{targetAmount}</span>
        </div>

        {/* PROGRESS */}
        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
          <div
            className={`h-full ${color}`}
            style={{ width: `${percentage}%` }}
          />
        </div>

        {/* FOOTER */}
        <div className="flex justify-between text-xs">
          <span className="text-slate-500">{percentage.toFixed(0)}% saved</span>

          {status === "completed" && (
            <span className="flex items-center gap-1 text-green-500 font-medium">
              <HiCheckCircle size={14} />
              Completed
            </span>
          )}
        </div>
      </div>

      {/* MODAL */}
      {/* MODAL */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={style}>
          <button
            onClick={() => setOpen(false)}
            className="absolute top-3 right-3"
          >
            <FiX />
          </button>

          <h2 className="text-lg font-semibold mb-4 text-center">Edit Goal</h2>

          <form onSubmit={handleSubmit} className="space-y-3">
            {/* TITLE (READ ONLY) */}
            <div>
              <label className="block text-sm mb-1">Title</label>
              <input
                type="text"
                value={title}
                disabled
                className="w-full border p-2 rounded bg-gray-100 cursor-not-allowed"
              />
            </div>

            {/* STATUS (READ ONLY) */}
            <div>
              <label className="block text-sm mb-1">Status</label>
              <input
                type="text"
                value={status}
                disabled
                className="w-full border p-2 rounded bg-gray-100 cursor-not-allowed"
              />
            </div>

            {/* TARGET AMOUNT (EDITABLE) */}
            <div>
              <label className="block text-sm mb-1">Target Amount</label>
              <input
                type="number"
                value={form.target_amount}
                onChange={(e) =>
                  setForm((p) => ({
                    ...p,
                    target_amount: Number(e.target.value),
                  }))
                }
                className="w-full border p-2 rounded"
              />
            </div>

            {/* SAVED AMOUNT (READ ONLY) */}
            <div>
              <label className="block text-sm mb-1">Saved Amount</label>
              <input
                type="number"
                value={form.saved_amount}
                disabled
                className="w-full border p-2 rounded bg-gray-100 cursor-not-allowed"
              />
            </div>

            {/* TARGET DATE (EDITABLE) */}
            <div>
              <label className="block text-sm mb-1">Target Date</label>
              <input
                type="date"
                value={form.target_date?.slice(0, 10) || ""}
                onChange={(e) =>
                  setForm((p) => ({
                    ...p,
                    target_date: e.target.value,
                  }))
                }
                className="w-full border p-2 rounded"
              />
            </div>

            {/* SUBMIT */}
            <button
              type="submit"
              disabled={isPending}
              className="w-full bg-green-700 text-white py-2 rounded"
            >
              {isPending ? "Updating..." : "Update"}
            </button>
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default GoalCard;
