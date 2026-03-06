import { FiBell } from "react-icons/fi";

import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200 px-6 lg:px-8 py-4 flex items-center justify-between">
      {/* ================= LEFT SECTION ================= */}
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-semibold text-white tracking-tight">
          <NavLink to="/home/dashboard">
            Split
            <span className="text-amber-300">Ease</span>
          </NavLink>
        </h1>
      </div>

      {/* ================= MIDDLE SECTION ================= */}
      <div className="hidden md:flex items-center">
        <NavLink
          to="/home/dashboard"
          className={({ isActive }) =>
            isActive ? "text-white" : "text-green-600"
          }
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/home/transactions"
          className={({ isActive }) =>
            isActive ? "text-white" : "text-amber-200"
          }
        >
          Transactions
        </NavLink>
      </div>

      {/* ================= RIGHT SECTION ================= */}
      <div className="flex items-center gap-5">
        {/* Notification */}
        <button className="relative text-white hover:text-primary-600 transition">
          <FiBell size={20} />
          <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full"></span>
        </button>

        {/* User Profile */}
        <div className="flex items-center gap-3 cursor-pointer">
          <span className="hidden sm:block text-sm font-medium text-white">
            Sumit
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
