import { Link } from "react-router-dom";
import {
  ArrowRight,
  LogIn,
  Printer,
  QrCode,
  TicketPercent,
  UserRound,
  X,
} from "lucide-react";

interface CustomerAccessModalProps {
  onContinueAsGuest: () => void;
  onScanQrNow: () => void;
  onLogin: () => void;
  onClose: () => void;
}

const CustomerAccessModal = ({
  onContinueAsGuest,
  onScanQrNow,
  onLogin,
  onClose,
}: CustomerAccessModalProps) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/65 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="customer-access-title"
    >
      <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-purple-200/80 bg-white shadow-2xl dark:border-slate-700 dark:bg-slate-900">
        <div className="bg-gradient-to-r from-purple-700 to-indigo-700 px-6 py-5 text-white">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="absolute right-4 top-4 rounded-full bg-white/15 p-1.5 text-white transition hover:bg-white/25"
          >
            <X className="h-4 w-4" />
          </button>

          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold">
            <Printer className="h-3.5 w-3.5 text-emerald-300" />
            Customer Print Service
          </span>

          <h2
            id="customer-access-title"
            className="mt-3 text-xl font-extrabold tracking-tight"
          >
            How would you like to continue?
          </h2>
          <p className="mt-1 text-xs text-purple-100">
            Print immediately as a guest, scan a shop QR code, or log in to
            manage orders and apply coupons.
          </p>
        </div>

        <div className="space-y-3 p-6">
          <button
            type="button"
            onClick={onContinueAsGuest}
            className="flex w-full cursor-pointer items-center justify-between rounded-2xl border-2 border-purple-600 bg-purple-700 p-4 text-left text-white shadow-lg shadow-purple-700/20 transition hover:bg-purple-800"
          >
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/15">
                <UserRound className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-extrabold">Continue as Guest</p>
                <p className="mt-0.5 text-xs text-purple-100">
                  Open Guest Workspace & track with Order ID + Private Key
                </p>
              </div>
            </div>
            <ArrowRight className="h-5 w-5 shrink-0" />
          </button>

          <button
            type="button"
            onClick={onScanQrNow}
            className="flex w-full cursor-pointer items-center justify-between rounded-2xl border border-indigo-200 bg-indigo-50/70 p-4 text-left text-slate-900 transition hover:bg-indigo-100 dark:border-slate-700 dark:bg-slate-800/80 dark:text-white dark:hover:bg-slate-700"
          >
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                <QrCode className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-extrabold">Scan Shop QR Code</p>
                <p className="mt-0.5 text-xs text-slate-600 dark:text-slate-300">
                  At a print shop counter? Scan QR & upload PDFs or ID cards
                </p>
              </div>
            </div>
            <ArrowRight className="h-5 w-5 shrink-0 text-indigo-700 dark:text-indigo-400" />
          </button>

          <button
            type="button"
            onClick={onLogin}
            className="flex w-full cursor-pointer items-center justify-between rounded-2xl border border-purple-200 bg-purple-50/70 p-4 text-left text-slate-900 transition hover:bg-purple-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700"
          >
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300">
                <LogIn className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-extrabold">Login to Account</p>
                <p className="mt-0.5 flex items-center gap-1 text-xs text-slate-600 dark:text-slate-300">
                  <TicketPercent className="h-3.5 w-3.5 text-purple-600" />
                  View full order history & apply promo coupons
                </p>
              </div>
            </div>
            <ArrowRight className="h-5 w-5 shrink-0 text-purple-700 dark:text-purple-400" />
          </button>

          <p className="pt-2 text-center text-xs font-medium text-slate-500 dark:text-slate-400">
            New to EasyPrint?{" "}
            <Link
              to="/customer/register"
              className="font-bold text-purple-700 underline underline-offset-2 hover:text-purple-900 dark:text-purple-400"
            >
              Create a customer account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CustomerAccessModal;