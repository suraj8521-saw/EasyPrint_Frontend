import { useState, type FormEvent } from "react";
import { Check, Eye, EyeOff, Lock, RotateCw } from "lucide-react";

interface ResetPasswordStepProps {
  newPassword: string;
  confirmPassword: string;
  onNewPasswordChange: (val: string) => void;
  onConfirmPasswordChange: (val: string) => void;
  onSubmit: (e: FormEvent) => void;
  isResetting: boolean;
  passwordRules: {
    minLength: boolean;
    hasUppercase: boolean;
    hasNumber: boolean;
  };
  error?: string;
}

const ResetPasswordStep = ({
  newPassword,
  confirmPassword,
  onNewPasswordChange,
  onConfirmPasswordChange,
  onSubmit,
  isResetting,
  passwordRules,
  error,
}: ResetPasswordStepProps) => {
  const [showNewPwd, setShowNewPwd] = useState(false);
  const [showConfirmPwd, setShowConfirmPwd] = useState(false);

  const rulesList = [
    { met: passwordRules.minLength, label: "At least 8 characters" },
    { met: passwordRules.hasUppercase, label: "Include one uppercase letter" },
    { met: passwordRules.hasNumber, label: "Include one number" },
  ];

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4">
      {/* New Password */}
      <div className="relative">
        <Lock
          size={18}
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
        />
        <input
          type={showNewPwd ? "text" : "password"}
          value={newPassword}
          onChange={(e) => onNewPasswordChange(e.target.value)}
          placeholder="New Password"
          autoComplete="new-password"
          className="w-full rounded-xl border border-slate-200 bg-white/80 py-3.5 pl-11 pr-11 text-sm text-slate-900 placeholder-slate-400 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 dark:border-slate-700/80 dark:bg-slate-900/70 dark:text-white dark:placeholder-slate-400 dark:focus:border-purple-400"
        />
        <button
          type="button"
          onClick={() => setShowNewPwd((prev) => !prev)}
          aria-label={showNewPwd ? "Hide password" : "Show password"}
          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
        >
          {showNewPwd ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>

      {/* Confirm Password */}
      <div className="relative">
        <Lock
          size={18}
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
        />
        <input
          type={showConfirmPwd ? "text" : "password"}
          value={confirmPassword}
          onChange={(e) => onConfirmPasswordChange(e.target.value)}
          placeholder="Confirm New Password"
          autoComplete="new-password"
          className="w-full rounded-xl border border-slate-200 bg-white/80 py-3.5 pl-11 pr-11 text-sm text-slate-900 placeholder-slate-400 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 dark:border-slate-700/80 dark:bg-slate-900/70 dark:text-white dark:placeholder-slate-400 dark:focus:border-purple-400"
        />
        <button
          type="button"
          onClick={() => setShowConfirmPwd((prev) => !prev)}
          aria-label={showConfirmPwd ? "Hide password" : "Show password"}
          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
        >
          {showConfirmPwd ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>

      {/* Password Rules Checklist */}
      <ul className="space-y-1.5 pt-1">
        {rulesList.map((rule) => (
          <li
            key={rule.label}
            className={`flex items-center gap-2 text-xs  ${
              rule.met
                ? "font-medium text-emerald-600 dark:text-emerald-400"
                : "text-slate-500 dark:text-slate-400"
            }`}
          >
            <Check
              size={14}
              className={
                rule.met
                  ? "text-emerald-500 dark:text-emerald-400"
                  : "text-purple-400/70"
              }
            />
            <span>{rule.label}</span>
          </li>
        ))}
      </ul>

      {error && (
        <p className="text-xs font-medium text-red-500 dark:text-red-400">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={isResetting}
        className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 via-violet-600 to-purple-700 py-3.5 text-sm font-semibold text-white shadow-lg shadow-purple-700/30 transition hover:from-purple-500 hover:to-violet-600 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <RotateCw size={17} className={isResetting ? "animate-spin" : ""} />
        <span>{isResetting ? "Resetting..." : "Reset Password"}</span>
      </button>
    </form>
  );
};

export default ResetPasswordStep;