
import { Hand } from "lucide-react";

const DashboardWelcome = () => {
  return (
    <section
      className="
        group relative isolate mb-5 flex min-h-[140px]
        items-center overflow-hidden rounded-2xl
        border border-purple-100
        bg-gradient-to-r from-[#d9baff] via-[#e9d8ff] to-[#f4edff]
        px-6 py-5 shadow-sm
        dark:border-purple-900/50
        dark:bg-gradient-to-r dark:from-[#26065c]
        dark:via-[#180b38] dark:to-[#100b27]
        sm:px-10
      "
    >
      {/* Background Decorative Effects */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">

        {/* Light mode waves */}
        <div className="absolute -right-10 -top-24 h-64 w-[45%] rotate-[-12deg] rounded-[45%] bg-white/25 blur-sm dark:hidden" />

        <div className="absolute -bottom-28 left-[38%] h-52 w-72 rounded-full bg-purple-300/30 blur-3xl dark:hidden" />

        <div className="absolute -right-20 top-[-100px] h-72 w-72 rounded-full bg-purple-200/40 blur-3xl dark:hidden" />

        {/* Dark mode effects */}
        <div className="absolute -right-16 -top-32 hidden h-80 w-[48%] rotate-[-12deg] rounded-[45%] bg-purple-800/30 blur-2xl dark:block" />

        <div className="absolute -bottom-28 left-[35%] hidden h-64 w-80 rounded-full bg-purple-700/25 blur-3xl dark:block" />

        <div className="absolute -right-16 bottom-[-130px] hidden h-72 w-72 rounded-full bg-violet-700/25 blur-3xl dark:block" />

        {/* Wave shape */}
        <svg
          className="absolute bottom-0 left-0 h-full w-full opacity-30 dark:opacity-20"
          viewBox="0 0 1200 180"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M0 150 C150 40 230 190 400 115 S650 30 800 120 S1050 190 1200 55 L1200 180 L0 180 Z"
            fill="currentColor"
            className="text-white dark:text-purple-600"
          />
        </svg>
      </div>

      {/* Welcome Content */}
      <div className="relative z-10 max-w-[570px]">
        <h1 className="flex flex-wrap items-center gap-3 text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
          Welcome Back, Satyam!

          <Hand
            size={30}
            className="shrink-0 text-amber-300"
          />
        </h1>

        <p className="mt-2 max-w-[510px] text-sm font-medium leading-6 text-white/95 sm:text-lg">
          Your shop is not activated yet. Activate now to start
          receiving print orders.
        </p>
      </div>

      {/* Light Mode Printer */}
      <div className="pointer-events-none absolute right-5 top-1/2 hidden h-full w-[30%] -translate-y-1/2 items-center justify-center sm:flex dark:hidden">
        <img
          src="/images/shop-printer.png"
          alt="Printer illustration"
          className="h-[145px] w-full max-w-[230px] object-contain drop-shadow-lg"
        />
      </div>

      {/* Dark Mode Printer */}
      <div className="pointer-events-none absolute right-5 top-1/2 hidden h-full w-[30%] -translate-y-1/2 items-center justify-center dark:flex">
        <img
          src="/images/shop-printer-dark.png"
          alt="Printer illustration"
          className="h-[145px] w-full max-w-[230px] object-contain drop-shadow-[0_0_18px_rgba(168,85,247,0.35)]"
        />
      </div>
    </section>
  );
};

export default DashboardWelcome;
