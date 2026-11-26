const LoginHero = () => {
  return (
    <div className="relative w-full">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-4 rounded-full bg-[radial-gradient(circle,rgba(192,132,252,0.28)_0%,rgba(192,132,252,0)_70%)] dark:bg-[radial-gradient(circle,rgba(126,34,206,0.22)_0%,rgba(126,34,206,0)_70%)]"
      />

      <div className="relative z-10 flex h-[270px] items-center justify-center xl:h-[300px]">
        <img
          src="/images/loginpage.png"
          alt="EasyPrint Printer Illustration"
          className="h-full w-full object-contain"
          decoding="async"
        />
      </div>

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
