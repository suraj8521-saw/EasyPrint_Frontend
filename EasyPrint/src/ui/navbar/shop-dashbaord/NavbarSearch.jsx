
import { Search } from "lucide-react";

const NavbarSearch = () => {
  return (
    <div className="hidden w-full max-w-[440px] items-center rounded-full border border-purple-200 bg-white px-4 py-3 shadow-sm transition focus-within:border-purple-500 focus-within:ring-2 focus-within:ring-purple-100 dark:border-slate-700 dark:bg-slate-900 dark:focus-within:ring-purple-900 lg:flex">

      <Search
        size={21}
        className="shrink-0 text-slate-500 dark:text-slate-400"
      />

      <input
        type="search"
        placeholder="Search orders, customers, documents..."
        className="ml-3 w-full bg-transparent text-sm font-medium text-slate-800 outline-none placeholder:text-slate-500 dark:text-white dark:placeholder:text-slate-400"
      />
    </div>
  );
};

export default NavbarSearch;
