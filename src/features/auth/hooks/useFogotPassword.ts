import { useEffect, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";

import { useResetPasswordMutation } from "../api/authQueries";
import { useOtp } from "./useOtp";
import {
  getReadableErrorMessage,
  showErrorToast,
  showSuccessToast,
} from "../../../shared/utils/toastNotification";

export type ForgotPasswordStep = 1 | 2 | 3;

const OTP_EXPIRY_SECONDS = 300;

export const useForgotPassword = () => {
  const navigate = useNavigate();
  const resetPasswordMutation = useResetPasswordMutation();

  const [step, setStep] = useState<ForgotPasswordStep>(1);
  const [email, setEmail] = useState("");
  const [otpDigits, setOtpDigits] = useState<string[]>(["", "", "", "", "", ""]);
  const [verificationToken, setVerificationToken] = useState<string>("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState<string>("");
  const [expirySeconds, setExpirySeconds] = useState<number>(OTP_EXPIRY_SECONDS);

  const {
    isSendingOtp,
    isVerifyingOtp,
    resendCooldown,
    sendOtp,
    verifyOtp,
    resetOtpState,
  } = useOtp({
    purpose: "PASSWORD_RESET",
    onFieldError: (_field, message) => setError(message),
    onClearErrors: () => setError(""),
  });

  useEffect(() => {
    if (step !== 2 || expirySeconds <= 0) return;

    const timer = window.setInterval(() => {
      setExpirySeconds((prev) => (prev <= 1 ? 0 : prev - 1));
    }, 1000);

    return () => window.clearInterval(timer);
  }, [step, expirySeconds]);

  const formattedExpiry = `${String(Math.floor(expirySeconds / 60)).padStart(
    2,
    "0"
  )}:${String(expirySeconds % 60).padStart(2, "0")}`;

  const handleSendOtpSubmit = async (e?: FormEvent) => {
    e?.preventDefault();
    setError("");

    const sent = await sendOtp(email);
    if (sent) {
      setOtpDigits(["", "", "", "", "", ""]);
      setExpirySeconds(OTP_EXPIRY_SECONDS);
      setStep(2);
    }
  };

  const handleResendOtp = async () => {
    if (resendCooldown > 0) return;
    setError("");
    const sent = await sendOtp(email);
    if (sent) {
      setOtpDigits(["", "", "", "", "", ""]);
      setExpirySeconds(OTP_EXPIRY_SECONDS);
    }
  };

  const handleVerifyOtpSubmit = async (e?: FormEvent) => {
    e?.preventDefault();
    setError("");

    const otpCode = otpDigits.join("");
    const response = await verifyOtp(email, otpCode);

    if (response) {
      const token =
        response.data?.verificationToken ?? response.verificationToken ?? "";

      if (!token) {
        const msg = "Verification token missing from server response.";
        setError(msg);
        showErrorToast(msg, msg);
        return;
      }

      setVerificationToken(token);
      setStep(3);
    }
  };

  const handleChangeEmail = () => {
    resetOtpState();
    setOtpDigits(["", "", "", "", "", ""]);
    setVerificationToken("");
    setError("");
    setStep(1);
  };

  const passwordRules = {
    minLength: newPassword.length >= 8,
    hasUppercase: /[A-Z]/.test(newPassword),
    hasNumber: /\d/.test(newPassword),
  };

  const isPasswordValid =
    passwordRules.minLength &&
    passwordRules.hasUppercase &&
    passwordRules.hasNumber;

  const handleResetPasswordSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!verificationToken) {
      const msg = "Session expired. Please verify OTP again.";
      setError(msg);
      showErrorToast(msg, msg);
      setStep(1);
      return;
    }

    if (!isPasswordValid) {
      const msg = "Please meet all password requirements.";
      setError(msg);
      showErrorToast(msg, msg, { toastId: "reset-pwd-rules" });
      return;
    }

    if (newPassword !== confirmPassword) {
      const msg = "Passwords do not match.";
      setError(msg);
      showErrorToast(msg, msg, { toastId: "reset-pwd-mismatch" });
      return;
    }

    try {
      const response = await resetPasswordMutation.mutateAsync({
        identifier: email.trim(),
        verificationToken,
        newPassword,
      });

      if (response.success) {
        showSuccessToast(
          response.message || "Password reset successfully! Please login.",
          { autoClose: 2500, toastId: "reset-pwd-success" }
        );
        navigate("/auth/login", { replace: true });
      } else {
        const msg = response.message || "Failed to reset password.";
        setError(msg);
        showErrorToast(msg, msg);
      }
    } catch (err) {
      const msg = getReadableErrorMessage(err, "Failed to reset password.");
      setError(msg);
      showErrorToast(err, "Failed to reset password.");
    }
  };

  return {
    step,
    email,
    setEmail,
    otpDigits,
    setOtpDigits,
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    error,
    setError,
    isSendingOtp,
    isVerifyingOtp,
    isResetting: resetPasswordMutation.isPending,
    resendCooldown,
    formattedExpiry,
    passwordRules,
    handleSendOtpSubmit,
    handleResendOtp,
    handleVerifyOtpSubmit,
    handleChangeEmail,
    handleResetPasswordSubmit,
  };
};
