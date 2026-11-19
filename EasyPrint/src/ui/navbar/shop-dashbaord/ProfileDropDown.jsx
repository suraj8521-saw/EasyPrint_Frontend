
import { useState } from "react";
import { ChevronDown, LogOut, UserRound } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ProfileDropDown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    localStorage.removeItem("user");
    sessionStorage.removeItem("user");

    navigate("/shop/login", { replace: true });
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        className="flex items-center gap-2 rounded-full p-1 transition hover:bg-purple-50 dark:hover:bg-slate-800 sm:gap-3"
      >
        {/* Avatar */}
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-purple-900 text-lg font-bold text-white">
          S
        </span>

        <span className="hidden text-sm font-bold text-slate-900 dark:text-white xl:block">
          Satyam Murari
        </span>

        <ChevronDown
          size={18}
          className="text-slate-700 dark:text-slate-300"
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-14 z-50 w-52 overflow-hidden rounded-xl border border-purple-100 bg-white p-2 shadow-xl dark:border-slate-700 dark:bg-slate-900">

          <div className="border-b border-slate-100 px-3 py-3 dark:border-slate-800">
            <p className="font-bold text-slate-900 dark:text-white">
              Satyam Murari
            </p>

            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              Shopkeeper
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="mt-2 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-purple-50 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            <UserRound size={18} />
            My Profile
          </button>

          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileDropDown;
