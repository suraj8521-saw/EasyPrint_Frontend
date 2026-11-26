import type { ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, ArrowRight } from "lucide-react";

import FormInput from "./FormInput";
import PasswordInput from "./PasswordInput";
import FieldError from "./FieldError";
import useLogin from "../hooks/useLogin";

const LoginForm = () => {
  const navigate = useNavigate();

  const {
    formData,
    errors,
    rememberMe,
    isLoading,
    handleChange,
    setRememberMe,
    handleSubmit,
  } = useLogin();

  const handleRememberChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRememberMe(e.target.checked);
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-3">
      {/* Form-level Error (Mobile / API fallback) */}
      {errors.form && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-3.5 py-2.5 text-sm font-medium text-red-600 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-400">
          {errors.form}
        </div>
      )}

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
          error={errors.email}
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
          autoComplete="current-password"
          error={errors.password}
        />
        <FieldError message={errors.password} />
      </div>

      {/* Remember Me / Forgot Password */}
      <div className="flex flex-wrap items-center justify-between gap-3 py-1">
        <label className="flex cursor-pointer items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={handleRememberChange}
            className="h-[18px] w-[18px] cursor-pointer accent-purple-600"
          />
          Remember me
        </label>

        <button
          type="button"
          onClick={() => navigate("/auth/forgot-password")}
          className="cursor-pointer text-sm font-bold text-purple-700  hover:text-purple-900 dark:text-purple-400 dark:hover:text-purple-300"
        >
          Forgot Password?
        </button>
      </div>

      {/* Login Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="group flex w-full cursor-pointer items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-purple-600 to-purple-800 px-5 py-3.5 text-base font-bold text-white shadow-lg shadow-purple-500/25 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isLoading ? "Please wait..." : "Login"}

        {!isLoading && (
          <ArrowRight
            size={21}
            className="transition-transform group-hover:translate-x-1"
          />
        )}
      </button>

      {/* Divider */}
      <div className="flex items-center gap-4 py-1">
        <div className="h-px flex-1 bg-slate-200 dark:bg-slate-700" />

        <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
          Or continue with
        </span>

        <div className="h-px flex-1 bg-slate-200 dark:bg-slate-700" />
      </div>

      {/* Google Login UI */}
      <button
        type="button"
        onClick={() => navigate("/auth/login")}
        className="flex w-full cursor-pointer items-center justify-center gap-3 rounded-xl border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-800 transition-all hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700"
      >
        <svg
          viewBox="0 0 48 48"
          aria-hidden="true"
          className="h-5 w-5 shrink-0"
        >
          <path
            fill="#EA4335"
            d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5Z"
          />
          <path
            fill="#4285F4"
            d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.72 7.18l7.62 5.9c4.45-4.1 7.14-10.14 7.14-17.55Z"
          />
          <path
            fill="#FBBC05"
            d="M10.53 28.59A14.4 14.4 0 0 1 9.75 24c0-1.59.27-3.12.76-4.59l-7.98-6.19A23.9 23.9 0 0 0 0 24c0 3.87.93 7.52 2.56 10.78l7.97-6.19Z"
          />
          <path
            fill="#34A853"
            d="M24 48c6.47 0 11.91-2.13 15.88-5.9l-7.62-5.9c-2.12 1.43-4.84 2.27-8.26 2.27-6.26 0-11.57-4.22-13.46-9.91l-7.98 6.19C6.51 43.62 14.62 48 24 48Z"
          />
        </svg>
        Continue with Google
      </button>

      {/* Register Link */}
      <p className="pt-2 text-center text-sm font-medium text-slate-600 dark:text-slate-400">
        Don&apos;t have an account?{" "}
        <button
          type="button"
          onClick={() => navigate("/account/selection")}
          className="cursor-pointer font-bold text-purple-700 underline underline-offset-2 dark:text-purple-400"
        >
          Register Now
        </button>
      </p>
    </form>
  );
};

export default LoginForm;