
const FormInput = ({
  icon: Icon,
  type = "text",
  placeholder,
  value,
  onChange,
  name,
  autoComplete,
}) => {
  return (
    <div className="flex h-11 w-full items-center gap-3 rounded-xl border border-slate-200 bg-white/80 px-3.5 transition-all duration-300 focus-within:border-purple-500 focus-within:ring-4 focus-within:ring-purple-500/10 dark:border-slate-700 dark:bg-slate-800/70">

      {Icon && (
        <Icon
          size={19}
          strokeWidth={2}
          className="shrink-0 text-slate-500 dark:text-slate-400"
        />
      )}

      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        className="h-full min-w-0 flex-1 bg-transparent text-sm font-medium text-slate-800 outline-none placeholder:text-slate-500 dark:text-white dark:placeholder:text-slate-400"
      />

    </div>
  );
};

export default FormInput;
