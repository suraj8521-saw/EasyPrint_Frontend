import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

import {
  getCurrentUser,
  loginUser,
  logoutAllDevices,
  logoutUser,
  registerCustomer,
  registerShop,
  resetPassword,
  sendEmailOtp,
  verifyEmailOtp,
  type AuthResponse,
  type LoginPayload,
  type LogoutResponse,
  type RegisterCustomerPayload,
  type RegisterResponse,
  type RegisterShopPayload,
  type ResetPasswordPayload,
  type SendOtpPayload,
  type VerifyOtpPayload,
  type OtpResponse,
} from "./authApi";
import type { AuthUser } from "../types/auth.types";

export const AUTH_QUERY_KEYS = {
  currentUser: ["auth", "me"] as const,
  shopProfile: ["shop", "profile"] as const,
};

interface ApiErrorBody {
  message?: string;
}

export const extractApiErrorMessage = (
  error: unknown,
  fallback: string
): string => {
  if (error instanceof AxiosError) {
    return (error.response?.data as ApiErrorBody)?.message || fallback;
  }
  if (error instanceof Error && error.message) {
    return error.message;
  }
  return fallback;
};

/**
 * 1. Current User Server State (/auth/me)
 */
export const useCurrentUserQuery = () => {
  return useQuery<AuthResponse, Error>({
    queryKey: AUTH_QUERY_KEYS.currentUser,
    queryFn: getCurrentUser,
    staleTime: 5 * 60 * 1000,
    retry: false,
    refetchOnWindowFocus: false,
  });
};

/**
 * Helper hook to read current user & auth status directly from TanStack Query cache
 */
export const useAuthSession = () => {
  const query = useCurrentUserQuery();
  const user: AuthUser | null =
    query.data?.success && query.data?.data ? query.data.data : null;

  return {
    user,
    isAuthenticated: Boolean(user),
    isCheckingAuth: query.isLoading,
    refetchUser: query.refetch,
  };
};

/**
 * 2. Profile / Shopkeeper Profile Server State
 */
export const useShopkeeperProfileQuery = (enabled = true) => {
  return useQuery<AuthResponse, Error>({
    queryKey: AUTH_QUERY_KEYS.shopProfile,
    enabled,
    queryFn: getCurrentUser,
    staleTime: 5 * 60 * 1000,
    retry: false,
  });
};

/**
 * 3. Login Mutation
 */
export const useLoginMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<AuthResponse, unknown, LoginPayload>({
    mutationFn: loginUser,
    onSuccess: (response) => {
      if (response.success && response.data) {
        queryClient.setQueryData(AUTH_QUERY_KEYS.currentUser, response);
        if (response.data.role === "OPERATOR") {
          queryClient.setQueryData(AUTH_QUERY_KEYS.shopProfile, response);
        }
      }
    },
  });
};

/**
 * 4. Shopkeeper Registration Mutation
 */
export const useRegisterShopMutation = () =>
  useMutation<RegisterResponse, unknown, RegisterShopPayload>({
    mutationFn: registerShop,
  });

/**
 * 5. Customer Registration Mutation
 */
export const useRegisterCustomerMutation = () =>
  useMutation<RegisterResponse, unknown, RegisterCustomerPayload>({
    mutationFn: registerCustomer,
  });

/**
 * 6. Send Email OTP Mutation
 */
export const useSendOtpMutation = () =>
  useMutation<OtpResponse, unknown, SendOtpPayload>({
    mutationFn: sendEmailOtp,
  });

/**
 * 7. Verify Email OTP Mutation
 */
export const useVerifyOtpMutation = () =>
  useMutation<OtpResponse, unknown, VerifyOtpPayload>({
    mutationFn: verifyEmailOtp,
  });

/**
 * 8. Reset Password Mutation
 */
export const useResetPasswordMutation = () =>
  useMutation<RegisterResponse, unknown, ResetPasswordPayload>({
    mutationFn: resetPassword,
  });

/**
 * 9. Single Device Logout Mutation
 */
export const useLogoutMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<LogoutResponse, unknown, void>({
    mutationFn: logoutUser,
    onSettled: () => {
      queryClient.setQueryData(AUTH_QUERY_KEYS.currentUser, {
        success: false,
        message: "Logged out",
        data: undefined,
      });
      queryClient.removeQueries({ queryKey: AUTH_QUERY_KEYS.shopProfile });
    },
  });
};

/**
 * 10. All Devices Logout Mutation
 */
export const useLogoutAllDevicesMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<LogoutResponse, unknown, void>({
    mutationFn: logoutAllDevices,
    onSettled: () => {
      queryClient.setQueryData(AUTH_QUERY_KEYS.currentUser, {
        success: false,
        message: "Logged out from all devices",
        data: undefined,
      });
      queryClient.removeQueries({ queryKey: AUTH_QUERY_KEYS.shopProfile });
    },
  });
};
