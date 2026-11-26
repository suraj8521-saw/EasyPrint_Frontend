import { Tag, Ticket, CheckCircle2, X, Loader2 } from "lucide-react";
import type { AppliedCouponInfo } from "../types/activation.types";

interface CouponSectionProps {
  couponInput: string;
  onCouponChange: (val: string) => void;
  onApplyCoupon: () => void;
  onRemoveCoupon: () => void;
  appliedCoupon: AppliedCouponInfo | null;
  isApplying: boolean;
}

const CouponSection = ({
  couponInput,
  onCouponChange,
  onApplyCoupon,
  onRemoveCoupon,
  appliedCoupon,
  isApplying,
}: CouponSectionProps) => {
  return (
    <section
      className="
        rounded-2xl border border-purple-200/80
        bg-white/95 p-4 shadow-2xs
        dark:border-[#6d28d9]/60 dark:bg-[#110e20]/95
        sm:p-5
      "
    >
      <div className="flex flex-col gap-3.5 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-start gap-3">
          <Tag className="mt-0.5 h-5 w-5 shrink-0 text-[#7c3aed] dark:text-[#c084fc]" />
          <div>
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-white sm:text-base">
              Have a Coupon Code?
            </h3>
            <p className="mt-0.5 text-xs font-medium text-slate-500 dark:text-slate-400">
              Enter your coupon code and get an instant discount.
            </p>
          </div>
        </div>

        <div className="flex w-full items-center gap-2.5 lg:w-auto">
          <div className="relative flex-1 lg:w-56">
            <Ticket className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={couponInput}
              disabled={isApplying}
              onChange={(e) => onCouponChange(e.target.value.toUpperCase())}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  onApplyCoupon();
                }
              }}
              placeholder="Enter coupon code"
              className="
                w-full rounded-xl border border-purple-200 bg-white
                py-2.5 pl-9 pr-3 text-xs font-semibold uppercase text-slate-900
                placeholder:normal-case placeholder:text-slate-400
                focus:border-[#7c3aed] focus:outline-none disabled:opacity-60
                dark:border-[#2d264d] dark:bg-[#0b0817] dark:text-white
                sm:text-sm
              "
            />
          </div>

          <button
            type="button"
            disabled={isApplying}
            onClick={onApplyCoupon}
            className="
              inline-flex shrink-0 cursor-pointer items-center justify-center gap-1.5
              rounded-xl bg-gradient-to-r from-[#8b3dff] to-[#7c3aed]
              px-5 py-2.5 text-xs font-bold text-white
              shadow-sm shadow-purple-500/25
              transition hover:brightness-110 active:scale-[0.98]
              disabled:opacity-60 sm:text-sm
            "
          >
            {isApplying ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Applying...</span>
              </>
            ) : (
              <span>Apply</span>
            )}
          </button>
        </div>
      </div>

      {appliedCoupon && (
        <div className="mt-3 flex items-center justify-between gap-2 rounded-xl border border-emerald-200/80 bg-emerald-50/80 px-3.5 py-2 text-xs font-semibold text-emerald-700 dark:border-emerald-500/30 dark:bg-emerald-950/35 dark:text-emerald-300">
          <span className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
            <span>
              Coupon <strong>{appliedCoupon.code}</strong> applied — You saved ₹
              {appliedCoupon.discountAmount.toFixed(2)}
            </span>
          </span>

          <button
            type="button"
            onClick={onRemoveCoupon}
            aria-label="Remove coupon"
            className="inline-flex cursor-pointer items-center gap-1 rounded-lg px-2 py-1 text-[11px] font-bold text-rose-600 hover:bg-rose-100/70 dark:text-rose-400 dark:hover:bg-rose-950/50"
          >
            <X className="h-3.5 w-3.5" />
            <span>Remove</span>
          </button>
        </div>
      )}
    </section>
  );
};

export default CouponSection;
