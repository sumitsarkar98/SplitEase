import { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { FiPlus, FiX } from "react-icons/fi";

import { useGetCategories } from "../../../HOOKS/others/useGetCategories";
import { useCreateBudget } from "../../../HOOKS/budgets/useBudgets";

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
};

const AddBudgetButton = () => {
  const [open, setOpen] = useState(false);

  const { data: categories = [], isLoading } = useGetCategories();
  const { mutate, isPending } = useCreateBudget();

  const [formInput, setFormInput] = useState({
    category: "",
    budget_limit: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    setFormInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formInput.category || !formInput.budget_limit) {
      alert("Fill all fields");
      return;
    }

    const now = new Date();

    const payload = {
      category_id: Number(formInput.category),
      budget_limit: Number(formInput.budget_limit),
      month: now.getMonth() + 1,
      year: now.getFullYear(),
    };

    mutate(payload, {
      onSuccess: () => {
        // reset form
        setFormInput({
          category: "",
          budget_limit: "",
        });

        setOpen(false);
      },
      onError: (err) => {
        console.error("Create budget failed:", err);
        alert("Failed to create budget");
      },
    });
  };

  return (
    <div className="flex justify-end px-3 md:px-0">
      {/* BUTTON */}
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-1.5 
        bg-green-800 hover:bg-green-600 
        text-white text-xs sm:text-sm
        p-2 sm:px-4 sm:py-2 rounded-lg"
      >
        <FiPlus size={18} />
        Add Budget
      </button>

      {/* MODAL */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={style}>
          {/* CLOSE */}
          <button
            onClick={() => setOpen(false)}
            className="absolute top-3 right-3 text-slate-500 hover:text-red-500"
          >
            <FiX size={20} />
          </button>

          <h2 className="text-center text-base mb-4 font-semibold">
            Add Budget
          </h2>

          <form onSubmit={handleSubmit} className="space-y-3">
            {/* CATEGORY */}
            <div>
              <label className="block text-sm font-semibold mb-1">
                Category
              </label>

              <select
                name="category"
                value={formInput.category}
                onChange={handleChange}
                disabled={isLoading}
                className="w-full border p-2 rounded text-sm"
              >
                <option value="">
                  {isLoading ? "Loading..." : "Select category"}
                </option>

                {categories.map((item: any) => (
                  <option key={item.id} value={item.id}>
                    {item.title}
                  </option>
                ))}
              </select>
            </div>

            {/* AMOUNT */}
            <div>
              <label className="block text-sm font-semibold mb-1">Amount</label>

              <input
                type="number"
                name="budget_limit"
                value={formInput.budget_limit}
                onChange={handleChange}
                placeholder="Budget limit"
                min="0"
                className="w-full border p-2 rounded"
              />
            </div>

            {/* SUBMIT */}
            <button
              type="submit"
              disabled={isPending}
              className="w-full bg-green-700 text-white py-2 rounded hover:bg-green-800 disabled:opacity-50"
            >
              {isPending ? "Adding..." : "Add Budget"}
            </button>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default AddBudgetButton;
