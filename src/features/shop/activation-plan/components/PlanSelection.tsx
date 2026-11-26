import { Layers } from "lucide-react";
import type { NormalizedActivationPlan } from "../types/activation.types";
import PlanCard from "./PlanCard";

interface PlanSelectionProps {
  plans: NormalizedActivationPlan[];
  selectedPlanId: string | null;
  onSelectPlan: (id: string) => void;
  layout?: "desktop" | "tablet" | "mobile";
}

const PlanSelection = ({
  plans,
  selectedPlanId,
  onSelectPlan,
  layout = "desktop",
}: PlanSelectionProps) => {
  return (
    <section>
      <div className="mb-4">
        <h2 className="flex items-center gap-2 text-lg font-extrabold text-slate-950 dark:text-white sm:text-xl">
          <Layers className="h-5 w-5 text-[#7c3aed] dark:text-[#a855f7]" />
          <span>Choose a Plan</span>
        </h2>
        <p className="mt-0.5 text-xs font-medium text-slate-600 dark:text-slate-400 sm:text-sm">
          Select the best plan for your printing business.
        </p>
      </div>

      <div
        className={
          layout === "mobile"
            ? "flex flex-col gap-3"
            : layout === "tablet"
              ? "grid grid-cols-1 gap-4 sm:grid-cols-2"
              : "grid grid-cols-1 gap-4 md:grid-cols-3"
        }
      >
        {plans.map((plan) => (
          <PlanCard
            key={plan.id}
            plan={plan}
            isSelected={plan.id === selectedPlanId}
            onSelect={onSelectPlan}
            variant={layout === "mobile" ? "mobile" : "desktop"}
          />
        ))}
      </div>
    </section>
  );
};

export default PlanSelection;
