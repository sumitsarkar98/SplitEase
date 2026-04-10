import { Link } from "react-router-dom";

const Footer = () => {
  const linkStyle =
    "text-sm transition-colors duration-200 hover:text-amber-200";

  return (
    <footer  style={{ background: "var(--base-color)" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10">
        {/* Top */}
        <div className="flex flex-col md:flex-row justify-between gap-12">
          {/* Brand */}
          <div>
            <h2
              className="text-xl font-semibold tracking-tight"
              style={{ color: "var(--bg-white)" }}
            >
              Split<span className="text-amber-300">Ease</span>
            </h2>

            <p
              className="text-sm mt-3 max-w-xs leading-relaxed"
              style={{ color: "var(--bg-base)" }}
            >
              Smart expense tracking and group bill splitting made simple.
            </p>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-10">
            {/* Product */}
            <div className="flex flex-col gap-3">
              <p
                className="text-sm font-semibold"
                style={{ color: "var(--bg-white)" }}
              >
                Product
              </p>

              <Link
                to="/home/dashboard"
                className={linkStyle}
                style={{ color: "var(--bg-base)" }}
              >
                Dashboard
              </Link>

              <Link
                to="/home/transactions"
                className={linkStyle}
                style={{ color: "var(--bg-base)" }}
              >
                Transactions
              </Link>

              <Link
                to="/home/budgets"
                className={linkStyle}
                style={{ color: "var(--bg-base)" }}
              >
                Budgets
              </Link>
            </div>

            {/* Company */}
            <div className="flex flex-col gap-3">
              <p
                className="text-sm font-semibold"
                style={{ color: "var(--bg-white)" }}
              >
                Company
              </p>

              <Link
                to="/about"
                className={linkStyle}
                style={{ color: "var(--bg-base)" }}
              >
                About
              </Link>

              <Link
                to="/contact"
                className={linkStyle}
                style={{ color: "var(--bg-base)" }}
              >
                Contact
              </Link>
            </div>

            {/* Legal */}
            <div className="flex flex-col gap-3">
              <p
                className="text-sm font-semibold"
                style={{ color: "var(--bg-white)" }}
              >
                Legal
              </p>

              <Link
                to="/privacy"
                className={linkStyle}
                style={{ color: "var(--bg-base)" }}
              >
                Privacy
              </Link>

              <Link
                to="/terms"
                className={linkStyle}
                style={{ color: "var(--bg-base)" }}
              >
                Terms
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div
          className="border-t mt-10 pt-4 text-center text-sm"
          style={{
            borderColor: "var(--dark-base-color)",
            color: "var(--bg-base)",
          }}
        >
          © {new Date().getFullYear()} SplitEase. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
