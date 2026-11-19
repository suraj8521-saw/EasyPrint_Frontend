
import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import Navbar from "../ui/navbar/Navbar";
import DashboardSidebar from "../features/shop-dashboard/components/DashboardSidebar";
import ActivateShopModal from "../features/shop-dashboard/components/ActivateShopModal";

const ShopDashboardLayout = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();

  // Open Modal
  const openActivationModal = () => {
    setIsModalOpen(true);
  };

  // Close Modal
  const closeActivationModal = () => {
    setIsModalOpen(false);
  };

  // Proceed to Payment
  const handleProceed = () => {
    setIsModalOpen(false);
    navigate("/shop/activation/plan");
  };

  return (
    <>
      <div
        className="
          flex h-dvh flex-col overflow-hidden
          bg-[#faf8ff] dark:bg-slate-950
        "
      >
        {/* Top Navbar */}
        <div className="relative z-50 shrink-0">
          <Navbar variant="shop-dashboard" />
        </div>

        {/* Dashboard Body */}
        <div className="flex min-h-0 flex-1">

          {/* Sidebar */}
          <div className="hidden h-full min-h-0 shrink-0 lg:block">
            <DashboardSidebar onActivate={openActivationModal} />
          </div>

          {/* Page Content */}
          <main
            className="
              min-h-0 min-w-0 flex-1
              overflow-x-hidden overflow-y-auto
            "
          >
            <Outlet context={{ openActivationModal }} />
          </main>
        </div>
      </div>

      {/* Shared Activate Shop Modal */}
      <ActivateShopModal
        isOpen={isModalOpen}
        onClose={closeActivationModal}
        onProceed={handleProceed}
      />
    </>
  );
};

export default ShopDashboardLayout;
