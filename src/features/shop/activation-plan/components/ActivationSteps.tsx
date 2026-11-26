const STEPS = [
  { number: 1, label: "Choose Plan" },
  { number: 2, label: "Apply Coupon" },
  { number: 3, label: "Payment" },
];

interface ActivationStepsProps {
  currentStep?: number;
}

const ActivationSteps = ({ currentStep = 1 }: ActivationStepsProps) => {
  return (
    <div
      className="
        flex items-center justify-between gap-2 rounded-2xl
        border border-purple-100 bg-white/90 px-4 py-3
        shadow-2xs
        dark:border-transparent dark:bg-transparent dark:px-2 dark:py-2 dark:shadow-none
        sm:justify-center sm:gap-5
      "
    >
      {STEPS.map((step, idx) => {
        const isActive = step.number === currentStep;
        const isDone = step.number < currentStep;

        return (
          <div key={step.number} className="flex items-center gap-2 sm:gap-4">
            <div className="flex items-center gap-2">
              <span
                className={`
                  flex h-7 w-7 shrink-0 items-center justify-center rounded-full
                  text-xs font-extrabold sm:h-8 sm:w-8 sm:text-sm
                  ${
                    isActive || isDone
                      ? "bg-[#7c3aed] text-white shadow-sm shadow-purple-500/30"
                      : "bg-purple-100 text-slate-600 dark:bg-[#231d3b] dark:text-slate-400"
                  }
                `}
              >
                {step.number}
              </span>
              <span
                className={`whitespace-nowrap text-xs font-bold sm:text-sm ${
                  isActive
                    ? "text-slate-900 dark:text-white"
                    : "text-slate-500 dark:text-slate-400"
                }`}
              >
                {step.label}
              </span>
            </div>

            {idx < STEPS.length - 1 && (
              <div className="h-[1.5px] w-6 bg-purple-200 dark:bg-[#2b2447] sm:w-16 md:w-24" />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ActivationSteps;
