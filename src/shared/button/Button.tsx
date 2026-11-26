import type { ReactNode } from "react";
import { Link, type LinkProps } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { preloadAccountSelection } from "../../routes/routeConfig";

type ButtonVariant = "account/selection" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends Omit<LinkProps, "to"> {
  to?: string;
  children?: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: ReactNode;
  fullWidth?: boolean;
  className?: string;
}

const variantClasses: Record<ButtonVariant, string> = {
  "account/selection":
    "bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg shadow-purple-500/25 hover:-translate-y-1 hover:scale-105 hover:from-purple-700 hover:to-purple-800 hover:shadow-xl hover:shadow-purple-500/40 active:translate-y-0 active:scale-95",
  outline:
    "border border-slate-200/80 bg-white/70 text-slate-700 shadow-sm hover:border-purple-300 hover:bg-purple-50 hover:text-purple-600 dark:border-slate-700 dark:bg-slate-800/70 dark:text-slate-200 dark:hover:border-purple-500 dark:hover:bg-slate-700",
  ghost:
    "text-slate-700 hover:bg-purple-50 hover:text-purple-600 dark:text-slate-200 dark:hover:bg-slate-800",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-xs gap-1.5",
  md: "px-6 py-3 text-sm gap-2",
  lg: "px-7 py-3.5 text-sm gap-2",
};

const Button = ({
  to,
  children,
  variant = "account/selection",
  size = "lg",
  icon,
  fullWidth = false,
  className = "",
  onMouseEnter,
  onTouchStart,
  ...rest
}: ButtonProps) => {
  const isAccountSelection = variant === "account/selection";

  const resolvedTo = to ?? (isAccountSelection ? "/account/selection" : "/");
  const resolvedChildren =
    children ?? (isAccountSelection ? "Get Started" : "Click Here");
  const resolvedIcon =
    icon !== undefined
      ? icon
      : isAccountSelection
        ? <ArrowRight size={17} />
        : null;

  const classes = [
    "inline-flex shrink-0 cursor-pointer items-center justify-center rounded-full font-bold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500",
    fullWidth ? "w-full" : "",
    variantClasses[variant],
    sizeClasses[size],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Link
      to={resolvedTo}
      className={classes}
      onMouseEnter={(e) => {
        if (isAccountSelection) preloadAccountSelection();
        onMouseEnter?.(e);
      }}
      onTouchStart={(e) => {
        if (isAccountSelection) preloadAccountSelection();
        onTouchStart?.(e);
      }}
      {...rest}
    >
      <span>{resolvedChildren}</span>
      {resolvedIcon && (
        <span className="inline-flex items-center">{resolvedIcon}</span>
      )}
    </Link>
  );
};

export default Button;
