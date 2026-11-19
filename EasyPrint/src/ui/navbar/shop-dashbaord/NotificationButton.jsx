
import { useState } from "react";
import { Bell } from "lucide-react";

const NotificationButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Notifications"
        aria-expanded={isOpen}
        className="relative flex h-12 w-12 items-center justify-center rounded-full border border-purple-100 bg-white text-slate-800 shadow-sm transition hover:bg-purple-50 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:hover:bg-slate-800"
      >
        <Bell size={23} />

        {/* Notification Indicator */}
        <span className="absolute right-2 top-2 h-3 w-3 rounded-full border-2 border-white bg-red-500 dark:border-slate-900" />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-14 z-50 w-72 rounded-2xl border border-purple-100 bg-white p-4 shadow-xl dark:border-slate-700 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900 dark:text-white">
              Notifications
            </h3>

            <span className="rounded-full bg-purple-100 px-2 py-1 text-xs font-semibold text-purple-700 dark:bg-purple-950 dark:text-purple-300">
              0 New
            </span>
          </div>

          <div className="py-7 text-center">
            <Bell
              size={28}
              className="mx-auto mb-2 text-slate-300 dark:text-slate-600"
            />

            <p className="text-sm text-slate-500 dark:text-slate-400">
              No new notifications
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationButton;
