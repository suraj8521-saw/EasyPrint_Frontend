
import { Eye, EyeOff, LockKeyhole } from "lucide-react";
import { useState } from "react";

const PasswordInput = ({
  placeholder,
  value,
  onChange,
  name,
  autoComplete,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex h-[54px] items-center gap-3 rounded-xl border border-slate-200 bg-white/80 px-4 transition-all duration-300 focus-within:border-purple-500 focus-within:ring-4 focus-within:ring-purple-500/10 dark:border-slate-700 dark:bg-slate-800/70">

      <LockKeyhole
        size={21}
        className="shrink-0 text-slate-500 dark:text-slate-400"
      />

      <input
        type={showPassword ? "text" : "password"}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        className="h-full w-full bg-transparent text-sm font-medium text-slate-800 outline-none placeholder:text-slate-500 dark:text-white dark:placeholder:text-slate-400"
      />

      <button
        type="button"
        onClick={() => setShowPassword((prev) => !prev)}
        className="shrink-0 cursor-pointer text-slate-500 transition hover:text-purple-600 dark:text-slate-400"
        aria-label={showPassword ? "Hide password" : "Show password"}
      >
        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
      </button>
    </div>
  );
};

export default PasswordInput;
