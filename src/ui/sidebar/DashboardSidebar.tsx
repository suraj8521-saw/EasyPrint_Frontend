import { useState } from "react";
import {
  PanelLeft,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import type { AppDispatch, RootState } from "../../app/store";
import { useAuthSession } from "../../features/auth/api/authQueries";
import { toggleSidebarCollapse } from "./state/sidebarSlice";
import { SHOP_SIDEBAR_MENU } from "./data/sidebarMenu";
import ShopProfileCard from "./components/ShopProfileCard";
import SidebarNavItem from "./components/SidebarNavItem";
import ActivateShopCard from "./components/ActivateShopCard";

interface DashboardSidebarProps {
  onNavigate?: () => void;
  onActivate?: () => void;
  forceExpanded?: boolean;
}

const DashboardSidebar = ({
  onNavigate,
  onActivate,
  forceExpanded = false,
}: DashboardSidebarProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const isCollapsedState = useSelector(
    (state: RootState) => state.sidebar.isCollapsed
  );
  const { user } = useAuthSession();

  const isCollapsed = forceExpanded ? false : isCollapsedState;
  const isVerified = user?.verificationStatus === "VERIFIED";

  const [isToggleHovered, setIsToggleHovered] = useState(false);

  const handleToggleCollapse = () => {
    setIsToggleHovered(false);
    dispatch(toggleSidebarCollapse());
  };

  return (
    <aside
      className={`relative flex h-full flex-col justify-between border-r border-slate-200/80 bg-white/95 transition-[width] duration-300 ease-out dark:border-slate-800/80 dark:bg-[#090714] ${
        isCollapsed ? "w-[78px] px-2.5 py-4" : "w-72 p-4"
      }`}
    >
      <div className="flex min-h-0 flex-1 flex-col gap-4">
        {/* Header Area:
            - When OPEN: ShopProfile on LEFT + Sidebar Toggle Button on RIGHT (no "Menu" label)
            - When COLLAPSED: Sidebar Toggle Button on TOP + ShopProfile icon BELOW it
        */}
        {forceExpanded ? (
          <ShopProfileCard
            onNavigate={onNavigate}
            onOpenActivateModal={onActivate}
          />
        ) : isCollapsed ? (
          <div className="flex flex-col items-center gap-3">
            {/* Top: Sidebar Toggle Icon */}
            <div className="relative">
              <button
                type="button"
                onClick={handleToggleCollapse}
                onMouseEnter={() => setIsToggleHovered(true)}
                onMouseLeave={() => setIsToggleHovered(false)}
                aria-label="Open sidebar"
                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-slate-600 hover:bg-purple-100/80 hover:text-purple-700 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-purple-300"
              >
                {isToggleHovered ? (
                  <PanelLeftOpen size={20} />
                ) : (
                  <PanelLeft size={20} />
                )}
              </button>

              {isToggleHovered && (
                <div
                  role="tooltip"
                  className="pointer-events-none absolute left-[calc(100%+12px)] top-1/2 z-[70] -translate-y-1/2 whitespace-nowrap rounded-full bg-slate-900 px-3.5 py-1.5 text-xs font-semibold text-white shadow-lg dark:bg-slate-100 dark:text-slate-900"
                >
                  Open sidebar
                </div>
              )}
            </div>

            {/* Below Toggle: ShopProfile Icon (click opens dropdown directly) */}
            <ShopProfileCard
              compact
              onNavigate={onNavigate}
              onOpenActivateModal={onActivate}
            />
          </div>
        ) : (
          <div className="flex items-center justify-between gap-2">
            {/* Left: ShopProfile */}
            <ShopProfileCard
              onNavigate={onNavigate}
              onOpenActivateModal={onActivate}
            />

            {/* Right: Sidebar Collapse Icon */}
            <div className="relative shrink-0">
              <button
                type="button"
                onClick={handleToggleCollapse}
                onMouseEnter={() => setIsToggleHovered(true)}
                onMouseLeave={() => setIsToggleHovered(false)}
                aria-label="Close sidebar"
                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-slate-600 hover:bg-purple-100/80 hover:text-purple-700 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-purple-300"
              >
                {isToggleHovered ? (
                  <PanelLeftClose size={20} />
                ) : (
                  <PanelLeft size={20} />
                )}
              </button>

              {isToggleHovered && (
                <div
                  role="tooltip"
                  className="pointer-events-none absolute left-[calc(100%+12px)] top-1/2 z-[70] -translate-y-1/2 whitespace-nowrap rounded-full bg-slate-900 px-3.5 py-1.5 text-xs font-semibold text-white shadow-lg dark:bg-slate-100 dark:text-slate-900"
                >
                  Close sidebar
                </div>
              )}
            </div>
          </div>
        )}

        {/* Navigation Links */}
        <nav
          className={`flex-1 space-y-1.5 ${
            isCollapsed ? "overflow-visible" : "no-scrollbar overflow-y-auto"
          }`}
          aria-label="Shop Sidebar Navigation"
        >
          {SHOP_SIDEBAR_MENU.map((item) => (
            <SidebarNavItem
              key={item.id}
              item={item}
              isVerified={isVerified}
              isCollapsed={isCollapsed}
              onNavigate={onNavigate}
              onOpenActivateModal={onActivate}
            />
          ))}
        </nav>
      </div>

      {/* Bottom Activate CTA */}
      {!isVerified && !isCollapsed && (
        <div className="pt-4">
          <ActivateShopCard
            onNavigate={onNavigate}
            onActivate={onActivate}
          />
        </div>
      )}
    </aside>
  );
};

export default DashboardSidebar;
