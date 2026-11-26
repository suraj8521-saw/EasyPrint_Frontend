import { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  openMobileSidebar,
  closeMobileSidebar,
} from "../ui/sidebar/state/sidebarSlice";
import { useShopkeeperProfileQuery } from "../features/auth/api/authQueries";
import Navbar from "../shared/navbar/Navbar";
import DashboardSidebar from "../ui/sidebar/DashboardSidebar";
import MobileTopHeader from "../ui/sidebar/components/MobileTopHeader";
import MobileNavDrawer from "../ui/sidebar/components/MobileNavDrawer";
import MobileBottomNav from "../ui/sidebar/components/MobileBottomNav";
import ActivateShopModal from "../features/shop/dashbaord/inactive/components/ActivateShopModal";

const ShopDashboardLayout = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dispatch = useAppDispatch();
  const isDrawerOpen = useAppSelector((state) => state.sidebar.isMobileOpen);

  const navigate = useNavigate();
  const location = useLocation();

  useShopkeeperProfileQuery(true);

  const openActivationModal = () => setIsModalOpen(true);
  const closeActivationModal = () => setIsModalOpen(false);

  const handleProceedToPlan = () => {
    setIsModalOpen(false);
    navigate("/shop/activation/plan");
  };

  const handleLogoutSuccess = () => {
    toast.success("Logged out successfully!", { toastId: "logout-success" });
    navigate("/auth/login", { replace: true });
  };

  const activeRoute = location.pathname.includes("/orders")
    ? "orders"
    : location.pathname.includes("/services")
      ? "services"
      : location.pathname.includes("/customers")
        ? "customers"
        : location.pathname.includes("/qr-link")
          ? "qr-link"
          : location.pathname.includes("/pricing")
            ? "pricing"
            : location.pathname.includes("/earnings")
              ? "earnings"
              : location.pathname.includes("/settings")
                ? "settings"
                : "dashboard";

  const handleSelectItem = (item: { path?: string; locked?: boolean }) => {
    dispatch(closeMobileSidebar());
    if (item.locked) {
      openActivationModal();
      return;
    }
    if (item.path) {
      navigate(item.path);
    }
  };

  return (
    <>
      <div className="flex h-dvh flex-col overflow-hidden bg-[#faf8ff] dark:bg-slate-950">
        {/* Top Navbar */}
        <div className="relative z-50 shrink-0">
          {/* Responsive Header (< lg) */}
          <MobileTopHeader
            onOpenDrawer={() => dispatch(openMobileSidebar())}
          />

          {/* Desktop Navbar (lg+) */}
          <div className="hidden lg:block">
            <Navbar variant="shop-dashboard" />
          </div>
        </div>

        {/* Mobile Slide-Over Drawer */}
        <MobileNavDrawer
          isOpen={isDrawerOpen}
          onClose={() => dispatch(closeMobileSidebar())}
          activeRoute={activeRoute}
          onSelectItem={handleSelectItem}
          onLogoutSuccess={handleLogoutSuccess}
        />

        {/* Dashboard Body (No PageBackground wrapper on Shop Dashboard) */}
        <div className="flex min-h-0 flex-1">
          {/* Desktop Collapsible Sidebar */}
          <div className="hidden h-full min-h-0 shrink-0 lg:block">
            <DashboardSidebar onActivate={openActivationModal} />
          </div>

          {/* Page Content */}
          <main className="min-h-0 min-w-0 flex-1 overflow-x-clip overflow-y-auto">
            <Outlet context={{ openActivationModal }} />
          </main>
        </div>

        {/* Sticky Mobile Bottom Navigation */}
        <MobileBottomNav
          activeRoute={activeRoute}
          isDrawerOpen={isDrawerOpen}
          onSelectItem={handleSelectItem}
          onOpenDrawer={() => dispatch(openMobileSidebar())}
        />
      </div>

      {/* Shared Activate Shop Modal */}
      <ActivateShopModal
        isOpen={isModalOpen}
        onClose={closeActivationModal}
        onProceed={handleProceedToPlan}
      />
    </>
  );
};

export default ShopDashboardLayout;
