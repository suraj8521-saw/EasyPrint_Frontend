import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import type { RegisterRole } from "../types/auth.types";

interface RegisterHeaderProps {
  role: RegisterRole;
}

const RegisterHeader = ({ role }: RegisterHeaderProps) => {
  const isShopkeeper = role === "shop";

  return (
    <div className="mb-4">
      {/* Top Row: Registration Pill (Left) + Back to Selection Button (Exact Right) */}
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <span className="inline-flex items-center gap-2 rounded-full border border-purple-200 bg-purple-100/70 px-4 py-1.5 text-xs font-bold text-purple-800 shadow-sm dark:border-purple-800 dark:bg-purple-900/30 dark:text-purple-300 sm:px-5 sm:py-2 sm:text-sm">
          <span>{isShopkeeper ? "🏪" : "👤"}</span>
          <span>
            {isShopkeeper
              ? "Shopkeeper Registration"
              : "Customer Registration"}
          </span>
        </span>

        <Link
          to="/account/selection"
          aria-label="Back to Account Selection"
          className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-slate-200/90 bg-white/80 px-3 py-1.5 text-xs font-semibold text-slate-600 shadow-2xs transition hover:border-purple-300 hover:bg-purple-50 hover:text-purple-700 active:scale-95 dark:border-slate-700 dark:bg-slate-800/80 dark:text-slate-300 dark:hover:border-purple-500/50 dark:hover:bg-slate-800 dark:hover:text-purple-300 sm:px-3.5 sm:text-xs"
        >
          <ArrowLeft size={14} className="shrink-0" aria-hidden="true" />
          <span>Change Role</span>
        </Link>
      </div>

      {/* Heading */}
      <h1 className="text-3xl font-black leading-tight tracking-tight text-slate-900 dark:text-white">
        Create Your
        <br />
        <span className="text-purple-700 dark:text-purple-400">
          {isShopkeeper ? "Shopkeeper" : "Customer"}
        </span>{" "}
        Account
      </h1>

      {/* Description */}
      <p className="mt-2 max-w-md text-sm leading-6 text-slate-600 dark:text-slate-400">
        {isShopkeeper
          ? "Register your print shop on EasyPrint and start receiving print orders online."
          : "Create your EasyPrint account and start uploading, editing and printing documents easily."}
      </p>
    </div>
  );
};

export default RegisterHeader;
