
import {
  Store,
  Calendar,
  Crown,
  Lock,
  ArrowRight,
  Ticket,
  AlertCircle,
} from "lucide-react";

import type { NormalizedActivationPlan } from "../types/activation.types";
import SecurePaymentInfo from "./SecurePaymentInfo";

export interface OrderPricingSummary {
  basePrice: number;
  discount: number;
  totalPayable: number;
  couponCode?: string;
}

interface OrderSummaryProps {
  selectedPlan: NormalizedActivationPlan;
  pricing: OrderPricingSummary;
  onProceedPayment: () => void;
  isPaying: boolean;
  paymentError?: string | null;
}

const OrderSummary = ({
  selectedPlan,
  pricing,
  onProceedPayment,
  isPaying,
  paymentError,
}: OrderSummaryProps) => {
  const isCrown = selectedPlan?.iconType === "crown";

  return (
    <aside
      className="
        rounded-2xl border border-purple-200/80
        bg-white/95 p-5 shadow-sm
        dark:border-[#2a224a] dark:bg-[#110e20]/95
      "
    >
      <div className="flex items-center gap-2.5 border-b border-purple-100 pb-3.5 dark:border-[#241e3d]">
        <Store className="h-5 w-5 text-[#7c3aed] dark:text-[#c084fc]" />

        <h3 className="text-base font-extrabold text-slate-950 dark:text-white sm:text-lg">
          Order Summary
        </h3>
      </div>

      <div className="mt-4 flex items-center gap-3">
        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
            isCrown
              ? "bg-amber-100 text-amber-500 dark:bg-[#2c221e] dark:text-amber-400"
              : "bg-purple-100 text-[#7c3aed] dark:bg-[#271847] dark:text-[#c084fc]"
          }`}
        >
          {isCrown ? <Crown size={22} /> : <Calendar size={22} />}
        </div>

        <div>
          <p className="text-sm font-extrabold text-slate-900 dark:text-white">
            {selectedPlan?.name}
          </p>

          <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
            {selectedPlan?.summaryValidity}
          </p>
        </div>
      </div>

      <div className="mt-5 space-y-2.5 border-t border-purple-100 pt-4 text-xs font-semibold dark:border-[#241e3d] sm:text-sm">
        <div className="flex items-center justify-between text-slate-600 dark:text-slate-300">
          <span>Plan Price</span>

          <span className="font-bold text-slate-900 dark:text-white">
            ₹{pricing.basePrice}
          </span>
        </div>

        <div className="flex items-center justify-between gap-2 text-slate-600 dark:text-slate-300">
          <span className="flex flex-wrap items-center gap-1.5">
            <span>Coupon Discount</span>

            {pricing.couponCode && (
              <span className="inline-flex items-center gap-1 rounded-md bg-emerald-500/15 px-2 py-0.5 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                <Ticket className="h-3 w-3" />
                {pricing.couponCode}
              </span>
            )}
          </span>

          <span className="font-bold text-emerald-500">
            - ₹{pricing.discount}
          </span>
        </div>
      </div>

      <div
        className="
          mt-4 flex items-center justify-between rounded-xl
          bg-purple-100/75 px-4 py-3
          dark:bg-[#271447]
        "
      >
        <span className="text-sm font-extrabold text-slate-900 dark:text-white sm:text-base">
          Total Payable
        </span>

        <span className="text-xl font-extrabold text-[#7c3aed] dark:text-white sm:text-2xl">
          ₹{pricing.totalPayable}
        </span>
      </div>

      {paymentError && (
        <div
          role="alert"
          className="
            mt-4 flex items-start gap-2 rounded-xl
            border border-rose-200 bg-rose-50/90
            px-3.5 py-2.5 text-xs font-semibold text-rose-700
            dark:border-rose-500/35 dark:bg-rose-950/40
            dark:text-rose-300
          "
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-rose-500" />
          <span>{paymentError}</span>
        </div>
      )}

      <button
        type="button"
        disabled={isPaying}
        onClick={onProceedPayment}
        className="
          mt-4 flex w-full items-center justify-center gap-2
          rounded-xl bg-gradient-to-r from-[#8b3dff] to-[#6d28d9]
          px-5 py-3.5 text-sm font-extrabold text-white
          shadow-lg shadow-purple-500/25
          transition hover:brightness-110 active:scale-[0.98]
          disabled:cursor-not-allowed disabled:opacity-60
          sm:text-base
        "
      >
        <Lock className="h-4 w-4" />

        <span>
          {isPaying ? "Opening Razorpay..." : "Proceed to Payment"}
        </span>

        <ArrowRight className="h-4 w-4" />
      </button>

      <SecurePaymentInfo />
    </aside>
  );
};

export default OrderSummary;
