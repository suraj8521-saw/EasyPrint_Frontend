
import registerBenefits from "../data/registerBenefits";

const RegisterBenefits = ({ role }) => {
  const benefits = registerBenefits[role];

  return (
    <div className="w-full">

      {/* Heading */}
      <div className="mb-4 flex justify-center">
        <span className="rounded-full border border-purple-200 bg-purple-100/70 px-7 py-2.5 text-lg font-extrabold text-purple-800 shadow-sm dark:border-purple-800 dark:bg-purple-900/30 dark:text-purple-300">
          Why Join EasyPrint?
        </span>
      </div>

      {/* Benefit Cards */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">

        {benefits.map((benefit) => {
          const Icon = benefit.icon;

          return (
            <div
              key={benefit.title}
              className="group flex flex-col items-center justify-center rounded-[22px] border border-purple-100 bg-white/70 px-3 py-4 text-center shadow-[0_10px_30px_rgba(124,58,237,0.08)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-purple-300 hover:shadow-xl hover:shadow-purple-500/10 dark:border-slate-700 dark:bg-slate-900/70"
            >
              <Icon
                size={34}
                strokeWidth={2.2}
                className="mb-2 text-purple-700 transition-transform duration-300 group-hover:scale-110 dark:text-purple-400"
              />

              <h3 className="text-sm font-extrabold text-slate-900 dark:text-white lg:text-base">
                {benefit.title}
              </h3>

              <p className="mt-1.5 text-xs leading-5 text-slate-600 dark:text-slate-400">
                {benefit.description}
              </p>
            </div>
          );
        })}

      </div>
    </div>
  );
};

export default RegisterBenefits;
