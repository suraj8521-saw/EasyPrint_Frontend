import { useEffect, useRef, useState } from "react";
import { ChevronDown, LogOut, UserRound } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import type { UserRole } from "../../../../features/auth/types/auth.types";
import {
  useAuthSession,
  useLogoutMutation,
} from "../../../../features/auth/api/authQueries";

interface ProfileDropDownProps {
  onProfileClick?: () => void;
  onLogoutClick?: () => void;
}

const ROLE_LABELS: Record<UserRole, string> = {
  OPERATOR: "Shopkeeper",
  CUSTOMER: "Customer",
  ADMIN: "Admin",
};

const PROFILE_ROUTES: Record<UserRole, string> = {
  OPERATOR: "/shop/profile",
  CUSTOMER: "/customer/profile",
  ADMIN: "/admin/profile",
};

const ProfileDropDown = ({
  onProfileClick,
  onLogoutClick,
}: ProfileDropDownProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { user } = useAuthSession();
  const logoutMutation = useLogoutMutation();
  const navigate = useNavigate();

  const userName = user?.name || "User";
  const role = user?.role;
  const avatarInitial = userName.charAt(0).toUpperCase();
  const roleLabel = role ? ROLE_LABELS[role] : "Account";

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const handleProfileNavigation = () => {
    setIsOpen(false);
    if (onProfileClick) {
      onProfileClick();
      return;
    }
    if (role) {
      navigate(PROFILE_ROUTES[role]);
    }
  };

  const handleLogout = async () => {
    if (logoutMutation.isPending) return;

    setIsOpen(false);

    if (onLogoutClick) {
      onLogoutClick();
      return;
    }

    try {
      await logoutMutation.mutateAsync();
    } finally {
      toast.success("Logged out successfully!", { toastId: "logout-success" });
      navigate("/auth/login", { replace: true });
    }
  };

  return (
    <div ref={dropdownRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        className="flex items-center gap-2 rounded-full p-1 transition hover:bg-purple-50 dark:hover:bg-slate-800 sm:gap-3"
      >
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-purple-900 text-lg font-bold text-white">
          {avatarInitial}
        </span>

        <span className="hidden text-sm font-bold text-slate-900 dark:text-white xl:block">
          {userName}
        </span>

        <ChevronDown
          size={18}
          className={`text-slate-700 transition-transform duration-200 dark:text-slate-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div
          role="menu"
          className="absolute right-0 top-14 z-50 w-52 overflow-hidden rounded-xl border border-purple-100 bg-white p-2 shadow-xl dark:border-slate-700 dark:bg-slate-900"
        >
          <div className="border-b border-slate-100 px-3 py-3 dark:border-slate-800">
            <p className="truncate font-bold text-slate-900 dark:text-white">
              {userName}
            </p>

            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              {roleLabel}
            </p>
          </div>

          <button
            type="button"
            role="menuitem"
            onClick={handleProfileNavigation}
            className="mt-2 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-purple-50 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            <UserRound size={18} />
            My Profile
          </button>

          <button
            type="button"
            role="menuitem"
            disabled={logoutMutation.isPending}
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50 disabled:opacity-50 dark:hover:bg-red-950/30"
          >
            <LogOut size={18} />
            {logoutMutation.isPending ? "Logging out..." : "Logout"}
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileDropDown;
