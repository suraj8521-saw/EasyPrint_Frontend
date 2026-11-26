import { ShieldCheck } from "lucide-react";

const SecurePaymentInfo = () => {
  return (
    <div className="mt-4 text-center">
      <div className="inline-flex items-center justify-center gap-1.5 text-xs font-bold text-slate-800 dark:text-slate-200 sm:text-sm">
        <ShieldCheck className="h-4 w-4 text-emerald-500" />
        <span>Secure &amp; Encrypted Payment</span>
      </div>
      <p className="mt-1 text-[11px] font-medium text-slate-500 dark:text-slate-400">
        Your payment is 100% safe with industry-standard encryption.
      </p>
    </div>
  );
};

export default SecurePaymentInfo;
