import { axiosInstance } from "../../../../services";
import type {
  InitiateActivationPayload,
  InitiateActivationResponse,
  ValidateCouponPayload,
  ValidateCouponResponse,
  VerifyActivationPayload,
  VerifyActivationResponse,
} from "../types/activation.types";

/**
 * 1. Fetch Active Activation Plans
 */
export const getActivePlans = async (): Promise<unknown> => {
  const response = await axiosInstance.get("/plans/active");
  return response.data;
};

/**
 * 2. Validate Coupon Code via Backend
 * POST /pricing/validate-coupon
 */
export const validateActivationCoupon = async (
  payload: ValidateCouponPayload
): Promise<ValidateCouponResponse> => {
  const response = await axiosInstance.post<ValidateCouponResponse>(
    "/pricing/validate-coupon",
    payload
  );
  return response.data;
};

/**
 * 3. Initiate Shop Activation Order (Generates Razorpay Order ID)
 * POST /shop/activation/initiate
 */
export const initiateShopActivation = async (
  payload: InitiateActivationPayload
): Promise<InitiateActivationResponse> => {
  const response = await axiosInstance.post<InitiateActivationResponse>(
    "/shop/activation/initiate",
    payload
  );
  return response.data;
};

/**
 * 4. Verify Razorpay Payment Signature & Activate Shop
 * POST /shop/activation/verify
 */
export const verifyShopActivation = async (
  payload: VerifyActivationPayload
): Promise<VerifyActivationResponse> => {
  const response = await axiosInstance.post<VerifyActivationResponse>(
    "/shop/activation/verify",
    payload
  );
  return response.data;
};
