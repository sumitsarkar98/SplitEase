import AddBtn from "../ui/buttons/AddBtn";
import type { BudgetDataType } from "../../types/DataTypes";

import BudgetProgress from "../ui/charts/BudgetProgress";
import PieCharts from "../ui/charts/PieCharts";

const monthlyBudgets: BudgetDataType[] = [
  { name: "Travel", spent: 1200, target: 3000 },
  { name: "EMI", spent: 1200, target: 4000 },
  { name: "Food", spent: 1800, target: 5000 },
  { name: "Shopping", spent: 3000, target: 3000 },
  { name: "Bills", spent: 1500, target: 3500 },
];

const financialGoals: BudgetDataType[] = [
  { name: "Stock Market", spent: 1200, target: 30000 },
  { name: "New House", spent: 1800, target: 50000 },
  { name: "New Car", spent: 3000, target: 30000 },
];

const Budget = () => {
  const pieData = monthlyBudgets.map((budget) => ({
    name: budget.name,
    value: budget.spent,
  }));

  return (
    <div className="md:p-6 lg:p-8 space-y-6 bg-light min-h-screen">
      {/* HEADER */}
      <section className="flex flex-col md:flex-row md:items-center md:justify-between px-2 md:gap-4">
        <div>
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

      {/* MONTHLY BUDGETS */}
      <section className="px-2 md:px-0 space-y-2">
        <h2 className="text-base md:text-lg font-semibold text-slate-600">
          Monthly Budgets
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4">
          {monthlyBudgets.map((budget, index) => (
            <BudgetProgress key={index} {...budget} />
          ))}
        </div>
      </section>

      {/* FINANCIAL GOALS */}
      <section className="px-2 md:px-0 space-y-2">
        <h2 className="text-base md:text-lg font-semibold text-slate-600">
          Financial Goals
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4">
          {financialGoals.map((goal, index) => (
            <BudgetProgress key={index} {...goal} />
          ))}
        </div>
      </section>

      {/* SUMMARY */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl p-2 md:p-6 border border-slate-200 shadow-sm">
          <h2 className="text-base md:text-lg font-semibold text-slate-600 mt-4 text-center">
            Budget Summary
          </h2>

          <PieCharts data={pieData} />
        </div>
      </section>
    </div>
  );
};

export default Budget;
