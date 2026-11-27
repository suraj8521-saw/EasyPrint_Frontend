import { Link } from "react-router-dom";
import type { LucideIcon } from "lucide-react";
import { ArrowRight } from "lucide-react";

export type AccountTheme = "purple" | "blue";

export interface AccountFeatureItem {
  id: string;
  label: string;
  icon: LucideIcon;
}

export interface AccountSelectionCardProps {
  theme: AccountTheme;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  headerIcon: LucideIcon;
  features: AccountFeatureItem[];
  ctaLabel: string;
  ctaLink: string;
  onCtaClick?: () => void;
}

const THEME_STYLES: Record<
  AccountTheme,
  {
    card: string;
    cornerGlow: string;
    centerGlow: string;
    headerIcon: string;
    pillContainer: string;
    pillIcon: string;
    button: string;
  }
> = {
  purple: {
    card: "border-purple-300/80 shadow-[0_12px_35px_rgba(147,51,234,0.08)] hover:border-purple-400 hover:shadow-[0_18px_40px_rgba(147,51,234,0.16)] dark:border-purple-500/40",
    cornerGlow:
      "-left-16 -top-16 bg-[radial-gradient(circle,rgba(192,132,252,0.22)_0%,rgba(192,132,252,0)_70%)]",
    centerGlow:
      "bg-[radial-gradient(circle,rgba(192,132,252,0.26)_0%,rgba(192,132,252,0)_70%)]",
    headerIcon: "text-purple-600 dark:text-purple-400",
    pillContainer:
      "border-purple-200/50 bg-purple-100/80 hover:bg-purple-200/70 dark:border-purple-500/20 dark:bg-purple-500/15 dark:text-purple-200 dark:hover:bg-purple-500/25",
    pillIcon: "text-purple-600 dark:text-purple-400",
    button:
      "from-purple-600 to-purple-800 shadow-purple-500/20 hover:shadow-purple-500/25",
  },
  blue: {
    card: "border-blue-300/80 shadow-[0_12px_35px_rgba(59,130,246,0.08)] hover:border-blue-400 hover:shadow-[0_18px_40px_rgba(59,130,246,0.16)] dark:border-blue-500/40",
    cornerGlow:
      "-right-16 -top-16 bg-[radial-gradient(circle,rgba(96,165,250,0.22)_0%,rgba(96,165,250,0)_70%)]",
    centerGlow:
      "bg-[radial-gradient(circle,rgba(96,165,250,0.26)_0%,rgba(96,165,250,0)_70%)]",
    headerIcon: "text-blue-600 dark:text-blue-400",
    pillContainer:
      "border-blue-200/50 bg-blue-100/80 hover:bg-blue-200/70 dark:border-blue-500/20 dark:bg-blue-500/15 dark:text-blue-200 dark:hover:bg-blue-500/25",
    pillIcon: "text-blue-600 dark:text-blue-400",
    button:
      "from-sky-500 to-blue-800 shadow-blue-500/20 hover:shadow-blue-500/25",
  },
};

const AccountSelectionCard = ({
  theme,
  title,
  description,
  imageSrc,
  imageAlt,
  headerIcon: HeaderIcon,
  features,
  ctaLabel,
  ctaLink,
  onCtaClick,
}: AccountSelectionCardProps) => {
  const styles = THEME_STYLES[theme];

  const buttonClasses = `group/btn flex w-full cursor-pointer items-center justify-center gap-3 rounded-xl bg-gradient-to-r px-4 py-3 text-sm font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl active:scale-[0.98] sm:text-base ${styles.button}`;

  return (
    <article
      className={`group relative flex h-full w-full flex-col overflow-hidden rounded-[26px] border-2 bg-white/85 p-4 transition-all duration-300 hover:-translate-y-1 dark:bg-slate-900/90 sm:p-5 ${styles.card}`}
    >
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute h-64 w-64 rounded-full ${styles.cornerGlow}`}
      />

      <div className="relative flex h-[130px] items-center justify-center sm:h-[145px] lg:h-[155px]">
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full ${styles.centerGlow}`}
        />

        <img
          src={imageSrc}
          alt={imageAlt}
          decoding="async"
          className="relative z-10 h-full w-full object-contain object-center transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>

      <div className="mt-3 flex items-center justify-center gap-2">
        <HeaderIcon
          strokeWidth={2.5}
          className={`h-7 w-7 shrink-0 sm:h-[30px] sm:w-[30px] ${styles.headerIcon}`}
          aria-hidden="true"
        />
        <h2 className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-2xl">
          {title}
        </h2>
      </div>

      <p className="mx-auto mt-2 max-w-sm text-center text-sm leading-5 text-slate-600 dark:text-slate-300 sm:text-base">
        {description}
      </p>

      <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
        {features.map(({ id, label, icon: FeatureIcon }) => (
          <div
            key={id}
            className={`flex items-center gap-2 rounded-full border px-3 py-2 text-xs font-semibold text-slate-800 sm:text-sm ${styles.pillContainer}`}
          >
            <FeatureIcon
              className={`h-4 w-4 shrink-0 sm:h-[18px] sm:w-[18px] ${styles.pillIcon}`}
              aria-hidden="true"
            />
            <span>{label}</span>
          </div>
        ))}
      </div>

      <div className="mt-auto pt-4">
        {onCtaClick ? (
          <button type="button" onClick={onCtaClick} className={buttonClasses}>
            <span>{ctaLabel}</span>
            <ArrowRight
              className="h-5 w-5 transition-transform duration-300 group-hover/btn:translate-x-1 sm:h-[21px] sm:w-[21px]"
              aria-hidden="true"
            />
          </button>
        ) : (
          <Link to={ctaLink} className={buttonClasses}>
            <span>{ctaLabel}</span>
            <ArrowRight
              className="h-5 w-5 transition-transform duration-300 group-hover/btn:translate-x-1 sm:h-[21px] sm:w-[21px]"
              aria-hidden="true"
            />
          </Link>
        )}
      </div>
    </article>
  );
};

export default AccountSelectionCard;