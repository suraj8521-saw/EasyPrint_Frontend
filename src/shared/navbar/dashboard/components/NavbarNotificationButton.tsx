import { useEffect, useRef, useState } from "react";
import { Bell } from "lucide-react";

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  isRead?: boolean;
}

interface NotificationButtonProps {
  notifications?: NotificationItem[];
  onNotificationClick?: (notification: NotificationItem) => void;
}

const NavbarNotificationButton = ({
  notifications = [],
  onNotificationClick,
}: NotificationButtonProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((item) => !item.isRead).length;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
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

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Notifications"
        aria-expanded={isOpen}
        className="relative flex h-12 w-12 items-center justify-center rounded-full border border-purple-100 bg-white text-slate-800 shadow-sm transition hover:bg-purple-50 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:hover:bg-slate-800"
      >
        <Bell size={23} />

        {/* Unread Indicator */}
        {unreadCount > 0 && (
          <span className="absolute right-2 top-2 h-3 w-3 rounded-full border-2 border-white bg-red-500 dark:border-slate-900" />
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 top-14 z-50 w-72 rounded-2xl border border-purple-100 bg-white p-4 shadow-xl dark:border-slate-700 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900 dark:text-white">
              Notifications
            </h3>

            <span className="rounded-full bg-purple-100 px-2 py-1 text-xs font-semibold text-purple-700 dark:bg-purple-950 dark:text-purple-300">
              {unreadCount} New
            </span>
          </div>

          {notifications.length === 0 ? (
            <div className="py-7 text-center">
              <Bell
                size={28}
                className="mx-auto mb-2 text-slate-300 dark:text-slate-600"
              />

              <p className="text-sm text-slate-500 dark:text-slate-400">
                No new notifications
              </p>
            </div>
          ) : (
            <ul className="mt-3 max-h-64 divide-y divide-purple-100/70 overflow-y-auto dark:divide-slate-800">
              {notifications.map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => {
                      onNotificationClick?.(item);
                      setIsOpen(false);
                    }}
                    className={`w-full rounded-xl px-2.5 py-2.5 text-left transition hover:bg-purple-50/80 dark:hover:bg-slate-800/80 ${
                      !item.isRead
                        ? "bg-purple-50/40 dark:bg-purple-950/20"
                        : ""
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-xs font-semibold text-slate-900 dark:text-white">
                        {item.title}
                      </p>
                      <span className="shrink-0 text-[11px] text-slate-400">
                        {item.time}
                      </span>
                    </div>
                    <p className="mt-0.5 line-clamp-2 text-xs text-slate-500 dark:text-slate-400">
                      {item.message}
                    </p>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default NavbarNotificationButton;