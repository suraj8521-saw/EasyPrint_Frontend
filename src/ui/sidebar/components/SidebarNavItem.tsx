import { NavLink } from "react-router-dom";
import { Lock } from "lucide-react";
import { toast } from "react-toastify";
import type { SidebarNavItemConfig } from "../data/sidebarMenu";

interface SidebarNavItemProps {
  item: SidebarNavItemConfig;
  isVerified: boolean;
  isCollapsed?: boolean;
  onNavigate?: () => void;
  onOpenActivateModal?: () => void;
}

const SidebarNavItem = ({
  item,
  isVerified,
  isCollapsed = false,
  onNavigate,
  onOpenActivateModal,
}: SidebarNavItemProps) => {
  const Icon = item.icon;
  const isItemLocked = item.requiresVerification && !isVerified;

  if (isItemLocked) {
    return (
      <div className="group relative">
        <button
          type="button"
          onClick={() => {
            if (onOpenActivateModal) {
              onOpenActivateModal();
            } else {
              toast.info("Activate your shop first to unlock this section.", {
                toastId: "shop-locked-feature",
              });
            }
          }}
          aria-label={item.label}
          className={`flex w-full cursor-pointer items-center rounded-xl text-sm font-medium text-slate-400 hover:bg-slate-100/70 dark:text-slate-400 dark:hover:bg-slate-900/60 ${
            isCollapsed ? "justify-center p-3" : "justify-between px-4 py-3"
          }`}
        >
          <span className="flex items-center gap-3.5">
            <Icon size={20} className="shrink-0 text-slate-400" />
            {!isCollapsed && <span>{item.label}</span>}
          </span>
          {!isCollapsed && <Lock size={15} className="text-slate-500" />}
        </button>

        {isCollapsed && (
          <span
            role="tooltip"
            className="pointer-events-none invisible absolute left-[calc(100%+12px)] top-1/2 z-[70] flex -translate-y-1/2 items-center gap-1.5 whitespace-nowrap rounded-full bg-slate-900 px-3.5 py-1.5 text-xs font-semibold text-white opacity-0 shadow-lg transition-all duration-150 group-hover:visible group-hover:opacity-100 dark:bg-slate-100 dark:text-slate-900"
          >
            <span>{item.label}</span>
            <Lock size={12} />
          </span>
        )}
      </div>
    );
  }

  return (
    <div className="group relative">
      <NavLink
        to={item.path}
        onClick={onNavigate}
        aria-label={item.label}
        className={({ isActive }) =>
          `flex w-full items-center rounded-xl text-sm font-semibold ${
            isCollapsed ? "justify-center p-3" : "justify-between px-4 py-3"
          } ${
            isActive
              ? "bg-gradient-to-r from-purple-600 to-violet-700 text-white shadow-lg shadow-purple-700/30"
              : "text-slate-700 hover:bg-purple-50 dark:text-slate-200 dark:hover:bg-slate-900/70"
          }`
        }
      >
        <span className="flex items-center gap-3.5">
          <Icon size={20} className="shrink-0" />
          {!isCollapsed && <span>{item.label}</span>}
        </span>
      </NavLink>

      {isCollapsed && (
        <span
          role="tooltip"
          className="pointer-events-none invisible absolute left-[calc(100%+12px)] top-1/2 z-[70] -translate-y-1/2 whitespace-nowrap rounded-full bg-slate-900 px-3.5 py-1.5 text-xs font-semibold text-white opacity-0 shadow-lg transition-all duration-150 group-hover:visible group-hover:opacity-100 dark:bg-slate-100 dark:text-slate-900"
        >
          {item.label}
        </span>
      )}
    </div>
  );
};

export default SidebarNavItem;
