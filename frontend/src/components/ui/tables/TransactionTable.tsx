import AddBtn from "../buttons/AddBtn";

interface Transaction {
  id: number;
  date: string;
  category: string;
  description: string;
  amount: number;
  type: "income" | "expense";
}

const transactions: Transaction[] = [
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

const TransactionTable = () => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-3 md:py-4 md:px-6">
      {/* Header */}
      <div className="flex justify-between items-center gap-3 my-4">
        <h2 className="text-lg md:text-xl text-slate-600 hover:text-green-700 cursor-pointer font-semibold capitalize">
          Recent Transactions
        </h2>

        <AddBtn name="Add Transaction" />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-xs sm:text-sm">
          {/* Table Head */}
          <thead className="text-left text-slate-500 border-b">
            <tr>
              <th className="py-3 px-2">Date</th>
              <th className="px-2">Category</th>
              <th className="px-2 hidden sm:table-cell">Description</th>
              <th className="px-2 text-right">Amount</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {transactions.map((txn) => (
              <tr
                key={txn.id}
                className="border-b last:border-none hover:bg-slate-50 transition"
              >
                <td className="py-3 px-2 text-slate-500 whitespace-nowrap">
                  {txn.date}
                </td>

                <td className="px-2 font-medium text-slate-700">
                  {txn.category}
                </td>

                {/* Hide description on very small screens */}
                <td className="px-2 text-slate-500 hidden sm:table-cell">
                  {txn.description}
                </td>

                <td
                  className={`px-2 text-right font-semibold ${
                    txn.type === "income" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {txn.type === "income" ? "+" : "-"}₹{txn.amount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionTable;
