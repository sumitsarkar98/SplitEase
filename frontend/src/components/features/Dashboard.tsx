import { NavLink } from "react-router-dom";

import OverviewCard from "../ui/cards/OverviewCard";
import CategoryTable from "../ui/tables/CategoryTable";
import TransactionTable from "../ui/tables/TransactionTable";
import BarCharts from "../ui/charts/BarCharts";

import { FaArrowRightLong } from "react-icons/fa6";
import { useState } from "react";

import type { BarchartDataType, CategoryDataType } from "../../types/DataTypes";
import type { TransactionDataType } from "../../types/DataTypes";
import type { OverviewDataType } from "../../types/DataTypes";

//  Mock Data (to be replaced with API data)
const categoryData: CategoryDataType[] = [
  { category: "electic Bill", amount: 8200, percentage: 32 },
  { category: "Food", amount: 8200, percentage: 32 },
  { category: "Travel", amount: 5400, percentage: 21 },
  { category: "Shopping", amount: 4300, percentage: 17 },
  { category: "Bills", amount: 3100, percentage: 12 },
  { category: "Entertainment", amount: 2500, percentage: 10 },
  { category: "Entertainment", amount: 2500, percentage: 10 },
  { category: "Others", amount: 1800, percentage: 8 },
];
const transactions: TransactionDataType[] = [
  {
    id: 1,
    date: "12 Mar 2026",
    category: "Food",
    description: "Lunch",
    amount: 250,
    type: "expense",
  },
  {
    id: 2,
    date: "11 Mar 2026",
    category: "Salary",
    description: "March Salary",
    amount: 50000,
    type: "income",
  },
  {
    id: 3,
    date: "10 Mar 2026",
    category: "Travel",
    description: "Metro",
    amount: 120,
    type: "expense",
  },
];
const BarData: BarchartDataType[] = [
  { month: "Jan", income: 50000, expense: 32000 },
  { month: "Feb", income: 42000, expense: 28000 },
  { month: "Mar", income: 46000, expense: 31000 },
  { month: "Apr", income: 52000, expense: 35000 },
  { month: "May", income: 48000, expense: 30000 },
  { month: "Jun", income: 55000, expense: 37000 },
];

const OverviewData: OverviewDataType[] = [
  { title: "available_balance", value: 123456, change: 5.2 },
  { title: "total_spending", value: 234567, change: 8.4 },
  { title: "Top Category", value: "Food", change: 3.8 },
  { title: "goal_progress", value: 12222, change: 1.2 },
];

const Dashboard = () => {
  const periods = [
    { value: "month", label: "Monthly" },
    { value: "year", label: "Yearly" },
    { value: "week", label: "Weekly" },
  ];
  const [period, setPeriod] = useState<"month" | "year" | "week">("month");
  return (
    <div className="md:p-6 space-y-6 bg-light min-h-screen">
      {/* ===== HEADER ===== */}
      <section className="flex flex-col md:flex-row md:items-center md:justify-between px-2 md:gap-4">
        {/* Greeting */}
        <div className="mb-2 md:mb-0">
          <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold text-slate-700">
            Welcome back
            <span className="ml-2 text-green-600 text-2xl lg:text-3xl font-highlight">
              Sumit !
            </span>
          </h1>
          <p className="text-sm text-slate-400">
            Here's your financial overview.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex items-center justify-end bg-slate-100 p-1 rounded-lg w-fit">
          <div></div>
          {periods.map((p) => (
            <button
              key={p.value}
              onClick={() => setPeriod(p.value as any)}
              className={`px-3 py-1.5 text-xs md:text-sm rounded-md transition
      ${
        period === p.value
          ? "bg-white text-green-600 shadow-sm"
          : "text-slate-500 hover:text-slate-700"
      }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </section>

      {/* ===== OVERVIEW CARDS ===== */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 px-3 md:px-0 md:gap-4">
        {OverviewData.map((data, index) => (
          <OverviewCard key={index} data={data} period={period} />
        ))}
      </section>

      {/* ===== CATEGORY + CHART ===== */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Category Table */}
        <div className="bg-white rounded-xl p-2 md:p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
          {/* header */}
          <div className="flex items-center justify-center md:justify-between my-4 md:mb-4">
            <div className="flex items-center">
              <h2 className="text-base md:text-lg font-semibold text-slate-600 capitalize">
                {`${period}ly Expense Breakdown`}
              </h2>
              <FaArrowRightLong className="ml-2 text-sm hidden lg:block" />
            </div>

            <NavLink
              to="/home/transactions"
              className="hidden md:block text-xs bg-slate-100 px-3 py-1 rounded-lg text-slate-600 hover:bg-green-50 hover:text-green-700 transition"
            >
              View All
            </NavLink>
          </div>

          {/* table */}
          <CategoryTable categoryData={categoryData} />
        </div>

        {/* Chart */}
        <div className="bg-white rounded-xl p-2 md:p-6 border border-slate-200 shadow-sm">
          <h2 className="text-base md:text-lg font-semibold text-slate-600 capitalize my-4 text-center">
           {`${period}ly Cash Flow`}
          </h2>

          <BarCharts data={BarData} />
        </div>
      </section>

      {/* ===== TRANSACTIONS ===== */}
      <section>
        <TransactionTable transactions={transactions} />
      </section>
    </div>
  );
};

export default Dashboard;
