import type { InputHTMLAttributes, ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

export interface FormInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  icon?: LucideIcon;
  error?: string;
  rightElement?: ReactNode;
}

const FormInput = ({
  icon: Icon,
  error,
  rightElement,
  type = "text",
  className = "",
  ...rest
}: FormInputProps) => {
  return (
    <div className="w-full space-y-1">
      <div
        className={`flex h-11 w-full items-center gap-3 rounded-xl border bg-white/80 px-3.5 transition-all duration-300 dark:bg-slate-800/70 ${
          error
            ? "border-red-500 focus-within:border-red-500 focus-within:ring-4 focus-within:ring-red-500/10"
            : "border-slate-200 focus-within:border-purple-500 focus-within:ring-4 focus-within:ring-purple-500/10 dark:border-slate-700"
        } ${className}`}
      >
        {Icon && (
          <Icon
            size={19}
            strokeWidth={2}
            className={`shrink-0 ${
              error
                ? "text-red-500"
                : "text-slate-500 dark:text-slate-400"
            }`}
          />
        )}

        <input
          type={type}
          className="h-full min-w-0 flex-1 bg-transparent text-sm font-medium text-slate-800 outline-none placeholder:text-slate-500 dark:text-white dark:placeholder:text-slate-400"
          {...rest}
        />

        {rightElement && <div className="shrink-0">{rightElement}</div>}
      </div>
    </div>
  );
};

export default FormInput;