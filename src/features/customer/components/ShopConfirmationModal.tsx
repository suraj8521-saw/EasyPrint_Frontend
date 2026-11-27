import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Building2,
  CheckCircle2,
  LogIn,
  MapPin,
  Navigation,
  ShieldAlert,
  TicketPercent,
  UserCheck,
  UserRound,
  XCircle,
} from "lucide-react";
import type { PublicShopProfile } from "../types/customer.types";

interface ShopConfirmationModalProps {
  shop: PublicShopProfile;
  isAuthenticated: boolean;
  userName?: string;
  onConfirmContinue: () => void;
  onLoginRedirect: () => void;
  onCancel: () => void;
}

const ShopConfirmationModal = ({
  shop,
  isAuthenticated,
  userName,
  onConfirmContinue,
  onLoginRedirect,
  onCancel,
}: ShopConfirmationModalProps) => {
  const [step, setStep] = useState<"VERIFY_SHOP" | "CHOOSE_MODE">("VERIFY_SHOP");

  const handleShopVerified = () => {
    if (isAuthenticated) {
      onConfirmContinue();
      return;
    }
    setStep("CHOOSE_MODE");
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/65 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="shop-confirm-title"
    >
      <div className="w-full max-w-md overflow-hidden rounded-3xl border border-purple-200/80 bg-white shadow-2xl dark:border-slate-700 dark:bg-slate-900">
        {/* Top Banner */}
        <div className="bg-gradient-to-r from-purple-700 to-indigo-700 px-6 py-5 text-white">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold tracking-wide">
              <BadgeCheck className="h-4 w-4 text-emerald-300" />
              {step === "VERIFY_SHOP"
                ? "Step 1: Verify Shop"
                : "Step 2: Choose Access Mode"}
            </span>
            <span className="rounded-lg bg-black/20 px-2.5 py-1 font-mono text-xs font-bold">
              {shop.shopCode}
            </span>
          </div>

          <h2
            id="shop-confirm-title"
            className="mt-3 text-xl font-extrabold tracking-tight"
          >
            {step === "VERIFY_SHOP"
              ? "Confirm Print Shop"
              : `Continue to ${shop.shopName}`}
          </h2>
          <p className="mt-1 text-xs text-purple-100">
            {step === "VERIFY_SHOP"
              ? "Verify the shop name and address below before sharing your documents."
              : "Print immediately as a guest, or sign in to save orders and apply coupons."}
          </p>
        </div>

        {/* STEP 1: Confirm Shop Identity */}
        {step === "VERIFY_SHOP" ? (
          <div className="space-y-4 p-6">
            <div className="rounded-2xl border border-slate-200/80 bg-slate-50/80 p-4 dark:border-slate-800 dark:bg-slate-800/60">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300">
                    <Building2 className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                      Shop Name
                    </p>
                    <p className="text-base font-bold text-slate-900 dark:text-white">
                      {shop.shopName}
                    </p>
                  </div>
                </div>

                {shop.acceptingOrders ? (
                  <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-bold text-emerald-700 dark:bg-emerald-950/70 dark:text-emerald-300">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    Open
                  </span>
                ) : (
                  <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-red-100 px-2.5 py-1 text-xs font-bold text-red-700 dark:bg-red-950/70 dark:text-red-300">
                    <XCircle className="h-3.5 w-3.5" />
                    Closed
                  </span>
                )}
              </div>

              <div className="mt-3.5 space-y-2 border-t border-slate-200/70 pt-3.5 text-sm dark:border-slate-700/70">
                {shop.landmark && (
                  <div className="flex items-start gap-2.5 text-slate-700 dark:text-slate-300">
                    <Navigation className="mt-0.5 h-4 w-4 shrink-0 text-purple-600 dark:text-purple-400" />
                    <span>
                      <strong className="font-semibold">Landmark:</strong>{" "}
                      {shop.landmark}
                    </span>
                  </div>
                )}

                <div className="flex items-start gap-2.5 text-slate-600 dark:text-slate-400">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-purple-600 dark:text-purple-400" />
                  <span>{shop.fullAddress}</span>
                </div>
              </div>
            </div>

            {!shop.acceptingOrders && (
              <div className="flex items-start gap-2.5 rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs text-amber-800 dark:border-amber-900/60 dark:bg-amber-950/40 dark:text-amber-200">
                <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
                <p>
                  This shop has temporarily paused new print orders. You can
                  still view shop details, or check with the counter staff.
                </p>
              </div>
            )}

            {isAuthenticated && (
              <div className="flex items-center gap-2 rounded-xl bg-purple-50 px-3.5 py-2 text-xs font-medium text-purple-800 dark:bg-purple-950/40 dark:text-purple-200">
                <UserCheck className="h-4 w-4 shrink-0 text-purple-600" />
                <span>
                  Signed in as <strong>{userName || "Customer"}</strong>
                </span>
              </div>
            )}

            <button
              type="button"
              onClick={handleShopVerified}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-purple-700 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-purple-700/25 transition hover:bg-purple-800"
            >
              Yes, Confirm Shop
              <ArrowRight className="h-4 w-4" />
            </button>

            <button
              type="button"
              onClick={onCancel}
              className="w-full pt-1 text-center text-xs font-medium text-slate-500 transition hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
            >
              Wrong shop? Scan another QR code
            </button>
          </div>
        ) : (
          /* STEP 2: Guest vs Login Choice (Only shown when unauthenticated) */
          <div className="space-y-3.5 p-6">
            <button
              type="button"
              onClick={onConfirmContinue}
              className="flex w-full items-center justify-between rounded-2xl border-2 border-purple-600 bg-purple-700 p-4 text-left text-white shadow-lg shadow-purple-700/20 transition hover:bg-purple-800"
            >
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/15">
                  <UserRound className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-extrabold">Continue as Guest</p>
                  <p className="mt-0.5 text-xs text-purple-100">
                    Fast upload & checkout without logging in
                  </p>
                </div>
              </div>
              <ArrowRight className="h-5 w-5 shrink-0" />
            </button>

            <button
              type="button"
              onClick={onLoginRedirect}
              className="flex w-full items-center justify-between rounded-2xl border border-purple-200 bg-purple-50/70 p-4 text-left text-slate-900 transition hover:bg-purple-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700"
            >
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300">
                  <LogIn className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-extrabold">Login to Continue</p>
                  <p className="mt-0.5 flex items-center gap-1 text-xs text-slate-600 dark:text-slate-300">
                    <TicketPercent className="h-3.5 w-3.5 text-purple-600" />
                    Unlock promo coupons & save order history
                  </p>
                </div>
              </div>
              <ArrowRight className="h-5 w-5 shrink-0 text-purple-700 dark:text-purple-400" />
            </button>

            <button
              type="button"
              onClick={() => setStep("VERIFY_SHOP")}
              className="mt-2 inline-flex w-full items-center justify-center gap-1.5 pt-1 text-xs font-medium text-slate-500 transition hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to shop details
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShopConfirmationModal;