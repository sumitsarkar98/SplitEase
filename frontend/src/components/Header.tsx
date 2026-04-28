import { FiBell, FiMenu, FiX } from "react-icons/fi";

import { Link, NavLink } from "react-router-dom";
import { useState } from "react";

const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 bg-white border-b border-slate-200 px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <h1 className="text-xl font-semibold text-white tracking-tight">
          <NavLink to="/">
            Split<span className="text-amber-300">Ease</span>
          </NavLink>
        </h1>

        {/* Middle Section */}
        <nav className="hidden md:flex items-center gap-10">
          <Link
            to="#"
            className="nav-link text-green-200 hover:text-white hover:-translate-y-0.5 transition-all duration-200 ease-out"
          >
            Product
          </Link>
          <Link
            to="#"
            className="nav-link text-green-200 hover:text-white hover:-translate-y-0.5 transition-all duration-200 ease-out"
          >
            Features
          </Link>
          <Link
            to="#"
            className="nav-link text-green-200 hover:text-white hover:-translate-y-0.5 transition-all duration-200 ease-out"
          >
            Resources
          </Link>
          <Link
            to="#"
            className="nav-link text-green-200 hover:text-white hover:-translate-y-0.5 transition-all duration-200 ease-out"
          >
            Pricing
          </Link>
        </nav>
        {/* Right Section */}
        <div className="flex items-center gap-5">
          {/* Notification */}
          <button className="relative text-white hover:text-primary-600 transition">
            <FiBell size={20} />
            <span className="absolute -top-1 -right-1 h-2 w-2 bg-amber-200 rounded-full"></span>
          </button>

          {/* Username */}
          <NavLink
            to="/home/dashboard"
            className="hidden sm:block text-sm text-white hover:text-amber-200 transition"
          >
            Sumit
          </NavLink>

          {/* Mobile Menu Button (RIGHT SIDE) */}
          <button
            onClick={() => setOpen(true)}
            className="lg:hidden text-slate-700"
          >
            <FiMenu size={24} />
          </button>
        </div>
      </header>

      {/* FULL SCREEN MOBILE MENU */}
      {open && (
        <div className="fixed inset-0 z-50 bg-[#148c68] lg:hidden">
          {/* Top Bar */}
          <div className="flex justify-end items-center p-6 text-white">
            <button onClick={() => setOpen(false)}>
              <FiX size={24} />
            </button>
          </div>

          {/* Menu Links */}
          <nav className="flex flex-col gap-6 p-6 text-lg font-light">
            <NavLink
              to="/home/dashboard"
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                isActive ? "text-amber-200" : "text-white"
              }
            >
              Dashboard
            </NavLink>

            <NavLink
              to="/home/transactions"
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                isActive ? "text-amber-200" : "text-white"
              }
            >
              Transactions
            </NavLink>

            <NavLink
              to="/home/budget"
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                isActive ? "text-amber-200" : "text-white"
              }
            >
              Budgets
            </NavLink>

            <NavLink
              to="/home/split"
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                isActive ? "text-amber-200" : "text-white"
              }
            >
              Split
            </NavLink>
          </nav>
        </div>
      )}
    </>
  );
};

export default Header;
