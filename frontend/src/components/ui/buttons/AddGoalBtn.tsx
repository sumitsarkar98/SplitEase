import { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { FiPlus, FiX } from "react-icons/fi";

import { useCreateGoal } from "../../../HOOKS/budgets/useGoals";

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

const AddGoalButton = () => {
  const [open, setOpen] = useState(false);

  const [formInput, setFormInput] = useState({
    title: "",
    target_amount: "",
    target_date: "",
  });

  const { mutate: createGoal, isPending } = useCreateGoal();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const today = new Date().toISOString().split("T")[0];

    if (
      !formInput.title ||
      !formInput.target_amount ||
      !formInput.target_date
    ) {
      alert("Fill all fields");
      return;
    }

    if (formInput.target_date < today) {
      alert("Target date must be in the future");
      return;
    }

    // ✅ CALL API
    createGoal(
      {
        title: formInput.title,
        target_amount: Number(formInput.target_amount),
        target_date: formInput.target_date, // backend will format
      },
      {
        onSuccess: () => {
          // reset form
          setFormInput({
            title: "",
            target_amount: "",
            target_date: "",
          });

          setOpen(false);
        },
        onError: (err) => {
          console.error("Create goal failed:", err);
          alert("Failed to create goal");
        },
      },
    );
  };

  return (
    <div className="flex justify-end px-3 md:px-0">
      {/* Button */}
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-1.5 
        bg-amber-500 hover:bg-amber-600 
        text-white text-xs sm:text-sm
        p-2 sm:px-4 sm:py-2 rounded-lg"
      >
        <FiPlus size={18} />
        Create Goal
      </button>

      {/* Modal */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={style}>
          <button
            onClick={() => setOpen(false)}
            className="absolute top-3 right-3"
          >
            <FiX size={20} />
          </button>

          <h2 className="text-center mb-4 font-semibold">Create Goal</h2>

          <form onSubmit={handleSubmit} className="space-y-3">
            {/* Title */}
            <div>
              <label className="block text-sm font-semibold mb-1">Title</label>
              <input
                type="text"
                name="title"
                value={formInput.title}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
            </div>

            {/* Target Amount */}
            <div>
              <label className="block text-sm font-semibold mb-1">
                Target Amount
              </label>
              <input
                type="number"
                name="target_amount"
                value={formInput.target_amount}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
            </div>

            {/* Target Date */}
            <div>
              <label className="block text-sm font-semibold mb-1">
                Target Date
              </label>
              <input
                type="date"
                name="target_date"
                value={formInput.target_date}
                min={new Date().toISOString().split("T")[0]}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
            </div>

            {/* Submit */}
            <button
              disabled={isPending}
              className="w-full bg-amber-500 text-white py-2 rounded"
            >
              {isPending ? "Creating..." : "Add New Goal"}
            </button>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default AddGoalButton;
