import { AlertCircle } from "lucide-react";

interface FieldErrorProps {
  message?: string;
}

const FieldError = ({ message }: FieldErrorProps) => {
  if (!message) return null;

  return (
    <p className="mt-1 flex items-start gap-1 px-1 text-[11px] font-medium leading-4 text-red-500 sm:hidden">
      <AlertCircle size={13} className="mt-0.5 shrink-0" />
      <span>{message}</span>
    </p>
  );
};

export default FieldError;