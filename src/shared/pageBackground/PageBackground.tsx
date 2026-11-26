import type { ReactNode } from "react";

interface PageBackgroundProps {
  children: ReactNode;
  className?: string;
  showWaves?: boolean;
}

const PageBackground = ({
  children,
  className = "",
  showWaves = true,
}: PageBackgroundProps) => {
  return (
    <div
      className={`
        relative min-h-[100dvh] w-full overflow-x-clip
        bg-gradient-to-br
        from-[#F3EFFF] via-[#F7F5FF] to-[#EFE9FF]
        
        dark:from-slate-950 dark:via-[#0c1020] dark:to-[#100b24]
        ${className}
      `}
    >
      {/* Hardware-Locked Static Background Layer (Zero blur-[100px] GPU crash on iOS) */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 overflow-hidden [backface-visibility:hidden] [transform:translateZ(0)]"
      >
        {/* SVG Wavy Gradient Ribbons */}
        {showWaves && (
          <svg
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 1440 900"
            fill="none"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <defs>
              {/* Top Left Blue-Lavender */}
              <linearGradient
                id="wave-tl"
                x1="0"
                y1="280"
                x2="320"
                y2="140"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0%" stopColor="#A5B4FC" stopOpacity="0.65" />
                <stop offset="55%" stopColor="#C4B5FD" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#E9D5FF" stopOpacity="0" />
              </linearGradient>

              {/* Top Right Pink-Purple */}
              <linearGradient
                id="wave-tr"
                x1="1440"
                y1="100"
                x2="1150"
                y2="280"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0%" stopColor="#D8B4FE" stopOpacity="0.7" />
                <stop offset="50%" stopColor="#E9D5FF" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#F3E8FF" stopOpacity="0" />
              </linearGradient>

              {/* Bottom Left Lavender */}
              <linearGradient
                id="wave-bl"
                x1="0"
                y1="730"
                x2="260"
                y2="900"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0%" stopColor="#E9D5FF" stopOpacity="0.75" />
                <stop offset="65%" stopColor="#DDD6FE" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#EDE9FE" stopOpacity="0" />
              </linearGradient>

              {/* Bottom Right Upper Wave */}
              <linearGradient
                id="wave-br-1"
                x1="1440"
                y1="640"
                x2="1050"
                y2="900"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0%" stopColor="#C7D2FE" stopOpacity="0.55" />
                <stop offset="60%" stopColor="#DDD6FE" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#F5F3FF" stopOpacity="0" />
              </linearGradient>

              {/* Bottom Right Lower Wave */}
              <linearGradient
                id="wave-br-2"
                x1="1440"
                y1="760"
                x2="980"
                y2="900"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0%" stopColor="#A5B4FC" stopOpacity="0.55" />
                <stop offset="55%" stopColor="#C4B5FD" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#EDE9FE" stopOpacity="0" />
              </linearGradient>

              {/* Dark Mode SVG Gradients */}
              <linearGradient
                id="dark-wave-tl"
                x1="0"
                y1="280"
                x2="320"
                y2="140"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0%" stopColor="#6366F1" stopOpacity="0.30" />
                <stop offset="55%" stopColor="#8B5CF6" stopOpacity="0.18" />
                <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0" />
              </linearGradient>

              <linearGradient
                id="dark-wave-tr"
                x1="1440"
                y1="100"
                x2="1150"
                y2="280"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0%" stopColor="#A855F7" stopOpacity="0.30" />
                <stop offset="50%" stopColor="#7E22CE" stopOpacity="0.18" />
                <stop offset="100%" stopColor="#7E22CE" stopOpacity="0" />
              </linearGradient>

              <linearGradient
                id="dark-wave-bl"
                x1="0"
                y1="730"
                x2="260"
                y2="900"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0%" stopColor="#9333EA" stopOpacity="0.25" />
                <stop offset="65%" stopColor="#7C3AED" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#7C3AED" stopOpacity="0" />
              </linearGradient>

              <linearGradient
                id="dark-wave-br-1"
                x1="1440"
                y1="640"
                x2="1050"
                y2="900"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.22" />
                <stop offset="60%" stopColor="#7C3AED" stopOpacity="0.16" />
                <stop offset="100%" stopColor="#7C3AED" stopOpacity="0" />
              </linearGradient>

              <linearGradient
                id="dark-wave-br-2"
                x1="1440"
                y1="760"
                x2="980"
                y2="900"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0%" stopColor="#6366F1" stopOpacity="0.28" />
                <stop offset="55%" stopColor="#8B5CF6" stopOpacity="0.16" />
                <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Light Mode Waves */}
            <g className="dark:hidden">
              <path
                d="M -20 230 C 80 140, 180 120, 320 205 C 210 175, 110 215, -20 340 Z"
                fill="url(#wave-tl)"
              />
              <path
                d="M 1460 95 C 1350 95, 1290 210, 1190 285 C 1275 245, 1345 160, 1460 185 Z"
                fill="url(#wave-tr)"
              />
              <path
                d="M -20 715 C 95 730, 125 845, 245 910 L 145 910 C 80 865, 50 815, -20 805 Z"
                fill="url(#wave-bl)"
              />
              <path
                d="M 1460 635 C 1320 635, 1295 815, 1140 855 C 1065 875, 1020 865, 975 910 L 1460 910 Z"
                fill="url(#wave-br-1)"
              />
              <path
                d="M 1460 745 C 1370 770, 1325 865, 1185 875 C 1095 880, 1035 865, 970 910 L 1460 910 Z"
                fill="url(#wave-br-2)"
              />
            </g>

            {/* Dark Mode Waves */}
            <g className="hidden dark:block">
              <path
                d="M -20 230 C 80 140, 180 120, 320 205 C 210 175, 110 215, -20 340 Z"
                fill="url(#dark-wave-tl)"
              />
              <path
                d="M 1460 95 C 1350 95, 1290 210, 1190 285 C 1275 245, 1345 160, 1460 185 Z"
                fill="url(#dark-wave-tr)"
              />
              <path
                d="M -20 715 C 95 730, 125 845, 245 910 L 145 910 C 80 865, 50 815, -20 805 Z"
                fill="url(#dark-wave-bl)"
              />
              <path
                d="M 1460 635 C 1320 635, 1295 815, 1140 855 C 1065 875, 1020 865, 975 910 L 1460 910 Z"
                fill="url(#dark-wave-br-1)"
              />
              <path
                d="M 1460 745 C 1370 770, 1325 865, 1185 875 C 1095 880, 1035 865, 970 910 L 1460 910 Z"
                fill="url(#dark-wave-br-2)"
              />
            </g>
          </svg>
        )}

        {/* Center Glow (Pure Radial Gradient - Same Visual, Zero GPU Blur Filter) */}
        <div
          className="
            absolute left-1/2 top-1/2
            h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2
            rounded-full
            bg-[radial-gradient(circle,rgba(233,213,255,0.35)_0%,rgba(233,213,255,0)_70%)]
            sm:h-[650px] sm:w-[650px]
            lg:h-[900px] lg:w-[950px]
            dark:bg-[radial-gradient(circle,rgba(107,33,168,0.22)_0%,rgba(107,33,168,0)_70%)]
          "
        />

        {/* Extra Purple Glow */}
        <div
          className="
            absolute left-[6%] top-[30%]
            h-64 w-64 rounded-full
            bg-[radial-gradient(circle,rgba(221,214,254,0.35)_0%,rgba(221,214,254,0)_70%)]
            sm:h-80 sm:w-80
            dark:bg-[radial-gradient(circle,rgba(91,33,182,0.22)_0%,rgba(91,33,182,0)_70%)]
          "
        />

        {/* Bottom-Right Printer Glow */}
        <div
          className="
            absolute bottom-0 right-0
            h-56 w-56 rounded-full
            bg-[radial-gradient(circle,rgba(191,219,254,0.45)_0%,rgba(191,219,254,0)_70%)]
            sm:h-72 sm:w-72
            lg:h-96 lg:w-96
            dark:bg-[radial-gradient(circle,rgba(79,70,229,0.26)_0%,rgba(79,70,229,0)_70%)]
          "
        />

        {/* Bottom-Right Printer Illustration */}
        <img
          src="/images/printer-bg.png"
          alt=""
          aria-hidden="true"
          decoding="async"
          className="
            absolute bottom-0 right-0
            w-36 select-none object-contain opacity-25
            sm:w-52
            md:w-64
            lg:w-[320px]
            xl:w-[380px]
            dark:opacity-[0.12]
          "
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex min-h-[100dvh] w-full flex-col">
        {children}
      </div>
    </div>
  );
};

export default PageBackground;