import React from "react";

const StepCard = ({ number, icon, title, text }) => {
  return (
    <article className="group relative rounded-[28px] border border-blue-100 bg-white/85 p-9 text-center shadow-sm backdrop-blur-sm hover:shadow-xl hover:shadow-blue-500/10 dark:border-slate-700 dark:bg-slate-800">
      <span className="absolute -top-4 left-1/2 flex h-9 w-9 -translate-x-1/2 items-center justify-center rounded-full bg-blue-600 text-xs font-extrabold text-white shadow-lg shadow-blue-500/30">
        {number}
      </span>
      <span className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white dark:bg-slate-700">
        {React.cloneElement(icon, { size: 30 })}
      </span>
      <h3 className="mb-3 text-xl font-extrabold text-slate-800 dark:text-white">
        {title}
      </h3>
      <p className="text-sm leading-7 text-slate-500 dark:text-slate-400">
        {text}
      </p>
    </article>
  );
};

export default StepCard;
