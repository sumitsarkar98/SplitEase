import { FiPlus } from "react-icons/fi";

interface BtnProps {
  name: string;
}

const AddBtn = ({ name }: BtnProps) => {
  return (
    <button className="bg-green-800 hover:bg-green-700 text-white px-3 md:px-4 py-2 rounded-lg transition flex items-center text-md capitalize">
      <FiPlus />
      <span className="hidden md:block ml-1 text-xs md:text-sm">{name}</span>
    </button>
  );
};

export default AddBtn;
