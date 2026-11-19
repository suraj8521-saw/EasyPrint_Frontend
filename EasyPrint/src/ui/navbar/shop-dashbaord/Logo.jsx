import { Store } from "lucide-react";
import BrandLogo from "../BrandLogo";

const Logo = () => {
  return (
    <div className="flex shrink-0 items-center gap-4 sm:gap-5">

      {/* Existing Brand Logo */}
      <BrandLogo />

      {/* Divider */}
      <div className="hidden h-10 w-px bg-purple-200 dark:bg-slate-700 sm:block" />

      {/* Dashboard Title */}
      <div className="hidden items-center gap-2 md:flex">
        <Store
          size={29}
          className="text-purple-700 dark:text-purple-400"
        />

        <h2 className="whitespace-nowrap text-xl font-extrabold tracking-tight text-slate-950 dark:text-white">
          Shopkeeper Dashboard
        </h2>
      </div>

    </div>
  );
};

export default Logo;