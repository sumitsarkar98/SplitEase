import { NavLink, Outlet } from "react-router-dom";
import { LuLayoutDashboard, LuArrowLeftRight, LuWallet } from "react-icons/lu";

const Home = () => {
  const baseStyle =
    "flex items-center gap-4 px-3 py-2 rounded-lg text-base font-medium transition-all duration-200";

  return (
    <div className="flex">
      {/* ================= Sidebar ================= */}
      <aside className="fixed top-16 left-0 h-[calc(100vh-4rem)] w-60 bg-white border-r border-slate-200 p-4 hidden lg:flex flex-col">
        {/* Sidebar Title */}
        <p className="text-xs text-slate-400 uppercase tracking-wider mb-8">
          Main Menu
        </p>

        <nav className="flex flex-col gap-4">
          {/* Dashboard */}
          <NavLink
            to="dashboard"
            className={({ isActive }) =>
              `${baseStyle} ${
                isActive
                  ? "bg-green-50 text-green-700 shadow-sm"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-800"
              }`
            }
          >
            <LuLayoutDashboard size={18} />
            Dashboard
          </NavLink>

          {/* Transactions */}
          <NavLink
            to="transactions"
            className={({ isActive }) =>
              `${baseStyle} ${
                isActive
                  ? "bg-green-50 text-green-700 shadow-sm"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-800"
              }`
            }
          >
            <LuArrowLeftRight size={18} />
            Transactions
          </NavLink>

          {/* Budgets */}
          <NavLink
            to="budgets"
            className={({ isActive }) =>
              `${baseStyle} ${
                isActive
                  ? "bg-green-50 text-green-700 shadow-sm"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-800"
              }`
            }
          >
            <LuWallet size={18} />
            Budgets
          </NavLink>
        </nav>
      </aside>

      {/* ================= Main Content ================= */}
      <main className="lg:ml-60 w-full h-[calc(100vh-4rem)] overflow-y-auto p-3 lg:p-6 bg-slate-50">
        <Outlet />
      </main>
    </div>
  );
};

export default Home;
