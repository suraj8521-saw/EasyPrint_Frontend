import { useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";

import type { RegisterRole } from "../types/auth.types";
import {
  useRegisterShopMutation,
  useRegisterCustomerMutation,
} from "../api/authQueries";
import { validateRegisterForm } from "../validators/registerValidations";
import { useOtp } from "./useOtp";
import {
  getReadableErrorMessage,
  showErrorToast,
  showSuccessToast,
} from "../../../shared/utils/toastNotification";

export interface RegisterFormData {
  shopName: string;
  fullName: string;
  mobileNumber: string;
  email: string;
  otp: string;
  password: string;
  confirmPassword: string;
}

export type RegisterFormErrors = Partial<
  Record<keyof RegisterFormData | "form", string>
>;

const initialFormData: RegisterFormData = {
  shopName: "",
  fullName: "",
  mobileNumber: "",
  email: "",
  otp: "",
  password: "",
  confirmPassword: "",
};

const useRegister = (role: RegisterRole) => {
  const navigate = useNavigate();
  const registerShopMutation = useRegisterShopMutation();
  const registerCustomerMutation = useRegisterCustomerMutation();

  const [formData, setFormData] = useState<RegisterFormData>(initialFormData);
  const [errors, setErrors] = useState<RegisterFormErrors>({});
  const [verificationToken, setVerificationToken] = useState("");

  const {
    isSendingOtp,
    isVerifyingOtp,
    otpSent,
    isEmailVerified,
    resendCooldown,
    sendOtp,
    verifyOtp,
    resetOtpState,
  } = useOtp({
    purpose: role === "shop" ? "SHOP_REGISTRATION" : "CUSTOMER_REGISTRATION",
    onFieldError: (field, message) =>
      setErrors((prev) => ({ ...prev, [field]: message })),
    onClearErrors: () =>
      setErrors((prev) => ({ ...prev, email: "", otp: "" })),
  });

  const isMobile = () => window.matchMedia("(max-width: 639px)").matches;

  const showFeedbackError = (
    field: keyof RegisterFormErrors,
    error: unknown,
    fallback: string,
    toastId?: string
  ) => {
    const message = getReadableErrorMessage(error, fallback);
    if (isMobile()) {
      setErrors((prev) => ({ ...prev, [field]: message }));
    } else {
      showErrorToast(message, fallback, toastId ? { toastId } : undefined);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const fieldName = name as keyof RegisterFormData;

    const nextValue =
      fieldName === "otp" ? value.replace(/\D/g, "").slice(0, 6) : value;

    setErrors((prev) => ({
      ...prev,
      [fieldName]: "",
      form: "",
    }));

    if (
      fieldName === "email" &&
      (otpSent || isEmailVerified || resendCooldown > 0 || verificationToken)
    ) {
      resetOtpState();
      setVerificationToken("");
      setFormData((prev) => ({ ...prev, email: nextValue, otp: "" }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [fieldName]: nextValue,
    }));
  };

  const handleSendOtp = () => sendOtp(formData.email);

  const handleVerifyOtp = async () => {
    const response = await verifyOtp(formData.email, formData.otp);
    const token =
      response?.verificationToken ?? response?.data?.verificationToken;

    if (token) {
      setVerificationToken(token);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationErrors = validateRegisterForm(formData, role);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      const firstError = Object.values(validationErrors)[0];
      if (!isMobile() && firstError) {
        showErrorToast(firstError, firstError, {
          toastId: "register-validation",
        });
      }
      return;
    }

    if (!isEmailVerified || !verificationToken) {
      showFeedbackError(
        "email",
        "Please verify your email address before registering.",
        "Please verify your email address before registering.",
        "email-not-verified"
      );
      return;
    }

    try {
      const response =
        role === "shop"
          ? await registerShopMutation.mutateAsync({
              shopName: formData.shopName.trim(),
              mobileNumber: `+91${formData.mobileNumber.trim()}`,
              operatorEmail: formData.email.trim(),
              password: formData.password,
              verificationToken,
            })
          : await registerCustomerMutation.mutateAsync({
              fullName: formData.fullName.trim(),
              mobileNumber: `+91${formData.mobileNumber.trim()}`,
              email: formData.email.trim(),
              password: formData.password,
              verificationToken,
            });

      if (response.success) {
        showSuccessToast(
          response.message ||
            `${role === "shop" ? "Shop" : "Account"} registered successfully!`,
          { autoClose: 2500, toastId: "register-success" }
        );

        setFormData(initialFormData);
        setErrors({});
        setVerificationToken("");
        resetOtpState();

        setTimeout(() => {
          navigate("/auth/login", { replace: true });
        }, 500);
      } else {
        showFeedbackError("form", response.message, "Registration failed.");
      }
    } catch (error) {
      showFeedbackError(
        "form",
        error,
        "Registration failed. Please try again."
      );
    }
  };

  return {
    formData,
    errors,
    isLoading:
      registerShopMutation.isPending || registerCustomerMutation.isPending,
    isSendingOtp,
    isVerifyingOtp,
    otpSent,
    isEmailVerified,
    resendCooldown,
    handleChange,
    handleSendOtp,
    handleVerifyOtp,
    handleSubmit,
  };
};

export default useRegister;
