import type { CategoryDataType } from "../../../types/DataTypes";

interface CategoryTableProps {
  categoryData: CategoryDataType[];
}

const CategoryTable = ({ categoryData }: CategoryTableProps) => {
  return (
    <div className="overflow-x-auto h-100 bg-white">
      <table className="w-full text-xs md:text-sm">
        {/* ================= TABLE HEADER ================= */}
        <thead>
          <tr className="text-left text-slate-500 border-b border-slate-200 bg-slate-50">
            <th className="py-3 px-4 font-semibold tracking-wide">Category</th>
            <th className="py-3 px-4 font-semibold tracking-wide text-center">
              ₹ Amount
            </th>
            <th className="py-3 px-4 text-right font-semibold tracking-wide">
              % Distribution
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
                className="py-3 px-4 font-medium text-slate-700 
              transition-colors duration-300 group-hover:text-green-700 capitalize"
              >
                {item.category}
              </td>

              {/* Amount */}
              <td
                className="py-3 px-4 text-slate-600 text-center
              transition-colors duration-300 group-hover:text-green-600"
              >
                {item.amount.toLocaleString("en-IN")}
              </td>

              {/* Percentage */}
              <td
                className="py-3 px-4 text-right font-semibold text-primary-600 
              transition-colors duration-300 group-hover:text-green-700"
              >
                {item.percentage}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryTable;
