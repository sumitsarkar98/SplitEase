import { useRecentIncome } from "../../../HOOKS/dashboard/useRecentIncome";
import Empty from "../../../pages/Empty";

const formatDate = (date: string) => {
  if (!date) return "—";
  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};
// console.log("date:", formatDate("2023-10-15"));

const RecentIncome = () => {
  const { data = [], isLoading, isError } = useRecentIncome();

  if (isLoading) {
    return <p className="text-sm text-center">Loading...</p>;
  }

  // Treat error + empty as same UX
  const isEmpty =
    isError ||
    !data ||
    data.length === 0 ||
    !data.some((item: any) => item?.id);

  if (isEmpty) {
    return (
      <Empty
        title="No recent income"
        buttonText="Add income now"
        link="/home/transactions?type=income"
      />
    );
  }

  return (
    <div className="w-full">
      {data.map((item: any) => (
        <div
          key={item.id}
          className="flex justify-between items-center py-3 border-b border-slate-200 text-sm"
        >
          <div className="flex flex-col">
            <p className="font-semibold text-base text-slate-700">
              {item.note || "No note"}
            </p>
            <p className="text-xs text-slate-400"> {item.category || "—"}</p>
          </div>

          <div className="flex flex-col items-end">
            <p className="text-green-600 font-semibold">₹{item.amount ?? 0}</p>
            <p className="text-[11px] text-slate-400 mt-1">
              {item.type?.charAt(0).toUpperCase() + item.type?.slice(1)} •{" "}
              {formatDate(item.date)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecentIncome;
