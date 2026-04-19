import React from "react";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface EmptyProps {
  title?: string;
  buttonText?: string;
  link?: string; // for navigation
  onClick?: () => void; // optional custom handler
  fullHeight?: boolean; // for charts/cards
}

const Empty: React.FC<EmptyProps> = ({
  title = "No data available",
  buttonText = "Add",
  link,
  onClick,
  fullHeight = true,
}) => {
  const navigate = useNavigate();

  const handleAction = () => {
    if (onClick) return onClick();
    if (link) navigate(link);
  };

  return (
    <div
      className={`w-full flex flex-col items-center justify-center gap-4 
  border-2 border-dashed border-slate-300 rounded-lg 
  bg-slate-50/50 
  ${fullHeight ? "h-full min-h-[200px]" : "p-6"}`}
    >
      <h1 className="text-sm sm:text-base text-slate-500 text-center">
        {title}
      </h1>

      <button
        onClick={handleAction}
        className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
      >
        <FaPlus />
        <span className="text-sm">{buttonText}</span>
      </button>
    </div>
  );
};

export default Empty;
