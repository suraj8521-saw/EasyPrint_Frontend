import { useState, type FormEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Clock,
  FileText,
  KeyRound,
  Lock,
  LogIn,
  QrCode,
  ScanLine,
  Search,
  ShieldCheck,
  Sparkles,
  UserRound,
} from "lucide-react";

import { useAuthSession } from "../../auth/api/authQueries";
import QrScannerBox from "../components/QrScannerBox";

const CustomerDashboardPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated } = useAuthSession();

  const isLoggedIn = Boolean(isAuthenticated && user);

  const [orderCodeInput, setOrderCodeInput] = useState("");
  const [accessKeyInput, setAccessKeyInput] = useState("");
  const [trackFeedback, setTrackFeedback] = useState<string | null>(null);

  const handleShopDetected = (shopCode: string) => {
    navigate(`/scan/${encodeURIComponent(shopCode)}`);
  };

  const handleOrderTrackSubmit = (e: FormEvent) => {
    e.preventDefault();
    const cleanOrder = orderCodeInput.trim().toUpperCase();
    const cleanKey = accessKeyInput.trim().toUpperCase();

    if (!cleanOrder || !cleanKey) {
      setTrackFeedback(
        "Please enter both your Order ID (e.g., EP-GXHHT3) and 6-character Private Key."
      );
      return;
    }

    setTrackFeedback(
      `Ready to track order ${cleanOrder} with verified access key — live tracking API integration coming next.`
    );
  };

  return (
    <div className="mx-auto max-w-6xl space-y-6 px-4 py-6 sm:px-6 lg:px-8">
      <div className="flex flex-col justify-between gap-4 rounded-3xl border border-purple-200/80 bg-gradient-to-r from-purple-700 via-purple-800 to-indigo-900 p-6 text-white shadow-xl sm:flex-row sm:items-center sm:p-8">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold">
            {isLoggedIn ? (
              <>
                <Sparkles className="h-3.5 w-3.5 text-amber-300" />
                Customer Workspace
              </>
            ) : (
              <>
                <UserRound className="h-3.5 w-3.5 text-amber-300" />
                Guest Print Workspace
              </>
            )}
          </span>

          <h1 className="mt-3 text-2xl font-extrabold tracking-tight sm:text-3xl">
            {isLoggedIn
              ? `Welcome back, ${user?.name || "Student"}`
              : "Print & Track in Guest Mode"}
          </h1>
          <p className="mt-1 text-sm text-purple-100">
            {isLoggedIn
              ? "Scan a shop QR code at the counter to print documents, apply coupons, and manage all your orders."
              : "Scan a shop QR code to upload & print immediately, or track an existing order using your Order ID and Private Key."}
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate("/customer/scan")}
          className="inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3.5 text-sm font-extrabold text-purple-900 shadow-lg transition hover:bg-purple-50"
        >
          <ScanLine className="h-5 w-5 text-purple-700" />
          Open Full QR Scanner
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <section className="rounded-3xl border border-purple-100 bg-white/90 p-6 shadow-lg dark:border-slate-800 dark:bg-slate-900/90 lg:col-span-6">
          <div className="mb-4 flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300">
              <QrCode className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-extrabold text-slate-900 dark:text-white">
                Scan Shop QR Code
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Scan counter QR or enter shop code to verify shop identity
              </p>
            </div>
          </div>

          <QrScannerBox onShopDetected={handleShopDetected} />
        </section>

        <section className="flex flex-col justify-between space-y-5 rounded-3xl border border-purple-100 bg-white/90 p-6 shadow-lg dark:border-slate-800 dark:bg-slate-900/90 lg:col-span-6">
          <div>
            <div className="mb-3 flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                <Search className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-lg font-extrabold text-slate-900 dark:text-white">
                  Track Order Status
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Enter Order ID and 6-character Private Key from your receipt
                </p>
              </div>
            </div>

            <form onSubmit={handleOrderTrackSubmit} className="space-y-3">
              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                <input
                  type="text"
                  value={orderCodeInput}
                  onChange={(e) => {
                    setOrderCodeInput(e.target.value);
                    setTrackFeedback(null);
                  }}
                  placeholder="Order ID (e.g., EP-GXHHT3)"
                  className="rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 font-mono text-sm font-semibold uppercase text-slate-900 placeholder:font-sans placeholder:font-normal placeholder:normal-case focus:border-purple-600 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />

                <div className="relative">
                  <KeyRound className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    maxLength={8}
                    value={accessKeyInput}
                    onChange={(e) => {
                      setAccessKeyInput(e.target.value);
                      setTrackFeedback(null);
                    }}
                    placeholder="Private Key (6 chars)"
                    className="w-full rounded-xl border border-slate-300 bg-white py-2.5 pl-9 pr-3.5 font-mono text-sm font-semibold uppercase text-slate-900 placeholder:font-sans placeholder:font-normal placeholder:normal-case focus:border-purple-600 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-slate-800 dark:bg-purple-700 dark:hover:bg-purple-800"
              >
                <Search className="h-4 w-4" />
                Check Live Order Status
              </button>

              {trackFeedback && (
                <p className="rounded-xl border border-purple-200 bg-purple-50/80 px-3.5 py-2.5 text-xs font-medium text-purple-900 dark:border-purple-900/50 dark:bg-purple-950/40 dark:text-purple-200">
                  {trackFeedback}
                </p>
              )}
            </form>
          </div>

          <div className="border-t border-slate-200/80 pt-5 dark:border-slate-800">
            <div className="mb-3 flex items-center gap-2">
              <Clock className="h-4 w-4 text-purple-600" />
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">
                {isLoggedIn ? "Your Order History" : "Saved Order History"}
              </h3>
            </div>

            {isLoggedIn ? (
              <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 py-8 text-center dark:border-slate-800">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                  <FileText className="h-5 w-5" />
                </div>
                <p className="mt-2.5 text-sm font-bold text-slate-800 dark:text-slate-200">
                  No past orders yet
                </p>
                <p className="mt-1 max-w-xs text-xs text-slate-500 dark:text-slate-400">
                  All your print orders, live statuses, and 6-character pickup
                  keys will appear here automatically.
                </p>
              </div>
            ) : (
              <div className="rounded-2xl border border-amber-200/80 bg-amber-50/70 p-4 dark:border-amber-900/50 dark:bg-amber-950/30">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-700 dark:bg-amber-900/60 dark:text-amber-300">
                    <Lock className="h-4 w-4" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs font-bold text-slate-900 dark:text-white">
                      Order history is hidden in Guest Mode
                    </p>
                    <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                      For privacy, guest sessions cannot browse previous orders.
                      Use the <strong>Order ID + Private Key</strong> search box
                      above, or log in to view all your orders and apply promo
                      coupons.
                    </p>
                    <Link
                      to="/auth/login"
                      state={{ from: location }}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-purple-700 px-3 py-1.5 text-xs font-bold text-white transition hover:bg-purple-800"
                    >
                      <LogIn className="h-3.5 w-3.5" />
                      Login to View All Orders
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 rounded-2xl bg-emerald-50/80 px-4 py-3 text-xs font-medium text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300">
            <ShieldCheck className="h-4 w-4 shrink-0 text-emerald-600" />
            <span>
              Your documents are encrypted and isolated per print session.
            </span>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CustomerDashboardPage;