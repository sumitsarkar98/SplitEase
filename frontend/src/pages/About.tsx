import { NavLink } from "react-router-dom";

const About = () => {
  return (
    <div>
      {/*=============== HERO SECTION ===============*/}
      {/*=============== OUR STORY ===============*/}
      <section
        className="py-20 px-6 lg:px-10"
        style={{ backgroundColor: "var(--bg-soft)" }}
      >
        <div className="max-w-5xl mx-auto text-center">
          <h2
            className="text-3xl md:text-4xl font-semibold"
            style={{
              fontFamily: "var(--font-heading)",
              color: "var(--base-color)",
            }}
          >
            Our Story
          </h2>

          <p className="text-slate-500 mt-6 leading-relaxed text-lg font-light">
            Managing money should not feel complicated. SplitEase started with a
            simple goal — to create a modern finance platform that helps people
            track expenses, create budgets, and split group expenses without
            confusion.
          </p>

          <p className="text-slate-500 mt-5 leading-relaxed text-lg font-light">
            Whether you are a student, working professional, or managing shared
            expenses with friends, SplitEase helps you stay financially
            organized with minimal effort.
          </p>
        </div>
      </section>
      {/*=============== WHY CHOOSE US ===============*/}
      <section
        className="py-20 px-6 lg:px-10"
        style={{ backgroundColor: "var(--bg-base)" }}
      >
        <div className="max-w-7xl mx-auto">
          {/* heading */}
          <div className="text-center mb-14">
            <h2
              className="text-3xl md:text-4xl font-semibold"
              style={{
                fontFamily: "var(--font-heading)",
                color: "var(--base-color)",
              }}
            >
              Why Choose SplitEase
            </h2>

            <p className="text-slate-500 mt-3 max-w-2xl mx-auto">
              Designed with simplicity, performance, and real-life money
              management needs in mind.
            </p>
          </div>

          {/* cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* card */}
            <div className="bg-white p-7 rounded-xl shadow-sm hover:shadow-lg transition">
              <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-green-100 text-2xl mb-5">
                ⚡
              </div>

              <h3 className="text-xl font-semibold text-slate-700 mb-3">
                Simple Experience
              </h3>

              <p className="text-slate-500 text-sm leading-relaxed">
                Clean dashboard and intuitive tools that make finance management
                easy for everyone.
              </p>
            </div>

            {/* card */}
            <div className="bg-white p-7 rounded-xl shadow-sm hover:shadow-lg transition">
              <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-amber-100 text-2xl mb-5">
                📈
              </div>

              <h3 className="text-xl font-semibold text-slate-700 mb-3">
                Smart Insights
              </h3>

              <p className="text-slate-500 text-sm leading-relaxed">
                Understand your spending patterns with visual reports and
                meaningful financial insights.
              </p>
            </div>

            {/* card */}
            <div className="bg-white p-7 rounded-xl shadow-sm hover:shadow-lg transition">
              <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-blue-100 text-2xl mb-5">
                🤝
              </div>

              <h3 className="text-xl font-semibold text-slate-700 mb-3">
                Group Expense Split
              </h3>

              <p className="text-slate-500 text-sm leading-relaxed">
                Easily split bills and shared expenses with friends, roommates,
                or travel groups.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/*=============== STATS SECTION ===============*/}
      <section
        className="py-20 px-6 lg:px-10"
        style={{ backgroundColor: "var(--bg-soft)" }}
      >
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <h3 className="text-4xl font-bold text-green-700">10K+</h3>
            <p className="text-slate-500 mt-2">Active Users</p>
          </div>

          <div>
            <h3 className="text-4xl font-bold text-green-700">50K+</h3>
            <p className="text-slate-500 mt-2">Transactions Tracked</p>
          </div>

          <div>
            <h3 className="text-4xl font-bold text-green-700">99%</h3>
            <p className="text-slate-500 mt-2">User Satisfaction</p>
          </div>

          <div>
            <h3 className="text-4xl font-bold text-green-700">24/7</h3>
            <p className="text-slate-500 mt-2">Support</p>
          </div>
        </div>
      </section>
      {/*=============== CTA SECTION ===============*/}
      <section
        className="py-20 px-6 lg:px-10"
        style={{ backgroundColor: "var(--bg-base)" }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2
            className="text-3xl md:text-4xl font-semibold"
            style={{
              fontFamily: "var(--font-heading)",
              color: "var(--base-color)",
            }}
          >
            Ready to Take Control of Your Finances?
          </h2>

          <p className="text-slate-500 mt-4 max-w-2xl mx-auto font-light">
            Start tracking expenses, managing budgets, and splitting bills
            smarter with SplitEase.
          </p>

          <div className="mt-8">
            <NavLink
              to="/register"
              className="cursor-pointer px-8 py-3 rounded-lg text-white font-medium shadow-md hover:-translate-y-0.5 transition hover:shadow-lg"
              style={{
                backgroundColor: "var(--base-color)",
                fontFamily: "var(--font-highlight)",
              }}
            >
              Create Free Account
            </NavLink>
          </div>

          <p className="text-xs text-slate-400 mt-5">
            Free to start • No hidden fees • Cancel anytime
          </p>
        </div>
      </section>
    </div>
  );
};

export default About;
