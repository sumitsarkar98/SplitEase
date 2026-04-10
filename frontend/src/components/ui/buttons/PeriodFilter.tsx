import { useState } from "react";
import type { PeriodType } from "../../../types/ApiDataTypes.ts";

const PeriodFilter = () => {
  const [period, setPeriod] = useState<PeriodType>("month");
  const periods: PeriodType[] = ["week", "month", "year"];

  return (
    <div className="flex items-center bg-slate-100 p-1 rounded-lg gap-1">
      {periods.map((p) => (
        <button
          key={p}
          onClick={() => setPeriod(p)}
          className={`px-3 py-1.5 text-xs sm:text-sm rounded-md transition ${
            period === p
              ? "bg-white text-green-600 shadow-sm"
              : "text-slate-500 hover:text-slate-700"
          }`}
        >
          {p.charAt(0).toUpperCase() + p.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default PeriodFilter;
