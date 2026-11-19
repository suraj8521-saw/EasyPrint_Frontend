
import { NavLink } from "react-router-dom";
import {
  Lock,
  Store,
  ChevronDown,
} from "lucide-react";

import { sidebarItems } from "../data/sidebarItems";
import ActivationCard from "./ActivationCard";

const DashboardSidebar = ({ onActivate }) => {
  return (
    <aside
      className="
        flex h-full w-[285px] shrink-0 flex-col
        overflow-hidden
        border-r border-purple-100
        bg-white/70 px-5 py-4 backdrop-blur-xl
        dark:border-slate-800 dark:bg-slate-950/70
      "
    >
      {/* Shop Information */}
      <div
        className="
          mb-4 flex shrink-0 items-center justify-between
          rounded-2xl border border-purple-200
          bg-white/80 p-3 shadow-sm
          dark:border-slate-700 dark:bg-slate-900
        "
      >
        <div className="flex min-w-0 items-center gap-3">
          <div
            className="
              flex h-14 w-14 shrink-0 items-center
              justify-center rounded-xl
              bg-purple-100 text-purple-700
              dark:bg-purple-950 dark:text-purple-300
            "
          >
            <Store size={30} />
          </div>

          <div className="min-w-0">
            <h3 className="truncate text-sm font-bold text-slate-900 dark:text-white">
              Satyam Print Hub
            </h3>

            <span
              className="
                mt-1 inline-flex items-center gap-1
                rounded-full bg-red-500 px-3 py-1
                text-[11px] font-semibold text-white
              "
            >
              <Lock size={11} />
              Inactive
            </span>
          </div>
        </div>

        <ChevronDown
          size={18}
          className="shrink-0 text-slate-700 dark:text-slate-300"
        />
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1">
        {sidebarItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.locked ? "/shop/dashboard" : item.path}
              onClick={(event) => {
                if (item.locked) {
                  event.preventDefault();
                }
              }}
              className={({ isActive }) =>
                `
                  flex items-center justify-between
                  rounded-xl px-4 py-2.5
                  transition-all duration-200
                  ${
                    isActive && !item.locked
                      ? "bg-gradient-to-r from-purple-600 to-purple-800 text-white shadow-lg shadow-purple-500/20"
                      : "text-slate-600 hover:bg-purple-50 dark:text-slate-300 dark:hover:bg-slate-800"
                  }
                `
              }
            >
              <span className="flex items-center gap-4">
                <Icon size={23} />

                <span className="text-sm font-semibold">
                  {item.title}
                </span>
              </span>

              {item.locked && (
                <Lock
                  size={17}
                  className="shrink-0 text-slate-500"
                />
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Activation Card Component */}
      <ActivationCard onActivate={onActivate} />

    </aside>
  );
};

export default DashboardSidebar;
