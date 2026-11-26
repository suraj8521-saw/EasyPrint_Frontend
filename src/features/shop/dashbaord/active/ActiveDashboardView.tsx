import { Link } from "react-router-dom";
import {
  CheckCircle2,
  QrCode,
  Printer,
  Tag,
  ShoppingBag,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";

import { useAuthSession } from "../../../auth/api/authQueries";
import InactiveStatsRow from "../inactive/components/InactiveStatsRow";

const QUICK_ACTIONS = [
  {
    title: "Manage Print Services",
    description: "Configure B&W, color, spiral binding & lamination options.",
    path: "/shop/services",
    icon: Printer,
    accent: "bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300",
  },
  {
    title: "Set Page Pricing",
    description: "Update per-page rates, bulk discounts & paper sizes.",
    path: "/shop/pricing",
    icon: Tag,
    accent: "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300",
  },
  {
    title: "Shop QR & Direct Link",
    description: "Download your shop QR code so customers can scan & print.",
    path: "/shop/qr-link",
    icon: QrCode,
    accent: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300",
  },
  {
    title: "Incoming Orders",
    description: "View, accept, and print live document orders from customers.",
    path: "/shop/orders",
    icon: ShoppingBag,
    accent: "bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300",
  },
];

const ActiveDashboardView = () => {
  const { user } = useAuthSession();

  return (
    <div className="w-full space-y-6">
      {/* Active Verified Welcome Banner */}
      <section
        className="
          relative isolate overflow-hidden rounded-2xl
          border border-emerald-200/80
          bg-gradient-to-r from-[#6d28d9] via-[#5b21b6] to-[#3b0764]
          px-6 py-6 text-white shadow-md
          dark:border-purple-800/60
          sm:px-10
        "
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-14 -top-16 h-60 w-60 rounded-full bg-[radial-gradient(circle,rgba(52,211,153,0.28)_0%,rgba(52,211,153,0)_70%)]"
        />

        <div className="relative z-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-400/20 px-3 py-1 text-xs font-bold text-emerald-200 ring-1 ring-emerald-300/30">
              <CheckCircle2 className="h-3.5 w-3.5" />
              Shop Verified &amp; Live
            </span>

            <h1 className="mt-3 text-2xl font-extrabold tracking-tight sm:text-3xl">
              Welcome Back, {user?.name || "Shopkeeper"}!
            </h1>

            <p className="mt-1.5 text-xs font-medium leading-5 text-white/90 sm:text-sm sm:leading-6">
              Your print shop is active and unlocked. Set up your services,
              pricing, and QR code to start accepting customer print orders.
            </p>
          </div>

          <div className="shrink-0">
            <Link
              to="/shop/qr-link"
              className="
                inline-flex items-center gap-2 rounded-xl
                bg-white px-5 py-3 text-xs font-extrabold text-purple-800
                shadow-lg transition hover:bg-purple-50 active:scale-95
                sm:text-sm
              "
            >
              <QrCode className="h-4 w-4" />
              <span>View Shop QR</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Row */}
      <InactiveStatsRow />

      {/* Unlocked Shop Setup & Quick Actions */}
      <section>
        <div className="mb-3.5 flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-purple-600 dark:text-purple-400" />
          <h2 className="text-lg font-extrabold text-slate-900 dark:text-white">
            Quick Shop Setup
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {QUICK_ACTIONS.map(({ title, description, path, icon: Icon, accent }) => (
            <Link
              key={path}
              to={path}
              className="
                group flex flex-col justify-between rounded-2xl
                border border-purple-100 bg-white/95 p-5 shadow-xs
                transition hover:-translate-y-0.5 hover:border-purple-300 hover:shadow-md
                dark:border-slate-800 dark:bg-[#131024] dark:hover:border-purple-600
              "
            >
              <div>
                <div className="flex items-center justify-between">
                  <span
                    className={`flex h-11 w-11 items-center justify-center rounded-xl ${accent}`}
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-slate-400 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-purple-600" />
                </div>

                <h3 className="mt-4 text-base font-extrabold text-slate-900 dark:text-white">
                  {title}
                </h3>
                <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
                  {description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ActiveDashboardView;
