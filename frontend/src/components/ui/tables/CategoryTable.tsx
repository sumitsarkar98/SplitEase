interface CategoryDataType {
  category: string;
  amount: number;
  percentage: number;
}

const CategoryTable = () => {
  const categoryData: CategoryDataType[] = [
    { category: "Food", amount: 8200, percentage: 32 },
    { category: "Travel", amount: 5400, percentage: 21 },
    { category: "Shopping", amount: 4300, percentage: 17 },
    { category: "Bills", amount: 3100, percentage: 12 },
    { category: "Entertainment", amount: 2500, percentage: 10 },
    { category: "Entertainment", amount: 2500, percentage: 10 },
    { category: "Others", amount: 1800, percentage: 8 },
  ];

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
              transition-colors duration-300 group-hover:text-green-700"
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
