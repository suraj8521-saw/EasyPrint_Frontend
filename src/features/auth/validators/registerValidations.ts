import type { RegisterRole } from "../types/auth.types";
import type {
  RegisterFormData,
  RegisterFormErrors,
} from "../hooks/useRegister";

export const validateRegisterForm = (
  formData: RegisterFormData,
  role: RegisterRole
): RegisterFormErrors => {
  const errors: RegisterFormErrors = {};

  // Shop Name Validation
  if (role === "shop") {
    const shopName = formData.shopName.trim();

    if (!shopName) {
      errors.shopName = "Shop name is required.";
    } else if (shopName.length < 3) {
      errors.shopName = "Shop name must contain at least 3 characters.";
    } else if (!/[a-zA-Z]/.test(shopName)) {
      errors.shopName = "Shop name cannot contain only numbers.";
    } else if (!/^[a-zA-Z0-9\s&'.-]+$/.test(shopName)) {
      errors.shopName =
        "Only letters, numbers, spaces and & ' . - are allowed.";
    }
  }

  // Full Name Validation
  if (role !== "shop") {
    const fullName = formData.fullName.trim();

    if (!fullName) {
      errors.fullName = "Full name is required.";
    } else if (!/^[a-zA-Z\s]{3,50}$/.test(fullName)) {
      errors.fullName = "Enter a valid name (3-50 letters).";
    }
  }

  // Mobile Number Validation
  const mobileNumber = formData.mobileNumber.trim();
  if (!mobileNumber) {
    errors.mobileNumber = "Mobile number is required.";
  } else if (!/^[6-9]\d{9}$/.test(mobileNumber)) {
    errors.mobileNumber = "Enter a valid 10-digit mobile number.";
  }

  // Email Validation
  const email = formData.email.trim();
  if (!email) {
    errors.email = "Email address is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Enter a valid email address.";
  }

  // Password Validation
  if (!formData.password) {
    errors.password = "Password is required.";
  } else if (formData.password.length < 8) {
    errors.password = "Password must contain at least 8 characters.";
  } else if (!/[A-Z]/.test(formData.password)) {
    errors.password = "Include at least one uppercase letter.";
  } else if (!/[a-z]/.test(formData.password)) {
    errors.password = "Include at least one lowercase letter.";
  } else if (!/[0-9]/.test(formData.password)) {
    errors.password = "Include at least one number.";
  } else if (!/[^A-Za-z0-9]/.test(formData.password)) {
    errors.password = "Include at least one special character.";
  }

  // Confirm Password Validation
  if (!formData.confirmPassword) {
    errors.confirmPassword = "Please confirm your password.";
  } else if (formData.password !== formData.confirmPassword) {
    errors.confirmPassword = "Passwords do not match.";
  }

  return errors;
};