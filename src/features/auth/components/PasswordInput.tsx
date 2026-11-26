import { useState } from "react";
import { Eye, EyeOff, LockKeyhole } from "lucide-react";
import FormInput, { type FormInputProps } from "./FormInput";

type PasswordInputProps = Omit<FormInputProps, "type" | "rightElement">;

const PasswordInput = ({
  icon = LockKeyhole,
  placeholder = "Enter password",
  ...rest
}: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <FormInput
      {...rest}
      icon={icon}
      type={showPassword ? "text" : "password"}
      placeholder={placeholder}
      rightElement={
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="shrink-0 cursor-pointer text-slate-500 transition hover:text-purple-600 dark:text-slate-400"
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      }
    />
  );
};

export default PasswordInput;