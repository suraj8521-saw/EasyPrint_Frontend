import type { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  text: string;
}

const FeatureCard = ({ icon: Icon, title, text }: FeatureCardProps) => {
  return (
    <article
      className="
        group relative flex h-full w-full flex-col items-center
        rounded-3xl border border-blue-100/90
        p-6 pt-8 text-center shadow-sm backdrop-blur-sm
        transition-all duration-300 ease-out
        hover:-translate-y-1.5 hover:border-blue-200
        hover:shadow-[0_18px_40px_rgba(15,23,42,0.07)]
        dark:border-slate-700/80
        dark:hover:border-blue-500/40
        dark:hover:shadow-[0_18px_40px_rgba(2,6,23,0.45)]
        sm:rounded-[28px] sm:p-8 sm:pt-10 lg:p-9
      "
    >
      {/* Icon Badge */}
      <span
        className="
          mb-5 flex h-12 w-12 shrink-0 items-center justify-center
          rounded-2xl bg-white text-blue-600 shadow-sm
          ring-1 ring-slate-200/70
          transition-all duration-300 ease-out
          group-hover:scale-105 group-hover:bg-blue-600
          group-hover:text-white group-hover:shadow-md
          group-hover:shadow-blue-600/20 group-hover:ring-blue-600
          dark:bg-slate-700/90 dark:text-blue-400 dark:ring-slate-600/60
          dark:group-hover:bg-blue-600 dark:group-hover:text-white
          dark:group-hover:ring-blue-500
          sm:mb-7 sm:h-14 sm:w-14
        "
      >
        <Icon className="h-6 w-6 sm:h-[26px] sm:w-[26px]" />
      </span>

      {/* Title */}
      <h3
        className="
          mb-2.5 text-lg font-extrabold text-slate-800
          
          group-hover:text-blue-600
          dark:text-white dark:group-hover:text-blue-400
          sm:mb-3 sm:text-xl
        "
      >
        {title}
      </h3>

      {/* Description */}
      <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400 sm:leading-7">
        {text}
      </p>
    </article>
  );
};

export default FeatureCard;