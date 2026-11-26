export interface RawActivationPlan {
  id?: string | number;
  _id?: string | number;
  planName?: string;
  name?: string;
  title?: string;
  targetCategory?: string;
  durationDays?: number;
  validityDays?: number;
  basePrice?: number;
  price?: number;
  amount?: number;
  isActive?: boolean;
  features?: string[];
}

export interface NormalizedActivationPlan {
  id: string;
  name: string;
  targetCategory: string;
  durationDays: number;
  validityLabel: string;
  summaryValidity: string;
  price: number;
  iconType: "crown" | "calendar";
  isBestValue: boolean;
  badgeText: string;
  features: string[];
}

export interface ValidateCouponPayload {
  code: string;
  baseAmount: number;
  targetCategory: string;
}

export interface ValidateCouponResponse {
  success: boolean;
  message: string;
  timestamp?: string;
  data?: {
    discountAmount: number;
    finalAmount: number;
    message: string;
    valid: boolean;
  };
}

export interface AppliedCouponInfo {
  code: string;
  discountAmount: number;
  finalAmount: number;
}

export interface InitiateActivationPayload {
  planId: string;
  couponCode?: string;
}

export interface InitiateActivationResponse {
  success: boolean;
  message: string;
  timestamp?: string;
  data?: {
    currency: string;
    finalAmount: number;
    razorpayOrderId: string;
    shopCode: string;
  };
}

export interface RazorpayHandlerSuccessResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

export interface VerifyActivationPayload {
  razorpayOrderId: string;
  razorpayPaymentId: string;
  razorpaySignature: string;
}

export interface VerifyActivationResponse {
  success: boolean;
  message: string;
  timestamp?: string;
  data?: unknown;
}

export interface ActivationSuccessReceipt {
  planName: string;
  validity: string;
  amountPaid: number;
  couponCode?: string;
  discountAmount: number;
  razorpayOrderId: string;
  razorpayPaymentId: string;
  shopCode?: string;
}
