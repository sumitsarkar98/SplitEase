import { FiPlus } from "react-icons/fi";

const AddBudgetButton = () => {
  return (
    <div className="flex justify-end px-3 md:px-0">
      <button
        className="capitalize flex items-center gap-0 md:gap-1.5 
  bg-green-800 hover:bg-green-600 
  text-white text-xs sm:text-sm
  p-2 sm:px-4 sm:py-2 
  rounded-lg transition"
      >
        <FiPlus className="text-sm sm:text-base me-1" size={18} />
        add budget
      </button>
    </div>
  );
};

export default AddBudgetButton;
