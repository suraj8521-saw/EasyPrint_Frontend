import {
  useRef,
  type ClipboardEvent,
  type FormEvent,
  type KeyboardEvent,
} from "react";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";

interface VerifyOtpStepProps {
  otpDigits: string[];
  onOtpChange: (digits: string[]) => void;
  onSubmit: (e: FormEvent) => void;
  onResendOtp: () => void;
  onChangeEmail: () => void;
  isVerifying: boolean;
  isResending: boolean;
  resendCooldown: number;
  formattedExpiry: string;
  error?: string;
}

const VerifyOtpStep = ({
  otpDigits,
  onOtpChange,
  onSubmit,
  onResendOtp,
  onChangeEmail,
  isVerifying,
  isResending,
  resendCooldown,
  formattedExpiry,
  error,
}: VerifyOtpStepProps) => {
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const handleDigitChange = (index: number, rawValue: string) => {
    const digit = rawValue.replace(/\D/g, "").slice(-1);
    const updated = [...otpDigits];
    updated[index] = digit;
    onOtpChange(updated);

    if (digit && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otpDigits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);
    if (!pasted) return;

    const updated = ["", "", "", "", "", ""];
    pasted.split("").forEach((char, idx) => {
      updated[idx] = char;
    });
    onOtpChange(updated);

    const nextFocusIndex = Math.min(pasted.length, 5);
    inputRefs.current[nextFocusIndex]?.focus();
  };

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      {/* 6 OTP Boxes */}
      <div>
        <div className="flex justify-between gap-2 sm:gap-3">
          {otpDigits.map((digit, index) => (
            <input
              key={index}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleDigitChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              aria-label={`OTP digit ${index + 1}`}
              className="h-12 w-11 rounded-xl border border-slate-300 bg-white/80 text-center text-lg font-bold text-slate-900 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-500/25 dark:border-slate-700 dark:bg-slate-900/75 dark:text-white dark:focus:border-purple-400 sm:h-13 sm:w-12"
            />
          ))}
        </div>

        {error && (
          <p className="mt-2.5 text-center text-xs font-medium text-red-500 dark:text-red-400">
            {error}
          </p>
        )}
      </div>

      {/* Expiry Timer & Resend Link */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-slate-600 dark:text-slate-300">
        <span className="flex items-center gap-1.5">
          <Clock size={14} className="text-slate-400" />
          OTP expires in{" "}
          <strong className="font-bold text-slate-900 dark:text-white">
            {formattedExpiry}
          </strong>
        </span>

        <button
          type="button"
          onClick={onResendOtp}
          disabled={resendCooldown > 0 || isResending}
          className="font-semibold text-purple-600 underline underline-offset-2 transition hover:text-purple-500 disabled:cursor-not-allowed disabled:text-slate-400 disabled:no-underline dark:text-purple-400 dark:hover:text-purple-300"
        >
          {resendCooldown > 0
            ? `Resend in ${resendCooldown}s`
            : isResending
            ? "Sending..."
            : "Resend OTP"}
        </button>
      </div>

      {/* Verify Button */}
      <button
        type="submit"
        disabled={isVerifying}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 via-violet-600 to-purple-700 py-3.5 text-sm font-semibold text-white shadow-lg shadow-purple-700/30 transition hover:from-purple-500 hover:to-violet-600 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <span>{isVerifying ? "Verifying..." : "Verify OTP"}</span>
        {!isVerifying && <ArrowRight size={17} />}
      </button>

      {/* Change Email */}
      <div className="pt-1">
        <button
          type="button"
          onClick={onChangeEmail}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 transition hover:text-purple-600 dark:text-slate-300 dark:hover:text-purple-400"
        >
          <ArrowLeft size={14} />
          <span>Change Email</span>
        </button>
      </div>
    </form>
  );
};

export default VerifyOtpStep;