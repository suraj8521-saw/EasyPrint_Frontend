import { useEffect } from "react";
import {
  Printer,
  X,
  ChevronRight,
  Moon,
  LogOut,
  Lock,
} from "lucide-react";

import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { toggleTheme } from "../../../features/theme/themeSlice";
import {
  useAuthSession,
  useLogoutMutation,
} from "../../../features/auth/api/authQueries";
import { SHOP_SIDEBAR_MENU } from "../data/sidebarMenu";

interface MobileNavDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeRoute: string;
  onSelectItem: (item: { path?: string; locked?: boolean }) => void;
  onLogoutSuccess: () => void;
}

const MobileNavDrawer = ({
  isOpen,
  onClose,
  activeRoute,
  onSelectItem,
  onLogoutSuccess,
}: MobileNavDrawerProps) => {
  const dispatch = useAppDispatch();
  const isDark = useAppSelector((state) => state.theme.mode === "dark");
  const { user } = useAuthSession();
  const logoutMutation = useLogoutMutation();

  const userName = user?.name || "Shopkeeper";
  const avatarInitial = userName.charAt(0).toUpperCase();
  const isVerified = user?.verificationStatus === "VERIFIED";

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleLogout = async () => {
    if (logoutMutation.isPending) return;
    try {
      await logoutMutation.mutateAsync();
    } finally {
      onClose();
      onLogoutSuccess();
    }
  };

  return (
    <div className="fixed inset-0 z-[999] flex lg:hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/55"
      />

      {/* Slide-over Drawer Panel */}
      <aside
        className="
          shop-drawer-enter relative z-10 flex h-full w-[84%] max-w-[320px]
          flex-col justify-between overflow-y-auto
          border-r border-purple-100 bg-[#FAF8FF] text-slate-900 shadow-2xl
          dark:border-[#241E42] dark:bg-[#0F0C24] dark:text-slate-100
        "
      >
        <div>
          {/* Top Brand Header */}
          <div className="flex items-center justify-between border-b border-purple-100 px-5 py-4 dark:border-[#241E42]">
            <div className="flex items-center gap-2.5">
              <Printer className="h-7 w-7 text-[#7C3AED]" strokeWidth={2.3} />
              <span className="text-xl font-extrabold tracking-tight">
                Easy<span className="text-[#7C3AED]">Print</span>
              </span>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close drawer"
              className="cursor-pointer rounded-lg p-1.5 text-slate-700 hover:bg-purple-100/60 dark:text-slate-300 dark:hover:bg-[#1C1738]"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Shopkeeper Profile Row */}
          <div className="flex items-center justify-between border-b border-purple-100 px-5 py-4 dark:border-[#241E42]">
            <div className="flex min-w-0 items-center gap-3.5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#7C3AED] text-base font-semibold text-white">
                {avatarInitial}
              </div>
              <div className="min-w-0">
                <p className="truncate text-[15px] font-semibold leading-tight">
                  {userName}
                </p>
                <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                  {isVerified ? "Verified Shopkeeper" : "Inactive Shop"}
                </p>
              </div>
            </div>
            <ChevronRight className="h-4 w-4 shrink-0 text-slate-500 dark:text-slate-400" />
          </div>

          {/* Navigation Menu Links */}
          <nav className="space-y-1 px-3 py-4">
            {SHOP_SIDEBAR_MENU.map((item) => {
              const Icon = item.icon;
              const isActive = activeRoute === item.id;
              const isItemLocked = item.requiresVerification && !isVerified;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() =>
                    onSelectItem({ path: item.path, locked: isItemLocked })
                  }
                  className={`
                    flex w-full cursor-pointer items-center justify-between
                    rounded-xl px-3.5 py-2.5 text-sm font-medium
                    ${
                      isActive
                        ? "bg-[#E9D5FF]/80 font-semibold text-[#7C3AED] dark:bg-[#7C3AED]/25 dark:text-[#C084FC]"
                        : "text-slate-700 hover:bg-purple-100/50 dark:text-slate-300 dark:hover:bg-[#191532]"
                    }
                  `}
                >
                  <span className="flex items-center gap-3.5">
                    <Icon
                      className={`h-5 w-5 ${
                        isActive
                          ? "text-[#7C3AED] dark:text-[#C084FC]"
                          : "text-slate-600 dark:text-slate-400"
                      }`}
                    />
                    <span>{item.label}</span>
                  </span>

                  {isItemLocked && (
                    <Lock className="h-3.5 w-3.5 text-slate-400 dark:text-slate-500" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Dark Mode Toggle Row */}
          <div className="mx-4 my-2 flex items-center justify-between border-y border-purple-100 py-4 dark:border-[#241E42]">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-purple-100/70 text-slate-800 dark:bg-[#1C1738] dark:text-purple-300">
                <Moon className="h-4 w-4" />
              </div>
              <span className="text-sm font-medium">Dark Mode</span>
            </div>

            <button
              type="button"
              role="switch"
              aria-checked={isDark}
              onClick={() => dispatch(toggleTheme())}
              className={`h-6 w-11 cursor-pointer rounded-full p-0.5 ${
                isDark ? "bg-[#7C3AED]" : "bg-slate-300"
              }`}
            >
              <span
                className={`block h-5 w-5 rounded-full bg-white shadow-xs transition-transform duration-200 ${
                  isDark ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>
        </div>

        {/* Logout Footer */}
        <div className="px-5 py-4">
          <button
            type="button"
            disabled={logoutMutation.isPending}
            onClick={handleLogout}
            className="flex cursor-pointer items-center gap-3 text-sm font-semibold text-red-500 hover:text-red-600 disabled:opacity-50"
          >
            <LogOut className="h-5 w-5" />
            <span>{logoutMutation.isPending ? "Logging out..." : "Logout"}</span>
          </button>
        </div>
      </aside>
    </div>
  );
};

export default MobileNavDrawer;
