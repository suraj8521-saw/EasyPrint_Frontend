import React from "react";

const FeatureCard = ({ icon, title, text }) => {
  return (
    <article className="group rounded-[28px] border border-slate-100 bg-slate-50/90 p-8 hover:border-blue-200 hover:bg-white hover:shadow-xl hover:shadow-blue-500/5 dark:border-slate-700 dark:bg-slate-800 dark:hover:border-blue-500 dark:hover:bg-slate-800">
      <span className="mb-7 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-blue-600 shadow-sm group-hover:bg-blue-600 group-hover:text-white dark:bg-slate-700">
        {React.cloneElement(icon, { size: 26 })}
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

export default FeatureCard;
