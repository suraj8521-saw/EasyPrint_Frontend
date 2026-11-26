import { useEffect, useRef, useState } from "react";
import { CheckCircle2, ChevronDown, Lock, Store } from "lucide-react";

import { useAuthSession } from "../../../features/auth/api/authQueries";
import ShopStatusDropdown from "./ShopStatusDropdown";

interface ShopProfileCardProps {
  onNavigate?: () => void;
  onOpenActivateModal?: () => void;
  compact?: boolean;
}

const ShopProfileCard = ({
  onNavigate,
  onOpenActivateModal,
  compact = false,
}: ShopProfileCardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const { user } = useAuthSession();
  const displayName = user?.name || "User";
  const isVerified = user?.verificationStatus === "VERIFIED";

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  // Collapsed Icon-Only Mode: Clicking opens ShopStatusDropdown directly (does NOT expand sidebar)
  if (compact) {
    return (
      <div ref={cardRef} className="group relative flex justify-center">
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          aria-haspopup="menu"
          aria-label="Shop Profile"
          className={`relative flex h-11 w-11 cursor-pointer items-center justify-center rounded-2xl border transition ${
            isOpen
              ? "border-purple-400 bg-purple-600/20 text-purple-700 dark:border-purple-500 dark:bg-purple-900/60 dark:text-purple-300"
              : "border-slate-200/80 bg-white/85 text-purple-600 hover:border-purple-400/60 hover:bg-purple-50 dark:border-slate-800 dark:bg-slate-900/80 dark:text-purple-400"
          }`}
        >
          <Store size={20} />
          <span
            className={`absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full ring-2 ring-white dark:ring-[#090714] ${
              isVerified ? "bg-emerald-500" : "bg-rose-500"
            }`}
          />
        </button>

        {!isOpen && (
          <span
            role="tooltip"
            className="pointer-events-none invisible absolute left-[calc(100%+12px)] top-1/2 z-[70] -translate-y-1/2 whitespace-nowrap rounded-full bg-slate-900 px-3.5 py-1.5 text-xs font-semibold text-white opacity-0 shadow-lg transition-all duration-150 group-hover:visible group-hover:opacity-100 dark:bg-slate-100 dark:text-slate-900"
          >
            {displayName}
          </span>
        )}

        {isOpen && (
          <ShopStatusDropdown
            isVerified={isVerified}
            placement="right"
            onClose={() => setIsOpen(false)}
            onNavigate={onNavigate}
            onOpenActivateModal={onOpenActivateModal}
          />
        )}
      </div>
    );
  }

  // Expanded Mode: Compact horizontal profile pill so toggle button sits cleanly on its right
  return (
    <div ref={cardRef} className="relative min-w-0 flex-1">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        className="flex w-full cursor-pointer items-center justify-between gap-2 rounded-2xl border border-slate-200/80 bg-white/85 px-2.5 py-2 text-left transition hover:border-purple-400/50 dark:border-slate-800 dark:bg-slate-900/80"
      >
        <div className="flex min-w-0 items-center gap-2.5">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-purple-600/15 text-purple-600 dark:bg-purple-900/50 dark:text-purple-400">
            <Store size={19} />
          </div>

          <div className="min-w-0">
            <p className="truncate text-xs font-bold text-slate-900 dark:text-white sm:text-[13px]">
              {displayName}
            </p>

            {isVerified ? (
              <span className="mt-0.5 inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-semibold text-emerald-500">
                <CheckCircle2 size={10} />
                Active
              </span>
            ) : (
              <span className="mt-0.5 inline-flex items-center gap-1 rounded-full bg-rose-600 px-2 py-0.5 text-[10px] font-semibold text-white">
                <Lock size={9} />
                Inactive
              </span>
            )}
          </div>
        </div>

        <ChevronDown
          size={16}
          className={`shrink-0 text-slate-400 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <ShopStatusDropdown
          isVerified={isVerified}
          placement="bottom"
          onClose={() => setIsOpen(false)}
          onNavigate={onNavigate}
          onOpenActivateModal={onOpenActivateModal}
        />
      )}
    </div>
  );
};

export default ShopProfileCard;
