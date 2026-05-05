import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { FiX } from "react-icons/fi";

import { useGetCategories } from "../../../HOOKS/others/useGetCategories";
import { useUpdateTransaction } from "../../../HOOKS/transaction/useUpdateTransactions";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  maxWidth: 420,
  bgcolor: "background.paper",
  borderRadius: "12px",
  boxShadow: 24,
  p: 3,
};

const EditTransactionBtn = ({ txn }: { txn: any }) => {
  const { data: categories = [] } = useGetCategories();
  const { mutate, isPending } = useUpdateTransaction();

  const [open, setOpen] = useState(false);

  const [form, setForm] = useState({
    type: "expense",
    amount: "",
    date: "",
    note: "",
    category: "",
    goal: "",
  });

  // Get category name from ID
  const selectedCategory = categories.find(
    (cat: any) => cat.id === Number(form.category),
  );
  if (!selectedCategory) console.log("can't find category");
  console.log("category fetched:", categories);
  console.log("data passed:", txn);
  console.log("selected cat:", selectedCategory?.title);

  //  Populate form when modal opens
  useEffect(() => {
    if (!txn || !open) return;

    setForm({
      type: txn.type || "expense",
      amount: txn.amount ? String(txn.amount) : "",
      date: txn.transaction_date?.slice(0, 10) || "",
      note: txn.note || "",
      category: txn.category_id ? String(txn.category_id) : "",
      goal: txn.goal_id ? String(txn.goal_id) : "",
    });
  }, [txn, open]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!txn?.id) return;

    const amount = form.amount ? Number(form.amount) : null;
    const categoryId = form.category ? Number(form.category) : null;
    const goalId = form.goal ? Number(form.goal) : null;

    const payload: any = {
      amount,
      transaction_date: form.date || null,
      note: form.note || "",
    };

    if (form.type === "expense") {
      payload.category_id = categoryId;
      payload.goal_id = null;
    } else if (form.type === "goal") {
      payload.goal_id = goalId;
      payload.category_id = null;
    } else if (form.type === "income") {
      payload.category_id = null;
      payload.goal_id = null;
    }

    mutate(
      { id: txn.id, data: payload },
      {
        onSuccess: () => setOpen(false),
      },
    );
  };

  if (!txn) return null;

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="bg-green-600 text-white px-3 py-1.5 rounded-lg text-xs md:text-base cursor-pointer hover:bg-green-700"
      >
        Edit
      </button>

      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={style}>
          <button
            onClick={() => setOpen(false)}
            className="absolute top-3 right-3 text-slate-500 hover:text-red-500"
          >
            <FiX />
          </button>

          <h2 className="text-lg text-center mb-4 font-semibold">
            Edit Transaction
          </h2>

          <form onSubmit={handleSubmit} className="space-y-3">
            {/* TYPE (DISABLED) */}
            <div>
              <label className="block text-sm mb-1">Type</label>
              <input
                type="text"
                value={form.type}
                disabled
                className="w-full border p-2 rounded bg-gray-100 cursor-not-allowed"
              />
            </div>

            {/* AMOUNT */}
            <div>
              <label className="block text-sm mb-1">Amount</label>
              <input
                type="number"
                name="amount"
                value={form.amount}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
            </div>

            {/* DATE */}
            <div>
              <label className="block text-sm mb-1">Date</label>
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
            </div>

            {/* NOTE */}
            <div>
              <label className="block text-sm mb-1">Note</label>
              <input
                type="text"
                name="note"
                value={form.note}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
            </div>

            {/* CATEGORY (SHOW NAME, DISABLED) */}
            {form.type === "expense" && (
              <div>
                <label className="block text-sm mb-1">Category</label>
                <input
                  type="text"
                  value={selectedCategory?.title || ""}
                  disabled
                  className="w-full border p-2 rounded bg-gray-100 cursor-not-allowed"
                />
              </div>
            )}

            {/* GOAL (ONLY IF TYPE = GOAL) */}
            {form.type === "goal" && (
              <div>
                <label className="block text-sm mb-1">Goal ID</label>
                <input
                  type="number"
                  name="goal"
                  value={form.goal}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                />
              </div>
            )}

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

export default EditTransactionBtn;
