import { Calendar, Crown, Check, Star } from "lucide-react";
import type { NormalizedActivationPlan } from "../types/activation.types";

interface PlanCardProps {
  plan: NormalizedActivationPlan;
  isSelected: boolean;
  onSelect: (id: string) => void;
  variant?: "desktop" | "mobile";
}

const PlanCard = ({
  plan,
  isSelected,
  onSelect,
  variant = "desktop",
}: PlanCardProps) => {
  const isCrown = plan.iconType === "crown";

  if (variant === "mobile") {
    return (
      <button
        type="button"
        onClick={() => onSelect(plan.id)}
        className={`
          relative flex w-full cursor-pointer items-center justify-between gap-2.5
          rounded-2xl border px-3.5 py-3 text-left
          ${
            isSelected
              ? "border-[#7c3aed] bg-[#f3e8ff]/75 shadow-sm dark:border-[#a855f7] dark:bg-[#1f133b]"
              : "border-purple-100 bg-white/95 hover:border-purple-300 dark:border-[#251f40] dark:bg-[#131024]"
          }
        `}
      >
        {plan.isBestValue && (
          <span className="absolute -top-2.5 right-3 inline-flex items-center gap-1 rounded-full bg-[#7c3aed] px-2.5 py-0.5 text-[10px] font-bold text-white shadow-xs">
            <Star className="h-2.5 w-2.5 fill-amber-300 text-amber-300" />
            {plan.badgeText || "Best Value"}
          </span>
        )}

        <div className="flex min-w-0 items-center gap-2.5">
          <div
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
              isCrown
                ? "bg-amber-100 text-amber-500 dark:bg-amber-500/15 dark:text-amber-400"
                : "bg-purple-100 text-[#7c3aed] dark:bg-[#261947] dark:text-[#c084fc]"
            }`}
          >
            {isCrown ? <Crown size={20} /> : <Calendar size={20} />}
          </div>

          <div className="min-w-0">
            <h3 className="truncate text-sm font-bold text-slate-900 dark:text-white">
              {plan.name}
            </h3>
            <p className="mt-0.5 truncate text-xs font-medium text-slate-500 dark:text-slate-400">
              {plan.validityLabel}
            </p>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2.5">
          <span className="text-base font-extrabold text-slate-900 dark:text-white">
            ₹{plan.price}
          </span>

          <span
            className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${
              isSelected
                ? "border-[#7c3aed] dark:border-[#a855f7]"
                : "border-purple-300 dark:border-slate-600"
            }`}
          >
            {isSelected && (
              <span className="h-2.5 w-2.5 rounded-full bg-[#7c3aed] dark:bg-[#a855f7]" />
            )}
          </span>
        </div>
      </button>
    );
  }

  return (
    <div
      onClick={() => onSelect(plan.id)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onSelect(plan.id);
      }}
      className={`
        relative flex min-w-0 cursor-pointer flex-col justify-between
        rounded-2xl border p-4 xl:p-5
        ${
          isSelected
            ? "activation-plan-glow border-[#9333ea] bg-purple-50/70 dark:border-[#a855f7] dark:bg-gradient-to-b dark:from-[#26124d] dark:to-[#130d26]"
            : "border-purple-100 bg-white/95 hover:border-purple-300 dark:border-[#241e3d] dark:bg-[#110e20]/95 dark:hover:border-purple-700"
        }
      `}
    >
      {plan.isBestValue && (
        <span className="absolute -top-3 right-3.5 inline-flex items-center gap-1 rounded-full bg-amber-400 px-2.5 py-0.5 text-[11px] font-extrabold text-slate-950 shadow-sm">
          <Star className="h-3 w-3 fill-slate-950 text-slate-950" />
          {plan.badgeText || "Best Value"}
        </span>
      )}

      <div className="min-w-0">
        <div className="flex items-start gap-2.5">
          <div
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
              isCrown
                ? "bg-amber-100 text-amber-500 dark:bg-[#2c221e] dark:text-amber-400"
                : "bg-purple-100 text-purple-700 dark:bg-[#271847] dark:text-[#c084fc]"
            }`}
          >
            {isCrown ? <Crown size={20} /> : <Calendar size={20} />}
          </div>

          <div className="min-w-0">
            <h3 className="break-words text-sm font-extrabold leading-snug text-slate-900 xl:text-base dark:text-white">
              {plan.name}
            </h3>
            <p className="mt-0.5 text-xs font-medium text-slate-500 dark:text-slate-400">
              {plan.validityLabel}
            </p>
          </div>
        </div>

        <div className="my-4 text-center xl:my-5">
          <span className="text-2xl font-extrabold tracking-tight text-slate-950 xl:text-3xl dark:text-white">
            ₹{plan.price}
          </span>
        </div>

        <ul className="space-y-2 border-t border-purple-100/80 pt-3.5 dark:border-[#241e3d]">
          {plan.features.map((feature) => (
            <li
              key={feature}
              className="flex items-start gap-2 text-xs font-medium text-slate-700 dark:text-slate-300"
            >
              <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#9333ea] dark:text-[#c084fc]" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-5 flex items-center justify-center gap-2 pt-2">
        <span
          className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${
            isSelected
              ? "border-[#9333ea] dark:border-[#a855f7]"
              : "border-slate-300 dark:border-slate-600"
          }`}
        >
          {isSelected && (
            <span className="h-2.5 w-2.5 rounded-full bg-[#9333ea] dark:bg-[#a855f7]" />
          )}
        </span>
        <span
          className={`text-xs font-bold ${
            isSelected
              ? "text-purple-800 dark:text-white"
              : "text-slate-500 dark:text-slate-400"
          }`}
        >
          {isSelected ? "Selected" : "Select Plan"}
        </span>
      </div>
    </div>
  );
};

export default PlanCard;
