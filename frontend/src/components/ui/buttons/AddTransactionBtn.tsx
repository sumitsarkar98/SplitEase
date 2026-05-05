import { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { FiPlus, FiX } from "react-icons/fi";
import { useAddTransaction } from "../../../HOOKS/transaction/useAddTransaction";
import { useGetCategories } from "../../../HOOKS/others/useGetCategories";

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
  p: { xs: 2, sm: 3, md: 4 },
  maxHeight: "90vh",
  overflowY: "auto",
};

// TEMP goals (replace later with API)
const goals = [
  { id: 1, name: "Emergency Fund" },
  { id: 2, name: "Trip" },
];

const AddTransactionBtn = () => {
  const [open, setOpen] = useState(false);
  const { mutate, isPending } = useAddTransaction();
  const { data: categories = [], isLoading } = useGetCategories();

  const [formInput, setFormInput] = useState({
    description: "",
    type: "expense",
    category: "",
    amount: "",
    date: "",
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormInput({
      ...formInput,
      [e.target.name]: e.target.value,
    });
  };

  // Filter categories dynamically
  const incomeCategories = categories.filter((c: any) => c.type === "income");
  // console.log(`income category ${incomeCategories}`);

  const expenseCategories = categories.filter((c: any) => c.type === "expense");
  // console.log(`expense category ${expenseCategories}`);

  const getOptions = () => {
    if (formInput.type === "income") return incomeCategories;
    if (formInput.type === "expense") return expenseCategories;
    return goals;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // validation
    if (!formInput.amount || !formInput.date || !formInput.type) return;

    if (
      (formInput.type === "expense" || formInput.type === "goal") &&
      !formInput.category
    ) {
      alert("Please select category/goal");
      return;
    }

    const payload = {
      type: formInput.type,
      amount: Number(formInput.amount),
      transaction_date: formInput.date,
      note: formInput.description,

      category_id:
        formInput.type === "expense" ? Number(formInput.category) : null,

      goal_id: formInput.type === "goal" ? Number(formInput.category) : null,
    };

    mutate(payload, {
      onSuccess: () => {
        setFormInput({
          description: "",
          type: "expense",
          category: "",
          amount: "",
          date: "",
        });
        handleClose();
      },
      onError: (err) => {
        console.error("Failed:", err);
      },
    });
  };

  return (
    <div className="flex justify-end md:px-0">
      {/* Button */}
      <button
        onClick={handleOpen}
        className="flex items-center gap-2 bg-green-800 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
      >
        <FiPlus size={18} />
        Add transaction
      </button>

      {/* Modal */}
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <button
            onClick={handleClose}
            className="absolute top-3 right-3 text-slate-500 hover:text-red-500"
          >
            <FiX size={20} />
          </button>

          <h2 className="text-lg text-center mb-4 font-semibold">
            New Transaction
          </h2>

          <form onSubmit={handleSubmit} className="space-y-3">
            {/* Description */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Description
              </label>
              <input
                type="text"
                name="description"
                value={formInput.description}
                onChange={handleChange}
                placeholder="Enter details"
                className="w-full border p-2 rounded"
              />
            </div>

            {/* Type + Category */}
            <div className="grid grid-cols-2 gap-2">
              {/* Type */}
              <div>
                <label className="block text-sm font-medium mb-1">Type</label>
                <select
                  name="type"
                  value={formInput.type}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                >
                  <option value="income">Income</option>
                  <option value="expense">Expense</option>
                  <option value="goal">Goal</option>
                </select>
              </div>

              {/* Category / Goal */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  {formInput.type === "goal" ? "Goal" : "Category"}
                </label>
                <select
                  name="category"
                  value={formInput.category}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                  disabled={isLoading}
                >
                  <option value="">
                    {isLoading ? "Loading..." : "Select"}
                  </option>

                  {getOptions().map((item: any) => (
                    <option key={item.id} value={item.id}>
                      {item.title || item.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Amount */}
            <div>
              <label className="block text-sm font-medium mb-1">Amount</label>
              <input
                type="number"
                name="amount"
                value={formInput.amount}
                onChange={handleChange}
                placeholder="Enter amount"
                className="w-full border p-2 rounded"
              />
            </div>

            {/* Date */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Transaction Date
              </label>
              <input
                type="date"
                name="date"
                value={formInput.date}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isPending}
              className="w-full bg-green-700 hover:bg-green-600 text-white py-2 rounded disabled:opacity-50"
            >
              {isPending ? "Adding..." : "Add Transaction"}
            </button>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default AddTransactionBtn;
