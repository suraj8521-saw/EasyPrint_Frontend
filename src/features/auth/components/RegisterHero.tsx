import type { RegisterRole } from "../types/auth.types";

interface RegisterHeroProps {
  role: RegisterRole;
}

const RegisterHero = ({ role }: RegisterHeroProps) => {
  const isShopkeeper = role === "shop";

  return (
    <div className="relative mx-auto w-full max-w-[650px]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-6 rounded-full bg-[radial-gradient(circle,rgba(192,132,252,0.28)_0%,rgba(192,132,252,0)_70%)] dark:bg-[radial-gradient(circle,rgba(126,34,206,0.22)_0%,rgba(126,34,206,0)_70%)]"
      />

      <div className="relative z-10 flex h-[260px] items-center justify-center overflow-hidden sm:h-[300px] lg:h-[320px] xl:h-[340px]">
        <img
          src={
            isShopkeeper
              ? "/images/shopkeeper-transparent.png"
              : "/images/customer-transparent.png"
          }
          alt={
            isShopkeeper
              ? "EasyPrint shopkeeper illustration"
              : "EasyPrint customer illustration"
          }
          decoding="async"
          className="h-full w-full object-contain"
        />
      </div>
    </div>
  );
};

export default RegisterHero;
