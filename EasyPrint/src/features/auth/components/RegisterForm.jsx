
import { useNavigate } from "react-router-dom";
import {
  Store,
  Phone,
  Mail,
  UserRound,
  AlertCircle,
} from "lucide-react";

import FormInput from "./FormInput";
import PasswordInput from "./PasswordInput";
import useRegister from "../hooks/useRegister";

const RegisterForm = ({ role }) => {
  const navigate = useNavigate();
  const isShopkeeper = role === "shop";

  const {
    formData,
    errors,
    isLoading,
    handleChange,
    handleSubmit,
  } = useRegister(role);

  // Reusable Field Error
  const FieldError = ({ message }) => {
    if (!message) return null;

    return (
      <p className="mt-1 flex items-start gap-1 px-1 text-[11px] font-medium leading-4 text-red-500 sm:hidden">
        <AlertCircle
          size={13}
          className="mt-0.5 shrink-0"
        />
        <span>{message}</span>
      </p>
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="space-y-2"
    >

      {/* Shop Name / Full Name */}
      <div>
        {isShopkeeper ? (
          <FormInput
            icon={Store}
            name="shopName"
            placeholder="Shop Name"
            value={formData.shopName}
            onChange={handleChange}
          />
        ) : (
          <FormInput
            icon={UserRound}
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
          />
        )}

        <FieldError
          message={errors.shopName || errors.fullName}
        />
      </div>

      {/* Mobile Number */}
      <div>
        <FormInput
          icon={Phone}
          type="tel"
          name="mobileNumber"
          placeholder="Mobile Number"
          value={formData.mobileNumber}
          onChange={handleChange}
          autoComplete="tel"
        />

        <FieldError message={errors.mobileNumber} />
      </div>

      {/* Email */}
      <div>
        <FormInput
          icon={Mail}
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          autoComplete="email"
        />

        <FieldError message={errors.email} />
      </div>

      {/* Password */}
      <div>
        <PasswordInput
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          autoComplete="new-password"
        />

        <FieldError message={errors.password} />
      </div>

      {/* Confirm Password */}
      <div>
        <PasswordInput
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          autoComplete="new-password"
        />

        <FieldError message={errors.confirmPassword} />
      </div>

      {/* Backend Error */}
      {errors.form && (
        <p className="flex items-start gap-1 rounded-lg bg-red-50 px-3 py-2 text-xs font-medium text-red-600 sm:hidden dark:bg-red-950/40 dark:text-red-400">
          <AlertCircle size={14} className="mt-0.5 shrink-0" />
          <span>{errors.form}</span>
        </p>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="group mt-2 flex w-full cursor-pointer items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-purple-600 to-purple-800 px-5 py-3 font-bold text-white shadow-lg shadow-purple-500/25 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
      >
        <UserRound size={20} />

        {isLoading
          ? "Please wait..."
          : `Register as ${isShopkeeper ? "Shopkeeper" : "Customer"}`}
      </button>

      {/* Login */}
      <p className="pt-2 text-center text-sm font-medium text-slate-600 dark:text-slate-400">
        Already have an account?{" "}
        <button
          type="button"
          onClick={() => navigate("/shop/login")}
          className="cursor-pointer font-bold text-purple-700 underline underline-offset-2 dark:text-purple-400"
        >
          Login
        </button>
      </p>

    </form>
  );
};

export default RegisterForm;
