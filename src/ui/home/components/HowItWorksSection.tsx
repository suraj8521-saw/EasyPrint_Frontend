
import { howItWorksData } from "../data/howItWorksData";
import HowItWorksCard from "./HowItWorksCard";

const HowItWorksSection = () => {
  return (
    <section
      id="how-it-works"
      className="relative px-4 py-16 sm:px-6 sm:py-20 lg:px-16 lg:py-24"
    >
      <div className="mx-auto max-w-[1300px]">
        {/* Section Header */}
        <div className="mx-auto mb-12 max-w-2xl text-center sm:mb-16">
          <span className="inline-block text-[11px] font-extrabold uppercase tracking-[0.25em] text-blue-600 dark:text-blue-400 sm:text-xs sm:tracking-[0.3em]">
            HOW IT WORKS
          </span>
          <h2 className="mt-3 text-3xl font-black leading-tight tracking-tight text-slate-900 dark:text-white sm:mt-4 sm:text-4xl lg:text-5xl">
            Print in 3 Simple Steps
          </h2>
          <p className="mt-3.5 text-sm leading-relaxed text-slate-500 dark:text-slate-400 sm:mt-5 sm:text-base">
            From upload to pickup, getting your documents printed is effortless.
          </p>
        </div>

        {/* Responsive Steps Grid (Mobile par floating number badge ke liye gap-y-10) */}
        <div className="grid grid-cols-1 gap-y-10 pt-2 md:grid-cols-3 md:gap-7">
          {howItWorksData.map((step) => (
            <HowItWorksCard
              key={step.id}
              number={step.number}
              icon={step.icon}
              title={step.title}
              text={step.text}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;