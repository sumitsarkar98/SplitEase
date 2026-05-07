import { useCategoryExpense } from "../../../HOOKS/others/useCategoryExpense";

const CategoryTable = () => {
  const { data = [], isLoading, isError } = useCategoryExpense();

  if (isLoading) return <div className="p-4">Loading...</div>;
  if (isError)
    return <div className="p-4 text-red-500">Error loading data</div>;

  return (
    <div className="lg:p-2 flex justify-between items-center">
      <table className="w-full text-xs md:text-sm">
        {/* HEADER */}
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

        {/* BODY */}
        <tbody>
          {data.map((item: any) => (
            <tr
              key={`${item.id}-${item.type}`}
              className="group border-b border-slate-100 hover:bg-slate-50 cursor-pointer transition"
            >
              {/* Category */}
              <td className="py-3 px-5 text-slate-600 font-semibold capitalize">
                {item.title}
              </td>

              {/* Amount */}
              <td
                className={`py-3 px-5 text-right font-medium ${
                  item.type === "income" ? "text-green-600" : "text-red-600"
                }`}
              >
                ₹ {Number(item.total_amount).toLocaleString("en-IN")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryTable;
