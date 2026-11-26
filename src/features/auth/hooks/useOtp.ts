import { useEffect, useState } from "react";

import { type OtpPurpose } from "../api/authApi";
import { useSendOtpMutation, useVerifyOtpMutation } from "../api/authQueries";
import {
  getReadableErrorMessage,
  showErrorToast,
  showSuccessToast,
} from "../../../shared/utils/toastNotification";

interface UseOtpOptions {
  purpose: OtpPurpose;
  onFieldError?: (field: "email" | "otp", message: string) => void;
  onClearErrors?: () => void;
  onVerifiedSuccess?: () => void;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const OTP_COOLDOWN_SECONDS = 60;

export const useOtp = ({
  purpose,
  onFieldError,
  onClearErrors,
  onVerifiedSuccess,
}: UseOtpOptions) => {
  const sendOtpMutation = useSendOtpMutation();
  const verifyOtpMutation = useVerifyOtpMutation();

  const [otpSent, setOtpSent] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

  useEffect(() => {
    if (resendCooldown <= 0) return;

    const timer = window.setInterval(() => {
      setResendCooldown((prev) => (prev <= 1 ? 0 : prev - 1));
    }, 1000);

    return () => window.clearInterval(timer);
  }, [resendCooldown]);

  const isMobile = () => window.matchMedia("(max-width: 639px)").matches;

  const showFeedbackError = (
    field: "email" | "otp",
    error: unknown,
    fallback: string,
    toastId?: string
  ) => {
    const message = getReadableErrorMessage(error, fallback);
    if (isMobile()) {
      onFieldError?.(field, message);
    } else {
      showErrorToast(message, fallback, toastId ? { toastId } : undefined);
    }
  };

  const sendOtp = async (email: string): Promise<boolean> => {
    if (resendCooldown > 0) return false;

    const trimmedEmail = email.trim();

    if (!trimmedEmail || !EMAIL_REGEX.test(trimmedEmail)) {
      const msg = "Please enter a valid email address first.";
      onFieldError?.("email", msg);
      if (!isMobile()) showErrorToast(msg, msg, { toastId: "otp-email-error" });
      return false;
    }

    try {
      const response = await sendOtpMutation.mutateAsync({
        identifier: trimmedEmail,
        channel: "EMAIL",
        purpose,
      });

      if (response.success) {
        setOtpSent(true);
        setResendCooldown(OTP_COOLDOWN_SECONDS);
        showSuccessToast(response.message || "OTP sent to your email!", {
          toastId: "otp-sent",
        });
        return true;
      }

      showFeedbackError(
        "email",
        response.message,
        "Failed to send OTP.",
        "otp-send-fail"
      );
      return false;
    } catch (error) {
      showFeedbackError("email", error, "Failed to send OTP.", "otp-send-fail");
      return false;
    }
  };

  const verifyOtp = async (email: string, otp: string) => {
    const trimmedEmail = email.trim();

    if (otp.length !== 6) {
      const msg = "Please enter the 6-digit OTP.";
      onFieldError?.("otp", msg);
      if (!isMobile())
        showErrorToast(msg, msg, { toastId: "otp-length-error" });
      return null;
    }

    try {
      const response = await verifyOtpMutation.mutateAsync({
        identifier: trimmedEmail,
        channel: "EMAIL",
        purpose,
        otp,
      });

      if (response.success) {
        setIsEmailVerified(true);
        setOtpSent(false);
        setResendCooldown(0);
        onClearErrors?.();
        onVerifiedSuccess?.();
        showSuccessToast(response.message || "Email verified successfully!", {
          toastId: "otp-verified",
        });
        return response;
      }

      showFeedbackError(
        "otp",
        response.message,
        "Invalid OTP.",
        "otp-verify-fail"
      );
      return null;
    } catch (error) {
      showFeedbackError(
        "otp",
        error,
        "Invalid or expired OTP.",
        "otp-verify-fail"
      );
      return null;
    }
  };

  const resetOtpState = () => {
    setOtpSent(false);
    setIsEmailVerified(false);
    setResendCooldown(0);
  };

  return {
    isSendingOtp: sendOtpMutation.isPending,
    isVerifyingOtp: verifyOtpMutation.isPending,
    otpSent,
    isEmailVerified,
    resendCooldown,
    sendOtp,
    verifyOtp,
    resetOtpState,
  };
};
