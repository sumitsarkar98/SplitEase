import AddBtn from "../ui/buttons/AddBtn";
import BudgetProgress from "../ui/charts/BudgetProgress";
import PieCharts from "../ui/charts/PieCharts";

const Budget = () => {
  return (
    <div className="md:p-6 lg:p-8 space-y-6 bg-light min-h-screen">
      {/* ===== HEADER ===== */}
      <section className="flex flex-col md:flex-row md:items-center md:justify-between px-2 md:gap-4">
        <div className="mb-2 md:mb-0">
          <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold text-slate-700">
            Budgets
          </h1>
          <p className="text-sm text-slate-400">
            Manage your budgets and track your financial goals
          </p>
        </div>

        <div className="hidden md:block">
          <AddBtn name="create" />
        </div>
      </section>

      {/* ===== MONTHLY BUDGETS ===== */}
      <section className="px-2 md:px-0 space-y-2">
        <h2 className="text-base md:text-lg font-semibold text-slate-600">
          Monthly Budgets
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4">
          <BudgetProgress name="Travel" spent={1200} target={3000} />
          <BudgetProgress name="EMI" spent={1200} target={4000} />
          <BudgetProgress name="Food" spent={1800} target={5000} />
          <BudgetProgress name="Shopping" spent={3000} target={3000} />
        </div>
      </section>

      {/* ===== FINANCIAL GOALS ===== */}
      <section className="px-2 md:px-0 space-y-2">
        <h2 className="text-base md:text-lg font-semibold text-slate-600">
          Financial Goals
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4">
          <BudgetProgress name="Stock Market" spent={1200} target={30000} />
          <BudgetProgress name="New House" spent={1800} target={50000} />
          <BudgetProgress name="New Car" spent={3000} target={30000} />
        </div>
      </section>

      {/* ===== SUMMARY SECTION ===== */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Budget Summary */}
        <div className="bg-white rounded-xl p-2 md:p-6 border border-slate-200 shadow-sm">
          <h2 className="text-base md:text-lg font-semibold text-slate-600 mt-4 text-center">
            Budget Summary
          </h2>

          <PieCharts />
        </div>

        {/* Budget Insights */}
        <div className="bg-white rounded-xl p-2 md:p-6 border border-slate-200 shadow-sm">
          <h2 className="text-base md:text-lg font-semibold text-slate-600 my-4 text-center">
            Insights for you
          </h2>

          <ul className="text-sm md:text-base space-y-3 px-2">
            <li className="flex items-start gap-2 text-yellow-600">
              <span>⚠</span>
              <span>Food spending is close to your limit.</span>
            </li>

            <li className="flex items-start gap-2 text-green-600">
              <span>✔</span>
              <span>Travel budget is well managed.</span>
            </li>

            <li className="flex items-start gap-2 text-blue-600">
              <span>🛍</span>
              <span>Shopping budget has been completed.</span>
            </li>

            <li className="flex items-start gap-2 text-yellow-600">
              <span>⚠</span>
              <span>Food spending is close to your limit.</span>
            </li>

            <li className="flex items-start gap-2 text-green-600">
              <span>✔</span>
              <span>Travel budget is well managed.</span>
            </li>

            <li className="flex items-start gap-2 text-blue-600">
              <span>🛍</span>
              <span>Shopping budget has been completed.</span>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default Budget;
