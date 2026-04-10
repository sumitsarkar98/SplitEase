import type { TransactionDetailsType } from "../../../types/ApiDataTypes";

import { useState } from "react";
import { MdFileDownload } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";

const dummyTransactions: TransactionDetailsType[] = [
  {
    id: 1,
    date: "2026-03-01",
    category: "Salary",
    description: "Monthly salary credited",
    amount: 50000,
    type: "income",
  },
  {
    id: 2,
    date: "2026-03-02",
    category: "Food",
    description: "Swiggy order",
    amount: 450,
    type: "expense",
  },
  {
    id: 3,
    date: "2026-03-03",
    category: "Transport",
    description: "Uber ride",
    amount: 220,
    type: "expense",
  },
  {
    id: 4,
    date: "2026-03-05",
    category: "Freelance",
    description: "Website project payment",
    amount: 12000,
    type: "income",
  },
  {
    id: 5,
    date: "2026-03-06",
    category: "Shopping",
    description: "Clothing purchase",
    amount: 3200,
    type: "expense",
  },
  {
    id: 6,
    date: "2026-03-07",
    category: "Bills",
    description: "Electricity bill",
    amount: 1800,
    type: "expense",
  },
  {
    id: 7,
    date: "2026-03-10",
    category: "Investment",
    description: "Stock dividend",
    amount: 2500,
    type: "income",
  },
  {
    id: 8,
    date: "2026-03-12",
    category: "Food",
    description: "Restaurant dinner",
    amount: 950,
    type: "expense",
  },
  {
    id: 9,
    date: "2026-03-15",
    category: "Transport",
    description: "Fuel refill",
    amount: 1500,
    type: "expense",
  },
  {
    id: 10,
    date: "2026-03-18",
    category: "Bonus",
    description: "Performance bonus",
    amount: 10000,
    type: "income",
  },
];

const TransactionTableDetails = () => {
  const [transactions, setTransactions] = useState(dummyTransactions);

  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const [dateFilter, setDateFilter] = useState<
    "all" | "week" | "month" | "year"
  >("all");

  const [filterType, setFilterType] = useState<"all" | "income" | "expense">(
    "all",
  );

  const toggleRow = (id: number) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((row) => row !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  const filteredTransactions =
    filterType === "all"
      ? transactions
      : transactions.filter((txn) => txn.type === filterType);

  const toggleSelectAll = () => {
    if (selectedRows.length === filteredTransactions.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(filteredTransactions.map((txn) => txn.id));
    }
  };

  const editTransaction = (id: number) => {
    alert("Open edit modal for ID: " + id);
  };

  const deleteSelected = () => {
    setTransactions(
      transactions.filter((txn) => !selectedRows.includes(txn.id)),
    );
    setSelectedRows([]);
  };

  return (
    <div className="w-full">
      {/* HEADER */}
      <div className="flex items-center justify-between md:gap-4 md:justify-end">
        {/* Type Filter */}
        <select
          value={filterType}
          onChange={(e) =>
            setFilterType(e.target.value as "all" | "income" | "expense")
          }
          className="cursor-pointer border border-slate-200 rounded-lg px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-green-700"
        >
          <option value="all">All Type</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        {/* Date Filter */}
        <select
          value={dateFilter}
          onChange={(e) =>
            setDateFilter(e.target.value as "all" | "week" | "month" | "year")
          }
          className="border cursor-pointer border-slate-200 rounded-lg px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-green-700"
        >
          <option value="all">All Time</option>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
          <option value="year">This Year</option>
        </select>
        {/* download-btn */}
        <button className="flex items-center gap-1 border border-slate-300 px-2 py-1 rounded-lg  hover:shadow-sm cursor-pointer transition">
          <MdFileDownload size={18} />
          <span className="hidden sm:inline text-xs">Export</span>
        </button>
      </div>

      {/* Delete */}
      <div className="mt-4 flex justify-end cursor-pointer">
        {selectedRows.length > 0 && (
          <div className="flex items-center gap-3 text-sm">
            <span className="text-xs text-slate-500">
              {selectedRows.length} items selected
            </span>

            <button
              onClick={deleteSelected}
              className="bg-red-600 text-white px-3 py-1.5 rounded-lg hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        )}
      </div>

      {/* TABLE */}
      <div className="overflow-hidden max-h-100 cursor-pointer">
        <table className="w-full text-xs lg:text-sm min-w-100">
          <thead className="border-b text-slate-500">
            <tr>
              <th className="py-3 px-2 w-10 text-left">
                <input
                  type="checkbox"
                  checked={
                    selectedRows.length === filteredTransactions.length &&
                    filteredTransactions.length > 0
                  }
                  onChange={toggleSelectAll}
                />
              </th>

              <th className="py-3 px-2 text-left">Date</th>
              <th className="py-3 px-2 text-left">Category</th>
              <th className="py-3 px-2 text-left">Description</th>
              <th className="py-3 px-2 text-right">Amount(₹)</th>
              <th className="py-3 px-2 text-center">Edit</th>
            </tr>
          </thead>

          <tbody>
            {filteredTransactions.map((txn) => (
              <tr
                key={txn.id}
                className={`border-b hover:bg-slate-100 transition ${
                  selectedRows.includes(txn.id) ? "bg-slate-100" : ""
                }`}
              >
                <td className="py-3 px-2">
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(txn.id)}
                    onChange={() => toggleRow(txn.id)}
                  />
                </td>

                <td className="text-slate-500 py-3 px-2">
                  {new Date(txn.date).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                  })}
                </td>

                <td className="font-medium text-slate-700 py-3 px-2">
                  {txn.category}
                </td>

                <td className="text-slate-500 py-3 px-2">{txn.description}</td>

                <td
                  className={`text-right font-semibold py-3 px-2 ${
                    txn.type === "income" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {txn.type === "income" ? "+" : "-"}
                  {txn.amount}
                </td>

                <td className="py-3 px-2 text-center">
                  <button
                    onClick={() => editTransaction(txn.id)}
                    className="text-slate-500 hover:text-green-600 transition"
                  >
                    <FaRegEdit size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionTableDetails;
