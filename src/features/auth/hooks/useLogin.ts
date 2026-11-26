import { useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";

import { useLoginMutation } from "../api/authQueries";
import { getDashboardRoute } from "../utils/getDashboardRoute";
import {
  getReadableErrorMessage,
  showErrorToast,
  showSuccessToast,
} from "../../../shared/utils/toastNotification";

export interface LoginFormData {
  email: string;
  password: string;
}

export type LoginFormErrors = Partial<
  Record<keyof LoginFormData | "form", string>
>;

const initialFormData: LoginFormData = {
  email: "",
  password: "",
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const useLogin = () => {
  const navigate = useNavigate();
  const loginMutation = useLoginMutation();

  const [formData, setFormData] = useState<LoginFormData>(initialFormData);
  const [errors, setErrors] = useState<LoginFormErrors>({});
  const [rememberMe, setRememberMe] = useState<boolean>(true);

  const isMobile = () => window.matchMedia("(max-width: 639px)").matches;

  const showFeedbackError = (
    field: keyof LoginFormErrors,
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
    const fieldName = name as keyof LoginFormData;

    setFormData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [fieldName]: "",
      form: "",
    }));
  };

  const validateLoginForm = (): LoginFormErrors => {
    const validationErrors: LoginFormErrors = {};
    const trimmedEmail = formData.email.trim();

    if (!trimmedEmail) {
      validationErrors.email = "Please enter your email address.";
    } else if (!EMAIL_REGEX.test(trimmedEmail)) {
      validationErrors.email = "Please enter a valid email address.";
    }

    if (!formData.password) {
      validationErrors.password = "Please enter your password.";
    }

    return validationErrors;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationErrors = validateLoginForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      const firstError = Object.values(validationErrors)[0];
      if (!isMobile() && firstError) {
        showErrorToast(firstError, firstError, { toastId: "login-validation" });
      }
      return;
    }

    try {
      const response = await loginMutation.mutateAsync({
        email: formData.email.trim(),
        password: formData.password,
      });

      if (!response.success || !response.data) {
        showFeedbackError(
          "form",
          response.message,
          "Login failed.",
          "login-fail"
        );
        return;
      }

      showSuccessToast(response.message || "Login successful!", {
        toastId: "login-success",
      });

      setFormData(initialFormData);
      setErrors({});

      navigate(getDashboardRoute(response.data), { replace: true });
    } catch (error) {
      showFeedbackError(
        "form",
        error,
        "Invalid email or password. Please try again.",
        "login-error"
      );
    }
  };

  return {
    formData,
    errors,
    rememberMe,
    isLoading: loginMutation.isPending,
    handleChange,
    setRememberMe,
    handleSubmit,
  };
};

export default useLogin;
