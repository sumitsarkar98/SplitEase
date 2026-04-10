import type {
  OverviewDataType,
  CategoryDataTypes,
} from "../../types/ApiDataTypes";

import OverviewCard from "../ui/cards/OverviewCard";
import PeriodFilter from "../ui/buttons/PeriodFilter";
import AddTransactionBtn from "../ui/buttons/AddTransactionBtn.tsx";
import SimpleLineChart from "../ui/charts/LineCharts.tsx";
import CustomPieCharts from "../ui/charts/CustomPieCharts.tsx";
import CategoryTable from "../ui/tables/CategoryTable.tsx";

import { LuTrendingUp, LuTrendingDown } from "react-icons/lu";
import { FaClockRotateLeft } from "react-icons/fa6";
import { MdOutlineHistory } from "react-icons/md";
import { PiInfo } from "react-icons/pi";
import { CgInsights } from "react-icons/cg";

const OverviewData: OverviewDataType[] = [
  {
    title: "available_balance",
    value: 61900,
    percentage: 52.24,
  },
  {
    title: "total_spending",
    value: 23600,
    percentage: 19.92,
  },
  {
    title: "goal_progress",
    value: 33000,
    percentage: 27.85,
  },
];

// ===== RAW DATA =====
const rawData: CategoryDataTypes[] = [
  { title: "Food", type: "income", amount: "3100.00" },
  { title: "Transport", type: "income", amount: "1200.00" },
  { title: "Shopping", type: "income", amount: "6000.00" },
  { title: "Bills", type: "expense", amount: "2000.00" },
  { title: "Housing", type: "expense", amount: "8000.00" },
  { title: "Health", type: "expense", amount: "1700.00" },
  { title: "Entertainment", type: "expense", amount: "1600.00" },
];

const incomeData = rawData.filter((item) => item.type === "income");
const expenseData = rawData.filter((item) => item.type === "expense");

const Dashboard = () => {
  return (
    <div className="space-y-5">
      {/* ===== SECTION-1 (PAGE HEADER) ===== */}
      <section className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between px-3 md:px-0">
        {/* Greeting - left */}
        <div className="flex flex-col">
          <h1 className="text-3xl sm:text-3xl lg:text-3xl font-semibold text-slate-700">
            Welcome back <br className="sm:hidden" />
            <span className="text-green-600 text-4xl font-highlight">
              Sumit !
            </span>
          </h1>

          <p className="text-xs sm:text-sm  text-slate-400 mt-1">
            Here's your financial overview.
          </p>
        </div>

        {/* Filter Buttons - right */}
        <div className="hidden lg:block">
          <PeriodFilter />
        </div>
      </section>

      {/* ===== SECTION-2 (OVERVIEW CARDS) ===== */}
      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-5 px-1 sm:px-2 md:px-0">
        {OverviewData.map((data) => (
          <OverviewCard key={data.title} data={data} />
        ))}
      </section>

      {/* ===== SECTION-3 ===== */}
      <section className="flex flex-col items-end sm:flex-row sm:items-start sm:justify-between gap-3 bg-green-100 p-4 rounded-lg">
        {/* Left text */}
        <div className="flex gap-2">
          <LuTrendingUp className="text-green-500 mt-1" size={25} />
          <div>
            <h1 className="text-lg sm:text-xl lg:text-2xl font-semibold text-green-600">
              Finance Dashboard
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Manage your income, expenses and budgets.
            </p>
          </div>
        </div>

        {/* Right button */}
        <div className="flex justify-start sm:justify-end">
          <AddTransactionBtn />
        </div>
      </section>

      {/* ===== SECTION-4 (income/expense breakdown)===== */}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* ===== INCOME ===== */}
        <div className="bg-white rounded-lg border border-slate-200 p-4 sm:p-5 shadow-sm hover:shadow-md transition">
          {/* Header */}
          <div className="mb-2 flex items-start justify-start gap-2">
            <LuTrendingUp className="text-green-500 mt-1" size={20} />

            <div className="text-start">
              <h2 className="text-sm sm:text-base lg:text-lg font-semibold text-slate-600">
                Monthly Income Breakdown
              </h2>
              <p className="text-xs text-slate-400">
                Distribution of your income sources
              </p>
            </div>
          </div>

          {/* Chart */}
          <div className="w-full flex items-center justify-center">
            <CustomPieCharts data={incomeData} category="income" />
          </div>

          {/* Total */}
          <div className="text-center flex justify-center items-center">
            <p className="text-md text-slate-400">
              Total Income :{" "}
              <span className="text-md font-semibold text-slate-500">
                ₹{incomeData.reduce((acc, cur) => acc + Number(cur.amount), 0)}
              </span>
            </p>
          </div>
        </div>

        {/* ===== EXPENSE ===== */}
        <div className="bg-white rounded-lg border border-slate-200 p-4 sm:p-5 shadow-sm hover:shadow-md transition">
          {/* Header */}
          <div className="mb-2 flex items-start gap-2">
            {/* Icon (optional but recommended) */}
            <div className="mt-1 text-orange-500">
              {/* example icon */}
              <LuTrendingDown size={20} />
            </div>

            <div className="text-start">
              <h2 className="text-sm sm:text-base lg:text-lg font-semibold text-slate-600">
                Monthly Expense Breakdown
              </h2>
              <p className="text-xs text-slate-400">
                Breakdown of your spending
              </p>
            </div>
          </div>

          {/* Chart */}
          <div className="w-full flex items-center justify-center">
            <CustomPieCharts data={expenseData} category="expense" />
          </div>

          {/* Total */}
          <div className="text-center ">
            <p className="text-md text-slate-400">
              Total Income :{" "}
              <span className="text-md font-semibold text-slate-500">
                ₹{incomeData.reduce((acc, cur) => acc + Number(cur.amount), 0)}
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* ===== SECTION-5 ===== */}
      <section className="bg-white rounded-lg border border-slate-200 py-3 sm:p-5 shadow-sm hover:shadow-md transition">
        {/* Header */}
        <div className="mb-4 flex justify-center items-center">
          <h2 className="text-base lg:text-lg text-center px-4 sm:p-2 font-semibold text-slate-600 capitalize">
            Monthly Income vs Expenses trend
          </h2>
        </div>
        {/* chart */}
        <div>
          <SimpleLineChart />
        </div>
      </section>

      {/* ===== SECTION-6 ===== */}
      <section className="hidden lg:flex bg-white rounded-lg border border-slate-200 p-3 sm:p-5 shadow-sm hover:shadow-md transition">
        {/* Header */}
        <div className="mb-4 flex items-center gap-2 text-green-600">
          <FaClockRotateLeft size={18} />
          <h2 className="text-sm sm:text-base lg:text-lg font-semibold text-slate-700 capitalize">
            Your Recent Incomes
          </h2>
        </div>

        {/* table */}
      </section>

      {/* ===== SECTION-7 (Mobile Only) ===== */}
      <section className="lg:hidden flex flex-col gap-4 px-1 sm:px-2">
        {/* ===== Card 1 ===== */}
        <section className="bg-white border border-slate-200 rounded-xl shadow-sm p-3">
          {/* header */}
          <div className="flex flex-col gap-2 mb-3">
            <div className="flex items-center gap-2 text-green-600">
              <MdOutlineHistory size={18} />
              <h1 className="text-base font-semibold">Transactions Overview</h1>
            </div>

            <span className="text-[11px] px-2 py-1 flex items-center gap-2 rounded-md text-green-700 bg-green-100 w-fit">
              <PiInfo className="shrink-0" />
              This month's activity
            </span>
          </div>

          <CategoryTable />
        </section>

        {/* ===== Card 2 (Insights) ===== */}
        <section className="bg-white border border-slate-200 rounded-xl shadow-sm p-3">
          {/* Header */}
          <div className="flex items-center gap-2 text-green-600 mb-3">
            <CgInsights size={18} />
            <h1 className="text-base font-semibold">Insights</h1>
          </div>

          {/* Content */}
          <div className="flex flex-col gap-3 text-sm">
            <div className="flex items-start gap-2 p-2 rounded-md bg-slate-50">
              <PiInfo className="mt-0.5 text-green-600 shrink-0" />
              <p className="text-slate-600">
                You spent{" "}
                <span className="font-medium text-slate-800">₹6,000</span> on{" "}
                <span className="font-medium text-slate-800">Shopping</span>.
              </p>
            </div>

            <div className="flex items-start gap-2 p-2 rounded-md bg-slate-50">
              <PiInfo className="mt-0.5 text-green-600 shrink-0" />
              <p className="text-slate-600">
                Expenses increased by{" "}
                <span className="font-medium text-red-500">12%</span>.
              </p>
            </div>

            <div className="flex items-start gap-2 p-2 rounded-md bg-slate-50">
              <PiInfo className="mt-0.5 text-green-600 shrink-0" />
              <p className="text-slate-600">
                Budget used:{" "}
                <span className="font-medium text-slate-800">70%</span>.
              </p>
            </div>
          </div>
        </section>
      </section>
    </div>
  );
};

export default Dashboard;
