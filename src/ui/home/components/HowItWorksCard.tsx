import type { LucideIcon } from "lucide-react";

interface HowItWorksCardProps {
  number: string;
  icon: LucideIcon;
  title: string;
  text: string;
}

const HowItWorksCard = ({
  number,
  icon: Icon,
  title,
  text,
}: HowItWorksCardProps) => {
  return (
    <article
      className="
        group relative flex h-full w-full flex-col items-center
        rounded-3xl border border-blue-100/90
        px-6 pb-6 pt-9 text-center shadow-sm backdrop-blur-sm
        transition-all duration-300 ease-out
        hover:-translate-y-1.5 hover:border-blue-200
        hover:shadow-[0_18px_40px_rgba(15,23,42,0.07)]
        dark:border-slate-700/80
        dark:hover:border-blue-500/40
        dark:hover:shadow-[0_18px_40px_rgba(2,6,23,0.45)]
        sm:rounded-[28px] sm:p-8 sm:pt-10 lg:p-9
      "
    >
      {/* Top Floating Step Number */}
      <span
        className="
          absolute -top-4 left-1/2 flex h-9 w-9 -translate-x-1/2
          items-center justify-center rounded-full bg-blue-600
          text-xs font-extrabold text-white
          shadow-md shadow-blue-600/25
          transition-transform duration-300 ease-out
          group-hover:scale-110
        "
      >
        {number}
      </span>

      {/* Icon Box */}
      <span
        className="
          mx-auto mb-5 flex h-14 w-14 shrink-0 items-center justify-center
          rounded-2xl bg-blue-50 text-blue-600
          ring-1 ring-blue-100/80
          transition-all duration-300 ease-out
          group-hover:scale-105 group-hover:bg-blue-600
          group-hover:text-white group-hover:shadow-md
          group-hover:shadow-blue-600/20 group-hover:ring-blue-600
          dark:bg-slate-700/90 dark:text-blue-400 dark:ring-slate-600/60
          dark:group-hover:bg-blue-600 dark:group-hover:text-white
          dark:group-hover:ring-blue-500
          sm:mb-6 sm:h-16 sm:w-16
        "
      >
        <Icon className="h-7 w-7 sm:h-[30px] sm:w-[30px]" />
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

export default HowItWorksCard;