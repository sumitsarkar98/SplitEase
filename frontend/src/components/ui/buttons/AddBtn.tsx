import { useState } from "react";
import { FiPlus, FiX } from "react-icons/fi";

interface BtnProps {
  name: string;
}

const AddBtn = ({ name }: BtnProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Button */}
      <button
        onClick={() => setOpen(true)}
        className="bg-green-800 hover:bg-green-700 text-white px-3 md:px-4 py-2 rounded-lg transition flex items-center text-md capitalize"
      >
        <FiPlus />
        <span className="hidden md:block ml-1 text-xs md:text-sm">{name}</span>
      </button>

      {/* Modal Form */}
      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-white w-full max-w-md rounded-xl p-6 shadow-lg">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-slate-700">
                Add Transaction
              </h2>

              <button onClick={() => setOpen(false)}>
                <FiX size={20} />
              </button>
            </div>

            {/* Form */}
            <form className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Description"
                className="border border-slate-200 rounded-md p-2"
              />

              <input
                type="number"
                placeholder="Amount"
                className="border border-slate-200 rounded-md p-2"
              />

              <select className="border border-slate-200 rounded-md p-2">
                <option>Expense</option>
                <option>Income</option>
              </select>

              <button className="bg-green-700 hover:bg-green-600 text-white py-2 rounded-md">
                Save
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AddBtn;
