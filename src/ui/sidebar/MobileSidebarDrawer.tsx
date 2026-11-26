import { useEffect } from "react";
import { X } from "lucide-react";
import DashboardSidebar from "./DashboardSidebar";

interface MobileSidebarDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileSidebarDrawer = ({ isOpen, onClose }: MobileSidebarDrawerProps) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex lg:hidden">
      <div
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/60"
      />
      <div className="relative z-10 flex h-full">
        <DashboardSidebar onNavigate={onClose} forceExpanded />
        <button
          type="button"
          onClick={onClose}
          aria-label="Close sidebar"
          className="ml-2 mt-3 flex h-9 w-9 items-center justify-center rounded-full bg-slate-900/90 text-white shadow-lg"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
};

export default MobileSidebarDrawer;
