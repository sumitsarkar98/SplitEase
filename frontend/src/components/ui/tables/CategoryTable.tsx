import type { CategoryExpenseTypes } from "../../../types/ApiDataTypes";

const categoryData: CategoryExpenseTypes[] = [
  {
    title: "Food",
    total_expense: 3100.0,
    percentage: 20,
  },
  {
    title: "Transport",
    total_expense: 1200.0,
    percentage: 20,
  },
  {
    title: "Shopping",
    total_expense: 6000.0,
    percentage: 20,
  },
  {
    title: "Bills",
    total_expense: 2000.0,
    percentage: 20,
  },
  {
    title: "Housing",
    total_expense: 8000.0,
    percentage: 20,
  },
  {
    title: "Health",
    total_expense: 1700.0,
    percentage: 20,
  },
  {
    title: "Entertainment",
    total_expense: 1600.0,
    percentage: 20,
  },
];

const CategoryTable = () => {
  return (
    <div className="lg:p-2 flex justify-between items-center">
      <table className="w-full text-xs md:text-sm">
        {/* ===== HEADER ===== */}
        <thead>
          <tr className="text-slate-500 bg-slate-100 border-b border-slate-300">
            <th className="text-left py-3 px-5 font-semibold rounded-tl-lg">
              Category
            </th>
            <th className="text-right py-3 px-5 font-semibold rounded-tr-lg">
              Amount
            </th>
          </tr>
        </thead>

        {/* ===== BODY ===== */}
        <tbody>
          {categoryData.map((item, index) => (
            <tr
              key={index}
              className="group border-b border-slate-100 hover:bg-slate-50 cursor-pointer transition"
            >
              {/* Category */}
              <td className="py-3 px-5 text-slate-600 font-semibold capitalize">
                {item.title}
              </td>

              {/* Amount */}
              <td className="py-3 px-5 text-right font-medium text-slate-600">
                ₹{item.total_expense.toLocaleString("en-IN")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryTable;
