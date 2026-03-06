import { NavLink } from "react-router-dom";
import OverviewCard from "../ui/cards/OverviewCard";
import CategoryTable from "../ui/tables/CategoryTable";

import { FaArrowRightLong } from "react-icons/fa6";
import { useState } from "react";
import TransactionTable from "../ui/tables/TransactionTable";
import BarCharts from "../ui/charts/BarCharts";

const Dashboard = () => {
  const [chartType, setChartType] = useState<"monthly" | "yearly" | "overall">(
    "monthly",
  );
  return (
    <div className="p-2 md:p-3 lg:p-8 space-y-4 bg-light min-h-screen">
      {/* ================= USER GREETING SECTION ================= */}
      <section className="space-y-1 lg:space-y-2 flex flex-col md:flex-row justify-between items-start md:items-center">
        {/* user-info */}
        <div>
          <h1 className="text-xl lg:text-3xl font-semibold text-slate-700 md:mb-2">
            Welcome back
            <span className="text-green-600 text-2xl lg:text-4xl font-semibold ml-2 font-highlight">
              Sumit !
            </span>
          </h1>
          <p className="text-xs lg:text-base text-slate-400">
            Here's your financial overview.
          </p>
        </div>

        <div className="flex justify-end items-center mt-4">
          {/* grp-btn */}
          <div className="flex items-center bg-slate-100 p-1 rounded-lg w-fit md:mt-0">
            <button
              onClick={() => setChartType("monthly")}
              className={`px-3 py-1.5 text-xs md:text-sm font-medium rounded-md transition
      ${
        chartType === "monthly"
          ? "bg-white text-green-600 shadow-sm"
          : "text-slate-500 hover:text-slate-700"
      }`}
            >
              Monthly
            </button>

            <button
              onClick={() => setChartType("yearly")}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition
      ${
        chartType === "yearly"
          ? "bg-white text-green-600 shadow-sm"
          : "text-slate-500 hover:text-slate-700"
      }`}
            >
              Yearly
            </button>

            <button
              onClick={() => setChartType("overall")}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition
      ${
        chartType === "overall"
          ? "bg-white text-green-600 shadow-sm"
          : "text-slate-500 hover:text-slate-700"
      }`}
            >
              Overall
            </button>
          </div>
        </div>
      </section>

      {/* ================= OVERVIEW CARDS ================= */}
      <section className="mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
          <OverviewCard title="balance" amount="1,23,456" increment={5.2} />
          <OverviewCard title="income" amount="2,34,567" increment={8.4} />
          <OverviewCard title="expense" amount="1,12,345" decrement={3.8} />
          <OverviewCard title="wallet" amount="12,222" decrement={1.2} />
        </div>
      </section>

      {/* ================= CATEGORY SECTION ================= */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        {/* Left Card */}
        <div className="bg-white rounded-2xl p-4 md:p-6 border border-slate-200 shadow-sm">
          <div className="flex flex-col md:flex-row justify-between items-center md:px-4 md:py-4 mb-2">
            <div className="flex items-center justify-center">
              <h2 className="my-4 text-md md:text-lg text-slate-600 hover:text-green-700 cursor-pointer font-semibold capitalize">
                {chartType} Expense Breakdown
              </h2>
              <FaArrowRightLong className="text-lg ms-2 hidden lg:block" />
            </div>
            <NavLink
              to="/categories"
              className="hidden lg:flex items-center text-xs bg-slate-100 px-3 py-1 rounded-lg text-slate-600 hover:bg-green-50 hover:text-green-800 transition"
            >
              <span>view all</span>
            </NavLink>
          </div>

          <CategoryTable />
        </div>

        {/* Right Placeholder (Chart area for future) */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-start p-2 md:p-4 mb-2">
            <h2 className="text-lg md:text-xl text-slate-600 hover:text-green-700 cursor-pointer font-semibold capitalize">
              {chartType} Cash Flow
            </h2>
            {/* <FaArrowRightLong className="text-lg ms-2" /> */}
          </div>

          <BarCharts />
        </div>
      </section>

      {/* ================= transaction SECTION ================= */}
      <section className="space-y-1 lg:space-y-2">
        <TransactionTable />
      </section>
    </div>
  );
};

export default Dashboard;
