import {
  CheckCircle2,
  ChevronRight,
  Lock,
  LogOut,
  Rocket,
  Settings,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { useLogoutMutation } from "../../../features/auth/api/authQueries";

interface ShopStatusDropdownProps {
  isVerified: boolean;
  onClose: () => void;
  onNavigate?: () => void;
  onOpenActivateModal?: () => void;
  placement?: "bottom" | "right";
}

const ShopStatusDropdown = ({
  isVerified,
  onClose,
  onNavigate,
  onOpenActivateModal,
  placement = "bottom",
}: ShopStatusDropdownProps) => {
  const logoutMutation = useLogoutMutation();
  const navigate = useNavigate();

  const handleGoTo = (path: string) => {
    onClose();
    onNavigate?.();
    navigate(path);
  };

  const handleActivateClick = () => {
    onClose();
    onNavigate?.();
    if (onOpenActivateModal) {
      onOpenActivateModal();
    } else {
      navigate("/shop/activation/plan");
    }
  };

  const handleLogout = async () => {
    if (logoutMutation.isPending) return;

    try {
      await logoutMutation.mutateAsync();
    } finally {
      onClose();
      onNavigate?.();
      toast.success("Logged out successfully!", { toastId: "logout-success" });
      navigate("/auth/login", { replace: true });
    }
  };

  const positionClass =
    placement === "right"
      ? "left-[calc(100%+12px)] top-0 w-64"
      : "left-0 right-0 top-[calc(100%+10px)]";

  return (
    <div
      role="menu"
      className={`absolute z-[80] rounded-2xl border border-purple-200/80 bg-white p-3.5 shadow-2xl dark:border-purple-500/25 dark:bg-[#110d24] ${positionClass}`}
    >
      {/* Pointer Arrow */}
      {placement === "right" ? (
        <span className="absolute -left-1.5 top-4 h-3 w-3 rotate-45 border-b border-l border-purple-200/80 bg-white dark:border-purple-500/25 dark:bg-[#110d24]" />
      ) : (
        <span className="absolute -top-1.5 left-6 h-3 w-3 rotate-45 border-l border-t border-purple-200/80 bg-white dark:border-purple-500/25 dark:bg-[#110d24]" />
      )}

      <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-300">
        <span
          className={`h-2.5 w-2.5 rounded-full ${
            isVerified ? "bg-emerald-500" : "bg-rose-500"
          }`}
        />
        <span>Shop Status</span>
      </div>

      <div className="mt-3 flex items-center gap-3">
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
            isVerified
              ? "bg-emerald-500/15 text-emerald-500"
              : "bg-rose-600 text-white"
          }`}
        >
          {isVerified ? <CheckCircle2 size={19} /> : <Lock size={18} />}
        </div>

        <div>
          <p className="text-base font-extrabold leading-tight text-slate-900 dark:text-white">
            {isVerified ? "Active" : "Inactive"}
          </p>
          <p className="mt-0.5 text-[11px] text-slate-500 dark:text-slate-400">
            {isVerified
              ? "Your shop is live and accepting orders."
              : "Your shop is not activated yet."}
          </p>
        </div>
      </div>

      <hr className="my-3 border-slate-200/80 dark:border-slate-800" />

      {!isVerified && (
        <button
          type="button"
          role="menuitem"
          onClick={handleActivateClick}
          className="mb-2 flex w-full cursor-pointer items-center justify-between rounded-xl bg-gradient-to-r from-purple-600 to-violet-700 px-3.5 py-2.5 text-xs font-bold text-white shadow-md shadow-purple-700/30 transition hover:from-purple-500 hover:to-violet-600"
        >
          <span className="flex items-center gap-2">
            <Rocket size={16} />
            <span>Activate Your Shop</span>
          </span>
          <ChevronRight size={16} />
        </button>
      )}

      <button
        type="button"
        role="menuitem"
        onClick={() => {
          if (!isVerified) {
            toast.info("Activate your shop first to access settings.", {
              toastId: "shop-locked-feature",
            });
            return;
          }
          handleGoTo("/shop/settings");
        }}
        className="flex w-full cursor-pointer items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium text-slate-700 transition hover:bg-purple-50 dark:text-slate-300 dark:hover:bg-slate-800/80"
      >
        <Settings size={16} className="text-slate-400" />
        <span>Shop Settings</span>
      </button>

      <button
        type="button"
        role="menuitem"
        disabled={logoutMutation.isPending}
        onClick={handleLogout}
        className="mt-0.5 flex w-full cursor-pointer items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-rose-500 transition hover:bg-rose-50 disabled:opacity-50 dark:hover:bg-rose-950/30"
      >
        <LogOut size={16} />
        <span>{logoutMutation.isPending ? "Logging out..." : "Logout"}</span>
      </button>
    </div>
  );
};

export default ShopStatusDropdown;
