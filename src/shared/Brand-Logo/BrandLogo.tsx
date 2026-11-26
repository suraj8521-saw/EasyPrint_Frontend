
import { Link } from "react-router-dom";
import { Printer } from "lucide-react";

interface BrandLogoProps {
  variant?: "main" | "account";
}

const BrandLogo = ({ variant = "main" }: BrandLogoProps) => {
  const isAccount = variant === "account";

  return (
    <Link
      to="/"
      aria-label="EasyPrint Home"
      className={`flex shrink-0 items-center no-underline ${
        isAccount ? "min-w-0 gap-2 sm:gap-2.5" : "gap-3"
      }`}
    >
      <span
        className={`
          flex shrink-0 items-center justify-center
          rounded-xl bg-blue-600 text-white
          ${
            isAccount
              ? "h-10 w-10 shadow-md shadow-blue-500/20 sm:h-11 sm:w-11"
              : "h-10 w-10 sm:h-12 sm:w-12 sm:rounded-2xl"
          }
        `}
      >
        <Printer size={isAccount ? 23 : 25} strokeWidth={2.5} />
      </span>

      <span
        className={`
          font-extrabold tracking-tight text-slate-900 dark:text-white
          ${
            isAccount
              ? "truncate text-base sm:text-lg"
              : "text-xl sm:text-2xl"
          }
        `}
      >
        EasyPrint
      </span>
    </Link>
  );
};

export default BrandLogo;
