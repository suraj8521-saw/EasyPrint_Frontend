interface PageLoaderProps {
  title?: string;
  subtitle?: string;
  fullScreen?: boolean;
  variant?: "spinner" | "plans" | "dashboard";
}

const PageLoader = ({
  title = "Loading...",
  subtitle = "Please wait while we prepare your workspace.",
  fullScreen = false,
  variant = "spinner",
}: PageLoaderProps) => {
  if (variant === "plans") {
    return (
      <div className="space-y-5" aria-busy="true" aria-label="Loading activation plans">
        {/* Hero Shimmer */}
        <div className="h-32 w-full animate-pulse rounded-2xl bg-gradient-to-r from-purple-200/70 via-purple-100/80 to-purple-200/70 dark:from-purple-950/60 dark:via-slate-900 dark:to-purple-950/60" />

        {/* Stepper Shimmer */}
        <div className="h-14 w-full animate-pulse rounded-2xl border border-purple-100 bg-white/80 dark:border-slate-800 dark:bg-slate-900/70" />

        {/* 3 Plan Cards + Order Summary Shimmer */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:col-span-8">
            {[1, 2, 3].map((idx) => (
              <div
                key={idx}
                className="h-72 animate-pulse rounded-2xl border border-purple-100 bg-white/85 p-5 dark:border-slate-800 dark:bg-slate-900/75"
              >
                <div className="flex items-center gap-3">
                  <div className="h-11 w-11 rounded-xl bg-purple-200/60 dark:bg-slate-800" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 w-24 rounded bg-slate-200 dark:bg-slate-800" />
                    <div className="h-3 w-16 rounded bg-slate-200/70 dark:bg-slate-800/70" />
                  </div>
                </div>
                <div className="mx-auto my-7 h-8 w-24 rounded-lg bg-purple-200/50 dark:bg-slate-800" />
                <div className="space-y-2.5 border-t border-slate-100 pt-4 dark:border-slate-800">
                  <div className="h-3 w-full rounded bg-slate-200/70 dark:bg-slate-800/70" />
                  <div className="h-3 w-4/5 rounded bg-slate-200/70 dark:bg-slate-800/70" />
                  <div className="h-3 w-3/4 rounded bg-slate-200/70 dark:bg-slate-800/70" />
                </div>
              </div>
            ))}
          </div>

          <div className="h-80 animate-pulse rounded-2xl border border-purple-100 bg-white/85 p-5 dark:border-slate-800 dark:bg-slate-900/75 lg:col-span-4">
            <div className="h-5 w-36 rounded bg-slate-200 dark:bg-slate-800" />
            <div className="mt-5 h-12 w-full rounded-xl bg-purple-100/70 dark:bg-slate-800" />
            <div className="mt-6 space-y-3">
              <div className="h-4 w-full rounded bg-slate-200/70 dark:bg-slate-800/70" />
              <div className="h-4 w-full rounded bg-slate-200/70 dark:bg-slate-800/70" />
            </div>
            <div className="mt-6 h-12 w-full rounded-xl bg-purple-300/60 dark:bg-purple-900/50" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      role="status"
      aria-live="polite"
      className={`flex flex-col items-center justify-center px-4 text-center ${
        fullScreen ? "min-h-[100dvh]" : "min-h-[340px] py-12"
      }`}
    >
      <div className="relative flex h-14 w-14 items-center justify-center">
        <span className="absolute inset-0 animate-ping rounded-full bg-purple-500/20" />
        <span className="relative flex h-12 w-12 items-center justify-center rounded-full border-4 border-purple-200 border-t-purple-600 animate-spin dark:border-slate-800 dark:border-t-purple-400" />
      </div>

      <p className="mt-4 text-sm font-bold text-slate-900 dark:text-white sm:text-base">
        {title}
      </p>
      {subtitle && (
        <p className="mt-1 max-w-xs text-xs text-slate-500 dark:text-slate-400 sm:text-sm">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default PageLoader;
