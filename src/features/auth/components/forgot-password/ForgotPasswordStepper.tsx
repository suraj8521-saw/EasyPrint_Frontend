import type { ForgotPasswordStep } from "../../hooks/useFogotPassword";

interface ForgotPasswordStepperProps {
  currentStep: ForgotPasswordStep;
}

const STEPS: Array<{ step: ForgotPasswordStep; label: string }> = [
  { step: 1, label: "Send OTP" },
  { step: 2, label: "Verify OTP" },
  { step: 3, label: "Set New Password" },
];

const ForgotPasswordStepper = ({ currentStep }: ForgotPasswordStepperProps) => {
  return (
    <div className="my-7 flex items-center justify-between px-2">
      {STEPS.map((item, idx) => {
        const isActive = currentStep === item.step;
        const isCompleted = currentStep > item.step;

        return (
          <div key={item.step} className="flex flex-1 items-center last:flex-none">
            {/* Step Circle + Label */}
            <div className="flex flex-col items-center">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full border text-xs font-bold transition-all ${
                  isActive
                    ? "border-purple-400 bg-gradient-to-br from-purple-500 to-violet-700 text-white shadow-[0_0_16px_rgba(168,85,247,0.65)]"
                    : isCompleted
                    ? "border-purple-500/70 bg-purple-600/30 text-purple-200"
                    : "border-slate-300 bg-white/70 text-slate-500 dark:border-slate-700 dark:bg-slate-800/80 dark:text-slate-400"
                }`}
              >
                {item.step}
              </div>
              <span
                className={`mt-2 whitespace-nowrap text-[11px] sm:text-xs ${
                  isActive
                    ? "font-bold text-slate-900 dark:text-white"
                    : "font-medium text-slate-500 dark:text-slate-400"
                }`}
              >
                {item.label}
              </span>
            </div>

            {/* Connector Line */}
            {idx < STEPS.length - 1 && (
              <div
                className={`mx-2 -mt-5 h-[2px] flex-1  ${
                  currentStep > item.step
                    ? "bg-gradient-to-r from-purple-500 to-violet-500"
                    : "bg-slate-200 dark:bg-slate-700/80"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ForgotPasswordStepper;