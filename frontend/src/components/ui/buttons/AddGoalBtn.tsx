import { FiPlus } from "react-icons/fi";

const AddGoalButton = () => {
  return (
    <div className="flex justify-end px-3 md:px-0">
      <button
        className="flex items-center gap-0 md:gap-1.5 
  bg-amber-500 hover:bg-amber-600 
  text-white text-xs sm:text-sm capitalize
  p-2 sm:px-4 sm:py-2 
  rounded-lg shadow-sm transition"
      >
        <FiPlus className="text-sm sm:text-base me-1" size={18} />
        Create Goal
      </button>
    </div>
  );
};

export default AddGoalButton;
