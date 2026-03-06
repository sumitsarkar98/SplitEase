import AddBtn from "../ui/buttons/AddBtn";
import BudgetProgress from "../ui/charts/BudgetProgress";
import PieCharts from "../ui/charts/PieCharts";

// interface BudgetType {
//   id: number;
//   category: string;
//   limit: number;
//   spent: number;
// }

const Budget = () => {
  return (
    <div className="p-2 lg:p-8 space-y-8 bg-light min-h-screen">
      {/* ================= PAGE DETAILS SECTION ================= */}
      <section className="space-y-1 lg:space-y-2 flex justify-between items-center">
        {/* page-info */}
        <div>
          <h1 className="text-2xl lg:text-3xl font-semibold text-slate-700 md:mb-2">
            Budgets
          </h1>
          <p className="text-xs lg:text-base text-slate-400">
            Manage your budgets and track your financial goals
          </p>
        </div>

        {/* cta-btn */}
        <div>
          <AddBtn name="create" />
        </div>
      </section>

      {/* ================= BUDGET TRACKING ================= */}
      <section className="flex flex-col gap-3">
        <h2 className="text-xl text-slate-600 font-semibold capitalize">
          monthly Budgets
        </h2>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-4">
          <BudgetProgress name="Travel" spent={1200} target={3000} />
          <BudgetProgress name="EMI" spent={1200} target={4000} />
          <BudgetProgress name="Food" spent={1800} target={5000} />
          <BudgetProgress name="shopping" spent={3000} target={3000} />
        </div>
      </section>

      {/* ================= FINANCIAL GOALS ================= */}
      <section className="flex flex-col gap-3">
        <h2 className="text-xl text-slate-600 font-semibold capitalize">
          Financial Goals
        </h2>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-4">
          <BudgetProgress name="stock market" spent={1200} target={30000} />
          <BudgetProgress name="new house" spent={1800} target={50000} />
          <BudgetProgress name="new car" spent={3000} target={3000} />
        </div>
      </section>

      {/* ================= BUDGET SUMMERY ================= */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* ================= Budget Summary ================= */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex flex-col gap-4">
          <h2 className="text-lg md:text-xl text-slate-600 font-semibold capitalize">
            Budget Summary
          </h2>

          <PieCharts />
        </div>

        {/* ================= Budget Insights ================= */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex flex-col gap-6 ">
          <h2 className="text-lg md:text-xl text-slate-600 font-semibold capitalize">
            Budget Insights
          </h2>

          <ul className="text-base text-slate-500 flex flex-col gap-6">
            <li>⚠ Food spending is close to your limit</li>
            <li>✔ Travel budget is well managed</li>
            <li>🛍 Shopping budget has been completed</li>
            <li>⚠ Food spending is close to your limit</li>
            <li>✔ Travel budget is well managed</li>
            <li>🛍 Shopping budget has been completed</li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default Budget;
