import leftCover from "../assets/herocover.webp";

const Landing = () => {
  return (
    <div>
      {/*=============== HERO SECTION ===============*/}
      <section
        id="hero"
        className="min-h-[90vh] flex items-center py-12"
        style={{
          backgroundColor: "var(--bg-base)",
          fontFamily: "var(--font-body)",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10 grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
          {/* LEFT */}
          <div className="space-y-6 text-center md:text-left">
            {/* small badge */}
            <div className="inline-block px-3 py-2 rounded-full text-xs font-medium bg-white shadow-sm">
              💰 Smart Personal Finance
            </div>

            {/* heading */}
            <h1
              className="text-4xl md:text-5xl lg:text-6xl leading-tight"
              style={{
                fontFamily: "var(--font-heading)",
                color: "var(--base-color)",
              }}
            >
              Manage Your
              <span className="text-amber-500"> Money </span>
              <br />
              Without Stress
            </h1>

            {/* description */}
            <p className="text-lg font-light text-slate-500 max-w-xl mx-auto md:mx-0">
              Track expenses, manage budgets, and control your finances
              effortlessly with{" "}
              <strong className="text-amber-500 font-medium">SplitEase</strong>.
              Everything you need to manage money in one simple dashboard.
            </p>

            {/* buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-2">
              <button
                className="cursor-pointer px-7 py-3 rounded-lg text-white font-medium shadow-md hover:-translate-y-0.5 transition"
                style={{
                  backgroundColor: "var(--base-color)",
                  fontFamily: "var(--font-highlight)",
                }}
              >
                Get Started Free
              </button>

              <button
                className="cursor-pointer px-7 py-3 rounded-lg border hover:bg-white transition"
                style={{
                  borderColor: "var(--base-color)",
                  color: "var(--base-color)",
                  fontFamily: "var(--font-highlight)",
                }}
              >
                Learn More
              </button>
            </div>

            {/* trust text */}
            <p className="text-xs text-slate-500 pt-2">
              Free to start
              <span className="text-slate-500 mx-2">•</span>
              No credit card required
              <span className="text-slate-500 mx-2">•</span>
              Cancel anytime
            </p>
          </div>

          {/* RIGHT */}
          <div className="hidden md:flex justify-center md:justify-end relative">
            {/* glow background */}
            <div className="absolute w-72 h-72 bg-green-200 rounded-full blur-3xl opacity-40"></div>

            <img
              src={leftCover}
              alt="Finance dashboard preview"
              className="relative w-full max-w-md md:max-w-lg object-contain drop-shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/*=============== PRODUCT SECTION ===============*/}
      <section
        className="py-20 px-6 lg:px-10"
        style={{ backgroundColor: "var(--bg-soft)" }}
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
              Our Products
            </h2>
            <p className="text-slate-500 mt-3 max-w-xl mx-auto">
              Powerful tools designed to help you manage money smarter, track
              spending, and achieve financial clarity.
            </p>
          </div>

          {/* product cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* card 1 */}
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition group">
              <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-amber-100 mb-4 text-xl">
                💳
              </div>

              <h3 className="text-lg font-semibold text-slate-700 mb-2">
                Expense Tracking
              </h3>

              <p className="text-slate-500 text-sm leading-relaxed">
                Track daily expenses easily and understand where your money goes
                with simple insights and clear breakdowns.
              </p>
            </div>

            {/* card 2 */}
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition group">
              <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-green-100 mb-4 text-xl">
                📊
              </div>

              <h3 className="text-lg font-semibold text-slate-700 mb-2">
                Smart Budgeting
              </h3>

              <p className="text-slate-500 text-sm leading-relaxed">
                Create monthly budgets and monitor spending in real-time to stay
                within your financial limits.
              </p>
            </div>

            {/* card 3 */}
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition group">
              <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-blue-100 mb-4 text-xl">
                🤝
              </div>

              <h3 className="text-lg font-semibold text-slate-700 mb-2">
                Group Expense Split
              </h3>

              <p className="text-slate-500 text-sm leading-relaxed">
                Easily split bills with friends or roommates and keep track of
                who owes what without confusion.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/*=============== USER FEEDBACK SECTION ===============*/}
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
              What Our Users Say
            </h2>
            <p className="text-slate-500 mt-3 max-w-xl mx-auto">
              Thousands of users manage their finances better with SplitEase.
            </p>
          </div>

          {/* testimonials */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* review 1 */}
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition">
              <p className="text-slate-500 text-sm leading-relaxed">
                “SplitEase helped me understand my spending habits. Now I manage
                my monthly budget much better.”
              </p>

              <div className="mt-4">
                <p className="font-semibold text-slate-700">Amit Sharma</p>
                <p className="text-xs text-slate-400">College Student</p>
              </div>
            </div>

            {/* review 2 */}
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition">
              <p className="text-slate-500 text-sm leading-relaxed">
                “The group expense feature is amazing. Splitting bills with
                friends has never been this easy.”
              </p>

              <div className="mt-4">
                <p className="font-semibold text-slate-700">Riya Gupta</p>
                <p className="text-xs text-slate-400">Working Professional</p>
              </div>
            </div>

            {/* review 3 */}
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition">
              <p className="text-slate-500 text-sm leading-relaxed">
                “Clean dashboard, simple design, and powerful insights. Exactly
                what I needed for personal finance.”
              </p>

              <div className="mt-4">
                <p className="font-semibold text-slate-700">Rahul Verma</p>
                <p className="text-xs text-slate-400">Freelancer</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/*=============== CALL TO ACTION SECTION ===============*/}
      <section
        className="py-20 px-6 lg:px-10"
        style={{ backgroundColor: "var(--bg-soft)" }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2
            className="text-3xl md:text-4xl font-semibold"
            style={{
              fontFamily: "var(--font-heading)",
              color: "var(--base-color)",
            }}
          >
            Start Managing Your Money Today
          </h2>

          <p className="text-slate-500 mt-4 max-w-xl mx-auto">
            Join thousands of users who already track their finances smarter
            with SplitEase.
          </p>

          {/* button */}
          <div className="mt-8">
            <button
              className="cursor-pointer px-8 py-3 rounded-lg text-white font-medium shadow-md hover:-translate-y-0.5 transition"
              style={{
                backgroundColor: "var(--base-color)",
                fontFamily: "var(--font-highlight)",
              }}
            >
              Create Free Account
            </button>
          </div>

          <p className="text-xs text-slate-400 mt-3">
            No credit card required • Free forever plan
          </p>
        </div>
      </section>
    </div>
  );
};

export default Landing;
