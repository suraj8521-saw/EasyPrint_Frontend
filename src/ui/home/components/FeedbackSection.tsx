import { useEffect, useState } from "react";
import { getAllLandingFeedbacks, type feedbackItem } from "../data/feedbacksData";
import FeedbackCard from "./FeedbackCard";
import "../styles/feedback.css";

interface FeedbackRowProps {
  items: feedbackItem[];
  reverse?: boolean;
}

const FeedbackRow = ({ items, reverse = false }: FeedbackRowProps) => {
  const [isPaused, setIsPaused] = useState(false);
  const repeatedReviews = [...items, ...items];

  const handleTouchToggle = () => {
    setIsPaused((prev) => !prev);
  };

  return (
    <div
      onTouchStart={handleTouchToggle}
      className={`feedback-row overflow-x-clip py-3 sm:py-4 ${
        isPaused ? "is-paused" : ""
      }`}
    >
      <div
        className={`feedback-track flex w-max gap-5 sm:gap-6 ${
          reverse ? "feedback-reverse" : "feedback-forward"
        }`}
      >
        {repeatedReviews.map((review, index) => (
          <div
            className="w-[290px] shrink-0 sm:w-[370px]"
            key={`${review.id}-${index}`}
          >
            <FeedbackCard review={review} />
          </div>
        ))}
      </div>
    </div>
  );
};

const FeedbackSection = () => {
  const [reviews, setReviews] = useState<feedbackItem[]>(() =>
    getAllLandingFeedbacks()
  );

  useEffect(() => {
    const handleSyncReviews = () => {
      setReviews(getAllLandingFeedbacks());
    };

    window.addEventListener("easyprint:feedback-updated", handleSyncReviews);
    return () => {
      window.removeEventListener("easyprint:feedback-updated", handleSyncReviews);
    };
  }, []);

  return (
    <section
      id="feedback"
      className="feedback-marquee relative overflow-x-clip py-20 sm:py-24 lg:py-28"
    >
      {/* Section Header */}
      <div className="relative z-10 mx-auto mb-12 max-w-2xl px-4 text-center sm:mb-14 sm:px-6 lg:max-w-5xl">
        <span className="inline-block text-xs font-extrabold uppercase tracking-[0.25em] text-blue-600 dark:text-blue-400 sm:text-sm sm:tracking-[0.3em]">
          WHAT OUR USERS SAY
        </span>
        <h2 className="mt-4 text-3xl font-black leading-tight tracking-tight text-slate-900 dark:text-white sm:mt-5 sm:text-5xl lg:whitespace-nowrap lg:text-[3.25rem] xl:text-6xl">
          Trusted by 10,000+ Customers
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-slate-500 dark:text-slate-400 sm:mt-5 sm:text-base sm:leading-7">
          Discover what students and professionals think about their EasyPrint
          experience.
        </p>
      </div>

      {/* Edge-to-Edge Marquee Rows */}
      <div className="relative z-0 flex flex-col gap-2 sm:gap-3">
        <FeedbackRow items={reviews} />
        <FeedbackRow items={reviews} reverse />
      </div>

      {/* Left & Right Smooth Fade Overlays */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-slate-100 to-transparent dark:from-[#101827] sm:w-28" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-slate-100 to-transparent dark:from-[#101827] sm:w-28" />
    </section>
  );
};

export default FeedbackSection;
