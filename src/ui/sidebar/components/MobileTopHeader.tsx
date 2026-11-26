import { Printer, Bell, Menu } from "lucide-react";

interface MobileTopHeaderProps {
  onOpenDrawer: () => void;
  onNotificationClick?: () => void;
  hasUnread?: boolean;
}

const MobileTopHeader = ({
  onOpenDrawer,
  onNotificationClick,
  hasUnread = true,
}: MobileTopHeaderProps) => {
  return (
    <header
      className="
        sticky top-0 z-40 flex items-center justify-between
        border-b border-purple-100 bg-white/95 px-4 py-3.5
        text-slate-900 dark:border-[#1E1A36] dark:bg-[#0B091A]/95 dark:text-white
        lg:hidden
      "
    >
      {/* Left: Brand Logo */}
      <div className="flex items-center gap-2.5">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-100/80 text-[#7C3AED] dark:bg-[#7C3AED]/20 dark:text-[#A855F7]">
          <Printer className="h-5 w-5" strokeWidth={2.4} />
        </div>
        <span className="text-xl font-extrabold tracking-tight">
          Easy<span className="text-[#7C3AED]">Print</span>
        </span>
      </div>

      {/* Right: Bell Icon & Hamburger */}
      <div className="flex items-center gap-1.5">
        <button
          type="button"
          onClick={onNotificationClick}
          aria-label="Notifications"
          className="
            relative flex h-10 w-10 cursor-pointer items-center justify-center
            rounded-xl text-slate-700 hover:bg-purple-50
            dark:text-slate-200 dark:hover:bg-[#191530]
          "
        >
          <Bell className="h-5 w-5" strokeWidth={2.1} />
          {hasUnread && (
            <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-[#7C3AED] ring-2 ring-white dark:ring-[#0B091A]" />
          )}
        </button>

        <button
          type="button"
          onClick={onOpenDrawer}
          aria-label="Open navigation menu"
          className="
            flex h-10 w-10 cursor-pointer items-center justify-center
            rounded-xl text-slate-800 hover:bg-purple-50
            dark:text-slate-200 dark:hover:bg-[#191530]
          "
        >
          <Menu className="h-6 w-6" strokeWidth={2.2} />
        </button>
      </div>
    </header>
  );
};

export default MobileTopHeader;
