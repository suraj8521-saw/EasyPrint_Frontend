import { useState } from "react";
import { ArrowRight, MapPin, FileText, ShieldCheck } from "lucide-react";

import Button from "../../../shared/button/Button";
import { trustAvatars } from "../data/heroData";

const HeroSection = () => {
  const [lightImgLoaded, setLightImgLoaded] = useState<boolean>(false);
  const [darkImgLoaded, setDarkImgLoaded] = useState<boolean>(false);

  const handleFindShop = () => {
    console.log("Find a Shop");
  };

  return (
    <section
      id="home"
      className="relative mx-auto grid min-h-[calc(100dvh-110px)] max-w-[1500px] items-center gap-8 px-4 py-8 sm:px-6 lg:grid-cols-2 lg:gap-10 lg:px-16 lg:py-10"
    >
      {/* Left Content */}
      <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
        {/* Badge */}
        <div className="mb-6 inline-flex max-w-full items-center justify-center gap-2 rounded-full border border-slate-200 bg-white/80 px-3 py-3 text-center text-[10px] font-bold tracking-[0.12em] text-slate-500 shadow-sm dark:border-slate-700 dark:bg-slate-800/80 dark:text-slate-300 sm:gap-3 sm:px-5 sm:text-xs sm:tracking-[0.18em]">
          <span className="relative -top-2 shrink-0 text-base leading-none text-blue-600 sm:top-0">
            ✦
          </span>

          <span className="leading-tight">
            RECOGNIZED AS A SMART PRINTING PLATFORM
          </span>
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
          {/* Reusable Get Started Button */}
          <Button
            icon={
              <ArrowRight
                size={19}
                className="transition-transform duration-300 group-hover:translate-x-1.5"
              />
            }
            className="group gap-3 bg-none bg-blue-600 px-8 py-4 text-base shadow-xl shadow-blue-500/25 hover:scale-100 hover:bg-blue-700 hover:shadow-blue-500/40"
          />

          <button
            type="button"
            onClick={handleFindShop}
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
            {trustAvatars.map(({ letter, bgClass }) => (
              <span
                key={letter}
                className={`flex h-10 w-10 items-center justify-center rounded-full border-2 border-white text-sm font-bold text-white dark:border-slate-900 ${bgClass}`}
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
      <div className="relative mx-auto w-full max-w-[650px] px-2 pb-6 pt-5 sm:px-9 sm:py-10">
        {/* Background Glow (Pure Radial Gradient - Same Visual, Zero iOS Blur Lag) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(147,197,253,0.35)_0%,rgba(147,197,253,0)_70%)] dark:bg-[radial-gradient(circle,rgba(37,99,235,0.22)_0%,rgba(37,99,235,0)_70%)]"
        />

        {/* Main Image Container */}
        <div
          className={`group relative z-10 overflow-hidden rounded-[26px] border border-white/60 bg-slate-100/80 shadow-[0_25px_70px_rgba(37,99,235,0.15)] transition-all duration-500 ease-out hover:-translate-y-1.5 hover:shadow-[0_32px_80px_rgba(37,99,235,0.28)] dark:border-slate-700/60 dark:bg-slate-800/80 dark:shadow-[0_25px_70px_rgba(15,23,42,0.6)] dark:hover:shadow-[0_32px_80px_rgba(59,130,246,0.25)] sm:rounded-[38px] ${
            !lightImgLoaded && !darkImgLoaded
              ? "min-h-[220px] sm:min-h-[340px]"
              : ""
          }`}
        >
          {/* Image Shimmer Placeholder (Light & Dark) */}
          {!lightImgLoaded && (
            <div
              aria-hidden="true"
              className="absolute inset-0 animate-pulse bg-slate-200/90 dark:hidden"
            />
          )}
          {!darkImgLoaded && (
            <div
              aria-hidden="true"
              className="absolute inset-0 hidden animate-pulse bg-slate-800 dark:block"
            />
          )}

          {/* Light Mode Image */}
          <img
            src="/images/hero-image.png"
            alt="EasyPrint shop QR code and mobile document printing preview"
            fetchPriority="high"
            decoding="async"
            onLoad={() => setLightImgLoaded(true)}
            className={`block h-auto w-full object-cover transition-all duration-500 ease-out group-hover:scale-[1.03] dark:hidden ${
              lightImgLoaded ? "opacity-100" : "opacity-0"
            }`}
          />

          {/* Dark Mode Image */}
          <img
            src="/images/hero-image-dark.png"
            alt="EasyPrint shop QR code and mobile document printing preview in dark mode"
            fetchPriority="high"
            decoding="async"
            onLoad={() => setDarkImgLoaded(true)}
            className={`hidden h-auto w-full object-cover transition-all duration-500 ease-out group-hover:scale-[1.03] dark:block ${
              darkImgLoaded ? "opacity-100" : "opacity-0"
            }`}
          />

          {/* Subtle Hover Shine Overlay */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-blue-600/0 via-white/0 to-white/15 opacity-0 transition-opacity duration-500 group-hover:opacity-100 dark:to-blue-400/10" />
        </div>

        {/* Secure & Private Badge */}
        <div className="absolute left-0 top-0 z-20 flex w-fit max-w-[calc(100%-1rem)] items-center gap-2 rounded-2xl border border-white/80 bg-white/95 px-2.5 py-2 shadow-[0_12px_32px_rgba(15,23,42,0.14)] backdrop-blur-xl transition-transform duration-300 hover:-translate-y-1 dark:border-slate-700 dark:bg-slate-800/95 sm:-left-2 sm:-top-3 sm:gap-3 sm:p-4 lg:-left-5">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 sm:h-11 sm:w-11">
            <ShieldCheck className="h-4 w-4 sm:h-[22px] sm:w-[22px]" />
          </span>

          <div className="min-w-0 leading-tight">
            <b className="block text-[11px] font-bold text-slate-800 dark:text-white sm:text-sm">
              Secure & Private
            </b>
            <small className="mt-0.5 block text-[10px] text-slate-500 dark:text-slate-400 sm:text-xs">
              Your files stay protected
            </small>
          </div>
        </div>

        {/* PDF Badge */}
        <div className="absolute bottom-0 right-0 z-20 flex w-fit max-w-[calc(100%-1rem)] items-center gap-2 rounded-2xl border border-white/80 bg-white/95 px-2.5 py-2 shadow-[0_12px_32px_rgba(15,23,42,0.14)] backdrop-blur-xl transition-transform duration-300 hover:-translate-y-1 dark:border-slate-700 dark:bg-slate-800/95 sm:-right-2 sm:bottom-6 sm:gap-3 sm:p-4 lg:-right-5">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-900/40 sm:h-11 sm:w-11">
            <FileText className="h-4 w-4 sm:h-[22px] sm:w-[22px]" />
          </span>

          <div className="min-w-0 leading-tight">
            <b className="block text-[11px] font-bold text-slate-800 dark:text-white sm:text-sm">
              Resume_v2.pdf
            </b>
            <small className="mt-0.5 block text-[10px] text-slate-500 dark:text-slate-400 sm:text-xs">
              Ready to print
            </small>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;