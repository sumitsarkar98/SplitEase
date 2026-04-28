import { LuTrendingUp } from "react-icons/lu";
import AddTransactionBtn from "../ui/buttons/AddTransactionBtn";
import TransactionTableDetails from "../ui/tables/TransactionTableDetails";

import { HiOutlineSquaresPlus } from "react-icons/hi2";

const Transactions = () => {
  return (
    <div className="space-y-5">
      {/* ===== SECTION-1 (PAGE HEADER) ===== */}
      <section className="flex flex-col px-3 md:px-0">
        <h1 className="text-2xl sm:text-3xl font-semibold text-green-700">
          Transactions
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-md">
          Track and manage all your financial activities
        </p>
      </section>

      {/* ===== SECTION-2 ===== */}
      <section className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 lg:gap-3 bg-green-100 p-4 rounded-lg">
        {/* Left text */}
        <div className="flex gap-2">
          <LuTrendingUp className="text-green-500 mt-1" size={25} />
          <div>
            <h1 className="text-lg sm:text-xl lg:text-2xl font-semibold text-green-700">
              Manage Transactions
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              View, filter, and track all your income and expenses in one place.
            </p>
          </div>
        </div>

        {/* Button */}
        <div className="w-fit flex justify-start sm:justify-end mt-2 sm:mt-0 ps-5 sm:ps-0">
          <AddTransactionBtn />
        </div>
      </section>
      
      {/* ===== SECTION-3 (TABLE CARD) ===== */}
      <section className="bg-white rounded-xl border border-slate-200 shadow-sm px-3 py-5 sm:px-5 md:px-6 md:py-6">
        {/* HEADER */}
        <div className="flex flex-col items-start lg:flex-row lg:items-center lg:justify-between mb-4 md:mb-2">
          <div className="flex items-center gap-2 text-green-600 ">
            <HiOutlineSquaresPlus size={24} />
            <h2 className="text-lg md:text-xl text-slate-600 font-semibold">
              My Transactions
            </h2>
          </div>
        </div>

        {/* TABLE */}
        <div className="w-full">
          <TransactionTableDetails />
        </div>
      </section>
    </div>
  );
};

export default Transactions;
