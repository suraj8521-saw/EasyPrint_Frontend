import type { LucideIcon } from "lucide-react";

export interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  iconColor: string;
  bgColor: string;
}

const StatCard = ({
  title,
  value,
  icon: Icon,
  iconColor,
  bgColor,
}: StatCardProps) => {
  return (
    <div
      className="
        group flex min-h-[92px] min-w-0 items-center gap-4
        rounded-2xl

        border border-[#e9ddff]
        bg-[#fcfaff]
        px-5 py-3.5
        shadow-[0_3px_12px_rgba(124,58,237,0.05)]

        transition-all duration-300
        hover:-translate-y-0.5
        hover:border-purple-200
        hover:shadow-[0_6px_18px_rgba(124,58,237,0.10)]

        dark:border-[#30264e]
        dark:bg-[#171329]
        dark:shadow-[0_4px_16px_rgba(0,0,0,0.18)]
        dark:hover:border-purple-800
        dark:hover:bg-[#1c1633]

        sm:px-5
      "
    >
      {/* Icon Container */}
      <div
        className={`
          flex h-16 w-16 shrink-0 items-center
          justify-center rounded-[20px]
          transition-transform duration-300
          group-hover:scale-105
          ${bgColor}
          ${iconColor}
        `}
      >
        <Icon size={38} strokeWidth={2.1} />
      </div>

      {/* Card Content */}
      <div className="min-w-0">
        <p className="truncate text-[15px] font-semibold text-[#8584a9] dark:text-[#d4d0e8]">
          {title}
        </p>

        <h3 className="mt-1 text-[26px] font-extrabold leading-none text-[#9996b5] dark:text-[#d7d3e8]">
          {value}
        </h3>
      </div>
    </div>
  );
};

export default StatCard;