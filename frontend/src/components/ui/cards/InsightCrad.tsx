import { PiInfo } from "react-icons/pi";
import { CgInsights } from "react-icons/cg";

import { useGetInsights } from "../../../HOOKS/others/useInsight";

const InsightCard = () => {
  const { data: insights = [], isLoading } = useGetInsights();

  const highlightAmount = (text: string, type: string) => {
    const amountRegex = /₹\d+(,\d+)?(\.\d+)?|\d+%/g;

    return text.split(amountRegex).reduce((acc: any[], part, index) => {
      const match = text.match(amountRegex)?.[index];

      acc.push(<span key={`text-${index}`}>{part}</span>);

      if (match) {
        acc.push(
          <span
            key={`amount-${index}`}
            className={`font-semibold ${
              type === "income" ? "text-green-600" : "text-red-500"
            }`}
          >
            {match}
          </span>,
        );
      }

      return acc;
    }, []);
  };

  if (isLoading) {
    return (
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-3">
        <div className="flex items-center gap-2 text-green-600 mb-3">
          <CgInsights size={18} />
          <h1 className="text-base font-semibold">Insights</h1>
        </div>

        <p className="text-sm text-slate-500">Loading insights...</p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition p-3">
      {/* Header */}
      <div className="flex items-center gap-2 text-green-600 mb-3">
        <CgInsights size={18} />

        <h1 className="text-base font-semibold capitalize">Insights</h1>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-3 text-sm">
        {insights.length === 0 ? (
          <div className="flex items-start gap-2 p-2 rounded-md bg-slate-50">
            <PiInfo className="mt-0.5 text-green-600 shrink-0" />

            <p className="text-slate-600">
              No insights available for this month.
            </p>
          </div>
        ) : (
          insights.map((item: any, index: number) => (
            <div
              key={index}
              className="flex items-start gap-2 p-2 rounded-md bg-slate-50"
            >
              <PiInfo className="mt-0.5 text-green-600 shrink-0" />

              <p className="text-slate-600 leading-relaxed">
                {highlightAmount(
                  item.description,
                  item.type === "income" ? "income" : "expense",
                )}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default InsightCard;
