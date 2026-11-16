
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import BrandLogo from "./BrandLogo";
import ThemeToggle from "./ThemeToggle";

const AccountNavbar = () => {
  return (
    <header className="relative z-50 w-full px-3 pt-3 sm:px-6 lg:px-10">
      <nav
        className="
          mx-auto flex w-full max-w-[1450px]
          items-center justify-between gap-2
          rounded-full border border-white/70
          bg-white/65 px-3 py-3
          shadow-[0_8px_30px_rgba(15,23,42,0.04)]
          backdrop-blur-xl transition-colors duration-300
          dark:border-slate-700/70 dark:bg-slate-900/65
          sm:gap-4 sm:px-6 lg:px-7
        "
      >
        {/* Logo */}
        <BrandLogo variant="account" />

        {/* Right Actions */}
        <div className="ml-auto flex shrink-0 items-center gap-2 sm:gap-4">

          <ThemeToggle size={19} />

          {/* Back to Home */}
          <Link
            to="/"
            aria-label="Back to Home"
            className="
              flex shrink-0 items-center justify-center
              gap-1.5 whitespace-nowrap rounded-full
              px-2 py-2 text-xs font-semibold
              text-slate-600 transition-all duration-200
              hover:bg-purple-100 hover:text-purple-700
              dark:text-slate-300 dark:hover:bg-slate-800
              dark:hover:text-purple-300
              sm:gap-2 sm:px-3 sm:text-sm lg:px-5
            "
          >
            <ArrowLeft size={17} />

            <span className="hidden min-[360px]:inline">
              Back to Home
            </span>
          </Link>

        </div>
      </nav>
    </header>
  );
};

export default AccountNavbar;
