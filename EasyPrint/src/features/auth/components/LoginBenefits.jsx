
import { Zap, ShieldCheck, Layers3 } from "lucide-react";

const benefits = [
  {
    icon: Zap,
    title: "Quick & Easy",
  },
  {
    icon: ShieldCheck,
    title: "Secure",
  },
  {
    icon: Layers3,
    title: "Multiple Shops",
  },
];

const LoginBenefits = () => {
  return (
    <div className="mt-7 grid w-full grid-cols-3 gap-3">

      {benefits.map((benefit) => {
        const Icon = benefit.icon;

        return (
          <div
            key={benefit.title}
            className="flex min-h-[100px] flex-col items-center justify-center gap-2 rounded-2xl border border-purple-100/70 bg-purple-50/40 px-2 py-4 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:border-slate-700 dark:bg-slate-800/60"
          >

            <Icon
              size={30}
              strokeWidth={2.4}
              className="text-purple-700 dark:text-purple-400"
            />

            <h3 className="text-[13px] font-bold leading-tight text-slate-900 dark:text-white xl:text-sm">
              {benefit.title}
            </h3>

          </div>
        );
      })}

    </div>
  );
};

export default LoginBenefits;

