
import { Link } from "react-router-dom";

import {
  Home,
  ChevronRight,
  AlertCircle,
  RefreshCw,
} from "lucide-react";

import { useActivationPlans } from "../hooks/useActivationPlans";

import ActivationHero from "../components/ActivationHero";
import ActivationSteps from "../components/ActivationSteps";
import PlanSelection from "../components/PlanSelection";
import CouponSection from "../components/CouponSection";
import OrderSummary from "../components/OrderSummary";
import ActivationSuccessView from "../components/ActivationSuccessView";

import PageLoader from "../../../../shared/loaders/PageLoader";

const ActivationPlanPage = () => {
  const {
    plans,
    selectedPlan,
    selectedPlanId,
    onSelectPlan,

    couponInput,
    setCouponInput,
    appliedCoupon,
    handleApplyCoupon,
    handleRemoveCoupon,
    isApplyingCoupon,

    pricing,

    isLoading,
    error,
    retryFetchPlans,

    isPaying,
    isInitiatingPayment,
    isVerifyingPayment,

    paymentError,
    successReceipt,

    handleProceedPayment,
  } = useActivationPlans();

  const currentStep = successReceipt
    ? 3
    : appliedCoupon
      ? 2
      : 1;

  return (
    <main className="relative min-h-full w-full overflow-x-clip">
      <div className="mx-auto w-full max-w-[1600px] p-3.5 pb-24 sm:p-6 lg:p-7 lg:pb-8">

        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="
            mb-4 hidden items-center gap-2
            text-xs font-semibold text-slate-600
            dark:text-slate-400 sm:flex
          "
        >
          <Link
            to="/shop/dashboard"
            className="
              inline-flex items-center gap-1.5
              text-[#7c3aed] hover:underline
              dark:text-[#c084fc]
            "
          >
            <Home className="h-3.5 w-3.5" />
            <span>Dashboard</span>
          </Link>

          <ChevronRight className="h-3.5 w-3.5" />

          <span className="text-slate-900 dark:text-white">
            Activate Your Shop
          </span>
        </nav>

        {/* Payment Verification Loader */}
        {isVerifyingPayment ? (
          <div
            className="
              rounded-2xl border border-purple-100
              bg-white/95 p-8
              dark:border-slate-800
              dark:bg-slate-900/95
            "
          >
            <PageLoader
              title="Verifying Your Payment..."
              subtitle="Please do not refresh or close this page while we activate your shop."
            />
          </div>
        ) : successReceipt ? (
          /* Payment Success */
          <ActivationSuccessView receipt={successReceipt} />
        ) : isLoading ? (
          /* Plans Loading */
          <PageLoader variant="plans" />
        ) : error || !selectedPlan ? (
          /* Plans Error */
          <div
            className="
              mx-auto my-8 flex max-w-md flex-col
              items-center justify-center rounded-2xl
              border border-red-200 bg-white/95
              p-7 text-center shadow-sm
              dark:border-red-500/30
              dark:bg-slate-900/95
            "
          >
            <div
              className="
                flex h-12 w-12 items-center
                justify-center rounded-full
                bg-red-100 text-red-600
                dark:bg-red-500/15 dark:text-red-400
              "
            >
              <AlertCircle className="h-6 w-6" />
            </div>

            <h3
              className="
                mt-4 text-base font-semibold
                text-slate-800 dark:text-white
              "
            >
              Unable to Load Plans
            </h3>

            <p
              className="
                mt-2 max-w-sm text-sm leading-relaxed
                text-slate-600 dark:text-slate-400
              "
            >
              We couldn&apos;t fetch the available plans due to a
              temporary issue. Please check your internet
              connection and try again.
            </p>

            <div className="mt-5 flex items-center gap-3">
              <button
                type="button"
                onClick={() => retryFetchPlans()}
                className="
                  inline-flex cursor-pointer items-center
                  gap-2 rounded-xl bg-[#7c3aed]
                  px-4 py-2.5 text-sm font-semibold
                  text-white transition hover:bg-[#6d28d9]
                  active:scale-95
                "
              >
                <RefreshCw className="h-4 w-4" />
                <span>Try Again</span>
              </button>

              <Link
                to="/shop/dashboard"
                className="
                  rounded-xl border border-slate-300
                  px-4 py-2.5 text-sm font-semibold
                  text-slate-700 transition hover:bg-slate-100
                  dark:border-slate-700 dark:text-slate-300
                  dark:hover:bg-slate-800
                "
              >
                Dashboard
              </Link>
            </div>
          </div>
        ) : (
          /* Plans Loaded */
          <>
            {/* Mobile View */}
            <div className="block space-y-4 md:hidden">
              <ActivationHero />

              <ActivationSteps currentStep={currentStep} />

              {isInitiatingPayment && (
                <div
                  role="status"
                  aria-live="polite"
                  className="
                    flex items-center gap-2.5 rounded-2xl
                    border border-purple-200
                    bg-purple-50/95 px-4 py-3
                    text-xs font-bold text-purple-900
                    dark:border-purple-700/60
                    dark:bg-purple-950/60
                    dark:text-purple-200
                  "
                >
                  <span
                    className="
                      h-4 w-4 shrink-0 animate-spin
                      rounded-full border-2
                      border-purple-600 border-t-transparent
                    "
                  />

                  <span>
                    Creating order &amp; opening Razorpay checkout...
                  </span>
                </div>
              )}

              <PlanSelection
                plans={plans}
                selectedPlanId={selectedPlanId}
                onSelectPlan={onSelectPlan}
                layout="mobile"
              />

              <CouponSection
                couponInput={couponInput}
                onCouponChange={setCouponInput}
                onApplyCoupon={handleApplyCoupon}
                onRemoveCoupon={handleRemoveCoupon}
                appliedCoupon={appliedCoupon}
                isApplying={isApplyingCoupon}
              />

              <OrderSummary
                selectedPlan={selectedPlan}
                pricing={pricing}
                onProceedPayment={handleProceedPayment}
                isPaying={isPaying}
                paymentError={paymentError}
              />
            </div>

            {/* Tablet View */}
            <div className="hidden space-y-5 md:block lg:hidden">
              <ActivationHero />

              <ActivationSteps currentStep={currentStep} />

              {isInitiatingPayment && (
                <div
                  role="status"
                  aria-live="polite"
                  className="
                    flex items-center gap-2.5 rounded-2xl
                    border border-purple-200
                    bg-purple-50/95 px-4 py-3
                    text-sm font-bold text-purple-900
                    dark:border-purple-700/60
                    dark:bg-purple-950/60
                    dark:text-purple-200
                  "
                >
                  <span
                    className="
                      h-4 w-4 shrink-0 animate-spin
                      rounded-full border-2
                      border-purple-600 border-t-transparent
                    "
                  />

                  <span>
                    Creating order &amp; opening Razorpay checkout...
                  </span>
                </div>
              )}

              <PlanSelection
                plans={plans}
                selectedPlanId={selectedPlanId}
                onSelectPlan={onSelectPlan}
                layout="tablet"
              />

              <div className="grid grid-cols-1 gap-5 md:grid-cols-12">
                <div className="md:col-span-7">
                  <CouponSection
                    couponInput={couponInput}
                    onCouponChange={setCouponInput}
                    onApplyCoupon={handleApplyCoupon}
                    onRemoveCoupon={handleRemoveCoupon}
                    appliedCoupon={appliedCoupon}
                    isApplying={isApplyingCoupon}
                  />
                </div>

                <div className="md:col-span-5">
                  <OrderSummary
                    selectedPlan={selectedPlan}
                    pricing={pricing}
                    onProceedPayment={handleProceedPayment}
                    isPaying={isPaying}
                    paymentError={paymentError}
                  />
                </div>
              </div>
            </div>

            {/* Desktop View */}
            <div className="hidden space-y-5 lg:block">
              <ActivationHero />

              <ActivationSteps currentStep={currentStep} />

              {isInitiatingPayment && (
                <div
                  role="status"
                  aria-live="polite"
                  className="
                    flex items-center gap-2.5 rounded-2xl
                    border border-purple-200
                    bg-purple-50/95 px-4 py-3
                    text-sm font-bold text-purple-900
                    dark:border-purple-700/60
                    dark:bg-purple-950/60
                    dark:text-purple-200
                  "
                >
                  <span
                    className="
                      h-4 w-4 shrink-0 animate-spin
                      rounded-full border-2
                      border-purple-600 border-t-transparent
                    "
                  />

                  <span>
                    Creating order &amp; opening Razorpay checkout...
                  </span>
                </div>
              )}

              <div className="grid grid-cols-12 items-start gap-6">
                <div className="col-span-8 min-w-0 space-y-5">
                  <PlanSelection
                    plans={plans}
                    selectedPlanId={selectedPlanId}
                    onSelectPlan={onSelectPlan}
                    layout="desktop"
                  />

                  <CouponSection
                    couponInput={couponInput}
                    onCouponChange={setCouponInput}
                    onApplyCoupon={handleApplyCoupon}
                    onRemoveCoupon={handleRemoveCoupon}
                    appliedCoupon={appliedCoupon}
                    isApplying={isApplyingCoupon}
                  />
                </div>

                <div className="col-span-4 min-w-0">
                  <OrderSummary
                    selectedPlan={selectedPlan}
                    pricing={pricing}
                    onProceedPayment={handleProceedPayment}
                    isPaying={isPaying}
                    paymentError={paymentError}
                  />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </main>
  );
};

export default ActivationPlanPage;
