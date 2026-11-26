import { axiosInstance } from "../../../services";
import type { AuthUser } from "../types/auth.types";

// --- Request & Response Types ---

export type OtpChannel = "EMAIL" | "SMS";
export type OtpPurpose =
  | "SHOP_REGISTRATION"
  | "CUSTOMER_REGISTRATION"
  | "PASSWORD_RESET";

export interface SendOtpPayload {
  identifier: string;
  channel: OtpChannel;
  purpose: OtpPurpose;
}

export interface VerifyOtpPayload {
  identifier: string;
  channel: OtpChannel;
  purpose: OtpPurpose;
  otp: string;
}

export interface ResetPasswordPayload {
  identifier: string;
  verificationToken: string;
  newPassword: string;
}

export interface RegisterShopPayload {
  shopName: string;
  mobileNumber: string;
  operatorEmail: string;
  password: string;
  verificationToken: string;
}

export interface RegisterCustomerPayload {
  fullName: string;
  mobileNumber: string;
  email: string;
  password: string;
  verificationToken: string;
}

export interface RegisterResponse {
  success: boolean;
  message: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data?: AuthUser;
}

export interface OtpResponse {
  success: boolean;
  message: string;
  verificationToken?: string;
  data?: {
    verificationToken?: string;
  };
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LogoutResponse {
  success: boolean;
  message: string;
}

// --- API Functions ---

export const registerShop = async (
  userData: RegisterShopPayload
): Promise<RegisterResponse> => {
  const response = await axiosInstance.post<RegisterResponse>(
    "/shops/register",
    userData
  );
  return response.data;
};

export const registerCustomer = async (
  userData: RegisterCustomerPayload
): Promise<RegisterResponse> => {
  const response = await axiosInstance.post<RegisterResponse>(
    "/customers/register",
    userData
  );
  return response.data;
};

export const loginUser = async (
  userData: LoginPayload
): Promise<AuthResponse> => {
  const response = await axiosInstance.post<AuthResponse>(
    "/auth/login",
    userData
  );
  return response.data;
};

export const getCurrentUser = async (): Promise<AuthResponse> => {
  const response = await axiosInstance.get<AuthResponse>("/auth/me");
  return response.data;
};

export const sendEmailOtp = async (
  payload: SendOtpPayload
): Promise<OtpResponse> => {
  const response = await axiosInstance.post<OtpResponse>(
    "/auth/otp/send",
    payload
  );
  return response.data;
};

export const verifyEmailOtp = async (
  payload: VerifyOtpPayload
): Promise<OtpResponse> => {
  const response = await axiosInstance.post<OtpResponse>(
    "/auth/otp/verify",
    payload
  );
  return response.data;
};

export const resetPassword = async (
  payload: ResetPasswordPayload
): Promise<RegisterResponse> => {
  const response = await axiosInstance.post<RegisterResponse>(
    "/auth/reset-password",
    payload
  );
  return response.data;
};

export const logoutUser = async (): Promise<LogoutResponse> => {
  const response = await axiosInstance.post<LogoutResponse>("/auth/logout");
  return response.data;
};

export const logoutAllDevices = async (): Promise<LogoutResponse> => {
  const response = await axiosInstance.post<LogoutResponse>(
    "/auth/logout-all"
  );
  return response.data;
};