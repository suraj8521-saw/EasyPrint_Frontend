import { useState } from "react";
import { Info, Link as LinkIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import HowActivationWorksModal from "./HowActivationWorksModal";

interface ShopLockedHeroProps {
  onActivate?: () => void;
}

const ShopLockedHero = ({ onActivate }: ShopLockedHeroProps) => {
  const [showInfo, setShowInfo] = useState(false);
  const navigate = useNavigate();

  const handleActivate = () => {
    setShowInfo(false);
    if (onActivate) {
      onActivate();
    } else {
      navigate("/shop/activation");
    }
  };

  return (
    <>
      <section className="hidden w-full flex-col items-center px-4 pb-8 pt-0 text-center md:flex">
        {/* Light Mode Image */}
        <img
          src="/images/Locked-Shop.png"
          alt="Shop is not activated"
          className="
            mb-3 block h-[220px] w-full max-w-[470px]
            object-contain sm:h-[245px] lg:h-[255px]
            dark:hidden
          "
        />

        {/* Dark Mode Image */}
        <img
          src="/images/locked-shop-dark.png"
          alt="Shop is not activated"
          className="
            mb-3 hidden h-[220px] w-full max-w-[470px]
            object-contain sm:h-[245px] lg:h-[255px]
            dark:block
          "
        />

        {/* Heading */}
        <h2 className="text-2xl font-extrabold tracking-tight text-slate-950 dark:text-white sm:text-3xl">
          Your Shop is{" "}
          <span className="text-purple-700 dark:text-purple-400">
            Not Activated
          </span>{" "}
          Yet
        </h2>

        {/* Description */}
        <p className="mt-2 max-w-[680px] text-sm font-medium leading-6 text-slate-700 dark:text-slate-300 sm:text-lg">
          Activate your shop to unlock the dashboard, manage services, set
          pricing, generate QR code and receive print orders from customers.
        </p>

        {/* Action Buttons */}
        <div className="mt-7 flex w-full max-w-[405px] flex-col gap-3">
          <button
            type="button"
            onClick={handleActivate}
            className="
              group flex cursor-pointer items-center justify-center gap-3
              rounded-2xl border border-purple-600/40
              bg-gradient-to-r from-purple-700 to-purple-900
              px-6 py-4 text-base font-bold text-white
              shadow-lg shadow-purple-500/20
              transition-all duration-300
              hover:-translate-y-1 hover:shadow-xl
              hover:shadow-purple-500/35
              active:translate-y-0 active:scale-[0.98]
            "
          >
            <LinkIcon
              size={23}
              className="transition-transform duration-300 group-hover:rotate-[-12deg]"
            />
            Activate Your Shop
          </button>

          <button
            type="button"
            onClick={() => setShowInfo(true)}
            className="
              flex cursor-pointer items-center justify-center gap-3
              rounded-2xl border border-purple-200
              bg-white/70 px-6 py-4
              font-bold text-purple-800 shadow-sm
              transition-all duration-300
              hover:-translate-y-0.5 hover:bg-purple-50
              hover:shadow-md
              dark:border-slate-700 dark:bg-slate-900/70
              dark:text-white dark:hover:border-purple-500
              dark:hover:bg-purple-950/40
            "
          >
            <Info size={22} className="text-purple-700 dark:text-purple-300" />
            How Activation Works?
          </button>
        </div>
      </section>

      {/* Extracted Modal Component */}
      <HowActivationWorksModal
        isOpen={showInfo}
        onClose={() => setShowInfo(false)}
        onActivate={handleActivate}
      />
    </>
  );
};

export default ShopLockedHero;