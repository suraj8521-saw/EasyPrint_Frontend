import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number | string;
  maxStars?: number;
}

const StarRating = ({ rating, maxStars = 5 }: StarRatingProps) => {
  const parsedRating =
    typeof rating === "number" ? rating : parseFloat(String(rating));
  const safeRating = Number.isNaN(parsedRating)
    ? 0
    : Math.min(maxStars, Math.max(0, parsedRating));

  return (
    <div
      className="flex items-center gap-1"
      aria-label={`${safeRating.toFixed(1)} out of ${maxStars} stars`}
    >
      {Array.from({ length: maxStars }, (_, index) => {
        // Har star ke liye 0% se 100% ke beech fill calculate karega
        // Example: 4.3 -> [100%, 100%, 100%, 100%, 30%]
        const fillPercent = Math.min(
          100,
          Math.max(0, (safeRating - index) * 100)
        );

        return (
          <div key={index} className="relative h-4 w-4 shrink-0">
            {/* Base Empty Star */}
            <Star
              className="h-4 w-4 fill-slate-200 text-slate-300 dark:fill-slate-700 dark:text-slate-600"
              aria-hidden="true"
            />

            {/* Top Clipped Filled Star */}
            {fillPercent > 0 && (
              <div
                className="absolute inset-y-0 left-0 overflow-hidden"
                style={{ width: `${fillPercent}%` }}
              >
                <Star
                  className="h-4 w-4 shrink-0 fill-amber-400 text-amber-400"
                  aria-hidden="true"
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default StarRating;