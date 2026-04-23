import { LuTrendingUp } from "react-icons/lu";

const Split = () => {
  return (
    <div className="space-y-5">
      {/* ===== SECTION-1 (PAGE HEADER) ===== */}
      <section className="flex flex-col px-3 md:px-0">
        <h1 className="text-2xl sm:text-3xl font-semibold text-green-700">
          Split Expenses
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-md">
          Easily split expenses and settle balances with your group
        </p>
      </section>

      {/* ===== SECTION-2 ===== */}
      <section className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 lg:gap-3 bg-green-100 p-4 rounded-lg">
        {/* Left text */}
        <div className="flex gap-2">
          <LuTrendingUp className="text-green-500 mt-1" size={25} />
          <div>
            <h1 className="text-lg sm:text-xl lg:text-2xl font-semibold text-green-700">
              Manage Group Expenses
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Add shared expenses, split costs with friends, and keep track of
              who owes whom
            </p>
          </div>
        </div>

        {/* Button */}
        <div className="w-fit flex justify-start sm:justify-end mt-2 sm:mt-0 ps-5 sm:ps-0">
          <button>create new</button>
        </div>
      </section>
    </div>
  );
};

export default Split;
