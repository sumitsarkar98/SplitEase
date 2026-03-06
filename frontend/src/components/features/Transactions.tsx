import AddBtn from "../ui/buttons/AddBtn";
import LineCharts from "../ui/charts/LineCharts";
import TransactionTableDetails from "../ui/tables/TransactionTableDetails";

const Expenses = () => {
  return (
    <div className="p-2 md:p-4 lg:p-8 space-y-5 bg-light min-h-screen">
      {/* ================= PAGE DETAILS SECTION ================= */}
      <section className="flex items-start md:items-center md:justify-between">
        {/* page-info */}
        <div>
          <h1 className="text-2xl lg:text-3xl font-semibold text-slate-700 md:mb-2">
            Transactions
          </h1>
          <p className="text-xs lg:text-base text-slate-400">
            Transactions Track and manage all your financial activities
          </p>
        </div>

        {/* cta-btn */}
        <div className="flex justify-end bg-red">
          <AddBtn name="Add Transaction" />
        </div>
      </section>

      {/* ================= transaction SECTION ================= */}
      <section className="space-y-1 lg:space-y-2">
        <TransactionTableDetails />
      </section>

      {/* ================= INCOME vs EXPENSE TREND SECTION ================= */}
      <section className="space-y-1 lg:space-y-2">
        <LineCharts />
      </section>

      {/* ================= EXPENSES SECTION ================= */}
      <section className="space-y-1 lg:space-y-2"></section>
    </div>
  );
};

export default Expenses;
