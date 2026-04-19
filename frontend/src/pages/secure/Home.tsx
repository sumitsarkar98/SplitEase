import { NavLink, Outlet } from "react-router-dom";
import { LuLayoutDashboard, LuArrowLeftRight, LuWallet } from "react-icons/lu";
import { FiLogOut } from "react-icons/fi";
import { IoIosSettings } from "react-icons/io";
import CategoryTable from "../../components/ui/tables/CategoryTable";
import { MdOutlineHistory } from "react-icons/md";
import { PiInfo } from "react-icons/pi";
import { CgInsights } from "react-icons/cg";
import { FaMoneyBillTransfer } from "react-icons/fa6";

const Home = () => {
  return (
    <div className="flex h-screen px-1">
      {/* ================= Left Sidebar ================= */}
      <aside className="hidden md:flex w-52 bg-white border-r border-slate-200 p-4 pb-20 flex-col justify-between">
        {/* ===== TOP ===== */}
        <div>
          <span className="text-xs uppercase text-slate-400 ">main menu</span>

          <nav className="flex flex-col gap-1 mt-4">
            <NavLink
              to="/home/dashboard"
              className={({ isActive }) =>
                `flex items-center gap-2 p-2 rounded-lg transition ${
                  isActive
                    ? "bg-green-50 text-green-600 font-medium"
                    : "text-slate-600 hover:bg-slate-100"
                }`
              }
            >
              <LuLayoutDashboard /> Dashboard
            </NavLink>

            <NavLink
              to="/home/transactions"
              className={({ isActive }) =>
                `flex items-center gap-2 p-2 rounded-lg transition ${
                  isActive
                    ? "bg-green-50 text-green-600 font-medium"
                    : "text-slate-600 hover:bg-slate-100"
                }`
              }
            >
              <LuArrowLeftRight /> Transactions
            </NavLink>

            <NavLink
              to="/home/budget"
              className={({ isActive }) =>
                `flex items-center gap-2 p-2 rounded-lg transition ${
                  isActive
                    ? "bg-green-50 text-green-600 font-medium"
                    : "text-slate-600 hover:bg-slate-100"
                }`
              }
            >
              <LuWallet /> Budget
            </NavLink>

            <NavLink
              to="#"
              className={({ isActive }) =>
                `flex items-center gap-2 p-2 rounded-lg transition ${
                  isActive
                    ? "bg-green-50 text-green-600 font-medium"
                    : "text-slate-600 hover:bg-slate-100"
                }`
              }
            >
              <FaMoneyBillTransfer />
              Split
            </NavLink>
          </nav>
        </div>

        {/* ===== BOTTOM ===== */}
        <div>
          <span className="text-xs uppercase text-slate-400 mb-6">account</span>

          <nav className="flex flex-col gap-1">
            <NavLink
              to="/home/settings"
              className={({ isActive }) =>
                `flex items-center gap-2 p-2 rounded-lg transition ${
                  isActive
                    ? "bg-green-50 text-green-600 font-medium"
                    : "text-slate-600 hover:bg-slate-100"
                }`
              }
            >
              <IoIosSettings />
              Settings
            </NavLink>

            <button
              onClick={() => alert("Logout logic here")}
              className="flex items-center gap-2 p-2 rounded-lg text-red-500 hover:bg-red-50 transition"
            >
              <FiLogOut /> Logout
            </button>
          </nav>
        </div>
      </aside>

      {/* ================= Main Content ================= */}
      <main className="flex-1 bg-slate-50 p-2 md:p-4 overflow-y-auto">
        <Outlet />
      </main>

      {/* ================= Right Sidebar (Optional) ================= */}
      <aside className="hidden overflow-y-auto bg-slate-50 lg:flex gap-4 w-80 border border-slate-200 p-2 flex-col pt-6">
        <section className="bg-white border-slate-200 rounded-xl shadow-sm hover:shadow-md transition p-2">
          {/* header */}
          <div className="p-2 mt-2 flex flex-col gap-1">
            <div className="flex items-center justify-start gap-1 text-green-600">
              <MdOutlineHistory size={20} />
              <h1 className="text-base font-semibold capitalize">
                transactions overview
              </h1>
            </div>

            <span className="text-xs py-1 px-2 flex items-center gap-2 rounded-md text-slate-700 bg-slate-50 w-fit">
              <PiInfo className="shrink-0 text-green-500" />
              Transaction stacked by this month
            </span>
          </div>
          <div>
            <CategoryTable />
          </div>
        </section>
        <section className="bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition p-3">
          {/* Header */}
          <div className="flex items-center gap-2 text-green-600 mb-3">
            <CgInsights size={18} />

            <h1 className="text-base font-semibold capitalize">Insights</h1>
          </div>

          {/* Content */}
          <div className="flex flex-col gap-3 text-sm">
            {/* Insight 1 */}
            <div className="flex items-start gap-2 p-2 rounded-md bg-slate-50">
              <PiInfo className="mt-0.5 text-green-600 shrink-0" />
              <p className="text-slate-600">
                You spent{" "}
                <span className="font-medium text-slate-800">₹6,000</span> on{" "}
                <span className="font-medium text-slate-800">Shopping</span> —
                highest this month.
              </p>
            </div>

            {/* Insight 2 */}
            <div className="flex items-start gap-2 p-2 rounded-md bg-slate-50">
              <PiInfo className="mt-0.5 text-green-600 shrink-0" />
              <p className="text-slate-600">
                Your expenses increased by{" "}
                <span className="font-medium text-red-500">12%</span> compared
                to last month.
              </p>
            </div>

            {/* Insight 3 */}
            <div className="flex items-start gap-2 p-2 rounded-md bg-slate-50">
              <PiInfo className="mt-0.5 text-green-600 shrink-0" />
              <p className="text-slate-600">
                You have used{" "}
                <span className="font-medium text-slate-800">70%</span> of your
                monthly budget.
              </p>
            </div>
          </div>
        </section>
      </aside>
    </div>
  );
};

export default Home;
