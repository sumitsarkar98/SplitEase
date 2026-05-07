import { useState, useEffect, useMemo } from "react";
import { MdFileDownload } from "react-icons/md";
import { useTransactions } from "../../../HOOKS/transaction/useTransactions";
import EditTBtn from "../buttons/EditTransactionBtn";
import DeleteTBtn from "../buttons/DeleteTransactionBtn";
import { useGetCategories } from "../../../HOOKS/others/useGetCategories";

const TransactionTableDetails = () => {
  const [period, setPeriod] = useState<"weekly" | "monthly" | "yearly">(
    "monthly",
  );
  const [type, setType] = useState<"all" | "income" | "expense">("all");

  const { data = [], isLoading, isError } = useTransactions(period, type);
  const { data: categories = [], isLoading: isCategoriesLoading } =
    useGetCategories();

  // safer category map (string keys)
  const categoryMap = useMemo(() => {
    const map: Record<string, string> = {};

    categories.forEach((cat: any) => {
      map[String(cat.id)] = cat.title;
    });

    return map;
  }, [categories]);

  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const clearSelection = () => setSelectedRows([]);

  // remove deleted rows from selection
  useEffect(() => {
    setSelectedRows((prev) =>
      prev.filter((id) => data.some((txn: any) => txn.id === id)),
    );
  }, [data]);

  const toggleRow = (id: number) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((row) => row !== id) : [...prev, id],
    );
  };

  const allSelected = data.length > 0 && selectedRows.length === data.length;

  const toggleSelectAll = () => {
    if (allSelected) {
      setSelectedRows([]);
    } else {
      setSelectedRows(data.map((txn: any) => txn.id));
    }
  };

  if (isLoading) return <div className="p-4">Loading...</div>;
  if (isError)
    return <div className="p-4 text-red-500">Error loading data</div>;

  return (
    <div className="w-full">
      {/* FILTERS + ACTIONS */}
      <section className="flex flex-col md:flex-row md:justify-between my-4">
        <div className="flex items-center justify-between md:gap-2">
          <select
            value={type}
            onChange={(e) => setType(e.target.value as any)}
            className="border rounded-lg px-2 py-1 text-xs hover:bg-slate-50 cursor-pointer"
          >
            <option value="all">All Type</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>

          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value as any)}
            className="border rounded-lg px-2 py-1 text-xs hover:bg-slate-50 cursor-pointer"
          >
            <option value="weekly">This Week</option>
            <option value="monthly">This Month</option>
            <option value="yearly">This Year</option>
          </select>

          <button className="flex items-center gap-1 border px-2 py-1 rounded-lg hover:bg-slate-50 cursor-pointer">
            <MdFileDownload size={18} />
            <span className="text-xs">Export</span>
          </button>
        </div>

        {/* ACTION BAR */}
        {selectedRows.length > 0 && (
          <section className="flex justify-end items-center gap-2 mt-3 md:mt-0">
            <span className="text-xs text-slate-500">
              {selectedRows.length} selected
            </span>

            <div className="flex gap-2">
              <DeleteTBtn ids={selectedRows} clearSelection={clearSelection} />

              {selectedRows.length === 1 && (
                <EditTBtn
                  txn={data.find((t: any) => t.id === selectedRows[0])}
                />
              )}
            </div>
          </section>
        )}
      </section>

      {/* TABLE */}
      <section className="overflow-hidden mt-3">
        <table className="w-full text-xs sm:text-sm">
          <thead className="border-b border-slate-400 text-slate-600">
            <tr>
              <th className="p-2 text-left">
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={toggleSelectAll}
                />
              </th>

              <th className="text-left p-2">Date</th>
              <th className="text-left p-2">Category</th>

              <th className="hidden sm:table-cell text-left p-2">
                Description
              </th>

              <th className="text-right p-2">Amount</th>
            </tr>
          </thead>

          <tbody>
            {data.map((txn: any) => (
              <tr key={txn.id} className="border-b hover:bg-slate-100">
                {/* CHECKBOX */}
                <td className="p-2">
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(txn.id)}
                    onChange={() => toggleRow(txn.id)}
                  />
                </td>

                {/* DATE */}
                <td className="p-2">
                  {new Date(txn.transaction_date).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                  })}
                </td>

                {/* CATEGORY */}
                <td className="p-2 font-medium">
                  {isCategoriesLoading
                    ? "Loading..."
                    : categoryMap[String(txn.category_id)] || "goal"}
                </td>

                {/* DESCRIPTION */}
                <td className="hidden sm:table-cell p-2">{txn.note || "—"}</td>

                {/* AMOUNT */}
                <td
                  className={`p-2 text-right font-semibold ${
                    txn.type === "income" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {txn.type === "income" ? "+" : "-"}
                  {txn.amount}
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
