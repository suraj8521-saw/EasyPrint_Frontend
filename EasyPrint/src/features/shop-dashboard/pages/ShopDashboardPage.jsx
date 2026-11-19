
import { useOutletContext } from "react-router-dom";

import DashboardWelcome from "../components/DashboardWelcome";
import DashboardStats from "../components/DashboardStats";
import LockedDashboard from "../components/LockedDashboard";

const ShopDashboardPage = () => {
  const { openActivationModal } = useOutletContext();

  const isShopActive = false; // Temporary: connect backend status later

  return (
    <main className="min-h-full w-full overflow-x-hidden">
      <div className="mx-auto w-full max-w-[1600px] space-y-5 p-4 sm:p-6 lg:p-7">
        <DashboardWelcome />
        <DashboardStats />

        {!isShopActive && (
          <LockedDashboard onActivate={openActivationModal} />
        )}

        {isShopActive && (
          <section>
            {/* Active shop dashboard content */}
          </section>
        )}
      </div>
    </main>
  );
};

export default ShopDashboardPage;
