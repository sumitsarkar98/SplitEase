import { useState } from "react";
import { FaRegEdit } from "react-icons/fa";

interface Transaction {
  id: number;
  date: string;
  category: string;
  description: string;
  amount: number;
  type: "income" | "expense";
}

const initialTransactions: Transaction[] = [
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

const TransactionTableDetails = () => {
  const [transactions, setTransactions] =
    useState<Transaction[]>(initialTransactions);

  const [selectedRows, setSelectedRows] = useState<number[]>([]);

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

  const filteredTransactions =
    filterType === "all"
      ? transactions
      : transactions.filter((txn) => txn.type === filterType);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm px-2 py-8 md:px-6">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 md:mb-4 px-4">
        <h2 className="text-lg md:text-xl text-slate-600 hover:text-green-700 cursor-pointer font-semibold capitalize">
          Transaction history
        </h2>

        {/* filter & delete */}
        <div className="flex items-center justify-end">
          {/* FILTER DROPDOWN */}
          <select
            value={filterType}
            onChange={(e) =>
              setFilterType(e.target.value as "all" | "income" | "expense")
            }
            className="border border-slate-200 rounded-lg px-2 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-green-700"
          >
            <option value="all">Default</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full text-xs lg:text-base min-w-100">
          <thead className="border-b text-slate-500">
            <tr>
              <th className="py-3 px-2 w-10 text-left ">
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
            </tr>
          </thead>

          <tbody>
            {filteredTransactions.map((txn) => (
              <tr
                key={txn.id}
                className={`border-b hover:bg-green-100 hover:text-green-600 transition ${
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

      {/* Delete */}
      <div className="mt-4 hidden md:flex justify-end">
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
    </div>
  );
};

export default TransactionTableDetails;
