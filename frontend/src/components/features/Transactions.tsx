import type { DetailsTransactionType } from "../../types/DataTypes";

import AddBtn from "../ui/buttons/AddBtn";

import LineCharts from "../ui/charts/LineCharts";
import TransactionTableDetails from "../ui/tables/TransactionTableDetails";

const initialTransactions: DetailsTransactionType[] = [
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
  {
    id: 4,
    date: "10 Mar 2026",
    category: "Travel",
    description: "Metro",
    amount: 140,
    type: "expense",
  },
  {
    id: 5,
    date: "09 Mar 2026",
    category: "Shopping",
    description: "Clothes",
    amount: 1800,
    type: "expense",
  },
  {
    id: 6,
    date: "08 Mar 2026",
    category: "Freelance",
    description: "Website project",
    amount: 12000,
    type: "income",
  },
  {
    id: 7,
    date: "07 Mar 2026",
    category: "Bills",
    description: "Electricity Bill",
    amount: 2100,
    type: "expense",
  },
  {
    id: 8,
    date: "06 Mar 2026",
    category: "Food",
    description: "Dinner",
    amount: 450,
    type: "expense",
  },
  {
    id: 9,
    date: "05 Mar 2026",
    category: "Investment",
    description: "Stock profit",
    amount: 3500,
    type: "income",
  },
  {
    id: 10,
    date: "04 Mar 2026",
    category: "Travel",
    description: "Bus ticket",
    amount: 80,
    type: "expense",
  },
];

const Expenses = () => {
  return (
    <div className="md:p-4 lg:p-8 space-y-5 bg-light min-h-screen">
      {/* ================= PAGE DETAILS SECTION ================= */}
      <section className="flex items-start md:items-center md:justify-between">
        {/* page-info */}
        <div className="px-2 md:p-0">
          <h1 className="text-2xl lg:text-3xl font-semibold text-slate-700 md:mb-2">
            Transactions
          </h1>
          <p className="text-xs lg:text-base text-slate-400">
            Transactions Track and manage all your financial activities
          </p>
        </div>

        {/* cta-btn */}
        <div className="hidden md:flex justify-end bg-red">
          <AddBtn name="Add Transaction" />
        </div>
      </section>

      {/* ================= transaction SECTION ================= */}
      <section className="space-y-1 lg:space-y-2">
        <TransactionTableDetails detailsTransaction={initialTransactions} />
      </section>

      {/* ================= INCOME vs EXPENSE TREND SECTION ================= */}
      <section className="space-y-1 lg:space-y-2">
        <LineCharts data={initialTransactions} />
      </section>

      {/* ================= EXPENSES SECTION ================= */}
      <section className="space-y-1 lg:space-y-2"></section>
    </div>
  );
};

export default Expenses;
