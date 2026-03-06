import { NavLink } from "react-router-dom";
import OverviewCard from "../ui/cards/OverviewCard";
import CategoryTable from "../ui/tables/CategoryTable";
import TransactionTable from "../ui/tables/TransactionTable";
import BarCharts from "../ui/charts/BarCharts";

import { FaArrowRightLong } from "react-icons/fa6";
import { useState } from "react";

const Dashboard = () => {
  const [chartType, setChartType] = useState<"monthly" | "yearly" | "overall">(
    "monthly",
  );

  return (
    <div className="md:p-6 lg:p-8 space-y-6 bg-light min-h-screen">
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
        <div className="flex bg-slate-100 p-1 rounded-lg w-fit">
          {["monthly", "yearly", "overall"].map((type) => (
            <button
              key={type}
              onClick={() => setChartType(type as any)}
              className={`px-3 py-1.5 text-xs md:text-sm rounded-md transition capitalize
              ${
                chartType === type
                  ? "bg-white text-green-600 shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </section>

      {/* ===== OVERVIEW CARDS ===== */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 px-3 md:px-0 md:gap-4">
        <OverviewCard title="balance" amount="1,23,456" increment={5.2} />
        <OverviewCard title="income" amount="2,34,567" increment={8.4} />
        <OverviewCard title="expense" amount="1,12,345" decrement={3.8} />
        <OverviewCard title="wallet" amount="12,222" decrement={1.2} />
      </section>

      {/* ===== CATEGORY + CHART ===== */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Category Table */}
        <div className="bg-white rounded-xl p-2 md:p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
          {/* header */}
          <div className="flex items-center justify-center md:justify-between my-4 md:mb-4">
            <div className="flex items-center">
              <h2 className="text-base md:text-lg font-semibold text-slate-600 capitalize">
                {chartType} Expense Breakdown
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
          <CategoryTable />
        </div>

        {/* Chart */}
        <div className="bg-white rounded-xl p-2 md:p-6 border border-slate-200 shadow-sm">
          <h2 className="text-base md:text-lg font-semibold text-slate-600 capitalize my-4 text-center">
            {chartType} Cash Flow
          </h2>

          <BarCharts />
        </div>
      </section>

      {/* ===== TRANSACTIONS ===== */}
      <section>
        <TransactionTable />
      </section>
    </div>
  );
};

export default Dashboard;
