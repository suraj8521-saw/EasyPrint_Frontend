import { ArrowRight, Crown } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ActivateShopCardProps {
  onNavigate?: () => void;
  onActivate?: () => void;
}

const ActivateShopCard = ({ onNavigate, onActivate }: ActivateShopCardProps) => {
  const navigate = useNavigate();

  const handleActivateClick = () => {
    onNavigate?.();
    if (onActivate) {
      onActivate();
    } else {
      navigate("/shop/activation/plan");
    }
  };

  return (
    <div className="rounded-2xl border border-purple-500/25 bg-gradient-to-b from-purple-950/60 to-slate-950/90 p-4 text-center shadow-lg">
      <div className="flex items-center justify-center gap-2.5">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-400 text-slate-950 shadow-md">
          <Crown size={20} strokeWidth={2.3} />
        </span>
        <h3 className="text-base font-extrabold text-white">
          Activate Your Shop
        </h3>
      </div>

      <p className="mt-2.5 text-xs leading-relaxed text-slate-300">
        Unlock all features and start receiving print orders.
      </p>

      <button
        type="button"
        onClick={handleActivateClick}
        className="mt-4 flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-violet-700 py-2.5 text-sm font-bold text-white shadow-md shadow-purple-700/40 transition hover:from-purple-500 hover:to-violet-600"
      >
        <span>Activate Now</span>
        <ArrowRight size={16} />
      </button>
    </div>
  );
};

export default ActivateShopCard;
