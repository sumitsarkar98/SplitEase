// components/ui/RecentIncome.tsx
import { useRecentIncome } from "../../../HOOKS/dashboard/useRecentIncome";
import Empty from "../../../pages/Empty";

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const RecentIncome = () => {
  const { data = [], isLoading, isError } = useRecentIncome();

  if (isLoading) {
    return <p className="text-sm text-center">Loading...</p>;
  }

  if (isError) {
    return (
      <p className="text-sm text-center text-red-500">Failed to load data</p>
    );
  }

  if (data.length === 0) {
    return (
      <div className="h-50 flex items-center justify-center">
        <Empty
          title="No recent income"
          buttonText="Add Income"
          link="/home/transactions"
        />
      </div>
    );
  }

  return (
    <div className="w-full">
      {data.map((item) => (
        <div
          key={item.id}
          className="flex justify-between items-center py-3 border-b border-slate-200 text-sm"
        >
          {/* LEFT */}
          <div className="flex flex-col">
            <p className="font-semibold text-base text-slate-700">
              {item.category}
            </p>

            <p className="text-xs text-slate-400">{item.note || "No note"}</p>
          </div>

          {/* RIGHT */}
          <div className="flex flex-col items-end">
            <p className="text-green-600 font-semibold">₹{item.amount}</p>

            <p className="text-[11px] text-slate-400 mt-1">
              {item.type.charAt(0).toUpperCase() + item.type.slice(1)} •{" "}
              {formatDate(item.date)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecentIncome;
