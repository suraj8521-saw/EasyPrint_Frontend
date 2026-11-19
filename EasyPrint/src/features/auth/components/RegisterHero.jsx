
const RegisterHero = ({ role }) => {
  const isShopkeeper = role === "shop";

  return (
    <div className="relative mx-auto w-full max-w-[650px]">

      {/* Background Glow */}
      <div className="absolute inset-12 rounded-full bg-purple-300/30 blur-[70px] dark:bg-purple-700/20" />

      {/* Illustration */}
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
          className="h-full w-full object-contain"
        />

      </div>
    </div>
  );
};

export default RegisterHero;
