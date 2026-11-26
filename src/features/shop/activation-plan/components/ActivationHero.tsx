import { Crown } from "lucide-react";

const ActivationHero = () => {
  return (
    <section
      className="
        relative isolate overflow-hidden rounded-2xl
        border border-purple-200/70
        bg-gradient-to-r from-[#8b3dff] via-[#7526f2] to-[#5e15d6]
        px-4 py-4 text-white shadow-md
        dark:border-purple-800/60
        dark:from-[#370a85] dark:via-[#4913a6] dark:to-[#240954]
        sm:px-7 sm:py-6
      "
    >
      {/* iOS-Safe Radial Glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-12 -top-16 h-60 w-60 rounded-full bg-[radial-gradient(circle,rgba(232,121,249,0.24)_0%,rgba(232,121,249,0)_70%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-1/3 h-44 w-72 rounded-full bg-[radial-gradient(circle,rgba(216,180,254,0.18)_0%,rgba(216,180,254,0)_70%)]"
      />

      <div className="relative z-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div className="min-w-0 max-w-[560px]">
          <h1 className="flex items-center gap-2 text-lg font-extrabold tracking-tight sm:text-2xl lg:text-[26px]">
            <span className="truncate">Activate Your Shop</span>
            <Crown className="h-5 w-5 shrink-0 text-amber-300 sm:h-6 sm:w-6" strokeWidth={2.4} />
          </h1>

          <p className="mt-1.5 text-xs font-medium leading-5 text-white/90 sm:mt-2 sm:text-sm sm:leading-6">
            Choose a plan, apply a coupon, and complete the payment to activate
            your shop and start receiving print orders.
          </p>
        </div>

        <div className="pointer-events-none flex shrink-0 items-center justify-end gap-2.5 sm:gap-3">
          <img
            src="/images/Locked-Shop.png"
            alt="Locked shop illustration"
            decoding="async"
            className="block h-[68px] w-[86px] object-contain drop-shadow-md sm:h-[108px] sm:w-[136px] dark:hidden"
          />
          <img
            src="/images/locked-shop-dark.png"
            alt="Locked shop illustration"
            decoding="async"
            className="hidden h-[68px] w-[86px] object-contain drop-shadow-[0_0_16px_rgba(168,85,247,0.4)] sm:h-[108px] sm:w-[136px] dark:block"
          />

          <img
            src="/images/shop-printer.png"
            alt="Shop printer illustration"
            decoding="async"
            className="hidden h-[98px] w-[126px] object-contain drop-shadow-md xl:block dark:hidden"
          />
          <img
            src="/images/shop-printer-dark.png"
            alt="Shop printer illustration"
            decoding="async"
            className="hidden h-[98px] w-[126px] object-contain drop-shadow-[0_0_16px_rgba(168,85,247,0.35)] dark:xl:block"
          />
        </div>
      </div>
    </section>
  );
};

export default ActivationHero;
