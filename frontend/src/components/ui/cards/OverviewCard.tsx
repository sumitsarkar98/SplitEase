import {
  MdOutlineAccountBalance,
  MdOutlineAccountBalanceWallet,
} from "react-icons/md";
import { FaArrowTrendUp } from "react-icons/fa6";
import { IoMdTrendingDown } from "react-icons/io";

import type { ReactNode } from "react";

interface Props {
  title: string;
  amount: string;
  increment?: number;
  decrement?: number;
}

const OverviewCard = ({ title, amount, increment, decrement }: Props) => {
  let cardTitle: string;
  let icon: ReactNode;
  let colorClass: string;

  switch (title.toLowerCase()) {
    case "balance":
      icon = <MdOutlineAccountBalance className="text-lg sm:text-xl" />;
      colorClass = "text-blue-600 bg-blue-100";
      cardTitle = "Total Balance";
      break;

    case "income":
      icon = <FaArrowTrendUp className="text-lg sm:text-xl" />;
      colorClass = "text-green-600 bg-green-100";
      cardTitle = "Total Income";
      break;

    case "expense":
      icon = <IoMdTrendingDown className="text-lg sm:text-xl" />;
      colorClass = "text-red-600 bg-red-100";
      cardTitle = "Total Expense";
      break;

    case "wallet":
      icon = <MdOutlineAccountBalanceWallet className="text-lg sm:text-xl" />;
      colorClass = "text-amber-600 bg-amber-100";
      cardTitle = "Wallet Balance";
      break;

    default:
      icon = <MdOutlineAccountBalance className="text-lg sm:text-xl" />;
      colorClass = "text-slate-600 bg-slate-100";
      cardTitle = "Total Balance";
  }

  return (
    <div
      className="bg-white rounded-2xl border border-slate-200 
    py-4 px-6 sm:p-5 lg:p-6 shadow-sm hover:shadow-md transition-all duration-200"
    >
      {/* CARD HEADER */}
      <div className="flex items-end justify-between mb-2">
        <h2 className="text-xs sm:text-sm font-semibold text-slate-500 tracking-wide">
          {cardTitle}
        </h2>

        <div
          className={`flex items-center justify-center 
          w-9 h-9 sm:w-10 sm:h-10 
          rounded-xl ${colorClass}`}
        >
          {icon}
        </div>
      </div>

      {/* CARD BODY */}
      <div className="space-y-2">
        <h1 className="text-3xl lg:text-4xl font-bold text-slate-600">
          ₹ {amount}
        </h1>

        {(increment !== undefined || decrement !== undefined) && (
          <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm">
            {increment !== undefined && (
              <span className="flex items-center gap-1 text-green-600 bg-green-50 px-2 py-1 rounded-md font-medium">
                ↑ {increment}%
              </span>
            )}

            {decrement !== undefined && (
              <span className="flex items-center gap-1 text-red-600 bg-red-50 px-2 py-1 rounded-md font-medium">
                ↓ {decrement}%
              </span>
            )}

            <span className="text-slate-400">vs previous period</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default OverviewCard;
