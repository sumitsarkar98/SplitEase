import { useState } from "react";
import { MdFileDownload } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { useTransactions } from "../../../HOOKS/transaction/useTransactions";

const TransactionTableDetails = () => {
  const [period, setPeriod] = useState<"weekly" | "monthly" | "yearly">(
    "monthly",
  );
  const [type, setType] = useState<"all" | "income" | "expense">("all");

  const { data = [], isLoading, isError } = useTransactions(period, type);

  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const toggleRow = (id: number) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((row) => row !== id) : [...prev, id],
    );
  };

  const toggleSelectAll = () => {
    if (selectedRows.length === data.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(data.map((txn: any) => txn.id));
    }
  };

  const editTransaction = (id: number) => {
    alert("Open edit modal for ID: " + id);
  };

  const deleteSelected = () => {
    // Replace with API later
    alert("Delete API call with IDs: " + selectedRows.join(","));
    setSelectedRows([]);
  };

  //  loading & error
  if (isLoading) return <div className="p-4">Loading...</div>;
  if (isError)
    return <div className="p-4 text-red-500">Error loading data</div>;

  return (
    <div className="w-full">
      {/* HEADER */}
      <section className="flex items-center justify-end gap-2">
        <select
          value={type}
          onChange={(e) =>
            setType(e.target.value as "all" | "income" | "expense")
          }
          className="border rounded-lg px-2 py-1 text-xs"
        >
          <option value="all">All Type</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <select
          value={period}
          onChange={(e) =>
            setPeriod(e.target.value as "weekly" | "monthly" | "yearly")
          }
          className="border rounded-lg px-2 py-1 text-xs"
        >
          <option value="weekly">This Week</option>
          <option value="monthly">This Month</option>
          <option value="yearly">This Year</option>
        </select>

        <button className="flex items-center gap-1 border px-2 py-1 rounded-lg">
          <MdFileDownload size={18} />
          <span className="hidden sm:inline text-xs">Export</span>
        </button>
      </section>

      {/* ACTION BAR */}
      {selectedRows.length > 0 && (
        <section className="mt-4 flex justify-between items-center">
          <span className="text-xs text-slate-500">
            {selectedRows.length} selected
          </span>

          <div className="flex gap-2">
            <button
              onClick={deleteSelected}
              className="bg-red-600 text-white px-3 py-1.5 rounded-lg"
            >
              Delete
            </button>

            {selectedRows.length === 1 && (
              <button
                onClick={() => editTransaction(selectedRows[0])}
                className="sm:hidden bg-green-600 text-white px-3 py-1.5 rounded-lg"
              >
                Edit
              </button>
            )}
          </div>
        </section>
      )}

      {/* TABLE */}
      <section className="overflow-hidden mt-3">
        <table className="w-full text-xs sm:text-sm">
          <thead className="border-b border-slate-400 text-slate-600">
            <tr>
              <th className="p-2 text-left">
                <input
                  type="checkbox"
                  checked={
                    selectedRows.length === data.length && data.length > 0
                  }
                  onChange={toggleSelectAll}
                />
              </th>
              <th className="text-left p-2">Date</th>
              <th className="text-left p-2">Category</th>
              <th className="hidden sm:table-cell text-left p-2">
                Description
              </th>
              <th className="text-right p-2">Amount</th>
              <th className="hidden sm:table-cell text-center p-2">Edit</th>
            </tr>
          </thead>

          <tbody>
            {data.map((txn: any) => (
              <tr key={txn.id} className="border-b hover:bg-slate-100">
                <td className="p-2">
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(txn.id)}
                    onChange={() => toggleRow(txn.id)}
                  />
                </td>

                <td className="p-2">
                  {new Date(txn.transaction_date).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                  })}
                </td>

                <td className="p-2 font-medium">{txn.category}</td>

                <td className="hidden sm:table-cell p-2">{txn.note}</td>

                <td
                  className={`p-2 text-right font-semibold ${
                    txn.type === "income" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {txn.type === "income" ? "+" : "-"}
                  {txn.amount}
                </td>

                <td className="hidden sm:table-cell text-center">
                  <button
                    onClick={() => editTransaction(txn.id)}
                    className="text-slate-500 hover:text-green-600"
                  >
                    <FaRegEdit />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default TransactionTableDetails;
