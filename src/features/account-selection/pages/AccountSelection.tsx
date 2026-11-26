import { Link } from "react-router-dom";

import Customer from "../components/Customer";
import Shop from "../components/Shop";

const AccountSelection = () => {
  return (
    <section
      aria-labelledby="account-selection-heading"
      className="relative flex min-h-0 w-full flex-1 flex-col justify-center overflow-x-clip px-4 py-6 sm:px-6 lg:px-12 lg:py-4"
    >
      <div className="mx-auto w-full max-w-[1190px]">
        <div className="mb-3 flex justify-center">
          <div className="group relative">
            <span className="relative inline-flex cursor-default items-center gap-2 rounded-full border border-purple-200/80 bg-gradient-to-r from-white via-[#faf5ff] to-purple-50/90 px-5 py-1.5 text-xs font-bold text-slate-900 shadow-[0_4px_16px_rgba(147,51,234,0.10)] transition-all duration-300 hover:-translate-y-0.5 hover:border-purple-300 hover:shadow-[0_8px_25px_rgba(147,51,234,0.20)] dark:border-purple-500/30 dark:from-slate-900 dark:via-purple-950/50 dark:to-slate-900 dark:text-white sm:text-sm">
              <span
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110"
              >
                👋
              </span>
              Welcome to{" "}
              <span className="bg-gradient-to-r from-purple-600 to-violet-700 bg-clip-text text-transparent dark:from-purple-400 dark:to-violet-300">
                EasyPrint
              </span>
            </span>
          </div>
        </div>

        <div className="mb-6 text-center sm:mb-7">
          <h1
            id="account-selection-heading"
            className="text-2xl font-extrabold leading-tight tracking-tight text-slate-950 dark:text-white sm:text-3xl lg:text-[40px]"
          >
            How would you like to use{" "}
            <span className="bg-gradient-to-r from-purple-600 via-violet-600 to-purple-800 bg-clip-text italic text-transparent dark:from-purple-400 dark:via-violet-400 dark:to-purple-300">
              EasyPrint
            </span>
            ?
          </h1>

          <p className="mt-2 text-sm font-medium text-slate-600 dark:text-slate-300 sm:text-lg lg:text-xl">
            Choose your account type to continue
          </p>
        </div>

        <div className="grid grid-cols-1 items-stretch gap-5 md:grid-cols-2 lg:gap-8">
          <Customer />
          <Shop />
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm font-medium text-slate-600 dark:text-slate-300 sm:text-base">
            Already have an account?{" "}
            <Link
              to="/auth/login"
              className="font-bold text-purple-700 underline decoration-2 underline-offset-4 transition hover:text-purple-900 dark:text-purple-400 dark:hover:text-purple-300"
            >
              Login here
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default AccountSelection;
