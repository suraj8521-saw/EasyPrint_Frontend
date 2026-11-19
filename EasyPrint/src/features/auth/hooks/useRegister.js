import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { validateRegisterForm } from "../validations/registerValidations";
import { registerShop } from "../api/authApi";

const initialFormData = {
  shopName: "",
  fullName: "",
  mobileNumber: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const useRegister = (role) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const isMobile = () =>
    window.matchMedia("(max-width: 639px)").matches;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
      form: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateRegisterForm(formData, role);

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      const firstError = Object.values(validationErrors)[0];

      if (!isMobile()) {
        toast.error(firstError, {
          toastId: "register-validation",
        });
      }

      return;
    }

    if (role !== "shop") {
      const message = "Customer registration is not available yet.";

      if (isMobile()) {
        setErrors({ form: message });
      } else {
        toast.error(message);
      }

      return;
    }

    const registrationData = {
      shopName: formData.shopName.trim(),
      mobileNumber: `+91${formData.mobileNumber}`,
      operatorEmail: formData.email.trim(),
      password: formData.password,
    };

    try {
      setIsLoading(true);

      const response = await registerShop(registrationData);

      if (response.success) {
        toast.success(
          response.message || "Shop registered successfully!",
          { autoClose: 2500 }
        );

        setFormData(initialFormData);
        setErrors({});

        // Navigate to Shopkeeper Login
        setTimeout(() => {
          navigate("/shop/login", { replace: true });
        }, 500);

      } else {
        const message = response.message || "Registration failed.";

        if (isMobile()) {
          setErrors({ form: message });
        } else {
          toast.error(message);
        }
      }

    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Registration failed. Please try again.";

      if (isMobile()) {
        setErrors({ form: errorMessage });
      } else {
        toast.error(errorMessage);
      }

    } finally {
      setIsLoading(false);
    }
  };

  return {
    formData,
    errors,
    isLoading,
    handleChange,
    handleSubmit,
  };
};

export default useRegister;