import reviews from "../data/reviews";
import ReviewCard from "./ReviewCard";
import "../styles/feedback.css";

const FeedbackRow = ({ reverse = false }) => {
  const repeatedReviews = [...reviews, ...reviews];

  return (
    <div className="feedback-row overflow-hidden py-4">
      <div className={`feedback-track flex w-max gap-6 ${reverse ? "feedback-reverse" : "feedback-forward"}`}>
        {repeatedReviews.map((review, index) => (
          <div className="w-[310px] shrink-0 sm:w-[370px]" key={`${review.name}-${index}`}>
            <ReviewCard review={review} />
          </div>
        ))}
      </div>
    </div>
  );
};

const FeedbackSection = () => {
  return (
    <section
      id="feedback"
      className="feedback-marquee relative overflow-hidden bg-slate-100 px-5 py-24 dark:bg-[#101827] sm:py-28"
    >
      <div className="relative z-10 mb-14 text-center">
        <span className="text-sm font-extrabold tracking-[0.3em] text-blue-600">
          WHAT OUR USERS SAY
        </span>
        <h2 className="mt-5 text-3xl font-black tracking-tight text-slate-900 dark:text-white sm:text-5xl md:text-6xl">
          Trusted by 10,000+ Customers
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-slate-500 dark:text-slate-400">
          Discover what students and professionals think about their EasyPrint
          experience.
        </p>
      </div>

      <div className="relative z-0 flex flex-col gap-3">
        <FeedbackRow />
        <FeedbackRow reverse />
      </div>

      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-slate-100 to-transparent dark:from-[#101827] sm:w-28" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-slate-100 to-transparent dark:from-[#101827] sm:w-28" />
    </section>
  );
};

export default FeedbackSection;
