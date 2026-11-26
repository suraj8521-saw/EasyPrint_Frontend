import { Home, ClipboardCheck, Printer, LayoutGrid } from "lucide-react";

interface BottomNavItem {
  id: string;
  label: string;
  path?: string;
  action?: "OPEN_DRAWER";
  icon: typeof Home;
  locked?: boolean;
}

const BOTTOM_NAV_ITEMS: BottomNavItem[] = [
  { id: "dashboard", label: "Dashboard", path: "/shop/dashboard", icon: Home, locked: false },
  { id: "orders", label: "Orders", path: "/shop/orders", icon: ClipboardCheck, locked: true },
  { id: "services", label: "Services", path: "/shop/services", icon: Printer, locked: true },
  { id: "more", label: "More", action: "OPEN_DRAWER", icon: LayoutGrid },
];

interface MobileBottomNavProps {
  activeRoute: string;
  isDrawerOpen: boolean;
  onSelectItem: (item: { path?: string; locked?: boolean }) => void;
  onOpenDrawer: () => void;
}

const MobileBottomNav = ({
  activeRoute,
  isDrawerOpen,
  onSelectItem,
  onOpenDrawer,
}: MobileBottomNavProps) => {
  return (
    <nav
      aria-label="Mobile bottom navigation"
      className="
        fixed inset-x-0 bottom-0 z-40
        flex items-center justify-around
        border-t border-purple-100 bg-white/95 px-3 py-2
        shadow-[0_-4px_20px_rgba(124,58,237,0.06)]
        dark:border-[#1E1A36] dark:bg-[#0E0B20]/95
        lg:hidden
      "
    >
      {BOTTOM_NAV_ITEMS.map((item) => {
        const Icon = item.icon;
        const isMore = item.action === "OPEN_DRAWER";
        const isActive = isMore
          ? isDrawerOpen
          : activeRoute === item.id && !isDrawerOpen;

        return (
          <button
            key={item.id}
            type="button"
            onClick={() =>
              isMore
                ? onOpenDrawer()
                : onSelectItem({ path: item.path, locked: item.locked })
            }
            className={`
              flex cursor-pointer flex-col items-center justify-center gap-1
              rounded-xl px-4 py-1.5 text-xs font-semibold
              ${
                isActive
                  ? "bg-[#F3E8FF] text-[#7C3AED] dark:bg-[#7C3AED]/20 dark:text-[#C084FC]"
                  : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200"
              }
            `}
          >
            <Icon className="h-5 w-5" />
            <span>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
};

export default MobileBottomNav;
