import { AxiosError } from "axios";
import { toast, type ToastOptions } from "react-toastify";

interface ApiErrorPayload {
  message?: string;
  error?: string;
  data?: {
    message?: string;
  };
}

/**
 * Extracts a clean, user-friendly error message from any Axios / JS / API error object
 */
export const getReadableErrorMessage = (
  error: unknown,
  fallback = "Something went wrong. Please try again."
): string => {
  if (typeof error === "string" && error.trim()) {
    return error.trim();
  }

  if (error instanceof AxiosError) {
    const payload = error.response?.data as ApiErrorPayload | undefined;
    return (
      payload?.message ||
      payload?.data?.message ||
      payload?.error ||
      error.message ||
      fallback
    );
  }

  if (error instanceof Error && error.message) {
    return error.message;
  }

  if (typeof error === "object" && error !== null) {
    const obj = error as ApiErrorPayload;
    if (typeof obj.message === "string" && obj.message.trim()) {
      return obj.message.trim();
    }
    if (typeof obj.data?.message === "string" && obj.data.message.trim()) {
      return obj.data.message.trim();
    }
  }

  return fallback;
};

/**
 * Universal Toastify Error Handler
 */
export const showErrorToast = (
  error: unknown,
  fallback = "Something went wrong. Please try again.",
  options?: ToastOptions
): string => {
  const message = getReadableErrorMessage(error, fallback);
  toast.error(message, {
    toastId: options?.toastId ?? `err-${message.slice(0, 32)}`,
    ...options,
  });
  return message;
};

/**
 * Universal Toastify Success Handler
 */
export const showSuccessToast = (
  message: string,
  options?: ToastOptions
): void => {
  toast.success(message, {
    toastId: options?.toastId ?? `ok-${message.slice(0, 32)}`,
    ...options,
  });
};

/**
 * Universal Toastify Info Handler
 */
export const showInfoToast = (
  message: string,
  options?: ToastOptions
): void => {
  toast.info(message, {
    toastId: options?.toastId ?? `info-${message.slice(0, 32)}`,
    ...options,
  });
};
