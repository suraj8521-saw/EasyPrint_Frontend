
import {
  useState,
  useMemo,
  useEffect,
  useRef,
  useCallback,
} from "react";

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  getActivePlans,
  validateActivationCoupon,
  initiateShopActivation,
  verifyShopActivation,
} from "../api/activationPlanApi";

import type {
  ActivationSuccessReceipt,
  AppliedCouponInfo,
  NormalizedActivationPlan,
  RazorpayHandlerSuccessResponse,
} from "../types/activation.types";

import { extractPlansList } from "../utils/planNormalizer";
import { openRazorpayCheckout } from "../utils/razorpayCheckout";

import {
  AUTH_QUERY_KEYS,
  useAuthSession,
} from "../../../auth/api/authQueries";

import {
  getReadableErrorMessage,
  showErrorToast,
  showInfoToast,
  showSuccessToast,
} from "../../../../shared/utils/toastNotification";

export function useActivationPlans() {
  const queryClient = useQueryClient();
  const { user } = useAuthSession();

  // Plan and coupon states
  const [selectedPlanId, setSelectedPlanId] =
    useState<string | null>(null);

  const [couponInput, setCouponInput] = useState("");

  const [appliedCoupon, setAppliedCoupon] =
    useState<AppliedCouponInfo | null>(null);

  // Payment states
  const [isCheckoutOpen, setIsCheckoutOpen] =
    useState(false);

  const [isPaymentProcessing, setIsPaymentProcessing] =
    useState(false);

  const [paymentError, setPaymentError] =
    useState<string | null>(null);

  const [successReceipt, setSuccessReceipt] =
    useState<ActivationSuccessReceipt | null>(null);

  // Lifecycle and duplicate-click protection
  const isCheckoutOpenRef = useRef(false);
  const isMountedRef = useRef(false);
  const paymentInProgressRef = useRef(false);

  // Fetch activation plans
  const plansQuery = useQuery<
    NormalizedActivationPlan[],
    Error
  >({
    queryKey: ["shop", "activation-plans"],

    queryFn: async () =>
      extractPlansList(await getActivePlans()),

    staleTime: 5 * 60 * 1000,

    retry: false,
  });

  const plans: NormalizedActivationPlan[] =
    plansQuery.data ?? [];

  // Resolve selected plan
  const resolvedSelectedPlanId = useMemo<string | null>(() => {
    if (
      selectedPlanId &&
      plans.some((plan) => plan.id === selectedPlanId)
    ) {
      return selectedPlanId;
    }

    const best =
      plans.find((plan) => plan.isBestValue) ||
      plans[0];

    return best ? best.id : null;
  }, [plans, selectedPlanId]);

  const selectedPlan = useMemo<NormalizedActivationPlan | null>(
    () =>
      plans.find(
        (plan) => plan.id === resolvedSelectedPlanId
      ) ||
      plans[0] ||
      null,
    [plans, resolvedSelectedPlanId]
  );

  // Coupon validation mutation
  const validateCouponMutation = useMutation({
    mutationFn: validateActivationCoupon,

    onSuccess: (response, variables) => {
      const couponData = response.data;

      if (response.success && couponData && couponData.valid) {
        setAppliedCoupon({
          code: variables.code,
          discountAmount: Number(
            couponData.discountAmount ?? 0
          ),
          finalAmount: Number(
            couponData.finalAmount ?? variables.baseAmount
          ),
        });

        showSuccessToast(
          couponData.message ||
            response.message ||
            "Coupon applied successfully!"
        );
      } else {
        setAppliedCoupon(null);

        showErrorToast(
          couponData?.message ||
            response.message ||
            "Invalid coupon code.",
          "Invalid coupon code."
        );
      }
    },

    onError: (err) => {
      setAppliedCoupon(null);

      showErrorToast(
        err,
        "Failed to validate coupon code."
      );
    },
  });

  // Payment mutations
  const verifyPaymentMutation = useMutation({
    mutationFn: verifyShopActivation,
  });

  const initiateActivationMutation = useMutation({
    mutationFn: initiateShopActivation,
  });

  const resetInitiate = initiateActivationMutation.reset;
  const resetVerify = verifyPaymentMutation.reset;

  // Checkout modal state
  const setCheckoutModalOpen = useCallback(
    (open: boolean) => {
      isCheckoutOpenRef.current = open;

      if (isMountedRef.current) {
        setIsCheckoutOpen(open);
      }
    },
    []
  );

  // Reset complete payment state
  const resetPaymentState = useCallback(() => {
    paymentInProgressRef.current = false;
    isCheckoutOpenRef.current = false;

    if (isMountedRef.current) {
      setIsCheckoutOpen(false);
      setIsPaymentProcessing(false);
    }

    resetInitiate();
    resetVerify();
  }, [resetInitiate, resetVerify]);

  // Component lifecycle
  useEffect(() => {
    isMountedRef.current = true;

    return () => {
      isMountedRef.current = false;

      // Clear references without updating unmounted state
      isCheckoutOpenRef.current = false;
      paymentInProgressRef.current = false;
    };
  }, []);

  // Plan selection
  const handleSelectPlan = (planId: string) => {
    setPaymentError(null);

    if (planId !== resolvedSelectedPlanId) {
      setSelectedPlanId(planId);
      setAppliedCoupon(null);
    }
  };

  // Apply coupon
  const handleApplyCoupon = () => {
    if (!selectedPlan) return;

    const trimmedCode = couponInput.trim().toUpperCase();

    if (!trimmedCode) {
      showErrorToast(
        "Please enter a coupon code.",
        "Please enter a coupon code."
      );

      return;
    }

    validateCouponMutation.mutate({
      code: trimmedCode,
      baseAmount: Number(selectedPlan.price),
      targetCategory: selectedPlan.targetCategory,
    });
  };

  // Remove coupon
  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponInput("");

    showInfoToast("Coupon removed.");
  };

  // Pricing calculation
  const pricing = useMemo(() => {
    const basePrice = Number(selectedPlan?.price ?? 0);

    const discount = appliedCoupon
      ? Math.min(
          Number(appliedCoupon.discountAmount || 0),
          basePrice
        )
      : 0;

    const totalPayable = appliedCoupon
      ? Math.max(
          0,
          Number(appliedCoupon.finalAmount)
        )
      : basePrice;

    return {
      basePrice,
      discount,
      totalPayable,
      couponCode: appliedCoupon?.code,
    };
  }, [selectedPlan, appliedCoupon]);

  // Centralized payment failure handler
  const reportPaymentFailure = (
    err: unknown,
    fallback: string
  ) => {
    resetPaymentState();

    const msg = getReadableErrorMessage(err, fallback);

    if (isMountedRef.current) {
      setPaymentError(msg);
    }

    showErrorToast(msg, fallback);
  };

  // Update shop authentication cache after activation
  const unlockShopCache = () => {
    queryClient.setQueryData(
      AUTH_QUERY_KEYS.currentUser,
      (oldData: unknown) => {
        if (!oldData || typeof oldData !== "object") {
          return oldData;
        }

        const typed = oldData as {
          success?: boolean;
          data?: Record<string, unknown>;
        };

        if (!typed.data) return oldData;

        return {
          ...typed,
          data: {
            ...typed.data,
            verificationStatus: "VERIFIED",
          },
        };
      }
    );

    void queryClient.invalidateQueries({
      queryKey: AUTH_QUERY_KEYS.currentUser,
    });

    void queryClient.invalidateQueries({
      queryKey: AUTH_QUERY_KEYS.shopProfile,
    });
  };

  // Convert Razorpay callbacks into a Promise
  const awaitRazorpayResult = (params: {
    orderId: string;
    amountInRupees: number;
    currency: string;
    planName: string;
    shopCode?: string;
  }): Promise<RazorpayHandlerSuccessResponse | null> => {
    return new Promise((resolve, reject) => {
      let finished = false;

      const finishResolve = (
        value: RazorpayHandlerSuccessResponse | null
      ) => {
        if (finished) return;

        finished = true;
        resolve(value);
      };

      const finishReject = (reason: unknown) => {
        if (finished) return;

        finished = true;
        reject(reason);
      };

      void openRazorpayCheckout({
        orderId: params.orderId,
        amountInRupees: params.amountInRupees,
        currency: params.currency,
        planName: params.planName,
        shopCode: params.shopCode,

        userName: user?.name,
        userEmail: user?.email,

        onSuccess: (rzpResponse) => {
          finishResolve(rzpResponse);
        },

        onDismiss: () => {
          finishResolve(null);
        },

        onPaymentFailed: (description) => {
          finishReject(new Error(description));
        },
      }).catch((sdkError) => {
        finishReject(sdkError);
      });
    });
  };

  // Main payment handler
  const handleProceedPayment = async () => {
    // Prevent duplicate payment requests
    if (
      paymentInProgressRef.current ||
      initiateActivationMutation.isPending ||
      verifyPaymentMutation.isPending ||
      isCheckoutOpenRef.current
    ) {
      return;
    }

    if (!selectedPlan) {
      reportPaymentFailure(
        "Please select an activation plan first.",
        "Please select an activation plan first."
      );

      return;
    }

    paymentInProgressRef.current = true;

    setIsPaymentProcessing(true);
    setPaymentError(null);

    try {
      // Step 1: Initiate activation order
      const initResponse =
        await initiateActivationMutation.mutateAsync({
          planId: selectedPlan.id,

          ...(appliedCoupon?.code
            ? { couponCode: appliedCoupon.code }
            : {}),
        });

      if (
        !initResponse?.success ||
        !initResponse?.data?.razorpayOrderId
      ) {
        reportPaymentFailure(
          initResponse?.message ||
            "Unable to initiate payment.",
          "Unable to initiate payment."
        );

        return;
      }

      const {
        razorpayOrderId,
        finalAmount,
        currency,
        shopCode,
      } = initResponse.data;

      const amountToCharge = Number(
        finalAmount ?? pricing.totalPayable
      );

      // Step 2: Open Razorpay checkout
      setCheckoutModalOpen(true);

      const rzpResponse = await awaitRazorpayResult({
        orderId: razorpayOrderId,
        amountInRupees: amountToCharge,
        currency: currency || "INR",
        planName: selectedPlan.name,
        shopCode,
      });

      setCheckoutModalOpen(false);

      // User closed Razorpay checkout
      if (!rzpResponse) {
        showInfoToast("Payment window closed.");
        return;
      }

      // Step 3: Verify payment with backend
      const verifyRes =
        await verifyPaymentMutation.mutateAsync({
          razorpayOrderId:
            rzpResponse.razorpay_order_id,

          razorpayPaymentId:
            rzpResponse.razorpay_payment_id,

          razorpaySignature:
            rzpResponse.razorpay_signature,
        });

      if (!verifyRes?.success) {
        reportPaymentFailure(
          verifyRes?.message ||
            "Payment verification failed.",
          "Payment verification failed."
        );

        return;
      }

      // Step 4: Payment verified successfully
      setPaymentError(null);

      showSuccessToast(
        verifyRes.message ||
          "Payment verified! Your shop is now activated."
      );

      unlockShopCache();

      setSuccessReceipt({
        planName: selectedPlan.name,
        validity: selectedPlan.summaryValidity,
        amountPaid: amountToCharge,
        couponCode: appliedCoupon?.code,
        discountAmount: pricing.discount,
        razorpayOrderId:
          rzpResponse.razorpay_order_id,
        razorpayPaymentId:
          rzpResponse.razorpay_payment_id,
        shopCode,
      });
    } catch (error) {
      reportPaymentFailure(
        error,
        "Failed to process payment. Please try again."
      );
    } finally {
      // Always unlock button and reset mutation states
      resetPaymentState();
    }
  };

  return {
    plans,

    selectedPlan,
    selectedPlanId: resolvedSelectedPlanId,
    onSelectPlan: handleSelectPlan,

    couponInput,
    setCouponInput,
    appliedCoupon,
    handleApplyCoupon,
    handleRemoveCoupon,

    isApplyingCoupon: validateCouponMutation.isPending,

    pricing,

    isLoading: plansQuery.isLoading,
    error: plansQuery.error?.message || null,
    retryFetchPlans: () => plansQuery.refetch(),

    // Complete payment state
    isPaying:
      isPaymentProcessing ||
      initiateActivationMutation.isPending ||
      verifyPaymentMutation.isPending ||
      isCheckoutOpen,

    isInitiatingPayment:
      initiateActivationMutation.isPending,

    isVerifyingPayment:
      verifyPaymentMutation.isPending,

    paymentError,
    successReceipt,

    handleProceedPayment,
    resetPaymentState,
  };
}
