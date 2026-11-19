import { useEffect } from "react";
import { Store, Check, X, ArrowRight } from "lucide-react";

const benefits = [
  "Access to full dashboard",
  "Receive and manage orders",
  "Set your own pricing",
  "Grow your business online",
];

const ActivateShopModal = ({ isOpen, onClose, onProceed }) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEscape);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="
        fixed inset-0 z-[9999]
        flex items-center justify-center
        bg-slate-950/50
        px-4 py-4
        backdrop-blur-[4px]
      "
      onClick={onClose}
    >
      {/* Modal */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="activate-shop-title"
        onClick={(e) => e.stopPropagation()}
        className="
          relative w-full max-w-[360px]
          rounded-xl border border-purple-100
          bg-white px-5 py-4
          shadow-[0_15px_50px_rgba(0,0,0,0.20)]

          dark:border-purple-900
          dark:bg-[#171329]
          dark:shadow-[0_15px_50px_rgba(0,0,0,0.55)]

          sm:max-w-[460px]
          sm:rounded-2xl
          sm:px-7 sm:py-6

          lg:max-w-[520px]
          lg:px-8 lg:py-7
        "
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close modal"
          className="
            absolute right-2 top-2
            flex h-7 w-7 items-center justify-center
            rounded-full text-slate-500
            transition hover:bg-slate-100
            hover:text-slate-900

            sm:right-3 sm:top-3
            sm:h-8 sm:w-8

            dark:text-slate-400
            dark:hover:bg-slate-800
            dark:hover:text-white
          "
        >
          <X size={18} />
        </button>

        {/* Icon */}
        <div
          className="
            mx-auto mb-2
            flex h-10 w-10 items-center justify-center
            rounded-full bg-purple-100
            text-purple-700

            sm:mb-3 sm:h-12 sm:w-12
            lg:h-14 lg:w-14

            dark:bg-purple-500/20
            dark:text-purple-400
          "
        >
          <Store size={23} strokeWidth={2.2} className="sm:h-7 sm:w-7" />
        </div>

        {/* Title */}
        <div className="text-center">
          <h2
            id="activate-shop-title"
            className="
              text-[15px] font-extrabold
              tracking-tight text-slate-900

              sm:text-xl
              lg:text-2xl

              dark:text-white
            "
          >
            Activate Your Shop
          </h2>

          <p
            className="
              mx-auto mt-1 max-w-[280px]
              text-[10px] leading-[14px]
              text-slate-600

              sm:mt-2 sm:max-w-[360px]
              sm:text-sm sm:leading-5

              dark:text-slate-400
            "
          >
            Subscribe to activate your print shop and unlock all features.
          </p>
        </div>

        {/* Benefits */}
        <div
          className="
            mx-auto mt-3 max-w-[265px] space-y-1.5

            sm:mt-5 sm:max-w-[370px] sm:space-y-3
            lg:mt-6
          "
        >
          {benefits.map((benefit) => (
            <div key={benefit} className="flex items-center gap-2 sm:gap-3">
              <span
                className="
                  flex h-[13px] w-[13px] shrink-0
                  items-center justify-center
                  rounded-full bg-purple-100
                  text-purple-700

                  sm:h-[18px] sm:w-[18px]

                  dark:bg-purple-500/20
                  dark:text-purple-400
                "
              >
                <Check size={9} strokeWidth={3} className="sm:h-3 sm:w-3" />
              </span>

              <span
                className="
                  text-[10px] font-medium
                  leading-[14px] text-slate-700

                  sm:text-sm sm:leading-5

                  dark:text-slate-200
                "
              >
                {benefit}
              </span>
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div
          className="
            mt-4 flex items-center gap-2

            sm:mt-6 sm:gap-3
            lg:mt-7
          "
        >
          <button
            type="button"
            onClick={onClose}
            className="
              flex h-[34px] flex-1 items-center
              justify-center rounded-md
              border border-purple-300
              bg-white px-2
              text-[10px] font-semibold
              text-slate-800
              transition hover:bg-purple-50

              sm:h-11 sm:rounded-lg
              sm:text-sm

              dark:border-purple-700
              dark:bg-transparent
              dark:text-slate-200
              dark:hover:bg-purple-500/10
            "
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onProceed}
            className="
    flex h-[34px] flex-[1.5] cursor-pointer
    items-center justify-center gap-1.5
    rounded-md
    bg-gradient-to-r
    from-[#7540e8] to-[#650bd0]
    px-2 text-[10px] font-bold
    text-white
    shadow-md shadow-purple-500/20
    transition-all duration-300 ease-out
    hover:-translate-y-0.5
    hover:brightness-110
    hover:shadow-lg
    hover:shadow-purple-500/35
    active:translate-y-0
    active:scale-[0.97]
    sm:h-11 sm:rounded-lg
    sm:gap-2 sm:text-sm
  "
          >
            Choose a Plan
            <ArrowRight
              size={13}
              className="transition-transform duration-300 group-hover:translate-x-1 sm:h-4 sm:w-4"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActivateShopModal;
