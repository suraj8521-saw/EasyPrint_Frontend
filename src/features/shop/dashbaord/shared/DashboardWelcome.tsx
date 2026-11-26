import { Hand } from "lucide-react";
import { useAuthSession } from "../../../../features/auth/api/authQueries";

const DashboardWelcome = () => {
  const { user } = useAuthSession();

  return (
    <section
      className="
        group relative isolate mb-5 flex min-h-[132px]
        items-center overflow-hidden rounded-2xl
        border border-purple-100
        bg-gradient-to-r from-[#d9baff] via-[#e9d8ff] to-[#f4edff]
        px-4 py-4 shadow-sm
        dark:border-purple-900/50
        dark:bg-gradient-to-r dark:from-[#26065c]
        dark:via-[#180b38] dark:to-[#100b27]
        sm:min-h-[140px] sm:px-10 sm:py-5
      "
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden [backface-visibility:hidden] [transform:translateZ(0)]"
      >
        <div className="absolute -bottom-24 left-[35%] h-64 w-80 rounded-full bg-[radial-gradient(circle,rgba(192,132,252,0.28)_0%,rgba(192,132,252,0)_70%)] dark:bg-[radial-gradient(circle,rgba(126,34,206,0.28)_0%,rgba(126,34,206,0)_70%)]" />
        <div className="absolute -right-16 -top-20 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(216,180,254,0.35)_0%,rgba(216,180,254,0)_70%)] dark:bg-[radial-gradient(circle,rgba(109,40,217,0.25)_0%,rgba(109,40,217,0)_70%)]" />

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

      <div className="relative z-10 min-w-0 max-w-[570px]">
        <h1 className="flex flex-wrap items-center gap-2 text-xl font-extrabold tracking-tight sm:gap-3 sm:text-3xl">
          <span>Welcome Back,</span>
          <span className="text-purple-700 dark:text-[#b794f6]">
            {user?.name || "User"}!
          </span>
          <Hand size={26} className="shrink-0 text-amber-300 sm:h-[30px] sm:w-[30px]" />
        </h1>

        <p className="mt-1.5 max-w-[510px] text-xs font-medium leading-5 text-slate-700 dark:text-white/90 sm:mt-2 sm:text-lg sm:leading-6">
          Your shop is not activated yet. Activate now to start receiving print
          orders.
        </p>
      </div>

      <div className="pointer-events-none absolute right-5 top-1/2 hidden h-full w-[30%] -translate-y-1/2 items-center justify-center sm:flex dark:hidden">
        <img
          src="/images/shop-printer.png"
          alt="Printer illustration"
          decoding="async"
          className="h-[145px] w-full max-w-[230px] object-contain drop-shadow-lg"
        />
      </div>

      <div className="pointer-events-none absolute right-5 top-1/2 hidden h-full w-[30%] -translate-y-1/2 items-center justify-center dark:flex">
        <img
          src="/images/shop-printer-dark.png"
          alt="Printer illustration"
          decoding="async"
          className="h-[145px] w-full max-w-[230px] object-contain drop-shadow-[0_0_18px_rgba(168,85,247,0.35)]"
        />
      </div>
    </section>
  );
};

export default DashboardWelcome;
