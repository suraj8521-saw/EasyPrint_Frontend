
import { Crown, ArrowRight } from "lucide-react";

const ActivationCard = ({ onActivate }) => {
  return (
    <div
      className="
        group relative mt-2 shrink-0 overflow-hidden
        rounded-2xl border border-purple-200
        bg-gradient-to-br from-[#f4e8ff] via-[#eee0ff] to-[#f8efff]
        p-2.5 shadow-[0_6px_18px_rgba(124,58,237,0.08)]
        transition-all duration-300
        hover:border-purple-300
        hover:shadow-[0_8px_22px_rgba(124,58,237,0.16)]
        dark:border-purple-800/70
        dark:bg-gradient-to-br dark:from-[#261044]
        dark:via-[#1b0c32] dark:to-[#12091f]
        dark:shadow-[0_6px_18px_rgba(0,0,0,0.25)]
        dark:hover:border-purple-600
      "
    >
      {/* Background Glow */}
      <div
        className="
          pointer-events-none absolute -right-10 -top-10
          h-24 w-24 rounded-full
          bg-purple-300/30 blur-3xl
          dark:bg-purple-600/20
        "
      />

      {/* Heading */}
      <div className="relative z-10 mb-1.5 flex items-center gap-2.5">
        <div
          className="
            flex h-9 w-9 shrink-0 items-center justify-center
            rounded-full bg-gradient-to-br from-amber-100 to-amber-200
            text-amber-600 shadow-sm
            dark:from-amber-300 dark:to-amber-500
            dark:text-amber-950
          "
        >
          <Crown size={21} strokeWidth={2.5} />
        </div>

        <h3 className="text-sm font-extrabold tracking-tight text-slate-950 dark:text-white">
          Activate Your Shop
        </h3>
      </div>

      {/* Description */}
      <p
        className="
          relative z-10 mb-2.5 text-center text-xs
          font-medium leading-[18px]
          text-slate-800 dark:text-slate-200
        "
      >
        Unlock all features and start
        <br />
        receiving print orders.
      </p>

      {/* Activate Button */}
      <button
        type="button"
        onClick={onActivate}
        className="
          group/btn relative z-10 flex w-full items-center
          justify-center gap-2 overflow-hidden rounded-xl
          border border-purple-300/70
          bg-white/80 px-3 py-2
          text-xs font-extrabold text-purple-700
          shadow-[0_3px_10px_rgba(124,58,237,0.12)]
          transition-all duration-300 ease-out
          hover:-translate-y-0.5 hover:border-purple-400
          hover:bg-purple-50
          hover:shadow-[0_6px_15px_rgba(124,58,237,0.22)]
          active:translate-y-0 active:scale-[0.98]
          dark:border-purple-700
          dark:bg-gradient-to-r dark:from-purple-700 dark:to-purple-800
          dark:text-white
          dark:shadow-[0_4px_12px_rgba(124,58,237,0.25)]
          dark:hover:from-purple-600 dark:hover:to-purple-700
        "
      >
        <span>Activate Now</span>

        <ArrowRight
          size={17}
          strokeWidth={2.5}
          className="transition-transform duration-300 group-hover/btn:translate-x-1"
        />
      </button>
    </div>
  );
};

export default ActivationCard;
