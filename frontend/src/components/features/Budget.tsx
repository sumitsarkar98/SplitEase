import { useState } from "react";
import AddBudgetBtn from "../ui/buttons/AddBudgetBtn";
import AddGoalBtn from "../ui/buttons/AddGoalBtn";
import BudgetCard from "../ui/cards/BudgetCard";

import { useBudgets } from "../../HOOKS/budgets/useBudgets";
import { useGoals } from "../../HOOKS/budgets/useGoals";

import { LuTrendingUp } from "react-icons/lu";
import { HiOutlineSquaresPlus } from "react-icons/hi2";
import { RiArrowDropDownLine } from "react-icons/ri";

import type { BudgetDataType } from "../../types/ApiDataTypes";

const Budget = () => {
  const [viewAll, setViewAll] = useState(false);
  const currentMonth = new Date().getMonth() + 1;

  const {
    data: budgets = [],
    isLoading: budgetLoading,
    isError: budgetError,
  } = useBudgets(currentMonth, viewAll);

  const {
    data: goals = [],
    isLoading: goalLoading,
    isError: goalError,
  } = useGoals();

  /* ================= LOADING ================= */
  if (budgetLoading || goalLoading) {
    return <div className="p-4 text-center">Loading...</div>;
  }

  /* ================= ERROR ================= */
  if (budgetError || goalError) {
    return (
      <div className="p-4 text-center text-red-500">
        Failed to load data. Please try again.
      </div>
    );
  }

  /* ================= DATA NORMALIZATION ================= */

  const formattedBudgets: BudgetDataType[] = budgets.map((b: any) => ({
    id: b.id,
    category: b.category,
    limit: Number(b.budgetLimit),
    spent: Number(b.spent),
    status: b.status,
  }));
  console.log("budgets:", formattedBudgets);

  const formattedGoals: BudgetDataType[] = goals.map((g: any) => ({
    id: g.id,
    category: g.title,
    limit: g.targetAmount,
    spent: g.savedAmount,
    status: g.status,
  }));

  /* ================= UI ================= */

  return (
    <div className="space-y-6">
      {/* ===== HEADER ===== */}
      <section className="flex flex-col px-3 md:px-0">
        <h1 className="text-2xl sm:text-3xl font-semibold text-green-700 mb-1">
          Financial Planning
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-md">
          Plan, track, and manage your monthly spending effectively
        </p>
      </section>

      {/* ===== OVERVIEW ===== */}
      <section className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-green-100 p-3 md:p-4 rounded-lg">
        <div className="flex items-start gap-2">
          <LuTrendingUp className="text-green-500 mt-1" size={22} />
          <div>
             <h1 className="text-lg sm:text-xl lg:text-2xl font-semibold text-green-700">
              Budget Overview
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Manage your budgets, track spending, and achieve your financial
              goals.
            </p>
          </div>
        </div>

        <div className="flex md:gap-2 justify-start md:justify-center">
          <AddBudgetBtn />
          <AddGoalBtn />
        </div>
      </section>

      {/* ===== BUDGET LIST ===== */}
      <section>
        <div className="flex justify-between items-center mb-4 px-2 md:px-0">
          <div className="flex items-center gap-2">
            <HiOutlineSquaresPlus size={22} className="text-green-600" />
            <h2 className="text-lg md:text-xl text-slate-600 font-semibold">
              Monthly Budgets
            </h2>
          </div>

          <button
            onClick={() => setViewAll(true)}
            className="flex items-center border rounded-lg px-2 text-xs text-green-600 hover:text-green-700"
          >
            <span>view all</span>
            <RiArrowDropDownLine size={20} />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-2 md:px-0">
          {formattedBudgets.length > 0 ? (
            formattedBudgets.map((item) => (
              <BudgetCard key={item.id} item={item} type="budget" />
            ))
          ) : (
            <p className="text-sm text-slate-400">No budgets found</p>
          )}
        </div>
      </section>

      {/* ===== GOALS LIST ===== */}
      <section>
        <div className="flex justify-between items-center mb-4 px-2 md:px-0">
          <div className="flex items-center gap-2">
            <HiOutlineSquaresPlus size={22} className="text-green-600" />
            <h2 className="text-lg md:text-xl text-slate-600 font-semibold">
              My Goals
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-2 md:px-0">
          {formattedGoals.length > 0 ? (
            formattedGoals.map((item) => (
              <BudgetCard key={item.id} item={item} type="goal" />
            ))
          ) : (
            <p className="text-sm text-slate-400">No goals found</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Budget;
