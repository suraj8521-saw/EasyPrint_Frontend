import type { FormEvent } from "react";
import { ArrowRight, Mail, Send } from "lucide-react";

interface SendOtpStepProps {
  email: string;
  onEmailChange: (value: string) => void;
  onSubmit: (e: FormEvent) => void;
  isSending: boolean;
  error?: string;
}

const SendOtpStep = ({
  email,
  onEmailChange,
  onSubmit,
  isSending,
  error,
}: SendOtpStepProps) => {
  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      <div>
        <div className="relative">
          <Mail
            size={18}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
            placeholder="Enter your email address"
            autoComplete="email"
            className="w-full rounded-xl border border-slate-200 bg-white/80 py-3.5 pl-11 pr-4 text-sm text-slate-900 placeholder-slate-400 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 dark:border-slate-700/80 dark:bg-slate-900/70 dark:text-white dark:placeholder-slate-400 dark:focus:border-purple-400"
          />
        </div>
        {error && (
          <p className="mt-2 text-xs font-medium text-red-500 dark:text-red-400">
            {error}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSending}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 via-violet-600 to-purple-700 py-3.5 text-sm font-semibold text-white shadow-lg shadow-purple-700/30 transition hover:from-purple-500 hover:to-violet-600 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <Send size={17} />
        <span>{isSending ? "Sending OTP..." : "Send OTP"}</span>
        {!isSending && <ArrowRight size={17} />}
      </button>
    </form>
  );
};

export default SendOtpStep;