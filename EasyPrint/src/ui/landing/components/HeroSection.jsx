import { ArrowRight, MapPin, FileText, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate()
  return (
    <section
      id="home"
      className="relative mx-auto grid min-h-[calc(100vh-110px)] max-w-[1500px] items-center gap-8 px-6 py-8 lg:grid-cols-2 lg:gap-10 lg:px-16 lg:py-10"
    >
      {/* Left Content */}
      <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
        {/* Badge */}
        <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-slate-200 bg-white/80 px-5 py-3 text-xs font-bold tracking-[0.18em] text-slate-500 shadow-sm dark:border-slate-700 dark:bg-slate-800/80 dark:text-slate-300">
          <span className="text-blue-600">✦</span>
          RECOGNIZED AS A SMART PRINTING PLATFORM
        </div>

        {/* Heading */}
        <h1 className="text-5xl font-black leading-[1.05] tracking-[-0.045em] text-slate-900 dark:text-white sm:text-6xl md:text-7xl xl:text-[88px]">
          Smarter <span className="italic text-blue-600">Printing</span>
          <br />
          <span className="italic text-blue-600">Solutions</span> for
          <br className="hidden lg:block" /> Everyone
        </h1>

        {/* Description */}
        <p className="mt-6 max-w-2xl text-base leading-8 text-slate-500 dark:text-slate-400 sm:text-lg">
          Upload, edit, and print seamlessly — all in one secure, intelligent
          platform designed for students, teams and modern businesses.
        </p>

        {/* Buttons */}
        <div
          className="mt-7 flex flex-wrap items-center justify-center gap-4 lg:justify-start"
          id="get-started"
        >
          <button
            type="button"
            onClick={() => navigate("/account-selection")}
            className="group flex cursor-pointer items-center gap-3 rounded-full bg-blue-600 px-8 py-4 font-bold text-white shadow-xl shadow-blue-500/25 transition-all duration-300 hover:-translate-y-1 hover:bg-blue-700 hover:shadow-blue-500/40 active:scale-95"
          >
            Get Started
            <ArrowRight
              size={19}
              className="transition-transform duration-300 group-hover:translate-x-1.5"
            />
          </button>

          <button
            type="button"
            onClick={() => console.log("Find a Shop")}
            className="group flex cursor-pointer items-center gap-3 rounded-full border border-slate-200 bg-white px-8 py-4 font-bold text-slate-800 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-400 hover:bg-blue-50 hover:text-blue-600 hover:shadow-lg hover:shadow-blue-500/10 active:translate-y-0 active:scale-95 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:hover:border-blue-500 dark:hover:bg-slate-700"
          >
            <MapPin
              size={19}
              className="text-blue-600 transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-110"
            />
            Find a Shop
          </button>
        </div>

        {/* Customer Trust */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
          <div className="flex -space-x-3">
            {["R", "A", "P"].map((letter, i) => (
              <span
                key={letter}
                className={`flex h-10 w-10 items-center justify-center rounded-full border-2 border-white text-sm font-bold text-white dark:border-slate-900 ${
                  ["bg-blue-500", "bg-emerald-500", "bg-orange-500"][i]
                }`}
              >
                {letter}
              </span>
            ))}

            <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-slate-900 text-xs font-bold text-white dark:border-slate-900">
              +5k
            </span>
          </div>

          <span className="text-sm text-slate-500 dark:text-slate-400">
            Join{" "}
            <strong className="text-slate-800 dark:text-white">10,000+</strong>{" "}
            happy customers
          </span>
        </div>
      </div>

      {/* Right Image Section */}
      <div className="relative mx-auto w-full max-w-[650px] px-5 py-8 sm:px-9 sm:py-10">
        {/* Background Glow */}
        <div className="absolute inset-5 rounded-full bg-blue-300/30 blur-[90px] dark:bg-blue-600/15" />

        <div className="absolute -left-5 top-10 h-48 w-48 rounded-full bg-blue-100/60 blur-3xl dark:bg-blue-900/20" />

        <div className="absolute -right-5 bottom-10 h-48 w-48 rounded-full bg-sky-100/70 blur-3xl dark:bg-sky-900/20" />

        {/* Main Image - No White Frame */}
        <div className="relative z-10 overflow-hidden rounded-[30px] shadow-[0_25px_70px_rgba(37,99,235,0.15)] sm:rounded-[38px]">
          <img
            src="/images/hero-image.png"
            alt="EasyPrint shop QR code and mobile document printing preview"
            className="block h-full w-full object-cover"
          />
        </div>

        {/* Secure & Private Badge */}
        <div className="absolute left-0 top-[-20px] z-20 flex max-w-[190px] items-center gap-2.5 rounded-2xl border border-white/80 bg-white/95 p-2.5 shadow-[0_15px_40px_rgba(15,23,42,0.14)] backdrop-blur-xl dark:border-slate-700 dark:bg-slate-800/95 sm:-left-2 sm:top-[-20px] sm:max-w-[220px] sm:gap-3 sm:p-4 lg:-left-5">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40">
            <ShieldCheck size={22} />
          </span>

          <span className="min-w-0">
            <b className="block whitespace-nowrap text-sm font-bold text-slate-800 dark:text-white">
              Secure & Private
            </b>
            <small className="block whitespace-nowrap text-xs text-slate-400">
              Your files stay protected
            </small>
          </span>
        </div>

        {/* PDF Badge */}
        <div className="absolute bottom-4 right-0 z-20 flex max-w-[185px] items-center gap-2.5 rounded-2xl border border-white/80 bg-white/95 p-2.5 shadow-[0_15px_40px_rgba(15,23,42,0.14)] backdrop-blur-xl dark:border-slate-700 dark:bg-slate-800/95 sm:-right-2 sm:bottom-8 sm:max-w-[205px] sm:gap-3 sm:p-4 lg:-right-5">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-900/40">
            <FileText size={22} />
          </span>

          <span className="min-w-0">
            <b className="block whitespace-nowrap text-sm font-bold text-slate-800 dark:text-white">
              Resume_v2.pdf
            </b>
            <small className="block whitespace-nowrap text-xs text-slate-400">
              Ready to print
            </small>
          </span>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
