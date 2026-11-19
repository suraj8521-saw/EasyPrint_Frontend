import { useState } from "react";
import { Info, Link as LinkIcon, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const LockedDashboard = ({ onActivate }) => {
  const [showInfo, setShowInfo] = useState(false);
  const navigate = useNavigate();

  return (
    <section className="flex w-full flex-col items-center px-4 pb-8 pt-0 text-center">
      {/* Light Mode Image */}
      <img
        src="/images/Locked-Shop.png"
        alt="Shop is not activated"
        className="
          mb-3 block h-[220px] w-full max-w-[470px]
          object-contain sm:h-[245px] lg:h-[255px]
          dark:hidden
        "
      />

      {/* Dark Mode Image */}
      <img
        src="/images/locked-shop-dark.png"
        alt="Shop is not activated"
        className="
          mb-3 hidden h-[220px] w-full max-w-[470px]
          object-contain sm:h-[245px] lg:h-[255px]
          dark:block
        "
      />

      {/* Heading */}
      <h2 className="text-2xl font-extrabold tracking-tight text-slate-950 dark:text-white sm:text-3xl">
        Your Shop is{" "}
        <span className="text-purple-700 dark:text-purple-400">
          Not Activated
        </span>{" "}
        Yet
      </h2>

      {/* Description */}
      <p className="mt-2 max-w-[680px] text-sm font-medium leading-6 text-slate-700 dark:text-slate-300 sm:text-lg">
        Activate your shop to unlock the dashboard, manage services, set
        pricing, generate QR code and receive print orders from customers.
      </p>

      {/* Action Buttons */}
      <div className="mt-7 flex w-full max-w-[405px] flex-col gap-3">
        {/* Activate Shop */}
        <button
          type="button"
          onClick={onActivate}
          className="
            group flex items-center justify-center gap-3
            rounded-2xl border border-purple-600/40
            bg-gradient-to-r from-purple-700 to-purple-900
            px-6 py-4 text-base font-bold text-white
            shadow-lg shadow-purple-500/20
            transition-all duration-300
            hover:-translate-y-1 hover:shadow-xl
            cursor-pointer
            hover:shadow-purple-500/35
            active:translate-y-0 active:scale-[0.98]
          "
        >
          <LinkIcon
            size={23}
            className="transition-transform duration-300 group-hover:rotate-[-12deg]"
          />
          Activate Your Shop
        </button>

        {/* How Activation Works */}
        <button
          type="button"
          onClick={() => setShowInfo(true)}
          className="
            flex items-center justify-center gap-3
            rounded-2xl border border-purple-200
            bg-white/70 px-6 py-4
            font-bold text-purple-800 shadow-sm
            transition-all duration-300
            hover:-translate-y-0.5 hover:bg-purple-50
            hover:shadow-md
            dark:border-slate-700 dark:bg-slate-900/70
            dark:text-white dark:hover:border-purple-500
            dark:hover:bg-purple-950/40
            cursor-pointer
          "
        >
          <Info size={22} className="text-purple-700 dark:text-purple-300" />
          How Activation Works?
        </button>
      </div>

      {/* Activation Information Modal */}
      {showInfo && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-purple-100 bg-white p-6 text-left shadow-2xl dark:border-slate-700 dark:bg-slate-900">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                How Activation Works
              </h3>

              <button
                type="button"
                onClick={() => setShowInfo(false)}
                aria-label="Close"
                className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X size={20} />
              </button>
            </div>

            <ol className="space-y-4 text-sm text-slate-600 dark:text-slate-300">
              <li>
                <strong className="text-purple-700 dark:text-purple-400">
                  1. Get your activation key
                </strong>
                <p className="mt-1">
                  Obtain your shop activation key from the EasyPrint
                  administrator.
                </p>
              </li>

              <li>
                <strong className="text-purple-700 dark:text-purple-400">
                  2. Enter your activation key
                </strong>
                <p className="mt-1">
                  Submit the key through the shop activation page.
                </p>
              </li>

              <li>
                <strong className="text-purple-700 dark:text-purple-400">
                  3. Unlock your dashboard
                </strong>
                <p className="mt-1">
                  After successful verification, your shop features will become
                  available.
                </p>
              </li>
            </ol>

            <button
              type="button"
              onClick={onActivate}
              className="mt-6 w-full rounded-xl bg-purple-700 px-4 py-3 cursor-pointer font-bold text-white transition hover:bg-purple-800"
            >
              Activate Now
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default LockedDashboard;
