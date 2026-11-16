import { ShieldCheck } from "lucide-react";

const ReviewCard = ({ review }) => {
  return (
    <article className="w-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-100 font-extrabold text-blue-600 dark:bg-blue-900/50 dark:text-blue-400">
          {review.avatar}
        </div>
        <div className="min-w-0">
          <h3 className="font-bold text-slate-900 dark:text-white">
            {review.name}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {review.role}
          </p>
        </div>
        <div className="ml-auto text-blue-500">
          <ShieldCheck size={22} />
        </div>
      </div>

      <div className="my-5 border-t border-slate-200 dark:border-slate-700" />

      <div className="flex items-center gap-2">
        <span className="text-sm font-bold text-slate-700 dark:text-slate-300">
          {review.rating}
        </span>
        <span className="tracking-wider text-amber-400">★★★★★</span>
      </div>

      <p className="mt-4 min-h-[72px] text-sm leading-6 text-slate-600 dark:text-slate-300">
        {review.text}
      </p>
    </article>
  );
};

export default ReviewCard;
