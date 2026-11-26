import { useOutletContext } from "react-router-dom";
import { useAuthSession } from "../../../auth/api/authQueries";
import InactiveDashboardView from "../inactive/InactiveDashboardView";
import ActiveDashboardView from "../active/ActiveDashboardView";

interface ShopDashboardOutletContext {
  openActivationModal?: () => void;
}

const ShopDashboardPage = () => {
  const outletContext = useOutletContext<ShopDashboardOutletContext | null>();
  const { user } = useAuthSession();
  const isVerified = user?.verificationStatus === "VERIFIED";

  return (
    <main className="relative min-h-full w-full overflow-x-clip">
      <div className="mx-auto w-full max-w-[1600px] space-y-5 p-4 pb-24 sm:p-6 lg:p-7 lg:pb-7">
        {isVerified ? (
          <ActiveDashboardView />
        ) : (
          <InactiveDashboardView
            onActivate={outletContext?.openActivationModal}
          />
        )}
      </div>
    </main>
  );
};

export default ShopDashboardPage;
