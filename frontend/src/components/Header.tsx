import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, NavLink } from "react-router-dom";
import { FiBell, FiMenu, FiPieChart, FiUsers, FiX } from "react-icons/fi";
import { LuCircleUserRound, LuUser } from "react-icons/lu";

const Header = () => {
  const { user } = useAuth();

  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 bg-green-700 border-b border-green-600 px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <NavLink to="/">
          <h1 className="text-2xl font-bold text-white tracking-wide">
            Split<span className="text-amber-300">Ease</span>
          </h1>
        </NavLink>

        {/* Desktop Nav */}
        {!user && (
          <nav className="hidden md:flex items-center gap-10">
            {/* Home */}
            <Link
              to="/"
              className="text-green-100 hover:text-white hover:-translate-y-0.5 transition-all duration-200"
            >
              Home
            </Link>

            {/* Features Dropdown */}
            <div className="relative group">
              <button className="text-green-100 hover:text-white hover:-translate-y-0.5 transition-all duration-200">
                Features
              </button>

              <div className="absolute top-8 -left-16 hidden group-hover:block w-72 bg-green-50 rounded-xl shadow-xl p-3 z-50">
                {/* Dashboard */}
                <Link
                  to="/home/dashboard"
                  className="flex items-start gap-3 p-2 rounded-lg hover:bg-green-100 transition"
                >
                  <div className="bg-green-200 text-green-700 p-2 rounded-lg">
                    <FiPieChart size={18} />
                  </div>

                  <div>
                    <p className="text-slate-800 font-medium">Dashboard</p>

                    <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                      Track expenses and financial overview.
                    </p>
                  </div>
                </Link>

                {/* Transactions */}
                <Link
                  to="/home/transactions"
                  className="flex items-start gap-3 p-2 rounded-lg hover:bg-green-100 transition"
                >
                  <div className="bg-green-200 text-green-700 p-2 rounded-lg">
                    <FiBell size={18} />
                  </div>

                  <div>
                    <p className="text-slate-800 font-medium">Transactions</p>

                    <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                      View and manage all your records.
                    </p>
                  </div>
                </Link>

                {/* Budgets */}
                <Link
                  to="/home/budget"
                  className="flex items-start gap-3 p-2 rounded-lg hover:bg-green-100 transition"
                >
                  <div className="bg-green-200 text-green-700 p-2 rounded-lg">
                    <FiMenu size={18} />
                  </div>

                  <div>
                    <p className="text-slate-800 font-medium">Budgets</p>

                    <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                      Set spending limits and savings goals.
                    </p>
                  </div>
                </Link>

                {/* Split */}
                <Link
                  to="/home/split"
                  className="flex items-start gap-3 p-2 rounded-lg hover:bg-green-100 transition"
                >
                  <div className="bg-green-200 text-green-700 p-2 rounded-lg">
                    <FiUsers size={18} />
                  </div>

                  <div>
                    <p className="text-slate-800 font-medium">Split</p>

                    <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                      Split bills easily with friends and family.
                    </p>
                  </div>
                </Link>
              </div>
            </div>

            {/* Solutions Dropdown */}
            <div className="relative group">
              <button className="text-green-100 hover:text-white hover:-translate-y-0.5 transition-all duration-200">
                Solutions
              </button>

              <div className="absolute top-8 -left-28 hidden group-hover:block w-80 bg-green-50 rounded-xl shadow-xl p-4 z-50">
                {/* Personal Finance */}
                <div className="flex items-start gap-4 p-3 rounded-lg hover:bg-green-100 transition cursor-pointer">
                  <div className="bg-green-200 text-green-700 p-3 rounded-lg">
                    <FiPieChart size={22} />
                  </div>

                  <div>
                    <p className="text-slate-800 font-semibold">
                      Personal Finance
                    </p>

                    <p className="text-sm text-slate-500 mt-1 leading-relaxed">
                      Manage your money, track expenses and achieve goals.
                    </p>
                  </div>
                </div>

                {/* Split Bills */}
                <div className="flex items-start gap-4 p-3 rounded-lg hover:bg-green-100 transition cursor-pointer mt-2">
                  <div className="bg-green-200 text-green-700 p-3 rounded-lg">
                    <FiUsers size={22} />
                  </div>

                  <div>
                    <p className="text-slate-800 font-semibold">Split Bills</p>

                    <p className="text-sm text-slate-500 mt-1 leading-relaxed">
                      Split bills among friends and family easily.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Pricing Dropdown */}
            <div className="relative group">
              <button className="text-green-100 hover:text-white hover:-translate-y-0.5 transition-all duration-200">
                Pricing
              </button>

              <div className="absolute top-8 -left-28 hidden group-hover:block w-max bg-green-50 rounded-xl shadow-xl px-5 py-4 z-50">
                <p className="text-slate-800 font-medium">
                  Basic Plan - $0/month
                </p>

                <p className="text-sm text-slate-500 mt-1">
                  start your personal expense tracking journey
                </p>
              </div>
            </div>

            {/* About */}
            <Link
              to="/about"
              className="text-green-100 hover:text-white hover:-translate-y-0.5 transition-all duration-200"
            >
              About
            </Link>
          </nav>
        )}

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {user ? (
            <>
              {/* Notification */}
              {/* <button className="relative text-white hover:text-amber-200 transition">
                <FiBell size={20} />

                <span className="absolute -top-1 -right-1 h-2.5 w-2.5 bg-amber-300 rounded-full"></span>
              </button> */}

              {/* Username */}
              <button className="hidden sm:flex items-center gap-2 text-sm text-white hover:text-amber-200 transition tracking-wider capitalize">
                <LuUser size={16} />

                <span>{user?.fullname?.split(" ")[0] || "User"}</span>
              </button>
            </>
          ) : (
            <NavLink
              to="/login"
              className="hidden sm:block text-sm text-white hover:text-amber-200 transition tracking-wider border border-green-200 hover:border-amber-200 rounded-xl px-4 py-1.5"
            >
              Login
            </NavLink>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setOpen(true)}
            className="md:hidden text-white"
          >
            <FiMenu size={24} />
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      {open && (
        <div
          className="fixed inset-0 z-100 md:hidden"
          style={{
            backgroundColor: "var(--base-color)",
          }}
        >
          {/* Top */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-green-600">
            <h2 className="text-xl font-semibold text-white">Menu</h2>

            <button onClick={() => setOpen(false)} className="text-white">
              <FiX size={26} />
            </button>
          </div>

          {/* Mobile Links */}
          {/* Mobile Links */}
          <nav className="flex flex-col p-6 gap-2 text-base">
            {user ? (
              <>
                {/* User Info */}
                <div className="flex items-center gap-3 border-b border-green-600 pb-5 mb-3">
                  <div className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center">
                    <LuCircleUserRound size={24} className="text-white" />
                  </div>

                  <div>
                    <p className="text-white font-medium capitalize">
                      {user?.fullname?.split(" ")[0] || "User"}
                    </p>

                    <p className="text-green-100 text-xs">
                      Manage your finances smarter
                    </p>
                  </div>
                </div>

                {/* Dashboard */}
                <NavLink
                  to="/home/dashboard"
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `px-4 py-3 rounded-lg transition ${
                      isActive
                        ? "bg-white text-green-700 font-medium"
                        : "text-white hover:bg-white/10"
                    }`
                  }
                >
                  Dashboard
                </NavLink>

                {/* Transactions */}
                <NavLink
                  to="/home/transactions"
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `px-4 py-3 rounded-lg transition ${
                      isActive
                        ? "bg-white text-green-700 font-medium"
                        : "text-white hover:bg-white/10"
                    }`
                  }
                >
                  Transactions
                </NavLink>

                {/* Budget */}
                <NavLink
                  to="/home/budget"
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `px-4 py-3 rounded-lg transition ${
                      isActive
                        ? "bg-white text-green-700 font-medium"
                        : "text-white hover:bg-white/10"
                    }`
                  }
                >
                  Budgets
                </NavLink>

                {/* Split */}
                <NavLink
                  to="/home/split"
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `px-4 py-3 rounded-lg transition ${
                      isActive
                        ? "bg-white text-green-700 font-medium"
                        : "text-white hover:bg-white/10"
                    }`
                  }
                >
                  Split Expenses
                </NavLink>

                {/* Logout */}
                <NavLink
                  to="/logout"
                  onClick={() => setOpen(false)}
                  className="mt-3 px-4 py-3 rounded-lg bg-white text-green-700 font-medium hover:bg-amber-100 transition"
                >
                  Logout
                </NavLink>
              </>
            ) : (
              <>
                {/* Home */}
                <NavLink
                  to="/"
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `px-4 py-3 rounded-lg transition ${
                      isActive
                        ? "bg-white text-green-700 font-medium"
                        : "text-white hover:bg-white/10"
                    }`
                  }
                >
                  Home
                </NavLink>

                {/* About */}
                <NavLink
                  to="/about"
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `px-4 py-3 rounded-lg transition ${
                      isActive
                        ? "bg-white text-green-700 font-medium"
                        : "text-white hover:bg-white/10"
                    }`
                  }
                >
                  About
                </NavLink>

                {/* Login */}
                <NavLink
                  to="/login"
                  onClick={() => setOpen(false)}
                  className="mt-3 px-4 py-3 rounded-lg bg-white text-green-700 font-medium hover:bg-amber-100 transition"
                >
                  Login
                </NavLink>
              </>
            )}
          </nav>
        </div>
      )}
    </>
  );
};

export default Header;
