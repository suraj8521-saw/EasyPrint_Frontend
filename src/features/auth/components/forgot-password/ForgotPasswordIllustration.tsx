import { Check, Lock, ShieldCheck, Sparkles } from "lucide-react";
import type { ForgotPasswordStep } from "../../hooks/useFogotPassword";

interface ForgotPasswordIllustrationProps {
  step: ForgotPasswordStep;
}

const ForgotPasswordIllustration = ({
  step,
}: ForgotPasswordIllustrationProps) => {
  return (
    <div className="relative hidden items-center justify-center lg:flex">
      {/* Ambient Purple Glow Blob */}
      <div className="relative flex h-80 w-80 items-center justify-center rounded-full bg-purple-600/15 blur-0 dark:bg-purple-500/15">
        <Sparkles
          size={20}
          className="absolute left-8 top-14 animate-pulse text-purple-400"
        />
        <Sparkles
          size={16}
          className="absolute bottom-14 right-10 animate-pulse text-violet-300"
        />

        {/* Step 1: OTP Envelope Illustration */}
        {step === 1 && (
          <div className="relative flex flex-col items-center">
            <div className="z-10 -mb-6 rounded-2xl border border-purple-200 bg-white px-7 py-5 text-center shadow-2xl dark:border-purple-300/30 dark:bg-slate-100">
              <p className="text-xs font-extrabold tracking-widest text-purple-600">
                OTP
              </p>
              <p className="mt-1 font-mono text-2xl font-black tracking-wider text-slate-900">
                123456
              </p>
            </div>
            <div className="flex h-32 w-52 items-end justify-center rounded-b-3xl rounded-t-lg bg-gradient-to-br from-purple-500 via-violet-600 to-indigo-700 p-4 shadow-2xl shadow-purple-900/50">
              <div className="h-1.5 w-16 rounded-full bg-white/30" />
            </div>
          </div>
        )}

        {/* Step 2: Verified Shield + Passcode Bar */}
        {step === 2 && (
          <div className="relative flex flex-col items-center">
            <div className="flex h-36 w-32 items-center justify-center rounded-3xl bg-gradient-to-br from-purple-400 via-violet-600 to-indigo-700 shadow-2xl shadow-purple-800/50">
              <ShieldCheck size={64} className="text-white" strokeWidth={2.2} />
            </div>
            <div className="-mt-4 rounded-2xl border border-purple-200 bg-white px-6 py-2.5 shadow-xl dark:bg-slate-100">
              <span className="font-mono text-xl font-black tracking-[0.25em] text-purple-700">
                ******
              </span>
            </div>
          </div>
        )}

        {/* Step 3: Padlock + Emerald Check Badge */}
        {step === 3 && (
          <div className="relative flex flex-col items-center">
            <div className="h-14 w-24 rounded-t-full border-[10px] border-b-0 border-purple-300/90" />
            <div className="relative flex h-32 w-36 items-center justify-center rounded-3xl bg-gradient-to-br from-purple-400 via-violet-600 to-indigo-700 shadow-2xl shadow-purple-800/50">
              <Lock size={44} className="text-white/90" />
              <span className="absolute -bottom-3 -right-3 flex h-12 w-12 items-center justify-center rounded-full border-4 border-slate-950 bg-emerald-400 text-slate-950 shadow-lg">
                <Check size={24} strokeWidth={3} />
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordIllustration;