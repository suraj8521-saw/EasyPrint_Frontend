import FeatureCard from "./FeatureCard";
import { featuresData } from "../data/featuresdata";

const FeaturesSection = () => {
  return (
    <section
      id="services"
      className="relative  px-4 py-16 sm:px-6 sm:py-20 lg:px-16 lg:py-24"
    >
      <div className="mx-auto max-w-[1300px]">
        {/* Section Header */}
        <div className="mx-auto mb-10 max-w-2xl text-center sm:mb-14 lg:mb-16">
          <span className="inline-block text-[11px] font-extrabold uppercase tracking-[0.25em] text-blue-600 dark:text-blue-400 sm:text-xs sm:tracking-[0.3em]">
            THE EASYPRINT ADVANTAGE
          </span>
          <h2 className="mt-3 text-3xl font-black leading-tight tracking-tight text-slate-900 dark:text-white sm:mt-4 sm:text-4xl lg:text-5xl">
            Everything You Need to Print Smarter
          </h2>
          <p className="mt-3.5 text-sm leading-relaxed text-slate-500 dark:text-slate-400 sm:mt-5 sm:text-base">
            Simple tools that make printing faster, easier and more secure.
          </p>
        </div>

        {/* Responsive Cards Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
          {featuresData.map((feature) => (
            <FeatureCard
              key={feature.id}
              icon={feature.icon}
              title={feature.title}
              text={feature.text}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;