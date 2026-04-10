import type { BudgetDataType } from "../../types/ApiDataTypes";

import AddBudgetBtn from "../ui/buttons/AddBudgetBtn";
import AddGoalBtn from "../ui/buttons/AddGoalBtn";
import BudgetCard from "../ui/cards/BudgetCard";

import { LuTrendingUp } from "react-icons/lu";
import { HiOutlineSquaresPlus } from "react-icons/hi2";

// demo data
const budgets: BudgetDataType[] = [
  {
    id: 1,
    category: "Food",
    limit: 5000,
    spent: 3200,
  },
  {
    id: 2,
    category: "Transport",
    limit: 2000,
    spent: 1800,
  },
  {
    id: 3,
    category: "Shopping",
    limit: 4000,
    spent: 4500,
  },
  {
    id: 4,
    category: "Shopping",
    limit: 4000,
    spent: 4500,
  },
];

const goals: BudgetDataType[] = [
  {
    id: 1,
    category: "Food",
    limit: 5000,
    spent: 3200,
  },
  {
    id: 2,
    category: "Transport",
    limit: 2000,
    spent: 1800,
  },
  {
    id: 3,
    category: "Shopping",
    limit: 4000,
    spent: 4500,
  },
];

const Budget = () => {
  return (
    <div className="space-y-5">
      {/* ===== SECTION-1 (PAGE HEADER) ===== */}
      <section className="flex flex-col px-3 md:px-0">
        <h1 className="text-2xl sm:text-3xl font-semibold text-green-700 mb-1">
          Financial Planning
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-md">
          Plan, track, and manage your monthly spending effectively
        </p>
      </section>

      {/* ===== SECTION-2 (OVERVIEW CARD) ===== */}
      <section className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-green-100 p-3 md:p-4 rounded-lg">
        {/* Left text */}
        <div className="flex items-start gap-2">
          <LuTrendingUp className="text-green-500 mt-1 shrink-0" size={22} />

          <div>
            <h1 className="text-base sm:text-lg lg:text-2xl font-semibold text-green-600">
              Budget Overview
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Manage your budgets, track spending, and achieve your financial
              goals.
            </p>
          </div>
        </div>

        {/* Right button */}
        <div className="flex md:gap-2 w-full sm:w-auto justify-center">
          <AddBudgetBtn />
          <AddGoalBtn />
        </div>
      </section>

      {/* ===== SECTION-3 (BUDGET LIST) ===== */}
      <section>
        {/* header */}
        <div className="mb-4 flex items-center justify-start px-4 gap-2">
          <HiOutlineSquaresPlus size={22} className="text-green-600" />
          <h2 className="text-lg md:text-xl text-slate-600 font-semibold capitalize">
            Monthly Budgets
          </h2>
        </div>

        {/* body */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-3 md:px-0">
          {budgets.map((item) => (
            <BudgetCard key={item.id} item={item} type="budget" />
          ))}
        </div>
      </section>

      {/* ===== SECTION-4 (goal LIST) ===== */}
      <section>
        {/* header */}
        <div className="mb-4 flex items-center justify-start px-4 gap-2">
          <HiOutlineSquaresPlus size={22} className="text-green-600" />
          <h2 className="text-base lg:text-lg font-semibold text-slate-600 capitalize">
            My Goals
          </h2>
        </div>

        {/* body */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-3 md:px-0">
          {goals.map((item) => (
            <BudgetCard key={item.id} item={item} type="goal" />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Budget;
