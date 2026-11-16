
import { Link } from "react-router-dom";
import {
  Users,
  Upload,
  MapPin,
  Zap,
  ArrowRight,
} from "lucide-react";

const CustomerCard = () => {
  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-[26px] border-2 border-purple-300/80 bg-white/75 p-4 shadow-[0_12px_35px_rgba(147,51,234,0.08)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-purple-400 hover:shadow-[0_18px_40px_rgba(147,51,234,0.16)] dark:border-purple-500/40 dark:bg-slate-900/80 sm:p-5">

      {/* Background Glow */}
      <div className="pointer-events-none absolute -left-16 -top-16 h-52 w-52 rounded-full bg-purple-200/20 blur-[70px] dark:bg-purple-500/10" />

      {/* Illustration */}
      <div className="relative flex h-[130px] items-center justify-center sm:h-[145px] lg:h-[155px]">

        <div className="pointer-events-none absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-300/25 blur-[60px] dark:bg-purple-500/15" />

        <img
          src="/images/customer-transparent.png"
          alt="EasyPrint Customer"
          className="relative z-10 h-full w-full object-contain object-center transition-transform duration-500 group-hover:scale-[1.03]"
        />

      </div>

      {/* Title */}
      <div className="mt-3 flex items-center justify-center gap-2">

        <Users
          size={30}
          strokeWidth={2.5}
          className="shrink-0 text-purple-600 dark:text-purple-400"
        />

        <h2 className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-2xl">
          I'm a Customer
        </h2>

      </div>

      {/* Description */}
      <p className="mx-auto mt-2 max-w-sm text-center text-sm leading-5 text-slate-600 dark:text-slate-300 sm:text-base">
        Upload documents, customize your prints and get them from nearby print shops.
      </p>

      {/* Features */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-2">

        <Feature icon={<Upload size={18} />} label="Upload & Edit" />

        <Feature icon={<MapPin size={18} />} label="Choose Shop" />

        <Feature icon={<Zap size={18} />} label="Quick Print" />

      </div>

      {/* Button */}
      <div className="mt-auto pt-4">

        <Link
          to="/customer"
          className="group/btn flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-purple-600 to-purple-800 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-purple-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-purple-500/25 active:scale-[0.98] sm:text-base"
        >
          Continue as Customer

          <ArrowRight
            size={21}
            className="transition-transform duration-300 group-hover/btn:translate-x-1"
          />

        </Link>

      </div>

    </div>
  );
};

const Feature = ({ icon, label }) => {
  return (
    <div className="flex items-center gap-2 rounded-full border border-purple-200/50 bg-purple-100/80 px-3 py-2 text-xs font-semibold text-slate-800 transition-colors hover:bg-purple-200/70 dark:border-purple-500/20 dark:bg-purple-500/15 dark:text-purple-200 dark:hover:bg-purple-500/25 sm:text-sm">

      <span className="text-purple-600 dark:text-purple-400">
        {icon}
      </span>

      {label}

    </div>
  );
};

export default CustomerCard;
