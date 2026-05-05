import { useState } from "react";
import AddBudgetBtn from "../ui/buttons/AddBudgetBtn";
import AddGoalBtn from "../ui/buttons/AddGoalBtn";
import BudgetCard from "../ui/cards/BudgetCard";

import { useBudgets, useDeleteBudget } from "../../HOOKS/budgets/useBudgets";
import { useGoals, useDeleteGoal } from "../../HOOKS/budgets/useGoals";

import { LuTrendingUp } from "react-icons/lu";
import { HiOutlineSquaresPlus } from "react-icons/hi2";
import { RiArrowDropDownLine } from "react-icons/ri";

import type { BudgetDataType } from "../../types/ApiDataTypes";
import type { GoalType } from "../../types/ApiDataTypes";
import Empty from "../../pages/Empty";
import GoalCard from "../ui/cards/GoalCard";

const Budget = () => {
  const [viewAll, setViewAll] = useState(false);
  const currentMonth = new Date().getMonth() + 1;

  // DELETE HOOKS
  const { mutate: deleteBudget } = useDeleteBudget();
  const { mutate: deleteGoal } = useDeleteGoal();

  // FETCH DATA
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
    month: b.month,
    year: b.year,
  }));

  const formattedGoals: GoalType[] = goals.map((g: any) => ({
    id: g.id,
    title: g.title,
    targetAmount: Number(g.targetAmount ?? 0),
    savedAmount: Number(g.savedAmount ?? 0),
    status: g.status,
    targetDate: g.targetDate,
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

        <div className="flex md:gap-2">
          <AddBudgetBtn />
          <AddGoalBtn />
        </div>
      </section>

      {/* ===== BUDGET LIST ===== */}
      <section>
        <div className="flex justify-between items-center mb-4 px-2 md:px-0">
          <div className="flex items-center gap-1 md:gap-2">
            <HiOutlineSquaresPlus size={22} className="text-green-600" />
            <h2 className="text-lg md:text-xl text-slate-600 font-semibold">
              Monthly Budgets
            </h2>
          </div>

          {/* FIXED toggle */}
          <button
            onClick={() => setViewAll((prev) => !prev)}
            className="flex items-center border rounded-lg px-2 text-xs text-green-600 hover:text-green-700"
          >
            <span>{viewAll ? "show less" : "view all"}</span>
            <RiArrowDropDownLine size={20} />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-2 md:px-0">
          {formattedBudgets.length > 0 ? (
            formattedBudgets.map((item) => (
              <BudgetCard
                key={item.id}
                item={item}
                onDelete={(id) => deleteBudget(id)}
              />
            ))
          ) : (
            <div className="col-span-full flex justify-center">
              <div
                className="w-full max-w-md 
        border-2 border-dashed border-slate-300 
        rounded-xl p-6 
        flex flex-col items-center justify-center gap-3
        text-center bg-slate-50 hover:border-green-400 hover:bg-green-50 transition"
              >
                <p className="text-sm text-slate-500">
                  No budgets yet for this month
                </p>

                <AddBudgetBtn />
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ===== GOALS LIST ===== */}
      <section>
        <div className="flex justify-between items-center mb-4 px-2 md:px-0">
          <div className="flex items-center gap-1 md:gap-2">
            <HiOutlineSquaresPlus size={22} className="text-green-600" />
            <h2 className="text-lg md:text-xl text-slate-600 font-semibold">
              My Goals
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-2 md:px-0">
          {formattedGoals.length > 0 ? (
            formattedGoals.map((item) => (
              <GoalCard
                key={item.id}
                item={item}
                onDelete={(id) => deleteGoal(id)}
              />
            ))
          ) : (
            <div className="col-span-full flex justify-center">
              <div
                className="w-full max-w-md 
        border-2 border-dashed border-slate-300 
        rounded-xl p-6 
        flex flex-col items-center justify-center gap-3
        text-center bg-slate-50
        hover:border-amber-400 hover:bg-amber-50 transition"
              >
                <p className="text-sm text-slate-500">No goals yet</p>

                <AddGoalBtn />
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Budget;
