import { Link } from "react-router-dom";
import { Lock, ShieldCheck } from "lucide-react";

import { useForgotPassword } from "../hooks/useFogotPassword";
import ForgotPasswordStepper from "../components/forgot-password/ForgotPasswordStepper";
import SendOtpStep from "../components/forgot-password/SendotpStep";
import VerifyOtpStep from "../components/forgot-password/VerifyotpStep";
import ResetPasswordStep from "../components/forgot-password/ResetPasswordStep";

const ForgotPasswordPage = () => {
  const {
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
    isResetting,
    resendCooldown,
    formattedExpiry,
    passwordRules,
    handleSendOtpSubmit,
    handleResendOtp,
    handleVerifyOtpSubmit,
    handleChangeEmail,
    handleResetPasswordSubmit,
  } = useForgotPassword();

  return (
    <section className="mx-auto flex min-h-[calc(100dvh-80px)] w-full items-center justify-center px-4 py-10 sm:px-6">
      {/* Centered Glass Card */}
      <div className="w-full max-w-md rounded-3xl border border-purple-200/70 bg-white/80 p-6 shadow-2xl backdrop-blur-xl dark:border-purple-500/20 dark:bg-slate-950/65 sm:p-8">
        {/* Header */}
        <div className="text-center">
          {step === 1 && (
            <>
              <h1 className="flex items-center justify-center gap-2.5 text-2xl font-extrabold text-slate-900 dark:text-white sm:text-3xl">
                <Lock className="text-purple-500" size={26} />
                <span>
                  Forgot <span className="text-purple-500">Password?</span>
                </span>
              </h1>
              <p className="mt-2 text-xs text-slate-600 dark:text-slate-300 sm:text-sm">
                No worries! Enter your email address and we&apos;ll send you an
                OTP to reset your password.
              </p>
            </>
          )}

          {step === 2 && (
            <>
              <h1 className="flex items-center justify-center gap-2.5 text-2xl font-extrabold text-slate-900 dark:text-white sm:text-3xl">
                <ShieldCheck className="text-purple-500" size={28} />
                <span>Verify OTP</span>
              </h1>
              <p className="mt-2 text-xs text-slate-600 dark:text-slate-300 sm:text-sm">
                Enter the 6-digit OTP sent to{" "}
                <span className="font-semibold text-slate-900 dark:text-white">
                  {email}
                </span>
              </p>
            </>
          )}

          {step === 3 && (
            <>
              <h1 className="flex items-center justify-center gap-2.5 text-2xl font-extrabold text-slate-900 dark:text-white sm:text-3xl">
                <Lock className="text-purple-500" size={26} />
                <span>
                  Set New <span className="text-purple-500">Password</span>
                </span>
              </h1>
              <p className="mt-2 text-xs text-slate-600 dark:text-slate-300 sm:text-sm">
                Create a new password for your account.
              </p>
            </>
          )}
        </div>

        {/* 3-Step Progress Indicator */}
        <ForgotPasswordStepper currentStep={step} />

        {/* Active Step Form */}
        {step === 1 && (
          <SendOtpStep
            email={email}
            onEmailChange={(val) => {
              setEmail(val);
              if (error) setError("");
            }}
            onSubmit={handleSendOtpSubmit}
            isSending={isSendingOtp}
            error={error}
          />
        )}

        {step === 2 && (
          <VerifyOtpStep
            otpDigits={otpDigits}
            onOtpChange={(digits) => {
              setOtpDigits(digits);
              if (error) setError("");
            }}
            onSubmit={handleVerifyOtpSubmit}
            onResendOtp={handleResendOtp}
            onChangeEmail={handleChangeEmail}
            isVerifying={isVerifyingOtp}
            isResending={isSendingOtp}
            resendCooldown={resendCooldown}
            formattedExpiry={formattedExpiry}
            error={error}
          />
        )}

        {step === 3 && (
          <ResetPasswordStep
            newPassword={newPassword}
            confirmPassword={confirmPassword}
            onNewPasswordChange={(val) => {
              setNewPassword(val);
              if (error) setError("");
            }}
            onConfirmPasswordChange={(val) => {
              setConfirmPassword(val);
              if (error) setError("");
            }}
            onSubmit={handleResetPasswordSubmit}
            isResetting={isResetting}
            passwordRules={passwordRules}
            error={error}
          />
        )}

        {/* Bottom Login Link (Steps 1 & 3) */}
        {(step === 1 || step === 3) && (
          <div className="mt-6 flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
            <span className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
            <p>
              Remember your password?{" "}
              <Link
                to="/auth/login"
                className="font-semibold text-purple-600 underline underline-offset-2 hover:text-purple-500 dark:text-purple-400"
              >
                Login
              </Link>
            </p>
            <span className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
          </div>
        )}
      </div>
    </section>
  );
};

export default ForgotPasswordPage;