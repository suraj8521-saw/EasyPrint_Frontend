import { useState } from "react";
import { Info, Link as LinkIcon } from "lucide-react";
import HowActivationWorksModal from "./HowActivationWorksModal";

interface LockedDashboardMobileProps {
  onActivate?: () => void;
}

const LockedDashboardMobile = ({ onActivate }: LockedDashboardMobileProps) => {
  const [showInfo, setShowInfo] = useState(false);

  const handleActivate = () => {
    setShowInfo(false);
    onActivate?.();
  };

  return (
    <>
      <section className="flex w-full flex-col items-center px-2 pb-6 pt-1 text-center md:hidden">
        <img
          src="/images/Locked-Shop.png"
          alt="Shop is not activated"
          decoding="async"
          className="mb-2.5 block h-[175px] w-full max-w-[310px] object-contain dark:hidden"
        />

        <img
          src="/images/locked-shop-dark.png"
          alt="Shop is not activated"
          decoding="async"
          className="mb-2.5 hidden h-[175px] w-full max-w-[310px] object-contain dark:block"
        />

        <h2 className="text-xl font-extrabold leading-snug tracking-tight text-slate-950 dark:text-white">
          Your Shop is{" "}
          <span className="text-purple-700 dark:text-purple-400">
            Not Activated
          </span>{" "}
          Yet
        </h2>

        <p className="mt-1.5 max-w-[340px] text-xs font-medium leading-5 text-slate-600 dark:text-slate-300">
          Activate your shop to unlock the dashboard, manage services, set
          pricing, generate QR code and receive print orders from customers.
        </p>

        <div className="mt-5 flex w-full flex-col gap-2.5">
          <button
            type="button"
            onClick={handleActivate}
            className="
              flex w-full cursor-pointer items-center justify-center gap-2.5
              rounded-xl border border-purple-600/40
              bg-gradient-to-r from-purple-700 to-purple-900
              px-4 py-3.5 text-sm font-bold text-white
              shadow-md shadow-purple-500/20
              active:scale-[0.98]
            "
          >
            <LinkIcon size={18} />
            <span>Activate Your Shop</span>
          </button>

          <button
            type="button"
            onClick={() => setShowInfo(true)}
            className="
              flex w-full cursor-pointer items-center justify-center gap-2.5
              rounded-xl border border-purple-200
              bg-white/90 px-4 py-3
              text-sm font-bold text-purple-800 shadow-xs
              dark:border-slate-700 dark:bg-slate-900/90
              dark:text-white
            "
          >
            <Info size={18} className="text-purple-700 dark:text-purple-300" />
            <span>How Activation Works?</span>
          </button>
        </div>
      </section>

      <HowActivationWorksModal
        isOpen={showInfo}
        onClose={() => setShowInfo(false)}
        onActivate={handleActivate}
      />
    </>
  );
};

export default LockedDashboardMobile;
