import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import {
  CheckCircle2,
  ArrowRight,
  Star,
  Sparkles,
  Receipt,
  Send,
} from "lucide-react";

import type { ActivationSuccessReceipt } from "../types/activation.types";
import { useAuthSession } from "../../../auth/api/authQueries";
import { saveLandingFeedback } from "../../../../ui/home/data/feedbacksData";
import {
  showErrorToast,
  showSuccessToast,
} from "../../../../shared/utils/toastNotification";

interface ActivationSuccessViewProps {
  receipt: ActivationSuccessReceipt;
}

const ActivationSuccessView = ({ receipt }: ActivationSuccessViewProps) => {
  const navigate = useNavigate();
  const { user } = useAuthSession();

  const [rating, setRating] = useState<number>(5);
  const [hoveredRating, setHoveredRating] = useState<number>(0);
  const [reviewMessage, setReviewMessage] = useState<string>("");
  const [hasSubmittedReview, setHasSubmittedReview] = useState<boolean>(false);

  const handleSubmitReview = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (rating < 1) {
      showErrorToast("Please select a star rating.", "Please select a star rating.", {
        toastId: "rating-required",
      });
      return;
    }

    const trimmedMsg = reviewMessage.trim();
    if (!trimmedMsg) {
      showErrorToast(
        "Please write a short feedback message.",
        "Please write a short feedback message.",
        { toastId: "review-msg-required" }
      );
      return;
    }

    saveLandingFeedback({
      name: user?.name || "Shopkeeper",
      role: "Shopkeeper",
      rating,
      message: trimmedMsg,
    });

    setHasSubmittedReview(true);
    showSuccessToast(
      "Thank you! Your rating & feedback are now live on our landing page.",
      { toastId: "feedback-submitted" }
    );
  };

  return (
    <div className="mx-auto w-full max-w-2xl py-2 sm:py-4">
      <div className="overflow-hidden rounded-3xl border border-emerald-200/80 bg-white/95 p-5 shadow-xl dark:border-emerald-500/25 dark:bg-[#110e20]/95 sm:p-8">
        {/* Success Icon & Header */}
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 shadow-inner dark:bg-emerald-500/20 dark:text-emerald-400 sm:h-20 sm:w-20">
            <CheckCircle2 className="h-10 w-10 sm:h-12 sm:w-12" strokeWidth={2.2} />
          </div>

          <span className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-3.5 py-1 text-xs font-bold text-emerald-600 dark:text-emerald-400">
            <Sparkles className="h-3.5 w-3.5" />
            Shop Activated Successfully
          </span>

          <h1 className="mt-3 text-2xl font-black tracking-tight text-slate-900 dark:text-white sm:text-3xl">
            Payment Successful!
          </h1>

          <p className="mx-auto mt-2 max-w-md text-xs leading-5 text-slate-600 dark:text-slate-300 sm:text-sm sm:leading-6">
            Congratulations! Your shop is now unlocked and ready to manage
            services, set pricing, generate QR codes, and receive print orders.
          </p>
        </div>

        {/* Receipt Summary Card */}
        <div className="mt-6 rounded-2xl border border-purple-100 bg-purple-50/60 p-4 dark:border-slate-800 dark:bg-slate-900/70 sm:p-5">
          <div className="mb-3 flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-purple-700 dark:text-purple-400">
            <Receipt className="h-4 w-4" />
            <span>Activation Receipt</span>
          </div>

          <div className="space-y-2 text-xs sm:text-sm">
            <div className="flex items-center justify-between">
              <span className="text-slate-500 dark:text-slate-400">Plan</span>
              <span className="font-bold text-slate-900 dark:text-white">
                {receipt.planName} ({receipt.validity})
              </span>
            </div>

            {receipt.shopCode && (
              <div className="flex items-center justify-between">
                <span className="text-slate-500 dark:text-slate-400">
                  Shop Code
                </span>
                <span className="font-mono font-bold text-purple-700 dark:text-purple-300">
                  {receipt.shopCode}
                </span>
              </div>
            )}

            {receipt.couponCode && (
              <div className="flex items-center justify-between">
                <span className="text-slate-500 dark:text-slate-400">
                  Coupon ({receipt.couponCode})
                </span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">
                  - ₹{receipt.discountAmount}
                </span>
              </div>
            )}

            <div className="flex items-center justify-between">
              <span className="text-slate-500 dark:text-slate-400">
                Amount Paid
              </span>
              <span className="text-base font-extrabold text-slate-900 dark:text-white">
                ₹{receipt.amountPaid}
              </span>
            </div>

            <div className="flex items-center justify-between gap-4 border-t border-purple-200/70 pt-2 dark:border-slate-800">
              <span className="shrink-0 text-slate-500 dark:text-slate-400">
                Payment ID
              </span>
              <span className="truncate font-mono text-xs font-semibold text-slate-700 dark:text-slate-300">
                {receipt.razorpayPaymentId}
              </span>
            </div>
          </div>
        </div>

        {/* Rating & Experience Feedback Form (Syncs to Landing Page Reviews) */}
        <div className="mt-6 rounded-2xl border border-slate-200/90 bg-slate-50/70 p-4 dark:border-slate-800 dark:bg-slate-900/50 sm:p-5">
          {hasSubmittedReview ? (
            <div className="py-2 text-center">
              <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                ★ {rating}.0 — Feedback Submitted!
              </p>
              <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
                &ldquo;{reviewMessage}&rdquo;
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmitReview} className="space-y-3.5">
              <div>
                <h2 className="text-sm font-extrabold text-slate-900 dark:text-white sm:text-base">
                  Rate Your Activation Experience
                </h2>
                <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                  Share a quick rating &amp; message — your feedback will be
                  featured on our landing page.
                </p>
              </div>

              {/* Interactive Star Selector */}
              <div className="flex items-center gap-1.5">
                {[1, 2, 3, 4, 5].map((starValue) => {
                  const active = (hoveredRating || rating) >= starValue;
                  return (
                    <button
                      key={starValue}
                      type="button"
                      onClick={() => setRating(starValue)}
                      onMouseEnter={() => setHoveredRating(starValue)}
                      onMouseLeave={() => setHoveredRating(0)}
                      aria-label={`Rate ${starValue} out of 5 stars`}
                      className="cursor-pointer rounded-lg p-1 transition-transform hover:scale-110 active:scale-95"
                    >
                      <Star
                        className={`h-7 w-7 ${
                          active
                            ? "fill-amber-400 text-amber-400"
                            : "fill-slate-200 text-slate-300 dark:fill-slate-800 dark:text-slate-600"
                        }`}
                      />
                    </button>
                  );
                })}
                <span className="ml-2 text-xs font-bold text-slate-700 dark:text-slate-300">
                  {rating}.0 / 5.0
                </span>
              </div>

              {/* Feedback Message Box */}
              <textarea
                rows={3}
                value={reviewMessage}
                onChange={(e) => setReviewMessage(e.target.value)}
                placeholder="Write your experience with EasyPrint..."
                className="
                  w-full resize-none rounded-xl border border-slate-200 bg-white
                  px-3.5 py-2.5 text-xs text-slate-900 placeholder:text-slate-400
                  focus:border-purple-500 focus:outline-none
                  dark:border-slate-700 dark:bg-slate-950 dark:text-white
                  sm:text-sm
                "
              />

              <button
                type="submit"
                className="
                  inline-flex cursor-pointer items-center gap-2 rounded-xl
                  border border-purple-300 bg-purple-50 px-4 py-2
                  text-xs font-bold text-purple-700
                  hover:bg-purple-100
                  dark:border-purple-700 dark:bg-purple-950/60 dark:text-purple-300 dark:hover:bg-purple-900/60
                "
              >
                <Send className="h-3.5 w-3.5" />
                <span>Submit Feedback</span>
              </button>
            </form>
          )}
        </div>

        {/* Return to Dashboard CTA */}
        <div className="mt-6">
          <button
            type="button"
            onClick={() => navigate("/shop/dashboard", { replace: true })}
            className="
              flex w-full cursor-pointer items-center justify-center gap-2.5
              rounded-2xl bg-gradient-to-r from-[#8b3dff] to-[#6d28d9]
              px-6 py-4 text-sm font-extrabold text-white
              shadow-lg shadow-purple-500/25
              transition hover:brightness-110 active:scale-[0.98]
              sm:text-base
            "
          >
            <span>Return to Dashboard</span>
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActivationSuccessView;
