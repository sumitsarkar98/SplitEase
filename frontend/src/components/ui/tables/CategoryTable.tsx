import type { CategoryDataTypes, PeriodType } from "../../../types/DataTypes";

interface CategoryTableProps {
  period: PeriodType;
}

const categoryData: CategoryDataTypes[] = [
  {
    title: "Food",
    total_expense: "3100.00",
  },
  {
    title: "Transport",
    total_expense: "1200.00",
  },
  {
    title: "Shopping",
    total_expense: "6000.00",
  },
  {
    title: "Bills",
    total_expense: "2000.00",
  },
  {
    title: "Housing",
    total_expense: "8000.00",
  },
  {
    title: "Health",
    total_expense: "1700.00",
  },
  {
    title: "Entertainment",
    total_expense: "1600.00",
  },
];
const CategoryTable = () => {
  return (
    <div className="overflow-x-auto h-100 bg-white">
      <table className="w-full text-xs md:text-sm">
        {/* ================= TABLE HEADER ================= */}
        <thead>
          <tr className="text-slate-500 border-b border-slate-200 bg-slate-50">
            <th className="text-start py-3 px-6 font-semibold tracking-wide">
              Category
            </th>
            <th className="text-end py-3 px-4 font-semibold tracking-wide">
              ₹ Amount
            </th>
          </tr>
        </thead>

        {/* ================= TABLE BODY ================= */}
        <tbody>
          {categoryData.map((item, index) => (
            <tr
              key={index}
              className="cursor-pointer group relative border-b border-slate-100
              transition-all duration-300 ease-out 
              hover:bg-slate-50"
            >
              {/* Category */}
              <td
                className="py-3 ps-6 font-medium text-slate-700 
              transition-colors duration-300 group-hover:text-green-600 capitalize"
              >
                {item.title}
              </td>

              {/* Amount */}
              <td
                className="py-3 px-4 text-slate-600 text-end
              transition-colors duration-300 group-hover:text-green-600"
              >
                {item.total_expense}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryTable;
