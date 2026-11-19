const LoginHero = () => {
  return (
    <div className="relative w-full">
      {/* Background Glow */}
      <div className="absolute inset-10 rounded-full bg-purple-300/30 blur-[75px] dark:bg-purple-700/20" />

      {/* Printer Illustration */}
      <div className="relative z-10 flex h-[270px] items-center justify-center xl:h-[300px]">
        <img
          src="/images/loginpage.png"
          alt="EasyPrint Printer Illustration"
          className="h-full w-full object-contain"
        />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 mt-2 text-center">
        <h2 className="text-[26px] font-black leading-tight tracking-tight text-slate-900 dark:text-white xl:text-[29px]">
          Print, Scan, Copy{" "}
          <span className="text-purple-700 dark:text-purple-400">& More</span>
        </h2>

        <p className="mx-auto mt-2 max-w-[390px] text-base leading-6 text-slate-600 dark:text-slate-400 xl:text-lg">
          A simple and faster way to handle all your printing needs online.
        </p>
      </div>
    </div>
  );
};

export default LoginHero;
