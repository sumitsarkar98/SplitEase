import { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { FiPlus } from "react-icons/fi";

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

// future API-ready arrays
const incomeCategories = ["Salary", "Freelance", "Bonus"];
const expenseCategories = ["Food", "Transport", "Shopping"];
const goals = ["Emergency Fund", "Trip", "New Laptop"];

const AddTransactionBtn = () => {
  const [open, setOpen] = useState(false);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Form Data:", formInput);

    setFormInput({
      description: "",
      type: "expense",
      category: "",
      amount: "",
      date: "",
    });

    handleClose();
  };

  // 🔹 dynamic category list
  const getOptions = () => {
    if (formInput.type === "income") return incomeCategories;
    if (formInput.type === "expense") return expenseCategories;
    return goals;
  };

  return (
    <div className="flex justify-end md:px-0">
      {/* Button */}
      <button
        onClick={handleOpen}
        className="flex items-center gap-1.5 sm:gap-2 
        bg-green-800 hover:bg-green-600 
        text-white text-xs sm:text-sm
        px-3 py-1.5 sm:px-4 sm:py-2
        rounded-lg transition"
      >
        <FiPlus size={18} />
        <span>Add transaction</span>
      </button>

      {/* Modal */}
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <h2 className="text-base md:text-lg text-center mb-4 font-semibold">
            New Transaction
          </h2>

          <form onSubmit={handleSubmit} className="space-y-3">
            {/* Description */}
            <div>
              <label className="text-xs sm:text-sm block mb-1 font-semibold">
                Description
              </label>
              <input
                type="text"
                name="description"
                value={formInput.description}
                onChange={handleChange}
                placeholder="details of transaction"
                className="w-full border p-2 rounded text-xs sm:text-sm"
              />
            </div>

            {/* Type + Category/Goal (same row) */}
            <div className="grid grid-cols-2 gap-2">
              {/* Type */}
              <div>
                <label className="text-xs sm:text-sm block mb-1 font-semibold">
                  Type
                </label>
                <select
                  name="type"
                  value={formInput.type}
                  onChange={handleChange}
                  className="w-full border p-2 rounded text-xs sm:text-sm"
                >
                  <option value="income">Income</option>
                  <option value="expense">Expense</option>
                  <option value="goal">Goal</option>
                </select>
              </div>

              {/* Category / Goal */}
              <div>
                <label className="text-xs sm:text-sm block mb-1 font-semibold capitalize">
                  {formInput.type === "goal" ? "Goal" : "Category"}
                </label>
                <select
                  name="category"
                  value={formInput.category}
                  onChange={handleChange}
                  className="w-full border p-2 rounded text-xs sm:text-sm"
                >
                  <option value="">Select</option>
                  {getOptions().map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Amount */}
            <div>
              <label className="text-xs sm:text-sm block mb-1 font-semibold">
                Amount
              </label>
              <input
                type="number"
                name="amount"
                value={formInput.amount}
                onChange={handleChange}
                placeholder="transaction amount"
                className="w-full border p-2 rounded text-xs sm:text-sm"
              />
            </div>

            {/* Date */}
            <div>
              <label className="text-xs sm:text-sm block mb-1 font-semibold">
                Transaction Date
              </label>
              <input
                type="date"
                name="date"
                value={formInput.date}
                onChange={handleChange}
                className="w-full border p-2 rounded text-xs sm:text-sm"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-green-700 hover:bg-green-600 text-white py-2 rounded text-xs sm:text-sm"
            >
              Add Transaction
            </button>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default AddTransactionBtn;
