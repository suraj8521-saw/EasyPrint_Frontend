import { useNavigate } from "react-router-dom";
import {
  Store,
  Phone,
  Mail,
  UserRound,
  AlertCircle,
  KeyRound,
  CheckCircle2,
} from "lucide-react";

import FormInput from "./FormInput";
import PasswordInput from "./PasswordInput";
import FieldError from "./FieldError";
import type { RegisterRole } from "../types/auth.types";
import useRegister from "../hooks/useRegister";

interface RegisterFormProps {
  role: RegisterRole;
}

const RegisterForm = ({ role }: RegisterFormProps) => {
  const navigate = useNavigate();
  const isShopkeeper = role === "shop";

  const {
    formData,
    errors,
    isLoading,
    isSendingOtp,
    isVerifyingOtp,
    resendCooldown,
    otpSent,
    isEmailVerified,
    handleChange,
    handleSendOtp,
    handleVerifyOtp,
    handleSubmit,
  } = useRegister(role);

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-2">
      {/* Shop Name / Full Name */}
      <div>
        {isShopkeeper ? (
          <FormInput
            icon={Store}
            name="shopName"
            placeholder="Shop Name"
            value={formData.shopName}
            onChange={handleChange}
            error={errors.shopName}
          />
        ) : (
          <FormInput
            icon={UserRound}
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            error={errors.fullName}
          />
        )}

        <FieldError message={errors.shopName || errors.fullName} />
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
          error={errors.mobileNumber}
        />

        <FieldError message={errors.mobileNumber} />
      </div>

      {/* Email + Verify Button */}
      <div>
        <FormInput
          icon={Mail}
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          autoComplete="email"
          disabled={isEmailVerified}
          error={errors.email}
          rightElement={
            isEmailVerified ? (
              <span className="inline-flex items-center gap-1 rounded-lg bg-emerald-100 px-2.5 py-1 text-xs font-bold text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400">
                <CheckCircle2 size={14} />
                Verified
              </span>
            ) : (
              <button
                type="button"
                onClick={handleSendOtp}
                disabled={isSendingOtp || !formData.email || resendCooldown > 0}
                className="cursor-pointer rounded-lg bg-purple-600 px-3 py-1.5 text-xs font-bold text-white transition hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSendingOtp
                  ? "Sending..."
                  : resendCooldown > 0
                    ? `Resend in ${resendCooldown}s`
                    : otpSent
                      ? "Resend"
                      : "Send"}
              </button>
            )
          }
        />

        <FieldError message={errors.email} />
      </div>

      {/* OTP Input (Jab OTP send ho jaye aur abhi verify na hua ho) */}
      {otpSent && !isEmailVerified && (
        <div>
          <FormInput
            icon={KeyRound}
            type="text"
            inputMode="numeric"
            maxLength={6}
            name="otp"
            placeholder="Enter 6-digit OTP"
            value={formData.otp}
            onChange={handleChange}
            error={errors.otp}
            rightElement={
              <button
                type="button"
                onClick={handleVerifyOtp}
                disabled={isVerifyingOtp || formData.otp.length < 6}
                className="cursor-pointer rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-bold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isVerifyingOtp ? "Checking..." : "Confirm"}
              </button>
            }
          />

          <FieldError message={errors.otp} />
        </div>
      )}

      {/* Password */}
      <div>
        <PasswordInput
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          autoComplete="new-password"
          error={errors.password}
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
          error={errors.confirmPassword}
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
        disabled={isLoading || !isEmailVerified}
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
          onClick={() => navigate("/auth/login")}
          className="cursor-pointer font-bold text-purple-700 underline underline-offset-2 dark:text-purple-400"
        >
          Login
        </button>
      </p>
    </form>
  );
};

export default RegisterForm;
