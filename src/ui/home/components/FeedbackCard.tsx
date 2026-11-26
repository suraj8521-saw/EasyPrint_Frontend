import { ShieldCheck } from "lucide-react";
import type { feedbackItem } from "../data/feedbacksData";
import StarRating from "./StarRating";

interface FeedbackCardProps {
  review: feedbackItem;
}

const FeedbackCard = ({ review }: FeedbackCardProps) => {
  return (
    <article
      className="
        w-full select-none rounded-2xl border border-slate-200/90 p-6 shadow-sm
        transition-all duration-300 ease-out
        hover:-translate-y-1 hover:border-blue-200 hover:shadow-md
        dark:border-slate-700/80
        dark:hover:border-blue-500/40 dark:hover:shadow-slate-950/50
      "
    >
      {/* Header: Avatar, Name & Verified Badge */}
      <div className="flex items-center gap-3.5 sm:gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-extrabold text-blue-600 dark:bg-blue-900/50 dark:text-blue-400 sm:h-12 sm:w-12 sm:text-base">
          {review.avatar}
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="truncate font-bold text-slate-900 dark:text-white">
            {review.name}
          </h3>
          <p className="truncate text-xs text-slate-500 dark:text-slate-400">
            {review.role}
          </p>
        </div>

        <span
          className="ml-auto shrink-0 text-blue-500 dark:text-blue-400"
          title="Verified User"
        >
          <ShieldCheck className="h-[22px] w-[22px]" aria-hidden="true" />
        </span>
      </div>

      {/* Divider */}
      <div className="my-5 border-t border-slate-200/80 dark:border-slate-700/80" />

      {/* Dynamic Rating & Fractional Stars */}
      <div className="flex items-center gap-2">
        <span className="text-sm font-bold text-slate-700 dark:text-slate-300">
          {review.rating}
        </span>
        <StarRating rating={review.rating} />
      </div>

      {/* Review Text */}
      <p className="mt-4 min-h-[72px] text-sm leading-6 text-slate-600 dark:text-slate-300">
        {review.text}
      </p>
    </article>
  );
};

export default FeedbackCard;